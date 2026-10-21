import React from 'react';
import { EmergencyPathway, PATIENT_MODIFIERS } from '../data/pathways.ts';
import { BedsideCalculator } from './calculators/BedsideCalculator.tsx';
import { FormattedClinicalText, CitationChip } from './CitationChip.tsx';
import { playAlertChime } from '../utils/feedback.ts';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  FileText,
  AlertTriangle,
  Clock,
  Calculator,
  Activity,
  FlaskConical,
  ShieldAlert,
  Scale
} from 'lucide-react';

export const STAGES_META = [
  {
    index: 0,
    id: 'calculator',
    num: '01',
    label: 'Bedside Score',
    fullTitle: 'Stage 01 · Bedside Assessment & Scoring',
    icon: <Calculator className="w-4 h-4 stroke-[2.5]" />
  },
  {
    index: 1,
    id: 'monitoring',
    num: '02',
    label: 'Monitoring & Escalation',
    fullTitle: 'Stage 02 · Monitoring, Reassessment & Escalation',
    icon: <Activity className="w-4 h-4 stroke-[2.5]" />
  },
  {
    index: 2,
    id: 'differential',
    num: '03',
    label: 'Mimics & Stat Labs',
    fullTitle: 'Stage 03 · Medical Mimics & Stat Investigations',
    icon: <FlaskConical className="w-4 h-4 stroke-[2.5]" />
  },
  {
    index: 3,
    id: 'safety',
    num: '04',
    label: 'Organ & Drug Safety',
    fullTitle: 'Stage 04 · Special-Population & Organ Safety Matrix',
    icon: <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
  },
  {
    index: 4,
    id: 'disposition',
    num: '05',
    label: 'Disposition & MHCA',
    fullTitle: 'Stage 05 · Disposition & MHCA 2017 Compliance',
    icon: <Scale className="w-4 h-4 stroke-[2.5]" />
  }
];

interface LifecycleStepperProps {
  pathway: EmergencyPathway;
  activeStageIndex: number;
  onSelectStage: (idx: number) => void;
  adhdFocusMode: boolean;
  onToggleFocusMode: () => void;
  checkedCalcItems: Set<string>;
  onToggleCalcItem: (id: string) => void;
  checkedLabs: Set<string>;
  onToggleLab: (key: string) => void;
  checkedMon: Set<string>;
  onToggleMon: (key: string) => void;
  checkedMhca: Set<string>;
  onToggleMhca: (key: string) => void;
  activeModifiers: Set<string>;
  onToggleModifier: (id: string) => void;
  onOpenCitation: (id: string) => void;
  onOpenNote: () => void;
}

/**
 * Splits multi-step monitoring strings ("1) ... 2) ... 3) ...") into clean bullet points
 */
function splitMultiStepTasks(task: string): string[] {
  if (/\b1\)\s/.test(task) && /\b2\)\s/.test(task)) {
    return task
      .split(/(?=\b\d\)\s)/g)
      .map(s => s.trim())
      .filter(Boolean);
  }
  return [task];
}

