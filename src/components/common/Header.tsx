import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import { useSecurity } from '../../context/SecurityContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Smartphone,
  Monitor,
  ShieldCheck,
  Building2,
  ChevronRight,
  Sparkles,
  Lock,
  Play,
  Layers,
  SlidersHorizontal
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    deviceMode,
    setDeviceMode,
    themeMode,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    stats,
    setActiveTab,
    setSelectedProjectId,
    uiMode,
    toggleUiMode,
    startTour
  } = useProjects();

  const {
    currentUser,
    setAuthModalOpen
  } = useSecurity();

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#0f172a] border-b border-gov-200 dark:border-slate-800 px-4 lg:px-6 py-2.5 shadow-gov transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Government of India & NyayaLens Emblem Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            onClick={() => setActiveTab('command-center')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-900 text-white flex items-center justify-center font-serif font-black text-xs shadow-sm">
              🇮🇳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-gov-900 dark:text-white">
                  NYAYALENS AI
                </span>
                <span className="bg-brand-50 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-700 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded">
                  MoSPI SIH26102
                </span>
              </div>
              <p className="text-[10px] text-gov-500 dark:text-slate-400 font-medium">
                National MPLADS Public Project Risk Intelligence Platform
              </p>
            </div>
          </div>
        </div>

        {/* Global Project Search Input */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gov-400 dark:text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Project ID (e.g. MPL-28471), Agency, District..."
              className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 focus:border-brand-600 focus:bg-white dark:focus:bg-slate-900 rounded-lg pl-9 pr-4 py-1.5 text-xs text-gov-900 dark:text-slate-100 placeholder-gov-400 focus:outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Quick Guided Tour Button */}
          <button
            onClick={startTour}
            className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold px-3 py-1.5 rounded-lg text-xs transition-all shadow-sm"
          >
            <Play className="w-3 h-3 fill-white" />
            <span className="hidden sm:inline">30s Quick Tour</span>
          </button>

          {/* Mode Switcher: Executive Simple vs Advanced Analyst */}
          <button
            onClick={toggleUiMode}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all border flex items-center gap-1.5 ${
              uiMode === 'executive'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-gov-100 text-gov-800 border-gov-300 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
            }`}
            title="Toggle between Executive Simple View and Advanced Analyst Suite"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">
              {uiMode === 'executive' ? 'Simple Mode' : 'Advanced Mode'}
            </span>
          </button>

          {/* Theme Switcher: Light / Dark Analyst Mode */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-gov-200 dark:border-slate-800 bg-gov-50 dark:bg-slate-900 text-gov-600 dark:text-slate-300 hover:bg-gov-100 dark:hover:bg-slate-800 transition-all text-xs"
            title={themeMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {themeMode === 'light' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Officer Account Button */}
          <button
            onClick={() => setAuthModalOpen(true)}
            className="flex items-center gap-2 bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-xs hover:bg-gov-100 dark:hover:bg-slate-800 transition-all text-left"
          >
            <div className="w-5 h-5 rounded-full bg-brand-600 text-white font-bold text-[10px] flex items-center justify-center">
              {currentUser.name.slice(0, 1)}
            </div>
            <div className="hidden lg:block">
              <span className="font-bold text-gov-900 dark:text-white block text-[11px] leading-tight">
                {currentUser.name.split(' ')[0]}
              </span>
              <span className="text-[9px] text-brand-700 dark:text-brand-300 font-mono block">
                {currentUser.role.replace('_', ' ')}
              </span>
            </div>
            <Lock className="w-3 h-3 text-emerald-600" />
          </button>

          {/* Notification Alert Bell */}
          <button
            onClick={() => setActiveTab('review-center')}
            className="relative p-1.5 rounded-lg border border-gov-200 dark:border-slate-800 bg-gov-50 dark:bg-slate-900 text-gov-600 dark:text-slate-300 hover:bg-gov-100 dark:hover:bg-slate-800 transition-all"
            title="41 Anomaly Reviews Pending"
          >
            <Bell className="w-4 h-4 text-gov-700 dark:text-slate-300" />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-risk-critical text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
              {stats.needReviewCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
