import React from 'react';
import { SOURCE_REGISTRY } from '../../data/sources.ts';
import { X, ExternalLink } from 'lucide-react';

interface CitationDrawerProps {
  sourceId: string | null;
  onClose: () => void;
}

export const CitationDrawer: React.FC<CitationDrawerProps> = ({ sourceId, onClose }) => {
  if (!sourceId) return null;
  const src = SOURCE_REGISTRY[sourceId];
  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="citation-drawer-title"
      className="fixed inset-0 z-50 bg-slate-900/50 dark:bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-2xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-xl overflow-hidden">
        {/* Mobile Sheet Handle */}
        <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Header: Guideline / Source & Year */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono tabular-nums text-teal-800 dark:text-teal-400">
              <span className="font-bold">[{src.id}]</span>
              <span aria-hidden="true">·</span>
              <span className="font-bold">Year: {src.year}</span>
              <span aria-hidden="true">·</span>
              <span>{src.origin === 'india' ? 'Indian Standard / Law' : 'International Standard'}</span>
            </div>
            <h2 id="citation-drawer-title" className="font-display text-base font-bold text-slate-900 dark:text-white mt-0.5">
              {src.badge} — Primary Evidence Audit
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close Evidence Audit"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content following Part 13.2 Hierarchy */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Title & Authors */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Publication Title &amp; Authorship
            </div>
            <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
              {src.title}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {src.authors} ({src.year})
            </p>
          </div>

          {/* Design / Scope */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Design / Scope &amp; Identifier
            </div>
            <div>
              <strong className="font-semibold text-slate-900 dark:text-white">Study / Guideline Status:</strong>{' '}
              {src.versionStatus} (Verified {src.verifiedDate})
            </div>
            <div>
              <strong className="font-semibold text-slate-900 dark:text-white">Referenced Section:</strong>{' '}
              {src.section}
            </div>
            <div>
              <strong className="font-semibold text-slate-900 dark:text-white">Identifier:</strong>{' '}
              <span className="font-mono">{src.identifier}</span>
            </div>
          </div>

          {/* Main Finding */}
          <div className="space-y-1.5 pt-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
              Main Finding &amp; Clinical Recommendations Supported
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {src.supports}
            </p>
          </div>

          {/* Limitations */}
          <div className="space-y-1.5 border-t border-slate-200 dark:border-slate-800 pt-3.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              Methodological Limitations &amp; Critical Appraisal
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {src.limitations}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-end">
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <span>Open Primary Publication (PMC / PubMed)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
