import { Project } from '../types';
import { AGENCIES, CONTRACTORS } from '../data/agenciesAndContractors';

export interface DelayPredictionResult {
  delayProbabilityPct: number;
  projectedDelayMonths: number;
  scoreContribution: number; // 0 - 25
  bottleneckFactor: string;
  explanation: string;
}

export function predictProjectDelay(project: Project): DelayPredictionResult {
  const sanction = new Date(project.sanctionDate).getTime();
  const target = new Date(project.targetCompletionDate).getTime();
  const now = new Date('2024-09-01').getTime(); // Reference evaluation time

  const totalDurationDays = Math.max(30, Math.round((target - sanction) / (1000 * 60 * 60 * 24)));
  const elapsedDays = Math.max(0, Math.round((now - sanction) / (1000 * 60 * 60 * 24)));
  const elapsedRatio = Math.min(2.0, elapsedDays / totalDurationDays);

  const expectedProgress = Math.min(100, Math.round(elapsedRatio * 100));
  const progressDeficit = expectedProgress - project.physicalProgressPct;

  // Contractor factor
  const contractor = CONTRACTORS.find((c) => c.id === project.contractorId);
  const contractorOverload = contractor ? contractor.activeContractsCount > 15 : false;

  // Agency factor
  const agency = AGENCIES.find((a) => a.id === project.implementingAgencyId);
  const agencyDelayAvg = agency ? agency.averageDelayDays : 60;

  // Delay probability calculation (XGBoost emulation)
  let probability = 10;

  if (progressDeficit > 40) {
    probability += 45;
  } else if (progressDeficit > 20) {
    probability += 25;
  } else if (progressDeficit > 5) {
    probability += 10;
  }

  if (contractorOverload) probability += 15;
  if (agencyDelayAvg > 100) probability += 12;
  if (project.financialProgressPct - project.physicalProgressPct > 35) probability += 10;

  if (project.status === 'Completed') {
    probability = 4;
  }

  const finalProb = Math.min(95, Math.max(4, probability));
  const scoreContribution = Math.round((finalProb / 100) * 25);
  const projectedDelayMonths = parseFloat(((finalProb / 100) * (totalDurationDays / 30) * 0.9).toFixed(1));

  let bottleneckFactor = 'Standard operational timeline';
  if (progressDeficit > 30 && contractorOverload) {
    bottleneckFactor = `Contractor Overload (${contractor?.activeContractsCount} active works) & severe ${progressDeficit}% physical progress deficit.`;
  } else if (progressDeficit > 30) {
    bottleneckFactor = `Execution stall: only ${project.physicalProgressPct}% physical work done despite ${Math.round(elapsedRatio * 100)}% scheduled duration elapsed.`;
  } else if (agencyDelayAvg > 100) {
    bottleneckFactor = `Historical agency administrative delays in ${agency?.name}.`;
  }

  let explanation = '';
  if (finalProb >= 70) {
    explanation = `High delay risk (${finalProb}% probability): Project is ${progressDeficit}% behind schedule with high contractor concurrent workload. Estimated delivery slip of ~${projectedDelayMonths} months.`;
  } else if (finalProb >= 40) {
    explanation = `Moderate delay risk (${finalProb}% probability): Minor milestones delayed. Estimated slip of ~${projectedDelayMonths} months.`;
  } else {
    explanation = `Low delay probability (${finalProb}%). Milestones progressing within expected tolerances.`;
  }

  return {
    delayProbabilityPct: finalProb,
    projectedDelayMonths,
    scoreContribution,
    bottleneckFactor,
    explanation
  };
}
