/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { EMERGENCY_PATHWAYS, EmergencyPathway, SubPathwayTier } from './data/pathways.ts';
import { usePWAInstall } from './hooks/usePWAInstall.ts';
import { Header } from './components/Header.tsx';
import { AndroidFrame } from './components/AndroidFrame.tsx';
import { ModifiersBar } from './components/ModifiersBar.tsx';
import { Step0SafetyGate } from './components/Step0SafetyGate.tsx';
import { SyndromeSelector } from './components/SyndromeSelector.tsx';
import { SubPathwaySelector } from './components/SubPathwaySelector.tsx';
import { DecisionBanner } from './components/DecisionBanner.tsx';
import { LifecycleStepper } from './components/LifecycleStepper.tsx';
import { TriageModal } from './components/modals/TriageModal.tsx';
import { SourceRegistryModal } from './components/modals/SourceRegistryModal.tsx';
import { CitationDrawer } from './components/modals/CitationDrawer.tsx';
import { NoteModal } from './components/modals/NoteModal.tsx';
import { AndroidInstallModal } from './components/modals/AndroidInstallModal.tsx';
import { playAlertChime } from './utils/feedback.ts';
import {
  calculateBVC,
  calculateGurreraNMS,
  calculateHunterSS,
  calculateCIWAQuick,
  calculateBARSDystonia,
  calculateEXTRIPLithium,
  calculateIPSSuicide
} from './utils/clinicalCalculators.ts';
import { Compass, Layers, FileText, Smartphone } from 'lucide-react';

