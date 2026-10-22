# STAT-Psych India (v3.0.0) — Compact AI Agent Context (Architecture + UI + Logic)

> Use this compact bundle (~80 KB) for AI chat windows with smaller attachment limits, or use `AI_CONTEXT.md` (~497 KB) for the 100% verbatim clinical data tables.


### File: `/README.md`
```md
# STAT-Psych India — Emergency Psychiatric CDSS (Android APK & Web App)

Evidence-first psychiatric emergency clinical decision support system (CDSS) for casualty and crisis care, grounded in **Indian Psychiatric Society (IPS) Clinical Practice Guidelines**, **CMC Vellore TREC Trials**, and the **Mental Healthcare Act (MHCA) 2017**.

---

## Direct Android APK Download (Tracked in GitHub Repository · v3.0.0)

The compiled, `zipalign`-aligned, and cryptographically signed (`v1` / `v2` / `v3` APK Signature Schemes) standalone Android APK binaries are tracked directly in this GitHub repository (explicitly whitelisted via `!*.apk` in [`.gitignore`](./.gitignore)):

- **Root Signed APK Binary**: [`./stat-psych-india.apk`](./stat-psych-india.apk)
- **Versioned v3.0.0 Release APK (Tactile Edition)**: [`./releases/stat-psych-india-v3.0.0.apk`](./releases/stat-psych-india-v3.0.0.apk)
- **Versioned v2.0.0 Release APK**: [`./releases/stat-psych-india-v2.0.0.apk`](./releases/stat-psych-india-v2.0.0.apk)
- **Versioned v1.0.0 Release APK**: [`./releases/stat-psych-india-v1.0.0.apk`](./releases/stat-psych-india-v1.0.0.apk)
- **Web Public Static APK**: [`./public/stat-psych-india.apk`](./public/stat-psych-india.apk)

### APK Package Details
| Property | Value |
| :--- | :--- |
| **Application Label** | `STAT-Psych India` |
| **Package Identifier** | `in.statpsych.cdss` |
| **Version** | `3.0.0` (`versionCode 3`) |
| **Minimum Android SDK** | Android 5.0+ (`API 21`) |
| **Target Android SDK** | Android 13+ (`API 33`) |
| **Offline Capability** | 100% self-contained (`WebView` loads bundled assets via `https://appassets.androidplatform.net`) |

### What's New in v3.0.0 (Tactile Edition)
- **Supercell-Inspired Tactile Command Deck & Severity Tiers**: Bold 3D-beveled cards, expressive syndrome emblems, instant $\le 140\text{ms}$ press feedback, and synthesized audio/haptic cues.
- **Treatment-Action Cards & Integrated Bedside Timer**: Clear 3-tile Dosing Strips (*Target Dose*, *Administration Route*, *Formulation*), 1-tap bedside option highlighting, and an integrated `15m IM` / `30m PO/IM` onset countdown timer.
- **Critical Safety Shield & Collapsed-by-Default Rationales**: Scannable contraindication bullet points, live Patient Risk Loadout overrides, and expandable clinical rationales with highlighted key findings and head-to-head trial outcome cards.

---

## Automated GitHub Actions APK Build & Release

This repository includes an automated GitHub Actions workflow at [`.github/workflows/build-android-apk.yml`](./.github/workflows/build-android-apk.yml):

1. **On every push to `main` / `master`** (or manual **Run workflow** dispatch in the GitHub **Actions** tab):
   - Runs all clinical calculator unit tests (`npm test`).
   - Compiles the production clinical web bundle (`npm run build`).
   - Packages, aligns (`zipalign`), and signs `stat-psych-india.apk` (`npm run build:apk`).
   - Commits the updated APK binaries back to the repository branch (`[skip ci]`).
   - Uploads **`stat-psych-india-apk`** as a downloadable **GitHub Actions Artifact**.
   - Automatically publishes `stat-psych-india.apk` and `stat-psych-india-v3.0.0.apk` to **GitHub Releases (`v3.0.0`)**.

---

## Building the APK Locally from Source

Android wrapper source files are located in [`./android/`](./android/):
- [`android/AndroidManifest.xml`](./android/AndroidManifest.xml)
- [`android/src/in/statpsych/cdss/MainActivity.java`](./android/src/in/statpsych/cdss/MainActivity.java)
- [`scripts/build-apk.sh`](./scripts/build-apk.sh)

To rebuild the signed APK locally on Ubuntu/Debian:

```bash
npm install
npm run build:apk
```

```

### File: `/package.json`
```json
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "build:apk": "bash scripts/build-apk.sh",
    "test": "tsx --test src/utils/clinicalCalculators.test.ts",
    "preview": "vite preview",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@tailwindcss/vite": "^4.3.3",
    "@vitejs/plugin-react": "^6.1.1",
    "lucide-react": "^0.546.0",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^8.3.0",
    "express": "^4.21.2",
    "dotenv": "^17.2.3",
    "motion": "^12.23.24"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.3.3",
    "tsx": "^4.21.0",
    "typescript": "^7.0.2",
    "vite-plugin-pwa": "^2.0.0"
  }
}

```

### File: `/src/index.css`
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  :root {
    --font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-sans: 'Public Sans', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  body {
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  }

  h1, h2, h3, h4, .font-display {
    font-family: var(--font-display);
    text-wrap: balance;
  }

  .font-mono, .tabular-nums {
    font-family: var(--font-mono);
    font-variant-numeric: tabular-nums;
  }
}

/* Subtle clinical scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(100, 116, 139, 0.3);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.5);
}

/* Hide scrollbar for horizontal chip carousels */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Supercell-inspired Tactile Game-Quality Micro-Interactions (<= 150ms compositor-only transform) */
.tap-target {
  min-height: 44px;
  transition: transform 130ms cubic-bezier(0.16, 1, 0.3, 1), opacity 130ms cubic-bezier(0.16, 1, 0.3, 1);
}
.tap-target:active {
  transform: translateY(2px) scale(0.985);
}

/* Tactile 3D-Beveled Card Surface (Symmetric border with crisp bottom lip) */
.royale-card {
  border-width: 2px;
  border-bottom-width: 4px;
  transition: transform 140ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Tactile 3D-Beveled Interactive Button */
.royale-btn {
  min-height: 44px;
  border-width: 2px;
  border-bottom-width: 4px;
  transition: transform 120ms cubic-bezier(0.16, 1, 0.3, 1), opacity 120ms cubic-bezier(0.16, 1, 0.3, 1);
}
.royale-btn:active {
  transform: translateY(2px);
}

@media (prefers-reduced-motion: reduce) {
  .tap-target,
  .royale-card,
  .royale-btn {
    transition: none !important;
    transform: none !important;
  }
}

```

### File: `/src/App.tsx`
```typescript
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

```

### File: `/src/utils/feedback.ts`
```typescript
/**
 * Web Audio API synthesized tactile feedback chimes and device vibration for clinical actions,
 * card selections, bedside timers, and critical alerts.
 */

let soundMuted = false;

export function isSoundMuted(): boolean {
  return soundMuted;
}

export function setSoundMuted(muted: boolean): void {
  soundMuted = muted;
}

export function playAlertChime(type: 'tap' | 'beep' | 'success' | 'warning' = 'beep') {
  // Device haptic vibration (supported on Android WebView & Chrome!)
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      if (type === 'warning') navigator.vibrate([180, 80, 180, 80, 260]);
      else if (type === 'success') navigator.vibrate([70, 40, 110]);
      else if (type === 'tap') navigator.vibrate(25);
      else navigator.vibrate(45);
    }
  } catch {
    // ignore
  }

  if (soundMuted) return;

  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (type === 'tap') {
      // Crisp, tactile pop for card/checkbox toggles
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.065);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.065);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.07);
    } else if (type === 'beep') {
      // Tactile deck card selection chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.16, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } else if (type === 'success') {
      // Rising 3-note chord for completed checklists or logged regimens
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + (i + 1) * 0.08 + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + (i + 1) * 0.08 + 0.16);
      });
    } else if (type === 'warning') {
      // Urgent triple pulse for timer expiration or high-risk alert
      [880, 880, 880].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.16);
        gain.gain.setValueAtTime(0.14, ctx.currentTime + i * 0.16);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + i * 0.16 + 0.11);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.16);
        osc.stop(ctx.currentTime + i * 0.16 + 0.12);
      });
    }

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 900);
  } catch {
    // Non-fatal if audio context blocked by browser autoplay policy
  }
}

```

