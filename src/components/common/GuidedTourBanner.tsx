import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  ShieldAlert,
  FileCheck,
  CheckCircle2,
  HelpCircle,
  Play
} from 'lucide-react';

export const GuidedTourBanner: React.FC = () => {
  const {
    tourActive,
    tourStep,
    startTour,
    nextTourStep,
    prevTourStep,
    endTour,
    uiMode,
    toggleUiMode
  } = useProjects();

  return (
    <>
      {/* Top Floating Quick-Action Bar (Shown when tour is inactive) */}
      {!tourActive && (
        <div className="bg-brand-900 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs shadow-md border-b border-brand-800">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-[10px]">
              ⚡
            </div>
            <span className="font-bold">
              3-Step Guided Investigation:
            </span>
            <span className="text-brand-200 hidden md:inline">
              1. Pick Flagged Project &rarr; 2. Inspect Evidence Cards &rarr; 3. Take 1-Click Action
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={startTour}
              className="bg-white hover:bg-brand-50 text-brand-900 font-extrabold px-3 py-1 rounded-md text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <Play className="w-3 h-3 fill-brand-900" />
              <span>Start 30s Interactive Tour</span>
            </button>

            <button
              onClick={toggleUiMode}
              className="bg-brand-800 hover:bg-brand-700 text-brand-100 font-medium px-2.5 py-1 rounded-md text-[11px] transition-all border border-brand-700"
            >
              {uiMode === 'executive' ? 'Switch to Advanced Tools ⚙️' : 'Switch to Simple Mode ✨'}
            </button>
          </div>
        </div>
      )}

      {/* Interactive Tour Floating Modal */}
      {tourActive && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-white dark:bg-[#0f172a] border-2 border-brand-600 rounded-2xl shadow-2xl p-5 space-y-3 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gov-200 dark:border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="bg-brand-600 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                Step {tourStep} of 3
              </span>
              <h4 className="font-bold text-xs text-gov-900 dark:text-white uppercase tracking-wider">
                {tourStep === 1 && '1. National Anomaly Queue'}
                {tourStep === 2 && '2. Plain Evidence Breakdown'}
                {tourStep === 3 && '3. One-Click Determination'}
              </h4>
            </div>

            <button
              onClick={endTour}
              className="text-gov-400 hover:text-gov-700 dark:hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-2 text-xs">
            {tourStep === 1 && (
              <div className="space-y-1.5 text-gov-700 dark:text-slate-300 leading-relaxed">
                <p>
                  <strong>🗺️ Step 1:</strong> The National Map highlights flagged projects across India. Case <strong className="text-risk-critical">MPL-28471 (Hyderabad Community Hall)</strong> has an escalated risk score of <strong>87 / 100 CRITICAL</strong>.
                </p>
                <div className="p-2 bg-gov-50 dark:bg-slate-900 rounded-lg border border-gov-200 dark:border-slate-800 text-[11px]">
                  💡 <em>Next, we will open this project to see why it was flagged.</em>
                </div>
              </div>
            )}

            {tourStep === 2 && (
              <div className="space-y-1.5 text-gov-700 dark:text-slate-300 leading-relaxed">
                <p>
                  <strong>📁 Step 2:</strong> Look at the 3 simple reasons why this project is flagged:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  <li><strong>Cost Anomaly:</strong> ₹29.0L sanctioned vs ₹10.5L peer average (2.76× higher).</li>
                  <li><strong>Duplicate Work:</strong> Overlaps with MPL-28469 at 42m distance.</li>
                  <li><strong>Field Verification:</strong> Photo proof confirms only 38% physical work.</li>
                </ul>
              </div>
            )}

            {tourStep === 3 && (
              <div className="space-y-1.5 text-gov-700 dark:text-slate-300 leading-relaxed">
                <p>
                  <strong>⚖️ Step 3:</strong> As an auditor, you now take a 1-click decision:
                </p>
                <div className="flex gap-2 pt-1">
                  <span className="flex-1 bg-risk-criticalBg border border-risk-criticalBorder text-risk-criticalText text-[10px] font-bold p-2 rounded text-center">
                    🚨 Escalate to Anti-Corruption / Vigilance
                  </span>
                  <span className="flex-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold p-2 rounded text-center">
                    ✅ Approve Funds Release
                  </span>
                </div>
                <p className="text-[10px] text-gov-500 pt-1">
                  Every decision is sealed with a SHA-256 digital proof in the National Audit Vault.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-gov-200 dark:border-slate-800">
            <button
              onClick={prevTourStep}
              disabled={tourStep === 1}
              className="text-xs font-semibold text-gov-600 dark:text-slate-400 disabled:opacity-30 hover:underline flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={endTour}
                className="text-xs text-gov-500 hover:text-gov-800 px-2 py-1"
              >
                Close Tour
              </button>
              <button
                onClick={nextTourStep}
                className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-sm"
              >
                <span>{tourStep === 3 ? 'Finish Tour 🎉' : 'Next Step'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
