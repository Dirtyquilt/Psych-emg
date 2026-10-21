import React, { useState } from 'react';
import { SOURCE_REGISTRY } from '../../data/sources.ts';
import { X, ExternalLink, BookOpen } from 'lucide-react';

interface SourceRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCitation: (id: string) => void;
}

export const SourceRegistryModal: React.FC<SourceRegistryModalProps> = ({
  isOpen,
  onClose,
  onSelectCitation
}) => {
  const [filter, setFilter] = useState<'all' | 'india' | 'intl'>('all');

  if (!isOpen) return null;

  const sources = Object.values(SOURCE_REGISTRY).filter(s => {
    if (filter === 'india') return s.origin === 'india';
    if (filter === 'intl') return s.origin === 'intl';
    return true;
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="registry-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/50 dark:bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-t-3xl sm:rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        {/* Mobile Sheet Handle */}
        <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-start gap-2.5">
            <BookOpen className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
            <div>
              <h2 id="registry-modal-title" className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Auditable Clinical Evidence Library
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                17 Primary Sources · IPS CPG 2018–2023 · CMC Vellore TREC Trials · MHCA 2017 · NICE NG10 · BAP 2023 · EXTRIP
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close Evidence Library"
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Segmented Filter Control */}
        <div className="px-5 py-3 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Sources (17)
            </button>
            <button
              type="button"
              onClick={() => setFilter('india')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'india'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Indian CPG / RCTs / Law (10)
            </button>
            <button
              type="button"
              onClick={() => setFilter('intl')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                filter === 'intl'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs font-semibold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              International Consensus (7)
            </button>
          </div>

          <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
            Showing {sources.length} verified citations
          </span>
        </div>

        {/* Bibliography List (Consistent Part 13.2 Hierarchy: Guideline/Source, Year, Title, Design/Scope, Main Finding/Limitations) */}
        <div className="divide-y divide-slate-200 dark:divide-slate-800 overflow-y-auto">
          {sources.map(src => (
            <div key={src.id} className="p-5 space-y-2.5 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1 max-w-2xl">
                  {/* 1. Guideline / Source & Year */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono tabular-nums text-teal-800 dark:text-teal-400">
                    <button
                      type="button"
                      onClick={() => onSelectCitation(src.id)}
                      className="font-bold hover:underline cursor-pointer"
                    >
                      [{src.id}] {src.badge}
                    </button>
                    <span className="text-slate-400" aria-hidden="true">·</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">Year: {src.year}</span>
                    <span className="text-slate-400" aria-hidden="true">·</span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {src.origin === 'india' ? 'Indian Standard / Law' : 'International Standard'}
                    </span>
                  </div>

                  {/* 2. Title */}
                  <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {src.title}
                  </h3>

                  {/* 3. Design / Scope & Authors */}
                  <div className="text-xs text-slate-600 dark:text-slate-400 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span><strong className="font-semibold text-slate-700 dark:text-slate-300">Authors:</strong> {src.authors}</span>
                    <span aria-hidden="true">·</span>
                    <span><strong className="font-semibold text-slate-700 dark:text-slate-300">Design / Status:</strong> {src.versionStatus}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{src.identifier}</span>
                  </div>
                </div>

                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-teal-950/50 text-slate-700 dark:text-slate-200 hover:text-teal-800 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700 text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors"
                >
                  <span>Full Publication</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* 4. Main Finding / Clinical Scope */}
              <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong className="font-semibold text-slate-900 dark:text-white">
                  Main Finding &amp; Clinical Scope ({src.section}):
                </strong>{' '}
                {src.supports}
              </div>

              {/* 5. Limitations & Critical Appraisal */}
              <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <strong className="font-semibold text-amber-800 dark:text-amber-400">
                  Methodological Limitations &amp; Context:
                </strong>{' '}
                {src.limitations}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
