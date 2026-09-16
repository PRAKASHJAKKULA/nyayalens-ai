export type RiskTier = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';

export type ProjectSector = 
  | 'Community Infrastructure'
  | 'Education & Skill'
  | 'Healthcare & Sanitation'
  | 'Drinking Water'
  | 'Roads & Bridges'
  | 'Renewable Energy'
  | 'Sports & Culture';

export interface ProjectPhoto {
  id: string;
  url: string;
  caption: string;
  timestamp: string;
  geoLat: number;
  geoLng: number;
  sha256Hash: string;
  tamperVerified: boolean;
}

export interface RiskSignalBreakdown {
  costAnomaly: {
    score: number;
    actualCostLakhs: number;
    peerMedianLakhs: number;
    peerIqrMin: number;
    peerIqrMax: number;
    zScore: number;
    outlierMultiplier: number;
    explanation: string;
  };
  duplicateRisk: {
    score: number;
    matchedProjectId?: string;
    matchedProjectTitle?: string;
    textSimilarityPct: number;
    geoDistanceMeters: number;
    timeProximityDays: number;
    explanation: string;
  };
  delayProbability: {
    score: number;
    probabilityPct: number;
    projectedDelayMonths: number;
    bottleneckFactor: string;
    explanation: string;
  };
  utilizationAnomaly: {
    score: number;
    disbursementRatio: number;
    physicalCompletionRatio: number;
    financialProgressGapPct: number;
    explanation: string;
  };
  progressAnomaly: {
    score: number;
    expectedProgressPct: number;
    actualProgressPct: number;
    deviationPct: number;
    explanation: string;
  };
  totalScore: number;
  tier: RiskTier;
}

export interface Project {
  id: string;
  title: string;
  mpName: string;
  constituency: string;
  state: string;
  district: string;
  block: string;
  sector: ProjectSector;
  assetCategory: string;
  sanctionedAmountLakhs: number;
  spentAmountLakhs: number;
  financialProgressPct: number;
  physicalProgressPct: number;
  sanctionDate: string;
  targetCompletionDate: string;
  actualCompletionDate?: string;
  status: 'Sanctioned' | 'In Progress' | 'Delayed' | 'Completed' | 'Stalled';
  lat: number;
  lng: number;
  implementingAgencyId: string;
  implementingAgencyName: string;
  contractorId: string;
  contractorName: string;
  peerGroupId: string;
  riskSignals: RiskSignalBreakdown;
  evidenceSummary: string[];
  inspectionStatus: 'PENDING' | 'SCHEDULED' | 'VERIFIED' | 'FLAGGED';
  photos: ProjectPhoto[];
  lastInspectedAt?: string;
  reviewStatus: 'UNREVIEWED' | 'ACCEPTED' | 'DISMISSED' | 'ESCALATED' | 'RE_INSPECT';
  reviewNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}

export interface PeerGroup {
  id: string;
  name: string;
  sector: ProjectSector;
  assetCategory: string;
  state: string;
  districtTier: 'Tier 1 Metro' | 'Tier 2 Urban' | 'Tier 3 Semi-Urban' | 'Rural / Tribal';
  medianCostLakhs: number;
  iqrMinLakhs: number;
  iqrMaxLakhs: number;
  stdDevLakhs: number;
  sampleSize: number;
  typicalDurationMonths: number;
}

export interface ImplementingAgency {
  id: string;
  name: string;
  registrationNumber: string;
  type: 'Panchayati Raj' | 'Municipal Corp' | 'CPWD' | 'PWD' | 'Zilla Parishad' | 'State Rural Dev';
  state: string;
  district: string;
  activeProjects: number;
  flaggedProjects: number;
  averageDelayDays: number;
  riskRating: number; // 0-100
  isBlacklisted: boolean;
}

export interface Contractor {
  id: string;
  name: string;
  gstin: string;
  activeContractsCount: number;
  totalAwardedValueLakhs: number;
  delayedProjectsCount: number;
  overlapAlertsCount: number;
  riskRating: number;
}

export interface FieldInspectionSubmission {
  id: string;
  projectId: string;
  inspectorId: string;
  inspectorName: string;
  timestamp: string;
  recordedLat: number;
  recordedLng: number;
  targetLat: number;
  targetLng: number;
  distanceMeters: number;
  isGpsVerified: boolean;
  reportedPhysicalProgressPct: number;
  verifiedPhysicalProgressPct: number;
  isAssetVisible: boolean;
  isWorkActive: boolean;
  structuralIntegrityRating: 'High' | 'Moderate' | 'Poor' | 'Not Started';
  fieldRemarks: string;
  photos: {
    id: string;
    url: string;
    caption: string;
    timestamp: string;
    sha256Hash: string;
  }[];
  digitalTamperProofHash: string;
  recommendation: 'NORMAL' | 'NEEDS_REVIEW' | 'ESCALATE';
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: 'MOSPI_AUDITOR' | 'DISTRICT_COLLECTOR' | 'FIELD_INSPECTOR' | 'SYSTEM_AI' | 'SYSTEM_ADMIN';
  projectId: string;
  actionType: 
    | 'RISK_SCORE_COMPUTED' 
    | 'FIELD_INSPECTION_SUBMITTED' 
    | 'EVIDENCE_TAMPER_VERIFIED' 
    | 'RISK_SIGNAL_ACCEPTED' 
    | 'RISK_SIGNAL_DISMISSED' 
    | 'ESCALATED_TO_VIGILANCE' 
    | 'RE_INSPECTION_ORDERED';
  description: string;
  immutableProofHash: string;
}

export interface CitationReference {
  projectId?: string;
  projectTitle?: string;
  guidelineSection?: string;
  guidelineExcerpt?: string;
  evidenceConfidence?: number;
}

export interface InvestigatorMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  citations?: CitationReference[];
  actionPrompts?: {
    label: string;
    actionKey: string;
    payload?: any;
  }[];
}

export type UserRole = 'MOSPI_AUDITOR' | 'DISTRICT_COLLECTOR' | 'FIELD_INSPECTOR' | 'SYSTEM_ADMIN';
export type DeviceMode = 'auto' | 'desktop' | 'tablet' | 'mobile';
export type ThemeMode = 'light' | 'dark';

export interface LiveIntelligenceEvent {
  id: string;
  time: string;
  type: 'ANOMALY' | 'SCORE_CHANGE' | 'DUPLICATE' | 'INSPECTION' | 'REVIEW';
  projectId: string;
  title: string;
  changeDesc: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
}

