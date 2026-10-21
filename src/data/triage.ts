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
