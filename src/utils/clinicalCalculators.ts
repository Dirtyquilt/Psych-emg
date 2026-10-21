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
