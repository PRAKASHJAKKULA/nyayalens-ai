import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Project,
  UserRole,
  DeviceMode,
  ThemeMode,
  RiskTier,
  ProjectSector,
  AuditLogEntry,
  FieldInspectionSubmission,
  LiveIntelligenceEvent
} from '../types';
import { INITIAL_PROJECTS } from '../data/mockProjects';
import { INITIAL_AUDIT_LOGS, createInspectionProof, calculateSha256 } from '../services/cryptoLedger';
import { computeProjectRiskScore } from '../services/riskEngine';

const INITIAL_LIVE_EVENTS: LiveIntelligenceEvent[] = [
  {
    id: 'EVT-01',
    time: '14:32',
    type: 'ANOMALY',
    projectId: 'MPL-28471',
    title: 'Cost Anomaly & Utilization Gap Flagged',
    changeDesc: 'Sanction ₹29.0L exceeds peer median ₹10.5L (2.76×). Financial draw gap +46.5%.',
    severity: 'CRITICAL'
  },
  {
    id: 'EVT-02',
    time: '14:28',
    type: 'SCORE_CHANGE',
    projectId: 'MPL-28471',
    title: 'Multi-Signal Risk Index Recalculated',
    changeDesc: 'Risk Score escalated: 64 → 87 (CRITICAL)',
    severity: 'CRITICAL'
  },
  {
    id: 'EVT-03',
    time: '14:21',
    type: 'DUPLICATE',
    projectId: 'MPL-28469',
    title: 'Spatial-Thematic Duplicate Pair Identified',
    changeDesc: 'Matched with MPL-28471 located 42m away (89.4% NLP match)',
    severity: 'HIGH'
  },
  {
    id: 'EVT-04',
    time: '14:08',
    type: 'INSPECTION',
    projectId: 'MPL-28471',
    title: 'Field Verification Photos Uploaded',
    changeDesc: '2 geo-tagged photos sealed with SHA-256 hash by Inspector INS-TEL-4091',
    severity: 'MODERATE'
  },
  {
    id: 'EVT-05',
    time: '13:45',
    type: 'ANOMALY',
    projectId: 'MPL-19042',
    title: 'Physical Progress Stagnation Alert',
    changeDesc: 'CC Road Lucknow: 89.8% fund disbursed vs 22% physical progress (-67.8% gap)',
    severity: 'CRITICAL'
  }
];

export type UiMode = 'executive' | 'advanced';
export type AppStage = 'PURPOSE_WELCOME' | 'OFFICER_LOGIN' | 'MAIN_DASHBOARD';

