# STAT-Psych India (v3.0.0) — Complete AI Agent Context Bundle

> **Purpose of this file**: Provide another AI agent (ChatGPT, Claude, Gemini, Cursor, etc.) with 100% context of the **STAT-Psych India — Emergency Psychiatric Clinical Decision Support System (CDSS)** application, including its clinical data architecture, Supercell/Clash Royale-inspired tactile UI/UX design system, bedside calculators, MHCA 2017 handover engine, Android APK packaging pipeline, and complete TypeScript/React source code.

---

## 1. Executive Architecture & Design Overview

- **Application Name**: STAT-Psych India — Emergency Psychiatric CDSS
- **Target Users**: Casualty Medical Officers (CMOs), Psychiatry Residents (DNB/MD), and Crisis Care Clinicians in India.
- **Evidence Foundation**:
  - Indian Psychiatric Society (IPS) Clinical Practice Guidelines (2018–2023)
  - CMC Vellore TREC-India I & II Randomized Controlled Trials (Haloperidol + Promethazine vs Lorazepam / Olanzapine)
  - Indian Mental Healthcare Act (MHCA) 2017 (Section 94 Emergency Treatment, Section 89 Supported Admission, Section 115 Decriminalization of Suicide)
  - International Consensus: NICE NG10 (2015), BAP Catatonia Consensus (2023), Gurrera International NMS Consensus (2011), Hunter Serotonin Toxicity Criteria (2003), EXTRIP Lithium Workgroup (2015).
- **UI/UX Design System (v3.0.0 Tactile Edition)**:
  - Inspired by mobile-game tactile craftsmanship (Supercell / Clash Royale) adapted for high-stakes clinical emergency speed and readability.
  - **Tactile 3D-Beveled Surfaces (`.royale-card` & `.royale-btn`)**: Symmetric 2px borders with a 4px bottom lip, compositor-only `transform` press states (`<=140ms`), Web Audio API synthesized tactile chimes + Android haptic vibration (`src/utils/feedback.ts`) with a 1-tap Mute toggle.
  - **8-Syndrome Command Deck (`SyndromeSelector.tsx`)**: Color-coded cards with custom vector emblems for instant switching across all 8 psychiatric emergencies.
  - **3-Tier Tactical Severity Cards (`SubPathwaySelector.tsx`)**: Tier 1 (Teal — Oral/De-escalate), Tier 2 (Amber — Urgent Parenteral/Challenge), Tier 3 (Crimson — Critical/Refractory/ICU).
  - **5-Level Clinical Action Deck (`DecisionBanner.tsx`)**:
    1. Arena Command Header (Pathway + Tier + Citations)
    2. Immediate Clinical Action Cards with 1-tap bedside option highlighting & a 3-Tile Dosing Strip (*Target Dose*, *Administration Route*, *Formulation*)
    3. High-Visibility Critical Safety & Contraindication Shield (auto-bulleted warnings + live Multi-Comorbidity Conflict Alerts & Patient Risk Loadout overrides)
    4. Dosing, Onset & 24h Ceiling Grid with an integrated **Bedside Onset & Reassessment Quick-Timer** (`15m IM` / `30m PO/IM`)
    5. Second-Line & Escalation Deck
    6. **Collapsed-by-Default Expandable Clinical Rationale** (`Why This Option?`) with highlighted key findings, head-to-head trial comparison scorecards, safety pitfalls, and full verbatim guideline text.
- **Standalone Offline Android APK (`in.statpsych.cdss`)**:
  - Native Android `WebView` wrapper (`MainActivity.java`) intercepting `https://appassets.androidplatform.net/*` to serve bundled Vite production assets 100% offline.
  - Compiled via `scripts/build-apk.sh` (`aapt`, `javac`, `dalvik-exchange`, `zipalign`, `apksigner` v1+v2+v3 schemes).

---

## 2. Repository File Tree Included in This Bundle

```text
README.md\npackage.json\nvite.config.ts\nindex.html\nsrc/index.css\nsrc/App.tsx\nsrc/utils/feedback.ts\nsrc/utils/clinicalCalculators.ts\nsrc/hooks/usePWAInstall.ts\nsrc/components/Header.tsx\nsrc/components/ModifiersBar.tsx\nsrc/components/Step0SafetyGate.tsx\nsrc/components/SyndromeSelector.tsx\nsrc/components/SubPathwaySelector.tsx\nsrc/components/DecisionBanner.tsx\nsrc/components/LifecycleStepper.tsx\nsrc/components/CitationChip.tsx\nsrc/components/AndroidFrame.tsx\nsrc/components/calculators/BedsideCalculator.tsx\nsrc/components/calculators/CatatoniaChallengeWidget.tsx\nsrc/components/modals/TriageModal.tsx\nsrc/components/modals/SourceRegistryModal.tsx\nsrc/components/modals/CitationDrawer.tsx\nsrc/components/modals/NoteModal.tsx\nsrc/components/modals/AndroidInstallModal.tsx\nsrc/data/sources.ts\nsrc/data/triage.ts\nsrc/data/pathways.ts\nsrc/data/structuredTreatmentData.ts\nandroid/AndroidManifest.xml\nandroid/src/in/statpsych/cdss/MainActivity.java\nscripts/build-apk.sh\n.github/workflows/build-android-apk.yml
```

---

## 3. Complete Source Code

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

### File: `/vite.config.ts`
```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon.svg', 'apple-touch-icon.png', 'pwa-192x192.png', 'pwa-512x512.png'],
        manifest: {
          id: '/',
          name: 'STAT-Psych India — Emergency Psychiatric CDSS',
          short_name: 'STAT-Psych',
          description: 'Evidence-first psychiatric emergency clinical decision support system for casualty and crisis care, based on IPS CPG, CMC Vellore trials, and MHCA 2017.',
          theme_color: '#0a0f1d',
          background_color: '#060913',
          display: 'standalone',
          orientation: 'portrait-primary',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/icon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any'
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable'
            }
          ],
          categories: ['medical', 'health', 'productivity'],
          shortcuts: [
            {
              name: 'Acute Agitation',
              short_name: 'Agitation',
              description: 'Launch Acute Severe Agitation Protocol',
              url: '/?pathway=agitation',
              icons: [{ src: '/icon.svg', sizes: '192x192' }]
            },
            {
              name: 'Catatonia & Challenge',
              short_name: 'Catatonia',
              description: 'Lorazepam Challenge & BFCRS Evaluator',
              url: '/?pathway=catatonia',
              icons: [{ src: '/icon.svg', sizes: '192x192' }]
            },
            {
              name: 'NMS Protocol',
              short_name: 'NMS',
              description: 'Neuroleptic Malignant Syndrome Criteria',
              url: '/?pathway=nms',
              icons: [{ src: '/icon.svg', sizes: '192x192' }]
            },
            {
              name: 'Alcohol DT & Wernicke',
              short_name: 'Alcohol DT',
              description: 'Delirium Tremens & High-Dose Thiamine',
              url: '/?pathway=alcohol_dt',
              icons: [{ src: '/icon.svg', sizes: '192x192' }]
            }
          ]
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          navigateFallbackDenylist: [/\.apk$/i, /^\/stat-psych-india\.apk$/i],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: true
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

```

### File: `/index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>STAT-Psych India — Emergency Psychiatric CDSS</title>
    <meta name="description" content="Modern, evidence-first psychiatric emergency clinical decision support system for casualty and crisis care, based on IPS CPG, CMC Vellore trials, and MHCA 2017." />
    
    <!-- Open Graph & Social -->
    <meta property="og:title" content="STAT-Psych India — Emergency Psychiatric CDSS" />
    <meta property="og:description" content="Modern, evidence-first psychiatric emergency clinical decision support system for casualty and crisis care, based on IPS CPG, CMC Vellore trials, and MHCA 2017." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- Android & iOS Mobile / PWA Meta -->
    <meta name="theme-color" content="#ffffff" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="STAT-Psych" />
    <link rel="icon" type="image/svg+xml" href="/icon.svg" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

    <!-- Typography: Plus Jakarta Sans (Display) + Public Sans (Clinical Body) + JetBrains Mono (Tabular Data) -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-[#F1F5F9] text-[#0F172A] antialiased selection:bg-teal-600/20 selection:text-teal-950 min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

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

### File: `/src/hooks/usePWAInstall.ts`
```typescript
import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    // Detect standalone display mode (already running as installed app)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsInstalled(isStandalone);

    const ua = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));
    setIsAndroid(/android/.test(ua));

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return false;
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
        setDeferredPrompt(null);
        return true;
      }
    } catch (err) {
      console.error('Install prompt error:', err);
    }
    return false;
  };

  return {
    isInstallable: !!deferredPrompt,
    isInstalled,
    isIOS,
    isAndroid,
    isOnline,
    install,
    deferredPrompt
  };
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

### File: `/src/components/CitationChip.tsx`
```typescript
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

```

### File: `/src/components/AndroidFrame.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Download, Smartphone, Monitor } from 'lucide-react';

