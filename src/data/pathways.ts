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