export default function App() {
  const [activePathwayId, setActivePathwayId] = useState<string>('agitation');
  const [activeTierId, setActiveTierId] = useState<string>('severe_im');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [adhdFocusMode, setAdhdFocusMode] = useState<boolean>(true);
  const [deviceViewMode, setDeviceViewMode] = useState<'desktop' | 'phone'>('desktop');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Modifiers and Checklists
  const [activeModifiers, setActiveModifiers] = useState<Set<string>>(new Set());
  const [step0Checked, setStep0Checked] = useState<Set<string>>(new Set());
  const [calcChecked, setCalcChecked] = useState<Set<string>>(new Set());
  const [labsChecked, setLabsChecked] = useState<Set<string>>(new Set());
  const [monChecked, setMonChecked] = useState<Set<string>>(new Set());
  const [mhcaChecked, setMhcaChecked] = useState<Set<string>>(new Set());

  // Modals
  const [isTriageOpen, setIsTriageOpen] = useState<boolean>(false);
  const [isRegistryOpen, setIsRegistryOpen] = useState<boolean>(false);
  const [isNoteOpen, setIsNoteOpen] = useState<boolean>(false);
  const [isAndroidInstallOpen, setIsAndroidInstallOpen] = useState<boolean>(false);
  const [selectedCitationId, setSelectedCitationId] = useState<string | null>(null);

  const protocolsRef = useRef<HTMLDivElement>(null);
  const { isInstallable, isInstalled, isAndroid, isIOS, install } = usePWAInstall();

  const currentPathway: EmergencyPathway =
    EMERGENCY_PATHWAYS[activePathwayId] || EMERGENCY_PATHWAYS.agitation;
  const currentTier: SubPathwayTier =
    currentPathway.tiers.find(t => t.id === activeTierId) || currentPathway.tiers[0];

  // Sync dark mode class on root html and body elements
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      document.body.classList.add('dark', 'bg-slate-950', 'text-slate-100');
      document.body.classList.remove('bg-[#F1F5F9]', 'text-[#0F172A]');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark', 'bg-slate-950', 'text-slate-100');
      document.body.classList.add('bg-[#F1F5F9]', 'text-[#0F172A]');
    }
  }, [isDarkMode]);

  // URL query parameter support for direct launcher links
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get('pathway');
    if (p && EMERGENCY_PATHWAYS[p]) {
      setActivePathwayId(p);
      setActiveTierId(EMERGENCY_PATHWAYS[p].tiers[0].id);
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsTriageOpen(false);
        setIsRegistryOpen(false);
        setIsNoteOpen(false);
        setIsAndroidInstallOpen(false);
        setSelectedCitationId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectPathway = (id: string) => {
    if (EMERGENCY_PATHWAYS[id]) {
      setActivePathwayId(id);
      setActiveTierId(EMERGENCY_PATHWAYS[id].tiers[0].id);
      setCalcChecked(new Set());
      playAlertChime('beep');
    }
  };

  const handleToggleModifier = (modId: string) => {
    setActiveModifiers(prev => {
      const next = new Set(prev);
      if (next.has(modId)) next.delete(modId);
      else next.add(modId);
      return next;
    });
    playAlertChime('beep');
  };

  const handleNewPatientReset = () => {
    setActiveModifiers(new Set());
    setStep0Checked(new Set());
    setCalcChecked(new Set());
    setLabsChecked(new Set());
    setMonChecked(new Set());
    setMhcaChecked(new Set());
    setActiveStageIndex(0);
    playAlertChime('success');
  };

  const handleSelectTriage = (pathwayId: string, tierId: string) => {
    if (EMERGENCY_PATHWAYS[pathwayId]) {
      setActivePathwayId(pathwayId);
      setActiveTierId(tierId);
      setCalcChecked(new Set());
      setActiveStageIndex(0);
      playAlertChime('beep');
    }
  };

  const scrollToProtocols = () => {
    protocolsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Compute current pathway calculator summary for handover note
  const getCalculatorEvaluation = () => {
    const validIds = new Set((currentPathway.calculator.items || []).map(i => i.id));
    const arr = Array.from(calcChecked).filter(id => validIds.has(id));
    switch (currentPathway.calculator.type) {
      case 'bvc':
        return calculateBVC(arr);
      case 'bfcrs':
        return {
          badge: `BFCRS Screening (${arr.length}/${(currentPathway.calculator.items || []).length} signs checked) & Lorazepam Challenge`,
          action: 'Score baseline BFCRS, administer Lorazepam 1–2 mg IV/IM, and reassess BFCRS at 5–30 minutes (≥50% reduction confirms catatonia) [BAP-CAT-2023].'
        };
      case 'gurrera_nms':
        return calculateGurreraNMS(arr);
      case 'hunter_ss':
        return calculateHunterSS(arr);
      case 'ciwa_quick':
        return calculateCIWAQuick(arr);
      case 'bars_dystonia':
        return calculateBARSDystonia(arr);
      case 'extrip_li':
        return calculateEXTRIPLithium(arr);
      case 'ips_suicide':
      default:
        return calculateIPSSuicide(arr);
    }
  };

  const calcEval = getCalculatorEvaluation();
  const isCompactPhone = deviceViewMode === 'phone';

  const appContent = (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F1F5F9] text-slate-900'
      }`}
    >
      {/* Top Bar Contract (3 zones: Wordmark — 4 Nav Links — 1 Primary Action) */}
      <Header
        onOpenTriage={() => setIsTriageOpen(true)}
        onOpenRegistry={() => setIsRegistryOpen(true)}
        onOpenNote={() => setIsNoteOpen(true)}
        onOpenAndroidInstall={() => setIsAndroidInstallOpen(true)}
        onFocusProtocols={scrollToProtocols}
        isCompactMode={isCompactPhone}
      />

      {/* Patient Context & Workspace Toolbar */}
      <ModifiersBar
        activeModifiers={activeModifiers}
        onToggleModifier={handleToggleModifier}
        onResetModifiers={() => setActiveModifiers(new Set())}
        onNewPatient={handleNewPatientReset}
        deviceViewMode={deviceViewMode}
        onToggleDeviceView={() =>
          setDeviceViewMode(prev => (prev === 'desktop' ? 'phone' : 'desktop'))
        }
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
      />

      {/* Main Clinical Workspace */}
      <main
        id="protocols"
        ref={protocolsRef}
        className={`max-w-7xl mx-auto w-full px-3.5 sm:px-6 py-5 flex-1 ${
          isCompactPhone ? 'pb-20 space-y-4' : 'pb-20 lg:pb-10'
        }`}
      >
        {isCompactPhone ? (
          /* Compact Android Phone Layout */
          <div className="space-y-4">
            <Step0SafetyGate
              checkedIds={step0Checked}
              onToggleCheck={id =>
                setStep0Checked(prev => {
                  const next = new Set(prev);
                  next.has(id) ? next.delete(id) : next.add(id);
                  return next;
                })
              }
              onClearAll={() => setStep0Checked(new Set())}
              isCompactMode={true}
            />

            <SyndromeSelector
              activePathwayId={activePathwayId}
              onSelectPathway={handleSelectPathway}
              isCompactMode={true}
            />

            <SubPathwaySelector
              pathway={currentPathway}
              activeTierId={activeTierId}
              onSelectTier={id => {
                setActiveTierId(id);
                playAlertChime('beep');
              }}
              activeModifiersCount={activeModifiers.size}
              isCompactMode={true}
            />

            <DecisionBanner
              pathway={currentPathway}
              tier={currentTier}
              activeModifiers={activeModifiers}
              onOpenCitation={id => setSelectedCitationId(id)}
              isCompactMode={true}
            />

            <LifecycleStepper
              pathway={currentPathway}
              activeStageIndex={activeStageIndex}
              onSelectStage={idx => {
                setActiveStageIndex(idx);
                playAlertChime('beep');
              }}
              adhdFocusMode={adhdFocusMode}
              onToggleFocusMode={() => setAdhdFocusMode(prev => !prev)}
              checkedCalcItems={calcChecked}
              onToggleCalcItem={id =>
                setCalcChecked(prev => {
                  const next = new Set(prev);
                  next.has(id) ? next.delete(id) : next.add(id);
                  return next;
                })
              }
              checkedLabs={labsChecked}
              onToggleLab={key =>
                setLabsChecked(prev => {
                  const next = new Set(prev);
                  next.has(key) ? next.delete(key) : next.add(key);
                  return next;
                })
              }
              checkedMon={monChecked}
              onToggleMon={key =>
                setMonChecked(prev => {
                  const next = new Set(prev);
                  next.has(key) ? next.delete(key) : next.add(key);
                  return next;
                })
              }
              checkedMhca={mhcaChecked}
              onToggleMhca={key =>
                setMhcaChecked(prev => {
                  const next = new Set(prev);
                  next.has(key) ? next.delete(key) : next.add(key);
                  return next;
                })
              }
              activeModifiers={activeModifiers}
              onToggleModifier={handleToggleModifier}
              onOpenCitation={id => setSelectedCitationId(id)}
              onOpenNote={() => setIsNoteOpen(true)}
            />
          </div>
        ) : (
          /* Desktop 12-Column Master-Detail Arena + Mobile Responsive Stack */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar: 8 Emergency Syndromes Command Deck + Triage Radar */}
            <div className="lg:col-span-3 lg:sticky lg:top-20 space-y-4 min-w-0">
              <SyndromeSelector
                activePathwayId={activePathwayId}
                onSelectPathway={handleSelectPathway}
                isCompactMode={false}
              />

              {/* Undifferentiated Presentation Triage Radar Card */}
              <div className="hidden lg:block royale-card p-4 rounded-2xl bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 space-y-2.5">
                <div className="font-display text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                  Undifferentiated Presentation?
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug font-medium">
                  Compare suggestive bedside sign clusters (e.g. mute + rigid, febrile + autonomic instability, or post-antipsychotic restlessness).
                </p>
                <button
                  type="button"
                  onClick={() => setIsTriageOpen(true)}
                  className="royale-btn min-h-[40px] w-full py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-500 border-teal-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Compass className="w-4 h-4 stroke-[2.5]" />
                  <span>Launch Symptom Triage</span>
                </button>
              </div>
            </div>

            {/* Right Main Column: Active Protocol Arena */}
            <div className="lg:col-span-9 space-y-5 min-w-0">
              <Step0SafetyGate
                checkedIds={step0Checked}
                onToggleCheck={id =>
                  setStep0Checked(prev => {
                    const next = new Set(prev);
                    next.has(id) ? next.delete(id) : next.add(id);
                    return next;
                  })
                }
                onClearAll={() => setStep0Checked(new Set())}
              />

              <SubPathwaySelector
                pathway={currentPathway}
                activeTierId={activeTierId}
                onSelectTier={id => {
                  setActiveTierId(id);
                  playAlertChime('beep');
                }}
                activeModifiersCount={activeModifiers.size}
                isCompactMode={false}
              />

              <DecisionBanner
                pathway={currentPathway}
                tier={currentTier}
                activeModifiers={activeModifiers}
                onOpenCitation={id => setSelectedCitationId(id)}
                isCompactMode={false}
              />

              <LifecycleStepper
                pathway={currentPathway}
                activeStageIndex={activeStageIndex}
                onSelectStage={idx => {
                  setActiveStageIndex(idx);
                  playAlertChime('beep');
                }}
                adhdFocusMode={adhdFocusMode}
                onToggleFocusMode={() => setAdhdFocusMode(prev => !prev)}
                checkedCalcItems={calcChecked}
                onToggleCalcItem={id =>
                  setCalcChecked(prev => {
                    const next = new Set(prev);
                    next.has(id) ? next.delete(id) : next.add(id);
                    return next;
                  })
                }
                checkedLabs={labsChecked}
                onToggleLab={key =>
                  setLabsChecked(prev => {
                    const next = new Set(prev);
                    next.has(key) ? next.delete(key) : next.add(key);
                    return next;
                  })
                }
                checkedMon={monChecked}
                onToggleMon={key =>
                  setMonChecked(prev => {
                    const next = new Set(prev);
                    next.has(key) ? next.delete(key) : next.add(key);
                    return next;
                  })
                }
                checkedMhca={mhcaChecked}
                onToggleMhca={key =>
                  setMhcaChecked(prev => {
                    const next = new Set(prev);
                    next.has(key) ? next.delete(key) : next.add(key);
                    return next;
                  })
                }
                activeModifiers={activeModifiers}
                onToggleModifier={handleToggleModifier}
                onOpenCitation={id => setSelectedCitationId(id)}
                onOpenNote={() => setIsNoteOpen(true)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Mobile & Android Ergonomic Bottom Navigation Deck (Natural Thumb Zone <= 15% Viewport Cap) */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className={`${
          isCompactPhone ? 'sticky bottom-0' : 'fixed bottom-0 left-0 right-0 md:hidden'
        } z-30 h-15 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t-2 border-slate-200 dark:border-slate-800 grid grid-cols-4 items-center px-1.5`}
      >
        <button
          type="button"
          onClick={scrollToProtocols}
          className="tap-target h-12 rounded-xl flex flex-col items-center justify-center text-teal-700 dark:text-teal-400 font-extrabold cursor-pointer"
        >
          <Layers className="w-4 h-4 stroke-[2.5]" />
          <span className="text-[10px] mt-0.5">Protocols</span>
        </button>
        <button
          type="button"
          onClick={() => setIsTriageOpen(true)}
          className="tap-target h-12 rounded-xl flex flex-col items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer"
        >
          <Compass className="w-4 h-4 stroke-[2.5]" />
          <span className="text-[10px] mt-0.5">Triage</span>
        </button>
        <button
          type="button"
          onClick={() => setIsNoteOpen(true)}
          className="tap-target h-12 rounded-xl flex flex-col items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer"
        >
          <FileText className="w-4 h-4 stroke-[2.5]" />
          <span className="text-[10px] mt-0.5">Handover</span>
        </button>
        <button
          type="button"
          onClick={() => setIsAndroidInstallOpen(true)}
          className="tap-target h-12 rounded-xl flex flex-col items-center justify-center text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer"
        >
          <Smartphone className="w-4 h-4 stroke-[2.5]" />
          <span className="text-[10px] mt-0.5">Get APK</span>
        </button>
      </nav>

      {/* Quiet Clinical Footer */}
      <footer className="hidden md:block border-t-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 px-6 mt-auto text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong className="font-extrabold text-slate-800 dark:text-slate-200">STAT-Psych India</strong>
            <span className="mx-2" aria-hidden="true">·</span>
            <span>Evidence-First Psychiatric Emergency CDSS (IPS CPG · CMC Vellore TREC · MHCA 2017)</span>
          </div>
          <div className="flex items-center gap-4 font-bold">
            <button
              type="button"
              onClick={() => setIsRegistryOpen(true)}
              className="hover:text-slate-900 dark:hover:text-white hover:underline cursor-pointer"
            >
              17 Primary Sources
            </button>
            <span aria-hidden="true">·</span>
            <a
              href="/AI_CONTEXT.md"
              download="STAT-Psych-India-AI_CONTEXT.md"
              className="text-teal-700 dark:text-teal-400 hover:underline cursor-pointer"
            >
              Download AI_CONTEXT.md
            </a>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setIsAndroidInstallOpen(true)}
              className="hover:text-slate-900 dark:hover:text-white hover:underline cursor-pointer"
            >
              Android APK v3.0.0
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <TriageModal
        isOpen={isTriageOpen}
        onClose={() => setIsTriageOpen(false)}
        onSelectTriage={handleSelectTriage}
      />

      <SourceRegistryModal
        isOpen={isRegistryOpen}
        onClose={() => setIsRegistryOpen(false)}
        onSelectCitation={id => {
          setIsRegistryOpen(false);
          setSelectedCitationId(id);
        }}
      />

      <CitationDrawer
        sourceId={selectedCitationId}
        onClose={() => setSelectedCitationId(null)}
      />

      <NoteModal
        isOpen={isNoteOpen}
        onClose={() => setIsNoteOpen(false)}
        pathway={currentPathway}
        tier={currentTier}
        activeModifiers={activeModifiers}
        step0Checked={step0Checked}
        calcChecked={calcChecked}
        labsChecked={labsChecked}
        monChecked={monChecked}
        mhcaChecked={mhcaChecked}
        calculatorBadge={calcEval.badge}
        calculatorAction={calcEval.action}
      />

      <AndroidInstallModal
        isOpen={isAndroidInstallOpen}
        onClose={() => setIsAndroidInstallOpen(false)}
        isInstallable={isInstallable}
        isInstalled={isInstalled}
        isAndroid={isAndroid}
        isIOS={isIOS}
        onInstall={install}
      />
    </div>
  );

  return (
    <AndroidFrame
      enabled={deviceViewMode === 'phone'}
      onToggleFrame={() => setDeviceViewMode(prev => (prev === 'desktop' ? 'phone' : 'desktop'))}
      onOpenApkModal={() => setIsAndroidInstallOpen(true)}
    >
      {appContent}
    </AndroidFrame>
  );
}
