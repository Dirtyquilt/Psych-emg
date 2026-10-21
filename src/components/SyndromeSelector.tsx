import React, { useState } from 'react';
import { EMERGENCY_PATHWAYS } from '../data/pathways.ts';
import {
  ChevronRight,
  LayoutGrid,
  Zap,
  Brain,
  Flame,
  Sparkles,
  Wine,
  Wind,
  Droplets,
  ShieldAlert
} from 'lucide-react';

interface SyndromeSelectorProps {
  activePathwayId: string;
  onSelectPathway: (id: string) => void;
  isCompactMode?: boolean;
}

const SYNDROME_SHORT_SUBTITLES: Record<string, string> = {
  agitation: 'Oral vs IM Rapid Tranquillisation',
  catatonia: 'BFCRS Screen · Lorazepam Challenge',
  nms: 'Stop D2 Blocker · Cooling · Bromocriptine',
  serotonin: 'Hunter Clonus Criteria · BZD · Cyproheptadine',
  alcohol_dt: 'IV Thiamine + MgSO4 · Front-Loaded BZD',
  dystonia_akathisia: 'Stridor Airway Rescue · Promethazine · Propranolol',
  lithium_tox: '0.9% NaCl Hydration · EXTRIP Hemodialysis',
  suicide_dsh: '3-Tier Risk · Safety Plan · MHCA Sec 115'
};

interface SyndromeVisualTheme {
  icon: React.ReactNode;
  activeBg: string;
  activeBorder: string;
  iconBoxIdle: string;
  iconBoxActive: string;
}

const SYNDROME_THEMES: Record<string, SyndromeVisualTheme> = {
  agitation: {
    icon: <Zap className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-teal-700 dark:bg-teal-600 text-white',
    activeBorder: 'border-teal-900 dark:border-teal-800',
    iconBoxIdle: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    iconBoxActive: 'bg-teal-900/40 text-white border-teal-400/40'
  },
  catatonia: {
    icon: <Brain className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-indigo-700 dark:bg-indigo-600 text-white',
    activeBorder: 'border-indigo-950 dark:border-indigo-800',
    iconBoxIdle: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    iconBoxActive: 'bg-indigo-950/40 text-white border-indigo-400/40'
  },
  nms: {
    icon: <Flame className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-rose-700 dark:bg-rose-600 text-white',
    activeBorder: 'border-rose-950 dark:border-rose-800',
    iconBoxIdle: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    iconBoxActive: 'bg-rose-950/40 text-white border-rose-400/40'
  },
  serotonin: {
    icon: <Sparkles className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-amber-600 dark:bg-amber-600 text-white',
    activeBorder: 'border-amber-800 dark:border-amber-800',
    iconBoxIdle: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    iconBoxActive: 'bg-amber-900/40 text-white border-amber-300/40'
  },
  alcohol_dt: {
    icon: <Wine className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-emerald-700 dark:bg-emerald-600 text-white',
    activeBorder: 'border-emerald-950 dark:border-emerald-800',
    iconBoxIdle: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    iconBoxActive: 'bg-emerald-950/40 text-white border-emerald-400/40'
  },
  dystonia_akathisia: {
    icon: <Wind className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-cyan-700 dark:bg-cyan-600 text-white',
    activeBorder: 'border-cyan-950 dark:border-cyan-800',
    iconBoxIdle: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    iconBoxActive: 'bg-cyan-950/40 text-white border-cyan-400/40'
  },
  lithium_tox: {
    icon: <Droplets className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-blue-700 dark:bg-blue-600 text-white',
    activeBorder: 'border-blue-950 dark:border-blue-800',
    iconBoxIdle: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    iconBoxActive: 'bg-blue-950/40 text-white border-blue-400/40'
  },
  suicide_dsh: {
    icon: <ShieldAlert className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-rose-800 dark:bg-rose-700 text-white',
    activeBorder: 'border-rose-950 dark:border-rose-900',
    iconBoxIdle: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    iconBoxActive: 'bg-rose-950/40 text-white border-rose-400/40'
  }
};

