import React from 'react';
import { EmergencyPathway } from '../data/pathways.ts';
import { Check, Shield, Zap, Flame } from 'lucide-react';

interface SubPathwaySelectorProps {
  pathway: EmergencyPathway;
  activeTierId: string;
  onSelectTier: (id: string) => void;
  activeModifiersCount: number;
  isCompactMode?: boolean;
}

const TIER_VISUALS = [
  {
    activeCard: 'bg-teal-700 dark:bg-teal-600 text-white border-teal-900 dark:border-teal-800',
    idleBadge: 'text-teal-800 dark:text-teal-400',
    icon: <Shield className="w-4 h-4 stroke-[2.5]" />
  },
  {
    activeCard: 'bg-amber-600 dark:bg-amber-600 text-white border-amber-800 dark:border-amber-800',
    idleBadge: 'text-amber-800 dark:text-amber-400',
    icon: <Zap className="w-4 h-4 stroke-[2.5]" />
  },
  {
    activeCard: 'bg-rose-700 dark:bg-rose-600 text-white border-rose-950 dark:border-rose-800',
    idleBadge: 'text-rose-800 dark:text-rose-400',
    icon: <Flame className="w-4 h-4 stroke-[2.5]" />
  }
];

export const SubPathwaySelector: React.FC<SubPathwaySelectorProps> = ({
  pathway,
  activeTierId,
  onSelectTier,
  activeModifiersCount,
  isCompactMode = false
}) => {
  return (
    <section aria-label="Clinical Presentation Severity Tier" className="space-y-3">
      {/* Pathway Arena Title Header */}
      <div className="royale-card rounded-2xl bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400 mb-0.5">
            <span className="font-mono tabular-nums font-extrabold text-teal-700 dark:text-teal-400">
              Protocol #{pathway.icon}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              {pathway.tagline}
            </span>
          </div>
          <h1 className="font-display text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {pathway.fullTitle}
          </h1>
        </div>

        {activeModifiersCount > 0 && (
          <div className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-800 text-xs font-extrabold text-rose-800 dark:text-rose-300 whitespace-nowrap shrink-0 self-start sm:self-center">
            {activeModifiersCount} Risk Override{activeModifiersCount > 1 ? 's' : ''} Active
          </div>
        )}
      </div>

      {/* 3 Oversized Tactile Severity Tier Cards */}
      <div className={`grid gap-2.5 ${isCompactMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
        {pathway.tiers.map((tier, idx) => {
          const isSelected = tier.id === activeTierId;
          const colonIdx = tier.label.indexOf(':');
          const tierIdentifier = colonIdx > -1 ? tier.label.slice(0, colonIdx).trim() : `Tier ${idx + 1}`;
          const tierShortTitle = colonIdx > -1 ? tier.label.slice(colonIdx + 1).trim() : tier.label;
          const vis = TIER_VISUALS[idx % TIER_VISUALS.length];

          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => onSelectTier(tier.id)}
              aria-pressed={isSelected}
              className={`royale-btn rounded-2xl p-4 text-left flex flex-col justify-between gap-2 cursor-pointer ${
                isSelected
                  ? `${vis.activeCard} shadow-sm`
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-900 dark:text-white'
              }`}
            >
              <div className="flex items-center justify-between gap-2 w-full">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-mono font-extrabold uppercase tracking-wider ${
                    isSelected ? 'text-white' : vis.idleBadge
                  }`}
                >
                  {vis.icon}
                  <span>{tierIdentifier}</span>
                </span>

                <span
                  className={`inline-flex items-center gap-1 text-xs font-extrabold ${
                    isSelected ? 'text-white' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <span className="w-5 h-5 rounded-full bg-white text-slate-900 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                      <span>Active Tier</span>
                    </>
                  ) : (
                    <span>Tap to Select</span>
                  )}
                </span>
              </div>

              <div className="font-display text-sm sm:text-base font-extrabold leading-snug">
                {tierShortTitle}
              </div>

              <p
                className={`text-xs leading-snug ${
                  isSelected ? 'text-white/90 font-medium' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {tier.subLabel.replace(/•/g, '·')}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};
