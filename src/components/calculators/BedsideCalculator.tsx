import React from 'react';
import { EmergencyPathway } from '../../data/pathways.ts';
import {
  calculateBVC,
  calculateGurreraNMS,
  calculateHunterSS,
  calculateCIWAQuick,
  calculateBARSDystonia,
  calculateEXTRIPLithium,
  calculateIPSSuicide
} from '../../utils/clinicalCalculators.ts';
import { CatatoniaChallengeWidget } from './CatatoniaChallengeWidget.tsx';
import { CitationChip } from '../CitationChip.tsx';
import { playAlertChime } from '../../utils/feedback.ts';
import { Check, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

interface BedsideCalculatorProps {
  pathway: EmergencyPathway;
  checkedItemIds: Set<string>;
  onToggleItem: (id: string) => void;
  onOpenCitation: (id: string) => void;
}

export const BedsideCalculator: React.FC<BedsideCalculatorProps> = ({
  pathway,
  checkedItemIds,
  onToggleItem,
  onOpenCitation
}) => {
  const calc = pathway.calculator;
  // Filter checkedItemIds to only items belonging to the active pathway's calculator so state never leaks
  const validItemIds = new Set(calc.items.map(i => i.id));
  const checkedArray = Array.from(checkedItemIds).filter(id => validItemIds.has(id));
  const activeCount = checkedArray.length;

  let badgeText = '';
  let actionText = '';
  let colorTheme: 'rose' | 'amber' | 'emerald' | 'teal' | 'slate' = 'slate';

  if (calc.type === 'bvc') {
    const res = calculateBVC(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.riskTier === 'high' ? 'rose' : res.riskTier === 'moderate' ? 'amber' : 'emerald';
  } else if (calc.type === 'bfcrs') {
    const count = activeCount;
    if (count >= 3) {
      badgeText = `${count} Catatonic Signs Present — Meets DSM-5-TR / ICD-11 Criteria (≥3 Signs)`;
      actionText =
        'Catatonia criteria met: Perform Bedside Lorazepam 1–2 mg IV/IM Challenge Test below and evaluate for ≥50% BFCRS reduction.';
      colorTheme = 'teal';
    } else if (count === 2) {
      badgeText = `${count} Catatonic Signs — Positive BFCSI Screen (≥2 Signs); Borderline DSM-5-TR`;
      actionText =
        'Consider diagnostic Lorazepam 1–2 mg IV/IM Challenge Test alongside comprehensive neurological and medical workup.';
      colorTheme = 'amber';
    } else {
      badgeText = `${count} Catatonic Signs Selected — Select ≥3 signs for DSM-5-TR / ICD-11 Catatonia`;
      actionText = 'Tap observed spontaneous and elicited motor, speech, and behavioral signs below.';
      colorTheme = 'slate';
    }
  } else if (calc.type === 'gurrera_nms') {
    const res = calculateGurreraNMS(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.isDefinite ? 'rose' : res.isIntermediate ? 'amber' : 'emerald';
  } else if (calc.type === 'hunter_ss') {
    const res = calculateHunterSS(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.isPositive ? 'rose' : !res.hasPrerequisite && res.rulesMetCount > 0 ? 'amber' : 'emerald';
  } else if (calc.type === 'ciwa_quick') {
    const res = calculateCIWAQuick(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.isSevereOrDT ? 'rose' : res.isModerate ? 'amber' : 'emerald';
  } else if (calc.type === 'bars_dystonia') {
    const res = calculateBARSDystonia(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.isAirwayEmergency ? 'rose' : res.isFocalDystonia || res.isAkathisia ? 'amber' : 'slate';
  } else if (calc.type === 'extrip_li') {
    const res = calculateEXTRIPLithium(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.isClass1D ? 'rose' : res.isClass2D ? 'amber' : 'emerald';
  } else if (calc.type === 'ips_suicide') {
    const res = calculateIPSSuicide(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.requiresAdmission ? 'rose' : res.totalFactors > 0 ? 'amber' : 'slate';
  }

  const colorStyles = {
    rose: 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-500 dark:border-rose-700 text-rose-950 dark:text-rose-100',
    amber: 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-500 dark:border-amber-700 text-amber-950 dark:text-amber-100',
    emerald: 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100',
    teal: 'bg-teal-50/90 dark:bg-teal-950/40 border-teal-500 dark:border-teal-700 text-teal-950 dark:text-teal-100',
    slate: 'bg-slate-50 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
  };

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-slate-200 dark:border-slate-800 pb-3.5">
        <div>
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-400 block mb-0.5">
            Stage 01 · Interactive Bedside Scoring Instrument
          </span>
          <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
            {calc.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            {calc.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <span className="font-mono font-extrabold text-teal-800 dark:text-teal-300 tabular-nums">
            {activeCount}/{calc.items.length} Active
          </span>
          <span aria-hidden="true">·</span>
          <CitationChip sourceId={calc.citation} onClick={onOpenCitation} />
        </div>
      </div>

      {/* Live Calculated Scoreboard Banner */}
      <div
        role="status"
        aria-live="polite"
        className={`royale-card rounded-2xl p-4 transition-colors ${colorStyles[colorTheme]}`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white ${
              colorTheme === 'rose'
                ? 'bg-rose-600'
                : colorTheme === 'amber'
                ? 'bg-amber-600'
                : colorTheme === 'emerald' || colorTheme === 'teal'
                ? 'bg-teal-600'
                : 'bg-slate-600'
            }`}
          >
            {colorTheme === 'emerald' || colorTheme === 'teal' ? (
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            ) : colorTheme === 'slate' ? (
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <AlertCircle className="w-4 h-4 stroke-[2.5]" />
            )}
          </div>
          <div className="space-y-1 flex-1">
            <div className="font-display font-extrabold text-sm sm:text-base leading-snug">
              {badgeText}
            </div>
            {actionText && (
              <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-95">
                {actionText}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tactile Criteria Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {calc.items.map(item => {
          const isChecked = checkedItemIds.has(item.id);
          return (
            <button
              key={item.id}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={() => {
                onToggleItem(item.id);
                playAlertChime(isChecked ? 'tap' : 'beep');
              }}
              className={`royale-btn p-3.5 rounded-2xl text-left text-xs sm:text-sm flex items-start justify-between gap-3 cursor-pointer ${
                isChecked
                  ? 'bg-teal-700 text-white border-teal-900 dark:bg-teal-600 dark:border-teal-800 font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 hover:border-teal-500 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium'
              }`}
            >
              <span className="leading-snug">{item.label}</span>
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border-2 transition-colors ${
                  isChecked
                    ? 'bg-white border-white text-teal-800'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                }`}
              >
                {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
              </span>
            </button>
          );
        })}
      </div>

      {/* Catatonia Lorazepam Challenge Calculator & Reassessment Timer */}
      {pathway.id === 'catatonia' && (
        <CatatoniaChallengeWidget onOpenCitation={onOpenCitation} />
      )}
    </div>
  );
};