export const SyndromeSelector: React.FC<SyndromeSelectorProps> = ({
  activePathwayId,
  onSelectPathway,
  isCompactMode = false
}) => {
  const pathways = Object.values(EMERGENCY_PATHWAYS);
  const [mobileDirectoryOpen, setMobileDirectoryOpen] = useState<boolean>(false);

  const renderMobileCompactSelector = () => (
    <section aria-label="Presenting Emergency Syndrome Deck" className="space-y-2.5">
      <div className="flex items-center justify-between gap-2 px-0.5">
        <span className="font-display text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
          Emergency Syndrome Deck (8 Protocols)
        </span>
        <button
          type="button"
          aria-expanded={mobileDirectoryOpen}
          onClick={() => setMobileDirectoryOpen(prev => !prev)}
          className="royale-btn min-h-[34px] px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-xs font-extrabold text-teal-700 dark:text-teal-400 flex items-center gap-1.5 cursor-pointer"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>{mobileDirectoryOpen ? 'Deck Strip' : 'All 8 Cards'}</span>
        </button>
      </div>

      {/* Horizontal Tactile Battle Deck Strip for Instant 1-Tap Switching */}
      {!mobileDirectoryOpen ? (
        <div
          role="tablist"
          aria-label="Quick Syndrome Switcher"
          className="flex items-stretch gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1"
        >
          {pathways.map(pw => {
            const isSelected = pw.id === activePathwayId;
            const theme = SYNDROME_THEMES[pw.id] || SYNDROME_THEMES.agitation;
            return (
              <button
                key={pw.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectPathway(pw.id)}
                className={`royale-btn shrink-0 rounded-2xl px-3.5 py-2.5 text-left cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? `${theme.activeBg} ${theme.activeBorder} shadow-sm`
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:border-slate-400'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                    isSelected ? theme.iconBoxActive : theme.iconBoxIdle
                  }`}
                >
                  {theme.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-mono tabular-nums font-bold ${
                        isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      #{pw.icon}
                    </span>
                    <span className="font-display text-xs sm:text-sm font-extrabold whitespace-nowrap">
                      {pw.shortTitle}
                    </span>
                  </div>
                  <div
                    className={`text-[11px] truncate max-w-[175px] ${
                      isSelected ? 'text-white/90 font-medium' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {SYNDROME_SHORT_SUBTITLES[pw.id]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pathways.map(pw => {
            const isSelected = pw.id === activePathwayId;
            const theme = SYNDROME_THEMES[pw.id] || SYNDROME_THEMES.agitation;
            return (
              <button
                key={pw.id}
                type="button"
                aria-current={isSelected ? 'true' : undefined}
                onClick={() => {
                  onSelectPathway(pw.id);
                  setMobileDirectoryOpen(false);
                }}
                className={`royale-btn rounded-2xl p-3 text-left flex items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? `${theme.activeBg} ${theme.activeBorder} shadow-sm`
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      isSelected ? theme.iconBoxActive : theme.iconBoxIdle
                    }`}
                  >
                    {theme.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-mono tabular-nums font-bold ${
                          isSelected ? 'text-white/80' : 'text-slate-400'
                        }`}
                      >
                        #{pw.icon}
                      </span>
                      <span className="font-display text-sm font-extrabold truncate">
                        {pw.shortTitle}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${
                        isSelected ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {SYNDROME_SHORT_SUBTITLES[pw.id] || pw.tagline}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-white' : 'text-slate-400'
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );

  if (isCompactMode) {
    return renderMobileCompactSelector();
  }

  return (
    <>
      {/* Mobile & Tablet (<1024px) Compact Deck */}
      <div className="lg:hidden">{renderMobileCompactSelector()}</div>

      {/* Desktop (≥1024px) Left Tactical Command Deck */}
      <aside aria-label="Emergency Syndromes Command Deck" className="hidden lg:block space-y-2.5">
        <div className="px-1 flex items-center justify-between">
          <h2 className="font-display text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Emergency Command Deck
          </h2>
          <span className="text-xs font-mono font-bold text-slate-500 tabular-nums">8 Syndromes</span>
        </div>

        <div className="space-y-2">
          {pathways.map(pw => {
            const isSelected = pw.id === activePathwayId;
            const theme = SYNDROME_THEMES[pw.id] || SYNDROME_THEMES.agitation;
            return (
              <button
                key={pw.id}
                type="button"
                aria-current={isSelected ? 'true' : undefined}
                onClick={() => onSelectPathway(pw.id)}
                className={`royale-btn w-full rounded-2xl p-3 text-left flex items-center justify-between gap-2.5 cursor-pointer ${
                  isSelected
                    ? `${theme.activeBg} ${theme.activeBorder} shadow-sm`
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      isSelected ? theme.iconBoxActive : theme.iconBoxIdle
                    }`}
                  >
                    {theme.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-display text-sm font-extrabold truncate">
                        {pw.shortTitle}
                      </span>
                      <span
                        className={`text-[11px] font-mono tabular-nums font-bold shrink-0 ${
                          isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {pw.icon}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${
                        isSelected ? 'text-white/90 font-medium' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {SYNDROME_SHORT_SUBTITLES[pw.id] || pw.tagline}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-white' : 'text-slate-400 dark:text-slate-600'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};
