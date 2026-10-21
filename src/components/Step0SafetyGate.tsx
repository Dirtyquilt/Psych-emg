import React, { useState } from 'react';
import { STEP_0_CHECKS } from '../data/pathways.ts';
import { playAlertChime } from '../utils/feedback.ts';
import {
  ChevronDown,
  Check,
  ShieldCheck,
  Wind,
  Droplet,
  Activity,
  Eye,
  AlertTriangle,
  Baby,
  UserCheck,
  FlaskConical
} from 'lucide-react';

interface Step0SafetyGateProps {
  checkedIds: Set<string>;
  onToggleCheck: (id: string) => void;
  onClearAll: () => void;
  isCompactMode?: boolean;
}

const STEP_0_DESCRIPTIONS: Record<string, string> = {
  abcs: 'Patent airway, breathing & SpO2 >94% before sedation',
  glucose: 'Fingerstick RBS >70 mg/dL (exclude hypoglycemia)',
  vitals: 'Baseline Temp, HR, BP & RR documented',
  neuro: 'GCS, pupil symmetry & focal/meningeal screen',
  trauma: 'Inspect for scalp hematoma, fall or post-ictal state',
  pregnancy: 'Verify LMP / urine pregnancy test in reproductive age',
  frailty: 'Identify pediatric (<18y) or frail elderly (>65y) dose cap',
  toxins: 'Verify alcohol, lithium, clozapine or serotonergic exposure'
};

const STEP_0_ICONS: Record<string, React.ReactNode> = {
  abcs: <Wind className="w-4 h-4 shrink-0" />,
  glucose: <Droplet className="w-4 h-4 shrink-0" />,
  vitals: <Activity className="w-4 h-4 shrink-0" />,
  neuro: <Eye className="w-4 h-4 shrink-0" />,
  trauma: <AlertTriangle className="w-4 h-4 shrink-0" />,
  pregnancy: <Baby className="w-4 h-4 shrink-0" />,
  frailty: <UserCheck className="w-4 h-4 shrink-0" />,
  toxins: <FlaskConical className="w-4 h-4 shrink-0" />
};

export const Step0SafetyGate: React.FC<Step0SafetyGateProps> = ({
  checkedIds,
  onToggleCheck,
  onClearAll,
  isCompactMode = false
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmClear, setConfirmClear] = useState<boolean>(false);
  const total = STEP_0_CHECKS.length;
  const count = checkedIds.size;
  const isComplete = count === total;
  const progressPct = Math.round((count / total) * 100);

  return (
    <section
      aria-label="Bedside Medical Stabilization Checklist"
      className={`royale-card rounded-2xl overflow-hidden ${
        isComplete
          ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-500 dark:border-emerald-600'
          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700'
      }`}
    >
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          playAlertChime('tap');
        }}
        aria-expanded={isOpen}
        aria-controls="step0-checklist-panel"
        className="w-full px-4 sm:px-5 py-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 border-b-4 ${
              isComplete
                ? 'bg-emerald-600 border-emerald-800 text-white'
                : 'bg-teal-600 border-teal-800 text-white'
            }`}
          >
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                Step 0 · Bedside Stabilization Shield
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
                · Exclude organic mimics before sedation
              </span>
            </div>

            {/* Tactile Progress Bar */}
            <div className="mt-1.5 flex items-center gap-2.5 max-w-md">
              <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-transform duration-150 origin-left ${
                    isComplete ? 'bg-emerald-500' : 'bg-teal-600 dark:bg-teal-400'
                  }`}
                  style={{ transform: `scaleX(${progressPct / 100})` }}
                />
              </div>
              <span className="text-xs font-mono tabular-nums font-extrabold text-slate-700 dark:text-slate-200 shrink-0">
                {count}/{total} Cleared
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-extrabold text-teal-700 dark:text-teal-400 hidden sm:inline">
            {isOpen ? 'Collapse' : 'Open Checks'}
          </span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center">
            <ChevronDown
              className={`w-4 h-4 text-slate-700 dark:text-slate-300 transition-transform duration-150 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </div>
      </button>

      {isOpen && (
        <div
          id="step0-checklist-panel"
          className="px-4 sm:px-5 pb-4 pt-3 border-t-2 border-slate-200 dark:border-slate-800 space-y-3 bg-slate-50/70 dark:bg-slate-950/50"
        >
          <div
            className={`grid gap-2.5 ${
              isCompactMode ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {STEP_0_CHECKS.map(item => {
              const checked = checkedIds.has(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  role="checkbox"
                  aria-checked={checked}
                  onClick={() => {
                    onToggleCheck(item.id);
                    playAlertChime(checked ? 'tap' : 'beep');
                  }}
                  className={`royale-btn p-3.5 rounded-2xl text-left flex flex-col justify-between gap-2 cursor-pointer ${
                    checked
                      ? 'bg-emerald-600 text-white border-emerald-800 dark:bg-emerald-600 dark:border-emerald-800'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500 text-slate-900 dark:text-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 w-full">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          checked
                            ? 'bg-emerald-700 text-white'
                            : 'bg-teal-50 dark:bg-slate-800 text-teal-700 dark:text-teal-400'
                        }`}
                      >
                        {STEP_0_ICONS[item.id]}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold leading-snug">
                        {item.label.replace(/•/g, '·')}
                      </span>
                    </div>
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border-2 mt-0.5 ${
                        checked
                          ? 'bg-white border-white text-emerald-700'
                          : 'border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800'
                      }`}
                    >
                      {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </span>
                  </div>

                  <p
                    className={`text-xs leading-snug ${
                      checked ? 'text-emerald-50 font-medium' : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {STEP_0_DESCRIPTIONS[item.id]}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
            <span>
              <strong>Safety Rule:</strong> Unchecked items remain marked &ldquo;Not yet assessed&rdquo; in handover notes—never assumed normal.
            </span>

            {count > 0 && (
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                {!confirmClear ? (
                  <button
                    type="button"
                    onClick={() => setConfirmClear(true)}
                    className="text-xs font-extrabold text-rose-700 dark:text-rose-400 hover:underline cursor-pointer"
                  >
                    Reset Step 0 ({count})
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/70 border-2 border-rose-300 dark:border-rose-800 px-3 py-1 rounded-xl">
                    <span className="text-xs font-extrabold text-rose-900 dark:text-rose-200">
                      Clear {count} check{count > 1 ? 's' : ''}?
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onClearAll();
                        setConfirmClear(false);
                      }}
                      className="px-2 py-0.5 rounded-lg bg-rose-600 text-white text-xs font-extrabold cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmClear(false)}
                      className="px-2 py-0.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
