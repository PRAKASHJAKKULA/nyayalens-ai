import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useSecurity } from '../../context/SecurityContext';
import {
  LayoutDashboard,
  ShieldAlert,
  CheckSquare,
  Share2,
  Box,
  Bot,
  Smartphone,
  BarChart3,
  ShieldCheck,
  Lock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, stats, uiMode, toggleUiMode, startTour } = useProjects();
  const { currentUser, setAuthModalOpen } = useSecurity();

  // 3 Core Tabs for Executive Simple Mode
  const coreNavItems = [
    {
      id: 'command-center',
      label: '1. Map & Overview',
      icon: LayoutDashboard,
      desc: 'National Risk Heatmap'
    },
    {
      id: 'evidence-explorer',
      label: '2. Flagged Projects',
      icon: ShieldAlert,
      desc: 'Plain Evidence Cards',
      badge: `${stats.criticalCount} Critical`,
      badgeStyle: 'bg-risk-criticalBg text-risk-criticalText border-risk-criticalBorder font-bold'
    },
    {
      id: 'review-center',
      label: '3. Auditor Decision Inbox',
      icon: CheckSquare,
      desc: '1-Click Determinations',
      badge: `${stats.needReviewCount} Pending`,
      badgeStyle: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    }
  ];

  // Specialized Deep-Dive Tools for Advanced Analyst Mode
  const advancedNavItems = [
    {
      id: 'relationship-graph',
      label: 'Contractor Network Graph',
      icon: Share2,
      badge: 'Collusion'
    },
    {
      id: 'digital-twin-3d',
      label: '3D CAD Asset Twin',
      icon: Box,
      badge: '3D'
    },
    {
      id: 'ai-investigator',
      label: 'AI Grounded Investigator',
      icon: Bot,
      badge: 'RAG'
    },
    {
      id: 'field-inspection',
      label: 'Mobile Field Inspector',
      icon: Smartphone,
      badge: 'GPS'
    },
    {
      id: 'security-soc',
      label: 'Security & SIEM Logs',
      icon: ShieldCheck,
      badge: '9/9 Pass'
    },
    {
      id: 'evaluation-lab',
      label: 'Evaluation ROI Lab',
      icon: BarChart3,
      badge: '4.5× ROI'
    }
  ];

  return (
    <aside className="w-full lg:w-60 bg-white dark:bg-[#0f172a] border-r border-gov-200 dark:border-slate-800 p-3 flex flex-col justify-between shrink-0 shadow-gov">
      <div className="space-y-3">
        {/* Simple Workflow Header */}
        <div className="px-2 py-1 flex items-center justify-between border-b border-gov-100 dark:border-slate-800 pb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gov-500 dark:text-slate-400">
            {uiMode === 'executive' ? 'Core 3-Step Workflow' : 'All Operations Suite'}
          </span>
          <span className="text-[10px] font-mono text-brand-600 dark:text-brand-400 font-bold">
            {uiMode === 'executive' ? 'Simple ✨' : 'Advanced ⚙️'}
          </span>
        </div>

        {/* 3 Core Workflow Navigation */}
        <nav className="space-y-1">
          {coreNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'text-gov-700 dark:text-slate-300 hover:bg-gov-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5 text-left">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-600'}`} />
                  <div>
                    <span className="block leading-tight">{item.label}</span>
                    <span className={`text-[10px] font-normal block ${isActive ? 'text-brand-100' : 'text-gov-400'}`}>
                      {item.desc}
                    </span>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded border shrink-0 ${
                      isActive ? 'bg-white/20 text-white border-white/30' : item.badgeStyle
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Advanced Tools Section */}
        {uiMode === 'advanced' ? (
          <div className="pt-2 border-t border-gov-100 dark:border-slate-800 space-y-1">
            <span className="px-2 text-[10px] font-bold uppercase tracking-wider text-gov-400 block pb-1">
              Specialized Deep-Dive Tools
            </span>
            {advancedNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200'
                      : 'text-gov-600 dark:text-slate-400 hover:bg-gov-50 dark:hover:bg-slate-850'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-gov-400" />
                    <span className="truncate max-w-[130px]">{item.label}</span>
                  </div>
                  <span className="text-[9px] font-mono bg-gov-100 dark:bg-slate-800 text-gov-500 px-1 rounded">
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <button
            onClick={toggleUiMode}
            className="w-full text-center py-2 px-3 bg-gov-50 hover:bg-gov-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-gov-200 dark:border-slate-800 rounded-xl text-[11px] font-semibold text-brand-600 dark:text-brand-400 flex items-center justify-center gap-1 transition-all"
          >
            <span>Show 6 Advanced Tools ⚙️</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Operator User Card */}
      <div className="pt-3 border-t border-gov-200 dark:border-slate-800 mt-4 space-y-2">
        <div
          onClick={() => setAuthModalOpen(true)}
          className="p-2.5 bg-gov-50 dark:bg-slate-900 hover:bg-gov-100 dark:hover:bg-slate-800 cursor-pointer rounded-lg border border-gov-200 dark:border-slate-800 flex items-center justify-between gap-2 transition-colors"
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-7 h-7 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
              {currentUser.name.slice(0, 1)}
            </div>
            <div className="overflow-hidden text-left">
              <span className="text-xs font-bold text-gov-900 dark:text-slate-200 block truncate">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-gov-500 dark:text-slate-400 font-mono block truncate">
                {currentUser.employeeId}
              </span>
            </div>
          </div>
          <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        </div>
      </div>
    </aside>
  );
};
