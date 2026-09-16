import { PeerGroup } from '../types';
import { PEER_GROUPS } from '../data/peerGroups';

export interface PeerAnalysisResult {
  peerGroup: PeerGroup;
  medianCost: number;
  iqrMin: number;
  iqrMax: number;
  zScore: number;
  outlierFactor: number;
  isOutlier: boolean;
  scoreContribution: number; // 0 - 25
  explanation: string;
}

export function analyzePeerCost(
  costLakhs: number,
  peerGroupId: string
): PeerAnalysisResult {
  const peer = PEER_GROUPS.find((p) => p.id === peerGroupId) || PEER_GROUPS[0];

  const median = peer.medianCostLakhs;
  const iqrRange = peer.iqrMaxLakhs - peer.iqrMinLakhs;
  const stdDev = peer.stdDevLakhs || 1.5;

  // Z-Score calculation
  const zScore = parseFloat(((costLakhs - median) / stdDev).toFixed(2));
  const outlierFactor = parseFloat((costLakhs / median).toFixed(2));

  // Upper fence for extreme outliers: Q3 + 1.5 * IQR
  const upperFence = peer.iqrMaxLakhs + 1.5 * iqrRange;
  const isOutlier = costLakhs > upperFence || outlierFactor >= 1.5;

  // Score contribution (0 to 25 points in multi-signal engine)
  let scoreContribution = 0;
  if (costLakhs > peer.iqrMaxLakhs) {
    const excess = costLakhs - peer.iqrMaxLakhs;
    scoreContribution = Math.min(25, Math.round(10 + (excess / median) * 12));
  } else if (costLakhs > median) {
    scoreContribution = Math.min(10, Math.round(((costLakhs - median) / (peer.iqrMaxLakhs - median)) * 8));
  } else {
    scoreContribution = Math.max(1, Math.round((costLakhs / median) * 4));
  }

  let explanation = '';
  if (outlierFactor >= 2.0) {
    explanation = `Sanctioned cost of ₹${costLakhs.toFixed(1)}L is ${outlierFactor}× the peer median (₹${median.toFixed(1)}L) for ${peer.name}. Significant anomaly over peer IQR (₹${peer.iqrMinLakhs}L–₹${peer.iqrMaxLakhs}L).`;
  } else if (outlierFactor >= 1.3) {
    explanation = `Sanctioned cost of ₹${costLakhs.toFixed(1)}L is ${outlierFactor}× peer median, moderately elevated above the upper quartile (₹${peer.iqrMaxLakhs}L).`;
  } else {
    explanation = `Sanctioned cost of ₹${costLakhs.toFixed(1)}L is within the standard expected peer range (₹${peer.iqrMinLakhs}L–₹${peer.iqrMaxLakhs}L) based on ${peer.sampleSize} verified historical projects.`;
  }

  return {
    peerGroup: peer,
    medianCost: median,
    iqrMin: peer.iqrMinLakhs,
    iqrMax: peer.iqrMaxLakhs,
    zScore,
    outlierFactor,
    isOutlier,
    scoreContribution,
    explanation
  };
}
