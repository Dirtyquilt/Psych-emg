# STAT-Psych India — Emergency Psychiatric CDSS (Android APK & Web App)

Evidence-first psychiatric emergency clinical decision support system (CDSS) for casualty and crisis care, grounded in **Indian Psychiatric Society (IPS) Clinical Practice Guidelines**, **CMC Vellore TREC Trials**, and the **Mental Healthcare Act (MHCA) 2017**.

---

## Direct Android APK Download (In Repository · v2.0.0)

The compiled, `zipalign`-aligned, and cryptographically signed (`v1` / `v2` / `v3` APK Signature Schemes) standalone Android package is committed directly in this repository:

- **Root APK File**: [`./stat-psych-india.apk`](./stat-psych-india.apk)
- **Versioned v2.0.0 Release APK**: [`./releases/stat-psych-india-v2.0.0.apk`](./releases/stat-psych-india-v2.0.0.apk)
- **Versioned v1.0.0 Release APK (Updated)**: [`./releases/stat-psych-india-v1.0.0.apk`](./releases/stat-psych-india-v1.0.0.apk)
- **Web Public Static APK**: [`./public/stat-psych-india.apk`](./public/stat-psych-india.apk)

### APK Package Details
| Property | Value |
| :--- | :--- |
| **Application Label** | `STAT-Psych India` |
| **Package Identifier** | `in.statpsych.cdss` |
| **Version** | `2.0.0` (`versionCode 2`) |
| **Minimum Android SDK** | Android 5.0+ (`API 21`) |
| **Target Android SDK** | Android 13+ (`API 33`) |
| **Offline Capability** | 100% self-contained (`WebView` loads bundled assets via `https://appassets.androidplatform.net`) |

### What's New in v2.0.0
- **5-Level Treatment Card Architecture**: Standardized Primary Regimen, Explicit Clinical Rationale, Inline Expandable `"Why this option?"` Comparison Drawer, Contraindication & Caution Callouts, and Post-Administration Monitoring across all 24 severity tiers.
- **Interactive Step 0 Safety Gate & Modifiers**: Organic exclusion checklist, special population dose adjustments, and bedside clinical calculators (Weight-based dosing, QTc Bazett/Fridericia correction, and CIWA-Ar / Lorazepam calculation).
- **Synchronized Handover Note Generator**: Dynamic Step 0 clearance, active modifiers, and MHCA 2017 Section 94 emergency documentation.

---

## Automated GitHub Actions APK Build & Release

This repository includes an automated GitHub Actions workflow at [`.github/workflows/build-android-apk.yml`](./.github/workflows/build-android-apk.yml):

1. **On every push to `main` / `master`** (or manual **Run workflow** dispatch in the GitHub **Actions** tab):
   - Runs all clinical calculator unit tests (`npm test`).
   - Compiles the production clinical web bundle (`npm run build`).
   - Packages, aligns (`zipalign`), and signs `stat-psych-india.apk` (`npm run build:apk`).
   - Commits the updated APK binaries back to the repository branch (`[skip ci]`).
   - Uploads **`stat-psych-india-apk`** as a downloadable **GitHub Actions Artifact**.
   - Automatically publishes `stat-psych-india.apk` and `stat-psych-india-v2.0.0.apk` to **GitHub Releases (`v2.0.0`)**.

---

## Building the APK Locally from Source

Android wrapper source files are located in [`./android/`](./android/):
- [`android/AndroidManifest.xml`](./android/AndroidManifest.xml)
- [`android/src/in/statpsych/cdss/MainActivity.java`](./android/src/in/statpsych/cdss/MainActivity.java)
- [`scripts/build-apk.sh`](./scripts/build-apk.sh)

To rebuild the signed APK locally on Ubuntu/Debian:

```bash
npm install
npm run build:apk
```
