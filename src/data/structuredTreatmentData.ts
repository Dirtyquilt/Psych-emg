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