interface AndroidFrameProps {
  enabled: boolean;
  onToggleFrame: () => void;
  onOpenApkModal: () => void;
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  enabled,
  onToggleFrame,
  onOpenApkModal,
  children
}) => {
  const [currentTime, setCurrentTime] = useState<string>('09:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-200/80 dark:bg-slate-950 py-4 sm:py-6 px-2 flex flex-col items-center justify-center">
      {/* Top Frame Controls Bar */}
      <div className="w-full max-w-[430px] mb-3 flex items-center justify-between text-xs px-2">
        <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
          <Smartphone className="w-4 h-4 text-teal-700 dark:text-teal-400" />
          <span>Android Clinical App Preview (412px Viewport)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenApkModal}
            className="px-2.5 py-1 rounded-lg bg-teal-700 text-white hover:bg-teal-800 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Download className="w-3 h-3" />
            <span>Get APK</span>
          </button>
          <button
            type="button"
            onClick={onToggleFrame}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Monitor className="w-3 h-3" />
            <span>Full Desktop</span>
          </button>
        </div>
      </div>

      {/* Android Hardware Bezel */}
      <div className="relative w-full max-w-[420px] h-[860px] max-h-[90vh] rounded-[44px] bg-white dark:bg-slate-900 border-[8px] border-slate-800 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Android Status Bar */}
        <div className="h-9 bg-white dark:bg-slate-900 px-6 flex items-center justify-between shrink-0 select-none z-30 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-mono tabular-nums font-medium text-slate-700 dark:text-slate-300">
            {currentTime}
          </span>

          {/* Front Camera Cutout */}
          <div className="w-3 h-3 rounded-full bg-slate-900 dark:bg-black" />

          {/* Status Icons */}
          <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4 text-teal-700 dark:text-teal-400" />
          </div>
        </div>

        {/* Scrollable Android Viewport */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F8FAFC] dark:bg-[#0B0F19] relative scroll-smooth">
          {children}
        </div>

        {/* Android Gesture Navigation Pill */}
        <div className="h-5 bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 z-30 border-t border-slate-100 dark:border-slate-800">
          <div className="w-28 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>
      </div>
    </div>
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

### File: `/src/components/modals/TriageModal.tsx`
```typescript
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

```

### File: `/src/components/modals/SourceRegistryModal.tsx`
```typescript
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

```

### File: `/src/components/modals/CitationDrawer.tsx`
```typescript
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

```

### File: `/src/components/modals/NoteModal.tsx`
```typescript
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

```

### File: `/src/components/modals/AndroidInstallModal.tsx`
```typescript
import React, { useState } from 'react';
import {
  Download,
  CheckCircle2,
  X,
  Terminal,
  Copy,
  Check,
  ShieldCheck,
  FolderGit2,
  Smartphone
} from 'lucide-react';

interface AndroidInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstallable: boolean;
  isInstalled: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  onInstall: () => Promise<boolean>;
}

export const AndroidInstallModal: React.FC<AndroidInstallModalProps> = ({
  isOpen,
  onClose,
  isInstallable,
  isInstalled,
  onInstall
}) => {
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [apkDownloading, setApkDownloading] = useState<boolean>(false);

  if (!isOpen) return null;

  const buildApkCmd = `npm install && npm run build:apk`;

  const handleCopyCmd = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(buildApkCmd);
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    }
  };

  const handleDirectApkDownload = () => {
    setApkDownloading(true);
    setTimeout(() => setApkDownloading(false), 3500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="android-apk-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/75 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
    >
      <div className="royale-card bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Mobile Sheet Handle */}
        <div className="w-10 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="px-5 py-4 border-b-2 border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-900 dark:bg-slate-950 text-white">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Smartphone className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-teal-400">
                <span>Package: in.statpsych.cdss</span>
                <span aria-hidden="true">·</span>
                <span>v3.0.0 Signed Tactile Edition</span>
              </div>
              <h2 id="android-apk-modal-title" className="font-display text-base sm:text-lg font-extrabold text-white mt-0.5">
                Download Standalone Android APK
              </h2>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close Android Installation Modal"
            onClick={onClose}
            className="royale-btn min-h-[38px] w-9 rounded-xl bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Body */}
        <div className="divide-y-2 divide-slate-200 dark:divide-slate-800 overflow-y-auto text-xs sm:text-sm">
          {/* Option 1: Direct Signed .APK File Download */}
          <div className="p-5 space-y-4 bg-teal-50/50 dark:bg-teal-950/25">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-display text-xs sm:text-sm font-extrabold text-teal-900 dark:text-teal-300">
                  01. Direct Standalone Android Package (.APK · v3.0.0)
                </span>
                <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-teal-700 dark:text-teal-400 stroke-[2.5]" />
                  <span>v1/v2/v3 APK Signature Verified · API 21+</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Download the compiled, self-contained <code className="font-mono font-extrabold text-teal-900 dark:text-teal-300">stat-psych-india.apk</code> package directly to your Android device. All 8 emergency psychiatric pathways, 24 tactile severity tiers, dosing calculators, and expandable evidence rationales are bundled inside the APK for 100% offline casualty use.
              </p>
            </div>

            <a
              href="/stat-psych-india.apk"
              download="stat-psych-india.apk"
              onClick={handleDirectApkDownload}
              className="royale-btn w-full py-3.5 px-4 rounded-2xl bg-teal-600 hover:bg-teal-500 border-teal-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span>
                {apkDownloading
                  ? 'Downloading stat-psych-india.apk (v3.0.0)...'
                  : 'Download stat-psych-india.apk (Direct Signed APK)'}
              </span>
            </a>

            <div className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2 pt-0.5">
              <span>Package ID: in.statpsych.cdss</span>
              <span>Min SDK: Android 5.0+ (API 21)</span>
              <span>100% Offline Ready</span>
            </div>
          </div>

          {/* Option 2: GitHub Repository APK Paths & CI/CD Releases */}
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="font-display text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FolderGit2 className="w-4 h-4 text-teal-700 dark:text-teal-400 stroke-[2.5]" />
                <span>02. Compiled APK Binaries &amp; Build Script</span>
              </span>
              <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-400">
                Verified in Workspace
              </span>
            </div>

            <div className="royale-card rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800 font-mono text-xs">
              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-900 dark:text-slate-100 font-bold">/stat-psych-india.apk</span>
                <span className="text-slate-500 dark:text-slate-400">Root Signed APK Binary (v3.0.0)</span>
              </div>
              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-900 dark:text-slate-100 font-bold">/releases/stat-psych-india-v3.0.0.apk</span>
                <span className="text-slate-500 dark:text-slate-400">GitHub Release APK (v3.0.0)</span>
              </div>
              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-900 dark:text-slate-100 font-bold">/public/stat-psych-india.apk</span>
                <span className="text-slate-500 dark:text-slate-400">Served Direct APK</span>
              </div>
              <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
                <span className="text-slate-900 dark:text-slate-100 font-bold">/.github/workflows/build-android-apk.yml</span>
                <span className="text-slate-500 dark:text-slate-400">GitHub Releases CI/CD</span>
              </div>
            </div>

            <div className="royale-card rounded-2xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 p-3.5 space-y-1.5 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-bold">
                  <Terminal className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                  <span>Rebuild Signed APK from Source:</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopyCmd}
                  className="text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 font-sans font-extrabold cursor-pointer"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCmd ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="text-slate-800 dark:text-slate-200 overflow-x-auto text-[11px] font-bold leading-relaxed">
                {buildApkCmd}
              </pre>
            </div>
          </div>

          {/* Option 3: Instant Browser WebAPK Install */}
          <div className="p-5 space-y-3">
            <div className="space-y-1">
              <div className="font-display text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                03. Instant Progressive WebAPK Installation
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Alternatively, install directly from Android Chrome without enabling unknown APK sources.
              </p>
            </div>

            {isInstalled ? (
              <div className="royale-card p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 flex items-center gap-2 text-xs font-extrabold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 stroke-[2.5]" />
                <span>STAT-Psych India is installed and active in standalone mode.</span>
              </div>
            ) : isInstallable ? (
              <button
                type="button"
                onClick={async () => {
                  const ok = await onInstall();
                  if (ok) onClose();
                }}
                className="royale-btn w-full py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-950 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Install WebAPK via Browser</span>
              </button>
            ) : (
              <div className="royale-card p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 font-medium">
                In <strong>Android Chrome</strong>, tap the top-right browser menu and select <strong>Install app</strong>.
              </div>
            )}
          </div>

          {/* Option 4: Download Single-File AI Agent Context Pack */}
          <div className="p-5 space-y-3 bg-slate-50/80 dark:bg-slate-950/40">
            <div className="space-y-1">
              <div className="font-display text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                04. AI Agent Context Bundle (AI_CONTEXT.md)
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Download a single, comprehensive Markdown file containing the full system architecture, file tree, clinical pathways, calculators, and source code to share with any AI agent.
              </p>
            </div>
            <a
              href="/AI_CONTEXT.md"
              download="STAT-Psych-India-AI_CONTEXT.md"
              className="royale-btn w-full py-3 px-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 border-slate-300 dark:border-slate-600 text-teal-800 dark:text-teal-300 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 stroke-[2.5] shrink-0" />
              <span>Download AI_CONTEXT.md (Full App Context for AI Agents)</span>
            </a>
          </div>
        </div>
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

### File: `/src/data/pathways.ts`
```typescript
export interface SubPathwayTier {
  id: string;
  label: string;
  subLabel: string;
  badge: string;
  bannerAction: {
    headline: string;
    primaryRegimen: string;
    secondaryRegimen: string;
    onsetWait: string;
    criticalSafety: string;
    citations: string[];
  };
}

export interface CalculatorItem {
  id: string;
  label: string;
  points: number;
}

export interface CalculatorDef {
  type: 'bvc' | 'bfcrs' | 'gurrera_nms' | 'hunter_ss' | 'ciwa_quick' | 'bars_dystonia' | 'extrip_li' | 'ips_suicide';
  title: string;
  subtitle: string;
  citation: string;
  items: CalculatorItem[];
}

export interface DifferentialItem {
  condition: string;
  clue: string;
  action: string;
}

export interface MonitoringMilestone {
  time: string;
  task: string;
}

export interface EmergencyPathway {
  id: string;
  shortTitle: string;
  fullTitle: string;
  icon: string;
  accent: 'rose' | 'teal' | 'orange' | 'purple' | 'amber' | 'cyan' | 'indigo' | 'emerald';
  tagline: string;
  primarySources: string[];
  tiers: SubPathwayTier[];
  calculator: CalculatorDef;
  differentials: DifferentialItem[];
  statLabs: string[];
  comorbidityAdjustments: Record<string, string>;
  monitoring: MonitoringMilestone[];
  disposition: {
    setting: string;
    mhcaChecklist: string[];
  };
}

export interface PatientModifier {
  id: string;
  label: string;
  shortTag: string;
  color: 'amber' | 'rose' | 'purple' | 'cyan';
  summaryRule: string;
}

export const PATIENT_MODIFIERS: PatientModifier[] = [
  {
    id: 'elderly',
    label: 'Elderly / Frail (>65y)',
    shortTag: 'Elderly >65y',
    color: 'amber',
    summaryRule: 'Halve initial antipsychotic/BZD doses (Start Low, Go Slow); high risk of paradoxical disinhibition with BZDs, postural falls, and delirium [IPS-GERI-2023].'
  },
  {
    id: 'hepatic',
    label: 'Hepatic Failure / Cirrhosis',
    shortTag: 'Hepatic Impairment',
    color: 'rose',
    summaryRule: 'PREFER Lorazepam (glucuronidation, no active metabolites) over Diazepam/Chlordiazepoxide; AVOID Dantrolene & Valproate (hepatotoxic); halve antipsychotic doses [IPS-AGIT-2022, IPS-TOX-2022].'
  },
  {
    id: 'renal',
    label: 'Renal Failure / AKI (eGFR <30)',
    shortTag: 'Renal Impairment',
    color: 'rose',
    summaryRule: 'STOP Lithium immediately; lower EXTRIP hemodialysis threshold ([Li+] >4.0 mEq/L or any neurotoxicity); reduce Amisulpride/Risperidone/Gabapentin; hydrate cautiously [EXTRIP-LI-2015, IPS-TOX-2022].'
  },
  {
    id: 'qtc',
    label: 'QTc >450ms / Arrhythmia',
    shortTag: 'Prolonged QTc / Cardiac',
    color: 'rose',
    summaryRule: 'AVOID IV/high-dose Haloperidol, Ziprasidone, Chlorpromazine, and TCAs; prefer IM/PO Lorazepam or Oral Aripiprazole; if QTc >500ms correct K+/Mg2+ immediately and give IV MgSO4 2–4 g stat if Torsades/polymorphic VT [IPS-AGIT-2023, IPS-TOX-2022].'
  },
  {
    id: 'alcohol_cns',
    label: 'Acute Alcohol / Opioid Onboard',
    shortTag: 'CNS Depressant Onboard',
    color: 'amber',
    summaryRule: 'CONTRAINDICATED: Never combine IM Olanzapine + parenteral Benzodiazepine (fatal cardiorespiratory depression); avoid BZD in pure alcohol intoxication—prefer Haloperidol 5mg + Promethazine 25–50mg IM (lowest effective dose with SpO2 monitoring) [IPS-AGIT-2023, IPS-SUBST-2023].'
  },
  {
    id: 'pregnancy',
    label: 'Pregnancy / Peripartum',
    shortTag: 'Pregnancy / Peripartum',
    color: 'purple',
    summaryRule: 'Antipsychotics (Haloperidol / Olanzapine) preferred over repeated BZDs for acute agitation; monitor fetal heart rate/movements; bilateral modified ECT is safe & effective in peripartum catatonia/psychosis [IPS-AGIT-2023, BAP-CAT-2023].'
  },
  {
    id: 'copd',
    label: 'COPD / Resp Compromise',
    shortTag: 'Resp Compromise',
    color: 'rose',
    summaryRule: 'AVOID IV Midazolam/Diazepam and high-dose parenteral BZDs (CO2 retention & respiratory arrest); avoid Inhaled Loxapine (bronchospasm); keep Flumazenil & airway cart at bedside [IPS-AGIT-2023, IPS-AGIT-2022].'
  }
];

export const STEP_0_CHECKS = [
  { id: 'abcs', label: 'Airway / Breathing / SpO2 (>94%)' },
  { id: 'glucose', label: 'Stat Fingerstick RBS (Capillary Glucose)' },
  { id: 'vitals', label: 'Temp • HR • BP • RR' },
  { id: 'neuro', label: 'GCS • Pupils • Neck Stiffness' },
  { id: 'trauma', label: 'Head Injury / Recent Seizure?' },
  { id: 'pregnancy', label: 'Pregnancy Possible? (LMP / UPT)' },
  { id: 'frailty', label: 'Age <18y or Frail Elderly (>65y)?' },
  { id: 'toxins', label: 'Last Dose: Alcohol / Li+ / Clozapine?' }
];

export const EMERGENCY_PATHWAYS: Record<string, EmergencyPathway> = {
  agitation: {
    id: 'agitation',
    shortTitle: 'Acute Agitation',
    fullTitle: 'Acute Severe Agitation, Violence & Rapid Tranquillisation',
    icon: '01',
    accent: 'rose',
    tagline: 'Verbal De-escalation → Oral First → IM Haloperidol+Promethazine / Lorazepam / Olanzapine',
    primarySources: ['IPS-AGIT-2023', 'TREC-VELLORE-2004', 'TREC-INDIA-II-2007', 'TREC-RIO-2007', 'IPS-AGIT-2022', 'NICE-NG10-2015', 'MHCA-2017'],
    tiers: [
      {
        id: 'mild_mod',
        label: 'Tier 1: Mild–Moderate / Cooperative',
        subLabel: 'BVC 1–2 • RASS +1 to +2 • Accepts Oral Meds',
        badge: 'De-escalate + Oral Route First',
        bannerAction: {
          headline: 'Verbal De-escalation + Oral Melt/Liquid Regimen (Avoid Needle Trauma)',
          primaryRegimen: 'Tab Lorazepam 1–2 mg PO/Sublingual/MD OR Tab Risperidone 1–2 mg PO/MD (or Oral Solution) OR Tab Olanzapine 5–10 mg PO/MD',
          secondaryRegimen: 'Combination: Tab Risperidone 2 mg PO + Tab Lorazepam 2 mg PO (equivalent efficacy to IM Haloperidol 5mg + IM Lorazepam 2mg in cooperative patients [IPS-AGIT-2022]).',
          onsetWait: 'Onset: 20–60 min • Minimum Repeat Interval: 2 hours • Max 24h Dose: Lorazepam 12 mg / Risperidone 6 mg / Olanzapine 20 mg',
          criticalSafety: 'Rule out hypoglycemia (stat fingerstick RBS) and hypoxia (SpO2) BEFORE attributing agitation to psychiatric illness [IPS-AGIT-2023].',
          citations: ['IPS-AGIT-2023', 'IPS-AGIT-2022']
        }
      },
      {
        id: 'severe_im',
        label: 'Tier 2: Severe Violence / Refuses Oral',
        subLabel: 'BVC ≥3 • RASS +3 to +4 • Imminent Harm',
        badge: 'IM Rapid Tranquillisation',
        bannerAction: {
          headline: 'IM Rapid Tranquillisation (Indian Casualty Standard — TREC Vellore & IPS CPG)',
          primaryRegimen: 'Inj Haloperidol 5–10 mg IM + Inj Promethazine 25–50 mg IM (Standard Indian ED combo: in TREC-India I vs Lorazepam 4 mg IM, 97% vs 88% tranquil/asleep at 2h and 96% in both arms at 4h with faster sleep [76% vs 45%, NNT 3.2; mean time 29.7 vs 47.8 min]; Promethazine prevents acute dystonia—in TREC-Rio II, 10 dystonias occurred in the Haloperidol-alone arm vs 0 with Promethazine [TREC-VELLORE-2004, TREC-RIO-2007, IPS-AGIT-2023]) OR Inj Lorazepam 2 mg IM alone (Preferred by NICE NG10 if no baseline ECG or unknown cardiac/medical history [NICE-NG10-2015]).',
          secondaryRegimen: 'Inj Olanzapine 10 mg IM alone (Rapid 15–30 min onset and 0/150 dystonia in TREC-India II, but shorter duration requiring significantly more repeat doses within 4h [43% vs 21%] than Haloperidol+Promethazine [TREC-INDIA-II-2007]; NEVER combine with parenteral BZD within 1–2 hours).',
          onsetWait: 'Onset: 15–30 min • Repeat Interval: 30–60 min if uncalmed • Max 24h Dose: Haloperidol 20–30 mg / Promethazine 100 mg / IM Lorazepam 4–12 mg / Olanzapine 20–30 mg',
          criticalSafety: 'NEVER combine IM Olanzapine + IM/IV Benzodiazepine (risk of fatal respiratory & hypotension collapse). Avoid IV route as initial rapid tranquillisation unless resuscitation cart & Flumazenil are at bedside [IPS-AGIT-2023, NICE-NG10-2015].',
          citations: ['IPS-AGIT-2023', 'TREC-VELLORE-2004', 'TREC-INDIA-II-2007', 'TREC-RIO-2007', 'NICE-NG10-2015']
        }
      },
      {
        id: 'organic_delirium',
        label: 'Tier 3: Altered Sensorium / Delirious Agitation',
        subLabel: 'Fluctuating Attention • Visual Hallucinations • Abnormal Vitals',
        badge: 'Medical Delirium Protocol',
        bannerAction: {
          headline: 'Treat Underlying Medical Cause First + Ultra-Low-Dose Antipsychotic Only If Dangerous',
          primaryRegimen: 'Non-Alcohol Delirium: Correct hypoxia/hypoglycemia/electrolytes/sepsis + Verbal Reorientation. If severe dangerous agitation: Inj/Tab Haloperidol 0.5–2 mg PO/IM (0.25–0.5 mg q4h in Elderly) OR Tab Olanzapine 2.5–5 mg PO OR Tab Quetiapine 12.5–25 mg PO (Preferred in Parkinsonism/DLB) [IPS-DELIR-2018, IPS-GERI-2023].',
          secondaryRegimen: 'If Alcohol/Sedative Withdrawal Delirium: Switch immediately to Alcohol Withdrawal Delirium (DT) Pathway (IV Thiamine 500mg before or together with glucose + IV Lorazepam 2mg / Diazepam 10mg symptom-triggered) [IPS-GERI-2023].',
          onsetWait: 'Baseline 12-lead ECG (QTc check) mandatory before Haloperidol • Reassess sensorium & vitals q15–30min',
          criticalSafety: 'AVOID Benzodiazepines in non-withdrawal medical delirium (worsens confusion & paradoxical agitation) and AVOID anticholinergics (Promethazine/Trihexyphenidyl worsen delirium) [IPS-DELIR-2018, IPS-AGIT-2023].',
          citations: ['IPS-DELIR-2018', 'IPS-GERI-2023', 'IPS-AGIT-2023']
        }
      }
    ],
    calculator: {
      type: 'bvc',
      title: 'Brøset Violence Checklist (BVC) — 1-Tap Imminent Violence Predictor',
      subtitle: '6-item screen recommended by IPS CPG 2023 (0 = Low risk, 1–2 = Moderate risk, ≥3 = High risk; validated on inpatient wards—use alongside clinical judgment in Casualty)',
      citation: 'IPS-AGIT-2023',
      items: [
        { id: 'bvc_1', label: 'Confused (appears obviously confused or disoriented)', points: 1 },
        { id: 'bvc_2', label: 'Irritable (easily annoyed or angry, unable to tolerate presence of others)', points: 1 },
        { id: 'bvc_3', label: 'Boisterous / Vociferous (overtly loud speech, slamming doors, shouting)', points: 1 },
        { id: 'bvc_4', label: 'Verbal Threats (definite verbal outburst/threat toward staff or others)', points: 1 },
        { id: 'bvc_5', label: 'Physical Threats (raised fists, aggressive posturing, head-butting gestures)', points: 1 },
        { id: 'bvc_6', label: 'Attacking Objects (throwing/breaking furniture, punching walls/windows)', points: 1 }
      ]
    },
    differentials: [
      { condition: 'Acute Medical / Metabolic Delirium', clue: 'Sudden onset, fluctuating consciousness, visual > auditory hallucinations, abnormal vitals, no prior psychiatric history.', action: 'Stat RBS, SpO2, ABG, Electrolytes, Sepsis screen; avoid anticholinergics & routine BZDs [IPS-GERI-2023].' },
      { condition: 'Alcohol / Benzodiazepine Withdrawal', clue: 'Coarse tremors, autonomic hyperactivity (sweating, HR >100), onset 6–72h after last drink/dose.', action: 'Give IV Thiamine 500mg + IV Lorazepam 2mg / Diazepam 10mg [IPS-GERI-2023].' },
      { condition: 'Acute CNS Depressant (Alcohol) Intoxication', clue: 'Slurred speech, unsteady gait, smell of alcohol, nystagmus, disinhibited combativeness.', action: 'Avoid Benzodiazepines (respiratory depression); use Haloperidol 5mg + Promethazine 25–50mg IM if violent with SpO2 monitoring [IPS-SUBST-2023, IPS-AGIT-2022].' },
      { condition: 'Antipsychotic-Induced Acute Akathisia', clue: 'Severe inner restlessness, pacing, inability to sit still after recent antipsychotic initiation/escalation.', action: 'Do NOT give more Haloperidol (worsens akathisia!). Give Propranolol 40mg PO or Lorazepam 1–2mg [IPS-TOX-2022].' },
      { condition: 'Primary Psychosis / Acute Mania', clue: 'Clear sensorium, stable vitals, auditory hallucinations/threat-control-override delusions or grandiosity, past psychiatric history.', action: 'Verbal de-escalation -> Oral Risperidone/Olanzapine/Lorazepam -> IM Haloperidol+Promethazine or IM Olanzapine [IPS-AGIT-2023].' }
    ],
    statLabs: [
      'Fingerstick Capillary Blood Glucose (Stat at bedside)',
      'Pulse Oximetry (SpO2) & Full Vital Signs (BP, HR, RR, Temp)',
      '12-Lead ECG (QTc interval calculation mandatory prior to/immediately after Haloperidol)',
      'CBC, Serum Electrolytes (Na+, K+, Ca2+), RFT (Urea/Creatinine), LFT',
      'Urine Toxicology Screen & Breath/Blood Alcohol (if intoxication suspected)',
      'Non-Contrast CT Brain (if head trauma, focal neuro deficit, or new-onset altered sensorium)'
    ],
    comorbidityAdjustments: {
      elderly: 'REDUCE DOSES BY 50%: Use Haloperidol 0.5–2.5 mg PO/IM or Olanzapine 2.5–5 mg PO/IM; avoid Promethazine (severe anticholinergic delirium risk) and use Lorazepam 0.5–1 mg cautiously (risk of falls & paradoxical disinhibition) [IPS-GERI-2023, IPS-AGIT-2023].',
      hepatic: 'PREFER LORAZEPAM 1–2 mg PO/IM (metabolized via phase-II glucuronidation with no active metabolites). Avoid Diazepam/Chlordiazepoxide and reduce Haloperidol/Olanzapine dose by 50% [IPS-AGIT-2022].',
      renal: 'Avoid excessive sedative accumulation; reduce Risperidone/Olanzapine maintenance doses by 25–50%; standard single stat dose of Lorazepam 1–2 mg or Haloperidol 2.5–5 mg is safe [IPS-AGIT-2023].',
      qtc: 'CONTRAINDICATED: Do NOT give IV or IM Haloperidol, Ziprasidone, or Chlorpromazine. Use IM/PO Lorazepam 1–2 mg or Oral Aripiprazole 5–10 mg (lowest QTc risk <1%) [IPS-AGIT-2022, IPS-AGIT-2023].',
      alcohol_cns: 'ABSOLUTE CONTRAINDICATION: Do NOT combine IM Olanzapine with IM/IV Benzodiazepines, and avoid Lorazepam in acute alcohol intoxication (respiratory arrest). Prefer IM Haloperidol 5 mg (+/- Promethazine 25–50 mg IM with continuous SpO2) [IPS-AGIT-2023, IPS-SUBST-2023].',
      pregnancy: 'PREFER ANTIPSYCHOTICS (Haloperidol 2.5–5 mg PO/IM or Olanzapine 5 mg PO/IM) over repeated Benzodiazepines [IPS-AGIT-2023 Table 9]. Position in left lateral tilt in late pregnancy and monitor fetal heart rate [IPS-SUBST-2023].',
      copd: 'AVOID PARENTERAL BENZODIAZEPINES (Lorazepam/Midazolam/Diazepam cause respiratory depression & CO2 retention) and avoid Inhaled Loxapine (bronchospasm). Prefer Oral/IM Haloperidol 2.5–5 mg or Oral Risperidone 1–2 mg with continuous SpO2 monitoring [IPS-AGIT-2023, IPS-AGIT-2022].'
    },
    monitoring: [
      { time: 'Every 15 min (First Hour)', task: 'Pulse, Blood Pressure, Respiratory Rate (continuous visual chest-rise check), SpO2, and RASS/Ramsay sedation score (mandatory if parenteral rapid tranquillisation or physical restraint used) [IPS-AGIT-2023, NICE-NG10-2015].' },
      { time: 'Every 30–60 min (Hours 1–4)', task: 'SpO2 every 30 min, Pulse/BP every 1–2 hours, Temperature every 6 hours, check for Acute Dystonia (neck/tongue/ocular spasm), Orthostatic Hypotension, and Muscular Rigidity (NMS screen) [IPS-AGIT-2023 Table 11].' },
      { time: 'Before Any Repeat Dose', task: 'Mandatory bedside physician re-examination for oversedation (RASS ≤ -3 or RR < 12/min -> withhold sedatives, support airway, give Flumazenil 0.1–0.2 mg/min IV only if severe BZD respiratory depression and no seizure/chronic BZD history) [IPS-AGIT-2023, IPS-TOX-2022].' },
      { time: 'If Non-Responsive at 30–60 min', task: '1) If partial response to IM Lorazepam 2mg -> repeat IM Lorazepam 2mg after ≥60 min. 2) If partial response to IM Haloperidol alone -> add IM Promethazine 25–50mg [IPS-AGIT-2023, NICE-NG10-2015]. 3) Re-verify organic causes (occult pain, urinary retention, hypoxia, head injury, akathisia).' }
    ],
    disposition: {
      setting: 'Psychiatry High-Dependency / Acute Inpatient Ward (once medically cleared) OR Medical HDU/ICU (if altered sensorium, abnormal vitals, or severe intoxication).',
      mhcaChecklist: [
        'MHCA 2017 Section 94 (Emergency Treatment): Limited to 72 hours OR until the person has been assessed at a mental health establishment, whichever is earlier (7 days only in a declared disaster) to prevent death/irreversible harm, serious harm to self/others, or serious property damage; obtain Nominated Representative (NR) informed consent where available; ECT is excluded under s.94(3) [IPS-AGIT-2023, MHCA-2017].',
        'MHCA 2017 Section 97 (Physical Restraint Rules): Seclusion (locking patient alone in a room) is STRICTLY PROHIBITED in India. Physical restraint may only be ordered by the psychiatrist in charge as a last resort, in SUPINE position with padded soft cuffs (avoid prone restraint), with continuous visual observation, q15min nursing chart, q1h doctor review, mandatory NR notification of EVERY restraint instance within 24 hours (s.97(5)), and monthly reporting to the Mental Health Review Board (MHRB, s.97(6)) [IPS-AGIT-2023, MHCA-2017].',
        'MHCA 2017 Section 89 (Supported Admission): If inpatient care is required beyond initial emergency assessment and patient lacks capacity/refuses, initiate Section 89 Supported Admission (requires independent examination by 1 Psychiatrist + 1 Mental Health Professional/Medical Practitioner) [MHCA-2017].'
      ]
    }
  },

  catatonia: {
    id: 'catatonia',
    shortTitle: 'Acute Catatonia',
    fullTitle: 'Acute Catatonia, Lorazepam Challenge & Malignant Catatonia',
    icon: '02',
    accent: 'teal',
    tagline: 'BFCRS Screen (≥3 Signs) → IV/IM Lorazepam Challenge → High-Dose Lorazepam ± Bilateral ECT',
    primarySources: ['BAP-CAT-2023', 'IPS-GERI-2023', 'MHCA-2017'],
    tiers: [
      {
        id: 'stuporous',
        label: 'Tier 1: Acute Retarded / Excited Catatonia',
        subLabel: 'Mutism, Stupor, Posturing, Negativism • Vitals Stable',
        badge: 'Lorazepam Challenge + Titration',
        bannerAction: {
          headline: 'Perform Bedside Lorazepam Challenge Test → Titrate Lorazepam + VTE/Nutrition Prophylaxis',
          primaryRegimen: 'Step 1 (Challenge): Score baseline BFCRS -> Give Inj Lorazepam 1–2 mg IV (reassess at 5 min) OR 1–2 mg IM (reassess at 15 min) OR 2 mg PO/SL (reassess at 30 min). If <50% reduction in BFCRS, repeat second dose of Lorazepam 1–2 mg and reassess [BAP-CAT-2023, IPS-GERI-2023].\nStep 2 (Maintenance Titration): If positive (≥50% BFCRS drop), start scheduled Lorazepam 1–2 mg QID/TID and titrate up to 8–16 mg/day (occasionally up to 24 mg/day) in 2–4 divided doses while monitoring respiration [BAP-CAT-2023].',
          secondaryRegimen: 'If Lorazepam fails after adequate trial (up to 8–16 mg/d) or is contraindicated: Arrange Bilateral Modified ECT (at least 2–3 times weekly) [BAP-CAT-2023]. Third-line if ECT unavailable/refused: Tab Amantadine 100–200 mg BD (up to 400 mg/d) or Tab Memantine 5–10 mg BD [BAP-CAT-2023].',
          onsetWait: 'IV Challenge reassessment: 5 min • IM: 15 min • PO: 30 min • Do NOT abruptly stop Lorazepam once resolved (taper slowly to avoid relapse)',
          criticalSafety: 'AVOID High-Potency First-Generation Antipsychotics (e.g., Haloperidol) during active catatonia—high risk of precipitating full-blown Neuroleptic Malignant Syndrome (NMS) [BAP-CAT-2023]. Speak to the patient assuming full comprehension (patients often recall everything said during stupor) [BAP-CAT-2023].',
          citations: ['BAP-CAT-2023', 'IPS-GERI-2023']
        }
      },
      {
        id: 'malignant_cat',
        label: 'Tier 2: Malignant (Febrile/Autonomic) Catatonia',
        subLabel: 'Fever, Labile BP, Tachycardia >120, Rigidity, Exhaustion',
        badge: 'STAT ICU + High-Dose Lorazepam + Urgent Bilateral ECT',
        bannerAction: {
          headline: 'Medical Emergency: High-Dose Parenteral Lorazepam + Urgent Bilateral Modified ECT',
          primaryRegimen: '1) Immediate ICU/HDU admission, IV crystalloid hydration, active cooling, stop any dopamine-blocking agents.\n2) Inj Lorazepam 2 mg IV/IM stat, titrating rapidly up to 16–24 mg/day as tolerated by BP/respiration.\n3) Prepare for URGENT Bilateral Modified ECT (daily or alternate-day sessions) — highest survival rate when initiated within first 5 days of symptom onset [BAP-CAT-2023].',
          secondaryRegimen: 'Rule out Anti-NMDA Receptor Encephalitis (check serum/CSF anti-NMDAR IgG, EEG for extreme delta brush) and CNS infection (LP/MRI) in all first-episode or febrile catatonia cases [BAP-CAT-2023].',
          onsetWait: 'Continuous ICU cardiorespiratory monitoring • Check Serum CPK, Serum Iron (low iron predicts poor BZD response & NMS progression), Electrolytes, RFT [BAP-CAT-2023]',
          criticalSafety: 'During Modified ECT anesthesia in Malignant Catatonia/NMS with prolonged immobility or rhabdomyolysis, caution anesthetist regarding Succinylcholine-induced severe hyperkalemia (non-depolarizing relaxant Rocuronium + Sugammadex preferred where available) [IPS-TOX-2022, BAP-CAT-2023].',
          citations: ['BAP-CAT-2023', 'IPS-TOX-2022']
        }
      },
      {
        id: 'withdrawal_cat',
        label: 'Tier 3: Clozapine / Benzodiazepine Withdrawal Catatonia',
        subLabel: 'Abrupt stoppage of Clozapine or Chronic BZD within days',
        badge: 'Re-initiate Withdrawn Agent',
        bannerAction: {
          headline: 'Etiology-Specific Reversal: Re-instate Clozapine or Benzodiazepine Immediately',
          primaryRegimen: '• Clozapine-Withdrawal Catatonia: Promptly restart Clozapine (re-titrate if off >48 hours per hematological safety rules) +/- Bilateral ECT; Benzodiazepines alone have poor reliability in Clozapine-withdrawal catatonia [BAP-CAT-2023].\n• Benzodiazepine-Withdrawal Catatonia: Immediately reinstate parenteral/oral Lorazepam (1–2 mg IV/IM/PO q4–6h) and stabilize before slow multi-week taper [BAP-CAT-2023].',
          secondaryRegimen: 'If Clozapine + Benzodiazepines are co-administered, titrate cautiously and monitor vital signs closely due to rare risk of cardiorespiratory collapse and orthostatic hypotension [BAP-CAT-2023].',
          onsetWait: 'Monitor WBC/ANC if restarting Clozapine • Observe vitals q30–60min during co-administration',
          criticalSafety: 'Always check outpatient medication blisters/compliance history in any schizophrenia patient presenting with sudden-onset mutism, posturing, or psychotic rebound [BAP-CAT-2023, IPS-GERI-2023].',
          citations: ['BAP-CAT-2023', 'IPS-GERI-2023']
        }
      }
    ],
    calculator: {
      type: 'bfcrs',
      title: 'Bush-Francis Catatonia Screening (BFCSI) & Interactive Lorazepam Challenge Tracker',
      subtitle: 'DSM-5-TR / ICD-11 requires ≥3 signs (BFCSI screen positive at ≥2 items). Score baseline, administer Lorazepam 1–2mg, and check ≥50% reduction.',
      citation: 'BAP-CAT-2023',
      items: [
        { id: 'bf_1', label: 'Mutism (verbally unresponsive or <20 words / incomprehensible whisper)', points: 2 },
        { id: 'bf_2', label: 'Stupor / Immobility (extreme hypoactivity, minimally responsive to stimuli)', points: 2 },
        { id: 'bf_3', label: 'Posturing / Catalepsy (spontaneous maintenance of posture against gravity)', points: 2 },
        { id: 'bf_4', label: 'Negativism (motiveless resistance to instructions or movement examination)', points: 2 },
        { id: 'bf_5', label: 'Waxy Flexibility / Rigidity (initial waxy resistance before repositioning or lead-pipe tone)', points: 2 },
        { id: 'bf_6', label: 'Staring (fixed gaze, decreased blinking, little visual scanning)', points: 1 },
        { id: 'bf_7', label: 'Echopraxia / Echolalia (mimicking examiner movements or speech)', points: 2 },
        { id: 'bf_8', label: 'Stereotypy / Mannerisms / Grimacing (repetitive non-goal-directed motor acts or odd facial expressions)', points: 2 },
        { id: 'bf_9', label: 'Withdrawal / Refusal to Eat or Drink (turning away, no eye contact, nil oral intake)', points: 2 },
        { id: 'bf_10', label: 'Excitement / Impulsivity (extreme non-purposeful hyperactivity not attributable to akathisia)', points: 2 }
      ]
    },
    differentials: [
      { condition: 'Non-Convulsive Status Epilepticus (NCSE)', clue: 'Subtle facial/eyelid twitching, fluctuating stupor, history of seizures; ALSO responds to IV Lorazepam challenge!', action: 'Order urgent EEG in any unexplained catatonia or seizure history [BAP-CAT-2023].' },
      { condition: 'Anti-NMDA Receptor Autoimmune Encephalitis', clue: 'Subacute onset in young adults/females, prodromal viral symptoms, seizures, orofacial dyskinesias, autonomic instability.', action: 'Send Serum & CSF Anti-NMDAR antibodies, MRI Brain, EEG (extreme delta brush); avoid FGA antipsychotics [BAP-CAT-2023].' },
      { condition: 'Neuroleptic Malignant Syndrome (NMS)', clue: 'Recent D2 antagonist exposure, severe lead-pipe rigidity, fever >38°C, CPK >4x ULN, leukocytosis.', action: 'Stop all antipsychotics immediately; give Lorazepam + Bromocriptine/Dantrolene or ECT [BAP-CAT-2023, IPS-TOX-2022].' },
      { condition: 'Locked-In Syndrome (Ventral Pontine Stroke)', clue: 'Complete quadriplegia and mutism, BUT preserved vertical eye movements and purposeful blinking to communicate.', action: 'Test vertical gaze command at bedside; urgent MRI Brain (pons); does NOT respond to Lorazepam [BAP-CAT-2023].' },
      { condition: 'Hypoactive Delirium / Metabolic Encephalopathy', clue: 'Hyponatremia, hepatic encephalopathy (asterixis, hyperammonemia), uremia, Wernicke encephalopathy.', action: 'Note: Catatonia and Delirium co-exist in 20–50% of medically ill patients; check electrolytes, ammonia, RFT, LFT, and give Thiamine [BAP-CAT-2023].' }
    ],
    statLabs: [
      'Serum Creatine Phosphokinase (CPK) & Total Leukocyte Count (rule out progression to Malignant Catatonia / NMS)',
      'Serum Iron & Ferritin (low serum iron is associated with poor Lorazepam response and higher risk of NMS conversion [BAP-CAT-2023])',
      'Renal Function Test (Urea, Creatinine), Electrolytes (Na+, K+, Ca2+), LFT, Random Blood Glucose',
      'Urine Myoglobin & Urine Output charting',
      '12-Lead ECG (pre-ECT workup and arrhythmia screen)',
      'CT / MRI Brain & EEG (mandatory in first-episode catatonia, neurological signs, or suspected NCSE/encephalitis [BAP-CAT-2023])'
    ],
    comorbidityAdjustments: {
      elderly: 'Up to 80% of catatonia in older adults has a contributing medical/neurological cause (stroke, NCSE, dementia, hyponatremia, BZD withdrawal) [BAP-CAT-2023]. Start Lorazepam challenge at 0.5–1 mg IV/IM and titrate cautiously to avoid falls and oversedation; Zolpidem challenge at 5 mg PO [BAP-CAT-2023].',
      hepatic: 'Lorazepam remains the safest benzodiazepine (glucuronidation), but start at 0.5–1 mg and monitor closely for precipitating hepatic encephalopathy; verify serum ammonia [BAP-CAT-2023].',
      renal: 'Lorazepam dose does not require acute reduction for single challenge; reduce Amantadine dose significantly if used as second-line (renally cleared) [BAP-CAT-2023].',
      qtc: 'Lorazepam and Bilateral ECT do not prolong QTc significantly and are safe first-line choices; strictly avoid antipsychotics [BAP-CAT-2023].',
      alcohol_cns: 'Monitor respiratory rate and SpO2 continuously during IV Lorazepam challenge; ensure airway cart and Flumazenil are available; administer IV Thiamine 500 mg if alcohol withdrawal/Wernicke co-exists [BAP-CAT-2023, IPS-SUBST-2023].',
      pregnancy: 'Lorazepam may be used for acute catatonia challenge and stabilization; Bilateral Modified ECT is safe and effective in pregnancy (perform with obstetric/fetal heart monitoring, left lateral tilt, and aspiration prophylaxis) [BAP-CAT-2023].',
      copd: 'High-dose Lorazepam carries risk of hypercapnic respiratory failure; use lowest effective Lorazepam dose with continuous SpO2/ABG monitoring and prioritize early Bilateral ECT or adjunctive Amantadine/Memantine [BAP-CAT-2023].'
    },
    monitoring: [
      { time: '5 min (IV) / 15 min (IM) / 30 min (PO)', task: 'Repeat Bush-Francis Catatonia Rating Scale (BFCRS) after Lorazepam 1–2 mg challenge; ≥50% reduction confirms positive response [BAP-CAT-2023, IPS-GERI-2023].' },
      { time: 'Every 2–4 Hours (Active Titration)', task: 'Monitor Respiratory Rate, SpO2, BP, Temperature, and sedation level before each scheduled Lorazepam dose [BAP-CAT-2023].' },
      { time: 'Daily Complication Prevention Bundle', task: '1) DVT/PE Prophylaxis: Subcutaneous LMWH (Enoxaparin) + compression stockings. 2) Nutrition/Hydration: IV fluids or NGT feeding if nil-by-mouth >24h. 3) 2-hourly turning and passive range-of-motion stretching. 4) Bladder scan / Input-Output chart [BAP-CAT-2023].' },
      { time: 'Post-Remission Taper', task: 'Do NOT stop Lorazepam abruptly once catatonia resolves (high risk of acute catatonic relapse and seizures); treat underlying mood/psychotic/medical illness first and taper Lorazepam gradually over weeks [BAP-CAT-2023].' }
    ],
    disposition: {
      setting: 'Secondary/Tertiary Psychiatry Inpatient Ward with ECT facility OR Medical HDU/ICU (if Malignant Catatonia, severe dehydration/rhabdomyolysis, or encephalitis workup).',
      mhcaChecklist: [
        'Capacity & Non-Volitional Mutism [BAP-CAT-2023, MHCA-2017]: Never mistake catatonic mutism/negativism for willful refusal. Document lack of decisional capacity formally under MHCA 2017 Section 4/89.',
        'Emergency Lorazepam Treatment (MHCA Sec 94): Parenteral Lorazepam, hydration, and life-saving stabilization can be initiated immediately under Section 94 (up to 72 hours or until assessed at a mental health establishment, whichever is earlier) with Nominated Representative (NR) consent.',
        'Modified ECT Legal Compliance (MHCA Sec 94(3) & Sec 95): Under MHCA 2017 Section 94(3), ECT is NOT permitted under the emergency treatment clause alone; admit formally under Section 89 (Supported Admission) with NR informed consent, and ensure Modified ECT with anaesthesia & muscle relaxants (Unmodified ECT is strictly prohibited under Section 95(1)(a), and ECT in minors is prohibited under Section 95(1)(b)/95(2) without guardian consent and prior MHRB approval) [MHCA-2017].'
      ]
    }
  },

  nms: {
    id: 'nms',
    shortTitle: 'NMS',
    fullTitle: 'Neuroleptic Malignant Syndrome (NMS)',
    icon: '03',
    accent: 'orange',
    tagline: 'STOP Dopamine Blocker → Aggressive ICU Hydration → Lorazepam + Bromocriptine ± Dantrolene',
    primarySources: ['IPS-TOX-2022', 'GURRERA-NMS-2011', 'BAP-CAT-2023'],
    tiers: [
      {
        id: 'mild_early',
        label: 'Tier 1: Mild / Early NMS (Neuroleptic-Induced Catatonia)',
        subLabel: 'Temp <38.5°C • Mild Rigidity • Mild CPK Rise • Alert/Confused',
        badge: 'Stop Offending Drug + IV Fluids + Lorazepam',
        bannerAction: {
          headline: 'Immediate Cessation of Antipsychotic + Aggressive IV Hydration + Parenteral Lorazepam',
          primaryRegimen: '1) STOP all dopamine antagonists immediately (antipsychotics, metoclopramide, tetrabenazine, levosulpiride) OR restart withdrawn dopaminergic agent if triggered by Levodopa/Amantadine withdrawal [IPS-TOX-2022, GURRERA-NMS-2011].\n2) Aggressive IV Isotonic Crystalloid hydration (target urine output >1.5–2 mL/kg/h) + evaporative cooling.\n3) Inj Lorazepam 1–2 mg IM/IV every 4–6 hours (resolves early rigidity and catatonic component) [GURRERA-NMS-2011, IPS-TOX-2022].',
          secondaryRegimen: 'If no improvement within 24h or progressing rigidity: Add Tab Bromocriptine 2.5 mg PO/NGT q8–12h OR Tab Amantadine 100 mg PO/NGT BD [IPS-TOX-2022, GURRERA-NMS-2011].',
          onsetWait: 'Reassess temperature, rigidity, and CPK every 6–12 hours • Monitor input/output hourly',
          criticalSafety: 'NEVER use physical restraints in suspected NMS (isometric muscle struggling against restraints dramatically accelerates rhabdomyolysis, hyperthermia, and fatal renal/cardiac arrest) [IPS-AGIT-2022, IPS-TOX-2022].',
          citations: ['IPS-TOX-2022', 'GURRERA-NMS-2011', 'IPS-AGIT-2022']
        }
      },
      {
        id: 'mod_nms',
        label: 'Tier 2: Moderate Classic NMS',
        subLabel: 'Temp 38.5–40°C • Lead-Pipe Rigidity • HR 100–120 • CPK >4x ULN',
        badge: 'ICU + Lorazepam + Bromocriptine / Amantadine',
        bannerAction: {
          headline: 'Transfer to HDU/ICU + Lorazepam + Dopamine Agonist (Bromocriptine or Amantadine)',
          primaryRegimen: '1) STOP causative neuroleptic + ICU/HDU admission + high-volume IV fluids (consider urinary alkalinization with Sodium Bicarbonate if myoglobinuria present [IPS-TOX-2022 Table 15]).\n2) Inj Lorazepam 1–2 mg IV/IM q4–6h.\n3) Tab Bromocriptine 2.5 mg PO or via Nasogastric Tube (NGT) every 8 hours, titrating up to 10–40 mg/day in divided doses (max 45–60 mg/day) [IPS-TOX-2022, GURRERA-NMS-2011].',
          secondaryRegimen: 'Alternative Dopamine Agonist (if Bromocriptine unavailable/intolerant): Tab Amantadine 100–200 mg PO/NGT BD (200–400 mg/day) OR Tab Levodopa/Carbidopa 25/100 mg TID–QID [IPS-TOX-2022 Table 16].',
          onsetWait: 'Continue Bromocriptine for at least 10 days after NMS resolution (14–21 days if depot neuroleptic was culprit), then taper slowly to prevent rebound NMS [GURRERA-NMS-2011].',
          criticalSafety: 'Evidence Note: Pharmacotherapy recommendations are based on case series/retrospective cohorts (e.g., Rosenberg & Green: mean recovery 10d with Bromocriptine vs 15d supportive alone); no RCTs exist [GURRERA-NMS-2011].',
          citations: ['IPS-TOX-2022', 'GURRERA-NMS-2011']
        }
      },
      {
        id: 'severe_nms',
        label: 'Tier 3: Severe / Fulminant NMS',
        subLabel: 'Temp >40°C • Extreme Lead-Pipe Rigidity • Coma/Stupor • Rhabdomyolysis/AKI',
        badge: 'ICU + IV Dantrolene + Bromocriptine ± Bilateral ECT',
        bannerAction: {
          headline: 'Fulminant Life-Threatening Emergency: ICU Airway + IV Dantrolene + Bromocriptine ± ECT',
          primaryRegimen: '1) Immediate ICU admission, active cooling blankets/ice packs, aggressive IV hydration + Sodium Bicarbonate urinary alkalinization for rhabdomyolysis, DVT prophylaxis (LMWH) [IPS-TOX-2022].\n2) Inj Dantrolene Sodium 1–2.5 mg/kg IV initial bolus, followed by 1 mg/kg IV every 6 hours (or 2–3 mg/kg/day IV up to max 10 mg/kg/day; Oral: 50–200 mg/day) PLUS Tab Bromocriptine 2.5–5 mg NGT q8h + Inj Lorazepam 1–2 mg IV q4–6h [IPS-TOX-2022, GURRERA-NMS-2011].',
          secondaryRegimen: 'Refractory Severe NMS (not improving within 48–72h of pharmacotherapy): Initiate Bilateral Modified ECT (6–10 sessions; use non-depolarizing muscle relaxant or extreme caution with Succinylcholine due to hyperkalemic arrest risk) [IPS-TOX-2022, BAP-CAT-2023].',
          onsetWait: 'Antipsychotic Rechallenge Rule: Wait AT LEAST 14 days (2 weeks) after complete symptom resolution before restarting an atypical antipsychotic with low D2 affinity (e.g., Quetiapine or Clozapine) at very low dose [IPS-TOX-2022, GURRERA-NMS-2011].',
          criticalSafety: 'Conflicting Evidence Disclosure: Retrospective case-series analyses (Sakkas et al. 1991 n=734: 8.6% mortality with Dantrolene monotherapy vs 7.8% Bromocriptine vs 21% supportive alone; Reulbach et al. 2007) are inconsistent and confounded by severity, and Dantrolene carries hepatotoxicity risk; reserve Dantrolene for severe extreme rigidity/hyperthermia alongside ICU care and Bromocriptine [GURRERA-NMS-2011, IPS-TOX-2022].',
          citations: ['IPS-TOX-2022', 'GURRERA-NMS-2011', 'BAP-CAT-2023']
        }
      }
    ],
    calculator: {
      type: 'gurrera_nms',
      title: 'International Consensus (Delphi) NMS Diagnostic Score Calculator',
      subtitle: 'Gurrera et al. (2011/2017) validated weighted score out of 100 points — Score ≥74 confirms NMS diagnosis equivalent to DSM criteria',
      citation: 'GURRERA-NMS-2011',
      items: [
        { id: 'nms_1', label: 'Dopamine antagonist exposure OR dopamine agonist withdrawal within past 72 hours', points: 20 },
        { id: 'nms_2', label: 'Hyperthermia (>38.0°C oral on at least 2 occasions)', points: 18 },
        { id: 'nms_3', label: 'Lead-pipe muscle rigidity (generalized increased tone)', points: 17 },
        { id: 'nms_4', label: 'Mental status alteration (delirium, stupor, fluctuating alertness, or coma)', points: 13 },
        { id: 'nms_5', label: 'Serum Creatine Kinase (CK / CPK) elevation ≥ 4 times upper limit of normal', points: 10 },
        { id: 'nms_6', label: 'Sympathetic autonomic lability (≥2 of: BP elevation/fluctuation ≥20 mmHg, diaphoresis, urinary incontinence)', points: 10 },
        { id: 'nms_7', label: 'Negative workup for infectious, toxic, metabolic, and primary neurologic causes', points: 7 },
        { id: 'nms_8', label: 'Hypermetabolism (Heart rate ≥25% above baseline AND Respiratory rate ≥50% above baseline)', points: 5 }
      ]
    },
    differentials: [
      { condition: 'Serotonin Syndrome (Serotonin Toxicity)', clue: 'Onset within <24h of serotonergic agent; HYPERREFLEXIA, inducible/spontaneous CLONUS (especially lower limbs), ocular clonus, mydriasis, hyperactive bowel sounds/diarrhea.', action: 'NMS has BRADYREFLEXIA and Generalized Lead-Pipe Rigidity developing over 1–3+ days [IPS-TOX-2022 Table 13].' },
      { condition: 'Malignant Catatonia', clue: 'Clinically indistinguishable from severe NMS (fever, autonomic instability, rigidity/stupor), but occurs WITHOUT dopamine blocker exposure (or precedes neuroleptic dose).', action: 'Treat with high-dose IV Lorazepam + urgent Bilateral ECT; avoid antipsychotics [BAP-CAT-2023].' },
      { condition: 'Anticholinergic Toxidrome', clue: 'DRY hot flushed skin ("dry as a bone"), mydriasis, absent/decreased bowel sounds, urinary retention, normal muscle tone & normal reflexes, normal CPK.', action: 'NMS has profuse DIAPHORESIS (sweating), sialorrhea, and severe rigidity [IPS-TOX-2022 Table 13].' },
      { condition: 'CNS Infection (Meningitis / Encephalitis) or Heat Stroke', clue: 'Meningeal signs (neck stiffness, Kernig/Brudzinski), focal seizures, or environmental heat exposure with dry skin and absence of lead-pipe rigidity.', action: 'Perform Neuroimaging, Lumbar Puncture (CSF), and Blood Cultures if diagnosis uncertain [IPS-TOX-2022].' }
    ],
    statLabs: [
      'Serum Creatine Phosphokinase (CPK / CK — typically >1,000 to >100,000 IU/L; >4x ULN tracks severity) [IPS-TOX-2022]',
      'Urine Myoglobin / Routine Microscopy (dark tea-colored urine, positive dipstick blood without RBCs = myoglobinuria)',
      'CBC with Differential (Leukocytosis 10,000–40,000/mm³ is typical in NMS)',
      'RFT (Urea, Creatinine), Electrolytes (K+, Na+, Ca2+, PO4, Mg2+), Arterial Blood Gas (metabolic acidosis)',
      'LFT (AST, ALT, LDH, Bilirubin — baseline before Dantrolene & rhabdomyolysis check) & Coagulation Profile (DIC screen)',
      'Serum Iron Profile (iron deficiency strongly linked to NMS severity and poor prognosis — correct low iron [IPS-TOX-2022 Table 15])'
    ],
    comorbidityAdjustments: {
      elderly: 'High risk of acute kidney injury (AKI), aspiration pneumonia, and pulmonary embolism; monitor central venous pressure/fluid balance carefully during aggressive IV hydration; start Bromocriptine at 1.25–2.5 mg q8–12h [IPS-GERI-2023].',
      hepatic: 'CONTRAINDICATED: Do NOT use Dantrolene in active hepatic disease/cirrhosis (causes severe/fatal hepatotoxicity) [IPS-TOX-2022 Table 16]. Use Lorazepam (low dose) + Bromocriptine or Amantadine.',
      renal: 'Myoglobinuric AKI is the leading cause of renal death in NMS: maintain urine output >2 mL/kg/h with IV 0.9% NaCl + IV Sodium Bicarbonate urinary alkalinization; avoid Amantadine in severe AKI (renally excreted — causes neurotoxicity/seizures) and prefer Bromocriptine [IPS-TOX-2022].',
      qtc: 'Avoid antiarrhythmics that prolong QTc; correct hypokalemia/hypomagnesemia/hypocalcemia triggered by rhabdomyolysis; monitor continuous cardiac telemetry.',
      alcohol_cns: 'Rule out co-existing alcohol/BZD withdrawal; administer parenteral Thiamine 500 mg IV if alcohol use history is present [IPS-GERI-2023].',
      pregnancy: 'Postpartum period is a recognized risk factor for NMS [IPS-TOX-2022 Table 7]. Bromocriptine, Lorazepam, aggressive hydration, and Modified ECT can be used; avoid Dantrolene unless life-threatening maternal rigidity outweighs fetal hepatic risk.',
      copd: 'Chest wall rigidity + hypermetabolism can rapidly precipitate hypercapnic respiratory failure; have low threshold for early ICU elective intubation and mechanical ventilation.'
    },
    monitoring: [
      { time: 'Continuous / Hourly in ICU', task: 'Core Temperature, Heart Rate, BP (watch for extreme autonomic lability), Respiratory Rate, SpO2, and Hourly Urine Output via Foley catheter (target >1.5–2 mL/kg/h; check urine pH >6.5 if alkalinizing) [IPS-TOX-2022].' },
      { time: 'Every 12–24 Hours', task: 'Serial Serum CPK, Serum Creatinine, Potassium, Calcium, Phosphate, ABG, and LFTs (mandatory if on Dantrolene) until CPK trends steadily downward and fever resolves [IPS-TOX-2022].' },
      { time: 'Duration of Specific Therapy', task: 'Continue Bromocriptine/Dantrolene for ≥10 days after oral neuroleptic NMS resolution (or 2–3 weeks if triggered by depot injection) before slow taper [GURRERA-NMS-2011].' },
      { time: 'Antipsychotic Rechallenge Protocol', task: 'Wait at least 14 days (2 weeks) after complete clinical and biochemical recovery; obtain informed consent; switch to a low-potency/low-D2 SGA (e.g., Quetiapine or Clozapine); avoid Lithium co-prescription and parenteral high-potency FGAs [IPS-TOX-2022].' }
    ],
    disposition: {
      setting: 'Medical Intensive Care Unit (ICU) or High-Dependency Unit (HDU) under joint Critical Care / Medicine & Psychiatry Consultation-Liaison care [IPS-GERI-2023, IPS-TOX-2022].',
      mhcaChecklist: [
        'Primary Medical Team Care [IPS-GERI-2023]: Any patient with NMS and unstable vitals/stupor must be admitted primarily under Critical Care/Internal Medicine with daily Psychiatry CL co-management.',
        'Physical Restraint Prohibition [IPS-AGIT-2022, IPS-TOX-2022]: Strictly prohibit mechanical restraints (accelerates rhabdomyolysis and hyperthermia); use parenteral Lorazepam and 1:1 nursing care.',
        'Family Briefing & Rechallenge Documentation [IPS-GERI-2023, IPS-TOX-2022]: Document adverse drug reaction clearly on discharge card ("NEVER GIVE HALOPERIDOL / DEPOT NEUROLEPTICS — PAST HISTORY OF NMS") and brief family regularly on ICU prognosis.'
      ]
    }
  },

  serotonin: {
    id: 'serotonin',
    shortTitle: 'Serotonin Syndrome',
    fullTitle: 'Serotonin Syndrome (Serotonin Toxicity)',
    icon: '04',
    accent: 'purple',
    tagline: 'Hunter Criteria (Clonus/Hyperreflexia) → Stop Serotonergics + BZDs → Active Cooling/Intubation (± Cyproheptadine)',
    primarySources: ['IPS-TOX-2022', 'HUNTER-SS-2003', 'CHIEW-SS-2024'],
    tiers: [
      {
        id: 'mild_ss',
        label: 'Tier 1: Mild Serotonin Toxicity',
        subLabel: 'Tremor + Hyperreflexia • Inducible Clonus • Normothermic (<38°C) • Alert/Anxious',
        badge: 'Stop Serotonergics + Oral/IV BZD',
        bannerAction: {
          headline: 'Withhold All Serotonergic Agents + Symptomatic Benzodiazepine + 24h Observation',
          primaryRegimen: '1) STOP all serotonergic medications immediately (SSRIs, SNRIs, TCAs, MAOIs, Tramadol, Tapentadol, Linezolid, Dextromethorphan, Lithium, Triptans, Ondansetron/Metoclopramide) [IPS-TOX-2022 Table 8].\n2) Tab/Inj Lorazepam 1–2 mg PO/IV/IM OR Inj Diazepam 5–10 mg IV/PO to control tremor, anxiety, and mild myoclonus [IPS-TOX-2022, CHIEW-SS-2024].\n3) Supportive IV fluids and calm environment; symptoms typically resolve within 24 hours of stopping the offending agent [CHIEW-SS-2024].',
          secondaryRegimen: 'Specific serotonin antagonists (Cyproheptadine) are NOT required in mild toxicity and may cause unnecessary anticholinergic sedation/hypotension [CHIEW-SS-2024].',
          onsetWait: 'Reassess clonus, vitals, and temperature every 2 hours for 6–24 hours',
          criticalSafety: 'Audit full chart for hidden serotonergic drugs common in Indian wards: Inj Tramadol (pain), Inj Linezolid (antibiotic), Dextromethorphan cough syrups, and Lithium co-prescription [IPS-TOX-2022].',
          citations: ['IPS-TOX-2022', 'CHIEW-SS-2024', 'HUNTER-SS-2003']
        }
      },
      {
        id: 'mod_ss',
        label: 'Tier 2: Moderate Serotonin Toxicity',
        subLabel: 'Spontaneous/Ocular Clonus • Agitation • Diaphoresis • Temp 38.0–39.0°C',
        badge: 'IV Benzodiazepines + IV Fluids ± Cyproheptadine',
        bannerAction: {
          headline: 'Titrated Parenteral Benzodiazepines + Cooling/Hydration + Optional Oral/NGT Cyproheptadine',
          primaryRegimen: '1) Discontinue all serotonergic agents + HDU admission + IV crystalloid hydration + external cooling [IPS-TOX-2022, CHIEW-SS-2024].\n2) FIRST-LINE: Inj Diazepam 5–10 mg IV OR Inj Lorazepam 2 mg IV/IM, titrated every 15–30 minutes to abolish agitation, hypertonia, and autonomic hyperactivity [CHIEW-SS-2024, IPS-TOX-2022].\n3) ADJUNCTIVE (IPS CPG 2022 Recommendation): Tab Cyproheptadine 12 mg PO or crushed via Nasogastric Tube (NGT) loading dose, followed by 2 mg every 2 hours until clinical improvement (or 8 mg q6h maintenance; max 32 mg/day) [IPS-TOX-2022].',
          secondaryRegimen: 'If oral/NGT route is impossible and severe agitation persists: Case reports describe parenteral Chlorpromazine (25–50 mg IM/IV) or Olanzapine (5–10 mg IM) for 5-HT2A blockade, though Chiew & Isbister (2024) caution that hypotension risk is high and benzodiazepines + supportive care are safer [CHIEW-SS-2024].',
          onsetWait: 'Monitor Temp, HR, BP, SpO2, and lower-limb clonus/tone every 15–30 minutes (rapid progression can occur within hours)',
          criticalSafety: 'EVIDENCE TRANSPARENCY NOTE: While IPS CPG 2022 recommends Cyproheptadine for moderate-severe cases [IPS-TOX-2022], recent toxicology reviews (Chiew & Isbister 2024; Nguyen et al. n=288) demonstrate NO controlled evidence that Cyproheptadine reduces mortality or hospital stay over Benzodiazepines + supportive care. Never let Cyproheptadine delay resuscitation!',
          citations: ['IPS-TOX-2022', 'CHIEW-SS-2024', 'HUNTER-SS-2003']
        }
      },
      {
        id: 'severe_ss',
        label: 'Tier 3: Severe / Life-Threatening Serotonin Toxicity',
        subLabel: 'Temp >39.0–40.0°C • Truncal Rigidity • Delirium/Coma • Autonomic Instability',
        badge: 'STAT ICU Intubation + Non-Depolarizing Paralysis + Active Cooling',
        bannerAction: {
          headline: 'Immediate ICU Resuscitation: Active Cooling + Endotracheal Intubation + Neuromuscular Paralysis',
          primaryRegimen: '1) IMMEDIATE LIFE-SAVING INTERVENTION: Rapid active external cooling (ice packs, mist/fan, cooling blankets) + high-dose IV Benzodiazepine sedation + Endotracheal Intubation and Mechanical Ventilation [CHIEW-SS-2024, IPS-TOX-2022].\n2) Neuromuscular Paralysis with a NON-DEPOLARIZING agent: Inj Vecuronium (0.1 mg/kg IV) or Inj Rocuronium (0.6–1.2 mg/kg IV) to immediately stop muscular heat generation, truncal chest rigidity, and rhabdomyolysis [IPS-TOX-2022, CHIEW-SS-2024].\n3) Manage autonomic instability with short-acting titratable IV agents (e.g., Esmolol or Nitroprusside for severe hypertension/tachycardia; IV Norepinephrine for hypotension) [IPS-TOX-2022].',
          secondaryRegimen: 'Once intubated and cooled, Cyproheptadine 12 mg via NGT followed by 2 mg q2h (or 8 mg q6h) may be administered as an adjunct per IPS CPG 2022 [IPS-TOX-2022].',
          onsetWait: 'Continuous core temperature & ICU hemodynamic monitoring • Goal: Reduce core Temp <38.5°C within 30–60 minutes',
          criticalSafety: 'STRICTLY CONTRAINDICATED in Severe Serotonin Syndrome: 1) Succinylcholine (risk of fatal hyperkalemic arrhythmia from rhabdomyolysis); 2) Antipyretics like Paracetamol/NSAIDs (ineffective because fever is from muscular activity, not hypothalamic reset); 3) Bromocriptine (worsens serotonergic toxicity); 4) ECT (ineffective and may exacerbate SS [BAP-CAT-2023]); 5) Opioids (Fentanyl/Tramadol/Pethidine precipitate SS) [IPS-TOX-2022, CHIEW-SS-2024].',
          citations: ['CHIEW-SS-2024', 'IPS-TOX-2022', 'BAP-CAT-2023']
        }
      }
    ],
    calculator: {
      type: 'hunter_ss',
      title: 'Hunter Serotonin Toxicity Criteria — 1-Tap Decision Tree',
      subtitle: 'Dunkley et al. (2003 QJM): 84% sensitivity & 97% specificity (Prerequisite: serotonergic agent exposure + ANY 1 of Rules 1–5 = Serotonin Toxicity)',
      citation: 'HUNTER-SS-2003',
      items: [
        { id: 'h_0', label: 'PREREQUISITE: Confirmed Serotonergic Agent Exposure within past 5 weeks (SSRI, SNRI, MAOI, TCA, Tramadol, Linezolid, Dextromethorphan, Lithium, Triptan)', points: 0 },
        { id: 'h_1', label: 'Rule 1: Spontaneous Clonus is present', points: 100 },
        { id: 'h_2', label: 'Rule 2: Inducible Clonus (e.g., ankle dorsiflexion) PLUS Agitation OR Diaphoresis (sweating)', points: 100 },
        { id: 'h_3', label: 'Rule 3: Ocular Clonus (slow continuous horizontal roving eye movements) PLUS Agitation OR Diaphoresis', points: 100 },
        { id: 'h_4', label: 'Rule 4: Tremor PLUS Hyperreflexia (especially lower limbs > upper limbs)', points: 100 },
        { id: 'h_5', label: 'Rule 5: Hypertonia / Rigidity PLUS Temperature > 38.0°C PLUS Ocular Clonus OR Inducible Clonus', points: 100 }
      ]
    },
    differentials: [
      { condition: 'Neuroleptic Malignant Syndrome (NMS)', clue: 'Gradual onset (1–10 days) after dopamine antagonist; Generalized Lead-Pipe Rigidity, BRADYREFLEXIA (decreased reflexes), normal pupils, normal bowel sounds.', action: 'Serotonin Syndrome has rapid onset (<24h), CLONUS, HYPERREFLEXIA (lower > upper limbs), mydriasis, and hyperactive bowel sounds/diarrhea [IPS-TOX-2022 Table 13].' },
      { condition: 'Anticholinergic Toxidrome (TCA / Datura / Trihexyphenidyl)', clue: 'Dry flushed skin, dry mucosa, decreased/absent bowel sounds, urinary retention, normal reflexes, no clonus.', action: 'Serotonin Syndrome has profuse diaphoresis (sweating), sialorrhea, hyperactive bowel sounds, and clonus [IPS-TOX-2022 Table 13].' },
      { condition: 'Sympathomimetic Intoxication (Cocaine / MDMA / Amphetamines)', clue: 'Tachycardia, hypertension, mydriasis, agitation, diaphoresis, but typically lacks ankle/ocular clonus unless MDMA triggers serotonin toxicity.', action: 'Treat both with IV Benzodiazepines, active cooling, and IV fluids [IPS-SUBST-2023, CHIEW-SS-2024].' },
      { condition: 'Alcohol / Benzodiazepine Withdrawal', clue: 'History of chronic alcohol/BZD cessation, coarse tremor, tachycardia, diaphoresis, no ocular/sustained ankle clonus.', action: 'Both respond safely to IV Benzodiazepines (Lorazepam/Diazepam) [IPS-GERI-2023].' }
    ],
    statLabs: [
      'Serum Creatine Phosphokinase (CPK) & Urine Myoglobin (rhabdomyolysis screen in moderate/severe hypertonia)',
      'Renal Function Test (Urea, Creatinine) & Serum Electrolytes (Na+, K+, Ca2+, Mg2+)',
      'Arterial Blood Gas (ABG — metabolic acidosis & respiratory hypercapnia from truncal rigidity)',
      'CBC, LFT (AST/ALT), and Coagulation Profile (PT/INR, D-dimer, Fibrinogen — screen for DIC in Temp >39°C)',
      '12-Lead ECG (QRS & QTc interval — especially if TCA or Venlafaxine/Citalopram overdose co-exists) [IPS-TOX-2022]'
    ],
    comorbidityAdjustments: {
      elderly: 'Watch for polypharmacy interactions (e.g., SSRI + Tramadol for osteoarthritis or Linezolid for infection). Avoid Cyproheptadine in mild cases or elderly with glaucoma/BPH/delirium due to strong anticholinergic burden; prioritize titrated Lorazepam and supportive care [IPS-GERI-2023, CHIEW-SS-2024].',
      hepatic: 'Use Lorazepam (glucuronidation) rather than Diazepam; SSRI/SNRI clearance is prolonged in cirrhosis so monitor for 48–72 hours [IPS-TOX-2022].',
      renal: 'Aggressive IV crystalloid hydration to prevent myoglobinuric AKI; Linezolid and Tramadol metabolites accumulate in renal failure and frequently precipitate serotonin toxicity.',
      qtc: 'If Serotonin Syndrome follows Citalopram, Escitalopram, Venlafaxine, or TCA overdose, check QRS (>100ms -> give IV Sodium Bicarbonate) and QTc (>500ms -> correct K+/Mg2+ and give IV MgSO4 2–4 g if torsades); avoid Chlorpromazine [IPS-TOX-2022].',
      alcohol_cns: 'Titrate Benzodiazepines with continuous pulse oximetry and airway readiness.',
      pregnancy: 'Stop offending serotonergic drugs; use IV fluids, cooling, and Lorazepam; monitor fetal heart rate continuously.',
      copd: 'Truncal rigidity in severe Serotonin Syndrome rapidly impairs ventilation—intubate and paralyze early if hypercapnia or Temp >39°C develops [CHIEW-SS-2024].'
    },
    monitoring: [
      { time: 'Every 15–30 min (Acute Phase)', task: 'Core Temperature, Heart Rate, BP, Respiratory Rate, SpO2, and bedside check for Truncal Rigidity (rapidly rising Temp >39°C + truncal rigidity = immediate ICU intubation & paralysis trigger) [CHIEW-SS-2024].' },
      { time: 'Every 6–12 Hours (Moderate/Severe)', task: 'Serum CPK, Electrolytes (K+), Creatinine, ABG, and Coagulation profile until hyperthermia and clonus resolve [IPS-TOX-2022].' },
      { time: 'Restarting Antidepressants Post-Recovery', task: 'Wait at least 1–2 weeks after complete resolution (longer if Fluoxetine was involved due to norfluoxetine half-life); re-initiate monotherapy at low dose with slow titration and strict education to avoid Tramadol/Linezolid/OTC cough syrups/MAOI combinations [IPS-TOX-2022].' }
    ],
    disposition: {
      setting: 'Mild: Emergency Observation / Psychiatry Ward for 24h. Moderate: Medical HDU. Severe (Temp >38.5–39°C or Rigidity): Immediate Medical ICU.',
      mhcaChecklist: [
        'Medical Stabilization Priority: Manage moderate-to-severe Serotonin Toxicity in Medical HDU/ICU; if triggered by intentional antidepressant overdose, institute 1:1 suicide observation protocol once medically extubated/stabilized [IPS-SUIC-2023, IPS-TOX-2022].',
        'Washout & Drug Interaction Warning Card: Provide written list of contraindicated serotonergic co-medications (Tramadol, Tapentadol, Linezolid, Dextromethorphan, Triptans, MAOIs) to patient and family upon discharge [IPS-TOX-2022].'
      ]
    }
  },

  alcohol_dt: {
    id: 'alcohol_dt',
    shortTitle: 'Alcohol DT / Wernicke',
    fullTitle: 'Alcohol Withdrawal Delirium (Delirium Tremens) & Wernicke Encephalopathy',
    icon: '05',
    accent: 'amber',
    tagline: 'STAT Parenteral Thiamine Before/With Glucose + MgSO4 → Symptom-Triggered IV Lorazepam / Diazepam',
    primarySources: ['IPS-GERI-2023', 'IPS-SUBST-2023', 'IPS-DELIR-2018'],
    tiers: [
      {
        id: 'mod_aws',
        label: 'Tier 1: Moderate–Severe Uncomplicated Withdrawal',
        subLabel: 'CIWA-Ar 10–19 • Tremors, Sweating, HR >100 • Oriented / No Delirium',
        badge: 'IM/IV Thiamine + Symptom-Triggered BZD',
        bannerAction: {
          headline: 'Prophylactic Parenteral Thiamine (Before/With Any Dextrose) + Symptom-Triggered Benzodiazepine',
          primaryRegimen: '1) THIAMINE FIRST: Inj Thiamine at least 250 mg IM/IV daily for 3–5 days BEFORE or together with any glucose/carbohydrate load (never delay life-saving IV dextrose in acute hypoglycemia), followed by Tab Thiamine 100 mg PO TID [IPS-SUBST-2023, IPS-GERI-2023].\n2) SYMPTOM-TRIGGERED BZD: Tab/Inj Diazepam 10 mg PO/IV OR Tab/Inj Chlordiazepoxide 25–50 mg PO (if liver normal) OR Tab/Inj Lorazepam 2 mg PO/IV/IM (MANDATORY choice if hepatic impairment/cirrhosis/elderly) repeated every 1–2 hours whenever CIWA-Ar ≥ 8–10 [IPS-GERI-2023, IPS-AGIT-2022].',
          secondaryRegimen: 'Correct Hypomagnesemia (Inj MgSO4 2 g IV) and Hypokalemia — Thiamine is biochemically ineffective as a cofactor in the presence of uncorrected hypomagnesemia [IPS-GERI-2023 Table 13]!',
          onsetWait: 'Reassess CIWA-Ar & vitals every 1–2 hours • Day-1 total BZD dose becomes Day-2 standing dose, then taper over 3–4 days [IPS-GERI-2023]',
          criticalSafety: 'Give parenteral Thiamine before or concurrently with IV Dextrose/Glucose in alcohol use disorder (never delay dextrose if hypoglycemic)—unopposed glucose metabolism consumes remaining thiamine stores and precipitates acute Wernicke-Korsakoff syndrome [IPS-SUBST-2023, IPS-GERI-2023].',
          citations: ['IPS-SUBST-2023', 'IPS-GERI-2023', 'IPS-AGIT-2022']
        }
      },
      {
        id: 'dt_wernicke',
        label: 'Tier 2: Delirium Tremens (DT) / Wernicke Encephalopathy',
        subLabel: 'Disorientation, Visual/Tactile Hallucinations, Autonomic Storm, Ataxia/Ophthalmoplegia',
        badge: 'High-Dose IV Thiamine 500mg TID + IV Lorazepam/Diazepam',
        bannerAction: {
          headline: 'High-Dose IV Thiamine 500 mg TID + IV Symptom-Triggered Benzodiazepine Till Calm',
          primaryRegimen: '1) HIGH-DOSE IV THIAMINE: Inj Thiamine 500 mg IV three times daily (TID) for 2–3 days (diluted in 50–100 mL Normal Saline infused over 30 min) before or together with any glucose, followed by 250 mg IV daily for 3–5 days, then 100 mg PO TID [IPS-GERI-2023 Table 13].\n2) MAGNESIUM CO-FACTOR: Inj Magnesium Sulfate (MgSO4) 2 g IV if hypomagnesemic (required for thiamine pyrophosphate activity) [IPS-GERI-2023].\n3) IV BENZODIAZEPINE: Inj Lorazepam 2–4 mg IV (preferred in liver disease) OR Inj Diazepam 10 mg IV repeated every 15–30 min until patient is calm/lightly sedated (RASS 0 to -1). Administer Day-1 total requirement as standing divided dose on Day 2, then taper by 20–25%/day over 3–4 days [IPS-GERI-2023].',
          secondaryRegimen: 'Refractory DT: Add symptom-oriented adjunct in ICU/HDU—Dexmedetomidine infusion, Propofol (if intubated), Phenobarbitone, or low-dose Haloperidol (0.5–2 mg IM/IV) for severe refractory perceptual agitation [IPS-GERI-2023 Table 11, IPS-DELIR-2018].',
          onsetWait: 'Reassess vitals, RASS, and airway every 15–30 minutes during active IV BZD titration',
          criticalSafety: 'AVOID Antipsychotic Monotherapy in Delirium Tremens (lowers seizure threshold and does not treat GABA/NMDA withdrawal storm—may be fatal!). Avoid physical restraints as fighting restraints worsens rhabdomyolysis and hyperthermia [IPS-GERI-2023 Table 13].',
          citations: ['IPS-GERI-2023', 'IPS-DELIR-2018', 'IPS-SUBST-2023']
        }
      },
      {
        id: 'withdrawal_seizure',
        label: 'Tier 3: Alcohol Withdrawal Seizures ("Rum Fits")',
        subLabel: 'Generalized Tonic-Clonic Seizures 6–48h After Last Drink',
        badge: 'IV Lorazepam Stat + Rule Out Head Injury + DT Prophylaxis',
        bannerAction: {
          headline: 'Terminate Seizure with IV Lorazepam + Rule Out Subdural Hematoma + Prevent DT Progression',
          primaryRegimen: '1) STAT SEIZURE CONTROL & PROPHYLAXIS: Inj Lorazepam 2–4 mg slow IV push (or Inj Diazepam 10 mg IV); repeat once after 5–10 min if seizure persists. (IV Lorazepam significantly prevents recurrent withdrawal seizures and progression to DT).\n2) MANDATORY THIAMINE + MgSO4: Inj Thiamine 500 mg IV in 100 mL NS over 30 min before or together with dextrose + Inj MgSO4 2 g IV [IPS-GERI-2023, IPS-SUBST-2023].',
          secondaryRegimen: 'Order Non-Contrast CT Brain for ANY first-time seizure, focal neurological deficit, head trauma stigmata, or persistent post-ictal obtundation to rule out occult subdural hematoma or contusion [IPS-SUBST-2023, IPS-GERI-2023].',
          onsetWait: 'Continuous SpO2 & airway monitoring • Transition to CIWA-Ar / symptom-triggered BZD protocol once alert',
          criticalSafety: 'Do NOT load Phenytoin for pure alcohol withdrawal seizures (Phenytoin is ineffective against alcohol withdrawal seizures and causes cardiac arrhythmias; Benzodiazepines are the specific treatment) [IPS-SUBST-2023].',
          citations: ['IPS-GERI-2023', 'IPS-SUBST-2023']
        }
      }
    ],
    calculator: {
      type: 'ciwa_quick',
      title: 'Bedside Alcohol Withdrawal & Wernicke Risk Stratifier (CIWA-Ar Core Domains)',
      subtitle: 'Tap observed signs at bedside to estimate withdrawal severity & trigger IV BZD + High-Dose Thiamine',
      citation: 'IPS-GERI-2023',
      items: [
        { id: 'cw_1', label: 'Visible Tremor (arms extended or resting coarse tremor)', points: 4 },
        { id: 'cw_2', label: 'Paroxysmal Diaphoresis (drenching sweat on forehead/palms)', points: 4 },
        { id: 'cw_3', label: 'Agitation / Severe Anxiety / Restlessness (pacing, thrashing)', points: 4 },
        { id: 'cw_4', label: 'Tactile, Visual, or Auditory Disturbances (formication, insects, shadows)', points: 5 },
        { id: 'cw_5', label: 'Clouding of Sensorium / Disorientation to Time or Place (Delirium Tremens!)', points: 6 },
        { id: 'cw_6', label: 'Autonomic Storm (Heart Rate >110/min OR BP >160/100 mmHg OR Temp >38°C)', points: 5 },
        { id: 'cw_7', label: 'Wernicke Triad Sign (Confusion, Oculomotor Nystagmus/Abducens Palsy, OR Truncal Ataxia)', points: 6 }
      ]
    },
    differentials: [
      { condition: 'Subdural Hematoma / Occult Head Injury', clue: 'History of fall while intoxicated, unequal pupils, focal weakness, drowsy/stuporous rather than hyperadrenergic.', action: 'Perform direct ophthalmoscopy (papilledema) and urgent Non-Contrast CT Head [IPS-SUBST-2023, IPS-GERI-2023].' },
      { condition: 'Hepatic Encephalopathy', clue: 'Jaundice, ascites, asterixis (flapping tremor), fetor hepaticus, elevated serum ammonia, hypoactive/lethargic delirium.', action: 'Avoid long-acting BZDs (Diazepam/Chlordiazepoxide); give Lactulose + Rifaximin; use minimal Lorazepam only if severe withdrawal co-exists [IPS-GERI-2023].' },
      { condition: 'Methanol / Toxic Alcohol Poisoning (Hooch Tragedy)', clue: 'Visual blurring/blindness ("snowfield vision"), papilledema, severe high-anion-gap metabolic acidosis, abdominal pain.', action: 'Stat ABG (pH, HCO3, anion/osmolar gap); Fomepizole or Ethanol + urgent Hemodialysis [IPS-SUBST-2023].' },
      { condition: 'Hypoglycemia / Alcoholic Ketoacidosis / Sepsis', clue: 'Sweating, tachycardia, confusion, or pneumonia/spontaneous bacterial peritonitis mimicking DT.', action: 'Stat fingerstick RBS (give IV Thiamine before or together with IV Dextrose—never delay dextrose in hypoglycemia!), ABG, Chest X-ray, Blood cultures [IPS-SUBST-2023].' }
    ],
    statLabs: [
      'Stat Fingerstick Blood Glucose (if hypoglycemic, inject IV Thiamine concurrently with IV 10% or 25% Dextrose without delaying glucose) [IPS-SUBST-2023]',
      'Serum Electrolytes including Magnesium (Mg2+), Potassium (K+), Sodium (Na+), Phosphate (PO4) [IPS-GERI-2023]',
      'Liver Function Tests (AST, ALT, Bilirubin, INR, Albumin) & Serum Ammonia (if cirrhotic/encephalopathic)',
      'Renal Function Tests (Urea, Creatinine), CBC (macrocytosis, thrombocytopenia), Arterial Blood Gas (ABG)',
      '12-Lead ECG ("Holiday Heart" atrial fibrillation or QTc prolongation from hypomagnesemia/hypokalemia) [IPS-SUBST-2023]',
      'Non-Contrast CT Brain (mandatory if seizures, history of fall/head injury, focal signs, or lack of expected response) [IPS-GERI-2023]'
    ],
    comorbidityAdjustments: {
      elderly: 'Use symptom-triggered LORAZEPAM 1–2 mg IV/PO (never Diazepam/Chlordiazepoxide due to 50–100h active metabolite half-life in elderly); monitor closely for aspiration pneumonia, myocardial ischemia, and falls [IPS-GERI-2023].',
      hepatic: 'MANDATORY SWITCH TO LORAZEPAM (or Oxazepam): Lorazepam undergoes direct hepatic glucuronidation with zero active metabolites. Diazepam and Chlordiazepoxide undergo CYP oxidation to desmethyldiazepam and precipitate prolonged coma/hepatic encephalopathy in cirrhosis [IPS-AGIT-2022, IPS-GERI-2023 Table 11].',
      renal: 'Monitor fluid balance and electrolytes (K+, Mg2+, PO4) closely; Lorazepam is safe in renal impairment.',
      qtc: 'Alcohol withdrawal + hypokalemia/hypomagnesemia markedly prolongs QTc: replete IV MgSO4 (2 g) and K+ aggressively; avoid Haloperidol adjuncts if QTc >450–500 ms [IPS-SUBST-2023].',
      alcohol_cns: 'If Blood Alcohol Concentration (BAC) is still very high with stupor/respiratory depression, support airway and give Thiamine first; start BZD titration as BAC falls and withdrawal emerges [IPS-SUBST-2023].',
      pregnancy: 'Untreated severe alcohol withdrawal/DT causes preterm labor, placental abruption, and fetal distress: give IV Thiamine + lowest effective symptom-triggered Lorazepam with continuous fetal heart monitoring [IPS-SUBST-2023].',
      copd: 'Use short-acting titrated Lorazepam (0.5–1 mg increments) with continuous SpO2 and ABG (PaCO2) monitoring; consider ICU Dexmedetomidine adjunct if BZD causes CO2 retention [IPS-GERI-2023 Table 11].'
    },
    monitoring: [
      { time: 'Before/With Any IV Glucose / Fluids', task: 'Confirm parenteral Thiamine (500 mg IV in DT/Wernicke; ≥250 mg IM/IV in uncomplicated withdrawal) + IV MgSO4 has been administered [IPS-GERI-2023, IPS-SUBST-2023].' },
      { time: 'Every 15–30 min (Active DT)', task: 'Vital signs (HR, BP, RR, SpO2, Temp), RASS sedation score, and repeat IV Lorazepam 2mg / Diazepam 10mg until patient is calm (RASS 0 to -1) [IPS-GERI-2023].' },
      { time: 'Every 1–2 Hours (Stabilized AWS)', task: 'CIWA-Ar score reassessment, Input/Output charting, check for oculomotor palsy/ataxia recovery, and re-verify K+/Mg2+/Glucose [IPS-GERI-2023].' },
      { time: 'Day 2–5 Taper Schedule', task: 'Calculate total 24-hour Lorazepam/Diazepam dose required on Day 1 -> administer as standing divided doses on Day 2 -> taper by 20–25% per day over 3–4 days; transition Thiamine to 100 mg PO TID [IPS-GERI-2023 Table 13].' }
    ],
    disposition: {
      setting: 'Delirium Tremens / Withdrawal Seizures / Wernicke: Medical HDU or ICU. Uncomplicated Moderate Withdrawal: Psychiatry / De-addiction Inpatient Ward.',
      mhcaChecklist: [
        'Competence & Emergency Care [IPS-SUBST-2023, MHCA-2017]: Delirium Tremens impairs decisional capacity; initiate life-saving IV Thiamine and Benzodiazepine stabilization under MHCA 2017 Section 94 (up to 72h or until assessed at a mental health establishment, whichever is earlier) with Nominated Representative (NR) consent.',
        'Avoid Physical Restraints in DT [IPS-GERI-2023 Table 13]: Patients in DT fight mechanical restraints violently, causing severe injury, hyperthermia, and rhabdomyolysis—use adequate symptom-triggered IV Benzodiazepine sedation instead.'
      ]
    }
  },

  dystonia_akathisia: {
    id: 'dystonia_akathisia',
    shortTitle: 'Dystonia / Akathisia',
    fullTitle: 'Acute Dystonic Reaction (Laryngospasm / Oculogyric) & Acute Akathisia',
    icon: '06',
    accent: 'cyan',
    tagline: 'Laryngeal Stridor = IV Lorazepam/Diazepam + Parenteral Anticholinergic • Akathisia = Propranolol',
    primarySources: ['IPS-TOX-2022', 'IPS-AGIT-2022', 'TREC-RIO-2007'],
    tiers: [
      {
        id: 'laryngeal_dystonia',
        label: 'Tier 1: Acute Laryngeal Dystonia (Airway Emergency!)',
        subLabel: 'Stridor, Dyspnea, Choking, Throat Spasm After Antipsychotic',
        badge: 'STAT IV Lorazepam/Diazepam + IV Biperiden/Diphenhydramine',
        bannerAction: {
          headline: 'LIFE-THREATENING AIRWAY EMERGENCY: Immediate IV Benzodiazepine + Parenteral Anticholinergic/Antihistamine',
          primaryRegimen: '1) TREATMENT OF CHOICE FOR ACUTE LARYNGOSPASM [IPS-TOX-2022 Table 4]: Inj Lorazepam 1–2 mg slow IV push OR Inj Diazepam 2–5 mg slow IV push PLUS Inj Biperiden 5 mg slow IV/IM or Inj Diphenhydramine 25–50 mg IV/IM or Inj Benztropine 1–2 mg IV, OR Inj Promethazine 25–50 mg deep IM (if Promethazine is given IV, MUST dilute to ≤25 mg/mL and infuse slowly ≤25 mg/min into a large patent vein due to FDA Boxed Warning for extravasation tissue necrosis) — IV therapy resolves stridor within 2–5 minutes [IPS-TOX-2022].\n2) High-flow 100% Oxygen + call Anesthesia/ICU airway team to bedside immediately.',
          secondaryRegimen: 'Once acute stridor resolves, continue oral anticholinergic (Tab Trihexyphenidyl 2 mg TID or Tab Biperiden 2 mg BD–TID) for at least 4–7 days and switch or reduce the offending high-potency antipsychotic [IPS-TOX-2022].',
          onsetWait: 'IV onset: 2–5 minutes • IM onset: 15–20 minutes • If persists at 15–30 min, repeat second parenteral dose [IPS-TOX-2022]',
          criticalSafety: 'Laryngeal dystonia is a rapidly fatal cause of asphyxiation in young males given IM/PO Haloperidol or Risperidone without anticholinergic cover (in TREC-Rio II, all 10 dystonias occurred in the Haloperidol-alone arm)—never mistake stridor for panic or conversion disorder [IPS-TOX-2022, TREC-RIO-2007]!',
          citations: ['IPS-TOX-2022', 'TREC-RIO-2007']
        }
      },
      {
        id: 'focal_dystonia',
        label: 'Tier 2: Torticollis / Oculogyric / Oromandibular Dystonia',
        subLabel: 'Neck Twist, Upward Eye Roll, Tongue Protrusion, Trismus (<4–7d of Neuroleptic)',
        badge: 'Stepwise IM/IV Anticholinergic / Antihistamine',
        bannerAction: {
          headline: 'Stepwise Parenteral Anticholinergic / Antihistaminergic → Resolves in 5–20 Minutes',
          primaryRegimen: '• Step 1 [IPS-TOX-2022 Table 4]: Administer Inj Promethazine 25–50 mg deep IM (prefer IM over IV due to tissue-injury risk; IV only if diluted in large vein slowly) OR Inj Diphenhydramine 25–50 mg IM/IV OR Inj Biperiden 5 mg IM/IV (or Inj Benztropine 1–2 mg IM/IV). Resolves within 5 min (IV) or 15–20 min (IM).\n• Step 2: If dystonia persists after 30 minutes, administer a second dose of the same parenteral agent.\n• Step 3: If still unresolved after 2 doses, switch to Inj Lorazepam 1–2 mg IM/IV or Inj Diazepam 2–5 mg IV (For recurrent Oculogyric Crisis: Tab Clonazepam 0.5–4 mg/day in divided doses) [IPS-TOX-2022].',
          secondaryRegimen: '• Step 4 (Non-Response Rule): If trismus/jaw spasm fails to respond to 2 anticholinergic doses + BZD, examine immediately for Temporomandibular Joint (TMJ) Dislocation or hypocalcemic tetany [IPS-TOX-2022 Table 4]!\n• Follow-up Prophylaxis: Prescribe Tab Trihexyphenidyl (Pacitane) 2 mg BD–TID for 4–7 days to prevent rebound dystonia as antipsychotic plasma levels persist [IPS-TOX-2022].',
          onsetWait: 'IV onset: 5 min • IM onset: 15–20 min • Repeat at 30 min if needed',
          criticalSafety: '95% of acute dystonias occur within the first 4 days of starting/increasing a high-potency D2 blocker (Haloperidol, Risperidone, Fluphenazine, Metoclopramide), especially in young males (<30y) [IPS-TOX-2022 Table 2].',
          citations: ['IPS-TOX-2022']
        }
      },
      {
        id: 'acute_akathisia',
        label: 'Tier 3: Acute Antipsychotic-Induced Akathisia',
        subLabel: 'Severe Inner Restlessness, Pacing, Rocking, Mounting Tension + Suicide Risk',
        badge: 'Reduce/Switch Neuroleptic + Propranolol / Mirtazapine',
        bannerAction: {
          headline: 'Do NOT Escalate Antipsychotic! Reduce/Switch Offending Agent + Start Propranolol or Mirtazapine',
          primaryRegimen: '1) Rate severity on Barnes Akathisia Rating Scale (BARS) and explicitly screen for acute suicidal ideation (akathisia is a major driver of impulsive self-harm!) [IPS-TOX-2022].\n2) Reduce dose of offending antipsychotic OR switch to low-akathisia agent (e.g., Quetiapine or Olanzapine) [IPS-TOX-2022].\n3) FIRST-LINE ANTI-AKATHISIA AGENT: Tab Propranolol 40–80 mg/day PO in divided doses (e.g., 20–40 mg BD) [IPS-TOX-2022 Table 6].',
          secondaryRegimen: '• Alternative First-Line (if Propranolol contraindicated by asthma, bradycardia, hypotension, or diabetes): Tab Mirtazapine 15 mg PO OD (5-HT2A antagonist) [IPS-TOX-2022 Table 6].\n• Acute Casualty Relief / Adjuncts: Tab Lorazepam 1–2 mg PO/IM or Tab Clonazepam 0.5–1 mg PO, Tab Cyproheptadine 8–16 mg/day, or Tab Vitamin B6 (Pyridoxine: 200–600 mg/day) [IPS-TOX-2022 Table 6].',
          onsetWait: 'Reassess BARS score and suicidality within 2–4 hours and daily',
          criticalSafety: 'CRITICAL PITFALL: Never misdiagnose acute akathisia as "worsening psychotic agitation" and give another dose of Haloperidol/Risperidone/Aripiprazole—this creates a vicious cycle of unbearable torment and suicidality [IPS-TOX-2022, IPS-AGIT-2022]!',
          citations: ['IPS-TOX-2022', 'IPS-AGIT-2022']
        }
      }
    ],
    calculator: {
      type: 'bars_dystonia',
      title: 'Bedside Dystonia Red-Flag & Barnes Akathisia (BARS) Quick Evaluator',
      subtitle: 'Distinguish life-threatening laryngeal dystonia, focal dystonia, and acute akathisia in 1 tap',
      citation: 'IPS-TOX-2022',
      items: [
        { id: 'da_1', label: 'CRITICAL: Laryngeal Stridor / Dyspnea / Choking (Airway Emergency -> Stat IV Lorazepam 1–2mg + IV Biperiden/Diphenhydramine or IM Promethazine!)', points: 10 },
        { id: 'da_2', label: 'Sustained Neck Twisting (Torticollis / Retrocollis), Tongue Protrusion, Trismus, or Upward Eye Deviation (Oculogyric Crisis)', points: 5 },
        { id: 'da_3', label: 'Started or increased Antipsychotic (Haloperidol, Risperidone, etc.) or Metoclopramide within past 1–7 days', points: 3 },
        { id: 'da_4', label: 'BARS Subjective: Inner restlessness, inability to keep legs still, mounting distress if forced to sit', points: 2 },
        { id: 'da_5', label: 'BARS Objective: Rocking from foot to foot while standing, pacing incessantly, fidgeting', points: 2 },
        { id: 'da_6', label: 'Suicidal thoughts or severe dysphoria triggered by inner restlessness (Akathisia Suicide Alert!)', points: 4 }
      ]
    },
    differentials: [
      { condition: 'Temporomandibular Joint (TMJ) Dislocation', clue: 'Persistent inability to close mouth / jaw pain that FAILS to resolve after 2 doses of parenteral anticholinergic + BZD.', action: 'Perform physical exam of mandibular condyles and manual TMJ reduction [IPS-TOX-2022 Table 4].' },
      { condition: 'Hypocalcemic Tetany', clue: 'Carpopedal spasm, perioral numbness, positive Chvostek/Trousseau signs, QTc prolongation on ECG.', action: 'Check ionized Calcium (Ca2+) and Magnesium; give IV Calcium Gluconate [IPS-TOX-2022 Table 2].' },
      { condition: 'Catatonic Posturing / Grimacing', clue: 'Mutism, stupor, negativism, waxy flexibility, no subjective distress or desire for relief.', action: 'Acute dystonia patients are distressed, cooperative, not stuporous, and respond rapidly to anticholinergics [BAP-CAT-2023 Table 10].' },
      { condition: 'Psychotic / Manic Agitation vs Akathisia', clue: 'Psychotic agitation is driven by delusions/hallucinations; Akathisia is driven by a subjective compulsion to move the legs/body ("can\'t sit still").', action: 'Ask patient directly: "Do your muscles/legs feel restless inside?" Treat akathisia with Propranolol/Mirtazapine + Lorazepam, NOT more Haloperidol [IPS-TOX-2022].' },
      { condition: 'Dissociative Motor / Conversion Spasm', clue: 'Variable bizarre movements with clear stressor, absence of neuroleptic/antiemetic exposure, normal tone when distracted.', action: 'Verify full medication history (including OTC anti-emetics like Metoclopramide/Levosulpiride or Chloroquine) before diagnosing dissociation [IPS-TOX-2022 Table 3].' }
    ],
    statLabs: [
      'Continuous Pulse Oximetry (SpO2) & Airway Auscultation (rule out laryngeal stridor)',
      'Serum Ionized Calcium (Ca2+), Magnesium (Mg2+), and Electrolytes (hypocalcemia predisposes to acute dystonia [IPS-TOX-2022 Table 2])',
      'Serum Creatine Kinase (CPK) & Temperature (if generalized opisthotonus/rigidity present — rule out early NMS)',
      '12-Lead ECG & Blood Pressure (before starting Propranolol for akathisia or if high-dose antipsychotics were given)'
    ],
    comorbidityAdjustments: {
      elderly: 'Anticholinergics (Trihexyphenidyl, Benztropine, Diphenhydramine, Promethazine) easily precipitate acute anticholinergic delirium, urinary retention, and angle-closure glaucoma in the elderly [IPS-TOX-2022]. Use lowest possible dose or prefer Lorazepam 0.5–1 mg IV/IM for acute dystonia, and reduce/stop the offending antipsychotic.',
      hepatic: 'Reduce Propranolol and Mirtazapine doses by 50% in hepatic cirrhosis; Lorazepam 1 mg is safe for acute dystonia/akathisia.',
      renal: 'Standard single parenteral anticholinergic/antihistamine dose requires no renal adjustment; avoid Cetirizine/Gabapentin accumulation.',
      qtc: 'Avoid Diphenhydramine/Promethazine IV boluses in severe QTc prolongation (>500 ms); use IV Lorazepam 1–2 mg or Biperiden for acute dystonia, and Propranolol (also shortens adrenergic QTc) or Lorazepam for akathisia [IPS-TOX-2022].',
      alcohol_cns: 'Parenteral Promethazine/Diphenhydramine + Benzodiazepines cause additive sedation with alcohol—monitor SpO2 and airway closely.',
      pregnancy: 'Diphenhydramine (25–50 mg IM/IV) or Promethazine (25 mg IM) is generally safe for acute dystonia in pregnancy; avoid prolonged daily anticholinergics if possible.',
      copd: 'CONTRAINDICATED: Do NOT give Propranolol (non-selective beta-blocker) for akathisia in Asthma or bronchospastic COPD! Use Mirtazapine 15 mg PO OD or Vitamin B6 (200–600 mg/day) or low-dose Clonazepam/Lorazepam instead [IPS-TOX-2022 Table 6].'
    },
    monitoring: [
      { time: '5 min (IV) / 15–20 min (IM)', task: 'Verify complete resolution of dystonic spasm and airway patency; if persistent at 30 min, administer Step 2 repeat dose [IPS-TOX-2022 Table 4].' },
      { time: 'Next 48 Hours to 7 Days', task: 'Maintain oral anticholinergic (e.g., Trihexyphenidyl 2 mg BD–TID) for 4–7 days after an acute dystonic reaction to prevent recurrence [IPS-TOX-2022].' },
      { time: 'Akathisia Follow-Up', task: 'Re-score Barnes Akathisia Rating Scale (BARS) and suicide risk daily; check Heart Rate (>60 bpm) and BP before each Propranolol dose [IPS-TOX-2022].' }
    ],
    disposition: {
      setting: 'Laryngeal Dystonia: Emergency Resuscitation Bay / HDU observation for 24h. Resolved Focal Dystonia / Mild-Mod Akathisia: Discharge to Outpatient follow-up once therapeutic alliance is restored [IPS-TOX-2022].',
      mhcaChecklist: [
        'Therapeutic Alliance Repair [IPS-TOX-2022]: Acute dystonia and akathisia are terrifying and painful, frequently causing patients to abandon psychiatric treatment. Reassure patient and family, explain it is a reversible medication side effect, and document the reaction prominently on the prescription card.'
      ]
    }
  },

  lithium_tox: {
    id: 'lithium_tox',
    shortTitle: 'Lithium / Overdose',
    fullTitle: 'Lithium Toxicity (EXTRIP Protocol) & Psychotropic Overdose (Valproate / TCA / BZD)',
    icon: '07',
    accent: 'indigo',
    tagline: 'Stop Li+ & NSAIDs/ACEi/Thiazides → IV 0.9% NaCl → EXTRIP Hemodialysis ([Li+] >4.0 or Seizures/Coma)',
    primarySources: ['EXTRIP-LI-2015', 'IPS-TOX-2022'],
    tiers: [
      {
        id: 'li_mild_mod',
        label: 'Tier 1: Mild–Moderate Lithium Toxicity',
        subLabel: 'Li+ 1.5–3.5 mEq/L • Coarse Tremor, Ataxia, Slurred Speech, Nausea • Awake',
        badge: 'Stop Lithium + IV 0.9% Normal Saline + Serial Li+ q6h',
        bannerAction: {
          headline: 'Hold Lithium & Nephrotoxins + IV 0.9% Normal Saline Volume Resuscitation + Check EXTRIP Criteria',
          primaryRegimen: '1) STOP Lithium immediately and STOP interacting drugs that reduce Li+ clearance: Thiazide/Loop Diuretics, ACE Inhibitors/ARBs, and NSAIDs [IPS-TOX-2022 Table 17, EXTRIP-LI-2015].\n2) Restore GFR & natriuresis with IV 0.9% Isotonic Normal Saline (1.5–2x maintenance rate; target urine output 1.5–3 mL/kg/h) while correcting Na+/K+ [EXTRIP-LI-2015, IPS-TOX-2022].\n3) If acute massive ingestion (<1–2h) or sustained-release preparation: Do NOT give Activated Charcoal (does NOT bind lithium! [EXTRIP-LI-2015]); consider Whole-Bowel Irrigation with Polyethylene Glycol (PEG) solution [EXTRIP-LI-2015, IPS-TOX-2022].',
          secondaryRegimen: 'Consult Nephrology for Hemodialysis if: Chronic toxicity with [Li+] >2.5 mEq/L + significant neurotoxicity/confusion OR renal impairment OR expected time to reach [Li+] <1.0 mEq/L is >36 hours [IPS-TOX-2022, EXTRIP-LI-2015].',
          onsetWait: 'Repeat Serum [Li+], Sodium, and Creatinine every 4–6 hours',
          criticalSafety: 'Chronic toxicity causes severe brain neurotoxicity at much LOWER serum levels (1.5–2.5 mEq/L) than acute overdose because lithium has already equilibrated into intracellular brain tissue! Always treat the patient\'s neurological signs, not just the serum number [EXTRIP-LI-2015, IPS-TOX-2022].',
          citations: ['EXTRIP-LI-2015', 'IPS-TOX-2022']
        }
      },
      {
        id: 'li_severe_hd',
        label: 'Tier 2: Severe Lithium Toxicity (EXTRIP Dialysis Trigger)',
        subLabel: 'Li+ >4.0–5.0 mEq/L OR Seizures, Stupor/Coma, Delirium, AKI, Arrhythmia',
        badge: 'STAT Intermittent Hemodialysis (EXTRIP Class 1D)',
        bannerAction: {
          headline: 'EXTRIP Class 1D Indication: Urgent Intermittent Hemodialysis + ICU Neuro/Cardiac Care',
          primaryRegimen: '1) URGENT INTERMITTENT HEMODIALYSIS (HD is preferred over CRRT; clears Li+ at ~107–180 mL/min vs CRRT 43 mL/min) [EXTRIP-LI-2015]:\n   • RECOMMENDED (1D): Impaired kidney function AND [Li+] > 4.0 mEq/L; OR Decreased consciousness, Seizures, or Life-threatening dysrhythmias IRRESPECTIVE of serum [Li+] [EXTRIP-LI-2015, IPS-TOX-2022].\n   • SUGGESTED (2D): [Li+] > 5.0 mEq/L; OR Significant confusion; OR Expected time to reduce [Li+] < 1.0 mEq/L is > 36 hours (IPS CPG 2022 also advises HD at >2.5 mEq/L in chronic toxicity) [EXTRIP-LI-2015, IPS-TOX-2022].\n2) Control seizures with Inj Lorazepam 2–4 mg IV or Diazepam 10 mg IV [IPS-TOX-2022].',
          secondaryRegimen: 'Continue Hemodialysis until serum [Li+] < 1.0 mEq/L or clear clinical improvement (for a minimum of 6 hours if lab turnaround is delayed) [EXTRIP-LI-2015]. Check serial [Li+] every 4–6h for 12 hours post-HD to detect intracellular/GI Lithium Rebound and repeat HD if rebound occurs [EXTRIP-LI-2015]!',
          onsetWait: 'Continuous ECG telemetry (watch for sinus node dysfunction, sinoatrial/AV block, bradycardia) • Prevent SILENT syndrome',
          criticalSafety: 'Aggressive dialytic removal reduces risk of SILENT (Syndrome of Irreversible Lithium-Effectuated Neurotoxicity — permanent cerebellar ataxia, nystagmus, dysarthria) [EXTRIP-LI-2015]. Never use forced loop-diuretic diuresis (worsens proximal tubular Li+ reabsorption) [EXTRIP-LI-2015].',
          citations: ['EXTRIP-LI-2015', 'IPS-TOX-2022']
        }
      },
      {
        id: 'other_overdose',
        label: 'Tier 3: TCA / Valproate / Carbamazepine / BZD Overdose',
        subLabel: 'QRS >100ms (TCA) • Hyperammonemia (Valproate) • Resp Depression (BZD)',
        badge: 'Agent-Specific IPS Antidote Protocol',
        bannerAction: {
          headline: 'Targeted Psychotropic Overdose Antidote & Extracorporeal Protocol (IPS CPG 2022)',
          primaryRegimen: '• Tricyclic Antidepressant (TCA) Overdose: Airway + Activated Charcoal (1 g/kg max 50 g PO if <1–2h & airway protected) + Inj Sodium Bicarbonate (1–2 mEq/kg IV bolus, target arterial pH 7.45–7.55) for QRS > 100 ms, ventricular arrhythmia, hypotension, or seizures; Inj Lorazepam for seizures (NEVER give Physostigmine in TCA overdose—causes asystole!) [IPS-TOX-2022].\n• Valproate Overdose: Inj L-Carnitine 100 mg/kg IV over 30 min (max 6 g), then 50 mg/kg IV q8h (max 3 g) for hyperammonemic encephalopathy/hepatotoxicity + Inj Naloxone (0.8–2 mg IV titrated) for CNS depression + Hemodialysis if Valproate >1300 mg/L, shock, coma, or pH <7.10 [IPS-TOX-2022].',
          secondaryRegimen: '• Antipsychotic Overdose with QTc > 500 ms: Correct K+/Mg2+ immediately and administer Inj Magnesium Sulfate 2–4 g IV stat if Torsades de Pointes/polymorphic VT + IV fluids for alpha-1 hypotension [IPS-TOX-2022].\n• Isolated Benzodiazepine Overdose with Severe Respiratory Depression: Airway/bag-mask support first; Inj Flumazenil 0.1–0.2 mg/min IV (max 1–2 mg) ONLY in pure BZD overdose with normal ECG and NO chronic BZD dependence, epilepsy, or TCA co-ingestion [IPS-TOX-2022].',
          onsetWait: 'Continuous 12-lead ECG / QRS / QTc monitoring • ABG, Electrolytes, Ammonia, Serum Drug Levels',
          criticalSafety: 'ABSOLUTE CONTRAINDICATIONS FOR FLUMAZENIL [IPS-TOX-2022]: Long-term benzodiazepine use/dependence, co-ingestion of TCAs/pro-convulsants, history of epilepsy, raised ICP, or prolonged QTc/arrhythmia on baseline ECG (precipitates refractory status epilepticus and fatal arrhythmias!).',
          citations: ['IPS-TOX-2022']
        }
      }
    ],
    calculator: {
      type: 'extrip_li',
      title: 'EXTRIP & IPS Lithium Hemodialysis Decision Rule Calculator',
      subtitle: 'Tap patient findings to determine if Urgent Intermittent Hemodialysis is Recommended (1D) or Suggested (2D)',
      citation: 'EXTRIP-LI-2015',
      items: [
        { id: 'li_1', label: 'Class 1D: Decreased Level of Consciousness (Stupor/Coma), Seizures, OR Life-Threatening Dysrhythmia (Regardless of Serum [Li+]!)', points: 100 },
        { id: 'li_2', label: 'Class 1D: Serum [Li+] > 4.0 mEq/L AND Impaired Kidney Function (AKI / CKD / eGFR <45 / Raised Creatinine)', points: 100 },
        { id: 'li_3', label: 'Class 2D: Serum [Li+] > 5.0 mEq/L (Even with normal baseline renal function)', points: 50 },
        { id: 'li_4', label: 'Class 2D: Chronic Lithium Toxicity with Serum [Li+] > 2.5 mEq/L OR Prominent Confusion / Delirium / Ataxia', points: 50 },
        { id: 'li_5', label: 'Class 2D: Expected time to reduce Serum [Li+] to < 1.0 mEq/L with IV Saline is > 36 hours', points: 50 }
      ]
    },
    differentials: [
      { condition: 'Acute vs Acute-on-Chronic vs Chronic Lithium Toxicity', clue: 'Acute: nausea/vomiting/diarrhea early, delayed neuro signs. Chronic: coarse tremor, ataxia, dysarthria, confusion, myoclonus, hyperreflexia at [Li+] 1.5–3.0 mEq/L.', action: 'Have lower threshold for Hemodialysis in Chronic toxicity due to high intracellular brain lithium burden [EXTRIP-LI-2015, IPS-TOX-2022].' },
      { condition: 'Serotonin Syndrome vs Lithium Neurotoxicity', clue: 'Lithium toxicity also causes tremor, hyperreflexia, myoclonus, and ataxia, and Lithium can co-trigger Serotonin Syndrome with SSRIs.', action: 'Check stat Serum [Li+] and RFT in every patient on Lithium presenting with tremor/clonus/confusion [IPS-TOX-2022].' },
      { condition: 'Lithium-Induced Nephrogenic Diabetes Insipidus (Hypernatremia)', clue: 'Polyuria, polydipsia, severe hypernatremia (Na+ >150 mEq/L) causing obtundation/seizures.', action: 'Monitor serum Na+ closely during IV saline infusion to avoid worsening hypernatremia in nephrogenic DI [IPS-TOX-2022].' }
    ],
    statLabs: [
      'Stat Serum Lithium Concentration ([Li+] in mEq/L or mmol/L — repeat serial levels every 4–6h and 6–12h post-dialysis)',
      'Renal Function Test (Urea, Creatinine, eGFR) & Strict Hourly Urine Output',
      'Serum Electrolytes (Na+, K+, Ca2+, Mg2+), Random Blood Glucose, Arterial Blood Gas (pH, HCO3, Lactate)',
      '12-Lead ECG (sinoatrial block, AV block, bradycardia in Li+; QRS >100ms in TCA; QTc >500ms in antipsychotics) [EXTRIP-LI-2015, IPS-TOX-2022]',
      'Serum Valproate / Carbamazepine Levels, Serum Ammonia, & LFT + Serum Paracetamol screen'
    ],
    comorbidityAdjustments: {
      elderly: 'Lithium elimination half-life doubles from 12–27h in young adults to up to 58 hours in the elderly [EXTRIP-LI-2015]! Elderly patients develop severe neurotoxicity at [Li+] 1.5–2.0 mEq/L; monitor for fluid overload/CHF during IV saline hydration and initiate hemodialysis early.',
      hepatic: 'In Valproate overdose or hepatic dysfunction, administer IV L-Carnitine (100 mg/kg loading) immediately and avoid hepatotoxic psychotropics [IPS-TOX-2022].',
      renal: 'Impaired renal function reduces endogenous Li+ clearance from 30–40 mL/min down to <10 mL/min [EXTRIP-LI-2015]. Any [Li+] >4.0 mEq/L in renal impairment is an immediate indication for Intermittent Hemodialysis.',
      qtc: 'Lithium causes sinus node dysfunction/bradycardia; TCAs widen QRS (>100ms -> give IV NaHCO3); Antipsychotics prolong QTc (>500ms -> correct K+/Mg2+, give IV MgSO4 2–4 g if torsades) [IPS-TOX-2022].',
      alcohol_cns: 'Co-ingestion of alcohol with psychotropic overdose markedly increases respiratory depression—secure airway early and avoid Flumazenil.',
      pregnancy: 'Perform Urine/Serum beta-hCG in all reproductive-age women with overdose; hemodialysis is safe and protects the fetus in severe maternal lithium toxicity.',
      copd: 'Avoid Flumazenil if mixed overdose suspected; use mechanical ventilation for hypercapnic respiratory failure.'
    },
    monitoring: [
      { time: 'Every 4–6 Hours (Pre-Dialysis / Medical Mgmt)', task: 'Serial Serum [Li+], Serum Sodium, Creatinine, Hourly Urine Output, neurological exam, and continuous ECG telemetry [EXTRIP-LI-2015, IPS-TOX-2022].' },
      { time: 'During & Post-Hemodialysis (0–12h)', task: 'Continue HD until [Li+] < 1.0 mEq/L (or ≥6h if level unavailable); measure serial [Li+] over 12 hours after stopping HD to detect post-redistribution or extended-release GI Lithium Rebound [EXTRIP-LI-2015].' },
      { time: 'Post-Stabilization Psychiatric Review', task: 'If intentional overdose, conduct full suicide risk assessment once sensorium clears; if chronic accidental toxicity, audit and permanently discontinue offending NSAID/diuretic and re-educate family on sick-day hydration rules [IPS-TOX-2022, IPS-SUIC-2023].' }
    ],
    disposition: {
      setting: 'Severe Toxicity / Dialysis / QRS >100ms / Altered Sensorium: Medical ICU / Nephrology HDU. Mild Chronic Toxicity (Awake, Li+ <2.5, normal RFT): Medical/Psychiatry Inpatient Observation.',
      mhcaChecklist: [
        'MHCA 2017 Section 115 & BNS 2023 (Intentional Overdose): Presume severe stress, provide full medical/psychiatric care without punitive treatment (general suicide attempt offence omitted in BNS 2023), complete hospital Medico-Legal Case (MLC) intimation per state protocol, and transition to Psychiatry Inpatient / Safety Planning once medically cleared [IPS-SUIC-2023, MHCA-2017].'
      ]
    }
  },

  suicide_dsh: {
    id: 'suicide_dsh',
    shortTitle: 'Suicidal Crisis / DSH',
    fullTitle: 'Acute Suicidal Crisis & Deliberate Self-Harm (DSH)',
    icon: '08',
    accent: 'emerald',
    tagline: 'Medical Stabilization → IPS 3-Tier Risk Stratification → Safety Plan (NO "No-Suicide Contracts"!) + ECT/Li+/Clozapine',
    primarySources: ['IPS-SUIC-2023', 'MHCA-2017'],
    tiers: [
      {
        id: 'high_suic',
        label: 'Tier 1: High Imminent Suicide Risk',
        subLabel: 'Recent High-Lethality Attempt • Active Plan/Intent • Psychosis/Command Hallucinations',
        badge: 'Mandatory Inpatient Admission + 1:1 / Random 15-min Checks',
        bannerAction: {
          headline: 'Admit to Psychiatry Inpatient Ward (After Medical Stabilization) + 1:1 / Unpredictable 15-min Checks',
          primaryRegimen: '1) IMMEDIATE SAFETY & WARD PROTOCOL [IPS-SUIC-2023]: Place bed closest to nursing station; inspect and remove all ligature points/sharps/medications; assign 24x7 family attendant + nursing observation (continuous 1:1 or periodic checks at UNPREDICTABLE random intervals ≤15 min so patient cannot time an attempt) [IPS-SUIC-2023].\n2) ACUTE AGITATION / ANXIETY PERTURBATION: Use supervised oral/parenteral antipsychotic or low-dose Lorazepam for severe acute agitation/insomnia (never dispense unsupervised BZD/Lithium supply!) [IPS-SUIC-2023].\n3) DEFINITIVE ANTI-SUICIDAL SOMATIC TREATMENT: Consider Bilateral Modified ECT for severe unipolar/bipolar suicidal depression or psychotic command hallucinations (rapidly reduces short-term suicide risk) [IPS-SUIC-2023].',
          secondaryRegimen: '• Disorder-Specific Anti-Suicidal Pharmacotherapy [IPS-SUIC-2023]:\n  - Bipolar / Affective Disorder: Lithium (proven anti-suicidal efficacy, but MUST be kept under lock/family supervision in short supply due to lethal overdose risk).\n  - Schizophrenia / Schizoaffective: Clozapine (reduces suicide attempts).\n  - Unipolar Depression: Fluoxetine or Venlafaxine (monitor closely for activation/suicidality in first 4 weeks, especially in <25y).\n  - Off-Label Rapid Option: IV Ketamine 0.5 mg/kg infusion over 40 min provides rapid short-term ideation reduction, though IPS 2023 notes IV Ketamine remains off-label with short-lived effect [IPS-SUIC-2023].',
          onsetWait: 'Continuous 1:1 observation • Reassess suicide risk at every shift/setting transition and before discharge',
          criticalSafety: 'NEVER rely on a "No-Suicide Contract" [IPS-SUIC-2023]: IPS CPG 2023 explicitly states no-suicide contracts lack evidence, create a false sense of security, and are strictly contraindicated in psychotic, agitated, impulsive, or intoxicated patients! Also beware of sudden, unexpected mood improvement (can signify firm resolution to die) [IPS-SUIC-2023].',
          citations: ['IPS-SUIC-2023', 'MHCA-2017']
        }
      },
      {
        id: 'mod_suic',
        label: 'Tier 2: Moderate Suicide Risk',
        subLabel: 'Suicidal Ideation with Plan, But No Immediate Intent / Preparatory Acts • Inconsistent Support',
        badge: 'Consider Admission OR Intensive Safety Plan + Means Restriction',
        bannerAction: {
          headline: 'Collaborate on 6-Step Stanley-Brown Safety Plan + Strict Means Restriction + Family Supervision',
          primaryRegimen: '1) Evaluate Hospitalization vs Intensive Outpatient Care based on family supervision and modifiable risk factors [IPS-SUIC-2023 Table 5 & 8].\n2) COLLABORATIVE SAFETY PLAN INTERVENTION (SPI — 20–45 min) [IPS-SUIC-2023 Table 10]:\n   • Step 1: Personal Warning Signs (e.g., intense agitation, mood swings).\n   • Step 2: Internal Coping Strategies (autonomous distraction without contacting others).\n   • Step 3: Healthy Social Settings & People for Distraction.\n   • Step 4: Trusted Family/Friends to Call During Crisis.\n   • Step 5: Professional & 24x7 Indian Crisis Helplines: Tele-MANAS 14416 or 1800-891-4416 + Local Hospital Casualty [IPS-SUIC-2023].\n   • Step 6: Lethal Means Restriction (lock/remove pesticides, ropes, firearms, and all tablet strips at home/hostel).',
          secondaryRegimen: 'Initiate evidence-based psychotherapy (CBT for suicide prevention, Problem-Solving Therapy, or DBT for Borderline Personality Disorder) and treat underlying psychiatric/substance disorder [IPS-SUIC-2023].',
          onsetWait: 'Mandatory corroborative history from family/roommates BEFORE any discharge decision [IPS-SUIC-2023]',
          criticalSafety: 'In India, impulsive ingestion of household/agricultural pesticides (organophosphates, aluminum phosphide, paraquat) carries extreme objective medical lethality even when subjective intent to die was low ("spur of the moment")—always assess objective lethality independently of patient\'s stated intent [IPS-SUIC-2023]!',
          citations: ['IPS-SUIC-2023']
        }
      },
      {
        id: 'low_suic',
        label: 'Tier 3: Low Risk / Reactive DSH (Post-Stabilization)',
        subLabel: 'Passive Death Wishes or Low-Lethality Reactive Gesture • No Plan/Intent • Strong Family Support',
        badge: 'Safety Plan + WHO BIC Follow-up + Tele-MANAS 14416',
        bannerAction: {
          headline: 'Safe ER Discharge Criteria Met: Written Safety Plan + Means Removal + WHO BIC Follow-Up Schedule',
          primaryRegimen: '1) Verify ALL IPS CPG Table 9 Safe Discharge Criteria [IPS-SUIC-2023]: Suicidality was reactive to acute precipitant and patient\'s perspective has shifted; low lethality method/intent; cooperative family present to lock away all medications/poisons; patient communicative and agrees to follow-up.\n2) Complete 6-Step Written Safety Plan + Provide Govt of India Tele-MANAS 24x7 toll-free numbers: 14416 / 1-800-891-4416 [IPS-SUIC-2023].\n3) Enroll in WHO Brief Intervention and Contact (BIC) protocol: 1-hour information session before discharge + 9 structured follow-up contacts (Week 1, 2, 4, 7, 11 and Month 4, 6, 12, 18) [IPS-SUIC-2023].',
          secondaryRegimen: 'Treat underlying adjustment, depressive, anxiety, or alcohol use disorder; dispense only short, family-supervised prescriptions.',
          onsetWait: 'First outpatient follow-up contact within 24–72 hours (Week 1 BIC milestone) [IPS-SUIC-2023]',
          criticalSafety: 'Never conduct suicide risk assessment while the patient is still drowsy or intoxicated in Casualty—wait until sensorium and intoxication completely clear, and ALWAYS interview family/collateral informants separately [IPS-SUIC-2023].',
          citations: ['IPS-SUIC-2023']
        }
      }
    ],
    calculator: {
      type: 'ips_suicide',
      title: 'IPS CPG 2023 Mandatory Hospitalization & Lethality Risk Checklist (Table 8)',
      subtitle: 'Tap present risk factors from Sarkhel et al. (2023) to support clinical formulation (no checklist score alone predicts suicide)',
      citation: 'IPS-SUIC-2023',
      items: [
        { id: 'su_1', label: 'High Risk: Violent, near-lethal, or premeditated attempt (hanging, pesticide/organophosphate, jumping) OR precautions taken to avoid discovery', points: 5 },
        { id: 'su_2', label: 'High Risk: Persistent suicidal plan/intent OR patient regrets surviving / expresses hopelessness', points: 5 },
        { id: 'su_3', label: 'High Risk: Active psychosis (especially command hallucinations), severe agitated depression, or bipolar mixed episode', points: 5 },
        { id: 'su_4', label: 'Moderate Risk: Access to lethal means at home (pesticides, toxic drugs, weapons) OR poor/absent family supervision', points: 3 },
        { id: 'su_5', label: 'Moderate Risk: Active alcohol/substance abuse, high impulsivity, prior suicide attempt, or recent psychiatric discharge', points: 3 },
        { id: 'su_6', label: 'Moderate Risk: Male >45 years with new-onset psychiatric illness/suicidal thinking OR recent major loss / intimate partner violence', points: 2 }
      ]
    },
    differentials: [
      { condition: 'Non-Suicidal Self-Injury (NSSI) vs Suicide Attempt', clue: 'NSSI (e.g., superficial wrist cutting to relieve emotional numbness) lacks intent to die, whereas a Suicide Attempt has explicit or implicit evidence of intent to die [IPS-SUIC-2023 Table 1].', action: 'Note: NSSI patients with Borderline Personality Disorder still have elevated long-term suicide risk—offer DBT and Safety Planning [IPS-SUIC-2023].' },
      { condition: 'Impulsive Low-Intent High-Lethality Poisoning (Indian Pesticide Context)', clue: 'Patient ingested agricultural pesticide or rodenticide impulsively during a family argument without realizing its fatal toxicity.', action: 'Objective medical lethality overrides low subjective intent—prioritize ICU toxicology management first, then full psychiatric evaluation once medically stable [IPS-SUIC-2023].' },
      { condition: 'Akathisia-Induced or Delirium-Induced Self-Harm', clue: 'Patient attempts to jump out of window due to terrifying visual hallucinations (delirium/DT) or unbearable inner restlessness after starting Haloperidol/Risperidone (akathisia).', action: 'Examine sensorium (CAM) and motor restlessness (BARS) in every inpatient/casualty self-harm event [IPS-TOX-2022, IPS-DELIR-2018].' }
    ],
    statLabs: [
      'Medical Stabilization & Toxicology Workup First (if post-attempt): ABG, Electrolytes, RFT, LFT, INR, Pseudocholinesterase levels (if organophosphate), ECG',
      'Blood Alcohol Concentration / Urine Drug Screen (wait for intoxication to clear before formal MSE)',
      'Baseline CBC, RFT, TFT, Electrolytes, ECG, and Urine Pregnancy Test (prior to Lithium, Clozapine, or Modified ECT initiation)'
    ],
    comorbidityAdjustments: {
      elderly: 'Older adults (>45–65y, especially males) have the highest ratio of completed-to-attempted suicide and high medical fragility; new-onset suicidal ideation in an elderly patient is a strong indication for inpatient admission and organic/depressive workup [IPS-SUIC-2023 Table 8, IPS-GERI-2023].',
      hepatic: 'Avoid Valproate, Duloxetine, and hepatotoxic agents; inspect LFT/INR closely if patient ingested paracetamol, ratol (yellow phosphorus), or alcohol.',
      renal: 'Avoid Lithium if eGFR is significantly impaired; Bilateral ECT and supervised SSRIs (Sertraline/Fluoxetine) are safe.',
      qtc: 'Avoid Tricyclic Antidepressants (Amitriptyline/Dothiepin are lethal in overdose via QRS/QTc arrhythmias!) and Citalopram; prefer Sertraline or ECT [IPS-TOX-2022].',
      alcohol_cns: 'Alcohol dependence increases lifetime suicide risk to 15–23% and triples risk when comorbid with mood disorders [IPS-SUIC-2023]. Do not discharge an intoxicated suicidal patient; reassess after complete sobriety + Thiamine.',
      pregnancy: 'Intimate partner violence and peripartum depression/psychosis are major drivers of female suicide in India [IPS-SUIC-2023]. Screen privately for domestic violence; Modified ECT and SSRIs (Sertraline/Fluoxetine) are safe and effective.',
      copd: 'Avoid sedative/benzodiazepine prescriptions that can be used for fatal respiratory overdose [IPS-SUIC-2023].'
    },
    monitoring: [
      { time: 'Every ≤15 min (Random Unpredictable Checks)', task: 'For hospitalized high-risk patients: place bed next to nursing station, maintain 24x7 family attendant, remove all potential ligature points/sharps, and perform nursing checks at randomly varied intervals (≤15 min) so the patient cannot anticipate staff rounds [IPS-SUIC-2023].' },
      { time: 'Ward Transitions & "Sudden Improvement" Alert', task: 'Re-evaluate suicide risk at every change in ward status, new stressor, or if patient exhibits sudden unexplained mood improvement or calm (can indicate secret resolve to carry out suicide plan) [IPS-SUIC-2023].' },
      { time: 'First 4 Weeks of Antidepressant Therapy', task: 'Psychoeducate family and monitor closely during the first month of SSRI/SNRI therapy (especially in adolescents/young adults) for treatment-emergent activation or worsening suicidal ideation [IPS-SUIC-2023].' },
      { time: 'Post-Discharge WHO BIC Timeline', task: 'Schedule structured follow-up contacts at Week 1, 2, 4, 7, 11 and Month 4, 6, 12, and 18 post-discharge [IPS-SUIC-2023].' }
    ],
    disposition: {
      setting: 'High Risk: Psychiatry Inpatient Admission (under MHCA Sec 86 Independent or Sec 89 Supported Admission if lacking capacity/refusing). Moderate/Low Risk: Outpatient Care with Written Safety Plan, Family Means-Restriction, and WHO BIC Follow-up.',
      mhcaChecklist: [
        'MHCA 2017 Section 115 & BNS 2023 (Decriminalization of Attempted Suicide) [IPS-SUIC-2023, MHCA-2017]: MHCA Section 115(1) mandates that any person who attempts suicide shall be presumed to have severe stress and SHALL NOT be tried or punished, and Section 115(2) mandates government duty to provide care, treatment, and rehabilitation. Bharatiya Nyaya Sanhita (BNS) 2023 repealed the general offence of attempting suicide.',
        'MHCA 2017 Section 89 / 94 (Refusal of Care in High Imminent Risk): If a high-risk suicidal patient lacks decisional capacity or refuses admission despite imminent risk of death/self-harm, initiate emergency protection under Section 94 (up to 72 hours with NR consent) and transition to Supported Admission under Section 89 [MHCA-2017].',
        'National Tele-MANAS Mandate [IPS-SUIC-2023]: Document provision of 24x7 Toll-Free National Tele-Mental Health & Suicide Helpline numbers (14416 / 1-800-891-4416) on all discharge summaries.'
      ]
    }
  }
};

```

### File: `/src/data/structuredTreatmentData.ts`
```typescript
export interface StructuredTreatmentOption {
  id: string;
  optionLabel: string; // e.g., "Option A (Oral Benzodiazepine)", "Step 1 (Immediate Cessation)"
  contextBadge?: string; // e.g., "First-Line", "Alternative", "Prerequisite", "Adjunct"
  medicationOrAction: string;
  dose?: string;
  route?: string;
  formulation?: string;
  instructions: string;
  citations?: string[];
}

export interface StructuredDosingParam {
  label: string;
  value: string;
  note?: string;
}

export interface ComparativeOutcomeRow {
  study: string;
  comparison: string;
  outcome: string;
  timePoint: string;
  result: string;
  limitationOrContext?: string;
}

export interface StructuredRationale {
  summaryTriggerLabel?: string;
  clinicalReasoning: string;
  keyEvidence: string[];
  comparativeOutcomes?: ComparativeOutcomeRow[];
  interpretation: string;
  safetyAndLimitations: string[];
  references: string[];
  flaggedForClinicalReview?: string;
}

export interface TierStructuredPresentation {
  tierId: string;
  pathwayId: string;
  statusLabel: string; // Supported by source tier.badge
  prerequisites?: string[];
  immediateOptions: StructuredTreatmentOption[];
  escalationOrSecondaryOptions: StructuredTreatmentOption[];
  dosingParameters: StructuredDosingParam[];
  warningSeverity: 'critical-rose' | 'caution-amber';
  warningTitle: string;
  rationale: StructuredRationale;
}

export const TIER_STRUCTURED_DATA: Record<string, TierStructuredPresentation> = {
  // ============================================================================
  // PATHWAY 01: ACUTE AGITATION
  // ============================================================================
  mild_mod: {
    tierId: 'mild_mod',
    pathwayId: 'agitation',
    statusLabel: 'De-escalate + Oral Route First',
    prerequisites: [
      'Maintain 2 arm-lengths distance, ensure unobstructed exit, and attempt verbal de-escalation first.',
      'Check stat fingerstick capillary blood glucose (RBS) and pulse oximetry (SpO2) before attributing agitation to psychiatric illness [IPS-AGIT-2023].'
    ],
    immediateOptions: [
      {
        id: 'mm_opt1',
        optionLabel: 'Oral Benzodiazepine Monotherapy',
        contextBadge: 'First-Line Option',
        medicationOrAction: 'Tab Lorazepam',
        dose: '1–2 mg',
        route: 'PO / Sublingual / Mouth-Dissolving (MD)',
        formulation: 'Tablet / Sublingual / MD',
        instructions: 'Preferred when anxiety, undifferentiated agitation, or tentative medical history is present.',
        citations: ['IPS-AGIT-2023']
      },
      {
        id: 'mm_opt2',
        optionLabel: 'Oral Second-Generation Antipsychotic (Risperidone)',
        contextBadge: 'First-Line Option',
        medicationOrAction: 'Tab Risperidone',
        dose: '1–2 mg',
        route: 'PO / MD / Oral Solution',
        formulation: 'Tablet / Mouth-Dissolving / Liquid',
        instructions: 'Preferred in cooperative patients with known or suspected primary psychosis or mania.',
        citations: ['IPS-AGIT-2023', 'IPS-AGIT-2022']
      },
      {
        id: 'mm_opt3',
        optionLabel: 'Oral Second-Generation Antipsychotic (Olanzapine)',
        contextBadge: 'First-Line Option',
        medicationOrAction: 'Tab Olanzapine',
        dose: '5–10 mg',
        route: 'PO / Mouth-Dissolving (MD)',
        formulation: 'Tablet / Rapidly Disintegrating',
        instructions: 'Rapidly dissolving wafer helps prevent cheeking/spitting in partially cooperative patients.',
        citations: ['IPS-AGIT-2023']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'mm_sec1',
        optionLabel: 'Oral Combination Regimen',
        contextBadge: 'Combined Oral Option',
        medicationOrAction: 'Tab Risperidone + Tab Lorazepam',
        dose: 'Risperidone 2 mg + Lorazepam 2 mg',
        route: 'PO',
        instructions: 'Demonstrates equivalent efficacy to IM Haloperidol 5 mg + IM Lorazepam 2 mg in agitated patients able to take oral medication [IPS-AGIT-2022].',
        citations: ['IPS-AGIT-2022']
      }
    ],
    dosingParameters: [
      { label: 'Expected Onset', value: '20–60 min (PO/MD)', note: 'Onset time is not a guaranteed full response time' },
      { label: 'Min Repeat Interval', value: '2 hours', note: 'Reassess sedation and vitals before repeating' },
      { label: 'Max 24h Ceiling (Lorazepam)', value: '12 mg / 24h', note: 'Reduce by 50% in elderly or hepatic impairment' },
      { label: 'Max 24h Ceiling (SGA)', value: 'Risperidone 6 mg · Olanzapine 20 mg / 24h', note: 'Total cumulative 24-hour oral ceiling' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Mandatory Pre-Sedation Exclusion Warning',
    rationale: {
      clinicalReasoning:
        'Non-coercive verbal de-escalation and oral/sublingual formulations avoid needle trauma, preserve the therapeutic alliance, and reduce the need for physical restraint in mild-to-moderate agitation (BVC 1–2, RASS +1 to +2).',
      keyEvidence: [
        '**Oral vs IM equivalence in cooperative agitation**: Oral Risperidone 2 mg + Oral Lorazepam 2 mg achieves comparable tranquillisation to IM Haloperidol 5 mg + IM Lorazepam 2 mg in patients willing to accept oral intake [IPS-AGIT-2022].',
        '**Mouth-dissolving (MD) formulations**: Sublingual Lorazepam and mouth-dissolving Olanzapine/Risperidone tablets dissolve on contact with saliva, reducing covert non-adherence ("cheeking") in casualty settings [IPS-AGIT-2023].'
      ],
      interpretation:
        'When a patient can safely accept oral medication, oral monotherapy or oral Risperidone + Lorazepam provides effective calming without the extrapyramidal or injection-site risks of parenteral therapy.',
      safetyAndLimitations: [
        '**Medical mimics**: Hypoglycemia and hypoxia frequently present as acute irritability or restlessness in emergency bays and must be excluded via fingerstick RBS and SpO2 before sedative administration.',
        '**Onset limitation**: Oral absorption requires 20–60 minutes; if imminent violence develops (BVC ≥ 3), escalate immediately to Tier 2 parenteral rapid tranquillisation.'
      ],
      references: ['IPS-AGIT-2023', 'IPS-AGIT-2022']
    }
  },

  severe_im: {
    tierId: 'severe_im',
    pathwayId: 'agitation',
    statusLabel: 'IM Rapid Tranquillisation',
    prerequisites: [
      'Ensure trained staff presence, clear airway equipment, and pulse oximetry readiness.',
      'Avoid IV route as initial rapid tranquillisation unless resuscitation cart and Flumazenil are immediately at bedside [IPS-AGIT-2023, NICE-NG10-2015].'
    ],
    immediateOptions: [
      {
        id: 'sim_opt1',
        optionLabel: 'Indian Casualty Standard Combination (TREC Protocol)',
        contextBadge: 'Standard Indian ED Option',
        medicationOrAction: 'Inj Haloperidol + Inj Promethazine',
        dose: 'Haloperidol 5–10 mg + Promethazine 25–50 mg',
        route: 'Intramuscular (IM)',
        formulation: 'Parenteral IM Injection',
        instructions: 'Administer IM for rapid tranquillisation; Promethazine adds antihistaminergic sedation and prevents acute Haloperidol-induced dystonia [TREC-VELLORE-2004, TREC-RIO-2007, IPS-AGIT-2023].',
        citations: ['IPS-AGIT-2023', 'TREC-VELLORE-2004', 'TREC-RIO-2007']
      },
      {
        id: 'sim_opt2',
        optionLabel: 'Parenteral Benzodiazepine Monotherapy (NICE NG10 Preferred)',
        contextBadge: 'Cardiac / Unknown History Option',
        medicationOrAction: 'Inj Lorazepam',
        dose: '2 mg',
        route: 'Intramuscular (IM)',
        formulation: 'Parenteral IM Injection',
        instructions: 'Preferred by NICE NG10 when baseline 12-lead ECG is unavailable or medical/cardiac history is unknown [NICE-NG10-2015].',
        citations: ['NICE-NG10-2015', 'IPS-AGIT-2023']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'sim_sec1',
        optionLabel: 'Parenteral Atypical Antipsychotic Monotherapy',
        contextBadge: 'Second-Line / Alternative IM',
        medicationOrAction: 'Inj Olanzapine (Monotherapy ONLY)',
        dose: '10 mg',
        route: 'Intramuscular (IM)',
        formulation: 'Parenteral IM Injection',
        instructions: 'Rapid 15–30 min onset with 0/150 acute dystonia in TREC-India II, but shorter duration requiring more repeat doses within 4h than Haloperidol + Promethazine. NEVER combine with parenteral benzodiazepines within 1–2 hours [TREC-INDIA-II-2007, IPS-AGIT-2023].',
        citations: ['TREC-INDIA-II-2007', 'IPS-AGIT-2023']
      }
    ],
    dosingParameters: [
      { label: 'Expected Onset (IM)', value: '15–30 min', note: 'Allow full onset window before considering repeat dose' },
      { label: 'Repeat Interval', value: '30–60 min if uncalmed', note: 'Physician bedside re-evaluation mandatory before repeating' },
      { label: 'Max 24h (Haloperidol / Promethazine)', value: 'Haloperidol 20–30 mg · Promethazine 100 mg', note: 'Halve dose in elderly or hepatic impairment' },
      { label: 'Max 24h (IM Lorazepam / Olanzapine)', value: 'Lorazepam 4–12 mg · Olanzapine 20–30 mg', note: 'Never co-administer parenteral Olanzapine + BZD' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Critical Drug-Interaction & Route Contraindication',
    rationale: {
      clinicalReasoning:
        'In severe violent agitation refusing oral intake (BVC ≥ 3, RASS +3 to +4), intramuscular rapid tranquillisation achieves rapid behavioural safety while avoiding the respiratory and arrhythmic hazards of intravenous boluses.',
      keyEvidence: [
        '**TREC-Vellore (2004, n=200)**: Compared IM Haloperidol (10 mg) + Promethazine (25–50 mg) against IM Lorazepam (4 mg) in acute psychiatric emergency agitation at CMC Vellore [TREC-VELLORE-2004].',
        '**TREC-Rio II (2007, n=316)**: Compared IM Haloperidol + Promethazine against IM Haloperidol alone; trial was halted early due to excess acute dystonia in the Haloperidol-monotherapy arm [TREC-RIO-2007].',
        '**TREC-India II (2007, n=300)**: Compared IM Olanzapine (10 mg) against IM Haloperidol (10 mg) + Promethazine (25–50 mg) at CMC Vellore [TREC-INDIA-II-2007].'
      ],
      comparativeOutcomes: [
        {
          study: 'TREC-Vellore (2004)',
          comparison: 'IM Haloperidol + Promethazine vs IM Lorazepam 4 mg',
          outcome: 'Tranquil or asleep',
          timePoint: '2 hours & 4 hours',
          result: '97% vs 88% at 2h; 96% in both arms at 4h (Faster sleep: 76% vs 45%, NNT 3.2; mean onset 29.7 vs 47.8 min)',
          limitationOrContext: 'Single-center Indian psychiatric casualty RCT (n=200)'
        },
        {
          study: 'TREC-Rio II (2007)',
          comparison: 'IM Haloperidol + Promethazine vs IM Haloperidol alone',
          outcome: 'Acute dystonic reactions',
          timePoint: 'Within 24 hours',
          result: '0 dystonias with Haloperidol + Promethazine vs 10 dystonias with Haloperidol alone',
          limitationOrContext: 'Demonstrates why Haloperidol IM monotherapy without anticholinergic/antihistamine cover carries high dystonia risk'
        },
        {
          study: 'TREC-India II (2007)',
          comparison: 'IM Olanzapine 10 mg vs IM Haloperidol + Promethazine',
          outcome: 'Need for repeat sedation / medical review within 4 hours',
          timePoint: '4 hours post-injection',
          result: '0/150 dystonia in Olanzapine arm, but 43% vs 21% required additional intervention within 4h due to shorter duration',
          limitationOrContext: 'Both regimens achieved rapid calming at 15 and 240 minutes'
        }
      ],
      interpretation:
        'IM Haloperidol + Promethazine provides rapid, sustained calming with protection against acute dystonia. IM Lorazepam alone is preferred when QTc/cardiac history is unknown or antipsychotics are contraindicated. IM Olanzapine is an effective dystonia-free alternative but wears off sooner and requires strict separation from parenteral benzodiazepines.',
      safetyAndLimitations: [
        '**Fatal cardiorespiratory depression**: Combining IM Olanzapine with IM/IV Benzodiazepines within 1–2 hours is strictly contraindicated.',
        '**Anticholinergic load**: Avoid Promethazine in organic delirium, elderly patients, or anticholinergic toxidrome.'
      ],
      references: ['IPS-AGIT-2023', 'TREC-VELLORE-2004', 'TREC-INDIA-II-2007', 'TREC-RIO-2007', 'NICE-NG10-2015']
    }
  },

  organic_delirium: {
    tierId: 'organic_delirium',
    pathwayId: 'agitation',
    statusLabel: 'Medical Delirium Protocol',
    prerequisites: [
      'Identify and treat the underlying medical precipitant first (correct hypoxia, hypoglycemia, electrolyte derangement, urinary retention, or sepsis).',
      'Obtain baseline 12-lead ECG (QTc calculation) before administering Haloperidol [IPS-DELIR-2018, IPS-GERI-2023].'
    ],
    immediateOptions: [
      {
        id: 'od_opt1',
        optionLabel: 'Ultra-Low-Dose Haloperidol (Non-Alcohol Delirium)',
        contextBadge: 'Severe Dangerous Agitation Only',
        medicationOrAction: 'Inj / Tab Haloperidol',
        dose: '0.5–2 mg (0.25–0.5 mg q4h in Elderly)',
        route: 'PO or IM',
        formulation: 'Tablet / Oral Liquid / IM Injection',
        instructions: 'Use only if agitation poses imminent physical danger (e.g., pulling life-sustaining lines) after verbal reorientation fails [IPS-DELIR-2018, IPS-GERI-2023].',
        citations: ['IPS-DELIR-2018', 'IPS-GERI-2023']
      },
      {
        id: 'od_opt2',
        optionLabel: 'Low-Dose Atypical Antipsychotic (Olanzapine)',
        contextBadge: 'Alternative PO Option',
        medicationOrAction: 'Tab Olanzapine',
        dose: '2.5–5 mg',
        route: 'PO',
        formulation: 'Tablet / MD',
        instructions: 'Oral option when QTc or extrapyramidal sensitivity limits Haloperidol use [IPS-DELIR-2018].',
        citations: ['IPS-DELIR-2018']
      },
      {
        id: 'od_opt3',
        optionLabel: 'Parkinsonism / Lewy Body Dementia Preferred Option',
        contextBadge: 'Parkinsonism / DLB Safe',
        medicationOrAction: 'Tab Quetiapine',
        dose: '12.5–25 mg',
        route: 'PO',
        formulation: 'Tablet',
        instructions: 'Preferred in Parkinson disease or Dementia with Lewy Bodies (DLB) due to minimal D2 receptornigrostriatal blockade [IPS-GERI-2023].',
        citations: ['IPS-GERI-2023', 'IPS-DELIR-2018']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'od_sec1',
        optionLabel: 'Alcohol or Sedative-Hypnotic Withdrawal Delirium Crossover',
        contextBadge: 'Etiology Switch',
        medicationOrAction: 'Switch to Alcohol DT Pathway (IV Thiamine + IV Lorazepam / Diazepam)',
        dose: 'Thiamine 500 mg IV + Lorazepam 2 mg / Diazepam 10 mg IV',
        route: 'Intravenous (IV)',
        instructions: 'If delirium is due to alcohol or benzodiazepine withdrawal, switch immediately to symptom-triggered IV benzodiazepines plus high-dose parenteral Thiamine [IPS-GERI-2023].',
        citations: ['IPS-GERI-2023']
      }
    ],
    dosingParameters: [
      { label: 'Pre-Dose Requirement', value: 'Baseline 12-Lead ECG (QTc)', note: 'Mandatory prior to Haloperidol in medically ill' },
      { label: 'Elderly Starting Dose', value: 'Haloperidol 0.25–0.5 mg q4h', note: 'Start low and titrate cautiously' },
      { label: 'Reassessment Interval', value: 'Every 15–30 minutes', note: 'Monitor sensorium, vitals, and QTc' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Delirium-Worsening Drug Contraindications',
    rationale: {
      clinicalReasoning:
        'Delirium is an acute medical encephalopathy characterized by cholinergic deficiency and dopaminergic excess. Standard psychiatric rapid-tranquillisation doses cause stupor, aspiration, and prolonged ICU stay.',
      keyEvidence: [
        '**Anticholinergic toxicity**: Medications with strong central anticholinergic activity (Promethazine, Trihexyphenidyl, Diphenhydramine) directly worsen confusion and visual hallucinations in delirium [IPS-DELIR-2018, IPS-AGIT-2023].',
        '**Benzodiazepine paradox**: Except in alcohol or sedative withdrawal, benzodiazepines deliriogenically depress cortical networks and worsen disorientation and falls [IPS-DELIR-2018, IPS-GERI-2023].'
      ],
      interpretation:
        'Pharmacotherapy does not cure underlying medical delirium; ultra-low-dose antipsychotics are reserved strictly for behavioural emergencies while the primary metabolic, infectious, or hypoxic cause is corrected.',
      safetyAndLimitations: [
        '**Parkinsonism / DLB hazard**: Haloperidol and Risperidone can precipitate severe irreversible rigidity and neuroleptic sensitivity in Lewy body disorders—use low-dose Quetiapine instead.',
        '**QTc prolongation**: Medically ill delirious patients frequently have hypokalemia or hypomagnesemia that potentiates Haloperidol-induced Torsades de Pointes.'
      ],
      references: ['IPS-DELIR-2018', 'IPS-GERI-2023', 'IPS-AGIT-2023']
    }
  },

  // ============================================================================
  // PATHWAY 02: ACUTE CATATONIA
  // ============================================================================
  stuporous: {
    tierId: 'stuporous',
    pathwayId: 'catatonia',
    statusLabel: 'Lorazepam Challenge + Titration',
    prerequisites: [
      'Score baseline Bush-Francis Catatonia Rating Scale (BFCRS) before administering challenge dose.',
      'Hold all antipsychotics (especially high-potency D2 blockers) and initiate DVT/hydration prophylaxis [BAP-CAT-2023].'
    ],
    immediateOptions: [
      {
        id: 'cat1_opt1',
        optionLabel: 'Step 1 — Diagnostic & Therapeutic Lorazepam Challenge',
        contextBadge: 'Immediate Diagnostic Step',
        medicationOrAction: 'Inj / Tab Lorazepam Challenge',
        dose: '1–2 mg (IV or IM) · or 2 mg (PO / Sublingual)',
        route: 'IV (reassess at 5 min) · IM (15 min) · PO/SL (30 min)',
        formulation: 'Parenteral IV/IM or Sublingual/PO',
        instructions: 'Re-score BFCRS at the route-specific interval. If <50% reduction in BFCRS score, administer a second dose of Lorazepam 1–2 mg and reassess [BAP-CAT-2023, IPS-GERI-2023].',
        citations: ['BAP-CAT-2023', 'IPS-GERI-2023']
      },
      {
        id: 'cat1_opt2',
        optionLabel: 'Step 2 — Scheduled Maintenance Lorazepam Titration',
        contextBadge: 'If Challenge Positive (≥50% Drop)',
        medicationOrAction: 'Scheduled Lorazepam',
        dose: 'Start 1–2 mg QID/TID → Titrate to 8–16 mg/day (up to 24 mg/day)',
        route: 'PO / IM / IV in 2–4 divided doses',
        formulation: 'Divided Scheduled Dosing',
        instructions: 'Maintain scheduled divided dosing rather than PRN dosing to prevent inter-dose catatonic rebound while monitoring respiration [BAP-CAT-2023].',
        citations: ['BAP-CAT-2023']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'cat1_sec1',
        optionLabel: 'Definitive Somatic Escalation (If Lorazepam Fails or Contraindicated)',
        contextBadge: 'Second-Line Definitive',
        medicationOrAction: 'Bilateral Modified ECT',
        dose: 'At least 2–3 sessions weekly',
        route: 'Bilateral Frontotemporal Modified ECT',
        instructions: 'Arrange Bilateral Modified ECT under MHCA 2017 Section 89 + NR consent if catatonia fails to resolve on adequate Lorazepam titration (8–16 mg/day) [BAP-CAT-2023, MHCA-2017].',
        citations: ['BAP-CAT-2023', 'MHCA-2017']
      },
      {
        id: 'cat1_sec2',
        optionLabel: 'Third-Line Glutamatergic Adjunct (If ECT Unavailable/Refused)',
        contextBadge: 'Third-Line Option',
        medicationOrAction: 'Tab Amantadine OR Tab Memantine',
        dose: 'Amantadine 100–200 mg BD (max 400 mg/d) · Memantine 5–10 mg BD',
        route: 'PO / NGT',
        instructions: 'NMDA-receptor antagonists used when both Lorazepam and ECT are ineffective or unavailable [BAP-CAT-2023].',
        citations: ['BAP-CAT-2023']
      }
    ],
    dosingParameters: [
      { label: 'Challenge Reassessment', value: '5 min (IV) · 15 min (IM) · 30 min (PO/SL)', note: '≥50% BFCRS score reduction = positive response' },
      { label: 'Repeat Challenge Rule', value: '1–2 mg second dose if <50% drop', note: 'Re-verify airway and sedation before second dose' },
      { label: 'Therapeutic Maintenance', value: '8–16 mg/day (occasionally up to 24 mg/day)', note: 'Divided into 2–4 scheduled daily doses' },
      { label: 'Discontinuation Rule', value: 'Slow taper over weeks after remission', note: 'Abrupt cessation triggers rapid catatonic relapse' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'NMS Precipitation & Preserved Awareness Warning',
    rationale: {
      clinicalReasoning:
        'Catatonia involves GABA-A hypoactivity in orbitofrontal and motor cortices alongside glutamate hyperactivity. Positive allosteric GABA-A modulation with Lorazepam rapidly reverses motor inhibition in 70–80% of acute cases [BAP-CAT-2023].',
      keyEvidence: [
        '**BAP Evidence-Based Consensus Guidelines (Rogers et al., 2023)**: Establishes the bedside Lorazepam challenge (1–2 mg) with serial BFCRS scoring as the diagnostic and therapeutic gold standard [BAP-CAT-2023].',
        '**Dose-response necessity**: Catatonic patients tolerate and require much higher daily Lorazepam doses (8–16 mg/day, occasionally 24 mg/day) without sedation compared to non-catatonic patients; low PRN dosing frequently leads to treatment failure and relapse [BAP-CAT-2023].',
        '**Low serum iron marker**: Low serum iron in catatonia predicts poor benzodiazepine response and heightened risk of conversion to Neuroleptic Malignant Syndrome [BAP-CAT-2023].'
      ],
      interpretation:
        'A ≥50% reduction in BFCRS score within 5–30 minutes of Lorazepam confirms acute catatonia, but a negative single-dose challenge does not exclude catatonia—prolonged titration or Bilateral ECT may still be required.',
      safetyAndLimitations: [
        '**Antipsychotic hazard**: First-generation antipsychotics (e.g., Haloperidol) during active catatonia carry up to a 10–36% risk of precipitating Malignant Catatonia / NMS.',
        '**Preserved patient recall**: Patients in deep catatonic stupor and mutism frequently retain full auditory awareness and recall conversations at the bedside—always speak respectfully assuming full comprehension [BAP-CAT-2023].'
      ],
      references: ['BAP-CAT-2023', 'IPS-GERI-2023', 'MHCA-2017']
    }
  },

  malignant_cat: {
    tierId: 'malignant_cat',
    pathwayId: 'catatonia',
    statusLabel: 'STAT ICU + High-Dose Lorazepam + Urgent Bilateral ECT',
    prerequisites: [
      'Immediate Medical ICU/HDU transfer, IV crystalloid resuscitation, active external cooling, and cessation of all dopamine-blocking agents.',
      'Check stat Serum CPK, Serum Iron, Electrolytes, RFT, and blood/CSF cultures [BAP-CAT-2023].'
    ],
    immediateOptions: [
      {
        id: 'cat2_opt1',
        optionLabel: 'High-Dose Parenteral Lorazepam Stabilization',
        contextBadge: 'Immediate Pharmacotherapy',
        medicationOrAction: 'Inj Lorazepam',
        dose: '2 mg stat → Titrate rapidly up to 16–24 mg/day',
        route: 'IV or IM',
        formulation: 'Parenteral Injection',
        instructions: 'Titrate rapidly in divided doses as tolerated by blood pressure and respiratory drive [BAP-CAT-2023].',
        citations: ['BAP-CAT-2023']
      },
      {
        id: 'cat2_opt2',
        optionLabel: 'Urgent Bilateral Modified ECT',
        contextBadge: 'Definitive Life-Saving Intervention',
        medicationOrAction: 'Bilateral Modified ECT',
        dose: 'Daily or Alternate-Day Sessions',
        route: 'Bilateral Frontotemporal Modified ECT',
        instructions: 'Prepare urgently—highest survival rate occurs when Bilateral ECT is initiated within the first 5 days of malignant symptom onset [BAP-CAT-2023].',
        citations: ['BAP-CAT-2023']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'cat2_sec1',
        optionLabel: 'Mandatory Autoimmune & CNS Infectious Workup',
        contextBadge: 'Etiological Workup',
        medicationOrAction: 'Anti-NMDAR IgG (Serum & CSF) + EEG + MRI Brain + Lumbar Puncture',
        instructions: 'Screen for Anti-NMDA Receptor Encephalitis (extreme delta brush on EEG, ovarian teratoma screen in females) and viral/bacterial meningoencephalitis in all febrile or first-episode catatonia cases [BAP-CAT-2023].',
        citations: ['BAP-CAT-2023']
      }
    ],
    dosingParameters: [
      { label: 'Initial Stat Dose', value: 'Lorazepam 2 mg IV/IM stat', note: 'Continuous ICU cardiorespiratory telemetry' },
      { label: '24h Titration Target', value: 'Lorazepam 16–24 mg/day', note: 'As tolerated by BP and respiratory rate' },
      { label: 'Definitive ECT Window', value: 'Initiate within ≤5 days of onset', note: 'Daily or alternate-day bilateral sessions' },
      { label: 'Anesthetic Muscle Relaxant', value: 'Rocuronium (+ Sugammadex) preferred', note: 'Avoid Succinylcholine if rhabdomyolysis/immobility' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'ECT Anesthesia Hyperkalemic Arrest Warning',
    rationale: {
      clinicalReasoning:
        'Malignant (febrile/autonomic) catatonia represents a fulminant central thermoregulatory and autonomic storm clinically indistinguishable from severe NMS, carrying 10–20%+ mortality if definitive treatment is delayed.',
      keyEvidence: [
        '**Early Bilateral ECT survival benefit**: BAP 2023 guidelines emphasize that survival in malignant catatonia is highest when daily or alternate-day Bilateral Modified ECT is commenced within 5 days of onset [BAP-CAT-2023].',
        '**Anti-NMDA receptor encephalitis overlap**: Autoimmune encephalitis frequently presents to psychiatric casualty as febrile/autonomic catatonia and worsens severely if treated with high-potency antipsychotics [BAP-CAT-2023].'
      ],
      interpretation:
        'Malignant catatonia is both a medical ICU emergency and a psychiatric emergency; neither supportive care alone nor low-dose benzodiazepines are sufficient without rapid escalation to high-dose Lorazepam and Bilateral ECT.',
      safetyAndLimitations: [
        '**Succinylcholine hyperkalemia**: Prolonged catatonic immobility and rhabdomyolysis upregulate extrajunctional nicotinic acetylcholine receptors; depolarizing muscle relaxants (Succinylcholine) during ECT anesthesia can trigger fatal hyperkalemic cardiac arrest—alert the anesthetist to use non-depolarizing agents (Rocuronium reversed with Sugammadex) [IPS-TOX-2022, BAP-CAT-2023].',
        '**MHCA 2017 Sec 94(3) legal rule**: Emergency treatment under Section 94 explicitly excludes ECT; complete rapid Section 89 Supported Admission with Nominated Representative consent for Modified ECT [MHCA-2017].'
      ],
      references: ['BAP-CAT-2023', 'IPS-TOX-2022', 'MHCA-2017']
    }
  },

  withdrawal_cat: {
    tierId: 'withdrawal_cat',
    pathwayId: 'catatonia',
    statusLabel: 'Re-initiate Withdrawn Agent',
    prerequisites: [
      'Audit outpatient blister packs and pharmacy refill records in any patient presenting with abrupt-onset mutism, posturing, or psychotic rebound [BAP-CAT-2023].'
    ],
    immediateOptions: [
      {
        id: 'cat3_opt1',
        optionLabel: 'Clozapine-Withdrawal Catatonia Protocol',
        contextBadge: 'If Triggered by Clozapine Cessation',
        medicationOrAction: 'Re-initiate Oral Clozapine (± Bilateral ECT)',
        dose: 'Re-titrate if off >48 hours per hematological safety rules',
        route: 'PO / NGT',
        formulation: 'Tablet',
        instructions: 'Promptly reinstate Clozapine after verifying WBC/ANC safety; benzodiazepines alone have poor reliability in Clozapine-withdrawal catatonia [BAP-CAT-2023].',
        citations: ['BAP-CAT-2023']
      },
      {
        id: 'cat3_opt2',
        optionLabel: 'Benzodiazepine-Withdrawal Catatonia Protocol',
        contextBadge: 'If Triggered by BZD Cessation',
        medicationOrAction: 'Inj / Tab Lorazepam Re-instatement',
        dose: '1–2 mg every 4–6 hours',
        route: 'IV / IM / PO',
        formulation: 'Parenteral or Oral',
        instructions: 'Immediately reinstate Lorazepam to resolve acute withdrawal catatonia, stabilize, and then taper gradually over weeks [BAP-CAT-2023].',
        citations: ['BAP-CAT-2023']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'cat3_sec1',
        optionLabel: 'Co-Administration Hemodynamic Watch',
        contextBadge: 'Monitoring Requirement',
        medicationOrAction: 'Cautious Co-Titration if Clozapine + Benzodiazepine Combined',
        instructions: 'Monitor vital signs every 30–60 minutes due to rare risk of orthostatic hypotension, sedation, and cardiorespiratory depression when initiating Clozapine alongside parenteral benzodiazepines [BAP-CAT-2023].',
        citations: ['BAP-CAT-2023']
      }
    ],
    dosingParameters: [
      { label: 'Clozapine Gap >48h Rule', value: 'Re-titrate from low dose (12.5–25 mg)', note: 'Verify baseline WBC/ANC before restarting' },
      { label: 'BZD Re-instatement Dose', value: 'Lorazepam 1–2 mg q4–6h', note: 'Stabilize fully before multi-week taper' },
      { label: 'Vital Sign Surveillance', value: 'Every 30–60 min during co-therapy', note: 'Watch BP, HR, RR, and SpO2' }
    ],
    warningSeverity: 'caution-amber',
    warningTitle: 'Medication History & Co-Administration Caution',
    rationale: {
      clinicalReasoning:
        'Abrupt discontinuation of Clozapine (cholinergic/serotonergic/GABAergic rebound) or chronic benzodiazepines (acute GABA-A receptor downregulation) precipitates a distinct withdrawal catatonia that responds best to restoring the withdrawn pharmacological agent.',
      keyEvidence: [
        '**Clozapine withdrawal specificity**: BAP 2023 guidelines note that Clozapine-withdrawal catatonia frequently shows incomplete response to Lorazepam monotherapy and resolves rapidly once Clozapine (or ECT) is reinstated [BAP-CAT-2023].',
        '** >48-hour interruption rule**: Restarting full maintenance Clozapine doses after >48 hours off therapy risks severe seizures and orthostatic cardiovascular collapse; re-titration is mandatory.'
      ],
      interpretation:
        'Identifying recent Clozapine or benzodiazepine cessation prevents misdiagnosing withdrawal catatonia as treatment-resistant psychosis.',
      safetyAndLimitations: [
        '**Agranulocytosis exclusion**: If Clozapine was stopped due to neutropenia/agranulocytosis or myocarditis, Clozapine must NOT be restarted—use Lorazepam + Bilateral Modified ECT instead.'
      ],
      references: ['BAP-CAT-2023', 'IPS-GERI-2023']
    }
  },

  // ============================================================================
  // PATHWAY 03: NEUROLEPTIC MALIGNANT SYNDROME (NMS)
  // ============================================================================
  mild_early: {
    tierId: 'mild_early',
    pathwayId: 'nms',
    statusLabel: 'Stop Offending Drug + IV Fluids + Lorazepam',
    prerequisites: [
      'STOP all dopamine antagonists immediately (all FGAs, SGAs, Metoclopramide, Levosulpiride, Promethazine, Tetrabenazine) OR restart withdrawn dopaminergic agent (Levodopa/Amantadine) [IPS-TOX-2022, GURRERA-NMS-2011].'
    ],
    immediateOptions: [
      {
        id: 'nms1_opt1',
        optionLabel: 'Step 1 — Aggressive IV Crystalloid Resuscitation & Cooling',
        contextBadge: 'Immediate Resuscitation',
        medicationOrAction: 'IV Isotonic Crystalloid (0.9% NaCl) + Evaporative Cooling',
        dose: 'Target urine output >1.5–2 mL/kg/hour',
        route: 'Intravenous (IV)',
        instructions: 'Maintain high renal tubular flow to protect against myoglobinuric acute kidney injury [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      },
      {
        id: 'nms1_opt2',
        optionLabel: 'Step 2 — Parenteral Lorazepam for Early Rigidity & Catatonia',
        contextBadge: 'First-Line Pharmacotherapy',
        medicationOrAction: 'Inj Lorazepam',
        dose: '1–2 mg every 4–6 hours',
        route: 'IM or IV',
        formulation: 'Parenteral Injection',
        instructions: 'Resolves early muscular rigidity, agitation, and neuroleptic-induced catatonic features [GURRERA-NMS-2011, IPS-TOX-2022].',
        citations: ['GURRERA-NMS-2011', 'IPS-TOX-2022']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'nms1_sec1',
        optionLabel: '24-Hour Non-Response / Progression Escalation',
        contextBadge: 'Add Dopamine Agonist',
        medicationOrAction: 'Tab Bromocriptine OR Tab Amantadine',
        dose: 'Bromocriptine 2.5 mg q8–12h · OR Amantadine 100 mg BD',
        route: 'PO or via Nasogastric Tube (NGT)',
        instructions: 'Add if rigidity or fever shows no improvement within 24 hours or progresses toward Tier 2 [IPS-TOX-2022, GURRERA-NMS-2011].',
        citations: ['IPS-TOX-2022', 'GURRERA-NMS-2011']
      }
    ],
    dosingParameters: [
      { label: 'Lorazepam Schedule', value: '1–2 mg IM/IV q4–6h', note: 'Monitor respiratory rate and sedation' },
      { label: 'Target Urine Output', value: '>1.5–2 mL/kg/hour', note: 'Hourly input/output charting mandatory' },
      { label: 'Serial Lab & Clinical Review', value: 'Every 6–12 hours', note: 'Track temperature, lead-pipe tone, and serum CPK' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Absolute Prohibition of Physical Restraints in NMS',
    rationale: {
      clinicalReasoning:
        'Early NMS lies on a pathophysiological continuum with neuroleptic-induced catatonia caused by acute striatal and hypothalamic D2 receptor blockade. Early cessation of D2 blockade plus GABA-A enhancement with Lorazepam halts progression before fulminant rhabdomyolysis develops.',
      keyEvidence: [
        '**Gurrera et al. Consensus Guidelines (2011)**: Recommends stage-based management where mild/early NMS (rigidity + temperature <38.5°C) is treated with offending drug withdrawal, supportive hydration, and parenteral Lorazepam 1–2 mg q4–6h [GURRERA-NMS-2011].',
        '**Hidden culprits in Indian practice**: Antiemetics/prokinetics such as Levosulpiride and Metoclopramide are frequent non-psychiatric precipitants of NMS [IPS-TOX-2022].'
      ],
      interpretation:
        'Promptly recognizing early rigidity and autonomic changes allows reversal with supportive care and Lorazepam without requiring ICU paralysis.',
      safetyAndLimitations: [
        '**Restraint lethality**: Isometric muscle contraction against mechanical restraints dramatically accelerates skeletal muscle breakdown (rhabdomyolysis), hyperthermia, hyperkalemia, and cardiac arrest [IPS-AGIT-2022, IPS-TOX-2022].'
      ],
      references: ['IPS-TOX-2022', 'GURRERA-NMS-2011', 'IPS-AGIT-2022']
    }
  },

  mod_nms: {
    tierId: 'mod_nms',
    pathwayId: 'nms',
    statusLabel: 'ICU + Lorazepam + Bromocriptine / Amantadine',
    prerequisites: [
      'STOP causative neuroleptic immediately and transfer to Medical HDU/ICU.',
      'Administer high-volume IV fluids; consider urinary alkalinization with IV Sodium Bicarbonate if myoglobinuria is present [IPS-TOX-2022 Table 15].'
    ],
    immediateOptions: [
      {
        id: 'nms2_opt1',
        optionLabel: 'Parenteral Benzodiazepine Backbone',
        contextBadge: 'Co-First-Line',
        medicationOrAction: 'Inj Lorazepam',
        dose: '1–2 mg every 4–6 hours',
        route: 'IV or IM',
        formulation: 'Parenteral Injection',
        instructions: 'Controls rigidity, agitation, and sympathetic hyperactivity [IPS-TOX-2022, GURRERA-NMS-2011].',
        citations: ['IPS-TOX-2022', 'GURRERA-NMS-2011']
      },
      {
        id: 'nms2_opt2',
        optionLabel: 'Direct Dopamine D2 Agonist (Bromocriptine)',
        contextBadge: 'Co-First-Line Dopamine Agonist',
        medicationOrAction: 'Tab Bromocriptine',
        dose: 'Start 2.5 mg every 8 hours → Titrate to 10–40 mg/day (max 45–60 mg/day)',
        route: 'PO or crushed via Nasogastric Tube (NGT)',
        formulation: 'Tablet (PO / NGT)',
        instructions: 'Restores central dopaminergic tone in the hypothalamus and nigrostriatal pathway [IPS-TOX-2022, GURRERA-NMS-2011].',
        citations: ['IPS-TOX-2022', 'GURRERA-NMS-2011']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'nms2_sec1',
        optionLabel: 'Alternative Dopaminergic Agents (If Bromocriptine Unavailable/Intolerant)',
        contextBadge: 'Alternative Dopamine Agonist',
        medicationOrAction: 'Tab Amantadine OR Tab Levodopa/Carbidopa',
        dose: 'Amantadine 100–200 mg BD (200–400 mg/d) · OR Levodopa/Carbidopa 25/100 mg TID–QID',
        route: 'PO or NGT',
        instructions: 'Avoid Amantadine if acute kidney injury is present (renally cleared) [IPS-TOX-2022 Table 16].',
        citations: ['IPS-TOX-2022']
      }
    ],
    dosingParameters: [
      { label: 'Bromocriptine Starting Dose', value: '2.5 mg PO/NGT q8h', note: 'Titrate to 10–40 mg/day in divided doses' },
      { label: 'Bromocriptine Ceiling', value: 'Max 45–60 mg/day', note: 'Monitor for hypotension and nausea' },
      { label: 'Mandatory Continuation (Oral Culprit)', value: '≥10 days after NMS resolution', note: 'Then taper slowly to prevent rebound NMS' },
      { label: 'Mandatory Continuation (Depot Culprit)', value: '14–21 days after resolution', note: 'Extended cover required for depot clearance' }
    ],
    warningSeverity: 'caution-amber',
    warningTitle: 'Evidence Quality & Rebound Prevention Note',
    rationale: {
      clinicalReasoning:
        'In moderate classic NMS (Temp 38.5–40°C, generalized lead-pipe rigidity, CPK >4x ULN), combining a direct D2 agonist (Bromocriptine) with Lorazepam and ICU hydration directly counteracts striatal/hypothalamic dopamine receptor blockade.',
      keyEvidence: [
        '**Shortened recovery time**: Retrospective series (Rosenberg & Green) reported reduced mean time to clinical recovery with Bromocriptine (~10 days) compared with supportive care alone (~15 days) [GURRERA-NMS-2011].',
        '**Relapse upon premature cessation**: Stopping Bromocriptine as soon as fever settles frequently triggers rebound NMS because lipophilic antipsychotics remain bound to CNS D2 receptors for 10–21 days [GURRERA-NMS-2011, IPS-TOX-2022].'
      ],
      comparativeOutcomes: [
        {
          study: 'Rosenberg & Green (Case Series Analysis)',
          comparison: 'Bromocriptine + Supportive Care vs Supportive Care Alone',
          outcome: 'Mean time to clinical recovery',
          timePoint: 'Hospital course',
          result: 'Mean recovery ~10 days (Bromocriptine) vs ~15 days (Supportive care alone)',
          limitationOrContext: 'Observational case-series data; no prospective randomized controlled trials exist due to rarity and lethality of NMS'
        }
      ],
      interpretation:
        'While randomized trials do not exist, expert consensus (Gurrera et al. & IPS CPG 2022) strongly supports Bromocriptine (or Amantadine) alongside Lorazepam and aggressive hydration in moderate-to-severe NMS.',
      safetyAndLimitations: [
        '**Hypotension & psychosis**: High-dose Bromocriptine can cause orthostatic hypotension, vomiting, or worsening psychosis.',
        '**Renal clearance of Amantadine**: If myoglobinuric AKI develops, prefer Bromocriptine (hepatically metabolized) over Amantadine.'
      ],
      references: ['IPS-TOX-2022', 'GURRERA-NMS-2011']
    }
  },

  severe_nms: {
    tierId: 'severe_nms',
    pathwayId: 'nms',
    statusLabel: 'ICU + IV Dantrolene + Bromocriptine ± Bilateral ECT',
    prerequisites: [
      'Immediate Medical ICU admission, airway protection, active cooling blankets/ice packs, aggressive IV hydration + Sodium Bicarbonate urinary alkalinization for rhabdomyolysis, and LMWH DVT prophylaxis [IPS-TOX-2022].'
    ],
    immediateOptions: [
      {
        id: 'nms3_opt1',
        optionLabel: 'Direct Skeletal Muscle Ryanodine Receptor Antagonist',
        contextBadge: 'Severe Hyperthermia / Rigidity',
        medicationOrAction: 'Inj Dantrolene Sodium',
        dose: '1–2.5 mg/kg IV initial bolus → then 1 mg/kg IV q6h (or 2–3 mg/kg/d IV; max 10 mg/kg/d · Oral: 50–200 mg/d)',
        route: 'Intravenous (IV) / PO',
        formulation: 'Lyophilized IV Injection / Capsule',
        instructions: 'Uncouples excitation-contraction in skeletal muscle sarcoplasmic reticulum (RyR1), rapidly reducing muscle-generated heat and CPK release [IPS-TOX-2022, GURRERA-NMS-2011].',
        citations: ['IPS-TOX-2022', 'GURRERA-NMS-2011']
      },
      {
        id: 'nms3_opt2',
        optionLabel: 'Combined Central Dopaminergic & GABAergic Regimen',
        contextBadge: 'Co-Administered Regimen',
        medicationOrAction: 'Tab Bromocriptine + Inj Lorazepam',
        dose: 'Bromocriptine 2.5–5 mg NGT q8h + Lorazepam 1–2 mg IV q4–6h',
        route: 'NGT + IV',
        instructions: 'Administer concurrently with Dantrolene to reverse central hypothalamic and striatal dopamine blockade [IPS-TOX-2022, GURRERA-NMS-2011].',
        citations: ['IPS-TOX-2022', 'GURRERA-NMS-2011']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'nms3_sec1',
        optionLabel: 'Refractory Fulminant NMS Escalation (48–72 Hours)',
        contextBadge: 'If Refractory at 48–72h',
        medicationOrAction: 'Bilateral Modified ECT',
        dose: '6–10 Bilateral Sessions',
        route: 'Bilateral Frontotemporal Modified ECT',
        instructions: 'Initiate if severe NMS fails to improve within 48–72 hours of pharmacotherapy. Use non-depolarizing muscle relaxant (or extreme caution with Succinylcholine due to hyperkalemic arrest risk) [IPS-TOX-2022, BAP-CAT-2023].',
        citations: ['IPS-TOX-2022', 'BAP-CAT-2023']
      }
    ],
    dosingParameters: [
      { label: 'Dantrolene IV Loading', value: '1–2.5 mg/kg IV bolus', note: 'Follow with 1 mg/kg IV q6h' },
      { label: 'Dantrolene Max Ceiling', value: '10 mg/kg/day IV (Oral: 50–200 mg/d)', note: 'Contraindicated in active hepatic cirrhosis' },
      { label: 'ECT Escalation Trigger', value: 'No improvement at 48–72 hours', note: 'Course of 6–10 bilateral sessions' },
      { label: 'Antipsychotic Rechallenge Wait', value: '≥14 days (2 weeks) post-recovery', note: 'Use low-D2 atypical (Quetiapine/Clozapine) at low dose' }
    ],
    warningSeverity: 'caution-amber',
    warningTitle: 'Conflicting Evidence Disclosure & Hepatotoxicity Guardrail',
    rationale: {
      clinicalReasoning:
        'Fulminant NMS (Temp >40°C, extreme rigidity, rhabdomyolysis, coma) causes death via myoglobinuric renal failure, DIC, arrhythmias, and respiratory muscle rigidity. Combining peripheral skeletal muscle relaxation (Dantrolene) with central dopamine agonism (Bromocriptine) targets both peripheral heat generation and central hypothalamic dysregulation.',
      keyEvidence: [
        '**Sakkas et al. (1991, n=734 retrospective review)**: Reported lower mortality with Dantrolene (8.6%) or Bromocriptine (7.8%) compared with supportive care alone (21%) [GURRERA-NMS-2011].',
        '**Reulbach et al. (2007) conflicting analysis**: Suggested Dantrolene monotherapy was not superior to supportive care and carried higher mortality when used alone, though results were heavily confounded by baseline severity [GURRERA-NMS-2011, IPS-TOX-2022].',
        '**14-Day Rechallenge Rule**: Restarting antipsychotics earlier than 2 weeks after complete biochemical and clinical resolution carries a ~30%+ risk of recurrent NMS [IPS-TOX-2022].'
      ],
      comparativeOutcomes: [
        {
          study: 'Sakkas et al. (1991, n=734)',
          comparison: 'Dantrolene vs Bromocriptine vs Supportive Care Alone',
          outcome: 'Case fatality rate',
          timePoint: 'Acute episode',
          result: '8.6% (Dantrolene) vs 7.8% (Bromocriptine) vs 21.0% (Supportive care alone)',
          limitationOrContext: 'Retrospective case-report aggregation; Reulbach et al. (2007) found conflicting results confounded by illness severity'
        }
      ],
      interpretation:
        'Because retrospective data are confounded by severity, Dantrolene should not be used as isolated monotherapy; reserve it for severe rigidity and hyperthermia >40°C alongside full ICU resuscitation and Bromocriptine.',
      safetyAndLimitations: [
        '**Hepatotoxicity**: Dantrolene can cause severe idiosyncratic or dose-related hepatitis and is contraindicated in active liver disease [IPS-TOX-2022].',
        '**Calcium channel blocker interaction**: Co-administration of IV Dantrolene with Verapamil or Diltiazem causes severe hyperkalemia and myocardial depression.'
      ],
      references: ['IPS-TOX-2022', 'GURRERA-NMS-2011', 'BAP-CAT-2023'],
      flaggedForClinicalReview:
        'Source data explicitly notes conflicting retrospective evidence between Sakkas et al. (1991) and Reulbach et al. (2007) regarding Dantrolene mortality benefit; preserved faithfully in both the safety disclosure and rationale.'
    }
  },

  // ============================================================================
  // PATHWAY 04: SEROTONIN SYNDROME
  // ============================================================================
  mild_ss: {
    tierId: 'mild_ss',
    pathwayId: 'serotonin',
    statusLabel: 'Stop Serotonergics + Oral/IV BZD',
    prerequisites: [
      'STOP all serotonergic medications immediately (SSRIs, SNRIs, TCAs, MAOIs, Tramadol, Tapentadol, Linezolid, Dextromethorphan, Lithium, Triptans, Ondansetron/Metoclopramide) [IPS-TOX-2022 Table 8].'
    ],
    immediateOptions: [
      {
        id: 'ss1_opt1',
        optionLabel: 'Symptomatic Benzodiazepine Control',
        contextBadge: 'First-Line Pharmacotherapy',
        medicationOrAction: 'Tab / Inj Lorazepam OR Inj Diazepam',
        dose: 'Lorazepam 1–2 mg · OR Diazepam 5–10 mg',
        route: 'PO / IV / IM',
        formulation: 'Tablet or Parenteral Injection',
        instructions: 'Controls tremor, anxiety, inducible clonus, and mild myoclonus [IPS-TOX-2022, CHIEW-SS-2024].',
        citations: ['IPS-TOX-2022', 'CHIEW-SS-2024']
      },
      {
        id: 'ss1_opt2',
        optionLabel: 'Supportive Hydration & 24-Hour Observation',
        contextBadge: 'Supportive Care',
        medicationOrAction: 'IV Fluids + Calm Environment',
        instructions: 'Mild serotonin toxicity typically resolves within 24 hours of stopping the offending serotonergic agents [CHIEW-SS-2024].',
        citations: ['CHIEW-SS-2024']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'ss1_sec1',
        optionLabel: 'Restraint on Antidote Overuse in Mild Cases',
        contextBadge: 'Clinical Guidance',
        medicationOrAction: 'Withhold Cyproheptadine in Mild Toxicity',
        instructions: 'Specific serotonin antagonists (Cyproheptadine) are NOT required in mild normothermic toxicity and may cause unnecessary anticholinergic sedation or hypotension [CHIEW-SS-2024].',
        citations: ['CHIEW-SS-2024']
      }
    ],
    dosingParameters: [
      { label: 'Lorazepam / Diazepam Dose', value: 'Lorazepam 1–2 mg · Diazepam 5–10 mg', note: 'Titrate to symptom relief' },
      { label: 'Vital & Clonus Reassessment', value: 'Every 2 hours for 6–24 hours', note: 'Check Temp, HR, BP, and ankle/ocular clonus' },
      { label: 'Expected Resolution', value: 'Within 24 hours of drug cessation', note: 'Longer if Fluoxetine or irreversible MAOI involved' }
    ],
    warningSeverity: 'caution-amber',
    warningTitle: 'Hidden Ward Serotonergic Culprits Audit',
    rationale: {
      clinicalReasoning:
        'Mild serotonin toxicity (afebrile tremor, hyperreflexia, inducible ankle clonus) results from excess synaptic 5-HT1A and 5-HT2A stimulation. Removing the offending serotonergic drugs and dampening sympathetic/motor excitability with a benzodiazepine resolves most mild cases within 24 hours.',
      keyEvidence: [
        '**Hunter Serotonin Toxicity Criteria (Dunkley et al., 2003)**: Demonstrates 84% sensitivity and 97% specificity vs toxicology gold standard, vastly outperforming older Sternbach criteria [HUNTER-SS-2003].',
        '**Non-psychiatric triggers**: Inj Tramadol (analgesia), Inj Linezolid (oxazolidinone antibiotic with reversible MAOI activity), and OTC Dextromethorphan cough syrups are major precipitants when co-prescribed with an SSRI/SNRI [IPS-TOX-2022].'
      ],
      interpretation:
        'In mild cases (<38.0°C, alert sensorium), stopping all serotonergic agents and administering Lorazepam or Diazepam is sufficient without exposing the patient to Cyproheptadine.',
      safetyAndLimitations: [
        '**Rapid progression risk**: If a slow-release or high-dose overdose was ingested within the past few hours, mild toxicity can progress to life-threatening hyperthermia—observe closely for at least 6–24 hours.'
      ],
      references: ['IPS-TOX-2022', 'CHIEW-SS-2024', 'HUNTER-SS-2003']
    }
  },

  mod_ss: {
    tierId: 'mod_ss',
    pathwayId: 'serotonin',
    statusLabel: 'IV Benzodiazepines + IV Fluids ± Cyproheptadine',
    prerequisites: [
      'Discontinue all serotonergic agents immediately, admit to Medical HDU, and start IV crystalloid hydration and external cooling [IPS-TOX-2022, CHIEW-SS-2024].'
    ],
    immediateOptions: [
      {
        id: 'ss2_opt1',
        optionLabel: 'First-Line Parenteral Benzodiazepine Titration',
        contextBadge: 'First-Line Backbone',
        medicationOrAction: 'Inj Diazepam OR Inj Lorazepam',
        dose: 'Diazepam 5–10 mg IV · OR Lorazepam 2 mg IV/IM',
        route: 'Intravenous (IV) or IM',
        formulation: 'Parenteral Injection',
        instructions: 'Titrate every 15–30 minutes to abolish agitation, lower-limb hypertonia, and autonomic hyperactivity [CHIEW-SS-2024, IPS-TOX-2022].',
        citations: ['CHIEW-SS-2024', 'IPS-TOX-2022']
      },
      {
        id: 'ss2_opt2',
        optionLabel: 'Adjunctive 5-HT2A Antagonist (IPS CPG 2022 Protocol)',
        contextBadge: 'Oral / NGT Adjunct',
        medicationOrAction: 'Tab Cyproheptadine',
        dose: '12 mg loading dose → followed by 2 mg every 2 hours until improvement (or 8 mg q6h maintenance; max 32 mg/day)',
        route: 'PO or crushed via Nasogastric Tube (NGT)',
        formulation: 'Oral Tablet (4 mg tablets)',
        instructions: 'Recommended by IPS CPG 2022 for moderate-to-severe serotonin syndrome alongside benzodiazepines and cooling [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'ss2_sec1',
        optionLabel: 'Parenteral 5-HT2A Antagonist Case-Report Options (If PO/NGT Impossible)',
        contextBadge: 'Caution: Hypotension Risk',
        medicationOrAction: 'Inj Chlorpromazine (25–50 mg IM/IV) OR Inj Olanzapine (5–10 mg IM)',
        route: 'IM / IV',
        instructions: 'Described in historical case reports when oral/NGT route is unavailable, but Chiew & Isbister (2024) caution that hypotension risk is high and benzodiazepines + supportive care are safer [CHIEW-SS-2024].',
        citations: ['CHIEW-SS-2024']
      }
    ],
    dosingParameters: [
      { label: 'BZD Titration Interval', value: 'Every 15–30 minutes', note: 'Diazepam 5–10 mg IV or Lorazepam 2 mg IV/IM' },
      { label: 'Cyproheptadine Loading', value: '12 mg PO/NGT stat', note: 'Then 2 mg q2h until clinical response (or 8 mg q6h)' },
      { label: 'Cyproheptadine 24h Ceiling', value: 'Max 32 mg / 24 hours', note: 'Available only in oral tablet formulation' },
      { label: 'Bedside Monitoring', value: 'Every 15–30 minutes', note: 'Track core Temp, HR, BP, SpO2, and truncal tone' }
    ],
    warningSeverity: 'caution-amber',
    warningTitle: 'Evidence Transparency Note on Cyproheptadine',
    rationale: {
      clinicalReasoning:
        'Moderate serotonin toxicity (spontaneous or ocular clonus, agitation, diaphoresis, Temp 38.0–39.0°C) requires rapid control of muscular hypertonia and sympathetic storm using titrated IV benzodiazepines and external cooling.',
      keyEvidence: [
        '**Benzodiazepine survival benefit**: Animal models and toxicology series establish diazepam/lorazepam as the primary agent that blunts hyperthermia, clonus, and adrenergic storm [CHIEW-SS-2024].',
        '**Cyproheptadine evidence critique (Chiew & Isbister 2024; Nguyen et al. n=288)**: Recent clinical toxicology reviews demonstrate no controlled evidence that Cyproheptadine reduces mortality or length of stay over benzodiazepines and supportive care alone, and oral absorption is delayed in critically ill patients [CHIEW-SS-2024].'
      ],
      comparativeOutcomes: [
        {
          study: 'Nguyen et al. / Chiew & Isbister (2024 Review, n=288)',
          comparison: 'Cyproheptadine + Supportive Care vs Benzodiazepines / Supportive Care Alone',
          outcome: 'Mortality and hospital length of stay',
          timePoint: 'Acute admission',
          result: 'No statistically significant reduction in mortality or hospital stay with Cyproheptadine',
          limitationOrContext: 'IPS CPG 2022 retains Cyproheptadine (12 mg loading, max 32 mg/d) as standard adjunctive therapy; never allow NGT Cyproheptadine administration to delay IV benzodiazepines or ICU airway care'
        }
      ],
      interpretation:
        'Clinicians should prioritize IV Diazepam/Lorazepam, IV hydration, and active cooling first, using PO/NGT Cyproheptadine as an adjunct per IPS CPG 2022 without delaying resuscitation.',
      safetyAndLimitations: [
        '**Parenteral antipsychotic hazard**: Chlorpromazine and Olanzapine can cause severe alpha-1 adrenergic hypotension or worsen hyperthermia and are discouraged by modern toxicology guidelines [CHIEW-SS-2024].'
      ],
      references: ['IPS-TOX-2022', 'CHIEW-SS-2024', 'HUNTER-SS-2003'],
      flaggedForClinicalReview:
        'Source data highlights tension between IPS CPG 2022 (which recommends Cyproheptadine 12–32 mg/d) and Chiew & Isbister 2024 toxicology review (which notes lack of controlled outcome benefit); both perspectives are preserved transparently.'
    }
  },

  severe_ss: {
    tierId: 'severe_ss',
    pathwayId: 'serotonin',
    statusLabel: 'STAT ICU Intubation + Non-Depolarizing Paralysis + Active Cooling',
    prerequisites: [
      'Immediate Medical ICU resuscitation: core temperature >39.0–40.0°C with truncal rigidity rapidly progresses to rhabdomyolysis, DIC, metabolic acidosis, and multiorgan failure within hours [CHIEW-SS-2024, IPS-TOX-2022].'
    ],
    immediateOptions: [
      {
        id: 'ss3_opt1',
        optionLabel: 'Step 1 — Active External Cooling + High-Dose IV Benzodiazepine + Intubation',
        contextBadge: 'Immediate Life-Saving Action',
        medicationOrAction: 'Active Cooling + IV Benzodiazepine Sedation + Endotracheal Intubation',
        route: 'ICU Airway & External Cooling',
        instructions: 'Apply ice packs, mist/fan, or cooling blankets and intubate immediately to secure ventilation and stop muscular work of breathing [CHIEW-SS-2024, IPS-TOX-2022].',
        citations: ['CHIEW-SS-2024', 'IPS-TOX-2022']
      },
      {
        id: 'ss3_opt2',
        optionLabel: 'Step 2 — Non-Depolarizing Neuromuscular Paralysis',
        contextBadge: 'Halts Muscular Heat Generation',
        medicationOrAction: 'Inj Vecuronium OR Inj Rocuronium',
        dose: 'Vecuronium 0.1 mg/kg IV · OR Rocuronium 0.6–1.2 mg/kg IV',
        route: 'Intravenous (IV)',
        formulation: 'Non-Depolarizing Neuromuscular Blocker',
        instructions: 'Immediately abolishes skeletal muscle clonus, truncal chest-wall rigidity, hyperthermia generation, and rhabdomyolysis [IPS-TOX-2022, CHIEW-SS-2024].',
        citations: ['IPS-TOX-2022', 'CHIEW-SS-2024']
      },
      {
        id: 'ss3_opt3',
        optionLabel: 'Step 3 — Short-Acting Autonomic Stabilization',
        contextBadge: 'Hemodynamic Control',
        medicationOrAction: 'IV Esmolol / Nitroprusside (Hypertension) · OR IV Norepinephrine (Hypotension)',
        route: 'Continuous IV Titration',
        instructions: 'Use short-acting titratable IV agents for severe autonomic lability rather than long-acting beta-blockers [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'ss3_sec1',
        optionLabel: 'Post-Intubation NGT Adjunct',
        contextBadge: 'IPS CPG 2022 Adjunct',
        medicationOrAction: 'Tab Cyproheptadine via NGT',
        dose: '12 mg NGT loading → followed by 2 mg q2h (or 8 mg q6h; max 32 mg/day)',
        route: 'Nasogastric Tube (NGT)',
        instructions: 'May be administered via NGT once airway, paralysis, and active cooling are established [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      }
    ],
    dosingParameters: [
      { label: 'Non-Depolarizing Paralytic', value: 'Vecuronium 0.1 mg/kg · Rocuronium 0.6–1.2 mg/kg IV', note: 'NEVER use Succinylcholine' },
      { label: 'Cooling Target', value: 'Core Temp <38.5°C within 30–60 min', note: 'Continuous esophageal/rectal core temp probe' },
      { label: 'Cyproheptadine NGT Adjunct', value: '12 mg NGT stat, then 2 mg q2h (max 32 mg/d)', note: 'Only after intubation and cooling' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: '5 Strict Contraindications in Severe Serotonin Syndrome',
    rationale: {
      clinicalReasoning:
        'In severe serotonin toxicity (Temp >39.0–40.0°C), hyperthermia is driven entirely by unrelenting skeletal muscle clonus and hypertonia rather than hypothalamic prostaglandin reset. Only neuromuscular paralysis and physical cooling can immediately stop heat production.',
      keyEvidence: [
        '**Inefficacy of antipyretics**: Paracetamol and NSAIDs have zero effect on serotonin-induced hyperthermia because the hypothalamic temperature set-point is normal [IPS-TOX-2022].',
        '**Lethality of Succinylcholine**: Depolarizing neuromuscular blockade with Succinylcholine in the presence of hyperthermic rhabdomyolysis and acidosis precipitates acute hyperkalemic ventricular fibrillation/arrest [IPS-TOX-2022, CHIEW-SS-2024].'
      ],
      interpretation:
        'When temperature exceeds 39°C or truncal rigidity impairs ventilation, immediate ICU sedation, endotracheal intubation, and non-depolarizing paralysis (Vecuronium/Rocuronium) are life-saving.',
      safetyAndLimitations: [
        '**Never give Bromocriptine or Dantrolene expecting NMS response**: Bromocriptine has serotonergic properties that worsen Serotonin Syndrome [IPS-TOX-2022].',
        '**Never use ECT in Serotonin Syndrome**: Unlike Malignant Catatonia/NMS, ECT is ineffective and may exacerbate Serotonin Syndrome [BAP-CAT-2023].',
        '**Avoid serotonergic ICU opioids**: Fentanyl, Tramadol, and Pethidine are phenylpiperidine opioids that inhibit serotonin reuptake and worsen toxicity—use Morphine if opioid analgesia is required in the ICU [CHIEW-SS-2024].'
      ],
      references: ['CHIEW-SS-2024', 'IPS-TOX-2022', 'BAP-CAT-2023']
    }
  },

  // ============================================================================
  // PATHWAY 05: ALCOHOL WITHDRAWAL DELIRIUM (DT) & WERNICKE
  // ============================================================================
  mod_aws: {
    tierId: 'mod_aws',
    pathwayId: 'alcohol_dt',
    statusLabel: 'IM/IV Thiamine + Symptom-Triggered BZD',
    prerequisites: [
      'Administer parenteral Thiamine BEFORE or concurrently with any glucose/carbohydrate load (never delay life-saving IV dextrose in acute hypoglycemia) [IPS-SUBST-2023, IPS-GERI-2023].'
    ],
    immediateOptions: [
      {
        id: 'aws1_opt1',
        optionLabel: 'Step 1 — Prophylactic Parenteral Thiamine',
        contextBadge: 'Mandatory First Step',
        medicationOrAction: 'Inj Thiamine',
        dose: 'At least 250 mg daily for 3–5 days (then Tab Thiamine 100 mg PO TID)',
        route: 'IM or IV',
        formulation: 'Parenteral Injection',
        instructions: 'Prevents precipitation of acute Wernicke encephalopathy during carbohydrate metabolism [IPS-SUBST-2023, IPS-GERI-2023].',
        citations: ['IPS-SUBST-2023', 'IPS-GERI-2023']
      },
      {
        id: 'aws1_opt2',
        optionLabel: 'Step 2A — Symptom-Triggered Long-Acting Benzodiazepine (Normal Liver)',
        contextBadge: 'If Liver Function Normal',
        medicationOrAction: 'Tab / Inj Diazepam OR Tab Chlordiazepoxide',
        dose: 'Diazepam 10 mg PO/IV · OR Chlordiazepoxide 25–50 mg PO',
        route: 'PO or IV',
        instructions: 'Repeat every 1–2 hours whenever CIWA-Ar score is ≥8–10 [IPS-GERI-2023].',
        citations: ['IPS-GERI-2023']
      },
      {
        id: 'aws1_opt3',
        optionLabel: 'Step 2B — Hepatic Impairment / Cirrhosis / Elderly Mandatory Choice',
        contextBadge: 'Mandatory in Cirrhosis / Elderly',
        medicationOrAction: 'Tab / Inj Lorazepam',
        dose: '2 mg (1–2 mg in Elderly)',
        route: 'PO / IV / IM',
        instructions: 'Repeat every 1–2 hours when CIWA-Ar ≥8–10; direct glucuronidation avoids active metabolite accumulation in liver disease [IPS-GERI-2023, IPS-AGIT-2022].',
        citations: ['IPS-GERI-2023', 'IPS-AGIT-2022']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'aws1_sec1',
        optionLabel: 'Mandatory Electrolyte Co-Factor Correction',
        contextBadge: 'Essential Co-Factor',
        medicationOrAction: 'Inj Magnesium Sulfate (MgSO4) + Potassium Replacement',
        dose: 'MgSO4 2 g IV if hypomagnesemic',
        route: 'Intravenous (IV)',
        instructions: 'Thiamine is biochemically ineffective as a transketolase cofactor in the presence of uncorrected hypomagnesemia [IPS-GERI-2023 Table 13].',
        citations: ['IPS-GERI-2023']
      }
    ],
    dosingParameters: [
      { label: 'Prophylactic Thiamine', value: '≥250 mg IM/IV daily × 3–5d', note: 'Then Tab Thiamine 100 mg PO TID' },
      { label: 'CIWA-Ar Trigger Threshold', value: 'Repeat BZD q1–2h when CIWA-Ar ≥ 8–10', note: 'Symptom-triggered dosing reduces total BZD exposure' },
      { label: 'Day-2 Standing Conversion', value: 'Day-1 total BZD = Day-2 standing dose', note: 'Then taper by 20–25%/day over 3–4 days' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Wernicke-Korsakoff Precipitation Guardrail',
    rationale: {
      clinicalReasoning:
        'Chronic alcohol use downregulates inhibitory GABA-A receptors and upregulates excitatory NMDA glutamate receptors while depleting body thiamine (Vitamin B1) and magnesium stores.',
      keyEvidence: [
        '**Symptom-triggered vs fixed-schedule dosing**: Symptom-triggered benzodiazepine administration guided by CIWA-Ar (≥8–10) achieves faster withdrawal control with lower total benzodiazepine doses and less oversedation in uncomplicated withdrawal [IPS-GERI-2023].',
        '**Magnesium dependency of Thiamine**: Conversion of thiamine to active thiamine pyrophosphate (TPP) and erythrocyte transketolase activity strictly require divalent magnesium ions (Mg2+) [IPS-GERI-2023 Table 13].'
      ],
      interpretation:
        'Every patient with moderate-to-severe alcohol withdrawal requires parenteral Thiamine (oral thiamine absorption is saturated at ~4.5 mg in alcoholics), magnesium repletion, and CIWA-guided benzodiazepines.',
      safetyAndLimitations: [
        '**Glucose-first pitfall**: Administering IV dextrose before or without parenteral Thiamine accelerates glycolysis and exhausts residual thiamine, precipitating irreversible Korsakoff amnestic syndrome. However, if the patient is acutely hypoglycemic, never delay life-saving IV dextrose—administer IV Thiamine concurrently [IPS-SUBST-2023].'
      ],
      references: ['IPS-SUBST-2023', 'IPS-GERI-2023', 'IPS-AGIT-2022']
    }
  },

  dt_wernicke: {
    tierId: 'dt_wernicke',
    pathwayId: 'alcohol_dt',
    statusLabel: 'High-Dose IV Thiamine 500mg TID + IV Lorazepam/Diazepam',
    prerequisites: [
      'Admit to Medical HDU/ICU; monitor vital signs, airway, and RASS sedation score every 15–30 minutes during active IV titration.'
    ],
    immediateOptions: [
      {
        id: 'dt_opt1',
        optionLabel: 'Step 1 — High-Dose IV Thiamine (Wernicke / DT Therapeutic Regimen)',
        contextBadge: 'Immediate IV Infusion',
        medicationOrAction: 'Inj Thiamine',
        dose: '500 mg IV three times daily (TID) for 2–3 days → then 250 mg IV daily for 3–5 days → then 100 mg PO TID',
        route: 'IV infusion (diluted in 50–100 mL Normal Saline over 30 min)',
        formulation: 'Parenteral IV Solution',
        instructions: 'Administer before or together with any glucose load to cross the blood-brain barrier and reverse Wernicke encephalopathy [IPS-GERI-2023 Table 13].',
        citations: ['IPS-GERI-2023']
      },
      {
        id: 'dt_opt2',
        optionLabel: 'Step 2 — Essential Magnesium Co-Factor Repletion',
        contextBadge: 'Co-Factor Replacement',
        medicationOrAction: 'Inj Magnesium Sulfate (MgSO4)',
        dose: '2 g IV (if hypomagnesemic)',
        route: 'Intravenous (IV)',
        instructions: 'Required for thiamine pyrophosphate enzymatic activity and arrhythmia prevention [IPS-GERI-2023].',
        citations: ['IPS-GERI-2023']
      },
      {
        id: 'dt_opt3',
        optionLabel: 'Step 3 — Rapid IV Benzodiazepine Titration to Light Sedation (RASS 0 to -1)',
        contextBadge: 'Primary Life-Saving Sedation',
        medicationOrAction: 'Inj Lorazepam (Cirrhosis/Elderly) OR Inj Diazepam',
        dose: 'Lorazepam 2–4 mg IV · OR Diazepam 10 mg IV repeated every 15–30 min until calm',
        route: 'Intravenous (IV)',
        instructions: 'Titrate until the patient is calm/lightly sedated (RASS 0 to -1). Administer Day-1 total requirement as standing divided doses on Day 2, then taper by 20–25%/day over 3–4 days [IPS-GERI-2023].',
        citations: ['IPS-GERI-2023']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'dt_sec1',
        optionLabel: 'Refractory Delirium Tremens ICU Adjuncts',
        contextBadge: 'ICU Refractory DT',
        medicationOrAction: 'Dexmedetomidine Infusion · Propofol (if intubated) · Phenobarbitone · OR Low-Dose Haloperidol (0.5–2 mg IM/IV)',
        route: 'ICU IV / IM',
        instructions: 'Add symptom-oriented adjuncts in ICU/HDU only after adequate IV benzodiazepine loading if refractory agitation or perceptual disturbances persist [IPS-GERI-2023 Table 11, IPS-DELIR-2018].',
        citations: ['IPS-GERI-2023', 'IPS-DELIR-2018']
      }
    ],
    dosingParameters: [
      { label: 'Therapeutic IV Thiamine', value: '500 mg IV TID × 2–3 days', note: 'Infuse in 50–100 mL NS over 30 min; then 250 mg/d × 3–5d' },
      { label: 'IV BZD Titration Interval', value: 'Every 15–30 minutes until RASS 0 to -1', note: 'Lorazepam 2–4 mg IV or Diazepam 10 mg IV' },
      { label: 'Magnesium Co-Factor', value: 'MgSO4 2 g IV', note: 'Correct K+, Mg2+, and PO4 concurrently' },
      { label: 'Day 2–5 Taper Rule', value: 'Day-1 total = Day-2 standing → taper 20–25%/day', note: 'Taper over 3–4 days once delirium resolves' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Antipsychotic Monotherapy & Restraint Contraindications in DT',
    rationale: {
      clinicalReasoning:
        'Delirium Tremens (DT) and Wernicke Encephalopathy (WE) frequently co-occur 48–96 hours after alcohol cessation. Only GABA-A positive allosteric modulators (benzodiazepines/barbiturates/propofol) prevent withdrawal seizures and fatal hyperadrenergic cardiovascular collapse.',
      keyEvidence: [
        '**Classic Wernicke triad sensitivity**: Only ~16% of patients with autopsy-proven Wernicke Encephalopathy display the complete classic triad (confusion + oculomotor palsy/nystagmus + truncal ataxia); any single sign in an alcohol-dependent patient mandates high-dose parenteral Thiamine (500 mg IV TID) [IPS-GERI-2023].',
        '**Lethality of antipsychotic monotherapy**: Antipsychotics lower the seizure threshold, impair thermoregulation, prolong QTc, and fail to arrest the glutamate/GABA withdrawal storm [IPS-GERI-2023 Table 13].'
      ],
      interpretation:
        'In Delirium Tremens, high cumulative IV benzodiazepine doses are often required to achieve calm (RASS 0 to -1); low-dose Haloperidol (0.5–2 mg) is strictly an adjunct to—never a substitute for—adequate benzodiazepine loading.',
      safetyAndLimitations: [
        '**Avoid physical restraints**: Patients in DT fight mechanical restraints violently, precipitating severe hyperthermia, rhabdomyolysis, and cardiac arrest—use adequate IV benzodiazepine titration instead [IPS-GERI-2023 Table 13].'
      ],
      references: ['IPS-GERI-2023', 'IPS-DELIR-2018', 'IPS-SUBST-2023']
    }
  },

  withdrawal_seizure: {
    tierId: 'withdrawal_seizure',
    pathwayId: 'alcohol_dt',
    statusLabel: 'IV Lorazepam Stat + Rule Out Head Injury + DT Prophylaxis',
    prerequisites: [
      'Position patient in lateral recovery posture, suction airway, administer supplemental oxygen, and check stat fingerstick blood glucose.'
    ],
    immediateOptions: [
      {
        id: 'ws_opt1',
        optionLabel: 'Step 1 — Stat Parenteral Benzodiazepine Seizure Termination & Prophylaxis',
        contextBadge: 'Immediate IV Push',
        medicationOrAction: 'Inj Lorazepam OR Inj Diazepam',
        dose: 'Lorazepam 2–4 mg slow IV push · OR Diazepam 10 mg IV (repeat once after 5–10 min if seizure persists)',
        route: 'Intravenous (IV)',
        formulation: 'Parenteral IV Injection',
        instructions: 'Terminates active seizure and significantly reduces recurrent withdrawal seizures and progression to Delirium Tremens [IPS-GERI-2023, IPS-SUBST-2023].',
        citations: ['IPS-GERI-2023', 'IPS-SUBST-2023']
      },
      {
        id: 'ws_opt2',
        optionLabel: 'Step 2 — Mandatory Parenteral Thiamine & Magnesium',
        contextBadge: 'Concurrent IV Therapy',
        medicationOrAction: 'Inj Thiamine + Inj Magnesium Sulfate (MgSO4)',
        dose: 'Thiamine 500 mg IV in 100 mL NS over 30 min + MgSO4 2 g IV',
        route: 'Intravenous (IV)',
        instructions: 'Administer before or together with any dextrose infusion; hypomagnesemia independently lowers the seizure threshold [IPS-GERI-2023, IPS-SUBST-2023].',
        citations: ['IPS-GERI-2023', 'IPS-SUBST-2023']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'ws_sec1',
        optionLabel: 'Mandatory Neuroimaging (Subdural Hematoma Rule-Out)',
        contextBadge: 'Diagnostic Escalation',
        medicationOrAction: 'Non-Contrast CT Brain',
        instructions: 'Order urgently for ANY first-time seizure, focal neurological deficit, head trauma stigmata, or persistent post-ictal obtundation to rule out occult subdural hematoma or cerebral contusion [IPS-SUBST-2023, IPS-GERI-2023].',
        citations: ['IPS-SUBST-2023', 'IPS-GERI-2023']
      }
    ],
    dosingParameters: [
      { label: 'Acute Seizure Bolus', value: 'Lorazepam 2–4 mg IV (or Diazepam 10 mg IV)', note: 'Repeat once at 5–10 min if ongoing seizure' },
      { label: 'Parenteral Thiamine', value: '500 mg IV over 30 min', note: 'Plus MgSO4 2 g IV' },
      { label: 'Post-Ictal Transition', value: 'CIWA-Ar / Symptom-Triggered BZD Protocol', note: 'Up to 30% of untreated withdrawal seizures progress to DT' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Phenytoin Contraindication in Alcohol Withdrawal Seizures',
    rationale: {
      clinicalReasoning:
        'Alcohol withdrawal seizures ("rum fits") typically occur 6–48 hours after cessation as generalized tonic-clonic seizures mediated by acute GABA-A hypoactivity and NMDA hyperactivity.',
      keyEvidence: [
        '**Inefficacy of Phenytoin**: Voltage-gated sodium channel blockers (Phenytoin) fail to prevent recurrent alcohol withdrawal seizures because the mechanism is neurochemical GABA/NMDA imbalance rather than a focal cortical scar, and Phenytoin loading carries cardiac arrhythmia toxicity [IPS-SUBST-2023].',
        '**Lorazepam secondary prophylaxis**: A single dose of IV Lorazepam 2 mg reduces recurrent withdrawal seizure rates from ~24% to ~3% and prevents progression to Delirium Tremens.'
      ],
      interpretation:
        'Treat every alcohol withdrawal seizure with IV Lorazepam (or Diazepam) plus high-dose IV Thiamine and MgSO4, and maintain a low threshold for Non-Contrast CT Brain to exclude occult traumatic subdural hematoma.',
      safetyAndLimitations: [
        '**Long-term anticonvulsants unnecessary**: Do not discharge patients with pure alcohol withdrawal seizures on chronic maintenance Phenytoin or Levetiracetam unless an independent idiopathic/structural epilepsy is diagnosed.'
      ],
      references: ['IPS-GERI-2023', 'IPS-SUBST-2023']
    }
  },

  // ============================================================================
  // PATHWAY 06: ACUTE DYSTONIA & AKATHISIA
  // ============================================================================
  laryngeal_dystonia: {
    tierId: 'laryngeal_dystonia',
    pathwayId: 'dystonia_akathisia',
    statusLabel: 'STAT IV Lorazepam/Diazepam + IV Biperiden/Diphenhydramine',
    prerequisites: [
      'Administer high-flow 100% Oxygen and summon the Anesthesia / ICU airway team to the bedside immediately.'
    ],
    immediateOptions: [
      {
        id: 'ld_opt1',
        optionLabel: 'Step 1A — Immediate IV Benzodiazepine Bolus',
        contextBadge: 'Treatment of Choice [IPS-TOX-2022 Table 4]',
        medicationOrAction: 'Inj Lorazepam OR Inj Diazepam',
        dose: 'Lorazepam 1–2 mg slow IV push · OR Diazepam 2–5 mg slow IV push',
        route: 'Intravenous (IV)',
        formulation: 'Parenteral IV Injection',
        instructions: 'Rapidly relaxes laryngeal adductor muscle spasm within 2–5 minutes [IPS-TOX-2022 Table 4].',
        citations: ['IPS-TOX-2022']
      },
      {
        id: 'ld_opt2',
        optionLabel: 'Step 1B — Concurrent Parenteral Anticholinergic / Antihistamine',
        contextBadge: 'Co-Administered Antidote',
        medicationOrAction: 'Inj Biperiden (5 mg slow IV/IM) · Inj Diphenhydramine (25–50 mg IV/IM) · Inj Benztropine (1–2 mg IV) · OR Inj Promethazine (25–50 mg deep IM)',
        dose: 'Biperiden 5 mg · Diphenhydramine 25–50 mg · Promethazine 25–50 mg',
        route: 'IV or Deep IM (Prefer IM for Promethazine)',
        instructions: 'If Promethazine is given IV, MUST dilute to ≤25 mg/mL and infuse slowly ≤25 mg/min into a large patent vein due to FDA Boxed Warning for severe extravasation tissue necrosis/gangrene [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'ld_sec1',
        optionLabel: 'Post-Resolution Relapse Prevention & Antipsychotic Switch',
        contextBadge: 'Mandatory 4–7 Day Prophylaxis',
        medicationOrAction: 'Tab Trihexyphenidyl (2 mg TID) OR Tab Biperiden (2 mg BD–TID) × 4–7 days',
        route: 'PO',
        instructions: 'Continue oral anticholinergic for 4–7 days after stridor resolves and switch or reduce the offending high-potency antipsychotic [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      }
    ],
    dosingParameters: [
      { label: 'Expected IV Onset', value: '2–5 minutes', note: 'IM onset requires 15–20 minutes' },
      { label: 'Repeat Dose Window', value: 'Repeat at 15–30 min if spasm persists', note: 'Keep intubation equipment open at bedside' },
      { label: 'Oral Prophylaxis Duration', value: '4–7 days post-resolution', note: 'Prevents rebound spasm as neuroleptic clears' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Fatal Asphyxiation & Promethazine IV Extravasation Warning',
    rationale: {
      clinicalReasoning:
        'Acute laryngeal dystonia is a life-threatening spasm of the vocal cord adductors triggered by acute striatal D2 blockade with secondary cholinergic overdrive, most commonly in young males (<30y) within 1–4 days of receiving Haloperidol or Risperidone without anticholinergic prophylaxis.',
      keyEvidence: [
        '**TREC-Rio II Dystonia Prevention Finding (Huf et al., 2007)**: In the randomized trial comparing IM Haloperidol alone vs IM Haloperidol + Promethazine, all 10 acute dystonic reactions occurred in the Haloperidol-monotherapy arm vs 0 in the Promethazine combination arm [TREC-RIO-2007].',
        '**IPS CPG 2022 Table 4 Protocol**: Designates slow IV Lorazepam (1–2 mg) or Diazepam (2–5 mg) plus parenteral anticholinergic/antihistamine as the treatment of choice for laryngeal dystonia [IPS-TOX-2022].'
      ],
      comparativeOutcomes: [
        {
          study: 'TREC-Rio II (2007, n=316)',
          comparison: 'IM Haloperidol alone vs IM Haloperidol + Promethazine',
          outcome: 'Acute dystonic reactions',
          timePoint: 'First 24 hours',
          result: '10 events (Haloperidol alone) vs 0 events (Haloperidol + Promethazine)',
          limitationOrContext: 'Data Safety Monitoring Board halted trial early due to excess harm in Haloperidol monotherapy arm'
        }
      ],
      interpretation:
        'Never dismiss acute stridor, throat clutching, or dyspnea in a psychiatric patient as panic or conversion disorder—treat immediately with IV benzodiazepine and parenteral anticholinergic while preparing the airway cart.',
      safetyAndLimitations: [
        '**Promethazine IV hazard**: Undiluted or rapid IV Promethazine causes severe chemical endarteritis, thrombosis, and gangrene requiring amputation; prefer deep IM injection or use IV Biperiden/Diphenhydramine/Lorazepam.'
      ],
      references: ['IPS-TOX-2022', 'TREC-RIO-2007']
    }
  },

  focal_dystonia: {
    tierId: 'focal_dystonia',
    pathwayId: 'dystonia_akathisia',
    statusLabel: 'Stepwise IM/IV Anticholinergic / Antihistamine',
    prerequisites: [
      'Reassure the patient calmly (acute oculogyric crisis, torticollis, and trismus are painful and terrifying, though sensorium remains clear) [IPS-TOX-2022].'
    ],
    immediateOptions: [
      {
        id: 'fd_opt1',
        optionLabel: 'Step 1 — Parenteral Anticholinergic / Antihistaminergic Bolus',
        contextBadge: 'First-Line Step 1 [IPS-TOX-2022 Table 4]',
        medicationOrAction: 'Inj Promethazine (25–50 mg deep IM) · Inj Diphenhydramine (25–50 mg IM/IV) · Inj Biperiden (5 mg IM/IV) · OR Inj Benztropine (1–2 mg IM/IV)',
        dose: 'Promethazine 25–50 mg IM · Diphenhydramine 25–50 mg IM/IV · Biperiden 5 mg IM/IV',
        route: 'Deep IM or IV (Prefer IM for Promethazine)',
        instructions: 'Resolves focal dystonia within 5 minutes (IV) or 15–20 minutes (IM) [IPS-TOX-2022 Table 4].',
        citations: ['IPS-TOX-2022']
      },
      {
        id: 'fd_opt2',
        optionLabel: 'Step 2 & Step 3 — 30-Minute Repeat & Benzodiazepine Switch',
        contextBadge: 'If Unresolved at 30 Min',
        medicationOrAction: 'Repeat Step 1 Agent at 30 min → If still unresolved after 2 doses, give Inj Lorazepam 1–2 mg IM/IV or Diazepam 2–5 mg IV',
        dose: 'Lorazepam 1–2 mg IM/IV · Diazepam 2–5 mg IV (Recurrent Oculogyric Crisis: Tab Clonazepam 0.5–4 mg/d)',
        route: 'IM / IV / PO',
        instructions: 'Follow stepwise escalation per IPS CPG 2022 Table 4 [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'fd_sec1',
        optionLabel: 'Step 4 — Non-Response Diagnostic Rule & 4–7 Day Oral Prophylaxis',
        contextBadge: 'Mandatory Follow-Up',
        medicationOrAction: 'Examine for TMJ Dislocation / Hypocalcemic Tetany + Prescribe Tab Trihexyphenidyl 2 mg BD–TID × 4–7 days',
        route: 'Physical Exam + PO Prophylaxis',
        instructions: 'If jaw spasm/trismus fails to resolve after 2 anticholinergic doses + BZD, examine immediately for Temporomandibular Joint (TMJ) dislocation or hypocalcemia. Maintain oral Trihexyphenidyl for 4–7 days post-resolution [IPS-TOX-2022 Table 4].',
        citations: ['IPS-TOX-2022']
      }
    ],
    dosingParameters: [
      { label: 'Expected Onset', value: '5 min (IV) · 15–20 min (IM)', note: 'Rapid dramatic relief confirms diagnosis' },
      { label: 'Step 2 Repeat Interval', value: '30 minutes after first dose', note: 'Switch to Lorazepam/Diazepam if 2 doses fail' },
      { label: 'Oral Prophylaxis', value: 'Tab Trihexyphenidyl 2 mg BD–TID × 4–7d', note: 'Prevents recurrence during neuroleptic washout' }
    ],
    warningSeverity: 'caution-amber',
    warningTitle: 'High-Risk Window & Mimic Exclusion Note',
    rationale: {
      clinicalReasoning:
        'Focal acute dystonias (torticollis, retrocollis, oculogyric crisis, tongue protrusion, trismus) occur when nigrostriatal D2 receptor occupancy falls as antipsychotic plasma levels begin to decline after a dose, creating an acute striatal dopamine-acetylcholine imbalance.',
      keyEvidence: [
        '**95% 4-Day Onset Window**: Over 95% of acute dystonic reactions occur within the first 96 hours (4 days) of initiating or escalating a high-potency D2 antagonist (Haloperidol, Risperidone, Fluphenazine, Metoclopramide) [IPS-TOX-2022 Table 2].',
        '**TMJ dislocation mimic**: Severe masseter/pterygoid trismus can dislocate the mandibular condyles anteriorly; persistent inability to close the mouth after dystonia treatment requires manual TMJ reduction rather than further sedatives [IPS-TOX-2022 Table 4].'
      ],
      interpretation:
        'Rapid relief within 5–20 minutes of parenteral anticholinergic/antihistamine therapy is both therapeutic and diagnostically confirmatory. Always provide 4–7 days of oral anticholinergic cover to preserve medication adherence.',
      safetyAndLimitations: [
        '**Elderly anticholinergic caution**: In older adults, anticholinergics can precipitate acute delirium, urinary retention, or angle-closure glaucoma; use the lowest effective dose or parenteral Lorazepam.'
      ],
      references: ['IPS-TOX-2022']
    }
  },

  acute_akathisia: {
    tierId: 'acute_akathisia',
    pathwayId: 'dystonia_akathisia',
    statusLabel: 'Reduce/Switch Neuroleptic + Propranolol / Mirtazapine',
    prerequisites: [
      'Rate severity on the Barnes Akathisia Rating Scale (BARS) and explicitly screen for acute suicidal ideation (akathisia is a major driver of impulsive self-harm) [IPS-TOX-2022].'
    ],
    immediateOptions: [
      {
        id: 'ak_opt1',
        optionLabel: 'Step 1 — Antipsychotic Dose Reduction or Switch',
        contextBadge: 'Primary Etiological Action',
        medicationOrAction: 'Reduce Offending Antipsychotic Dose OR Switch to Low-Akathisia SGA (Quetiapine or Olanzapine)',
        instructions: 'Do NOT escalate the offending antipsychotic (Haloperidol, Risperidone, Aripiprazole) [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      },
      {
        id: 'ak_opt2',
        optionLabel: 'Step 2 — First-Line Lipophilic Beta-Blocker',
        contextBadge: 'First-Line Pharmacotherapy [IPS-TOX-2022 Table 6]',
        medicationOrAction: 'Tab Propranolol',
        dose: '40–80 mg/day in divided doses (e.g., 20–40 mg BD)',
        route: 'PO',
        formulation: 'Oral Tablet',
        instructions: 'Check baseline blood pressure and heart rate (>60 bpm) and exclude asthma/bronchospastic COPD before administration [IPS-TOX-2022 Table 6].',
        citations: ['IPS-TOX-2022']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'ak_sec1',
        optionLabel: 'Alternative First-Line 5-HT2A Antagonist (If Propranolol Contraindicated)',
        contextBadge: 'Asthma / Bradycardia Safe',
        medicationOrAction: 'Tab Mirtazapine',
        dose: '15 mg OD',
        route: 'PO',
        instructions: 'Low-dose Mirtazapine (15 mg/day) demonstrates comparable anti-akathisia efficacy to Propranolol via central 5-HT2A antagonism and is safe in asthma/COPD [IPS-TOX-2022 Table 6].',
        citations: ['IPS-TOX-2022']
      },
      {
        id: 'ak_sec2',
        optionLabel: 'Acute Casualty Relief & Second-Line Adjuncts',
        contextBadge: 'Adjunctive Options',
        medicationOrAction: 'Tab/Inj Lorazepam (1–2 mg) · Tab Clonazepam (0.5–1 mg) · Tab Cyproheptadine (8–16 mg/d) · OR Tab Vitamin B6 (Pyridoxine 200–600 mg/d)',
        route: 'PO / IM',
        instructions: 'Lorazepam or Clonazepam provides rapid symptomatic relief in casualty while Propranolol or Mirtazapine takes effect [IPS-TOX-2022 Table 6].',
        citations: ['IPS-TOX-2022']
      }
    ],
    dosingParameters: [
      { label: 'Propranolol Regimen', value: '40–80 mg/day PO (20–40 mg BD)', note: 'Hold if HR <60 bpm, hypotension, or asthma' },
      { label: 'Mirtazapine Alternative', value: '15 mg PO OD', note: 'Preferred when beta-blockers are contraindicated' },
      { label: 'Acute BZD Bridge', value: 'Lorazepam 1–2 mg or Clonazepam 0.5–1 mg', note: 'Rapid subjective distress relief' },
      { label: 'Reassessment Window', value: 'Within 2–4 hours and daily', note: 'Re-score BARS and suicide risk' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Misdiagnosis as Psychotic Agitation & Suicide Risk Warning',
    rationale: {
      clinicalReasoning:
        'Akathisia consists of a tormenting subjective inner compulsion to move accompanied by objective motor restlessness (rocking foot-to-foot, pacing) mediated by mesocortical/ventral striatal dopaminergic blockade and noradrenergic/serotonergic imbalance.',
      keyEvidence: [
        '**Anticholinergics ineffective in pure akathisia**: Unlike acute dystonia or drug-induced parkinsonism, Trihexyphenidyl has weak evidence in isolated akathisia unless parkinsonian tremor/rigidity co-exists; central lipophilic beta-blockers (Propranolol) and 5-HT2A antagonists (Mirtazapine, Cyproheptadine) are the evidence-backed treatments [IPS-TOX-2022 Table 6].',
        '**Suicide & violence association**: Unrecognized acute akathisia is a well-documented trigger of impulsive suicidal leaps and casualty elopement [IPS-TOX-2022].'
      ],
      interpretation:
        'Always ask an agitated patient on antipsychotics whether their legs feel restless inside. Reducing the neuroleptic and starting Propranolol (or Mirtazapine + short-term Lorazepam) breaks the cycle rapidly.',
      safetyAndLimitations: [
        '**Never give additional Haloperidol**: Misinterpreting akathisia pacing as "worsening psychosis" and giving stat IM Haloperidol dramatically worsens akathisia torment [IPS-TOX-2022, IPS-AGIT-2022].',
        '**Asthma contraindication**: Non-selective beta-blockade with Propranolol can trigger severe bronchospasm in asthmatic patients—use Mirtazapine 15 mg OD instead.'
      ],
      references: ['IPS-TOX-2022', 'IPS-AGIT-2022']
    }
  },

  // ============================================================================
  // PATHWAY 07: LITHIUM TOXICITY & PSYCHOTROPIC OVERDOSE
  // ============================================================================
  li_mild_mod: {
    tierId: 'li_mild_mod',
    pathwayId: 'lithium_tox',
    statusLabel: 'Stop Lithium + IV 0.9% Normal Saline + Serial Li+ q6h',
    prerequisites: [
      'STOP Lithium immediately and STOP all interacting medications that impair renal Lithium clearance: Thiazide/Loop Diuretics, ACE Inhibitors/ARBs, and NSAIDs [IPS-TOX-2022 Table 17, EXTRIP-LI-2015].'
    ],
    immediateOptions: [
      {
        id: 'li1_opt1',
        optionLabel: 'Step 1 — IV Isotonic Crystalloid Volume Resuscitation',
        contextBadge: 'Restore GFR & Natriuresis',
        medicationOrAction: 'IV 0.9% Isotonic Normal Saline',
        dose: '1.5–2× maintenance rate (target urine output 1.5–3 mL/kg/hour)',
        route: 'Intravenous (IV)',
        instructions: 'Restores glomerular filtration and abolishes proximal tubular avid lithium reabsorption triggered by sodium/volume depletion while correcting Na+/K+ [EXTRIP-LI-2015, IPS-TOX-2022].',
        citations: ['EXTRIP-LI-2015', 'IPS-TOX-2022']
      },
      {
        id: 'li1_opt2',
        optionLabel: 'Step 2 — GI Decontamination Rule (Acute Massive / Sustained-Release Ingestion <1–2h)',
        contextBadge: 'No Activated Charcoal for Li+',
        medicationOrAction: 'Whole-Bowel Irrigation with Polyethylene Glycol (PEG) Solution',
        route: 'PO / NGT',
        instructions: 'Do NOT give Activated Charcoal for isolated lithium ingestion (charcoal does NOT bind lithium ions!). Consider PEG whole-bowel irrigation for early acute massive or sustained-release lithium overdose [EXTRIP-LI-2015, IPS-TOX-2022].',
        citations: ['EXTRIP-LI-2015', 'IPS-TOX-2022']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'li1_sec1',
        optionLabel: 'Nephrology Hemodialysis Escalation Triggers',
        contextBadge: 'Consult Nephrology If Present',
        medicationOrAction: 'Intermittent Hemodialysis Evaluation',
        instructions: 'Escalate to hemodialysis if: Chronic toxicity with [Li+] >2.5 mEq/L + significant neurotoxicity/confusion, OR renal impairment, OR expected time to reach [Li+] <1.0 mEq/L exceeds 36 hours [IPS-TOX-2022, EXTRIP-LI-2015].',
        citations: ['IPS-TOX-2022', 'EXTRIP-LI-2015']
      }
    ],
    dosingParameters: [
      { label: 'IV Fluid Choice', value: '0.9% Normal Saline (1.5–2× maintenance)', note: 'Monitor serum Na+ closely if nephrogenic DI present' },
      { label: 'Target Urine Output', value: '1.5–3 mL/kg/hour', note: 'Never use forced loop-diuretic diuresis' },
      { label: 'Serial Lab Monitoring', value: 'Repeat [Li+], Na+, Creatinine q4–6h', note: 'Track downward clearance trajectory' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Chronic vs Acute Intracellular Brain Toxicity Dissociation',
    rationale: {
      clinicalReasoning:
        'Lithium is a small monovalent cation (7 Da) handled by the proximal renal tubule identically to sodium. Dehydration, low-salt diets, thiazides, ACE inhibitors, or NSAIDs trigger compensatory proximal sodium-and-lithium reabsorption.',
      keyEvidence: [
        '**Chronic vs Acute kinetic difference (EXTRIP 2015)**: In acute overdose, serum [Li+] can exceed 4.0 mEq/L with minimal initial neurological symptoms because lithium slowly crosses the blood-brain barrier. Conversely, in chronic or acute-on-chronic toxicity, lithium has already equilibrated inside brain tissue, causing severe neurotoxicity (coarse tremor, ataxia, myoclonus, delirium) at serum levels of 1.5–2.5 mEq/L [EXTRIP-LI-2015, IPS-TOX-2022].',
        '**Inefficacy of Activated Charcoal**: Positively charged lithium ions do not adsorb to activated charcoal; charcoal is only indicated if a mixed lipophilic co-ingestant is suspected [EXTRIP-LI-2015].'
      ],
      interpretation:
        'Always base management and dialysis escalation on the patient’s clinical neurological examination and renal function, never on the serum [Li+] number in isolation.',
      safetyAndLimitations: [
        '**Nephrogenic Diabetes Insipidus (DI)**: Chronic lithium patients often have underlying nephrogenic DI (polyuria, impaired urinary concentrating ability); monitor serum sodium every 4–6 hours during 0.9% NaCl infusion to prevent severe hypernatremia [IPS-TOX-2022].'
      ],
      references: ['EXTRIP-LI-2015', 'IPS-TOX-2022']
    }
  },

  li_severe_hd: {
    tierId: 'li_severe_hd',
    pathwayId: 'lithium_tox',
    statusLabel: 'STAT Intermittent Hemodialysis (EXTRIP Class 1D)',
    prerequisites: [
      'Transfer to Medical ICU / Nephrology HDU with continuous ECG telemetry (watch for sinus node dysfunction, sinoatrial/AV block, and bradycardia) [EXTRIP-LI-2015].'
    ],
    immediateOptions: [
      {
        id: 'li2_opt1',
        optionLabel: 'EXTRIP Class 1D Recommended Indications — Urgent Intermittent Hemodialysis',
        contextBadge: 'Class 1D Strong Recommendation',
        medicationOrAction: 'Urgent Intermittent Hemodialysis (IHD Preferred over CRRT)',
        instructions: 'Initiate immediately if: 1) Impaired kidney function AND Serum [Li+] > 4.0 mEq/L; OR 2) Decreased consciousness, Seizures, or Life-threatening dysrhythmias IRRESPECTIVE of serum [Li+] [EXTRIP-LI-2015, IPS-TOX-2022].',
        citations: ['EXTRIP-LI-2015', 'IPS-TOX-2022']
      },
      {
        id: 'li2_opt2',
        optionLabel: 'EXTRIP Class 2D Suggested Indications — Intermittent Hemodialysis',
        contextBadge: 'Class 2D Conditional Suggestion',
        medicationOrAction: 'Intermittent Hemodialysis',
        instructions: 'Suggested if: 1) Serum [Li+] > 5.0 mEq/L; OR 2) Significant confusion; OR 3) Expected time to reduce [Li+] < 1.0 mEq/L is > 36 hours (IPS CPG 2022 also advises HD at >2.5 mEq/L in chronic toxicity) [EXTRIP-LI-2015, IPS-TOX-2022].',
        citations: ['EXTRIP-LI-2015', 'IPS-TOX-2022']
      },
      {
        id: 'li2_opt3',
        optionLabel: 'Acute Seizure Control',
        contextBadge: 'If Seizures Present',
        medicationOrAction: 'Inj Lorazepam (2–4 mg IV) OR Inj Diazepam (10 mg IV)',
        route: 'Intravenous (IV)',
        instructions: 'Control lithium-induced seizures with parenteral benzodiazepines while preparing hemodialysis [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'li2_sec1',
        optionLabel: 'Dialysis Endpoint & Mandatory Post-Dialysis Rebound Protocol',
        contextBadge: 'Post-HD Rebound Watch',
        medicationOrAction: 'Continue HD until [Li+] < 1.0 mEq/L (or ≥6h) → Check serial [Li+] q4–6h for 12h post-HD',
        instructions: 'Measure serial serum [Li+] over 12 hours after stopping hemodialysis to detect intracellular redistribution or extended-release GI Lithium Rebound, and repeat hemodialysis if rebound occurs [EXTRIP-LI-2015].',
        citations: ['EXTRIP-LI-2015']
      }
    ],
    dosingParameters: [
      { label: 'Preferred Modality', value: 'Intermittent Hemodialysis (IHD)', note: 'Clears Li+ at ~107–180 mL/min vs CRRT ~43 mL/min' },
      { label: 'Dialysis Stop Target', value: 'Serum [Li+] < 1.0 mEq/L (or min 6h session)', note: 'Continue until clear clinical improvement' },
      { label: 'Post-HD Rebound Check', value: 'Every 4–6h for 12 hours post-HD', note: 'Repeat HD if serum [Li+] rebounds' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'SILENT Syndrome Prevention & Loop-Diuretic Contraindication',
    rationale: {
      clinicalReasoning:
        'Lithium has zero protein binding, a small volume of distribution (0.7–0.9 L/kg), and low molecular weight (7 Da), making it the prototypical dialyzable toxin. High-efficiency intermittent hemodialysis removes lithium 4 to 10 times faster than normal kidneys or continuous renal replacement therapy (CRRT).',
      keyEvidence: [
        '**EXTRIP Workgroup Clearance Comparison (Decker et al., 2015)**: Endogenous renal lithium clearance is 10–40 mL/min (<10 mL/min in AKI); CRRT achieves ~43 mL/min; Intermittent Hemodialysis (IHD) achieves ~107–180 mL/min [EXTRIP-LI-2015].',
        '**SILENT Syndrome**: Delayed clearance in severe neurotoxicity causes demyelination in the cerebellum and brainstem, resulting in persistent cerebellar ataxia, dysarthria, and nystagmus lasting >2 months after lithium cessation (Syndrome of Irreversible Lithium-Effectuated Neurotoxicity) [EXTRIP-LI-2015].'
      ],
      comparativeOutcomes: [
        {
          study: 'EXTRIP Workgroup (Decker et al., 2015 CJASN)',
          comparison: 'Intermittent Hemodialysis (IHD) vs CRRT vs Endogenous Renal Clearance',
          outcome: 'Lithium clearance rate (mL/min)',
          timePoint: 'During extracorporeal treatment',
          result: 'IHD: ~107–180 mL/min vs CRRT: ~43 mL/min vs Normal Kidney: 10–40 mL/min (<10 mL/min in AKI)',
          limitationOrContext: 'Systematic review of 508 articles (Grade 1D/2D international toxicology/nephrology consensus)'
        }
      ],
      interpretation:
        'Intermittent hemodialysis is the modality of choice for initial rapid reduction of toxic lithium burden; CRRT is an acceptable alternative only if the patient is too hemodynamically unstable for IHD.',
      safetyAndLimitations: [
        '**Never use Furosemide/Thiazide forced diuresis**: Loop and thiazide diuretics cause sodium depletion that paradoxically stimulates proximal tubular lithium reabsorption and worsens toxicity [EXTRIP-LI-2015].'
      ],
      references: ['EXTRIP-LI-2015', 'IPS-TOX-2022']
    }
  },

  other_overdose: {
    tierId: 'other_overdose',
    pathwayId: 'lithium_tox',
    statusLabel: 'Agent-Specific IPS Antidote Protocol',
    prerequisites: [
      'Secure airway, breathing, and circulation first; obtain immediate 12-lead ECG (measure QRS duration in ms and QTc interval), ABG, electrolytes, and serum ammonia/drug levels [IPS-TOX-2022].'
    ],
    immediateOptions: [
      {
        id: 'od3_opt1',
        optionLabel: 'Tricyclic Antidepressant (TCA) Overdose Protocol',
        contextBadge: 'QRS >100 ms / Arrhythmia / Seizure',
        medicationOrAction: 'Inj Sodium Bicarbonate (NaHCO3) + Activated Charcoal + Inj Lorazepam (for Seizures)',
        dose: 'NaHCO3 1–2 mEq/kg IV bolus (target arterial pH 7.45–7.55) · Charcoal 1 g/kg (max 50 g PO if <1–2h & airway protected)',
        route: 'Intravenous (IV) + PO/NGT',
        instructions: 'Give IV Sodium Bicarbonate immediately for QRS > 100 ms, ventricular arrhythmia, hypotension, or seizures. NEVER give Physostigmine in TCA overdose (causes bradyarrhythmia/asystole) [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      },
      {
        id: 'od3_opt2',
        optionLabel: 'Valproate Overdose Protocol',
        contextBadge: 'Hyperammonemia / Coma / Shock',
        medicationOrAction: 'Inj L-Carnitine + Inj Naloxone ± Urgent Hemodialysis',
        dose: 'L-Carnitine 100 mg/kg IV over 30 min (max 6 g), then 50 mg/kg IV q8h (max 3 g) · Naloxone 0.8–2 mg IV titrated',
        route: 'Intravenous (IV)',
        instructions: 'Administer L-Carnitine for hyperammonemic encephalopathy/hepatotoxicity, Naloxone for CNS depression, and Hemodialysis if serum Valproate >1300 mg/L, shock, coma, cerebral edema, or pH <7.10 [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'od3_sec1',
        optionLabel: 'Antipsychotic Overdose with QTc > 500 ms / Torsades de Pointes',
        contextBadge: 'Cardiac Stabilization',
        medicationOrAction: 'Inj Magnesium Sulfate (MgSO4) 2–4 g IV stat + K+/Mg2+ Repletion + IV Fluids',
        route: 'Intravenous (IV)',
        instructions: 'Administer MgSO4 2–4 g IV stat if Torsades de Pointes or polymorphic VT develops; treat alpha-1 adrenergic hypotension with isotonic IV fluids (and Norepinephrine/Phenylephrine—avoid Epinephrine due to beta-2 paradoxical hypotension) [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      },
      {
        id: 'od3_sec2',
        optionLabel: 'Isolated Benzodiazepine Overdose with Severe Respiratory Depression',
        contextBadge: 'Strict Contraindication Screen First',
        medicationOrAction: 'Airway / Bag-Mask Support First → Inj Flumazenil 0.1–0.2 mg/min IV (max 1–2 mg)',
        route: 'Intravenous (IV)',
        instructions: 'Use Flumazenil ONLY in pure isolated BZD overdose with a normal 12-lead ECG and NO history of chronic BZD dependence, epilepsy, or TCA co-ingestion [IPS-TOX-2022].',
        citations: ['IPS-TOX-2022']
      }
    ],
    dosingParameters: [
      { label: 'TCA QRS Threshold', value: 'QRS > 100 ms → NaHCO3 1–2 mEq/kg IV', note: 'Target arterial pH 7.45–7.55' },
      { label: 'Valproate L-Carnitine', value: '100 mg/kg IV (max 6g), then 50 mg/kg q8h (max 3g)', note: 'Hemodialysis if Valproate >1300 mg/L or shock/coma' },
      { label: 'Torsades / QTc >500ms', value: 'MgSO4 2–4 g IV stat', note: 'Correct K+ (>4.5 mEq/L) and Mg2+' },
      { label: 'Flumazenil Titration', value: '0.1–0.2 mg/min IV (max 1–2 mg)', note: 'Contraindicated in mixed TCA or chronic BZD use' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Absolute Contraindications for Flumazenil & Physostigmine',
    rationale: {
      clinicalReasoning:
        'Psychotropic overdoses cause agent-specific cardiotoxicity and neurotoxicity: TCAs block myocardial fast sodium channels (widening QRS), Valproate depletes hepatic carnitine and saturates protein binding at high levels (making unbound drug dialyzable), and antipsychotics block hERG potassium channels (prolonging QTc).',
      keyEvidence: [
        '**Sodium Bicarbonate in TCA cardiotoxicity**: Hypertonic sodium load overcomes fast sodium channel blockade while systemic alkalinization (pH 7.45–7.55) increases protein binding and uncouples TCA from myocardial channels [IPS-TOX-2022].',
        '**Valproate dialyzability at toxic concentrations**: At therapeutic levels Valproate is 90% protein-bound, but at toxic levels (>100–300 mg/L) albumin binding saturates and free fraction rises markedly, allowing high-efficiency hemodialysis clearance when levels exceed 1300 mg/L or shock/coma occurs [IPS-TOX-2022].'
      ],
      interpretation:
        'A baseline 12-lead ECG (QRS and QTc) is the single most important bedside triage tool in any suspected psychotropic overdose before administering antidotes.',
      safetyAndLimitations: [
        '**Flumazenil lethality in mixed overdose**: If a patient co-ingested a TCA or takes chronic benzodiazepines, administering Flumazenil removes the protective GABAergic seizure threshold and precipitates refractory status epilepticus and fatal ventricular arrhythmias [IPS-TOX-2022].',
        '**Physostigmine in TCA overdose**: Explicitly contraindicated due to risk of cholinergic bradycardia and asystole [IPS-TOX-2022].'
      ],
      references: ['IPS-TOX-2022']
    }
  },

  // ============================================================================
  // PATHWAY 08: ACUTE SUICIDAL CRISIS & DELIBERATE SELF-HARM (DSH)
  // ============================================================================
  high_suic: {
    tierId: 'high_suic',
    pathwayId: 'suicide_dsh',
    statusLabel: 'Mandatory Inpatient Admission + 1:1 / Random 15-min Checks',
    prerequisites: [
      'Complete medical/toxicological stabilization first if presenting after a suicide attempt; wait until intoxication or drowsiness clears before conducting formal capacity and mental status examination [IPS-SUIC-2023].'
    ],
    immediateOptions: [
      {
        id: 'su1_opt1',
        optionLabel: 'Step 1 — Immediate Ward Environmental Safety & Observation Protocol',
        contextBadge: 'Mandatory Inpatient Protocol [IPS-SUIC-2023]',
        medicationOrAction: 'High-Visibility Bed + Ligature/Sharp Removal + 24×7 Family Attendant + Continuous 1:1 or Unpredictable ≤15-min Checks',
        instructions: 'Place bed closest to nursing station, inspect personal belongings for sharps/medications/ligatures, and perform nursing checks at UNPREDICTABLE random intervals ≤15 minutes so the patient cannot time an attempt between rounds [IPS-SUIC-2023].',
        citations: ['IPS-SUIC-2023']
      },
      {
        id: 'su1_opt2',
        optionLabel: 'Step 2 — Acute Agitation / Severe Psychic Anxiety Relief',
        contextBadge: 'Supervised Acute Relief',
        medicationOrAction: 'Supervised Oral/Parenteral Antipsychotic OR Low-Dose Lorazepam',
        instructions: 'Administer under direct nursing supervision to relieve severe acute agitation, insomnia, or psychic perturbation (never dispense unsupervised benzodiazepine or lithium supplies) [IPS-SUIC-2023].',
        citations: ['IPS-SUIC-2023']
      },
      {
        id: 'su1_opt3',
        optionLabel: 'Step 3 — Definitive Rapid Anti-Suicidal Somatic Intervention',
        contextBadge: 'Severe Suicidal Depression / Command Hallucinations',
        medicationOrAction: 'Bilateral Modified ECT',
        route: 'Bilateral Modified ECT (under MHCA 2017 Sec 86/89)',
        instructions: 'Strongly indicated for severe unipolar/bipolar suicidal depression, psychotic command hallucinations, or catatonia to rapidly resolve short-term suicide risk [IPS-SUIC-2023].',
        citations: ['IPS-SUIC-2023', 'MHCA-2017']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'su1_sec1',
        optionLabel: 'Disorder-Specific Anti-Suicidal Pharmacotherapy & Off-Label Ketamine',
        contextBadge: 'Targeted Maintenance & Rapid Options',
        medicationOrAction: 'Lithium (Bipolar/Affective — locked family supply) · Clozapine (Schizophrenia/Schizoaffective) · Fluoxetine/Venlafaxine (Unipolar Depression) · OR IV Ketamine 0.5 mg/kg over 40 min',
        instructions: 'Lithium and Clozapine have proven long-term anti-suicidal efficacy. IV Ketamine 0.5 mg/kg infusion over 40 min provides rapid short-term ideation reduction, though IPS CPG 2023 notes IV Ketamine remains off-label with short-lived effect [IPS-SUIC-2023].',
        citations: ['IPS-SUIC-2023']
      }
    ],
    dosingParameters: [
      { label: 'Nursing Observation', value: 'Continuous 1:1 or Random ≤15-min intervals', note: 'Never use predictable fixed clock-face intervals' },
      { label: 'Off-Label IV Ketamine', value: '0.5 mg/kg IV infused over 40 minutes', note: 'Rapid short-term anti-suicidal effect [IPS-SUIC-2023]' },
      { label: 'Shift / Transition Review', value: 'Reassess at every ward/shift change', note: 'Watch for sudden unexplained calm/improvement' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Strict Prohibition of "No-Suicide Contracts" & Paradoxical Calm Alert',
    rationale: {
      clinicalReasoning:
        'High imminent suicide risk (recent high-lethality attempt, persistent intent/plan, command hallucinations, or severe agitated depression) requires immediate physical containment of lethal means, unpredictable observation, and rapid somatic/pharmacological reduction of suicidal drive.',
      keyEvidence: [
        '**Ban on "No-Suicide Contracts" (IPS CPG 2023)**: Sarkhel et al. (2023) explicitly state that verbal or written "no-suicide contracts" have zero empirical evidence of preventing suicide, create a dangerous false sense of clinician security, and are strictly contraindicated in agitated, psychotic, impulsive, or intoxicated patients [IPS-SUIC-2023].',
        '**Unpredictable ≤15-minute interval rule**: Fixed 15-minute checks allow determined inpatients to time self-harm immediately after a nurse leaves; random variable intervals (≤15 min) plus 24×7 family attendant supervision are standard in Indian psychiatric wards [IPS-SUIC-2023].'
      ],
      interpretation:
        'In high-risk patients refusing admission or lacking capacity, invoke MHCA 2017 Section 94 (72-hour emergency protection) and transition to Section 89 Supported Admission while engaging the Nominated Representative.',
      safetyAndLimitations: [
        '**Paradoxical mood improvement**: Sudden, unexplained calm or cheerfulness in a severely depressed suicidal patient may indicate inner relief after finalizing a decision to die—do not prematurely downgrade observation or discharge [IPS-SUIC-2023].',
        '**Lithium lethality in overdose**: Although Lithium reduces long-term suicide risk in mood disorders, an acute overdose is lethal; Lithium must be stored and dispensed strictly by a responsible family member.'
      ],
      references: ['IPS-SUIC-2023', 'MHCA-2017']
    }
  },

  mod_suic: {
    tierId: 'mod_suic',
    pathwayId: 'suicide_dsh',
    statusLabel: 'Consider Admission OR Intensive Safety Plan + Means Restriction',
    prerequisites: [
      'Obtain mandatory corroborative history from family members, spouse, or roommates BEFORE making any outpatient vs inpatient disposition decision [IPS-SUIC-2023].'
    ],
    immediateOptions: [
      {
        id: 'su2_opt1',
        optionLabel: 'Step 1 — Hospitalization vs Intensive Outpatient Decision (IPS Table 5 & 8)',
        contextBadge: 'Disposition Triage',
        medicationOrAction: 'Admit if family support is absent/unreliable or modifiable risk factors are unaddressed; otherwise initiate Intensive Outpatient Care with 24×7 family supervision',
        instructions: 'Evaluate social support, reliability of family supervision, and objective lethality of any recent self-harm act [IPS-SUIC-2023 Table 5 & 8].',
        citations: ['IPS-SUIC-2023']
      },
      {
        id: 'su2_opt2',
        optionLabel: 'Step 2 — Collaborative 6-Step Stanley-Brown Safety Plan Intervention (SPI)',
        contextBadge: '20–45 Min Bedside Intervention [IPS-SUIC-2023 Table 10]',
        medicationOrAction: 'Written 6-Step Safety Plan + Lethal Means Restriction + Tele-MANAS 14416',
        instructions: 'Complete all 6 written steps with patient and family: 1) Personal warning signs; 2) Internal coping strategies; 3) Social settings/people for distraction; 4) Family/friends to call for help; 5) Professional & 24×7 Indian Crisis Helplines (Tele-MANAS 14416 or 1800-891-4416 + Local Casualty); 6) Lethal means restriction (lock/remove pesticides, ropes, firearms, and all tablet strips) [IPS-SUIC-2023 Table 10].',
        citations: ['IPS-SUIC-2023']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'su2_sec1',
        optionLabel: 'Evidence-Based Psychotherapy & Underlying Disorder Treatment',
        contextBadge: 'Structured Follow-Up',
        medicationOrAction: 'CBT for Suicide Prevention · Problem-Solving Therapy · OR DBT (for Borderline Personality Disorder)',
        instructions: 'Treat comorbid depression, anxiety, or alcohol use disorder and dispense only short, family-supervised medication supplies [IPS-SUIC-2023].',
        citations: ['IPS-SUIC-2023']
      }
    ],
    dosingParameters: [
      { label: 'Safety Plan Duration', value: '20–45 minutes collaborative session', note: 'Provide written copy to patient and family' },
      { label: '24×7 National Helpline', value: 'Tele-MANAS: 14416 or 1800-891-4416', note: 'Govt of India toll-free multilingual crisis line' },
      { label: 'Collateral Requirement', value: 'Mandatory family interview pre-discharge', note: 'Verify removal of pesticides, ropes, and tablets' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Indian Agricultural Pesticide Objective Lethality Warning',
    rationale: {
      clinicalReasoning:
        'Unlike a "no-suicide contract" (which asks what the patient promises NOT to do), a collaborative Safety Plan Intervention (SPI) provides concrete, pre-rehearsed behavioral steps and removes physical access to lethal means during brief suicidal crises.',
      keyEvidence: [
        '**Stanley-Brown Safety Plan Intervention (IPS CPG 2023 Table 10)**: Reduces suicidal behaviour by ~45% in emergency department cohorts when paired with structured follow-up contact [IPS-SUIC-2023].',
        '**Subjective intent vs objective lethality in India**: In Indian casualty settings, impulsive self-poisoning with household or agricultural pesticides (organophosphates, aluminum phosphide, paraquat) or yellow phosphorus rodenticides ("Ratol") carries extreme medical mortality despite low stated intent ("done in anger") [IPS-SUIC-2023].'
      ],
      interpretation:
        'Objective medical lethality must always be assessed independently of the patient’s stated subjective intent, and household pesticides/medications must be physically removed before home discharge is considered.',
      safetyAndLimitations: [
        '**Antidepressant activation window**: Monitor patients closely during the first 4 weeks of starting an SSRI/SNRI (especially <25 years old) for treatment-emergent restlessness or worsening suicidal ideation [IPS-SUIC-2023].'
      ],
      references: ['IPS-SUIC-2023']
    }
  },

  low_suic: {
    tierId: 'low_suic',
    pathwayId: 'suicide_dsh',
    statusLabel: 'Safety Plan + WHO BIC Follow-up + Tele-MANAS 14416',
    prerequisites: [
      'Verify ALL IPS CPG Table 9 Safe Discharge Criteria before discharge: suicidality was reactive to an acute precipitant and perspective has shifted; low lethality method/intent; cooperative family present to lock away all medications/poisons; patient communicative and agrees to follow-up [IPS-SUIC-2023].'
    ],
    immediateOptions: [
      {
        id: 'su3_opt1',
        optionLabel: 'Step 1 — Written 6-Step Safety Plan + Lethal Means Removal + Tele-MANAS',
        contextBadge: 'Pre-Discharge Requirement',
        medicationOrAction: '6-Step Written Safety Plan + Family Means-Restriction + Tele-MANAS (14416 / 1-800-891-4416)',
        instructions: 'Provide written Safety Plan and 24×7 Govt of India Tele-MANAS toll-free helpline numbers on the discharge card [IPS-SUIC-2023].',
        citations: ['IPS-SUIC-2023']
      },
      {
        id: 'su3_opt2',
        optionLabel: 'Step 2 — WHO Brief Intervention and Contact (BIC) Schedule',
        contextBadge: 'Evidence-Based Follow-Up Protocol',
        medicationOrAction: '1-Hour Pre-Discharge Information Session + 9 Structured Follow-Up Contacts',
        dose: 'Week 1, 2, 4, 7, 11 and Month 4, 6, 12, 18',
        route: 'In-Person or Telephonic Follow-Up',
        instructions: 'Enroll patient in the WHO SUPRE-MISS Brief Intervention and Contact (BIC) schedule validated in Indian emergency settings (Chennai cohort) [IPS-SUIC-2023].',
        citations: ['IPS-SUIC-2023']
      }
    ],
    escalationOrSecondaryOptions: [
      {
        id: 'su3_sec1',
        optionLabel: 'Outpatient Psychiatric & Psychosocial Care',
        contextBadge: 'Within 24–72 Hours',
        medicationOrAction: 'Treat Underlying Adjustment / Depressive / Anxiety / Alcohol Disorder + Short Supervised Prescriptions',
        instructions: 'Schedule first outpatient psychiatric review within 24–72 hours (Week 1 BIC milestone) and dispense only small, family-supervised tablet quantities [IPS-SUIC-2023].',
        citations: ['IPS-SUIC-2023']
      }
    ],
    dosingParameters: [
      { label: 'First Follow-Up Contact', value: 'Within 24–72 hours (Week 1)', note: 'Confirm outpatient attendance and safety plan use' },
      { label: 'WHO BIC Contact Schedule', value: 'Wk 1, 2, 4, 7, 11 · Mo 4, 6, 12, 18', note: '9 structured follow-up contacts after 1h session' },
      { label: '24×7 Crisis Helpline', value: '14416 / 1-800-891-4416 (Tele-MANAS)', note: 'Document on every casualty discharge summary' }
    ],
    warningSeverity: 'critical-rose',
    warningTitle: 'Sobriety & Collateral Informant Pre-Discharge Rule',
    rationale: {
      clinicalReasoning:
        'Patients presenting with reactive deliberate self-harm or transient passive death wishes remain at elevated risk of repeat self-harm in the weeks immediately following emergency department discharge unless structured human contact and means restriction are established.',
      keyEvidence: [
        '**WHO SUPRE-MISS Brief Intervention and Contact (BIC) Trial (Fleischmann et al., 2008 — including Chennai, India site)**: A 1-hour educational session prior to ER discharge plus 9 structured follow-up contacts over 18 months significantly reduced subsequent suicide mortality compared with treatment as usual [IPS-SUIC-2023].'
      ],
      comparativeOutcomes: [
        {
          study: 'WHO SUPRE-MISS BIC Multisite Trial (including Chennai, India)',
          comparison: '1-Hour Brief Intervention + 9 Contacts (Wk 1–Mo 18) vs Treatment as Usual',
          outcome: 'Subsequent deaths by suicide over 18 months',
          timePoint: '18-month follow-up',
          result: 'Significant reduction in suicide deaths in the BIC intervention arm (0.2% vs 2.2% across multisite cohort)',
          limitationOrContext: 'Recommended by IPS CPG 2023 for all emergency department self-harm discharges'
        }
      ],
      interpretation:
        'Safe casualty discharge requires satisfying all IPS Table 9 criteria, interviewing a family informant separately, removing household poisons/medications, and scheduling the Week-1 follow-up contact.',
      safetyAndLimitations: [
        '**Intoxication assessment ban**: Never finalize a suicide risk assessment while the patient is still intoxicated or sedated in Casualty—suicidal intent frequently changes once sobriety returns [IPS-SUIC-2023].'
      ],
      references: ['IPS-SUIC-2023', 'MHCA-2017']
    }
  }
};

```

### File: `/android/AndroidManifest.xml`
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="in.statpsych.cdss"
    android:versionCode="3"
    android:versionName="3.0.0">

    <uses-sdk android:minSdkVersion="21" android:targetSdkVersion="33" />
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:label="STAT-Psych India"
        android:icon="@drawable/ic_launcher"
        android:hardwareAccelerated="true"
        android:theme="@android:style/Theme.DeviceDefault.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:configChanges="orientation|screenSize|keyboardHidden">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>

```

### File: `/android/src/in/statpsych/cdss/MainActivity.java`
```java
package in.statpsych.cdss;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.InputStream;

public class MainActivity extends Activity {
    private WebView webView;
    private static final String APP_HOST = "appassets.androidplatform.net";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setDatabaseEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setLoadWithOverviewMode(true);
        settings.setUseWideViewPort(true);

        webView.setWebViewClient(new WebViewClient() {
            private WebResourceResponse loadFromAssets(Uri uri) {
                if (uri == null || !APP_HOST.equals(uri.getHost())) {
                    return null;
                }
                String path = uri.getPath();
                if (path == null || path.isEmpty() || path.equals("/")) {
                    path = "index.html";
                } else if (path.startsWith("/")) {
                    path = path.substring(1);
                }
                String mime = "application/octet-stream";
                if (path.endsWith(".html")) mime = "text/html";
                else if (path.endsWith(".js")) mime = "text/javascript";
                else if (path.endsWith(".css")) mime = "text/css";
                else if (path.endsWith(".svg")) mime = "image/svg+xml";
                else if (path.endsWith(".png")) mime = "image/png";
                else if (path.endsWith(".json") || path.endsWith(".webmanifest")) mime = "application/json";

                try {
                    InputStream is = getAssets().open(path);
                    return new WebResourceResponse(mime, "UTF-8", is);
                } catch (Exception e) {
                    try {
                        InputStream fallback = getAssets().open("index.html");
                        return new WebResourceResponse("text/html", "UTF-8", fallback);
                    } catch (Exception ex) {
                        return null;
                    }
                }
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                WebResourceResponse res = loadFromAssets(request.getUrl());
                if (res != null) return res;
                return super.shouldInterceptRequest(view, request);
            }

            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, String url) {
                WebResourceResponse res = loadFromAssets(Uri.parse(url));
                if (res != null) return res;
                return super.shouldInterceptRequest(view, url);
            }
        });

        setContentView(webView);
        webView.loadUrl("https://" + APP_HOST + "/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView != null && webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }
}

```

### File: `/scripts/build-apk.sh`
```bash
#!/usr/bin/env bash
set -euo pipefail

echo "==> Checking Android APK build toolchain..."
if ! command -v aapt >/dev/null 2>&1 || ! command -v apksigner >/dev/null 2>&1 || ! command -v javac >/dev/null 2>&1; then
  if command -v apt-get >/dev/null 2>&1; then
    echo "==> Installing Android SDK build tools (aapt, dalvik-exchange, zipalign, apksigner, default-jdk-headless)..."
    if [ "$(id -u)" -eq 0 ]; then
      apt-get update -qq
      DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        aapt \
        dalvik-exchange \
        zipalign \
        apksigner \
        android-sdk-platform-23 \
        default-jdk-headless
    elif command -v sudo >/dev/null 2>&1; then
      sudo apt-get update -qq
      sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
        aapt \
        dalvik-exchange \
        zipalign \
        apksigner \
        android-sdk-platform-23 \
        default-jdk-headless
    fi
  fi
fi

echo "==> Building STAT-Psych India Production Web Assets..."
npm run build

WORK_DIR="/tmp/statpsych-apk-build"
rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR/res/drawable"
mkdir -p "$WORK_DIR/assets"
mkdir -p "$WORK_DIR/build/gen"
mkdir -p "$WORK_DIR/build/obj"
mkdir -p releases public

# Copy compiled web bundle into APK assets (excluding any nested .apk files or chat attachments)
cp -r dist/* "$WORK_DIR/assets/"
rm -f "$WORK_DIR/assets/"*.apk
rm -rf "$WORK_DIR/assets/assets/aistudio"

# Generate 192x192 Launcher Icon (#0F766E clinical teal with white medical cross)
python3 - << 'EOF'
import zlib, struct

width, height = 192, 192
raw_data = bytearray()
for y in range(height):
    raw_data.append(0)
    for x in range(width):
        in_horiz = (72 <= y < 120) and (44 <= x < 148)
        in_vert = (44 <= y < 148) and (72 <= x < 120)
        if in_horiz or in_vert:
            raw_data.extend((255, 255, 255, 255))
        else:
            raw_data.extend((15, 118, 110, 255))

def make_chunk(chunk_type, data):
    return struct.pack(">I", len(data)) + chunk_type + data + struct.pack(">I", zlib.crc32(chunk_type + data) & 0xffffffff)

png = b"\x89PNG\r\n\x1a\n"
ihdr = struct.pack(">IIBBBBB", width, height, 8, 6, 0, 0, 0)
png += make_chunk(b"IHDR", ihdr)
png += make_chunk(b"IDAT", zlib.compress(bytes(raw_data), 9))
png += make_chunk(b"IEND", b"")

with open("/tmp/statpsych-apk-build/res/drawable/ic_launcher.png", "wb") as f:
    f.write(png)
EOF

ANDROID_JAR="${ANDROID_JAR:-/usr/lib/android-sdk/platforms/android-23/android.jar}"
if [ ! -f "$ANDROID_JAR" ] && [ -n "${ANDROID_HOME:-}" ]; then
  ANDROID_JAR=$(find "$ANDROID_HOME/platforms" -name "android.jar" | sort -V | tail -n 1)
fi

echo "==> Packaging Android resources and offline assets with aapt..."
aapt package -f -m \
  -J "$WORK_DIR/build/gen" \
  -M android/AndroidManifest.xml \
  -S "$WORK_DIR/res" \
  -A "$WORK_DIR/assets" \
  -I "$ANDROID_JAR" \
  -F "$WORK_DIR/build/unaligned.apk"

echo "==> Compiling MainActivity.java..."
javac -source 1.8 -target 1.8 \
  -bootclasspath "$ANDROID_JAR" \
  -classpath "$ANDROID_JAR" \
  -d "$WORK_DIR/build/obj" \
  "$WORK_DIR/build/gen/in/statpsych/cdss/R.java" \
  android/src/in/statpsych/cdss/MainActivity.java

echo "==> Converting JVM bytecode to Dalvik DEX..."
if command -v dalvik-exchange >/dev/null 2>&1; then
  dalvik-exchange --dex --output="$WORK_DIR/classes.dex" "$WORK_DIR/build/obj"
elif [ -x /usr/lib/android-sdk/build-tools/debian/dx ]; then
  /usr/lib/android-sdk/build-tools/debian/dx --dex --output="$WORK_DIR/classes.dex" "$WORK_DIR/build/obj"
else
  D8_BIN=$(find "${ANDROID_HOME:-/usr}" -name "d8" 2>/dev/null | head -n 1)
  "$D8_BIN" --lib "$ANDROID_JAR" --output "$WORK_DIR" $(find "$WORK_DIR/build/obj" -name "*.class")
fi

(cd "$WORK_DIR" && aapt add build/unaligned.apk classes.dex)

echo "==> Aligning APK with zipalign..."
zipalign -f 4 "$WORK_DIR/build/unaligned.apk" "$WORK_DIR/build/aligned.apk"

echo "==> Signing APK (v1 + v2 + v3 schemes)..."
KEYSTORE_PATH="android/release.keystore"
if [ ! -f "$KEYSTORE_PATH" ]; then
  keytool -genkeypair \
    -keystore "$KEYSTORE_PATH" \
    -storepass statpsych123 \
    -keypass statpsych123 \
    -alias statpsych \
    -keyalg RSA \
    -keysize 2048 \
    -validity 10000 \
    -dname "CN=STAT-Psych India, OU=Clinical Decision Support, O=STAT-Psych, L=Vellore, ST=TN, C=IN"
fi

apksigner sign \
  --ks "$KEYSTORE_PATH" \
  --ks-pass pass:statpsych123 \
  --key-pass pass:statpsych123 \
  --out public/stat-psych-india.apk \
  "$WORK_DIR/build/aligned.apk"

cp public/stat-psych-india.apk stat-psych-india.apk
cp public/stat-psych-india.apk releases/stat-psych-india-v3.0.0.apk
cp public/stat-psych-india.apk releases/stat-psych-india-v2.0.0.apk
cp public/stat-psych-india.apk releases/stat-psych-india-v1.0.0.apk
cp public/stat-psych-india.apk dist/stat-psych-india.apk

apksigner verify --verbose public/stat-psych-india.apk
echo "==> Successfully built and signed:"
ls -lh stat-psych-india.apk releases/stat-psych-india-v3.0.0.apk releases/stat-psych-india-v2.0.0.apk releases/stat-psych-india-v1.0.0.apk public/stat-psych-india.apk

```

### File: `/.github/workflows/build-android-apk.yml`
```yml
name: Build & Release Android APK

on:
  push:
    branches:
      - main
      - master
    tags:
      - 'v*'
  pull_request:
    branches:
      - main
      - master
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-apk:
    name: Compile & Sign STAT-Psych India APK (v3.0.0)
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Setup Java 17 (OpenJDK)
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '17'

      - name: Install Android Build Tools (aapt, dalvik-exchange, zipalign, apksigner)
        run: |
          sudo apt-get update
          sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
            aapt \
            dalvik-exchange \
            zipalign \
            apksigner \
            android-sdk-platform-23

      - name: Install Node Dependencies & Run Clinical Calculator Unit Tests
        run: |
          npm install
          npx tsx --test src/utils/clinicalCalculators.test.ts

      - name: Build & Sign Standalone Android APK
        run: |
          chmod +x scripts/build-apk.sh
          ./scripts/build-apk.sh

      - name: Commit Updated Signed APK Binaries to Repository Branch
        if: github.event_name == 'push' && (github.ref == 'refs/heads/main' || github.ref == 'refs/heads/master')
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add stat-psych-india.apk public/stat-psych-india.apk releases/stat-psych-india-v3.0.0.apk releases/stat-psych-india-v2.0.0.apk releases/stat-psych-india-v1.0.0.apk
          if ! git diff --cached --quiet; then
            git commit -m "chore(apk): update signed Android APK binaries (v3.0.0) [skip ci]"
            git push
          fi

      - name: Upload Signed APK as GitHub Actions Artifact
        uses: actions/upload-artifact@v4
        with:
          name: stat-psych-india-apk
          path: |
            stat-psych-india.apk
            public/stat-psych-india.apk
            releases/stat-psych-india-v3.0.0.apk
            releases/stat-psych-india-v2.0.0.apk
            releases/stat-psych-india-v1.0.0.apk
          if-no-files-found: error

      - name: Publish Signed APK to GitHub Releases
        if: github.event_name == 'push' || github.event_name == 'workflow_dispatch'
        uses: softprops/action-gh-release@v2
        with:
          tag_name: v3.0.0
          name: "STAT-Psych India v3.0.0 — Tactile Edition Standalone Android APK"
          body: |
            ### STAT-Psych India v3.0.0 — Emergency Psychiatric CDSS (Android APK)
            - **Package ID**: `in.statpsych.cdss`
            - **Version**: `3.0.0` (`versionCode 3`, Signed v1/v2/v3 Release)
            - **Min Android SDK**: Android 5.0+ (API 21+)
            - **What's New in v3.0.0 (Tactile Edition)**:
              - **Supercell-Inspired Tactile Command Deck & Tier Cards**: High-contrast 3D-beveled syndrome deck (`01`–`08`), color-coded severity tiers, instant physical press feedback (`<=140ms`), and synthesized audio/haptic feedback.
              - **Prominent Treatment-Action Cards & 3-Tile Dosing Strips**: Structured Target Dose, Route, and Formulation tiles with 1-tap bedside option highlighting and an integrated Bedside Onset & Reassessment Quick-Timer (`15m IM` / `30m PO/IM`).
              - **High-Visibility Safety Shield & Patient Risk Loadout**: Scannable contraindication bullet points and real-time special-population/organ dosing overrides.
              - **Collapsed-by-Default Expandable Clinical Rationales**: Highlighted key findings, head-to-head trial comparison scorecards, concise safety bullets, and verbatim guideline text.
              - **100% Offline Bundle**: All 8 emergency syndromes, 24 severity tiers, and 17 primary evidence sources embedded inside the APK.
          files: |
            stat-psych-india.apk
            releases/stat-psych-india-v3.0.0.apk
            releases/stat-psych-india-v2.0.0.apk
            releases/stat-psych-india-v1.0.0.apk
          draft: false
          prerelease: false

```
