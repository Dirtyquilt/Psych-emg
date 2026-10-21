import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateBVC,
  calculateBFCRSReduction,
  calculateGurreraNMS,
  calculateHunterSS,
  calculateCIWAQuick,
  calculateBARSDystonia,
  calculateEXTRIPLithium,
  calculateIPSSuicide,
  detectComorbidityConflicts
} from './clinicalCalculators.ts';

test('BVC scoring stratifies violence correctly', () => {
  const low = calculateBVC([]);
  assert.equal(low.score, 0);
  assert.equal(low.riskTier, 'low');

  const mod = calculateBVC(['bvc_1', 'bvc_2']);
  assert.equal(mod.score, 2);
  assert.equal(mod.riskTier, 'moderate');

  const high = calculateBVC(['bvc_1', 'bvc_4', 'bvc_5']);
  assert.equal(high.score, 3);
  assert.equal(high.riskTier, 'high');
});

test('BFCRS reduction calculates percentage drop and >=50% positive challenge', () => {
  // 12 down to 4 -> 8 pt drop = 67% drop -> positive
  const resPositive = calculateBFCRSReduction(12, 4);
  assert.equal(resPositive.percentDrop, 67);
  assert.equal(resPositive.isPositive, true);

  // 10 down to 7 -> 3 pt drop = 30% drop -> sub-50%
  const resNegative = calculateBFCRSReduction(10, 7);
  assert.equal(resNegative.percentDrop, 30);
  assert.equal(resNegative.isPositive, false);
});

test('Gurrera NMS score identifies validated cutoff >=74/100', () => {
  // Dopamine exposure (20) + Temp >38 (18) + Rigidity (17) + Mental Status (13) + CPK (10) = 78
  const definite = calculateGurreraNMS(['nms_1', 'nms_2', 'nms_3', 'nms_4', 'nms_5']);
  assert.equal(definite.score, 78);
  assert.equal(definite.isDefinite, true);

  // Dopamine exposure (20) + Temp >38 (18) + Rigidity (17) = 55 (Intermediate)
  const intermediate = calculateGurreraNMS(['nms_1', 'nms_2', 'nms_3']);
  assert.equal(intermediate.score, 55);
  assert.equal(intermediate.isIntermediate, true);
  assert.equal(intermediate.isDefinite, false);
});

test('Hunter Serotonin Toxicity requires prerequisite and rule', () => {
  // Without prerequisite h_0, rules met should not be positive
  const noPrereq = calculateHunterSS(['h_1']);
  assert.equal(noPrereq.isPositive, false);
  assert.equal(noPrereq.hasPrerequisite, false);

  // With prerequisite h_0 + spontaneous clonus h_1 -> positive
  const positive = calculateHunterSS(['h_0', 'h_1']);
  assert.equal(positive.isPositive, true);
  assert.equal(positive.rulesMetCount, 1);
});

test('CIWA Quick detects delirium tremens / wernicke triggers', () => {
  const dt = calculateCIWAQuick(['cw_5']); // Disorientation to time/place
  assert.equal(dt.isSevereOrDT, true);

  const mod = calculateCIWAQuick(['cw_1', 'cw_2']); // Tremor (4) + Diaphoresis (4) = 8
  assert.equal(mod.score, 8);
  assert.equal(mod.isModerate, true);
});

test('BARS & Dystonia distinguishes airway emergency vs focal dystonia vs akathisia', () => {
  const airway = calculateBARSDystonia(['da_1']);
  assert.equal(airway.isAirwayEmergency, true);

  const focal = calculateBARSDystonia(['da_2']);
  assert.equal(focal.isFocalDystonia, true);

  const akathisia = calculateBARSDystonia(['da_4', 'da_6']);
  assert.equal(akathisia.isAkathisia, true);
  assert.equal(akathisia.isSuicideAlert, true);
});

test('EXTRIP Lithium identifies Class 1D and Class 2D hemodialysis criteria', () => {
  const class1 = calculateEXTRIPLithium(['li_1']); // Seizures/coma
  assert.equal(class1.isClass1D, true);

  const class2 = calculateEXTRIPLithium(['li_3']); // Li > 5.0
  assert.equal(class2.isClass2D, true);
});

test('IPS Suicide identifies red flags for mandatory hospitalization', () => {
  const highRisk = calculateIPSSuicide(['su_1']);
  assert.equal(highRisk.requiresAdmission, true);
  assert.equal(highRisk.redFlagsCount, 1);
});

test('Comorbidity conflict detection finds hazardous medication combinations', () => {
  const conflicts = detectComorbidityConflicts(['qtc', 'alcohol_cns']);
  assert.equal(conflicts.length, 1);
  assert.match(conflicts[0].warning, /Haloperidol/);

  const multiConflicts = detectComorbidityConflicts(['qtc', 'copd', 'hepatic', 'renal']);
  assert.equal(multiConflicts.length, 2);
});
