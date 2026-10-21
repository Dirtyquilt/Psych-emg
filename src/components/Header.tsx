import React from 'react';
import { Download } from 'lucide-react';

interface HeaderProps {
  onOpenTriage: () => void;
  onOpenRegistry: () => void;
  onOpenNote: () => void;
  onOpenAndroidInstall: () => void;
  onFocusProtocols: () => void;
  isCompactMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTriage,
  onOpenRegistry,
  onOpenNote,
  onOpenAndroidInstall,
  onFocusProtocols,
  isCompactMode = false
}) => {
  return (
    <header className="sticky top-0 z-30 h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-8">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#protocols"
        onClick={(e) => {
          e.preventDefault();
          onFocusProtocols();
        }}
        className="font-display text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0"
      >
        STAT-Psych India
      </a>

      {/* Zone 2: 4 concise single-line text navigation links */}
      {!isCompactMode && (
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-bold text-slate-600 dark:text-slate-300"
        >
          <button
            type="button"
            onClick={onFocusProtocols}
            className="text-slate-900 dark:text-white hover:text-teal-700 dark:hover:text-teal-400 underline decoration-teal-600 decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Emergency Protocols
          </button>
          <button
            type="button"
            onClick={onOpenTriage}
            className="hover:text-slate-900 dark:hover:text-white hover:underline decoration-slate-400 decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Symptom Triage
          </button>
          <button
            type="button"
            onClick={onOpenRegistry}
            className="hover:text-slate-900 dark:hover:text-white hover:underline decoration-slate-400 decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Evidence Library
          </button>
          <button
            type="button"
            onClick={onOpenNote}
            className="hover:text-slate-900 dark:hover:text-white hover:underline decoration-slate-400 decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Handover Note
          </button>
        </nav>
      )}

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={onOpenAndroidInstall}
          className="royale-btn px-3.5 py-1.5 min-h-[38px] text-xs font-extrabold text-white bg-teal-600 hover:bg-teal-500 border-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 dark:border-teal-800 rounded-xl flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
          <span>Download .APK</span>
        </button>
      </div>
    </header>
  );
};
