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

interface ProjectContextType {
  projects: Project[];
  selectedProject: Project;
  setSelectedProjectId: (id: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
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
  const [userRole, setUserRole] = useState<UserRole>('MOSPI_AUDITOR');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('auto');
  const [themeMode, setThemeModeState] = useState<ThemeMode>('light');

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
    const id = `INSP-${Date.now().toString().slice(-6)}`;
    const proofHash = await createInspectionProof({
      ...inspectionData,
      id
    });

    const fullInspection: FieldInspectionSubmission = {
      ...inspectionData,
      id,
      digitalTamperProofHash: proofHash
    };

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === inspectionData.projectId) {
          const newPhotos = inspectionData.photos.map((ph) => ({
            id: ph.id,
            url: ph.url,
            caption: ph.caption,
            timestamp: ph.timestamp,
            geoLat: inspectionData.recordedLat,
            geoLng: inspectionData.recordedLng,
            sha256Hash: ph.sha256Hash,
            tamperVerified: true
          }));

          const updatedProject: Project = {
            ...p,
            inspectionStatus: inspectionData.recommendation === 'ESCALATE' ? 'FLAGGED' : 'VERIFIED',
            lastInspectedAt: inspectionData.timestamp,
            physicalProgressPct: inspectionData.verifiedPhysicalProgressPct,
            photos: [...p.photos, ...newPhotos]
          };

          const updatedSignals = computeProjectRiskScore(updatedProject, prev);
          return {
            ...updatedProject,
            riskSignals: updatedSignals
          };
        }
        return p;
      })
    );

    const newLog: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      actor: inspectionData.inspectorName,
      role: 'FIELD_INSPECTOR',
      projectId: inspectionData.projectId,
      actionType: 'FIELD_INSPECTION_SUBMITTED',
      description: `Field inspection by ${inspectionData.inspectorName}. GPS: ${inspectionData.distanceMeters}m (PASS). Progress updated to ${inspectionData.verifiedPhysicalProgressPct}%.`,
      immutableProofHash: proofHash
    };

    const newEvt: LiveIntelligenceEvent = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'INSPECTION',
      projectId: inspectionData.projectId,
      title: 'Field Verification Completed & Signed',
      changeDesc: `GPS: ${inspectionData.distanceMeters}m from site. Physical progress set to ${inspectionData.verifiedPhysicalProgressPct}%.`,
      severity: inspectionData.recommendation === 'ESCALATE' ? 'CRITICAL' : 'LOW'
    };

    setAuditLogs((prev) => [newLog, ...prev]);
    setLiveEvents((prev) => [newEvt, ...prev]);
  };

  const updateProjectReview = async (
    projectId: string,
    reviewStatus: Project['reviewStatus'],
    notes: string
  ) => {
    const actor = userRole === 'MOSPI_AUDITOR' ? 'Dr. S. Verma (MoSPI)' : 'K. Ramesh (District Collector)';
    const actionType =
      reviewStatus === 'ACCEPTED'
        ? 'RISK_SIGNAL_ACCEPTED'
        : reviewStatus === 'DISMISSED'
        ? 'RISK_SIGNAL_DISMISSED'
        : reviewStatus === 'ESCALATED'
        ? 'ESCALATED_TO_VIGILANCE'
        : 'RE_INSPECTION_ORDERED';

    const hash = await calculateSha256({
      projectId,
      reviewStatus,
      notes,
      actor,
      timestamp: new Date().toISOString()
    });

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            reviewStatus,
            reviewNotes: notes,
            reviewedBy: actor,
            reviewedAt: new Date().toISOString().split('T')[0]
          };
        }
        return p;
      })
    );

    const newLog: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString(),
      actor,
      role: userRole,
      projectId,
      actionType,
      description: `Decision [${reviewStatus}]: ${notes}`,
      immutableProofHash: hash
    };

    const newEvt: LiveIntelligenceEvent = {
      id: `EVT-${Date.now().toString().slice(-4)}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'REVIEW',
      projectId,
      title: `Auditor Determination: ${reviewStatus}`,
      changeDesc: notes,
      severity: reviewStatus === 'ESCALATED' ? 'CRITICAL' : 'MODERATE'
    };

    setAuditLogs((prev) => [newLog, ...prev]);
    setLiveEvents((prev) => [newEvt, ...prev]);
  };

  const filteredProjects = projects.filter((p) => {
    if (filterTier !== 'ALL' && p.riskSignals.tier !== filterTier) return false;
    if (filterSector !== 'ALL' && p.sector !== filterSector) return false;
    if (filterState !== 'ALL' && p.state !== filterState) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        p.id.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.implementingAgencyName.toLowerCase().includes(q) ||
        p.contractorName.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const totalSanctionedLakhs = projects.reduce((acc, p) => acc + p.sanctionedAmountLakhs, 0);
  const totalSpentLakhs = projects.reduce((acc, p) => acc + p.spentAmountLakhs, 0);

  const stats = {
    totalProjects: 12480,
    criticalCount: 127,
    highCount: 312,
    moderateCount: 2246,
    lowCount: 8860,
    totalSanctionedCr: 2840.5,
    totalSpentCr: 2310.2,
    needReviewCount: 41
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        selectedProject,
        setSelectedProjectId,
        activeTab,
        setActiveTab,
        userRole,
        setUserRole,
        deviceMode,
        setDeviceMode,
        themeMode,
        setThemeMode,
        toggleTheme,
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
