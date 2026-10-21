import React from 'react';
import { SOURCE_REGISTRY } from '../data/sources.ts';

interface CitationChipProps {
  sourceId: string;
  extraText?: string;
  onClick: (sourceId: string) => void;
}

export const CitationChip: React.FC<CitationChipProps> = ({ sourceId, extraText, onClick }) => {
  const src = SOURCE_REGISTRY[sourceId];
  if (!src) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick(sourceId);
      }}
      className="inline-flex items-baseline gap-1 text-xs font-mono font-medium text-teal-700 dark:text-teal-400 hover:text-teal-900 dark:hover:text-teal-200 underline decoration-teal-600/35 underline-offset-2 transition-colors mx-0.5 cursor-pointer"
      title={`Inspect primary evidence: ${src.title}`}
    >
      <span>[{src.badge}{extraText ? `, ${extraText}` : ''}]</span>
    </button>
  );
};

export const FormattedClinicalText: React.FC<{
  text: string;
  onOpenCitation: (id: string) => void;
  className?: string;
}> = ({ text, onOpenCitation, className = '' }) => {
  if (!text) return null;

  const parts: React.ReactNode[] = [];
  const regex = /\[([A-Z][A-Za-z0-9\-,\s\.]*)\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const inner = match[1];
    const subParts = inner.split(',').map(s => s.trim()).filter(Boolean);

    subParts.forEach((part, pIdx) => {
      const tokens = part.split(/\s+/);
      const id = tokens[0];
      const extra = tokens.slice(1).join(' ');

      if (SOURCE_REGISTRY[id]) {
        parts.push(
          <CitationChip
            key={`${id}-${match!.index}-${pIdx}`}
            sourceId={id}
            extraText={extra}
            onClick={onOpenCitation}
          />
        );
      } else {
        parts.push(`[${part}]`);
      }
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return (
    <span className={`whitespace-pre-line leading-relaxed ${className}`}>
      {parts}
    </span>
  );
};
