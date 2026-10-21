import React, { useState } from 'react';
import { PATIENT_MODIFIERS } from '../data/pathways.ts';
import { isSoundMuted, setSoundMuted, playAlertChime } from '../utils/feedback.ts';
import {
  RotateCcw,
  Smartphone,
  Sun,
  Moon,
  Check,
  Volume2,
  VolumeX,
  ShieldAlert,
  HeartPulse,
  Baby,
  UserCheck,
  Wind,
  Wine,
  Activity,
  Droplets
} from 'lucide-react';

interface ModifiersBarProps {
  activeModifiers: Set<string>;
  onToggleModifier: (id: string) => void;
  onResetModifiers: () => void;
  onNewPatient: () => void;
  deviceViewMode: 'phone' | 'desktop';
  onToggleDeviceView: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const MODIFIER_ICONS: Record<string, React.ReactNode> = {
  hepatic: <Activity className="w-3.5 h-3.5 shrink-0" />,
  renal: <Droplets className="w-3.5 h-3.5 shrink-0" />,
  cardiac_qtc: <HeartPulse className="w-3.5 h-3.5 shrink-0" />,
  pregnancy: <Baby className="w-3.5 h-3.5 shrink-0" />,
  elderly: <UserCheck className="w-3.5 h-3.5 shrink-0" />,
  pediatric: <Baby className="w-3.5 h-3.5 shrink-0" />,
  copd: <Wind className="w-3.5 h-3.5 shrink-0" />,
  alcohol_intox: <Wine className="w-3.5 h-3.5 shrink-0" />
};

export const ModifiersBar: React.FC<ModifiersBarProps> = ({
  activeModifiers,
  onToggleModifier,
  onResetModifiers,
  onNewPatient,
  deviceViewMode,
  onToggleDeviceView,
  isDarkMode,
  onToggleDarkMode
}) => {
  const isPhone = deviceViewMode === 'phone';
  const [confirmPatientReset, setConfirmPatientReset] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(isSoundMuted());

  const handleToggleSound = () => {
    const next = !muted;
    setMuted(next);
    setSoundMuted(next);
    if (!next) playAlertChime('tap');
  };

  return (
    <section
      aria-label="Patient Risk Loadout and Workspace Controls"
      className="bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3"
    >
      <div
        className={`max-w-7xl mx-auto flex flex-col gap-3 ${
          isPhone ? '' : 'xl:flex-row xl:items-center justify-between'
        }`}
      >
        {/* Patient Risk Modifiers Deck */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-0">
          <div className="flex items-center justify-between sm:justify-start gap-2 shrink-0">
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 whitespace-nowrap">
              <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <span>Patient Risk Loadout:</span>
            </span>
            {activeModifiers.size > 0 && (
              <button
                type="button"
                onClick={onResetModifiers}
                className="sm:hidden text-xs font-extrabold text-rose-700 dark:text-rose-400 underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Clear ({activeModifiers.size})
              </button>
            )}
          </div>

          <div
            className={`flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 ${
              isPhone ? '' : 'sm:flex-wrap'
            }`}
          >
            {PATIENT_MODIFIERS.map(mod => {
              const isActive = activeModifiers.has(mod.id);
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => onToggleModifier(mod.id)}
                  aria-pressed={isActive}
                  title={mod.summaryRule}
                  className={`royale-btn min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-rose-600 text-white border-rose-800 dark:bg-rose-600 dark:border-rose-900 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-200/80 dark:hover:bg-slate-700'
                  }`}
                >
                  {isActive ? (
                    <Check className="w-3.5 h-3.5 stroke-[3] shrink-0" />
                  ) : (
                    <span className="text-slate-500 dark:text-slate-400">
                      {MODIFIER_ICONS[mod.id]}
                    </span>
                  )}
                  <span>{mod.shortTag}</span>
                </button>
              );
            })}
            {activeModifiers.size > 0 && (
              <button
                type="button"
                onClick={onResetModifiers}
                className="hidden sm:inline-flex px-2.5 py-1.5 text-xs font-extrabold text-rose-700 dark:text-rose-400 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Clear Loadout ({activeModifiers.size})
              </button>
            )}
          </div>
        </div>

        {/* Workspace Controls + Confirmed Reset Flow */}
        <div
          className={`flex flex-wrap items-center justify-between sm:justify-end gap-2 shrink-0 border-t border-slate-200/70 dark:border-slate-800 pt-2.5 ${
            isPhone ? '' : 'xl:border-t-0 xl:pt-0'
          }`}
        >
          <div className="flex items-center gap-1.5">
            {!isPhone && (
              <button
                type="button"
                onClick={onToggleDeviceView}
                className="hidden sm:flex royale-btn min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                title="Preview inside Android Phone Frame"
              >
                <Smartphone className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                <span>Phone Sim</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleToggleSound}
              className="royale-btn min-h-[38px] px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={muted ? 'Unmute Tactile Audio Feedback' : 'Mute Tactile Audio Feedback'}
              title={muted ? 'Unmute Tactile Audio' : 'Mute Tactile Audio'}
            >
              {muted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                  <span>Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>Audio FX</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onToggleDarkMode}
              className="royale-btn min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              aria-label={isDarkMode ? 'Switch to Daylight Clinical Theme' : 'Switch to Slate Night Theme'}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Daylight</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  <span>Night Shift</span>
                </>
              )}
            </button>
          </div>

          {!confirmPatientReset ? (
            <button
              type="button"
              onClick={() => setConfirmPatientReset(true)}
              className="royale-btn min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 dark:hover:bg-rose-950/50 dark:hover:text-rose-300 flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              title="Clear all active scores, timers, and modifiers for a new casualty patient"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Patient</span>
            </button>
          ) : (
            <div
              role="group"
              aria-label="Confirm Patient Reset"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/70 border-2 border-rose-300 dark:border-rose-800"
            >
              <span className="text-xs font-extrabold text-rose-900 dark:text-rose-200 whitespace-nowrap">
                Reset casualty session?
              </span>
              <button
                type="button"
                onClick={() => {
                  onNewPatient();
                  setConfirmPatientReset(false);
                }}
                className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold cursor-pointer whitespace-nowrap"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={() => setConfirmPatientReset(false)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 text-xs font-bold cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
