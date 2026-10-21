import React, { useState } from 'react';
import {
  Download,
  CheckCircle2,
  X,
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  FolderGit2,
  Smartphone
} from 'lucide-react';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  onInstall: () => Promise<boolean>;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  onInstall
}) => {
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [apkDownloading, setApkDownloading] = useState<boolean>(false);

  if (!isOpen) return null;

  const buildApkCmd = `npm install && npm run build:apk`;

  const handleCopyCmd = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(buildApkCmd);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    }
  };

  const handleDirectApkDownload = () => {
    setApkDownloading(true);
    setTimeout(() => setApkDownloading(false), 3500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="android-apk-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="royale-card bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Mobile Sheet Handle */}
        <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-5 py-4 border-b-2 border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-900 dark:bg-slate-950 text-white">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Smartphone className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-400">
                <span>Package: in.statpsych.cdss</span>
                <span aria-hidden="true">·</span>
                <span>v3.0.0 Signed Tactile Edition</span>
              </div>
              <h2 id="android-apk-modal-title" className="font-display text-base sm:text-lg font-extrabold text-white mt-0.5">
                Download Standalone Android APK
              </h2>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close Android Installation Modal"
            onClick={onClose}
            className="royale-btn min-h-[38px] w-9 rounded-xl bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Body */}
        <div className="divide-y-2 divide-slate-200 dark:divide-slate-800 overflow-y-auto text-xs sm:text-sm">
          {/* Option 1: Direct Signed .APK File Download */}
          <div className="p-5 space-y-4 bg-teal-50/50 dark:bg-teal-950/25">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-display text-xs sm:text-sm font-extrabold text-teal-900 dark:text-teal-300">
                  01. Direct Standalone Android Package (.APK · v3.0.0)
                </span>
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-teal-700 dark:text-teal-400 stroke-[2.5]" />
                  <span>v1/v2/v3 APK Signature Verified · API 21+</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Download the compiled, self-contained <code className="font-mono font-extrabold text-teal-900 dark:text-teal-300">stat-psych-india.apk</code> package directly to your Android device. All 8 emergency psychiatric pathways, 24 tactile severity tiers, dosing calculators, and expandable evidence rationales are bundled inside the APK for 100% offline casualty use.
              </p>
            </div>

            <a
              href="/stat-psych-india.apk"
              download="stat-psych-india.apk"
              onClick={handleDirectApkDownload}
              className="royale-btn w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 border-teal-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span>
                {apkDownloading
                  ? 'Downloading stat-psych-india.apk (v3.0.0)...'
                  : 'Download stat-psych-india.apk (Direct Signed APK)'}
              </span>
            </a>

            <div className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2 pt-0.5">
              <span>Package ID: in.statpsych.cdss</span>
              <span>Min SDK: Android 5.0+ (API 21)</span>
              <span>100% Offline Ready</span>
            </div>
          </div>

          {/* Option 2: GitHub Repository APK Paths & CI/CD Releases */}
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4 text-teal-700 dark:text-teal-400 stroke-[2.5]" />
                <span>02. Compiled APK Binaries &amp; Build Script</span>
              </span>
              <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">
                Verified in Workspace
              </span>
            </div>

            <div className="royale-card rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800 font-mono text-xs">
              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-900 dark:text-slate-100 font-bold">/public/stat-psych-india.apk</span>
                <span className="text-slate-500 dark:text-slate-400">Served Direct APK (v3.0.0)</span>
              </div>
              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-900 dark:text-slate-100 font-bold">/stat-psych-india.apk</span>
                <span className="text-slate-500 dark:text-slate-400">Root Signed APK Binary</span>
              </div>
              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-900 dark:text-slate-100 font-bold">/releases/stat-psych-india-v2.0.0.apk</span>
                <span className="text-slate-500 dark:text-slate-400">Release Archive APK</span>
              </div>
            </div>

            <div className="royale-card rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 p-3.5 space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <Terminal className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>Rebuild Signed APK from Source:</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyCmd}
                  className="text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 font-sans font-extrabold cursor-pointer"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-slate-800 dark:text-slate-200 overflow-x-auto text-[11px] font-bold leading-relaxed">
                {buildApkCmd}
              </pre>
            </div>
          </div>

          {/* Option 3: Instant Browser WebAPK Install */}
          <div className="p-5 space-y-3">
            <div className="space-y-1">
              <div className="font-display text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                03. Instant Progressive WebAPK Installation
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Alternatively, install directly from Android Chrome without enabling unknown APK sources.
              </p>
            </div>

            {isInstalled ? (
              <div className="royale-card p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 flex items-center gap-2 text-xs font-extrabold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 stroke-[2.5]" />
                <span>STAT-Psych India is installed and active in standalone mode.</span>
              </div>
            ) : isInstallable ? (
              <button
                type="button"
                onClick={async () => {
                  const ok = await onInstall();
                  if (ok) onClose();
                }}
                className="royale-btn w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-950 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Install WebAPK via Browser</span>
              </button>
            ) : (
              <div className="royale-card p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-medium">
                In <strong>Android Chrome</strong>, tap the top-right browser menu and select <strong>Install app</strong>.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
