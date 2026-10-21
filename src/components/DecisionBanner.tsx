import React, { useState, useEffect, useRef } from 'react';
import { EmergencyPathway, SubPathwayTier, PATIENT_MODIFIERS } from '../data/pathways.ts';
import { TIER_STRUCTURED_DATA } from '../data/structuredTreatmentData.ts';
import { detectComorbidityConflicts } from '../utils/clinicalCalculators.ts';
import { FormattedClinicalText, CitationChip } from './CitationChip.tsx';
import { playAlertChime } from '../utils/feedback.ts';
import {
  AlertTriangle,
  AlertOctagon,
  Clock,
  ChevronDown,
  BookOpen,
  ShieldAlert,
  CheckCircle2,
  ArrowUpRight,
  Syringe,
  Pill,
  Timer,
  RotateCcw,
  Check,
  Sparkles,
  Scale
} from 'lucide-react';

interface DecisionBannerProps {
  pathway: EmergencyPathway;
  tier: SubPathwayTier;
  activeModifiers: Set<string>;
  onOpenCitation: (id: string) => void;
  isCompactMode?: boolean;
}

/**
 * Safely renders selective **bold** markdown segments + [CITATION] chips with high-contrast highlighted key findings
 */
const RichBulletText: React.FC<{
  text: string;
  onOpenCitation: (id: string) => void;
}> = ({ text, onOpenCitation }) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const inner = part.slice(2, -2);
          return (
            <strong
              key={idx}
              className="font-extrabold text-teal-950 dark:text-teal-200 bg-teal-100/80 dark:bg-teal-900/50 px-1.5 py-0.5 rounded-md mr-1"
            >
              <FormattedClinicalText text={inner} onOpenCitation={onOpenCitation} />
            </strong>
          );
        }
        return <FormattedClinicalText key={idx} text={part} onOpenCitation={onOpenCitation} />;
      })}
    </>
  );
};

/**
 * Splits dense safety text into concise, scannable bullet points for emergency readability
 */
