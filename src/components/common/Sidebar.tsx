import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useSecurity } from '../../context/SecurityContext';
import {
  LayoutDashboard,
  Map,
  FolderKanban,
  ShieldAlert,
  Share2,
  Box,
  Bot,
  Smartphone,
  CheckSquare,
  BarChart3,
  Settings,
  User,
  ShieldCheck,
  Building,
  Lock
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, stats } = useProjects();
  const { currentUser, setAuthModalOpen } = useSecurity();

  const navItems = [
    {
      id: 'command-center',
      label: 'Command Center',
      icon: LayoutDashboard,
      badge: 'National'
    },
    {
      id: 'evidence-explorer',
      label: 'Projects & Evidence',
      icon: ShieldAlert,
      badge: `${stats.criticalCount} High Risk`,
      badgeStyle: 'bg-risk-criticalBg text-risk-criticalText border-risk-criticalBorder font-bold'
    },
    {
      id: 'relationship-graph',
      label: 'Network Intelligence',
      icon: Share2,
      badge: 'Graph'
    },
    {
      id: 'digital-twin-3d',
      label: '3D Asset Digital Twin',
      icon: Box,
      badge: 'CAD'
    },
    {
      id: 'ai-investigator',
      label: 'AI Investigator',
      icon: Bot,
      badge: 'RAG Agent',
      badgeStyle: 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
    },
    {
      id: 'field-inspection',
      label: 'Field Verification App',
      icon: Smartphone,
      badge: 'GPS Geofence',
      badgeStyle: 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800'
    },
    {
      id: 'review-center',
      label: 'Review & Audit Vault',
      icon: CheckSquare,
      badge: `${stats.needReviewCount} Action`,
      badgeStyle: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
    },
    {
      id: 'security-soc',
      label: 'Security & SIEM',
      icon: ShieldCheck,
      badge: '9/9 Checks',
      badgeStyle: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-bold'
    },
    {
      id: 'evaluation-lab',
      label: 'Evaluation Lab',
      icon: BarChart3,
      badge: '4.5× ROI'
    }
  ];

  return (
    <aside className="w-full lg:w-60 bg-white dark:bg-[#0f172a] border-r border-gov-200 dark:border-slate-800 p-3 flex flex-col justify-between shrink-0 shadow-gov">
      <div className="space-y-1">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gov-400 dark:text-slate-500 flex items-center justify-between">
          <span>Operational Modules</span>
          <span className="font-mono text-brand-600 dark:text-brand-400">MoSPI v2.4</span>
        </div>

        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shadow-sm'
                    : 'text-gov-600 dark:text-slate-300 hover:text-gov-900 dark:hover:text-white hover:bg-gov-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-brand-600 dark:text-brand-400' : 'text-gov-400 dark:text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                      item.badgeStyle || 'bg-gov-100 dark:bg-slate-800 text-gov-600 dark:text-slate-300 border-gov-200 dark:border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Operator User Card with Switch Officer Trigger */}
      <div className="pt-3 border-t border-gov-200 dark:border-slate-800 mt-4 space-y-2">
        <div
          onClick={() => setAuthModalOpen(true)}
          className="p-2.5 bg-gov-50 dark:bg-slate-900 hover:bg-gov-100 dark:hover:bg-slate-800 cursor-pointer rounded-lg border border-gov-200 dark:border-slate-800 flex items-center justify-between gap-2 transition-colors"
          title="Click to Switch Officer Account or Inspect Session"
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

        <div className="flex items-center justify-between text-[10px] text-gov-400 dark:text-slate-500 px-1 font-mono">
          <span className="flex items-center gap-1 text-emerald-600 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            SOC Guard: Active
          </span>
          <span>9/9 Certified</span>
        </div>
      </div>
    </aside>
  );
};