### File: `/src/utils/clinicalCalculators.ts`
```typescript
/**
 * Clinical calculation and decision-rule evaluator for psychiatric emergencies.
 * Tested via node:test unit tests.
 */

export interface BVCResult {
  score: number;
  riskTier: 'low' | 'moderate' | 'high';
  badge: string;
  action: string;
}

export function calculateBVC(checkedIds: string[]): BVCResult {
  const score = checkedIds.length;
  if (score === 0) {
    return {
      score,
      riskTier: 'low',
      badge: 'BVC Score: 0/6 — Low Imminent Violence Risk',
      action: 'Continue calm verbal engagement and routine medical/psychiatric evaluation. (Note: BVC is validated on inpatient wards; use alongside clinical judgment in Casualty) [IPS-AGIT-2023].'
    };
  }
  if (score <= 2) {
    return {
      score,
      riskTier: 'moderate',
      badge: `BVC Score: ${score}/6 — Moderate Risk (Preventive Measures Indicated)`,
      action: 'Initiate 1-to-1 verbal de-escalation, move to low-stimulation area, offer oral medication (Oral Lorazepam 1–2mg or Risperidone 1–2mg), and reassess frequently. (Note: BVC is validated on inpatient wards, not casualty) [IPS-AGIT-2023].'
    };
  }
  return {
    score,
    riskTier: 'high',
    badge: `BVC Score: ${score}/6 — HIGH IMMINENT VIOLENCE RISK (Preventive + Emergency Plan)`,
    action: 'Immediate verbal de-escalation + prepare IM Rapid Tranquillisation (Haloperidol 5–10mg + Promethazine 25–50mg IM OR IM Lorazepam 2mg) [IPS-AGIT-2023].'
  };
}

export interface BFCRSChallengeResult {
  baseline: number;
  post: number;
  pointDrop: number;
  percentDrop: number;
  isPositive: boolean;
  interpretation: string;
}

export function calculateBFCRSReduction(baseline: number, post: number): BFCRSChallengeResult {
  const safeBase = Math.max(1, baseline);
  const safePost = Math.max(0, post);
  const pointDrop = safeBase - safePost;
  const percentDrop = Math.round((pointDrop / safeBase) * 100);
  const isPositive = percentDrop >= 50;

  return {
    baseline: safeBase,
    post: safePost,
    pointDrop,
    percentDrop,
    isPositive,
    interpretation: isPositive
      ? `Positive Lorazepam Challenge (${percentDrop}% reduction ≥50%). Confirm diagnosis and titrate scheduled Lorazepam up to 8–16 mg/day in divided doses [BAP-CAT-2023].`
      : `Sub-50% response (${percentDrop}% reduction). Administer second dose of Lorazepam 1–2 mg IV/IM and reassess; prepare for urgent Bilateral Modified ECT if no response [BAP-CAT-2023].`
  };
}

export interface GurreraNMSResult {
  score: number;
  isDefinite: boolean;
  isIntermediate: boolean;
  badge: string;
  action: string;
}

const GURRERA_WEIGHTS: Record<string, number> = {
  nms_1: 20,
  nms_2: 18,
  nms_3: 17,
  nms_4: 13,
  nms_5: 10,
  nms_6: 10,
  nms_7: 7,
  nms_8: 5
};

export function calculateGurreraNMS(checkedIds: string[]): GurreraNMSResult {
  const score = checkedIds.reduce((sum, id) => sum + (GURRERA_WEIGHTS[id] || 0), 0);
  const isDefinite = score >= 74;
  const isIntermediate = score >= 50 && score < 74;

  if (isDefinite) {
    return {
      score,
      isDefinite: true,
      isIntermediate: false,
      badge: `Consensus NMS Score: ${score}/100 (≥74 Validated Threshold Met — DEFINITE NMS)`,
      action: 'Confirmed NMS: Stop all dopamine antagonists, transfer to ICU, aggressive IV hydration, Lorazepam 1–2mg + Bromocriptine ± Dantrolene [GURRERA-NMS-2011, IPS-TOX-2022].'
    };
  }
  if (isIntermediate) {
    return {
      score,
      isDefinite: false,
      isIntermediate: true,
      badge: `Consensus NMS Score: ${score}/100 — Intermediate / Evolving Suspicion (Validated Cutoff ≥74)`,
      action: 'Hold antipsychotics immediately, check stat CPK/Urine myoglobin/CBC, hydrate, and start Lorazepam 1–2mg q4–6h while monitoring for progression [IPS-TOX-2022, GURRERA-NMS-2011].'
    };
  }
  return {
    score,
    isDefinite: false,
    isIntermediate: false,
    badge: `Consensus NMS Score: ${score}/100 (Validated Threshold for Definite NMS is ≥74)`,
    action: 'Continue monitoring vitals, rigidity, and CPK; rule out Serotonin Syndrome or CNS infection [GURRERA-NMS-2011].'
  };
}

export interface HunterSSResult {
  hasPrerequisite: boolean;
  rulesMetCount: number;
  isPositive: boolean;
  badge: string;
  action: string;
}

export function calculateHunterSS(checkedIds: string[]): HunterSSResult {
  const hasPrerequisite = checkedIds.includes('h_0');
  const validRuleIds = ['h_1', 'h_2', 'h_3', 'h_4', 'h_5'];
  const rulesMet = validRuleIds.filter(id => checkedIds.includes(id));
  const rulesMetCount = rulesMet.length;
  const isPositive = hasPrerequisite && rulesMetCount >= 1;

  if (!hasPrerequisite && rulesMetCount > 0) {
    return {
      hasPrerequisite: false,
      rulesMetCount,
      isPositive: false,
      badge: `${rulesMetCount} Hunter Rule(s) Ticked — BUT No Serotonergic Agent Exposure Confirmed`,
      action: 'Hunter criteria apply ONLY in the presence of a serotonergic agent. Audit full drug chart (Tramadol, Linezolid, Dextromethorphan, Lithium, SSRIs) [HUNTER-SS-2003, IPS-TOX-2022].'
    };
  }
  if (isPositive) {
    return {
      hasPrerequisite: true,
      rulesMetCount,
      isPositive: true,
      badge: `HUNTER CRITERIA POSITIVE (Exposure + ${rulesMetCount} Rule Met — 84% Sens / 97% Spec)`,
      action: 'Serotonin Toxicity Confirmed: Discontinue all serotonergic agents, give IV Benzodiazepines + IV fluids; if Temp >39°C or truncal rigidity -> immediate ICU cooling, intubation & Vecuronium/Rocuronium paralysis [HUNTER-SS-2003, CHIEW-SS-2024].'
    };
  }
  if (!hasPrerequisite && rulesMetCount === 0) {
    return {
      hasPrerequisite: false,
      rulesMetCount: 0,
      isPositive: false,
      badge: 'Step 1: Tick Serotonergic Agent Exposure Prerequisite First',
      action: 'Review full drug chart for SSRIs, SNRIs, TCAs, MAOIs, Tramadol, Linezolid, Dextromethorphan, or Lithium [HUNTER-SS-2003, IPS-TOX-2022].'
    };
  }
  return {
    hasPrerequisite: true,
    rulesMetCount: 0,
    isPositive: false,
    badge: 'Serotonergic Exposure Confirmed — 0/5 Hunter Rules Met',
    action: 'Note: In severe rigidity (Temp >40°C), extreme truncal rigidity can mask peripheral clonus—always treat rigid hyperthermic patients aggressively in ICU [CHIEW-SS-2024].'
  };
}

export interface CIWAResult {
  score: number;
  isSevereOrDT: boolean;
  isModerate: boolean;
  badge: string;
  action: string;
}

const CIWA_WEIGHTS: Record<string, number> = {
  cw_1: 4,
  cw_2: 4,
  cw_3: 4,
  cw_4: 5,
  cw_5: 6,
  cw_6: 5,
  cw_7: 6
};

export function calculateCIWAQuick(checkedIds: string[]): CIWAResult {
  const score = checkedIds.reduce((sum, id) => sum + (CIWA_WEIGHTS[id] || 0), 0);
  const isSevereOrDT = checkedIds.includes('cw_5') || checkedIds.includes('cw_7') || score >= 15;
  const isModerate = score >= 8 && !isSevereOrDT;

  if (isSevereOrDT) {
    return {
      score,
      isSevereOrDT: true,
      isModerate: false,
      badge: `Severe Withdrawal / Delirium Tremens / Wernicke Alert (Score: ${score})`,
      action: 'STAT Inj Thiamine 500 mg IV TID (before or together with glucose!) + Inj MgSO4 2 g IV + Symptom-triggered IV Lorazepam 2–4 mg / Diazepam 10 mg q15–30m until calm [IPS-GERI-2023].'
    };
  }
  if (isModerate) {
    return {
      score,
      isSevereOrDT: false,
      isModerate: true,
      badge: `Moderate-Severe Uncomplicated Withdrawal (Score: ${score})`,
      action: 'Inj Thiamine ≥250 mg IM/IV + Symptom-triggered Oral/IV Lorazepam 2 mg or Diazepam 10 mg q1–2h [IPS-SUBST-2023, IPS-GERI-2023].'
    };
  }
  return {
    score,
    isSevereOrDT: false,
    isModerate: false,
    badge: `Mild Withdrawal (Score: ${score})`,
    action: 'Administer prophylactic Thiamine + monitor CIWA-Ar and vitals every 2–4 hours [IPS-SUBST-2023].'
  };
}

export interface BARSResult {
  isAirwayEmergency: boolean;
  isFocalDystonia: boolean;
  isAkathisia: boolean;
  isSuicideAlert: boolean;
  badge: string;
  action: string;
}

export function calculateBARSDystonia(checkedIds: string[]): BARSResult {
  const isAirwayEmergency = checkedIds.includes('da_1');
  const isFocalDystonia = checkedIds.includes('da_2');
  const isAkathisia = checkedIds.includes('da_4') || checkedIds.includes('da_5') || checkedIds.includes('da_6');
  const isSuicideAlert = checkedIds.includes('da_6');

  if (isAirwayEmergency) {
    return {
      isAirwayEmergency: true,
      isFocalDystonia: false,
      isAkathisia: false,
      isSuicideAlert: false,
      badge: 'CRITICAL: LARYNGEAL DYSTONIA — AIRWAY EMERGENCY',
      action: 'Give Inj Lorazepam 1–2 mg IV push (or Diazepam 2–5 mg IV) + Inj Biperiden 5 mg IV or Diphenhydramine 25–50 mg IV or Promethazine 25–50 mg deep IM STAT + 100% O2 [IPS-TOX-2022]!'
    };
  }
  if (isFocalDystonia) {
    return {
      isAirwayEmergency: false,
      isFocalDystonia: true,
      isAkathisia: false,
      isSuicideAlert: false,
      badge: 'Acute Focal Dystonia Confirmed',
      action: 'Administer Inj Promethazine 25–50 mg deep IM, Diphenhydramine 25–50 mg IM/IV, or Biperiden 5 mg IM/IV; resolves in 5–20 min [IPS-TOX-2022].'
    };
  }
  if (isAkathisia) {
    return {
      isAirwayEmergency: false,
      isFocalDystonia: false,
      isAkathisia: true,
      isSuicideAlert,
      badge: `Acute Antipsychotic-Induced Akathisia ${isSuicideAlert ? '+ SUICIDE RISK ALERT' : ''}`,
      action: 'Do NOT increase antipsychotic! Reduce/switch antipsychotic + start Tab Propranolol 40–80 mg/d (or Mirtazapine 15 mg OD) + Lorazepam 1–2 mg [IPS-TOX-2022].'
    };
  }
  return {
    isAirwayEmergency: false,
    isFocalDystonia: false,
    isAkathisia: false,
    isSuicideAlert: false,
    badge: 'Tap observed movement findings above',
    action: 'Check timing of recent antipsychotic or antiemetic administration [IPS-TOX-2022].'
  };
}

export interface EXTRIPLiResult {
  isClass1D: boolean;
  isClass2D: boolean;
  badge: string;
  action: string;
}

export function calculateEXTRIPLithium(checkedIds: string[]): EXTRIPLiResult {
  const isClass1D = checkedIds.includes('li_1') || checkedIds.includes('li_2');
  const isClass2D = checkedIds.includes('li_3') || checkedIds.includes('li_4') || checkedIds.includes('li_5');

  if (isClass1D) {
    return {
      isClass1D: true,
      isClass2D: false,
      badge: 'EXTRIP CLASS 1D: URGENT HEMODIALYSIS RECOMMENDED',
      action: 'Initiate Intermittent Hemodialysis immediately (preferred over CRRT); continue until [Li+] <1.0 mEq/L or clinical improvement (min 6h) and check 12h post-HD rebound [EXTRIP-LI-2015, IPS-TOX-2022].'
    };
  }
  if (isClass2D) {
    return {
      isClass1D: false,
      isClass2D: true,
      badge: 'EXTRIP CLASS 2D / IPS 2022: HEMODIALYSIS SUGGESTED',
      action: 'Nephrology consult for Hemodialysis + aggressive IV 0.9% NaCl hydration (1.5–2x maintenance) + serial [Li+] every 4–6h [EXTRIP-LI-2015, IPS-TOX-2022].'
    };
  }
  return {
    isClass1D: false,
    isClass2D: false,
    badge: 'Medical Management (No Immediate Dialysis Trigger Selected)',
    action: 'Hold Lithium & NSAIDs/ACEi/Thiazides, infuse IV 0.9% Normal Saline, and monitor serial [Li+], Na+, Creatinine, and neuro status q4–6h [EXTRIP-LI-2015].'
  };
}

export interface IPSSuicideResult {
  redFlagsCount: number;
  totalFactors: number;
  requiresAdmission: boolean;
  badge: string;
  action: string;
}

export function calculateIPSSuicide(checkedIds: string[]): IPSSuicideResult {
  const redFlagIds = ['su_1', 'su_2', 'su_3'];
  const redFlagsCount = redFlagIds.filter(id => checkedIds.includes(id)).length;
  const totalFactors = checkedIds.length;
  const requiresAdmission = redFlagsCount > 0;

  if (requiresAdmission) {
    return {
      redFlagsCount,
      totalFactors,
      requiresAdmission: true,
      badge: 'RED FLAGS PRESENT — INPATIENT ADMISSION STRONGLY INDICATED',
      action: 'Admit after medical stabilization; place bed near nursing station, 24x7 family attendant, unpredictable random ≤15m checks, ligature removal; consider Bilateral ECT / Lithium / Clozapine [IPS-SUIC-2023].'
    };
  }
  if (totalFactors > 0) {
    return {
      redFlagsCount: 0,
      totalFactors,
      requiresAdmission: false,
      badge: 'Risk Factors Present — Comprehensive Clinical Formulation Required',
      action: 'Conduct needs-based assessment, separate collateral family interview, 6-Step Stanley-Brown Safety Plan, and strict lethal-means restriction; admit if family supervision is inadequate [IPS-SUIC-2023].'
    };
  }
  return {
    redFlagsCount: 0,
    totalFactors: 0,
    requiresAdmission: false,
    badge: 'No Red Flags Ticked — Comprehensive Clinical Evaluation Required',
    action: 'Checklist scores alone cannot rule out suicide risk. Complete full MSE (once sobriety/sensorium clears) and separate collateral family history before any discharge decision [IPS-SUIC-2023].'
  };
}

export interface ComorbidityConflict {
  title: string;
  warning: string;
}

export function detectComorbidityConflicts(activeModifiers: string[]): ComorbidityConflict[] {
  const set = new Set(activeModifiers);
  const conflicts: ComorbidityConflict[] = [];

  if (set.has('qtc') && set.has('alcohol_cns')) {
    conflicts.push({
      title: 'Conflicting Modifiers (Prolonged QTc + Alcohol/Opioid Onboard)',
      warning: 'QTc prolongation contraindicates Haloperidol, while acute alcohol/opioid intoxication contraindicates parenteral Benzodiazepines (respiratory arrest). Action: Prioritize verbal de-escalation, obtain stat 12-lead ECG & electrolytes (correct K+/Mg2+), consider Oral Aripiprazole 5–10 mg if cooperative, and consult Senior Psychiatrist before administering any parenteral sedative with continuous pulse oximetry and airway cart at bedside [IPS-AGIT-2022, IPS-AGIT-2023].'
    });
  }

  if (set.has('qtc') && set.has('copd')) {
    conflicts.push({
      title: 'Conflicting Modifiers (Prolonged QTc + COPD/Resp Compromise)',
      warning: 'Prolonged QTc avoids Haloperidol, while COPD avoids parenteral Benzodiazepines (CO2 retention). Action: Check stat ECG & ABG/SpO2, correct K+/Mg2+, use Oral Aripiprazole 5–10 mg (lowest QTc & respiratory risk) or lowest-dose titrated agent under Senior review with continuous monitoring [IPS-AGIT-2022, IPS-AGIT-2023].'
    });
  }

  if (set.has('hepatic') && set.has('renal')) {
    conflicts.push({
      title: 'Hepatorenal / Combined Impairment Alert',
      warning: 'Both hepatic and renal clearance pathways compromised: Strongly prefer Lorazepam (direct glucuronidation, no active metabolites; avoid Diazepam/Chlordiazepoxide) and immediately discontinue Lithium, Valproate, and Dantrolene. Check serum ammonia, creatinine, and electrolytes [IPS-AGIT-2022, EXTRIP-LI-2015].'
    });
  }

  return conflicts;
}

```

### File: `/src/components/Header.tsx`
```typescript
import React from 'react';
import { Download } from 'lucide-react';

interface HeaderProps {
  onOpenTriage: () => void;
  onOpenRegistry: () => void;
  onOpenNote: () => void;
  onOpenAndroidInstall: () => void;
  onFocusProtocols: () => void;
  isCompactMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTriage,
  onOpenRegistry,
  onOpenNote,
  onOpenAndroidInstall,
  onFocusProtocols,
  isCompactMode = false
}) => {
  return (
    <header className="sticky top-0 z-30 h-14 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b-2 border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-8">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#protocols"
        onClick={(e) => {
          e.preventDefault();
          onFocusProtocols();
        }}
        className="font-display text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0"
      >
        STAT-Psych India
      </a>

      {/* Zone 2: 4 concise single-line text navigation links */}
      {!isCompactMode && (
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-bold text-slate-600 dark:text-slate-300"
        >
          <button
            type="button"
            onClick={onFocusProtocols}
            className="text-slate-900 dark:text-white hover:text-teal-700 dark:hover:text-teal-400 underline decoration-teal-600 decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Emergency Protocols
          </button>
          <button
            type="button"
            onClick={onOpenTriage}
            className="hover:text-slate-900 dark:hover:text-white hover:underline decoration-slate-400 decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Symptom Triage
          </button>
          <button
            type="button"
            onClick={onOpenRegistry}
            className="hover:text-slate-900 dark:hover:text-white hover:underline decoration-slate-400 decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Evidence Library
          </button>
          <button
            type="button"
            onClick={onOpenNote}
            className="hover:text-slate-900 dark:hover:text-white hover:underline decoration-slate-400 decoration-2 underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Handover Note
          </button>
        </nav>
      )}

      {/* Zone 3: 1 Primary Action */}
      <div className="flex items-center shrink-0">
        <button
          type="button"
          onClick={onOpenAndroidInstall}
          className="royale-btn px-3.5 py-1.5 min-h-[38px] text-xs font-extrabold text-white bg-teal-600 hover:bg-teal-500 border-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 dark:border-teal-800 rounded-xl flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
          <span>Download .APK</span>
        </button>
      </div>
    </header>
  );
};

```