interface ProjectContextType {
  projects: Project[];
  selectedProject: Project;
  setSelectedProjectId: (id: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  appStage: AppStage;
  setAppStage: (stage: AppStage) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  uiMode: UiMode;
  setUiMode: (mode: UiMode) => void;
  toggleUiMode: () => void;
  tourActive: boolean;
  tourStep: number;
  startTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  endTour: () => void;
  filterTier: RiskTier | 'ALL';
  setFilterTier: (tier: RiskTier | 'ALL') => void;
  filterSector: ProjectSector | 'ALL';
  setFilterSector: (sector: ProjectSector | 'ALL') => void;
  filterState: string;
  setFilterState: (state: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProjects: Project[];
  auditLogs: AuditLogEntry[];
  liveEvents: LiveIntelligenceEvent[];
  submitFieldInspection: (inspection: Omit<FieldInspectionSubmission, 'id' | 'digitalTamperProofHash'>) => Promise<void>;
  updateProjectReview: (projectId: string, status: Project['reviewStatus'], notes: string) => Promise<void>;
  recomputeRiskForProject: (projectId: string) => void;
  stats: {
    totalProjects: number;
    criticalCount: number;
    highCount: number;
    moderateCount: number;
    lowCount: number;
    totalSanctionedCr: number;
    totalSpentCr: number;
    needReviewCount: number;
  };
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedProjectId, setSelectedProjectIdState] = useState<string>('MPL-28471');
  const [activeTab, setActiveTab] = useState<string>('command-center');
  const [appStage, setAppStage] = useState<AppStage>('PURPOSE_WELCOME'); // Default to Purpose Welcome page
  const [userRole, setUserRole] = useState<UserRole>('MOSPI_AUDITOR');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('auto');
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');
  const [uiMode, setUiMode] = useState<UiMode>('executive'); // Default to Executive Simple Mode

  // Guided Tour State
  const [tourActive, setTourActive] = useState<boolean>(false);
  const [tourStep, setTourStep] = useState<number>(1);

  const [filterTier, setFilterTier] = useState<RiskTier | 'ALL'>('ALL');
  const [filterSector, setFilterSector] = useState<ProjectSector | 'ALL'>('ALL');
  const [filterState, setFilterState] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [liveEvents, setLiveEvents] = useState<LiveIntelligenceEvent[]>(INITIAL_LIVE_EVENTS);

  // Sync theme with HTML root class
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [themeMode]);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
  };

  const toggleTheme = () => {
    setThemeModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleUiMode = () => {
    setUiMode((prev) => (prev === 'executive' ? 'advanced' : 'executive'));
  };

  const startTour = () => {
    setSelectedProjectIdState('MPL-28471');
    setActiveTab('command-center');
    setTourStep(1);
    setTourActive(true);
  };

  const nextTourStep = () => {
    if (tourStep === 1) {
      setSelectedProjectIdState('MPL-28471');
      setActiveTab('evidence-explorer');
      setTourStep(2);
    } else if (tourStep === 2) {
      setActiveTab('review-center');
      setTourStep(3);
    } else {
      setTourActive(false);
      setTourStep(1);
    }
  };

  const prevTourStep = () => {
    if (tourStep === 3) {
      setActiveTab('evidence-explorer');
      setTourStep(2);
    } else if (tourStep === 2) {
      setActiveTab('command-center');
      setTourStep(1);
    }
  };

  const endTour = () => {
    setTourActive(false);
    setTourStep(1);
  };

  const selectedProject =
    projects.find((p) => p.id === selectedProjectId) || projects[0] || INITIAL_PROJECTS[0];

  const setSelectedProjectId = (id: string) => {
    setSelectedProjectIdState(id);
  };

  const recomputeRiskForProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const newSignals = computeProjectRiskScore(p, prev);
          return { ...p, riskSignals: newSignals };
        }
        return p;
      })
    );
  };

  const submitFieldInspection = async (
    inspectionData: Omit<FieldInspectionSubmission, 'id' | 'digitalTamperProofHash'>
  ) => {
    const newId = `INSP-${Date.now().toString().slice(-4)}`;
    const proofPayload = `${newId}-${inspectionData.projectId}-${inspectionData.timestamp}-${inspectionData.verifiedPhysicalProgressPct}-${inspectionData.recordedLat}`;
    const tamperHash = await calculateSha256(proofPayload);

    const fullInspection: FieldInspectionSubmission = {
      ...inspectionData,
      id: newId,
      digitalTamperProofHash: tamperHash
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === inspectionData.projectId) {
          return {
            ...p,
            physicalProgressPct: inspectionData.verifiedPhysicalProgressPct,
            inspectionStatus: 'VERIFIED',
            reviewStatus:
              inspectionData.recommendation === 'ESCALATE'
                ? 'ESCALATED'
                : inspectionData.recommendation === 'NEEDS_REVIEW'
                ? 'RE_INSPECT'
                : 'ACCEPTED'
          };
        }
        return p;
      })
    );

    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      actor: inspectionData.inspectorName,
      role: 'FIELD_INSPECTOR',
      actionType: 'FIELD_INSPECTION_SUBMITTED',
      projectId: inspectionData.projectId,
      description: `Field inspection recorded (${inspectionData.verifiedPhysicalProgressPct}% actual vs ${inspectionData.reportedPhysicalProgressPct}% reported). GPS proximity: ${inspectionData.distanceMeters.toFixed(1)}m.`,
      immutableProofHash: tamperHash
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    const newEvent: LiveIntelligenceEvent = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'INSPECTION',
      projectId: inspectionData.projectId,
      title: 'Field Verification Completed & Signed',
      changeDesc: `Inspector verified ${inspectionData.verifiedPhysicalProgressPct}% physical work at (${inspectionData.recordedLat.toFixed(3)}, ${inspectionData.recordedLng.toFixed(3)})`,
      severity: inspectionData.recommendation === 'ESCALATE' ? 'CRITICAL' : 'MODERATE'
    };
    setLiveEvents((prev) => [newEvent, ...prev]);
  };

  const updateProjectReview = async (
    projectId: string,
    status: Project['reviewStatus'],
    notes: string
  ) => {
    const hash = await calculateSha256(`REVIEW-${projectId}-${status}-${Date.now()}-${notes}`);

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            reviewStatus: status,
            reviewNotes: notes
          };
        }
        return p;
      })
    );

    const newLog: AuditLogEntry = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
      actor: 'Dr. Suresh Verma',
      role: userRole,
      actionType: status === 'ESCALATED' ? 'ESCALATED_TO_VIGILANCE' : 'RISK_SIGNAL_ACCEPTED',
      projectId,
      description: `Determination recorded: ${status}. Notes: ${notes}`,
      immutableProofHash: hash
    };
    setAuditLogs((prev) => [newLog, ...prev]);

    const newEvent: LiveIntelligenceEvent = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'SCORE_CHANGE',
      projectId,
      title: `Auditor Determination: ${status}`,
      changeDesc: notes.slice(0, 70) + (notes.length > 70 ? '...' : ''),
      severity: status === 'ESCALATED' ? 'CRITICAL' : 'LOW'
    };
    setLiveEvents((prev) => [newEvent, ...prev]);
  };

  const filteredProjects = projects.filter((p) => {
    if (filterTier !== 'ALL' && p.riskSignals.tier !== filterTier) return false;
    if (filterSector !== 'ALL' && p.sector !== filterSector) return false;
    if (filterState !== 'ALL' && p.state !== filterState) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchId = p.id.toLowerCase().includes(q);
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchDistrict = p.district.toLowerCase().includes(q);
      const matchMp = p.mpName.toLowerCase().includes(q);
      const matchAgency = p.implementingAgencyName.toLowerCase().includes(q);
      return matchId || matchTitle || matchDistrict || matchMp || matchAgency;
    }
    return true;
  });

  const stats = {
    totalProjects: 12480,
    criticalCount: projects.filter((p) => p.riskSignals.tier === 'CRITICAL').length,
    highCount: projects.filter((p) => p.riskSignals.tier === 'HIGH').length,
    moderateCount: projects.filter((p) => p.riskSignals.tier === 'MODERATE').length,
    lowCount: projects.filter((p) => p.riskSignals.tier === 'LOW').length,
    totalSanctionedCr: 2840.5,
    totalSpentCr: 1984.2,
    needReviewCount: projects.filter((p) => p.reviewStatus === 'UNREVIEWED' || p.reviewStatus === 'RE_INSPECT').length
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        setSelectedProjectId,
        activeTab,
        setActiveTab,
        appStage,
        setAppStage,
        userRole,
        setUserRole,
        deviceMode,
        setDeviceMode,
        themeMode,
        setThemeMode,
        toggleTheme,
        uiMode,
        setUiMode,
        toggleUiMode,
        tourActive,
        tourStep,
        startTour,
        nextTourStep,
        prevTourStep,
        endTour,
        filterTier,
        setFilterTier,
        filterSector,
        setFilterSector,
        filterState,
        setFilterState,
        searchQuery,
        setSearchQuery,
        filteredProjects,
        auditLogs,
        liveEvents,
        submitFieldInspection,
        updateProjectReview,
        recomputeRiskForProject,
        stats
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
