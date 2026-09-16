import { Project, RiskSignalBreakdown, RiskTier } from '../types';
import { analyzePeerCost } from './peerIntelligence';
import { detectDuplicates } from './duplicateDetector';
import { predictProjectDelay } from './delayPredictor';

export function computeProjectRiskScore(
  project: Project,
  allProjects: Project[]
): RiskSignalBreakdown {
  // 1. Cost Anomaly Signal (Peer Group Baseline)
  const peerAnalysis = analyzePeerCost(project.sanctionedAmountLakhs, project.peerGroupId);

  // 2. Duplicate Risk Signal (NLP & Geo Proximity)
  const duplicateAnalysis = detectDuplicates(project, allProjects);

  // 3. Delay Probability Signal (Predictive Model)
  const delayAnalysis = predictProjectDelay(project);

  // 4. Fund Utilization Anomaly Signal (Financial vs Physical Discrepancy)
  const financialGap = project.financialProgressPct - project.physicalProgressPct;
  let utilScore = 0;
  let utilExplanation = '';
  if (financialGap > 40) {
    utilScore = 14;
    utilExplanation = `Severe fund front-loading: ${project.financialProgressPct.toFixed(1)}% disbursed while physical completion is only ${project.physicalProgressPct.toFixed(1)}% (+${financialGap.toFixed(1)}% gap).`;
  } else if (financialGap > 20) {
    utilScore = 9;
    utilExplanation = `Moderate financial utilization gap (+${financialGap.toFixed(1)}% over physical work).`;
  } else if (financialGap > 5) {
    utilScore = 4;
    utilExplanation = `Minor disbursement variance within acceptable threshold.`;
  } else {
    utilScore = 1;
    utilExplanation = `Financial disbursements tightly coupled with verified physical milestones.`;
  }

  // 5. Milestone Progress Deviation Signal
  const sanctionTime = new Date(project.sanctionDate).getTime();
  const targetTime = new Date(project.targetCompletionDate).getTime();
  const now = new Date('2024-09-01').getTime();
  const elapsed = Math.max(0, (now - sanctionTime) / (targetTime - sanctionTime));
  const expectedProgress = Math.min(100, Math.round(elapsed * 100));
  const progressDeviation = expectedProgress - project.physicalProgressPct;

  let progScore = 0;
  let progExplanation = '';
  if (progressDeviation > 40) {
    progScore = 11;
    progExplanation = `Physical execution lags expected schedule by ${progressDeviation}% (Expected: ${expectedProgress}%, Actual: ${project.physicalProgressPct}%).`;
  } else if (progressDeviation > 20) {
    progScore = 7;
    progExplanation = `Moderate progress lag of ${progressDeviation}% behind target milestone.`;
  } else {
    progScore = 2;
    progExplanation = `Progress aligned with standard milestone curve.`;
  }

  // Multi-Signal Fusion (0 - 100 Score)
  const costScore = peerAnalysis.scoreContribution;
  const dupScore = duplicateAnalysis ? duplicateAnalysis.duplicateScore : 2;
  const delayScore = delayAnalysis.scoreContribution;

  const totalRaw = costScore + dupScore + delayScore + utilScore + progScore;
  const totalScore = Math.min(100, Math.max(5, totalRaw));

  let tier: RiskTier = 'LOW';
  if (totalScore >= 75) {
    tier = 'CRITICAL';
  } else if (totalScore >= 50) {
    tier = 'HIGH';
  } else if (totalScore >= 30) {
    tier = 'MODERATE';
  } else {
    tier = 'LOW';
  }

  return {
    costAnomaly: {
      score: costScore,
      actualCostLakhs: project.sanctionedAmountLakhs,
      peerMedianLakhs: peerAnalysis.medianCost,
      peerIqrMin: peerAnalysis.iqrMin,
      peerIqrMax: peerAnalysis.iqrMax,
      zScore: peerAnalysis.zScore,
      outlierMultiplier: peerAnalysis.outlierFactor,
      explanation: peerAnalysis.explanation
    },
    duplicateRisk: {
      score: dupScore,
      matchedProjectId: duplicateAnalysis?.matchedProject.id,
      matchedProjectTitle: duplicateAnalysis?.matchedProject.title,
      textSimilarityPct: duplicateAnalysis ? duplicateAnalysis.textSimilarityPct : 0,
      geoDistanceMeters: duplicateAnalysis ? duplicateAnalysis.geoDistanceMeters : 9999,
      timeProximityDays: duplicateAnalysis ? duplicateAnalysis.timeProximityDays : 999,
      explanation: duplicateAnalysis ? duplicateAnalysis.explanation : 'No duplicate risk detected in locality.'
    },
    delayProbability: {
      score: delayScore,
      probabilityPct: delayAnalysis.delayProbabilityPct,
      projectedDelayMonths: delayAnalysis.projectedDelayMonths,
      bottleneckFactor: delayAnalysis.bottleneckFactor,
      explanation: delayAnalysis.explanation
    },
    utilizationAnomaly: {
      score: utilScore,
      disbursementRatio: parseFloat((project.spentAmountLakhs / project.sanctionedAmountLakhs).toFixed(2)),
      physicalCompletionRatio: parseFloat((project.physicalProgressPct / 100).toFixed(2)),
      financialProgressGapPct: parseFloat(financialGap.toFixed(1)),
      explanation: utilExplanation
    },
    progressAnomaly: {
      score: progScore,
      expectedProgressPct: expectedProgress,
      actualProgressPct: project.physicalProgressPct,
      deviationPct: progressDeviation,
      explanation: progExplanation
    },
    totalScore,
    tier
  };
}