function splitSafetyIntoBullets(text: string): string[] {
  const pieces = text
    .split(/(?<=\.)\s+(?=[A-Z0-9\[])/g)
    .map(s => s.trim())
    .filter(Boolean);
  return pieces.length > 1 ? pieces : [text];
}

export const DecisionBanner: React.FC<DecisionBannerProps> = ({
  pathway,
  tier,
  activeModifiers,
  onOpenCitation,
  isCompactMode = false
}) => {
  // Keep rationale collapsed by default; track per tier ID so interacting with scores/modifiers never resets it unexpectedly
  const [expandedTierIds, setExpandedTierIds] = useState<Record<string, boolean>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Integrated Bedside Onset / Reassessment Quick-Timer
  const [onsetTimerSecs, setOnsetTimerSecs] = useState<number>(0);
  const [onsetTimerRunning, setOnsetTimerRunning] = useState<boolean>(false);
  const [onsetTimerLabel, setOnsetTimerLabel] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isRationaleOpen = Boolean(expandedTierIds[tier.id]);

  const toggleRationale = () => {
    setExpandedTierIds(prev => ({
      ...prev,
      [tier.id]: !prev[tier.id]
    }));
    playAlertChime('tap');
  };

  useEffect(() => {
    if (onsetTimerRunning && onsetTimerSecs > 0) {
      timerRef.current = setInterval(() => {
        setOnsetTimerSecs(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setOnsetTimerRunning(false);
            playAlertChime('warning');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [onsetTimerRunning, onsetTimerSecs]);

  const startOnsetTimer = (seconds: number, label: string) => {
    setOnsetTimerSecs(seconds);
    setOnsetTimerLabel(label);
    setOnsetTimerRunning(true);
    playAlertChime('beep');
  };

  const resetOnsetTimer = () => {
    setOnsetTimerRunning(false);
    setOnsetTimerSecs(0);
    setOnsetTimerLabel('');
    if (timerRef.current) clearInterval(timerRef.current);
    playAlertChime('tap');
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const b = tier.bannerAction;
  const structured = TIER_STRUCTURED_DATA[tier.id];
  const activeModsList = Array.from(activeModifiers);
  const conflicts = detectComorbidityConflicts(activeModsList);

  const activeAdjustments: Array<{ id: string; label: string; text: string }> = [];
  activeModifiers.forEach(modId => {
    const mod = PATIENT_MODIFIERS.find(m => m.id === modId);
    if (mod) {
      const specific = pathway.comorbidityAdjustments[modId] || mod.summaryRule;
      activeAdjustments.push({
        id: mod.id,
        label: mod.label,
        text: specific
      });
    }
  });

  const isCriticalRose = !structured || structured.warningSeverity === 'critical-rose';
  const safetyBullets = splitSafetyIntoBullets(b.criticalSafety);

  return (
    <section
      aria-label="Clinical Treatment Recommendation Deck"
      className="royale-card rounded-3xl bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 overflow-hidden shadow-xs"
    >
      {/* 1. ARENA COMMAND BANNER HEADER */}
      <div className="px-4 sm:px-6 py-4 border-b-2 border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-300">
            <span className="font-extrabold text-teal-400">
              {pathway.shortTitle}
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="font-semibold text-slate-200">
              {tier.label}
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="font-mono font-bold text-amber-400">
              {tier.badge}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {b.citations.map(cId => (
              <CitationChip key={cId} sourceId={cId} onClick={onOpenCitation} />
            ))}
          </div>
        </div>

        <h2 className="font-display text-lg sm:text-xl font-extrabold text-white leading-snug tracking-tight">
          {b.headline}
        </h2>
      </div>

      {/* 2. IMMEDIATE CLINICAL ACTION CARDS (Tactile Battle Deck Layout) */}
      <div className="p-4 sm:p-6 space-y-5 bg-slate-50/60 dark:bg-slate-900/60">
        {/* Prerequisites / Immediate Non-Pharmacological Steps */}
        {structured?.prerequisites && structured.prerequisites.length > 0 && (
          <div className="royale-card rounded-2xl p-4 bg-teal-50/70 dark:bg-teal-950/30 border-teal-300 dark:border-teal-800 space-y-2">
            <div className="text-xs sm:text-sm font-extrabold text-teal-900 dark:text-teal-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0 stroke-[2.5]" />
              <span>Step 1 · Immediate Bedside Prerequisites</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 pl-5 list-disc font-medium">
              {structured.prerequisites.map((pre, i) => (
                <li key={i} className="leading-relaxed">
                  <FormattedClinicalText text={pre} onOpenCitation={onOpenCitation} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
              <Syringe className="w-4 h-4 stroke-[2.5]" />
            </span>
            <h3 className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              First-Line Treatment Action Cards
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Tap any option card to highlight active bedside selection
          </span>
        </div>

        {/* Structured Treatment Option Cards */}
        {structured ? (
          <div className="grid grid-cols-1 gap-3.5">
            {structured.immediateOptions.map((opt, idx) => {
              const isSelectedOpt = selectedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    setSelectedOptionId(prev => (prev === opt.id ? null : opt.id));
                    playAlertChime('tap');
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedOptionId(prev => (prev === opt.id ? null : opt.id));
                      playAlertChime('tap');
                    }
                  }}
                  className={`royale-card rounded-2xl overflow-hidden cursor-pointer transition-colors ${
                    isSelectedOpt
                      ? 'bg-teal-50/70 dark:bg-teal-950/40 border-teal-600 dark:border-teal-400'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500'
                  }`}
                >
                  {/* Card Top Header Strip */}
                  <div
                    className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 ${
                      isSelectedOpt
                        ? 'bg-teal-700 dark:bg-teal-600 text-white border-teal-800'
                        : 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-extrabold">
                        0{idx + 1}.
                      </span>
                      <span className="font-extrabold">
                        {opt.optionLabel}
                      </span>
                      {opt.contextBadge && (
                        <>
                          <span aria-hidden="true" className="opacity-60">·</span>
                          <span
                            className={`font-semibold ${
                              isSelectedOpt ? 'text-teal-100' : 'text-teal-700 dark:text-teal-400'
                            }`}
                          >
                            {opt.contextBadge}
                          </span>
                        </>
                      )}
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 text-xs font-extrabold ${
                        isSelectedOpt ? 'text-white' : 'text-teal-700 dark:text-teal-400'
                      }`}
                    >
                      {isSelectedOpt ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Active Bedside Choice</span>
                        </>
                      ) : (
                        <span>Select Option</span>
                      )}
                    </span>
                  </div>

                  {/* Card Main Content */}
                  <div className="p-4 space-y-3.5">
                    {/* Prominent Medication / Action Headline */}
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-display text-base sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                        {opt.medicationOrAction}
                      </div>
                      {opt.dose && (
                        <span className="font-mono tabular-nums text-sm sm:text-base font-extrabold text-teal-800 dark:text-teal-300">
                          {opt.dose}
                        </span>
                      )}
                    </div>

                    {/* 3-Tile Tactile Stat Boxes: Dose · Route · Formulation */}
                    {(opt.dose || opt.route || opt.formulation) && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {opt.dose && (
                          <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-slate-800 border-2 border-teal-200 dark:border-slate-700">
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
                              Target Dose
                            </span>
                            <span className="font-mono tabular-nums text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                              {opt.dose}
                            </span>
                          </div>
                        )}
                        {opt.route && (
                          <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Administration Route
                            </span>
                            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                              {opt.route}
                            </span>
                          </div>
                        )}
                        {opt.formulation && (
                          <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Formulation
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                              {opt.formulation}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Clinical Execution Instructions */}
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      <FormattedClinicalText text={opt.instructions} onOpenCitation={onOpenCitation} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
            <FormattedClinicalText text={b.primaryRegimen} onOpenCitation={onOpenCitation} />
          </div>
        )}
      </div>

      {/* 3. HIGH-VISIBILITY SAFETY & CONTRAINDICATION SHIELD (Always Visible) */}
      <div
        role="region"
        aria-label="Critical Safety Restrictions and Contraindications"
        className={`p-4 sm:p-6 border-t-2 border-b-2 ${
          isCriticalRose
            ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
            : 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
        } space-y-4`}
      >
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white ${
                  isCriticalRose ? 'bg-rose-600' : 'bg-amber-600'
                }`}
              >
                {isCriticalRose ? (
                  <AlertOctagon className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                )}
              </div>
              <div>
                <h3
                  className={`font-display text-sm sm:text-base font-extrabold ${
                    isCriticalRose
                      ? 'text-rose-950 dark:text-rose-200'
                      : 'text-amber-950 dark:text-amber-200'
                  }`}
                >
                  {structured?.warningTitle || 'Critical Safety Restriction'}
                </h3>
              </div>
            </div>

            <span
              className={`text-xs font-mono font-extrabold uppercase tracking-wider ${
                isCriticalRose
                  ? 'text-rose-800 dark:text-rose-300'
                  : 'text-amber-800 dark:text-amber-300'
              }`}
            >
              {isCriticalRose ? 'Mandatory Safety Hazard' : 'Clinical Caution'}
            </span>
          </div>

          {/* Concise Safety Bullet Points */}
          {safetyBullets.length > 1 ? (
            <ul
              className={`space-y-1.5 pl-5 list-disc text-xs sm:text-sm font-medium ${
                isCriticalRose
                  ? 'text-rose-950 dark:text-rose-100'
                  : 'text-amber-950 dark:text-amber-100'
              }`}
            >
              {safetyBullets.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  <FormattedClinicalText text={item} onOpenCitation={onOpenCitation} />
                </li>
              ))}
            </ul>
          ) : (
            <div
              className={`text-xs sm:text-sm font-medium leading-relaxed ${
                isCriticalRose
                  ? 'text-rose-950 dark:text-rose-100'
                  : 'text-amber-950 dark:text-amber-100'
              }`}
            >
              <FormattedClinicalText text={b.criticalSafety} onOpenCitation={onOpenCitation} />
            </div>
          )}
        </div>

        {/* Multi-Comorbidity Conflict Alerts */}
        {conflicts.length > 0 && (
          <div className="royale-card rounded-2xl p-3.5 bg-amber-100/80 dark:bg-amber-950/70 border-amber-400 dark:border-amber-700 space-y-1.5">
            <div className="text-xs sm:text-sm font-extrabold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 stroke-[2.5]" />
              <span>Multi-Comorbidity Conflict Alert — Senior Review Required</span>
            </div>
            {conflicts.map((c, i) => (
              <div key={i} className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
                <strong className="font-extrabold">{c.title}:</strong>{' '}
                <FormattedClinicalText text={c.warning} onOpenCitation={onOpenCitation} />
              </div>
            ))}
          </div>
        )}

        {/* Active Patient-Context Restrictions */}
        {activeAdjustments.length > 0 && (
          <div className="royale-card rounded-2xl p-3.5 bg-white dark:bg-slate-900 border-rose-400 dark:border-rose-700 space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-wider text-rose-800 dark:text-rose-300">
              Active Patient-Context Dosing Overrides ({activeAdjustments.length} Active)
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-100 pl-4 list-disc">
              {activeAdjustments.map(adj => (
                <li key={adj.id} className="leading-relaxed">
                  <strong className="font-extrabold text-rose-800 dark:text-rose-300">
                    {adj.label}:
                  </strong>{' '}
                  <FormattedClinicalText text={adj.text} onOpenCitation={onOpenCitation} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 4. DOSING, TIMING & CEILING PARAMETERS + BEDSIDE COOLDOWN TIMER */}
      <div className="p-4 sm:p-6 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 stroke-[2.5]" />
            </span>
            <div>
              <h3 className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                Dosing, Onset &amp; 24-Hour Ceiling Parameters
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verify full onset window and vital signs before any repeat sedation
              </p>
            </div>
          </div>

          {/* 1-Tap Bedside Onset / Reassessment Quick-Timer */}
          <div className="flex flex-wrap items-center gap-1.5">
            {onsetTimerRunning || onsetTimerSecs > 0 ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-700 text-white font-mono text-xs font-extrabold">
                <Timer className="w-3.5 h-3.5 animate-spin" />
                <span>
                  {onsetTimerLabel}: {formatTimer(onsetTimerSecs)}
                </span>
                <button
                  type="button"
                  onClick={resetOnsetTimer}
                  className="ml-1 underline hover:text-teal-200 cursor-pointer flex items-center gap-0.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            ) : (
              <>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">
                  Quick Timer:
                </span>
                <button
                  type="button"
                  onClick={() => startOnsetTimer(900, '15m IM Check')}
                  className="royale-btn min-h-[34px] px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-teal-500 cursor-pointer"
                >
                  15m IM
                </button>
                <button
                  type="button"
                  onClick={() => startOnsetTimer(1800, '30m Onset')}
                  className="royale-btn min-h-[34px] px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-teal-500 cursor-pointer"
                >
                  30m PO/IM
                </button>
              </>
            )}
          </div>
        </div>

        {structured && structured.dosingParameters.length > 0 ? (
          <div
            className={`grid gap-3 ${
              isCompactMode ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {structured.dosingParameters.map((param, idx) => (
              <div
                key={idx}
                className="royale-card p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-1"
              >
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {param.label}
                </span>
                <span className="font-mono tabular-nums text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  {param.value}
                </span>
                {param.note && (
                  <span className="text-xs text-slate-600 dark:text-slate-300 leading-snug font-medium">
                    {param.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
            {b.onsetWait}
          </div>
        )}
      </div>

      {/* 5. SECOND-LINE & ESCALATION DECK */}
      <div className="p-4 sm:p-6 border-b-2 border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
            <Pill className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
          <h3 className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Second-Line &amp; Escalation Options
          </h3>
        </div>

        {structured && structured.escalationOrSecondaryOptions.length > 0 ? (
          <div className="grid grid-cols-1 gap-2.5">
            {structured.escalationOrSecondaryOptions.map(sec => (
              <div
                key={sec.id}
                className="royale-card p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-extrabold text-teal-800 dark:text-teal-400">
                    {sec.optionLabel}
                  </span>
                  {sec.contextBadge && (
                    <span className="font-mono font-bold text-slate-500 dark:text-slate-400">
                      {sec.contextBadge}
                    </span>
                  )}
                </div>
                <div className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  {sec.medicationOrAction}
                  {sec.dose ? (
                    <span className="font-mono text-teal-700 dark:text-teal-300 ml-2">
                      — {sec.dose}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <FormattedClinicalText text={sec.instructions} onOpenCitation={onOpenCitation} />
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <FormattedClinicalText text={b.secondaryRegimen} onOpenCitation={onOpenCitation} />
          </div>
        )}
      </div>

      {/* 6. COLLAPSED-BY-DEFAULT EXPANDABLE CLINICAL RATIONALE (Progressive Disclosure) */}
      <div>
        <button
          type="button"
          aria-expanded={isRationaleOpen}
          aria-controls={`rationale-panel-${tier.id}`}
          onClick={toggleRationale}
          className="w-full px-4 sm:px-6 py-4 bg-teal-50/70 hover:bg-teal-100/70 dark:bg-slate-800/70 dark:hover:bg-slate-800 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <span className="font-display text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white block">
                Why This Option? — Expand Clinical Rationale &amp; Highlighted Trial Findings
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 block truncate">
                Concise evidence bullets, head-to-head RCT outcomes, and full verbatim guideline text
              </span>
            </div>
          </div>

          <span className="royale-btn min-h-[36px] px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 flex items-center gap-1.5 text-xs font-extrabold text-teal-800 dark:text-teal-300 shrink-0">
            <span>{isRationaleOpen ? 'Hide Rationale' : 'View Evidence'}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-150 ${
                isRationaleOpen ? 'rotate-180' : ''
              }`}
            />
          </span>
        </button>

        {isRationaleOpen && structured?.rationale && (
          <div
            id={`rationale-panel-${tier.id}`}
            className="p-4 sm:p-6 border-t-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5 text-xs sm:text-sm"
          >
            {/* Highlighted Bottom-Line Takeaway & Clinical Reasoning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="royale-card p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border-teal-300 dark:border-teal-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-900 dark:text-teal-300">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Core Clinical Mechanism &amp; Reasoning</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  <FormattedClinicalText
                    text={structured.rationale.clinicalReasoning}
                    onOpenCitation={onOpenCitation}
                  />
                </p>
              </div>

              <div className="royale-card p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <Scale className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400 shrink-0" />
                  <span>Bedside Clinical Takeaway</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {structured.rationale.interpretation}
                </p>
              </div>
            </div>

            {/* Highlighted Key Evidence Bullet Points */}
            {structured.rationale.keyEvidence.length > 0 && (
              <div className="royale-card p-4 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2.5">
                <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-400">
                  Highlighted Key Trial &amp; Guideline Findings
                </h4>
                <ul className="space-y-2.5 pl-5 list-disc text-slate-800 dark:text-slate-200">
                  {structured.rationale.keyEvidence.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <RichBulletText text={item} onOpenCitation={onOpenCitation} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comparative Outcomes (Tactile Head-to-Head Trial Scorecards) */}
            {structured.rationale.comparativeOutcomes &&
              structured.rationale.comparativeOutcomes.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Head-to-Head Trial &amp; Cohort Comparisons
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {structured.rationale.comparativeOutcomes.map((row, idx) => (
                      <div
                        key={idx}
                        className="royale-card p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                          <span className="font-display font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                            {row.study}
                          </span>
                          <span className="font-mono tabular-nums text-xs font-bold text-teal-800 dark:text-teal-400">
                            Endpoint Window: {row.timePoint}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-bold uppercase">
                              Regimen Comparison &amp; Outcome
                            </span>
                            <span className="font-bold text-slate-900 dark:text-slate-100 mt-0.5 block">
                              {row.comparison} — <em className="text-teal-800 dark:text-teal-300">{row.outcome}</em>
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-bold uppercase">
                              Quantitative Trial Result
                            </span>
                            <span className="font-mono tabular-nums font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                              {row.result}
                            </span>
                          </div>
                        </div>
                        {row.limitationOrContext && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 pt-1.5 border-t border-slate-200/70 dark:border-slate-700/70">
                            <strong className="font-bold">Study Context / Limitation:</strong> {row.limitationOrContext}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Safety Considerations & Limitations */}
            {structured.rationale.safetyAndLimitations.length > 0 && (
              <div className="royale-card p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 space-y-2">
                <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-rose-900 dark:text-rose-300">
                  Safety Considerations &amp; Clinical Pitfalls to Avoid
                </h4>
                <ul className="space-y-2 pl-5 list-disc text-slate-800 dark:text-slate-200">
                  {structured.rationale.safetyAndLimitations.map((lim, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <RichBulletText text={lim} onOpenCitation={onOpenCitation} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Flagged Source Nuance / Review Note */}
            {structured.rationale.flaggedForClinicalReview && (
              <div className="royale-card p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                <div className="font-extrabold">Source Evidence Nuance Flagged for Clinician Review</div>
                <p className="leading-relaxed">{structured.rationale.flaggedForClinicalReview}</p>
              </div>
            )}

            {/* Complete Verbatim Guideline Text (Preserves 100% Source Fidelity) */}
            <details className="rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 p-3.5 text-xs group">
              <summary className="font-extrabold text-slate-700 dark:text-slate-300 cursor-pointer select-none flex items-center justify-between">
                <span>Complete Verbatim Guideline Protocol Text (100% Source Reference)</span>
                <span className="text-teal-700 dark:text-teal-400 font-mono text-[11px]">Toggle Text</span>
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                <div>
                  <strong className="text-slate-900 dark:text-slate-200">Primary Regimen: </strong>
                  <FormattedClinicalText text={b.primaryRegimen} onOpenCitation={onOpenCitation} />
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-slate-200">Secondary / Escalation: </strong>
                  <FormattedClinicalText text={b.secondaryRegimen} onOpenCitation={onOpenCitation} />
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-slate-200">Timing &amp; Ceilings: </strong>
                  <FormattedClinicalText text={b.onsetWait} onOpenCitation={onOpenCitation} />
                </div>
              </div>
            </details>

            {/* Clickable Source References */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-slate-600 dark:text-slate-400">
                Auditable Primary Sources (Tap to inspect trial &amp; guideline details):
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {structured.rationale.references.map(refId => (
                  <button
                    key={refId}
                    type="button"
                    onClick={() => onOpenCitation(refId)}
                    className="royale-btn min-h-[34px] px-3 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900 text-teal-900 dark:text-teal-300 border-teal-300 dark:border-teal-800 font-mono font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>[{refId}]</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
