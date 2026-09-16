import React from 'react';
import { ProjectProvider, useProjects } from './context/ProjectContext';
import { SecurityProvider } from './context/SecurityContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { CommandCenter } from './components/dashboard/CommandCenter';
import { EvidenceExplorer } from './components/evidence/EvidenceExplorer';
import { RelationshipGraph } from './components/graph/RelationshipGraph';
import { DigitalTwin3D } from './components/3d/DigitalTwin3D';
import { AiInvestigator } from './components/investigator/AiInvestigator';
import { MobileInspectionView } from './components/mobile/MobileInspectionView';
import { ReviewCenter } from './components/review/ReviewCenter';
import { EvaluationLab } from './components/evaluation/EvaluationLab';
import { SecurityOperationsCenter } from './components/security/SecurityOperationsCenter';
import { AuthModal } from './components/security/AuthModal';
import { SessionTimeoutModal } from './components/security/SessionTimeoutModal';

const AppContent: React.FC = () => {
  const { activeTab, deviceMode } = useProjects();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'command-center':
        return <CommandCenter />;
      case 'evidence-explorer':
        return <EvidenceExplorer />;
      case 'relationship-graph':
        return <RelationshipGraph />;
      case 'digital-twin-3d':
        return <DigitalTwin3D />;
      case 'ai-investigator':
        return <AiInvestigator />;
      case 'field-inspection':
        return <MobileInspectionView />;
      case 'review-center':
        return <ReviewCenter />;
      case 'security-soc':
        return <SecurityOperationsCenter />;
      case 'evaluation-lab':
        return <EvaluationLab />;
      default:
        return <CommandCenter />;
    }
  };

  return (
    <div className="min-h-screen bg-gov-50 dark:bg-[#0b1329] text-gov-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Persistent Enterprise Sidebar */}
        <Sidebar />

        {/* Main Operational Viewport */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gov-50 dark:bg-[#0b1329]">
          {deviceMode === 'mobile' ? (
            <div className="max-w-md mx-auto py-2">
              <div className="text-center pb-2 text-[11px] text-gov-500 dark:text-slate-400 font-mono">
                📱 Simulated Smartphone Viewport (Field Inspector App)
              </div>
              <MobileInspectionView />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto space-y-5">{renderActiveView()}</div>
          )}
        </main>
      </div>

      {/* Global Security Modals */}
      <AuthModal />
      <SessionTimeoutModal />
    </div>
  );
};

export function App() {
  return (
    <SecurityProvider>
      <ProjectProvider>
        <AppContent />
      </ProjectProvider>
    </SecurityProvider>
  );
}

export default App;
