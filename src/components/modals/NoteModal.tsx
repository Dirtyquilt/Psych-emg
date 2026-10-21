import React, { useState } from 'react';
import { EmergencyPathway, SubPathwayTier, PATIENT_MODIFIERS, STEP_0_CHECKS } from '../../data/pathways.ts';
import { SOURCE_REGISTRY } from '../../data/sources.ts';
import { detectComorbidityConflicts } from '../../utils/clinicalCalculators.ts';
import { X, Copy, Check, Download, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  pathway: EmergencyPathway;
  tier: SubPathwayTier;
  activeModifiers: Set<string>;
  step0Checked: Set<string>;
  calcChecked: Set<string>;
  labsChecked: Set<string>;
  monChecked: Set<string>;
  mhcaChecked: Set<string>;
  calculatorBadge: string;
  calculatorAction: string;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  pathway,
  tier,
  activeModifiers,
  step0Checked,
  calcChecked,
  labsChecked,
  monChecked,
  mhcaChecked,
  calculatorBadge,
  calculatorAction
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeMods = Array.from(activeModifiers).map(id => {
    const m = PATIENT_MODIFIERS.find(x => x.id === id);
    return m ? m.label : id;
  });

  // Separate Step 0 checks into Assessed vs Not Yet Assessed (Part 13.3: Never mark unchecked items as normal or ruled out)
  const assessedStep0 = STEP_0_CHECKS.filter(item => step0Checked.has(item.id));
  const unassessedStep0 = STEP_0_CHECKS.filter(item => !step0Checked.has(item.id));

  // Separate pathway calculator items into Checked vs Unchecked
  const pathwayCalcItems = pathway.calculator.items || [];
  const checkedCalcItemsList = pathwayCalcItems.filter(item => calcChecked.has(item.id));
  const uncheckedCalcItemsList = pathwayCalcItems.filter(item => !calcChecked.has(item.id));

  // Separate Labs into Checked vs Pending
  const statLabsList = pathway.statLabs || [];
  const assessedLabs = statLabsList.filter((_, i) => labsChecked.has(`${pathway.id}_lab_${i}`));
  const pendingLabs = statLabsList.filter((_, i) => !labsChecked.has(`${pathway.id}_lab_${i}`));

  // Separate Monitoring into Checked vs Pending
  const assessedMon = pathway.monitoring.filter((_, i) => monChecked.has(`${pathway.id}_mon_${i}`));
  const pendingMon = pathway.monitoring.filter((_, i) => !monChecked.has(`${pathway.id}_mon_${i}`));

  // Separate MHCA Checklist into Completed vs Pending
  const assessedMhca = pathway.disposition.mhcaChecklist.filter((_, i) =>
    mhcaChecked.has(`${pathway.id}_mhca_${i}`)
  );
  const pendingMhca = pathway.disposition.mhcaChecklist.filter(
    (_, i) => !mhcaChecked.has(`${pathway.id}_mhca_${i}`)
  );

  const conflicts = detectComorbidityConflicts(Array.from(activeModifiers));

  const nowStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const strip = (s: string) => s.replace(/\[([A-Z][A-Za-z0-9\-,\s\.]*)\]/g, '[$1]');

  const noteLines = [
    `CLINICAL DECISION SUPPORT HANDOVER DRAFT — VERIFY & COMPLETE BEDSIDE DETAILS BEFORE FILING`,
    `IMPORTANT SAFETY NOTICE:`,
    `- Unchecked items below indicate "NOT YET ASSESSED / PENDING BEDSIDE CONFIRMATION" and must NEVER be interpreted as normal or ruled out.`,
    `- Regimens listed below are PROPOSED / RECOMMENDED GUIDELINE OPTIONS and are NOT automatically administered. Record actual drug names, doses, routes, and times administered in the medical chart.`,
    ``,
    `=== PSYCHIATRY CASUALTY DECISION & MHCA 2017 HANDOVER NOTE ===`,
    `Timestamp (IST): ${nowStr}`,
    `Emergency Pathway: ${pathway.fullTitle}`,
    `Clinical Presentation Tier: ${tier.label} (${tier.subLabel})`,
    `Active Patient Context Modifiers: ${
      activeMods.length ? activeMods.join(', ') : 'None selected by user (Verify patient comorbidities at bedside)'
    }`,
    ``,
    `1. INITIAL STABILIZATION (STEP 0 SAFETY CHECKS — ${assessedStep0.length}/${STEP_0_CHECKS.length} ASSESSED):`,
    ...(assessedStep0.length > 0
      ? [
          `  [ASSESSED / CONFIRMED AT BEDSIDE]:`,
          ...assessedStep0.map(item => `  - [ASSESSED] ${item.label}`)
        ]
      : [`  [ASSESSED / CONFIRMED AT BEDSIDE]: None marked as assessed yet.`]),
    ...(unassessedStep0.length > 0
      ? [
          `  [NOT YET ASSESSED / PENDING BEDSIDE VERIFICATION — DO NOT ASSUME NORMAL]:`,
          ...unassessedStep0.map(item => `  - [NOT ASSESSED] ${item.label}`)
        ]
      : []),
    ``,
    `2. BEDSIDE SEVERITY / DIAGNOSTIC SCORING (${pathway.calculator.title}):`,
    `- Current Assessment Status: ${calculatorBadge}`,
    `- Clinical Interpretation: ${strip(calculatorAction)}`,
    ...(pathwayCalcItems.length > 0
      ? [
          `- Observed / Checked Criteria (${checkedCalcItemsList.length}/${pathwayCalcItems.length}): ${
            checkedCalcItemsList.length > 0
              ? checkedCalcItemsList.map(i => i.label).join('; ')
              : 'None marked as observed yet'
          }`,
          `- Unchecked Criteria (${uncheckedCalcItemsList.length}/${pathwayCalcItems.length} — Not observed or not yet assessed): ${
            uncheckedCalcItemsList.length > 0
              ? uncheckedCalcItemsList.map(i => i.label).join('; ')
              : 'All criteria checked'
          }`
        ]
      : []),
    ``,
    `3. PROPOSED / RECOMMENDED GUIDELINE REGIMEN (NOT AUTOMATICALLY ADMINISTERED):`,
    `[ Clinician to document actual medication, dose, route, and time administered: ______________________ ]`,
    `- Primary Recommended Option: ${strip(tier.bannerAction.primaryRegimen)}`,
    `- Secondary / Escalation Option: ${strip(tier.bannerAction.secondaryRegimen)}`,
    ``,
    `4. CRITICAL SAFETY RESTRICTIONS & PATIENT-CONTEXT OVERRIDES:`,
    `- Core Pathway Safety Restriction: ${strip(tier.bannerAction.criticalSafety)}`
  ];

  if (conflicts.length > 0) {
    conflicts.forEach(c => {
      noteLines.push(`- [HIGH-PRIORITY COMORBIDITY CONFLICT — ${c.title}]: ${strip(c.warning)}`);
    });
  }

  if (activeModifiers.size > 0) {
    activeModifiers.forEach(modId => {
      const rule = pathway.comorbidityAdjustments[modId];
      if (rule) noteLines.push(`- [${modId.toUpperCase()} DOSING/SAFETY OVERRIDE]: ${strip(rule)}`);
    });
  }

  noteLines.push(
    ``,
    `5. DIAGNOSTIC WORKUP (${assessedLabs.length}/${statLabsList.length} ORDERED/REVIEWED):`,
    ...(assessedLabs.length > 0
      ? assessedLabs.map(lab => `  - [ORDERED/REVIEWED] ${strip(lab)}`)
      : []),
    ...(pendingLabs.length > 0
      ? pendingLabs.map(lab => `  - [PENDING / NOT YET ORDERED] ${strip(lab)}`)
      : []),
    ``,
    `6. MANDATORY MONITORING & ESCALATION SCHEDULE (${assessedMon.length}/${pathway.monitoring.length} LOGGED):`,
    ...(assessedMon.length > 0
      ? assessedMon.map(m => `  - [COMPLETED/LOGGED — ${m.time}]: ${strip(m.task)}`)
      : []),
    ...(pendingMon.length > 0
      ? pendingMon.map(m => `  - [SCHEDULED / PENDING — ${m.time}]: ${strip(m.task)}`)
      : []),
    ``,
    `7. DISPOSITION & MHCA 2017 LEGAL COMPLIANCE (${assessedMhca.length}/${pathway.disposition.mhcaChecklist.length} VERIFIED):`,
    `- Recommended Target Setting: ${strip(pathway.disposition.setting)}`,
    ...(assessedMhca.length > 0
      ? assessedMhca.map(c => `  - [VERIFIED] ${strip(c)}`)
      : []),
    ...(pendingMhca.length > 0
      ? pendingMhca.map(c => `  - [PENDING VERIFICATION] ${strip(c)}`)
      : []),
    ``,
    `8. PRIMARY EVIDENCE SOURCES:`,
    ...pathway.primarySources.map(id => {
      const s = SOURCE_REGISTRY[id];
      return s ? `- [${s.id}] ${s.title} (${s.authors}, ${s.year}) — ${s.identifier}` : '';
    })
  );

  const fullNoteText = noteLines.join('\n');

  const handleCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullNoteText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = fullNoteText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([fullNoteText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `stat-psych-handover-${pathway.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="note-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/50 dark:bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        {/* Mobile Sheet Handle */}
        <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div>
            <h2 id="note-modal-title" className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Synchronized Clinical Handover &amp; MHCA 2017 Note
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Synchronized with active pathway ({pathway.shortTitle}), tier ({tier.label.split(':')[0]}), stabilization checks &amp; modifiers
            </p>
          </div>
          <button
            type="button"
            aria-label="Close Handover Note"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Synchronized Status Banner */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              {assessedStep0.length === STEP_0_CHECKS.length ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="font-bold text-slate-900 dark:text-white">
                  Step 0 Checks: {assessedStep0.length}/{STEP_0_CHECKS.length} Assessed
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {unassessedStep0.length > 0
                    ? `${unassessedStep0.length} marked "Not yet assessed"`
                    : `All ${STEP_0_CHECKS.length} checks assessed`}
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="font-bold text-slate-900 dark:text-white">
                Patient Context Modifiers ({activeMods.length})
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                {activeMods.length > 0 ? activeMods.join(', ') : 'None selected'}
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-amber-900 dark:text-amber-200">
                  Proposed Regimen Only
                </div>
                <div className="text-[11px] text-amber-800 dark:text-amber-300">
                  Not marked as administered; verify actual bedside doses
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <label htmlFor="handover-note-textarea" className="sr-only">
            Handover Note Text
          </label>
          <textarea
            id="handover-note-textarea"
            readOnly
            value={fullNoteText}
            rows={14}
            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs font-mono text-slate-800 dark:text-slate-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`text-xs font-medium text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 transition-opacity ${
                copied ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Check className="w-4 h-4" /> Copied to clipboard
            </span>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={handleDownloadTxt}
                className="tap-target px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .TXT</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="tap-target px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Handover Note</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