export const LifecycleStepper: React.FC<LifecycleStepperProps> = ({
  pathway,
  activeStageIndex,
  onSelectStage,
  adhdFocusMode,
  onToggleFocusMode,
  checkedCalcItems,
  onToggleCalcItem,
  checkedLabs,
  onToggleLab,
  checkedMon,
  onToggleMon,
  checkedMhca,
  onToggleMhca,
  activeModifiers,
  onToggleModifier,
  onOpenCitation,
  onOpenNote
}) => {
  // Stage 01: Bedside Scoring
  const renderStageCalculator = () => (
    <BedsideCalculator
      pathway={pathway}
      checkedItemIds={checkedCalcItems}
      onToggleItem={onToggleCalcItem}
      onOpenCitation={onOpenCitation}
    />
  );

  // Stage 02: Monitoring, Reassessment & Urgent Escalation
  const renderStageMonitoring = () => (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-slate-200 dark:border-slate-800 pb-3.5">
        <div>
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-400 block mb-0.5">
            Stage 02 · Post-Intervention Surveillance &amp; Escalation
          </span>
          <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
            Monitoring, Reassessment &amp; Escalation Protocol
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Time-stamped vital sign intervals, pre-repeat sedation checks, and non-response escalation rules
          </p>
        </div>
        <div className="flex items-center gap-1">
          {pathway.primarySources.slice(0, 2).map(id => (
            <CitationChip key={id} sourceId={id} onClick={onOpenCitation} />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {pathway.monitoring.map((m, idx) => {
          const monKey = `${pathway.id}_mon_${idx}`;
          const isDone = checkedMon.has(monKey);
          const isEscalationOrCritical =
            /Non-Responsive|Before Any Repeat|Intubation|Taper|Rechallenge|Sudden Improvement|Every ≤15 min|Every 15/i.test(
              m.time + ' ' + m.task
            );
          const bullets = splitMultiStepTasks(m.task);

          return (
            <div
              key={monKey}
              className={`royale-card p-4 rounded-2xl transition-colors ${
                isDone
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500 dark:border-emerald-700'
                  : isEscalationOrCritical
                  ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-400 dark:border-amber-700'
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3.5">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-extrabold text-teal-800 dark:text-teal-300">
                      <Clock className="w-4 h-4 shrink-0 stroke-[2.5]" />
                      <span>{m.time}</span>
                    </span>
                    {isEscalationOrCritical && (
                      <>
                        <span aria-hidden="true" className="text-slate-400">·</span>
                        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-800 dark:text-amber-300">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />
                          <span>Time-Critical / Escalation Check</span>
                        </span>
                      </>
                    )}
                  </div>

                  {bullets.length > 1 ? (
                    <ul className="space-y-1.5 pl-5 list-disc text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                      {bullets.map((bItem, bIdx) => (
                        <li key={bIdx} className="leading-relaxed">
                          <FormattedClinicalText text={bItem} onOpenCitation={onOpenCitation} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                      <FormattedClinicalText text={m.task} onOpenCitation={onOpenCitation} />
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onToggleMon(monKey);
                    playAlertChime(isDone ? 'tap' : 'success');
                  }}
                  aria-pressed={isDone}
                  className={`royale-btn min-h-[40px] shrink-0 px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer flex items-center gap-1.5 self-start ${
                    isDone
                      ? 'bg-emerald-600 text-white border-emerald-800 dark:bg-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{isDone ? 'Logged' : 'Log Check'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Stage 03: Medical Mimics & Stat Investigations
  const renderStageDifferentials = () => (
    <div className="p-4 sm:p-6 space-y-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-slate-200 dark:border-slate-800 pb-3.5">
        <div>
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-400 block mb-0.5">
            Stage 03 · Differential Diagnosis &amp; Workup
          </span>
          <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
            Life-Threatening Medical Mimics &amp; Stat Investigations
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Exclude organic and metabolic emergencies before attributing symptoms to primary psychiatric illness
          </p>
        </div>
        <div className="flex items-center gap-1">
          {pathway.primarySources.slice(0, 3).map(id => (
            <CitationChip key={id} sourceId={id} onClick={onOpenCitation} />
          ))}
        </div>
      </div>

      {/* Differentials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {pathway.differentials.map((d, idx) => (
          <div
            key={idx}
            className="royale-card p-4 rounded-2xl border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40 space-y-2"
          >
            <h4 className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              {d.condition}
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong className="font-extrabold text-slate-900 dark:text-slate-100">
                Red-Flag Clues:
              </strong>{' '}
              {d.clue}
            </p>
            <p className="text-xs sm:text-sm text-teal-900 dark:text-teal-300 leading-relaxed font-medium">
              <strong className="font-extrabold">Action:</strong>{' '}
              <FormattedClinicalText text={d.action} onOpenCitation={onOpenCitation} />
            </p>
          </div>
        ))}
      </div>

      {/* Mandatory Casualty Stat Investigations */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h4 className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Mandatory Casualty Stat Investigations (Tap as Ordered)
          </h4>
          <span className="text-xs font-mono tabular-nums font-extrabold text-teal-800 dark:text-teal-400">
            {pathway.statLabs.filter((_, i) => checkedLabs.has(`${pathway.id}_lab_${i}`)).length}/
            {pathway.statLabs.length} Ordered
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {pathway.statLabs.map((lab, idx) => {
            const labKey = `${pathway.id}_lab_${idx}`;
            const isDone = checkedLabs.has(labKey);
            return (
              <button
                key={labKey}
                type="button"
                role="checkbox"
                aria-checked={isDone}
                onClick={() => {
                  onToggleLab(labKey);
                  playAlertChime(isDone ? 'tap' : 'beep');
                }}
                className={`royale-btn p-3.5 rounded-2xl text-left text-xs sm:text-sm flex items-center justify-between gap-3 cursor-pointer ${
                  isDone
                    ? 'bg-emerald-600 text-white border-emerald-800 dark:bg-emerald-600 font-bold'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-teal-500 font-medium'
                }`}
              >
                <span className="leading-snug">
                  <FormattedClinicalText text={lab} onOpenCitation={onOpenCitation} />
                </span>
                <span
                  className={`shrink-0 text-xs font-mono tabular-nums font-extrabold flex items-center gap-1 ${
                    isDone ? 'text-white' : 'text-teal-700 dark:text-teal-400'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{isDone ? 'Ordered' : '+ Order'}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Stage 04: Special-Population & Organ Safety Matrix
  const renderStageSafety = () => (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-slate-200 dark:border-slate-800 pb-3.5">
        <div>
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-400 block mb-0.5">
            Stage 04 · Organ Impairment &amp; Special Populations
          </span>
          <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
            Comorbidity &amp; Special-Population Drug Safety Matrix
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Pathway-specific dosing adjustments and contraindications (selecting a context pins it to the Treatment Deck)
          </p>
        </div>
        <div className="flex items-center gap-1">
          {pathway.primarySources.slice(0, 3).map(id => (
            <CitationChip key={id} sourceId={id} onClick={onOpenCitation} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PATIENT_MODIFIERS.map(mod => {
          const isActive = activeModifiers.has(mod.id);
          const ruleText = pathway.comorbidityAdjustments[mod.id] || mod.summaryRule;
          return (
            <div
              key={mod.id}
              className={`royale-card rounded-2xl p-4 transition-colors ${
                isActive
                  ? 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-500 dark:border-rose-600 text-slate-900 dark:text-slate-100'
                  : 'bg-slate-50/60 dark:bg-slate-800/35 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span
                  className={`font-display text-sm font-extrabold ${
                    isActive ? 'text-rose-900 dark:text-rose-200' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {mod.label}
                </span>
                <button
                  type="button"
                  onClick={() => onToggleModifier(mod.id)}
                  aria-pressed={isActive}
                  className={`royale-btn min-h-[34px] px-3 py-1 rounded-xl text-xs font-extrabold cursor-pointer flex items-center gap-1 ${
                    isActive
                      ? 'bg-rose-600 text-white border-rose-800 dark:bg-rose-600'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-rose-400'
                  }`}
                >
                  {isActive && <Check className="w-3 h-3 stroke-[3]" />}
                  <span>{isActive ? 'Pinned to Deck' : 'Pin Override'}</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed font-medium">
                <FormattedClinicalText text={ruleText} onOpenCitation={onOpenCitation} />
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Stage 05: Disposition & MHCA 2017 Compliance
  const renderStageDisposition = () => (
    <div className="p-4 sm:p-6 space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-slate-200 dark:border-slate-800 pb-3.5">
        <div>
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-400 block mb-0.5">
            Stage 05 · Disposition &amp; Legal Documentation
          </span>
          <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
            Disposition &amp; Indian Mental Healthcare Act (MHCA 2017) Compliance
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Statutory medico-legal criteria for casualty medical officers and psychiatry residents
          </p>
        </div>
        <div className="flex items-center gap-1">
          <CitationChip sourceId="MHCA-2017" onClick={onOpenCitation} />
        </div>
      </div>

      {/* Recommended Setting */}
      <div className="royale-card p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border-teal-300 dark:border-teal-800 space-y-1">
        <div className="text-xs font-extrabold uppercase tracking-wider text-teal-900 dark:text-teal-300">
          Recommended Care Setting &amp; Primary Team Ownership
        </div>
        <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
          <FormattedClinicalText text={pathway.disposition.setting} onOpenCitation={onOpenCitation} />
        </p>
      </div>

      {/* Statutory Documentation Checklist */}
      <div className="space-y-2.5">
        <div className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-200">
          MHCA 2017 Statutory Documentation Checklist
        </div>
        <div className="space-y-2.5">
          {pathway.disposition.mhcaChecklist.map((item, idx) => {
            const mhcaKey = `${pathway.id}_mhca_${idx}`;
            const isDone = checkedMhca.has(mhcaKey);
            return (
              <div
                key={mhcaKey}
                className={`royale-card p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                  isDone
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500 dark:border-emerald-700'
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'
                }`}
              >
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  <FormattedClinicalText text={item} onOpenCitation={onOpenCitation} />
                </p>
                <button
                  type="button"
                  onClick={() => {
                    onToggleMhca(mhcaKey);
                    playAlertChime(isDone ? 'tap' : 'success');
                  }}
                  aria-pressed={isDone}
                  className={`royale-btn min-h-[40px] shrink-0 px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer flex items-center gap-1.5 self-start sm:self-center ${
                    isDone
                      ? 'bg-emerald-600 text-white border-emerald-800 dark:bg-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700'
                  }`}
                >
                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{isDone ? 'Documented' : 'Verify & Log'}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onOpenNote}
          className="royale-btn px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 border-teal-800 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
        >
          <FileText className="w-4 h-4 stroke-[2.5]" />
          <span>Generate Casualty &amp; MHCA Handover Note</span>
        </button>
      </div>
    </div>
  );

  const stageRenderers = [
    renderStageCalculator,
    renderStageMonitoring,
    renderStageDifferentials,
    renderStageSafety,
    renderStageDisposition
  ];

  return (
    <section
      aria-label="Clinical Assessment, Monitoring and Escalation Workflow"
      className="royale-card rounded-3xl bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 overflow-hidden shadow-xs"
    >
      {/* Tactile 5-Stage Arena Navigation Deck */}
      <div className="p-3 sm:px-5 sm:py-3.5 bg-slate-100/90 dark:bg-slate-800/80 border-b-2 border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {STAGES_META.map(st => {
            const isActive = activeStageIndex === st.index;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => onSelectStage(st.index)}
                className={`royale-btn min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isActive && adhdFocusMode
                    ? 'bg-teal-700 text-white border-teal-900 dark:bg-teal-600 dark:border-teal-800 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-teal-500'
                }`}
              >
                <span className={isActive && adhdFocusMode ? 'text-teal-200' : 'text-teal-700 dark:text-teal-400'}>
                  {st.icon}
                </span>
                <span className="font-mono tabular-nums opacity-80">{st.num}.</span>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 ml-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              onToggleFocusMode();
              playAlertChime('tap');
            }}
            className="royale-btn min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-extrabold bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-teal-500 cursor-pointer whitespace-nowrap"
          >
            {adhdFocusMode ? 'Expand All 5 Stages' : 'Single-Stage Focus'}
          </button>

          {adhdFocusMode && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Previous Clinical Stage"
                onClick={() =>
                  onSelectStage((activeStageIndex + STAGES_META.length - 1) % STAGES_META.length)
                }
                className="royale-btn min-h-[38px] w-9 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                aria-label="Next Clinical Stage"
                onClick={() => onSelectStage((activeStageIndex + 1) % STAGES_META.length)}
                className="royale-btn min-h-[38px] w-9 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stage Content Body */}
      <div className="divide-y-2 divide-slate-200 dark:divide-slate-800">
        {adhdFocusMode
          ? stageRenderers[activeStageIndex]()
          : stageRenderers.map((fn, idx) => <div key={idx}>{fn()}</div>)}
      </div>
    </section>
  );
};
