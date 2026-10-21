import React from 'react';
import { SYMPTOM_TRIAGE_CASES } from '../../data/triage.ts';
import { EMERGENCY_PATHWAYS } from '../../data/pathways.ts';
import { X, ArrowRight, Compass, AlertCircle } from 'lucide-react';

interface TriageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTriage: (pathwayId: string, tierId: string) => void;
}

export const TriageModal: React.FC<TriageModalProps> = ({
  isOpen,
  onClose,
  onSelectTriage
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="triage-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="royale-card bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 rounded-t-3xl sm:rounded-3xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Mobile Sheet Handle */}
        <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-5 py-4 border-b-2 border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-900 dark:bg-slate-950 text-white">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Compass className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h2 id="triage-modal-title" className="font-display text-base sm:text-lg font-extrabold text-white">
                Undifferentiated Symptom Triage Radar
              </h2>
              <p className="text-xs text-slate-300">
                Compare dominant bedside sign clusters to launch the matching emergency protocol
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close Symptom Triage"
            onClick={onClose}
            className="royale-btn min-h-[38px] w-9 rounded-xl bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Clinical Caveat Banner */}
        <div className="px-5 py-3 bg-amber-50/90 dark:bg-amber-950/40 border-b-2 border-amber-300 dark:border-amber-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5 stroke-[2.5]" />
          <p className="text-xs text-amber-950 dark:text-amber-200 leading-snug font-medium">
            <strong className="font-extrabold">Decision Support Notice:</strong> These clusters represent{' '}
            <strong className="font-extrabold">suggestive clinical patterns</strong> rather than definitive diagnoses. Co-existing toxidromes, metabolic derangements, or CNS infections must be evaluated via bedside examination and Step 0 stabilization.
          </p>
        </div>

        {/* Triage Clusters */}
        <div className="p-5 overflow-y-auto space-y-6 bg-slate-50/60 dark:bg-slate-900">
          {SYMPTOM_TRIAGE_CASES.map(group => (
            <div key={group.id} className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <h3 className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  {group.title}
                </h3>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {group.desc}
                </span>
              </div>

              <div className="space-y-2.5">
                {group.questions.map((q, idx) => {
                  const targetPath = EMERGENCY_PATHWAYS[q.targetPathway];
                  const targetTier = targetPath?.tiers.find(t => t.id === q.targetTier);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        onSelectTriage(q.targetPathway, q.targetTier);
                        onClose();
                      }}
                      className="royale-btn w-full p-4 rounded-2xl bg-white dark:bg-slate-800/90 hover:border-teal-500 border-slate-300 dark:border-slate-700 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="space-y-2 min-w-0 flex-1">
                        <div>
                          <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                            Key Identifying Bedside Cluster
                          </span>
                          <div className="font-display text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 leading-snug">
                            {q.label}
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-400 block">
                            Differential Reasoning &amp; Suggested Action
                          </span>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug font-medium">
                            {q.reason}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-1.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-700">
                        {targetPath && (
                          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                            {targetPath.shortTitle} {targetTier ? `· ${targetTier.label.split(':')[0]}` : ''}
                          </span>
                        )}
                        <span className="px-3 py-1.5 rounded-xl bg-teal-600 text-white text-xs font-extrabold flex items-center gap-1">
                          <span>Launch Protocol</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