### File: `/src/components/ModifiersBar.tsx`
```typescript
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

```

### File: `/src/components/Step0SafetyGate.tsx`
```typescript
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

```

### File: `/src/components/SyndromeSelector.tsx`
```typescript
import React, { useState } from 'react';
import { EMERGENCY_PATHWAYS } from '../data/pathways.ts';
import {
  ChevronRight,
  LayoutGrid,
  Zap,
  Brain,
  Flame,
  Sparkles,
  Wine,
  Wind,
  Droplets,
  ShieldAlert
} from 'lucide-react';

interface SyndromeSelectorProps {
  activePathwayId: string;
  onSelectPathway: (id: string) => void;
  isCompactMode?: boolean;
}

const SYNDROME_SHORT_SUBTITLES: Record<string, string> = {
  agitation: 'Oral vs IM Rapid Tranquillisation',
  catatonia: 'BFCRS Screen · Lorazepam Challenge',
  nms: 'Stop D2 Blocker · Cooling · Bromocriptine',
  serotonin: 'Hunter Clonus Criteria · BZD · Cyproheptadine',
  alcohol_dt: 'IV Thiamine + MgSO4 · Front-Loaded BZD',
  dystonia_akathisia: 'Stridor Airway Rescue · Promethazine · Propranolol',
  lithium_tox: '0.9% NaCl Hydration · EXTRIP Hemodialysis',
  suicide_dsh: '3-Tier Risk · Safety Plan · MHCA Sec 115'
};

interface SyndromeVisualTheme {
  icon: React.ReactNode;
  activeBg: string;
  activeBorder: string;
  iconBoxIdle: string;
  iconBoxActive: string;
}

const SYNDROME_THEMES: Record<string, SyndromeVisualTheme> = {
  agitation: {
    icon: <Zap className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-teal-700 dark:bg-teal-600 text-white',
    activeBorder: 'border-teal-900 dark:border-teal-800',
    iconBoxIdle: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800',
    iconBoxActive: 'bg-teal-900/40 text-white border-teal-400/40'
  },
  catatonia: {
    icon: <Brain className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-indigo-700 dark:bg-indigo-600 text-white',
    activeBorder: 'border-indigo-950 dark:border-indigo-800',
    iconBoxIdle: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    iconBoxActive: 'bg-indigo-950/40 text-white border-indigo-400/40'
  },
  nms: {
    icon: <Flame className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-rose-700 dark:bg-rose-600 text-white',
    activeBorder: 'border-rose-950 dark:border-rose-800',
    iconBoxIdle: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    iconBoxActive: 'bg-rose-950/40 text-white border-rose-400/40'
  },
  serotonin: {
    icon: <Sparkles className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-amber-600 dark:bg-amber-600 text-white',
    activeBorder: 'border-amber-800 dark:border-amber-800',
    iconBoxIdle: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    iconBoxActive: 'bg-amber-900/40 text-white border-amber-300/40'
  },
  alcohol_dt: {
    icon: <Wine className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-emerald-700 dark:bg-emerald-600 text-white',
    activeBorder: 'border-emerald-950 dark:border-emerald-800',
    iconBoxIdle: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    iconBoxActive: 'bg-emerald-950/40 text-white border-emerald-400/40'
  },
  dystonia_akathisia: {
    icon: <Wind className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-cyan-700 dark:bg-cyan-600 text-white',
    activeBorder: 'border-cyan-950 dark:border-cyan-800',
    iconBoxIdle: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    iconBoxActive: 'bg-cyan-950/40 text-white border-cyan-400/40'
  },
  lithium_tox: {
    icon: <Droplets className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-blue-700 dark:bg-blue-600 text-white',
    activeBorder: 'border-blue-950 dark:border-blue-800',
    iconBoxIdle: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    iconBoxActive: 'bg-blue-950/40 text-white border-blue-400/40'
  },
  suicide_dsh: {
    icon: <ShieldAlert className="w-5 h-5 stroke-[2.5]" />,
    activeBg: 'bg-rose-800 dark:bg-rose-700 text-white',
    activeBorder: 'border-rose-950 dark:border-rose-900',
    iconBoxIdle: 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    iconBoxActive: 'bg-rose-950/40 text-white border-rose-400/40'
  }
};

export const SyndromeSelector: React.FC<SyndromeSelectorProps> = ({
  activePathwayId,
  onSelectPathway,
  isCompactMode = false
}) => {
  const pathways = Object.values(EMERGENCY_PATHWAYS);
  const [mobileDirectoryOpen, setMobileDirectoryOpen] = useState<boolean>(false);

  const renderMobileCompactSelector = () => (
    <section aria-label="Presenting Emergency Syndrome Deck" className="space-y-2.5">
      <div className="flex items-center justify-between gap-2 px-0.5">
        <span className="font-display text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200">
          Emergency Syndrome Deck (8 Protocols)
        </span>
        <button
          type="button"
          aria-expanded={mobileDirectoryOpen}
          onClick={() => setMobileDirectoryOpen(prev => !prev)}
          className="royale-btn min-h-[34px] px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-xs font-extrabold text-teal-700 dark:text-teal-400 flex items-center gap-1.5 cursor-pointer"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>{mobileDirectoryOpen ? 'Deck Strip' : 'All 8 Cards'}</span>
        </button>
      </div>

      {/* Horizontal Tactile Battle Deck Strip for Instant 1-Tap Switching */}
      {!mobileDirectoryOpen ? (
        <div
          role="tablist"
          aria-label="Quick Syndrome Switcher"
          className="flex items-stretch gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1"
        >
          {pathways.map(pw => {
            const isSelected = pw.id === activePathwayId;
            const theme = SYNDROME_THEMES[pw.id] || SYNDROME_THEMES.agitation;
            return (
              <button
                key={pw.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => onSelectPathway(pw.id)}
                className={`royale-btn shrink-0 rounded-2xl px-3.5 py-2.5 text-left cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? `${theme.activeBg} ${theme.activeBorder} shadow-sm`
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:border-slate-400'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                    isSelected ? theme.iconBoxActive : theme.iconBoxIdle
                  }`}
                >
                  {theme.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-mono tabular-nums font-bold ${
                        isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      #{pw.icon}
                    </span>
                    <span className="font-display text-xs sm:text-sm font-extrabold whitespace-nowrap">
                      {pw.shortTitle}
                    </span>
                  </div>
                  <div
                    className={`text-[11px] truncate max-w-[175px] ${
                      isSelected ? 'text-white/90 font-medium' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {SYNDROME_SHORT_SUBTITLES[pw.id]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {pathways.map(pw => {
            const isSelected = pw.id === activePathwayId;
            const theme = SYNDROME_THEMES[pw.id] || SYNDROME_THEMES.agitation;
            return (
              <button
                key={pw.id}
                type="button"
                aria-current={isSelected ? 'true' : undefined}
                onClick={() => {
                  onSelectPathway(pw.id);
                  setMobileDirectoryOpen(false);
                }}
                className={`royale-btn rounded-2xl p-3 text-left flex items-center justify-between gap-3 cursor-pointer ${
                  isSelected
                    ? `${theme.activeBg} ${theme.activeBorder} shadow-sm`
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      isSelected ? theme.iconBoxActive : theme.iconBoxIdle
                    }`}
                  >
                    {theme.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-mono tabular-nums font-bold ${
                          isSelected ? 'text-white/80' : 'text-slate-400'
                        }`}
                      >
                        #{pw.icon}
                      </span>
                      <span className="font-display text-sm font-extrabold truncate">
                        {pw.shortTitle}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${
                        isSelected ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {SYNDROME_SHORT_SUBTITLES[pw.id] || pw.tagline}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-white' : 'text-slate-400'
                  }`}
                />
              </button>
            );
          })}
        </div>
      )}
    </section>
  );

  if (isCompactMode) {
    return renderMobileCompactSelector();
  }

  return (
    <>
      {/* Mobile & Tablet (<1024px) Compact Deck */}
      <div className="lg:hidden">{renderMobileCompactSelector()}</div>

      {/* Desktop (≥1024px) Left Tactical Command Deck */}
      <aside aria-label="Emergency Syndromes Command Deck" className="hidden lg:block space-y-2.5">
        <div className="px-1 flex items-center justify-between">
          <h2 className="font-display text-xs font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Emergency Command Deck
          </h2>
          <span className="text-xs font-mono font-bold text-slate-500 tabular-nums">8 Syndromes</span>
        </div>

        <div className="space-y-2">
          {pathways.map(pw => {
            const isSelected = pw.id === activePathwayId;
            const theme = SYNDROME_THEMES[pw.id] || SYNDROME_THEMES.agitation;
            return (
              <button
                key={pw.id}
                type="button"
                aria-current={isSelected ? 'true' : undefined}
                onClick={() => onSelectPathway(pw.id)}
                className={`royale-btn w-full rounded-2xl p-3 text-left flex items-center justify-between gap-2.5 cursor-pointer ${
                  isSelected
                    ? `${theme.activeBg} ${theme.activeBorder} shadow-sm`
                    : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      isSelected ? theme.iconBoxActive : theme.iconBoxIdle
                    }`}
                  >
                    {theme.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="font-display text-sm font-extrabold truncate">
                        {pw.shortTitle}
                      </span>
                      <span
                        className={`text-[11px] font-mono tabular-nums font-bold shrink-0 ${
                          isSelected ? 'text-white/80' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        {pw.icon}
                      </span>
                    </div>
                    <p
                      className={`text-xs truncate mt-0.5 ${
                        isSelected ? 'text-white/90 font-medium' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {SYNDROME_SHORT_SUBTITLES[pw.id] || pw.tagline}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-white' : 'text-slate-400 dark:text-slate-600'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </aside>
    </>
  );
};

```

### File: `/src/components/SubPathwaySelector.tsx`
```typescript
import React from 'react';
import { EmergencyPathway } from '../data/pathways.ts';
import { Check, Shield, Zap, Flame } from 'lucide-react';

interface SubPathwaySelectorProps {
  pathway: EmergencyPathway;
  activeTierId: string;
  onSelectTier: (id: string) => void;
  activeModifiersCount: number;
  isCompactMode?: boolean;
}

const TIER_VISUALS = [
  {
    activeCard: 'bg-teal-700 dark:bg-teal-600 text-white border-teal-900 dark:border-teal-800',
    idleBadge: 'text-teal-800 dark:text-teal-400',
    icon: <Shield className="w-4 h-4 stroke-[2.5]" />
  },
  {
    activeCard: 'bg-amber-600 dark:bg-amber-600 text-white border-amber-800 dark:border-amber-800',
    idleBadge: 'text-amber-800 dark:text-amber-400',
    icon: <Zap className="w-4 h-4 stroke-[2.5]" />
  },
  {
    activeCard: 'bg-rose-700 dark:bg-rose-600 text-white border-rose-950 dark:border-rose-800',
    idleBadge: 'text-rose-800 dark:text-rose-400',
    icon: <Flame className="w-4 h-4 stroke-[2.5]" />
  }
];

export const SubPathwaySelector: React.FC<SubPathwaySelectorProps> = ({
  pathway,
  activeTierId,
  onSelectTier,
  activeModifiersCount,
  isCompactMode = false
}) => {
  return (
    <section aria-label="Clinical Presentation Severity Tier" className="space-y-3">
      {/* Pathway Arena Title Header */}
      <div className="royale-card rounded-2xl bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-500 dark:text-slate-400 mb-0.5">
            <span className="font-mono tabular-nums font-extrabold text-teal-700 dark:text-teal-400">
              Protocol #{pathway.icon}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              {pathway.tagline}
            </span>
          </div>
          <h1 className="font-display text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {pathway.fullTitle}
          </h1>
        </div>

        {activeModifiersCount > 0 && (
          <div className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-300 dark:border-rose-800 text-xs font-extrabold text-rose-800 dark:text-rose-300 whitespace-nowrap shrink-0 self-start sm:self-center">
            {activeModifiersCount} Risk Override{activeModifiersCount > 1 ? 's' : ''} Active
          </div>
        )}
      </div>

      {/* 3 Oversized Tactile Severity Tier Cards */}
      <div className={`grid gap-2.5 ${isCompactMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
        {pathway.tiers.map((tier, idx) => {
          const isSelected = tier.id === activeTierId;
          const colonIdx = tier.label.indexOf(':');
          const tierIdentifier = colonIdx > -1 ? tier.label.slice(0, colonIdx).trim() : `Tier ${idx + 1}`;
          const tierShortTitle = colonIdx > -1 ? tier.label.slice(colonIdx + 1).trim() : tier.label;
          const vis = TIER_VISUALS[idx % TIER_VISUALS.length];

          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => onSelectTier(tier.id)}
              aria-pressed={isSelected}
              className={`royale-btn rounded-2xl p-4 text-left flex flex-col justify-between gap-2 cursor-pointer ${
                isSelected
                  ? `${vis.activeCard} shadow-sm`
                  : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 text-slate-900 dark:text-white'
              }`}
            >
              <div className="flex items-center justify-between gap-2 w-full">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-mono font-extrabold uppercase tracking-wider ${
                    isSelected ? 'text-white' : vis.idleBadge
                  }`}
                >
                  {vis.icon}
                  <span>{tierIdentifier}</span>
                </span>

                <span
                  className={`inline-flex items-center gap-1 text-xs font-extrabold ${
                    isSelected ? 'text-white' : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <span className="w-5 h-5 rounded-full bg-white text-slate-900 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                      <span>Active Tier</span>
                    </>
                  ) : (
                    <span>Tap to Select</span>
                  )}
                </span>
              </div>

              <div className="font-display text-sm sm:text-base font-extrabold leading-snug">
                {tierShortTitle}
              </div>

              <p
                className={`text-xs leading-snug ${
                  isSelected ? 'text-white/90 font-medium' : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {tier.subLabel.replace(/•/g, '·')}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

```

### File: `/src/components/DecisionBanner.tsx`
```typescript
import React, { useState, useEffect, useRef } from 'react';
import { EmergencyPathway, SubPathwayTier, PATIENT_MODIFIERS } from '../data/pathways.ts';
import { TIER_STRUCTURED_DATA } from '../data/structuredTreatmentData.ts';
import { detectComorbidityConflicts } from '../utils/clinicalCalculators.ts';
import { FormattedClinicalText, CitationChip } from './CitationChip.tsx';
import { playAlertChime } from '../utils/feedback.ts';
import {
  AlertTriangle,
  AlertOctagon,
  Clock,
  ChevronDown,
  BookOpen,
  ShieldAlert,
  CheckCircle2,
  ArrowUpRight,
  Syringe,
  Pill,
  Timer,
  RotateCcw,
  Check,
  Sparkles,
  Scale
} from 'lucide-react';

interface DecisionBannerProps {
  pathway: EmergencyPathway;
  tier: SubPathwayTier;
  activeModifiers: Set<string>;
  onOpenCitation: (id: string) => void;
  isCompactMode?: boolean;
}

/**
 * Safely renders selective **bold** markdown segments + [CITATION] chips with high-contrast highlighted key findings
 */
const RichBulletText: React.FC<{
  text: string;
  onOpenCitation: (id: string) => void;
}> = ({ text, onOpenCitation }) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          const inner = part.slice(2, -2);
          return (
            <strong
              key={idx}
              className="font-extrabold text-teal-950 dark:text-teal-200 bg-teal-100/80 dark:bg-teal-900/50 px-1.5 py-0.5 rounded-md mr-1"
            >
              <FormattedClinicalText text={inner} onOpenCitation={onOpenCitation} />
            </strong>
          );
        }
        return <FormattedClinicalText key={idx} text={part} onOpenCitation={onOpenCitation} />;
      })}
    </>
  );
};

/**
 * Splits dense safety text into concise, scannable bullet points for emergency readability
 */
function splitSafetyIntoBullets(text: string): string[] {
  const pieces = text
    .split(/(?<=\.)\s+(?=[A-Z0-9\[])/g)
    .map(s => s.trim())
    .filter(Boolean);
  return pieces.length > 1 ? pieces : [text];
}

export const DecisionBanner: React.FC<DecisionBannerProps> = ({
  pathway,
  tier,
  activeModifiers,
  onOpenCitation,
  isCompactMode = false
}) => {
  // Keep rationale collapsed by default; track per tier ID so interacting with scores/modifiers never resets it unexpectedly
  const [expandedTierIds, setExpandedTierIds] = useState<Record<string, boolean>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Integrated Bedside Onset / Reassessment Quick-Timer
  const [onsetTimerSecs, setOnsetTimerSecs] = useState<number>(0);
  const [onsetTimerRunning, setOnsetTimerRunning] = useState<boolean>(false);
  const [onsetTimerLabel, setOnsetTimerLabel] = useState<string>('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isRationaleOpen = Boolean(expandedTierIds[tier.id]);

  const toggleRationale = () => {
    setExpandedTierIds(prev => ({
      ...prev,
      [tier.id]: !prev[tier.id]
    }));
    playAlertChime('tap');
  };

  useEffect(() => {
    if (onsetTimerRunning && onsetTimerSecs > 0) {
      timerRef.current = setInterval(() => {
        setOnsetTimerSecs(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setOnsetTimerRunning(false);
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
  }, [onsetTimerRunning, onsetTimerSecs]);

  const startOnsetTimer = (seconds: number, label: string) => {
    setOnsetTimerSecs(seconds);
    setOnsetTimerLabel(label);
    setOnsetTimerRunning(true);
    playAlertChime('beep');
  };

  const resetOnsetTimer = () => {
    setOnsetTimerRunning(false);
    setOnsetTimerSecs(0);
    setOnsetTimerLabel('');
    if (timerRef.current) clearInterval(timerRef.current);
    playAlertChime('tap');
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const b = tier.bannerAction;
  const structured = TIER_STRUCTURED_DATA[tier.id];
  const activeModsList = Array.from(activeModifiers);
  const conflicts = detectComorbidityConflicts(activeModsList);

  const activeAdjustments: Array<{ id: string; label: string; text: string }> = [];
  activeModifiers.forEach(modId => {
    const mod = PATIENT_MODIFIERS.find(m => m.id === modId);
    if (mod) {
      const specific = pathway.comorbidityAdjustments[modId] || mod.summaryRule;
      activeAdjustments.push({
        id: mod.id,
        label: mod.label,
        text: specific
      });
    }
  });

  const isCriticalRose = !structured || structured.warningSeverity === 'critical-rose';
  const safetyBullets = splitSafetyIntoBullets(b.criticalSafety);

  return (
    <section
      aria-label="Clinical Treatment Recommendation Deck"
      className="royale-card rounded-3xl bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 overflow-hidden shadow-xs"
    >
      {/* 1. ARENA COMMAND BANNER HEADER */}
      <div className="px-4 sm:px-6 py-4 border-b-2 border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-slate-300">
            <span className="font-extrabold text-teal-400">
              {pathway.shortTitle}
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="font-semibold text-slate-200">
              {tier.label}
            </span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="font-mono font-bold text-amber-400">
              {tier.badge}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            {b.citations.map(cId => (
              <CitationChip key={cId} sourceId={cId} onClick={onOpenCitation} />
            ))}
          </div>
        </div>

        <h2 className="font-display text-lg sm:text-xl font-extrabold text-white leading-snug tracking-tight">
          {b.headline}
        </h2>
      </div>

      {/* 2. IMMEDIATE CLINICAL ACTION CARDS (Tactile Battle Deck Layout) */}
      <div className="p-4 sm:p-6 space-y-5 bg-slate-50/60 dark:bg-slate-900/60">
        {/* Prerequisites / Immediate Non-Pharmacological Steps */}
        {structured?.prerequisites && structured.prerequisites.length > 0 && (
          <div className="royale-card rounded-2xl p-4 bg-teal-50/70 dark:bg-teal-950/30 border-teal-300 dark:border-teal-800 space-y-2">
            <div className="text-xs sm:text-sm font-extrabold text-teal-900 dark:text-teal-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-700 dark:text-teal-400 shrink-0 stroke-[2.5]" />
              <span>Step 1 · Immediate Bedside Prerequisites</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 pl-5 list-disc font-medium">
              {structured.prerequisites.map((pre, i) => (
                <li key={i} className="leading-relaxed">
                  <FormattedClinicalText text={pre} onOpenCitation={onOpenCitation} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0">
              <Syringe className="w-4 h-4 stroke-[2.5]" />
            </span>
            <h3 className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              First-Line Treatment Action Cards
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Tap any option card to highlight active bedside selection
          </span>
        </div>

        {/* Structured Treatment Option Cards */}
        {structured ? (
          <div className="grid grid-cols-1 gap-3.5">
            {structured.immediateOptions.map((opt, idx) => {
              const isSelectedOpt = selectedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    setSelectedOptionId(prev => (prev === opt.id ? null : opt.id));
                    playAlertChime('tap');
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedOptionId(prev => (prev === opt.id ? null : opt.id));
                      playAlertChime('tap');
                    }
                  }}
                  className={`royale-card rounded-2xl overflow-hidden cursor-pointer transition-colors ${
                    isSelectedOpt
                      ? 'bg-teal-50/70 dark:bg-teal-950/40 border-teal-600 dark:border-teal-400'
                      : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-500'
                  }`}
                >
                  {/* Card Top Header Strip */}
                  <div
                    className={`px-4 py-2.5 border-b flex flex-wrap items-center justify-between gap-2 ${
                      isSelectedOpt
                        ? 'bg-teal-700 dark:bg-teal-600 text-white border-teal-800'
                        : 'bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-extrabold">
                        0{idx + 1}.
                      </span>
                      <span className="font-extrabold">
                        {opt.optionLabel}
                      </span>
                      {opt.contextBadge && (
                        <>
                          <span aria-hidden="true" className="opacity-60">·</span>
                          <span
                            className={`font-semibold ${
                              isSelectedOpt ? 'text-teal-100' : 'text-teal-700 dark:text-teal-400'
                            }`}
                          >
                            {opt.contextBadge}
                          </span>
                        </>
                      )}
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 text-xs font-extrabold ${
                        isSelectedOpt ? 'text-white' : 'text-teal-700 dark:text-teal-400'
                      }`}
                    >
                      {isSelectedOpt ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Active Bedside Choice</span>
                        </>
                      ) : (
                        <span>Select Option</span>
                      )}
                    </span>
                  </div>

                  {/* Card Main Content */}
                  <div className="p-4 space-y-3.5">
                    {/* Prominent Medication / Action Headline */}
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-display text-base sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug">
                        {opt.medicationOrAction}
                      </div>
                      {opt.dose && (
                        <span className="font-mono tabular-nums text-sm sm:text-base font-extrabold text-teal-800 dark:text-teal-300">
                          {opt.dose}
                        </span>
                      )}
                    </div>

                    {/* 3-Tile Tactile Stat Boxes: Dose · Route · Formulation */}
                    {(opt.dose || opt.route || opt.formulation) && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {opt.dose && (
                          <div className="p-3 rounded-xl bg-teal-50/70 dark:bg-slate-800 border-2 border-teal-200 dark:border-slate-700">
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-teal-800 dark:text-teal-400">
                              Target Dose
                            </span>
                            <span className="font-mono tabular-nums text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                              {opt.dose}
                            </span>
                          </div>
                        )}
                        {opt.route && (
                          <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Administration Route
                            </span>
                            <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                              {opt.route}
                            </span>
                          </div>
                        )}
                        {opt.formulation && (
                          <div className="p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700">
                            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                              Formulation
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                              {opt.formulation}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Clinical Execution Instructions */}
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      <FormattedClinicalText text={opt.instructions} onOpenCitation={onOpenCitation} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
            <FormattedClinicalText text={b.primaryRegimen} onOpenCitation={onOpenCitation} />
          </div>
        )}
      </div>

      {/* 3. HIGH-VISIBILITY SAFETY & CONTRAINDICATION SHIELD (Always Visible) */}
      <div
        role="region"
        aria-label="Critical Safety Restrictions and Contraindications"
        className={`p-4 sm:p-6 border-t-2 border-b-2 ${
          isCriticalRose
            ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
            : 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
        } space-y-4`}
      >
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white ${
                  isCriticalRose ? 'bg-rose-600' : 'bg-amber-600'
                }`}
              >
                {isCriticalRose ? (
                  <AlertOctagon className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
                )}
              </div>
              <div>
                <h3
                  className={`font-display text-sm sm:text-base font-extrabold ${
                    isCriticalRose
                      ? 'text-rose-950 dark:text-rose-200'
                      : 'text-amber-950 dark:text-amber-200'
                  }`}
                >
                  {structured?.warningTitle || 'Critical Safety Restriction'}
                </h3>
              </div>
            </div>

            <span
              className={`text-xs font-mono font-extrabold uppercase tracking-wider ${
                isCriticalRose
                  ? 'text-rose-800 dark:text-rose-300'
                  : 'text-amber-800 dark:text-amber-300'
              }`}
            >
              {isCriticalRose ? 'Mandatory Safety Hazard' : 'Clinical Caution'}
            </span>
          </div>

          {/* Concise Safety Bullet Points */}
          {safetyBullets.length > 1 ? (
            <ul
              className={`space-y-1.5 pl-5 list-disc text-xs sm:text-sm font-medium ${
                isCriticalRose
                  ? 'text-rose-950 dark:text-rose-100'
                  : 'text-amber-950 dark:text-amber-100'
              }`}
            >
              {safetyBullets.map((item, idx) => (
                <li key={idx} className="leading-relaxed">
                  <FormattedClinicalText text={item} onOpenCitation={onOpenCitation} />
                </li>
              ))}
            </ul>
          ) : (
            <div
              className={`text-xs sm:text-sm font-medium leading-relaxed ${
                isCriticalRose
                  ? 'text-rose-950 dark:text-rose-100'
                  : 'text-amber-950 dark:text-amber-100'
              }`}
            >
              <FormattedClinicalText text={b.criticalSafety} onOpenCitation={onOpenCitation} />
            </div>
          )}
        </div>

        {/* Multi-Comorbidity Conflict Alerts */}
        {conflicts.length > 0 && (
          <div className="royale-card rounded-2xl p-3.5 bg-amber-100/80 dark:bg-amber-950/70 border-amber-400 dark:border-amber-700 space-y-1.5">
            <div className="text-xs sm:text-sm font-extrabold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 stroke-[2.5]" />
              <span>Multi-Comorbidity Conflict Alert — Senior Review Required</span>
            </div>
            {conflicts.map((c, i) => (
              <div key={i} className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed">
                <strong className="font-extrabold">{c.title}:</strong>{' '}
                <FormattedClinicalText text={c.warning} onOpenCitation={onOpenCitation} />
              </div>
            ))}
          </div>
        )}

        {/* Active Patient-Context Restrictions */}
        {activeAdjustments.length > 0 && (
          <div className="royale-card rounded-2xl p-3.5 bg-white dark:bg-slate-900 border-rose-400 dark:border-rose-700 space-y-2">
            <div className="text-xs font-extrabold uppercase tracking-wider text-rose-800 dark:text-rose-300">
              Active Patient-Context Dosing Overrides ({activeAdjustments.length} Active)
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 dark:text-slate-100 pl-4 list-disc">
              {activeAdjustments.map(adj => (
                <li key={adj.id} className="leading-relaxed">
                  <strong className="font-extrabold text-rose-800 dark:text-rose-300">
                    {adj.label}:
                  </strong>{' '}
                  <FormattedClinicalText text={adj.text} onOpenCitation={onOpenCitation} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 4. DOSING, TIMING & CEILING PARAMETERS + BEDSIDE COOLDOWN TIMER */}
      <div className="p-4 sm:p-6 border-b-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 stroke-[2.5]" />
            </span>
            <div>
              <h3 className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                Dosing, Onset &amp; 24-Hour Ceiling Parameters
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Verify full onset window and vital signs before any repeat sedation
              </p>
            </div>
          </div>

          {/* 1-Tap Bedside Onset / Reassessment Quick-Timer */}
          <div className="flex flex-wrap items-center gap-1.5">
            {onsetTimerRunning || onsetTimerSecs > 0 ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-700 text-white font-mono text-xs font-extrabold">
                <Timer className="w-3.5 h-3.5 animate-spin" />
                <span>
                  {onsetTimerLabel}: {formatTimer(onsetTimerSecs)}
                </span>
                <button
                  type="button"
                  onClick={resetOnsetTimer}
                  className="ml-1 underline hover:text-teal-200 cursor-pointer flex items-center gap-0.5"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>
            ) : (
              <>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-1">
                  Quick Timer:
                </span>
                <button
                  type="button"
                  onClick={() => startOnsetTimer(900, '15m IM Check')}
                  className="royale-btn min-h-[34px] px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-teal-500 cursor-pointer"
                >
                  15m IM
                </button>
                <button
                  type="button"
                  onClick={() => startOnsetTimer(1800, '30m Onset')}
                  className="royale-btn min-h-[34px] px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 hover:border-teal-500 cursor-pointer"
                >
                  30m PO/IM
                </button>
              </>
            )}
          </div>
        </div>

        {structured && structured.dosingParameters.length > 0 ? (
          <div
            className={`grid gap-3 ${
              isCompactMode ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {structured.dosingParameters.map((param, idx) => (
              <div
                key={idx}
                className="royale-card p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/70 border-slate-200 dark:border-slate-700 flex flex-col justify-between gap-1"
              >
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {param.label}
                </span>
                <span className="font-mono tabular-nums text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  {param.value}
                </span>
                {param.note && (
                  <span className="text-xs text-slate-600 dark:text-slate-300 leading-snug font-medium">
                    {param.note}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs sm:text-sm font-mono font-bold text-slate-800 dark:text-slate-200">
            {b.onsetWait}
          </div>
        )}
      </div>

      {/* 5. SECOND-LINE & ESCALATION DECK */}
      <div className="p-4 sm:p-6 border-b-2 border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40 space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0">
            <Pill className="w-3.5 h-3.5 stroke-[2.5]" />
          </span>
          <h3 className="font-display text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Second-Line &amp; Escalation Options
          </h3>
        </div>

        {structured && structured.escalationOrSecondaryOptions.length > 0 ? (
          <div className="grid grid-cols-1 gap-2.5">
            {structured.escalationOrSecondaryOptions.map(sec => (
              <div
                key={sec.id}
                className="royale-card p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 space-y-1.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-extrabold text-teal-800 dark:text-teal-400">
                    {sec.optionLabel}
                  </span>
                  {sec.contextBadge && (
                    <span className="font-mono font-bold text-slate-500 dark:text-slate-400">
                      {sec.contextBadge}
                    </span>
                  )}
                </div>
                <div className="font-display text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  {sec.medicationOrAction}
                  {sec.dose ? (
                    <span className="font-mono text-teal-700 dark:text-teal-300 ml-2">
                      — {sec.dose}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  <FormattedClinicalText text={sec.instructions} onOpenCitation={onOpenCitation} />
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <FormattedClinicalText text={b.secondaryRegimen} onOpenCitation={onOpenCitation} />
          </div>
        )}
      </div>

      {/* 6. COLLAPSED-BY-DEFAULT EXPANDABLE CLINICAL RATIONALE (Progressive Disclosure) */}
      <div>
        <button
          type="button"
          aria-expanded={isRationaleOpen}
          aria-controls={`rationale-panel-${tier.id}`}
          onClick={toggleRationale}
          className="w-full px-4 sm:px-6 py-4 bg-teal-50/70 hover:bg-teal-100/70 dark:bg-slate-800/70 dark:hover:bg-slate-800 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <span className="font-display text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white block">
                Why This Option? — Expand Clinical Rationale &amp; Highlighted Trial Findings
              </span>
              <span className="text-[11px] text-slate-600 dark:text-slate-400 block truncate">
                Concise evidence bullets, head-to-head RCT outcomes, and full verbatim guideline text
              </span>
            </div>
          </div>

          <span className="royale-btn min-h-[36px] px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 flex items-center gap-1.5 text-xs font-extrabold text-teal-800 dark:text-teal-300 shrink-0">
            <span>{isRationaleOpen ? 'Hide Rationale' : 'View Evidence'}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-150 ${
                isRationaleOpen ? 'rotate-180' : ''
              }`}
            />
          </span>
        </button>

        {isRationaleOpen && structured?.rationale && (
          <div
            id={`rationale-panel-${tier.id}`}
            className="p-4 sm:p-6 border-t-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5 text-xs sm:text-sm"
          >
            {/* Highlighted Bottom-Line Takeaway & Clinical Reasoning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="royale-card p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border-teal-300 dark:border-teal-800 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-teal-900 dark:text-teal-300">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>Core Clinical Mechanism &amp; Reasoning</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  <FormattedClinicalText
                    text={structured.rationale.clinicalReasoning}
                    onOpenCitation={onOpenCitation}
                  />
                </p>
              </div>

              <div className="royale-card p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  <Scale className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400 shrink-0" />
                  <span>Bedside Clinical Takeaway</span>
                </div>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                  {structured.rationale.interpretation}
                </p>
              </div>
            </div>

            {/* Highlighted Key Evidence Bullet Points */}
            {structured.rationale.keyEvidence.length > 0 && (
              <div className="royale-card p-4 rounded-2xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2.5">
                <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-400">
                  Highlighted Key Trial &amp; Guideline Findings
                </h4>
                <ul className="space-y-2.5 pl-5 list-disc text-slate-800 dark:text-slate-200">
                  {structured.rationale.keyEvidence.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <RichBulletText text={item} onOpenCitation={onOpenCitation} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comparative Outcomes (Tactile Head-to-Head Trial Scorecards) */}
            {structured.rationale.comparativeOutcomes &&
              structured.rationale.comparativeOutcomes.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Head-to-Head Trial &amp; Cohort Comparisons
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {structured.rationale.comparativeOutcomes.map((row, idx) => (
                      <div
                        key={idx}
                        className="royale-card p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 space-y-2"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                          <span className="font-display font-extrabold text-slate-900 dark:text-white text-xs sm:text-sm">
                            {row.study}
                          </span>
                          <span className="font-mono tabular-nums text-xs font-bold text-teal-800 dark:text-teal-400">
                            Endpoint Window: {row.timePoint}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-bold uppercase">
                              Regimen Comparison &amp; Outcome
                            </span>
                            <span className="font-bold text-slate-900 dark:text-slate-100 mt-0.5 block">
                              {row.comparison} — <em className="text-teal-800 dark:text-teal-300">{row.outcome}</em>
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500 dark:text-slate-400 block text-[11px] font-bold uppercase">
                              Quantitative Trial Result
                            </span>
                            <span className="font-mono tabular-nums font-extrabold text-slate-900 dark:text-white mt-0.5 block">
                              {row.result}
                            </span>
                          </div>
                        </div>
                        {row.limitationOrContext && (
                          <p className="text-[11px] text-slate-600 dark:text-slate-400 pt-1.5 border-t border-slate-200/70 dark:border-slate-700/70">
                            <strong className="font-bold">Study Context / Limitation:</strong> {row.limitationOrContext}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Safety Considerations & Limitations */}
            {structured.rationale.safetyAndLimitations.length > 0 && (
              <div className="royale-card p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60 space-y-2">
                <h4 className="font-display text-xs font-extrabold uppercase tracking-wider text-rose-900 dark:text-rose-300">
                  Safety Considerations &amp; Clinical Pitfalls to Avoid
                </h4>
                <ul className="space-y-2 pl-5 list-disc text-slate-800 dark:text-slate-200">
                  {structured.rationale.safetyAndLimitations.map((lim, idx) => (
                    <li key={idx} className="leading-relaxed">
                      <RichBulletText text={lim} onOpenCitation={onOpenCitation} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Flagged Source Nuance / Review Note */}
            {structured.rationale.flaggedForClinicalReview && (
              <div className="royale-card p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-1">
                <div className="font-extrabold">Source Evidence Nuance Flagged for Clinician Review</div>
                <p className="leading-relaxed">{structured.rationale.flaggedForClinicalReview}</p>
              </div>
            )}

            {/* Complete Verbatim Guideline Text (Preserves 100% Source Fidelity) */}
            <details className="rounded-2xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 p-3.5 text-xs group">
              <summary className="font-extrabold text-slate-700 dark:text-slate-300 cursor-pointer select-none flex items-center justify-between">
                <span>Complete Verbatim Guideline Protocol Text (100% Source Reference)</span>
                <span className="text-teal-700 dark:text-teal-400 font-mono text-[11px]">Toggle Text</span>
              </summary>
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                <div>
                  <strong className="text-slate-900 dark:text-slate-200">Primary Regimen: </strong>
                  <FormattedClinicalText text={b.primaryRegimen} onOpenCitation={onOpenCitation} />
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-slate-200">Secondary / Escalation: </strong>
                  <FormattedClinicalText text={b.secondaryRegimen} onOpenCitation={onOpenCitation} />
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-slate-200">Timing &amp; Ceilings: </strong>
                  <FormattedClinicalText text={b.onsetWait} onOpenCitation={onOpenCitation} />
                </div>
              </div>
            </details>

            {/* Clickable Source References */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold text-slate-600 dark:text-slate-400">
                Auditable Primary Sources (Tap to inspect trial &amp; guideline details):
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {structured.rationale.references.map(refId => (
                  <button
                    key={refId}
                    type="button"
                    onClick={() => onOpenCitation(refId)}
                    className="royale-btn min-h-[34px] px-3 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900 text-teal-900 dark:text-teal-300 border-teal-300 dark:border-teal-800 font-mono font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>[{refId}]</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

```

### File: `/src/components/LifecycleStepper.tsx`
```typescript
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

```

### File: `/src/components/calculators/BedsideCalculator.tsx`
```typescript
import React from 'react';
import { EmergencyPathway } from '../../data/pathways.ts';
import {
  calculateBVC,
  calculateGurreraNMS,
  calculateHunterSS,
  calculateCIWAQuick,
  calculateBARSDystonia,
  calculateEXTRIPLithium,
  calculateIPSSuicide
} from '../../utils/clinicalCalculators.ts';
import { CatatoniaChallengeWidget } from './CatatoniaChallengeWidget.tsx';
import { CitationChip } from '../CitationChip.tsx';
import { playAlertChime } from '../../utils/feedback.ts';
import { Check, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

interface BedsideCalculatorProps {
  pathway: EmergencyPathway;
  checkedItemIds: Set<string>;
  onToggleItem: (id: string) => void;
  onOpenCitation: (id: string) => void;
}

export const BedsideCalculator: React.FC<BedsideCalculatorProps> = ({
  pathway,
  checkedItemIds,
  onToggleItem,
  onOpenCitation
}) => {
  const calc = pathway.calculator;
  // Filter checkedItemIds to only items belonging to the active pathway's calculator so state never leaks
  const validItemIds = new Set(calc.items.map(i => i.id));
  const checkedArray = Array.from(checkedItemIds).filter(id => validItemIds.has(id));
  const activeCount = checkedArray.length;

  let badgeText = '';
  let actionText = '';
  let colorTheme: 'rose' | 'amber' | 'emerald' | 'teal' | 'slate' = 'slate';

  if (calc.type === 'bvc') {
    const res = calculateBVC(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.riskTier === 'high' ? 'rose' : res.riskTier === 'moderate' ? 'amber' : 'emerald';
  } else if (calc.type === 'bfcrs') {
    const count = activeCount;
    if (count >= 3) {
      badgeText = `${count} Catatonic Signs Present — Meets DSM-5-TR / ICD-11 Criteria (≥3 Signs)`;
      actionText =
        'Catatonia criteria met: Perform Bedside Lorazepam 1–2 mg IV/IM Challenge Test below and evaluate for ≥50% BFCRS reduction.';
      colorTheme = 'teal';
    } else if (count === 2) {
      badgeText = `${count} Catatonic Signs — Positive BFCSI Screen (≥2 Signs); Borderline DSM-5-TR`;
      actionText =
        'Consider diagnostic Lorazepam 1–2 mg IV/IM Challenge Test alongside comprehensive neurological and medical workup.';
      colorTheme = 'amber';
    } else {
      badgeText = `${count} Catatonic Signs Selected — Select ≥3 signs for DSM-5-TR / ICD-11 Catatonia`;
      actionText = 'Tap observed spontaneous and elicited motor, speech, and behavioral signs below.';
      colorTheme = 'slate';
    }
  } else if (calc.type === 'gurrera_nms') {
    const res = calculateGurreraNMS(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.isDefinite ? 'rose' : res.isIntermediate ? 'amber' : 'emerald';
  } else if (calc.type === 'hunter_ss') {
    const res = calculateHunterSS(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.isPositive ? 'rose' : !res.hasPrerequisite && res.rulesMetCount > 0 ? 'amber' : 'emerald';
  } else if (calc.type === 'ciwa_quick') {
    const res = calculateCIWAQuick(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.isSevereOrDT ? 'rose' : res.isModerate ? 'amber' : 'emerald';
  } else if (calc.type === 'bars_dystonia') {
    const res = calculateBARSDystonia(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.isAirwayEmergency ? 'rose' : res.isFocalDystonia || res.isAkathisia ? 'amber' : 'slate';
  } else if (calc.type === 'extrip_li') {
    const res = calculateEXTRIPLithium(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.isClass1D ? 'rose' : res.isClass2D ? 'amber' : 'emerald';
  } else if (calc.type === 'ips_suicide') {
    const res = calculateIPSSuicide(checkedArray);
    badgeText = res.badge;
    actionText = res.action;
    colorTheme = res.requiresAdmission ? 'rose' : res.totalFactors > 0 ? 'amber' : 'slate';
  }

  const colorStyles = {
    rose: 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-500 dark:border-rose-700 text-rose-950 dark:text-rose-100',
    amber: 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-500 dark:border-amber-700 text-amber-950 dark:text-amber-100',
    emerald: 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100',
    teal: 'bg-teal-50/90 dark:bg-teal-950/40 border-teal-500 dark:border-teal-700 text-teal-950 dark:text-teal-100',
    slate: 'bg-slate-50 dark:bg-slate-800/60 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200'
  };

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-slate-200 dark:border-slate-800 pb-3.5">
        <div>
          <span className="text-xs font-mono font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-400 block mb-0.5">
            Stage 01 · Interactive Bedside Scoring Instrument
          </span>
          <h3 className="font-display text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
            {calc.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
            {calc.subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 shrink-0">
          <span className="font-mono font-extrabold text-teal-800 dark:text-teal-300 tabular-nums">
            {activeCount}/{calc.items.length} Active
          </span>
          <span aria-hidden="true">·</span>
          <CitationChip sourceId={calc.citation} onClick={onOpenCitation} />
        </div>
      </div>

      {/* Live Calculated Scoreboard Banner */}
      <div
        role="status"
        aria-live="polite"
        className={`royale-card rounded-2xl p-4 transition-colors ${colorStyles[colorTheme]}`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white ${
              colorTheme === 'rose'
                ? 'bg-rose-600'
                : colorTheme === 'amber'
                ? 'bg-amber-600'
                : colorTheme === 'emerald' || colorTheme === 'teal'
                ? 'bg-teal-600'
                : 'bg-slate-600'
            }`}
          >
            {colorTheme === 'emerald' || colorTheme === 'teal' ? (
              <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
            ) : colorTheme === 'slate' ? (
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <AlertCircle className="w-4 h-4 stroke-[2.5]" />
            )}
          </div>
          <div className="space-y-1 flex-1">
            <div className="font-display font-extrabold text-sm sm:text-base leading-snug">
              {badgeText}
            </div>
            {actionText && (
              <p className="text-xs sm:text-sm font-medium leading-relaxed opacity-95">
                {actionText}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tactile Criteria Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {calc.items.map(item => {
          const isChecked = checkedItemIds.has(item.id);
          return (
            <button
              key={item.id}
              type="button"
              role="checkbox"
              aria-checked={isChecked}
              onClick={() => {
                onToggleItem(item.id);
                playAlertChime(isChecked ? 'tap' : 'beep');
              }}
              className={`royale-btn p-3.5 rounded-2xl text-left text-xs sm:text-sm flex items-start justify-between gap-3 cursor-pointer ${
                isChecked
                  ? 'bg-teal-700 text-white border-teal-900 dark:bg-teal-600 dark:border-teal-800 font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 hover:border-teal-500 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium'
              }`}
            >
              <span className="leading-snug">{item.label}</span>
              <span
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border-2 transition-colors ${
                  isChecked
                    ? 'bg-white border-white text-teal-800'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                }`}
              >
                {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
              </span>
            </button>
          );
        })}
      </div>

      {/* Catatonia Lorazepam Challenge Calculator & Reassessment Timer */}
      {pathway.id === 'catatonia' && (
        <CatatoniaChallengeWidget onOpenCitation={onOpenCitation} />
      )}
    </div>
  );
};

```

### File: `/src/components/calculators/CatatoniaChallengeWidget.tsx`
```typescript
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

```

### File: `/src/data/sources.ts`
```typescript
export interface SourceItem {
  id: string;
  origin: 'india' | 'intl';
  badge: string;
  title: string;
  authors: string;
  year: string;
  identifier: string;
  url: string;
  section: string;
  supports: string;
  limitations: string;
  verifiedDate: string;
  versionStatus: string;
}

export const SOURCE_REGISTRY: Record<string, SourceItem> = {
  'IPS-AGIT-2023': {
    id: 'IPS-AGIT-2023',
    origin: 'india',
    badge: 'IPS CPG 2023',
    title: 'Clinical Practice Guidelines for Assessment and Management of Aggressive and Assaultive Behaviour',
    authors: 'Gautam S, Gautam M, Yadav KS, Chaudhary J, Jain A (Indian Psychiatric Society)',
    year: '2023 (Vol 65, Issue 2, pp. 131–139)',
    identifier: 'DOI: 10.4103/indianjpsychiatry.indianjpsychiatry_518_22 · PMCID: PMC10096211 · PMID: 37063635',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10096211/',
    section: 'Tables 4, 7, 8, 9, 10, 11 & Section 3 (Pharmacological Management & MHCA Sec 94/97)',
    supports: 'Stepwise verbal de-escalation -> oral medication first (Lorazepam 1–2mg, Risperidone 1–2mg, Olanzapine 5–10mg) -> IM Rapid Tranquillisation (IM Haloperidol 5–10mg + Promethazine 25–50mg or IM Lorazepam 2–4mg or IM Olanzapine 10mg); mandatory baseline ECG before Haloperidol; avoidance of IM Olanzapine + IM BZD in alcohol use; post-sedation vital monitoring (SpO2 q30m, RR constant, BP/Pulse q15–20m in high risk); MHCA 2017 Sec 94 & Sec 97 compliance.',
    limitations: 'Guideline synthesis notes scarcity of head-to-head trials across specific medical comorbidities; BVC is primarily validated on inpatient psychiatric wards rather than emergency departments.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Current IPS Emergency Psychiatry CPG v2023'
  },
  'IPS-AGIT-2022': {
    id: 'IPS-AGIT-2022',
    origin: 'india',
    badge: 'IPS CL-CPG 2022',
    title: 'Assessment and Management of Agitation in Consultation-Liaison Psychiatry',
    authors: 'Raveesh BN, Munoli RN, Gowda GS (Indian Psychiatric Society)',
    year: '2022 (Vol 64, Suppl 2, pp. S484–S498)',
    identifier: 'DOI: 10.4103/indianjpsychiatry.indianjpsychiatry_22_22 · PMCID: PMC9122159 · PMID: 35602364',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9122159/',
    section: 'Tables 6, 8, 12, 14 & Appendix 1 (SMART Medical Clearance & Restraint Flowsheet)',
    supports: 'Etiology-specific drug selection (Lorazepam 1–2mg PO/IM/IV for alcohol/sedative withdrawal or stimulant toxicity; Haloperidol 2–10mg or Olanzapine 5–10mg for CNS depressant intoxication where BZDs are avoided); Lorazepam preferred in hepatic impairment (glucuronidation, no active metabolites); Aripiprazole preferred in QTc prolongation; q15min x 1h then q1h restraint observation chart.',
    limitations: 'Primarily narrative consensus adapted for Indian Consultation-Liaison settings; IV haloperidol requires continuous cardiac monitoring.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Current IPS CL Psychiatry CPG v2022'
  },
  'TREC-VELLORE-2004': {
    id: 'TREC-VELLORE-2004',
    origin: 'india',
    badge: 'CMC Vellore RCT 2004',
    title: 'Rapid tranquillisation of violent or agitated patients in a psychiatric emergency setting: Pragmatic randomised trial of intramuscular lorazepam v. haloperidol plus promethazine (TREC-India I)',
    authors: 'Alexander J, Tharyan P, Adams C, John T, Mol C, Philip J (CMC Vellore, Tamil Nadu, India)',
    year: '2004 (Br J Psychiatry, Vol 185, Issue 1, pp. 63–69)',
    identifier: 'DOI: 10.1192/bjp.185.1.63 · PMID: 15231557',
    url: 'https://www.cambridge.org/core/journals/the-british-journal-of-psychiatry/article/rapid-tranquillisation-of-violent-or-agitated-patients-in-a-psychiatric-emergency-setting/4713460CAD236BC7F1B4332CE65FA494',
    section: 'Primary & Secondary Outcomes (n = 200 Indian emergency psychiatric patients, 100 per arm)',
    supports: 'Compared IM Haloperidol (10 mg) + Promethazine (25–50 mg) vs IM Lorazepam (4 mg): at 4h (primary outcome), 96% in BOTH arms were tranquil or asleep, but Haloperidol+Promethazine produced significantly more sleep at 4h (76% vs 45%; RR 1.7, NNT 3.2), faster tranquillisation/asleep at 15, 30, 60, and 120 min (97% vs 88% tranquil/asleep at 2h, p=0.03; mean time 29.7 vs 47.8 min), and zero acute dystonic reactions in either arm (Lorazepam arm had 4% moderate respiratory difficulty/bronchial asthma exacerbation and 3% nausea/dizziness).',
    limitations: 'Single-center pragmatic RCT at CMC Vellore using a 4 mg IM Lorazepam comparator; primary advantage of Haloperidol+Promethazine over 4 mg Lorazepam was faster onset and higher proportion asleep rather than 4h combined tranquil/asleep rate.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Landmark Indian RCT (Level Ib)'
  },
  'TREC-INDIA-II-2007': {
    id: 'TREC-INDIA-II-2007',
    origin: 'india',
    badge: 'CMC Vellore RCT 2007',
    title: 'Rapid tranquillisation in psychiatric emergency settings in India: pragmatic randomised controlled trial of intramuscular olanzapine versus intramuscular haloperidol plus promethazine (TREC-India II)',
    authors: 'Raveendran NS, Tharyan P, Alexander J, Adams CE (TREC-India II Collaborative Group, CMC Vellore)',
    year: '2007 (BMJ, Vol 335, Issue 7625, p. 865)',
    identifier: 'DOI: 10.1136/bmj.39341.608519.BE · PMCID: PMC2043469 · PMID: 17954514',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2043469/',
    section: 'Results & Tables 2–3 (n = 300 agitated patients at CMC Vellore, 150 per arm)',
    supports: 'Both IM Olanzapine (10 mg) and IM Haloperidol (10 mg) + Promethazine (25–50 mg) achieved rapid calming (87% vs 91% tranquil/asleep at 15 min; 96% vs 97% at 4h), but IM Haloperidol+Promethazine produced more sleep across all timepoints and required significantly fewer repeat drugs (21% vs 43%; RR 2.07, NNT 5) and fewer repeat psychiatrist call-backs over 4 hours (15% vs 33%) than IM Olanzapine. Zero patients in either arm (0/150 vs 0/150) developed acute dystonia.',
    limitations: 'Excluded patients with severe medical instability; IM Olanzapine is costlier and shorter-acting than Haloperidol + Promethazine.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Landmark Indian RCT (Level Ib)'
  },
  'TREC-RIO-2007': {
    id: 'TREC-RIO-2007',
    origin: 'intl',
    badge: 'TREC-Rio II BMJ 2007',
    title: 'Rapid tranquillisation in psychiatric emergency settings in Brazil: pragmatic randomised controlled trial of intramuscular haloperidol versus intramuscular haloperidol plus promethazine',
    authors: 'Huf G, Coutinho ESF, Adams CE (TREC Collaborative Group, Rio de Janeiro)',
    year: '2007 (BMJ, Vol 335, Issue 7625, p. 869)',
    identifier: 'DOI: 10.1136/bmj.39339.448819.AE · PMCID: PMC2043463 · PMID: 17954515',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2043463/',
    section: 'Primary Outcomes & Adverse Events (n = 316 emergency psychiatric patients: 160 Haloperidol+Promethazine vs 156 Haloperidol alone)',
    supports: 'Directly proved why IM Haloperidol monotherapy is hazardous in emergency psychiatry: IM Haloperidol (5–10 mg) + Promethazine (25–50 mg) achieved significantly higher tranquillisation/sleep at 20 min (72.3% vs 55.2%; RR 1.30, NNT 6, p=0.002), while the trial was halted early by the steering committee because 10 cases of acute dystonia occurred—ALL 10 in the Haloperidol-alone arm (6.4% vs 0%).',
    limitations: 'Conducted in Brazilian psychiatric emergency rooms; directly complements TREC-Vellore trials.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Landmark Companion RCT (Level Ib)'
  },
  'IPS-TOX-2022': {
    id: 'IPS-TOX-2022',
    origin: 'india',
    badge: 'IPS CPG 2022',
    title: 'Clinical Practice Guidelines for Management of Medical Emergencies Associated with Psychotropic Medications',
    authors: 'Grover S, Sarkar S, Avasthi A (PGIMER Chandigarh & AIIMS New Delhi, Indian Psychiatric Society)',
    year: '2022 (Indian J Psychiatry, Vol 64, Suppl 2, pp. S236–S251)',
    identifier: 'DOI: 10.4103/indianjpsychiatry.indianjpsychiatry_1013_21 · PMCID: PMC9122152 · PMID: 35602372',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9122152/',
    section: 'Tables 4, 6, 13, 14, 15, 16, 18, 26, 27 (Dystonia, Akathisia, NMS, Serotonin Syndrome, Anticholinergic, Lithium/Valproate/TCA/BZD Overdose)',
    supports: 'Stepwise management of Acute Dystonia (Promethazine 25–50mg IM, Diphenhydramine 25–50mg IM/IV, Biperiden 5mg IM/IV, or Benztropine 1–2mg IM/IV; IV Lorazepam 1–2mg or Diazepam 2–5mg for acute laryngeal dystonia/stridor; continue oral anticholinergic 4–7 days); Akathisia (Propranolol 40–80mg/d first-line, Mirtazapine 15mg second-line; Vitamin B6 200–600mg/d); NMS (Stop dopamine blocker, ICU hydration, Lorazepam 1–2mg, Bromocriptine 10–40mg/d divided PO/NGT, Dantrolene 1–2.5mg/kg bolus then 1mg/kg q6h up to 10mg/kg/d, Amantadine 100–300mg BD, wait ≥2 weeks before antipsychotic rechallenge); Serotonin Syndrome (Stop serotonergics, Lorazepam, Cyproheptadine 12mg PO/NGT loading then 2mg q2h); Lithium/Valproate/TCA overdose protocols.',
    limitations: 'Pharmacotherapy for NMS and Serotonin Syndrome is derived from case series and expert consensus rather than placebo-controlled RCTs.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Current IPS Psychotropic Emergencies CPG v2022'
  },
  'IPS-SUIC-2023': {
    id: 'IPS-SUIC-2023',
    origin: 'india',
    badge: 'IPS CPG 2023',
    title: 'Clinical Practice Guidelines for Management of Suicidal Behaviour',
    authors: 'Sarkhel S, Vijayakumar V, Vijayakumar L (IPGME&R Kolkata & VHS/Sneha Chennai, Indian Psychiatric Society)',
    year: '2023 (Indian J Psychiatry, Vol 65, Issue 2, pp. 124–130)',
    identifier: 'DOI: 10.4103/indianjpsychiatry.indianjpsychiatry_497_22 · PMCID: PMC10096207 · PMID: 37063624',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10096207/',
    section: 'Tables 5, 8, 9, 10 & Medicolegal Aspects (MHCA 2017 Section 115)',
    supports: '3-Tier Risk Stratification (High/Moderate/Low) based on clinical formulation of intent, lethality of attempt, plan, and support; mandatory hospitalization criteria; rejection of "No-Suicide Contracts" (unsupported by evidence, false sense of security); Stanley-Brown 6-step Safety Plan Intervention; Government of India Tele-MANAS 24x7 Helpline (14416 / 1800-891-4416); WHO Brief Intervention & Contact (BIC) schedule (1, 2, 4, 7, 11 wk & 4, 6, 12, 18 mo); ECT for acute suicidal depression; MHCA 2017 Sec 115 overriding former IPC Sec 309 (omitted under BNS 2023).',
    limitations: 'Ketamine IV (0.5 mg/kg) noted as rapid short-term anti-suicidal option in trials but explicitly flagged as off-label with short-lived benefit; no single rating scale predicts suicide without comprehensive clinical formulation.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Current IPS Suicidal Behaviour CPG v2023'
  },
  'IPS-SUBST-2023': {
    id: 'IPS-SUBST-2023',
    origin: 'india',
    badge: 'IPS CPG 2023',
    title: 'Clinical Practice Guidelines for Assessment and Management of Patients with Substance Intoxication Presenting to the Emergency Department',
    authors: 'Sarkar S, Bhatia G, Dhawan A (NDDTC AIIMS New Delhi & AIIMS Rajkot, Indian Psychiatric Society)',
    year: '2023 (Indian J Psychiatry, Vol 65, Issue 2, pp. 196–211)',
    identifier: 'DOI: 10.4103/indianjpsychiatry.indianjpsychiatry_490_22 · PMCID: PMC10096213 · PMID: 37063633',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10096213/',
    section: 'Tables 1, 2, Figure 3 & Alcohol/Opioid/Cannabis/Stimulant Sections',
    supports: 'Mandatory parenteral Thiamine (at least 250–500 mg IM/IV daily for 3–5 days) BEFORE or concurrently with IV Glucose/Dextrose to prevent precipitating acute Wernicke encephalopathy (never delay dextrose if hypoglycemic); rule out occult head injury (subdural hematoma) and methanol poisoning (ophthalmoscopy for papilledema); ECG for Holiday Heart arrhythmias; Haloperidol 5mg + Promethazine 25–50mg IM for severe combative alcohol intoxication; Naloxone reversal in opioid overdose.',
    limitations: 'Focuses primarily on acute intoxication in Indian EDs; refers to companion IPS guidelines for prolonged withdrawal maintenance.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Current IPS Substance Emergency CPG v2023'
  },
  'IPS-GERI-2023': {
    id: 'IPS-GERI-2023',
    origin: 'india',
    badge: 'IPS CPG 2023',
    title: 'Clinical Practice Guidelines for the Assessment and Management of Elderly Presenting with Psychiatric Emergencies',
    authors: 'Grover S, Avasthi A (PGIMER Chandigarh, Indian Psychiatric Society)',
    year: '2023 (Indian J Psychiatry, Vol 65, Issue 2, pp. 140–158)',
    identifier: 'DOI: 10.4103/indianjpsychiatry.indianjpsychiatry_487_22 · PMCID: PMC10096200 · PMID: 37063626',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10096200/',
    section: 'Tables 4, 8, 12, 13 (Toxidrome Matrix, Delirium Tremens Thiamine/BZD Protocol, Lorazepam Challenge Test)',
    supports: 'Delirium Tremens regimen: Thiamine 500 mg IV TID for 2–3 days (diluted in 50–100 mL NS over 30 min) BEFORE or together with glucose, then 250 mg IV OD for 3–5 days; correct hypomagnesemia with MgSO4 (thiamine is ineffective without Mg2+); symptom-triggered Lorazepam 2 mg or Diazepam 10 mg IV/PO (prefer Lorazepam in hepatic dysfunction; Day-1 total dose becomes Day-2 standing dose then taper over 3–4 days); Catatonia Lorazepam Challenge protocol (Baseline BFCRS -> 1–2 mg IV Lorazepam -> reassess at 5 min [15 min IM / 30 min PO] -> ≥50% BFCRS reduction = positive).',
    limitations: 'Designed with geriatric vulnerability in mind; adult emergency dosing cross-referenced in Table 13.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Current IPS Emergency CPG v2023'
  },
  'IPS-DELIR-2018': {
    id: 'IPS-DELIR-2018',
    origin: 'india',
    badge: 'IPS CPG 2018',
    title: 'Clinical Practice Guidelines for Management of Delirium in Elderly',
    authors: 'Grover S, Avasthi A (PGIMER Chandigarh, Indian Psychiatric Society)',
    year: '2018 (Indian J Psychiatry, Vol 60, Suppl 3, pp. S329–S340)',
    identifier: 'DOI: 10.4103/0019-5545.224473 · PMCID: PMC5840908 · PMID: 29535468',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5840908/',
    section: 'Tables 3, 6, 9, 11, 12 & Figure 3 (CAM, DRS-R-98, Non-Alcohol vs Alcohol Delirium)',
    supports: 'Primary medical/surgical team ownership for altered sensorium; CAM / DRS-R-98 assessment; non-pharmacological reorientation & anticholinergic deprescribing first; low-dose Haloperidol (0.25–0.5 mg q4h in elderly; 0.5–2 mg in adults) or Risperidone/Olanzapine/Quetiapine (prefer Quetiapine in Parkinsonism/Lewy Body Dementia) ONLY for severe agitation/perceptual distress with baseline & serial QTc monitoring.',
    limitations: 'Notes that double-blind placebo-controlled trials of antipsychotics in non-alcohol delirium are small and show mixed impact on delirium duration.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Active IPS Delirium CPG v2018 (Reaffirmed 2023)'
  },
  'MHCA-2017': {
    id: 'MHCA-2017',
    origin: 'india',
    badge: 'MHCA 2017 (India Law)',
    title: 'The Mental Healthcare Act, 2017 (Act No. 10 of 2017, Government of India), BNS 2023 & IPS Restraint Guidelines',
    authors: 'Parliament of India / Ministry of Law & Justice; Raveesh BN & Lepping P (IPS 2019 Restraint Guidelines)',
    year: '2017 (Enacted April 7, 2017) & 2019 (Indian J Psychiatry 61(Suppl 4):S698–S705)',
    identifier: 'PMCID: PMC6482694 (Restraint CPG) · PMCID: PMC9122135 (MHCA Service Implementation)',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6482694/',
    section: 'MHCA Chapter XII: Section 86 (Independent), Section 89 (Supported Admission), Section 94 (Emergency Treatment), Section 95 (Prohibited Procedures), Section 97 (Restraint), Section 115 (Suicide)',
    supports: '1) Sec 94(1)–(4): Any Registered Medical Practitioner may give emergency treatment to prevent death/irreversible harm, serious self/other harm, or serious property damage (with Nominated Representative [NR] consent where available), strictly limited to 72 hours OR until the person has been assessed at a mental health establishment, whichever is earlier (7 days only in a declared disaster/emergency); Sec 94(3) prohibits ECT under emergency treatment. 2) Sec 95(1)(a): Unmodified ECT (without muscle relaxants and anaesthesia) is strictly prohibited; Sec 95(1)(b) & 95(2) prohibit ECT for minors unless certified by the psychiatrist in charge with guardian informed consent AND prior Mental Health Review Board (MHRB) approval. 3) Sec 97: Seclusion is ILLEGAL in India; physical restraint requires psychiatrist authorization, supine positioning, q15min nursing checks, hourly doctor review, mandatory NR notification within 24 hours (Sec 97(5)), and monthly MHRB reporting (Sec 97(6)). 4) Sec 89: Supported admission up to 30 days requires 2 independent assessments (1 psychiatrist + 1 MHP/medical practitioner). 5) Sec 115: Person attempting suicide is presumed to have severe stress and shall not be tried or punished (general suicide attempt offence omitted under BNS 2023).',
    limitations: 'Statutory Indian law; hospital-level documentation forms must align with State Mental Health Rules.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Active Statutory Law of India'
  },
  'NICE-NG10-2015': {
    id: 'NICE-NG10-2015',
    origin: 'intl',
    badge: 'NICE NG10',
    title: 'Violence and aggression: short-term management in mental health, health and community settings (NICE Guideline NG10)',
    authors: 'National Institute for Health and Care Excellence (UK)',
    year: '2015 (Surveillance reaffirmed 2019/2025)',
    identifier: 'NICE Reference: NG10 · PMID: 26180881',
    url: 'https://www.nice.org.uk/guidance/ng10/chapter/recommendations',
    section: 'Section 1.4 & 1.5 (Restrictive Interventions & Rapid Tranquillisation)',
    supports: 'Use IM Lorazepam alone first if no baseline ECG is available or if patient is antipsychotic-naive/has cardiovascular disease; if partial response to IM Haloperidol, consider adding IM Promethazine; never use IV route as first-line rapid tranquillisation unless immediate resuscitation facilities exist; monitor BP, pulse, temperature, respiratory rate, hydration, and level of consciousness at least every 15 minutes for 1 hour after parenteral rapid tranquillisation.',
    limitations: 'UK availability of IM Promethazine differed historically from India; in Indian EDs, IM Haloperidol + Promethazine is commonly co-administered per TREC-Vellore trials once cardiac red flags are excluded.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Current NICE Guideline NG10'
  },
  'BAP-CAT-2023': {
    id: 'BAP-CAT-2023',
    origin: 'intl',
    badge: 'BAP Catatonia 2023',
    title: 'Evidence-based consensus guidelines for the management of catatonia: Recommendations from the British Association for Psychopharmacology',
    authors: 'Rogers JP, Oldham MA, Fricchione G, Northoff G, Wilson JE, Grover S (PGIMER India), et al.',
    year: '2023 (J Psychopharmacol, Vol 37, Issue 4, pp. 327–369)',
    identifier: 'DOI: 10.1177/02698811231158232 · PMCID: PMC10101189 · PMID: 37039129',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10101189/',
    section: 'Tables 3, 7, 9, 10 & Treatment Recommendations (pp. 338–355)',
    supports: 'Diagnose Catatonia with ≥3 DSM-5-TR/ICD-11 signs and rate with Bush-Francis Catatonia Rating Scale (BFCRS; ≥2 on 14-item screen). Lorazepam Challenge Test: Score baseline BFCRS -> Give Lorazepam 1–2 mg IV (reassess at 5 min), 1–2 mg IM (reassess at 15 min), or 2 mg PO (reassess at 30 min) -> ≥50% reduction in BFCRS confirms positive response. Titrate Lorazepam in divided doses up to 8–16 mg/day (max 24 mg/day). Urgent Bilateral ECT is first-line alongside Lorazepam in Malignant Catatonia or Lorazepam non-response. Clozapine withdrawal catatonia -> restart Clozapine; NMDA encephalitis -> avoid high-potency D2 blockers.',
    limitations: 'Most recommendations are Grade B/C/D/S because placebo-controlled RCTs in acute catatonia are ethically and practically scarce.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Current BAP Consensus Guideline v2023'
  },
  'EXTRIP-LI-2015': {
    id: 'EXTRIP-LI-2015',
    origin: 'intl',
    badge: 'EXTRIP Lithium 2015',
    title: 'Extracorporeal Treatment for Lithium Poisoning: Systematic Review and Recommendations from the EXTRIP Workgroup',
    authors: 'Decker BS, Goldfarb DS, Dargan PI, Bhalla A (PGIMER India / ISCCM / API), Ghannoum M, et al.',
    year: '2015 (Clin J Am Soc Nephrol, Vol 10, Issue 5, pp. 875–887)',
    identifier: 'DOI: 10.2215/CJN.10021014 · PMCID: PMC4422246 · PMID: 25583292',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4422246/',
    section: 'Summary of Recommendations (1D & 2D), Tables 2, 3, 5',
    supports: 'Lithium is highly dialyzable (Level A). Intermittent Hemodialysis (HD) is the preferred modality (1D). HD is RECOMMENDED (1D): 1) If kidney function is impaired AND [Li+] >4.0 mEq/L; OR 2) In the presence of decreased level of consciousness, seizures, or life-threatening dysrhythmias IRRESPECTIVE of serum [Li+]. HD is SUGGESTED (2D): 1) If [Li+] >5.0 mEq/L; 2) If significant confusion is present; OR 3) If expected time to reduce [Li+] to <1.0 mEq/L is >36 hours (IPS 2022 also advises considering HD at >2.5 mEq/L in chronic toxicity or renal impairment). Continue HD until [Li+] <1.0 mEq/L or clinical improvement (minimum 6h if levels unavailable), then monitor serial [Li+] over 12h for rebound. Activated charcoal does NOT bind lithium.',
    limitations: 'Evidence quality is graded 1D/2D because clinical literature consists of observational studies/case series without randomized trials.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Current EXTRIP International Consensus'
  },
  'HUNTER-SS-2003': {
    id: 'HUNTER-SS-2003',
    origin: 'intl',
    badge: 'Hunter Criteria 2003',
    title: 'The Hunter Serotonin Toxicity Criteria: simple and accurate diagnostic decision rules for serotonin toxicity',
    authors: 'Dunkley EJC, Isbister GK, Sibbritt D, Dawson AH, Whyte IM',
    year: '2003 (QJM: An International Journal of Medicine, Vol 96, Issue 9, pp. 635–642)',
    identifier: 'DOI: 10.1093/qjmed/hcg109 · PMID: 12925718',
    url: 'https://pubmed.ncbi.nlm.nih.gov/12925718/',
    section: 'Hunter Decision Rules (Derived in n=473 SSRI overdoses, validated in n=2222 poisonings)',
    supports: 'In the presence of a serotonergic agent (mandatory prerequisite), Serotonin Toxicity is diagnosed (84% sensitivity, 97% specificity vs gold-standard toxicologist diagnosis) if ANY ONE of 5 rules is met: 1) Spontaneous clonus; 2) Inducible clonus PLUS agitation OR diaphoresis; 3) Ocular clonus PLUS agitation OR diaphoresis; 4) Tremor PLUS hyperreflexia; 5) Hypertonia PLUS temperature >38°C PLUS ocular clonus OR inducible clonus.',
    limitations: 'Derived and validated in serotonergic overdose cohorts; in severe rigidity (temp >40°C), extreme truncal muscle rigidity can mask peripheral clonus/hyperreflexia.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Validated Diagnostic Decision Rule'
  },
  'CHIEW-SS-2024': {
    id: 'CHIEW-SS-2024',
    origin: 'intl',
    badge: 'Br J Clin Pharm 2024',
    title: 'Management of serotonin syndrome (toxicity)',
    authors: 'Chiew AL, Isbister GK (NSW Poisons Information Centre & University of Newcastle, Australia)',
    year: '2024 / 2025 Issue (Br J Clin Pharmacol, Vol 91, Issue 3, pp. 654–661)',
    identifier: 'DOI: 10.1111/bcp.16152 · PMCID: PMC11862804 · PMID: 38926083',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11862804/',
    section: 'Sections 6, 7 & 8 (Table 1 Modified Diagnostic Criteria, Figure 1 Severity-Based Management & Cyproheptadine Critique)',
    supports: 'Cornerstone of management is immediate cessation of serotonergic drugs, IV fluid resuscitation, and titrated Benzodiazepines (Diazepam/Lorazepam). In severe toxicity (Temp >38.5–39°C with truncal rigidity), life-saving intervention is immediate active external cooling, endotracheal intubation, and non-depolarizing neuromuscular paralysis (Vecuronium/Rocuronium; AVOID Succinylcholine). Explicitly documents conflicting/insufficient evidence for Cyproheptadine (retrospective studies show no mortality benefit over supportive care, though 12mg PO/NGT may offer symptomatic relief).',
    limitations: 'Highlights that 5-HT2A antagonists lack human RCT evidence and must never delay intubation/cooling in severe hyperthermic patients.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Current Clinical Pharmacology Review v2024'
  },
  'GURRERA-NMS-2011': {
    id: 'GURRERA-NMS-2011',
    origin: 'intl',
    badge: 'NMS Consensus 2011',
    title: 'An International Consensus Study of Neuroleptic Malignant Syndrome Diagnostic Criteria Using the Delphi Method',
    authors: 'Gurrera RJ, Caroff SN, Cohen A, et al. (J Clin Psychiatry 2011 & J Clin Psychopharmacol 2017)',
    year: '2011 / 2017 / 2019',
    identifier: 'DOI: 10.4088/JCP.10m06438 · PMID: 21733489 · PMCID: PMC6386430',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6386430/',
    section: 'Gurrera Delphi Weighted Diagnostic Criteria (Threshold ≥74/100) & Severity-Staged NMS Pharmacotherapy Table 1',
    supports: 'International Consensus NMS Diagnostic Score (100 points total, validated cutoff ≥74): Dopamine antagonist exposure or agonist withdrawal within 72h (20 pts), Hyperthermia >38.0°C (18 pts), Rigidity (17 pts), Mental status alteration (13 pts), CPK elevation ≥4x ULN (10 pts), Sympathetic nervous system lability (10 pts), Hypermetabolism (5 pts), Negative workup for mimics (7 pts). Severity-staged therapy: Stop neuroleptic + ICU IV hydration + Lorazepam 1–2mg (Mild) + Bromocriptine 2.5–5mg q8h or Amantadine 100–200mg BD (Moderate) + Dantrolene 1–2.5mg/kg bolus then 1mg/kg q6h for extreme rigidity/hyperthermia (Severe). Continue Bromocriptine/Dantrolene for ≥10 days then slow taper to prevent relapse; bilateral ECT for refractory NMS.',
    limitations: 'No head-to-head RCTs exist for NMS pharmacotherapy; retrospective case-series show mixed mortality data for Dantrolene vs Bromocriptine, so aggressive ICU supportive care remains paramount.',
    verifiedDate: '2026-10-20',
    versionStatus: 'Validated Consensus Criteria & Pharmacotherapy Review'
  }
};

```

### File: `/src/data/triage.ts`
```typescript
export interface TriageQuestion {
  label: string;
  targetPathway: string;
  targetTier: string;
  reason: string;
}

export interface TriageGroup {
  id: string;
  title: string;
  desc: string;
  questions: TriageQuestion[];
}

export const SYMPTOM_TRIAGE_CASES: TriageGroup[] = [
  {
    id: 'rigid_febrile',
    title: '01. Rigid & Febrile / Autonomic Storm Presentation',
    desc: 'High fever, altered sensorium, tachycardia, labile blood pressure, and increased muscle tone',
    questions: [
      {
        label: 'Hyperreflexia + Ankle/Ocular Clonus + Mydriasis + Diarrhea (<24h after SSRI/SNRI/Tramadol/Linezolid)',
        targetPathway: 'serotonin',
        targetTier: 'severe_ss',
        reason: 'Matches Hunter Serotonin Toxicity Criteria (Clonus + Hyperreflexia distinguish Serotonin Syndrome from NMS) [IPS-TOX-2022, HUNTER-SS-2003].'
      },
      {
        label: 'Generalized "Lead-Pipe" Rigidity + Bradyreflexia (Decreased Reflexes) + High CPK (1–10d after Haloperidol/Antipsychotic)',
        targetPathway: 'nms',
        targetTier: 'severe_nms',
        reason: 'Classic Neuroleptic Malignant Syndrome (Lead-pipe rigidity + bradyreflexia + dopamine blocker exposure) [IPS-TOX-2022, GURRERA-NMS-2011].'
      },
      {
        label: 'Mutism, Posturing, Waxy Flexibility, Negativism + Fever/Autonomic Lability (No recent antipsychotic dose)',
        targetPathway: 'catatonia',
        targetTier: 'malignant_cat',
        reason: 'Malignant Catatonia — requires immediate ICU hydration, high-dose IV Lorazepam, and urgent Bilateral ECT [BAP-CAT-2023].'
      }
    ]
  },
  {
    id: 'agitated_thrashing',
    title: '02. Thrashing, Violent, or Restless Presentation',
    desc: 'Combative, pacing, shouting, or attempting to pull out IV lines in Casualty',
    questions: [
      {
        label: 'Clear Sensorium + Auditory Hallucinations / Grandiosity / Threat Delusions (Refuses Oral Meds)',
        targetPathway: 'agitation',
        targetTier: 'severe_im',
        reason: 'Primary Psychotic/Manic Severe Agitation -> IM Haloperidol 5–10mg + Promethazine 25–50mg or IM Lorazepam 2mg [IPS-AGIT-2023, TREC-VELLORE-2004].'
      },
      {
        label: 'Disoriented + Coarse Tremors + Drenching Sweats + Visual/Tactile Hallucinations (Stopped drinking alcohol 1–4d ago)',
        targetPathway: 'alcohol_dt',
        targetTier: 'dt_wernicke',
        reason: 'Alcohol Withdrawal Delirium (Delirium Tremens) -> STAT IV Thiamine 500mg before/with glucose + IV Lorazepam/Diazepam [IPS-GERI-2023].'
      },
      {
        label: 'Pacing Incessantly + "Inner Restlessness in Legs" + Started Haloperidol/Risperidone/Aripiprazole recently',
        targetPathway: 'dystonia_akathisia',
        targetTier: 'acute_akathisia',
        reason: 'Acute Antipsychotic-Induced Akathisia -> Do NOT give more Haloperidol! Reduce neuroleptic + give Propranolol 40–80mg/d [IPS-TOX-2022].'
      },
      {
        label: 'Fluctuating Alertness + Visual Hallucinations + Medical Illness/Elderly (Non-Alcohol)',
        targetPathway: 'agitation',
        targetTier: 'organic_delirium',
        reason: 'Acute Medical Delirium -> Treat medical cause + reorientation + low-dose Haloperidol 0.5–2mg only if dangerous (avoid BZDs) [IPS-DELIR-2018].'
      }
    ]
  },
  {
    id: 'spasm_posturing',
    title: '03. Mute, Frozen, or Sudden Neck/Eye/Throat Spasm',
    desc: 'Patient cannot speak, holds fixed posture, or presents with painful neck/ocular/airway spasm',
    questions: [
      {
        label: 'Sudden Painful Neck Twist (Torticollis), Upward Eye Roll (Oculogyric), Tongue Protrusion, or Throat Stridor (Patient is distressed & wants relief)',
        targetPathway: 'dystonia_akathisia',
        targetTier: 'laryngeal_dystonia',
        reason: 'Acute Dystonic Reaction -> Stat IM Promethazine 25–50mg or IV/IM Biperiden 5mg + IV Lorazepam 1–2mg if stridor [IPS-TOX-2022].'
      },
      {
        label: 'Stupor, Mutism, Negativism, Waxy Flexibility, Staring, Echopraxia (≥3 signs)',
        targetPathway: 'catatonia',
        targetTier: 'stuporous',
        reason: 'Acute Catatonia -> Score baseline BFCRS and perform IV Lorazepam 1–2mg Challenge Test [BAP-CAT-2023, IPS-GERI-2023].'
      }
    ]
  },
  {
    id: 'overdose_selfharm',
    title: '04. Poisoning, Psychotropic Overdose, or Self-Harm',
    desc: 'Brought with empty tablet strips, coarse tremor/ataxia on Lithium, or post-suicide attempt',
    questions: [
      {
        label: 'On Lithium Therapy (or Lithium Overdose) with Coarse Tremor, Ataxia, Dysarthria, Confusion, Seizures, or AKI',
        targetPathway: 'lithium_tox',
        targetTier: 'li_severe_hd',
        reason: 'Lithium Toxicity -> Stop Li+, start IV 0.9% NaCl, and evaluate EXTRIP Hemodialysis criteria [EXTRIP-LI-2015, IPS-TOX-2022].'
      },
      {
        label: 'Overdose of TCA (Amitriptyline), Valproate, Carbamazepine, Antipsychotic, or Benzodiazepines',
        targetPathway: 'lithium_tox',
        targetTier: 'other_overdose',
        reason: 'Psychotropic Overdose -> Check ECG (QRS/QTc) and administer targeted IPS antidote (NaHCO3 / L-Carnitine / MgSO4) [IPS-TOX-2022].'
      },
      {
        label: 'Medically Stabilized After Suicide Attempt OR Presenting with Active Suicidal Ideation / Plan',
        targetPathway: 'suicide_dsh',
        targetTier: 'high_suic',
        reason: 'Acute Suicidal Crisis -> IPS CPG 3-Tier Risk Stratification, 1:1 / random 15m observation, Safety Plan & MHCA Sec 115 compliance [IPS-SUIC-2023].'
      }
    ]
  }
];

```
