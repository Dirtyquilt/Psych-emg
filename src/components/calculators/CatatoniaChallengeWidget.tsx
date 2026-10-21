import React, { useState, useEffect, useRef } from 'react';
import { calculateBFCRSReduction } from '../../utils/clinicalCalculators.ts';
import { playAlertChime } from '../../utils/feedback.ts';
import { CitationChip } from '../CitationChip.tsx';
import { RotateCcw, CheckCircle2, AlertTriangle, Timer } from 'lucide-react';

interface CatatoniaChallengeWidgetProps {
  onOpenCitation: (id: string) => void;
}

export const CatatoniaChallengeWidget: React.FC<CatatoniaChallengeWidgetProps> = ({ onOpenCitation }) => {
  const [baselineScore, setBaselineScore] = useState<number>(8);
  const [postScore, setPostScore] = useState<number>(3);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerDuration, setTimerDuration] = useState<number>(300);
  const [selectedRoute, setSelectedRoute] = useState<'IV' | 'IM' | 'PO'>('IV');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const result = calculateBFCRSReduction(baselineScore, postScore);

  const startTimer = (seconds: number, route: 'IV' | 'IM' | 'PO') => {
    setSelectedRoute(route);
    setTimerDuration(seconds);
    setTimerSeconds(seconds);
    setTimerRunning(true);
    playAlertChime('beep');
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
    playAlertChime('tap');
  };

  useEffect(() => {
    if (timerRunning && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setTimerRunning(false);
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
  }, [timerRunning, timerSeconds]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="border-t-2 border-slate-200 dark:border-slate-800 pt-5 mt-5 space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h4 className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
            Lorazepam Challenge Test Scoreboard &amp; Reassessment Timer
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            BAP 2023 &amp; IPS CPG 2023: ≥50% reduction in BFCRS score confirms a positive challenge
          </p>
        </div>
        <div className="flex items-center gap-1">
          <CitationChip sourceId="BAP-CAT-2023" onClick={onOpenCitation} />
          <CitationChip sourceId="IPS-GERI-2023" onClick={onOpenCitation} />
        </div>
      </div>

      {/* 3-Column Tactile Scoreboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 1. Baseline BFCRS */}
        <div className="royale-card p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 dark:text-slate-300">
            <span>01. Baseline BFCRS</span>
            <span className="font-mono tabular-nums text-teal-700 dark:text-teal-400">{baselineScore} pts</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label="Decrease Baseline BFCRS"
              onClick={() => {
                setHasInteracted(true);
                setBaselineScore(prev => Math.max(1, prev - 1));
                playAlertChime('tap');
              }}
              className="royale-btn w-12 h-12 rounded-xl bg-white dark:bg-slate-900 text-lg font-extrabold text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer"
            >
              −
            </button>
            <span className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
              {baselineScore}
            </span>
            <button
              type="button"
              aria-label="Increase Baseline BFCRS"
              onClick={() => {
                setHasInteracted(true);
                setBaselineScore(prev => Math.min(69, prev + 1));
                playAlertChime('tap');
              }}
              className="royale-btn w-12 h-12 rounded-xl bg-white dark:bg-slate-900 text-lg font-extrabold text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer"
            >
              +
            </button>
          </div>
          <p className="text-[11px] font-medium text-slate-500 text-center">Pre-challenge baseline</p>
        </div>

        {/* 2. Route & Countdown Timer */}
        <div className="royale-card p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <Timer className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
              <span>02. Challenge Timer</span>
            </span>
            <span className="text-base font-extrabold font-mono tabular-nums text-teal-700 dark:text-teal-400">
              {timerSeconds > 0
                ? formatTime(timerSeconds)
                : timerDuration > 0 && !timerRunning && timerSeconds === 0 && hasInteracted
                ? 'REASSESS NOW'
                : '00:00'}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {(['IV', 'IM', 'PO'] as const).map(route => {
              const secs = route === 'IV' ? 300 : route === 'IM' ? 900 : 1800;
              const label = route === 'IV' ? 'IV (5m)' : route === 'IM' ? 'IM (15m)' : 'PO (30m)';
              const active = selectedRoute === route && timerRunning;
              return (
                <button
                  key={route}
                  type="button"
                  onClick={() => startTimer(secs, route)}
                  className={`royale-btn min-h-[40px] py-2 px-2 rounded-xl text-xs font-extrabold cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-teal-700 text-white border-teal-900 dark:bg-teal-600'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-teal-500'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
            <span>Dose: {selectedRoute} Lorazepam 1–2 mg</span>
            {timerRunning && (
              <button
                type="button"
                onClick={resetTimer}
                className="text-rose-700 dark:text-rose-400 font-extrabold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}
          </div>
        </div>

        {/* 3. Post-Dose BFCRS */}
        <div className="royale-card p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 dark:text-slate-300">
            <span>03. Post-Dose BFCRS</span>
            <span className="font-mono tabular-nums text-teal-700 dark:text-teal-400">{postScore} pts</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label="Decrease Post-Dose BFCRS"
              onClick={() => {
                setHasInteracted(true);
                setPostScore(prev => Math.max(0, prev - 1));
                playAlertChime('tap');
              }}
              className="royale-btn w-12 h-12 rounded-xl bg-white dark:bg-slate-900 text-lg font-extrabold text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer"
            >
              −
            </button>
            <span className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
              {postScore}
            </span>
            <button
              type="button"
              aria-label="Increase Post-Dose BFCRS"
              onClick={() => {
                setHasInteracted(true);
                setPostScore(prev => Math.min(baselineScore, prev + 1));
                playAlertChime('tap');
              }}
              className="royale-btn w-12 h-12 rounded-xl bg-white dark:bg-slate-900 text-lg font-extrabold text-slate-900 dark:text-white border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer"
            >
              +
            </button>
          </div>
          <p className="text-[11px] font-medium text-slate-500 text-center">Post-challenge score</p>
        </div>
      </div>

      {/* Challenge Interpretation */}
      <div
        className={`royale-card rounded-2xl p-4 ${
          result.isPositive
            ? 'bg-emerald-50/80 dark:bg-emerald-950/35 border-emerald-500 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
            : 'bg-amber-50/80 dark:bg-amber-950/35 border-amber-500 dark:border-amber-700 text-amber-950 dark:text-amber-100'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            {result.isPositive ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 stroke-[2.5]" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 stroke-[2.5]" />
            )}
            <span className="font-display font-extrabold text-xs sm:text-sm">
              {result.isPositive
                ? 'Positive Lorazepam Challenge (≥50% Reduction)'
                : 'Sub-50% Reduction (Repeat Dose / Consider ECT)'}
            </span>
          </div>
          <span className="font-mono tabular-nums text-xs sm:text-sm font-extrabold">
            {result.percentDrop}% Drop ({baselineScore} → {postScore} pts)
          </span>
        </div>
        <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-95 pl-6">
          {result.interpretation}
        </p>
      </div>
    </div>
  );
};
