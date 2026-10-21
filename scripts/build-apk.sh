#!/usr/bin/env bash
set -euo pipefail

echo "==> Checking Android APK build toolchain..."
if ! command -v aapt >/dev/null 2>&1 || ! command -v apksigner >/dev/null 2>&1 || ! command -v javac >/dev/null 2>&1; then
  if command -v apt-get >/dev/null 2>&1; then
    echo "==> Installing Android SDK build tools (aapt, dalvik-exchange, zipalign, apksigner, default-jdk-headless)..."
    if [ "$(id -u)" -eq 0 ]; then
      apt-get update -qq
      DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        aapt \
        dalvik-exchange \
        zipalign \
        apksigner \
        android-sdk-platform-23 \
        default-jdk-headless
    elif command -v sudo >/dev/null 2>&1; then
      sudo apt-get update -qq
      sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        aapt \
        dalvik-exchange \
        zipalign \
        apksigner \
        android-sdk-platform-23 \
        default-jdk-headless
    fi
  fi
fi

echo "==> Building STAT-Psych India Production Web Assets..."
npm run build

WORK_DIR="/tmp/statpsych-apk-build"
rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR/res/drawable"
mkdir -p "$WORK_DIR/assets"
mkdir -p "$WORK_DIR/build/gen"
mkdir -p "$WORK_DIR/build/obj"
mkdir -p releases public

# Copy compiled web bundle into APK assets (excluding any nested .apk files or chat attachments)
cp -r dist/* "$WORK_DIR/assets/"
rm -f "$WORK_DIR/assets/"*.apk
rm -rf "$WORK_DIR/assets/assets/aistudio"

# Generate 192x192 Launcher Icon (#0F766E clinical teal with white medical cross)
python3 - << 'EOF'
import zlib, struct

width, height = 192, 192
raw_data = bytearray()
for y in range(height):
    raw_data.append(0)
    for x in range(width):
        in_horiz = (72 <= y < 120) and (44 <= x < 148)
        in_vert = (44 <= y < 148) and (72 <= x < 120)
        if in_horiz or in_vert:
            raw_data.extend((255, 255, 255, 255))
        else:
            raw_data.extend((15, 118, 110, 255))

def make_chunk(chunk_type, data):
    return struct.pack(">I", len(data)) + chunk_type + data + struct.pack(">I", zlib.crc32(chunk_type + data) & 0xffffffff)

png = b"\x89PNG\r\n\x1a\n"
ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
png += make_chunk(b"IHDR", ihdr)
png += make_chunk(b"IDAT", zlib.compress(bytes(raw_data), 9))
png += make_chunk(b"IEND", b"")

with open("/tmp/statpsych-apk-build/res/drawable/ic_launcher.png", "wb") as f:
    f.write(png)
EOF

ANDROID_JAR="${ANDROID_JAR:-/usr/lib/android-sdk/platforms/android-23/android.jar}"
if [ ! -f "$ANDROID_JAR" ] && [ -n "${ANDROID_HOME:-}" ]; then
  ANDROID_JAR=$(find "$ANDROID_HOME/platforms" -name "android.jar" | sort -V | tail -n 1)
fi

echo "==> Packaging Android resources and offline assets with aapt..."
aapt package -f -m \
  -J "$WORK_DIR/build/gen" \
  -M android/AndroidManifest.xml \
  -S "$WORK_DIR/res" \
  -A "$WORK_DIR/assets" \
  -I "$ANDROID_JAR" \
  -F "$WORK_DIR/build/unaligned.apk"

echo "==> Compiling MainActivity.java..."
javac -source 1.8 -target 1.8 \
  -bootclasspath "$ANDROID_JAR" \
  -classpath "$ANDROID_JAR" \
  -d "$WORK_DIR/build/obj" \
  "$WORK_DIR/build/gen/in/statpsych/cdss/R.java" \
  android/src/in/statpsych/cdss/MainActivity.java

echo "==> Converting JVM bytecode to Dalvik DEX..."
if command -v dalvik-exchange >/dev/null 2>&1; then
  dalvik-exchange --dex --output="$WORK_DIR/classes.dex" "$WORK_DIR/build/obj"
elif [ -x /usr/lib/android-sdk/build-tools/debian/dx ]; then
  /usr/lib/android-sdk/build-tools/debian/dx --dex --output="$WORK_DIR/classes.dex" "$WORK_DIR/build/obj"
else
  D8_BIN=$(find "${ANDROID_HOME:-/usr}" -name "d8" 2>/dev/null | head -n 1)
  "$D8_BIN" --lib "$ANDROID_JAR" --output "$WORK_DIR" $(find "$WORK_DIR/build/obj" -name "*.class")
fi

(cd "$WORK_DIR" && aapt add build/unaligned.apk classes.dex)

echo "==> Aligning APK with zipalign..."
zipalign -f 4 "$WORK_DIR/build/unaligned.apk" "$WORK_DIR/build/aligned.apk"

echo "==> Signing APK (v1 + v2 + v3 schemes)..."
KEYSTORE_PATH="android/release.keystore"
if [ ! -f "$KEYSTORE_PATH" ]; then
  keytool -genkeypair \
    -keystore "$KEYSTORE_PATH" \
    -storepass statpsych123 \
    -keypass statpsych123 \
    -alias statpsych \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -dname "CN=STAT-Psych India, OU=Clinical Decision Support, O=STAT-Psych, L=Vellore, ST=TN, C=IN"
fi

apksigner sign \
  --ks "$KEYSTORE_PATH" \
  --ks-pass pass:statpsych123 \
  --key-pass pass:statpsych123 \
  --out public/stat-psych-india.apk \
  "$WORK_DIR/build/aligned.apk"

cp public/stat-psych-india.apk stat-psych-india.apk
cp public/stat-psych-india.apk releases/stat-psych-india-v2.0.0.apk
cp public/stat-psych-india.apk releases/stat-psych-india-v1.0.0.apk
cp public/stat-psych-india.apk dist/stat-psych-india.apk

apksigner verify --verbose public/stat-psych-india.apk
echo "==> Successfully built and signed:"
ls -lh stat-psych-india.apk releases/stat-psych-india-v2.0.0.apk releases/stat-psych-india-v1.0.0.apk public/stat-psych-india.apk
