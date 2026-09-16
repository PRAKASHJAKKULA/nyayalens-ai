import React from 'react';
import { Project } from '../../types';
import { PEER_GROUPS } from '../../data/peerGroups';
import { BarChart2, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface PeerComparisonCardProps {
  project: Project;
}

export const PeerComparisonCard: React.FC<PeerComparisonCardProps> = ({ project }) => {
  const peer = PEER_GROUPS.find((p) => p.id === project.peerGroupId) || PEER_GROUPS[0];
  const s = project.riskSignals.costAnomaly;

  const maxScale = Math.max(35, project.sanctionedAmountLakhs * 1.15);
  const medianPct = (peer.medianCostLakhs / maxScale) * 100;
  const iqrMinPct = (peer.iqrMinLakhs / maxScale) * 100;
  const iqrMaxPct = (peer.iqrMaxLakhs / maxScale) * 100;
  const projectPct = (project.sanctionedAmountLakhs / maxScale) * 100;

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl p-5 shadow-gov space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gov-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <h3 className="text-xs font-bold text-gov-900 dark:text-white uppercase tracking-wider">
            Peer Group Cost Distribution Benchmark
          </h3>
        </div>
        <span className="text-[11px] font-mono bg-gov-100 dark:bg-slate-800 text-gov-700 dark:text-slate-300 px-2.5 py-0.5 rounded border border-gov-200 dark:border-slate-700">
          Cohort: {peer.name} (N = {peer.sampleSize})
        </span>
      </div>

      {/* Narrative Explanation Box */}
      <div className="p-3 rounded-lg bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 text-xs flex items-start gap-2.5">
        <AlertTriangle
          className={`w-4 h-4 shrink-0 mt-0.5 ${
            s.outlierMultiplier >= 2.0 ? 'text-risk-critical' : 'text-risk-moderate'
          }`}
        />
        <div className="space-y-1">
          <p className="text-gov-800 dark:text-slate-200 font-semibold leading-relaxed">
            {s.explanation}
          </p>
          <p className="text-[11px] text-gov-500 dark:text-slate-400">
            Statistical fence formula applied: Upper Limit = Q3 + 1.5 &times; IQR (₹{peer.iqrMaxLakhs}L).
          </p>
        </div>
      </div>

      {/* Visual Distribution Range Bar */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between text-[11px] text-gov-500 dark:text-slate-400 font-mono">
          <span>₹0 Lakhs</span>
          <span className="font-bold text-gov-700 dark:text-slate-300">
            Expected Peer IQR: ₹{peer.iqrMinLakhs}L – ₹{peer.iqrMaxLakhs}L
          </span>
          <span>₹{maxScale.toFixed(0)} Lakhs</span>
        </div>

        <div className="relative w-full h-9 bg-gov-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-gov-200 dark:border-slate-700 p-1">
          {/* Peer Normal Interquartile Range (IQR) */}
          <div
            className="absolute top-1 bottom-1 bg-emerald-100 dark:bg-emerald-950/60 border-x-2 border-emerald-500 rounded flex items-center justify-center"
            style={{ left: `${iqrMinPct}%`, width: `${iqrMaxPct - iqrMinPct}%` }}
          >
            <span className="text-[9px] font-mono font-bold text-emerald-800 dark:text-emerald-300 tracking-wider">
              SAFE PEER IQR
            </span>
          </div>

          {/* Peer Median Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-brand-600 dark:bg-brand-400 z-10 flex flex-col items-center"
            style={{ left: `${medianPct}%` }}
          >
            <div className="w-2 h-2 rounded-full bg-brand-600 dark:bg-brand-400 -mt-0.5" />
          </div>

          {/* Actual Project Marker */}
          <div
            className="absolute top-0 bottom-0 z-20 flex flex-col items-center justify-center"
            style={{ left: `${Math.min(92, projectPct)}%` }}
          >
            <div className="px-2 py-0.5 rounded bg-risk-critical text-white font-mono font-extrabold text-[10px] shadow-sm -mt-0.5">
              ₹{project.sanctionedAmountLakhs}L (Actual)
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between text-[11px] text-gov-600 dark:text-slate-400 pt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-brand-600 rounded-full" />
            <span>Peer Median: <strong>₹{peer.medianCostLakhs} Lakhs</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
            <span>Tolerance Spread: <strong>&plusmn;₹{peer.stdDevLakhs}L</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-risk-critical rounded-sm" />
            <span className="text-risk-critical font-bold">
              Z-Score: +{s.zScore} &sigma; ({s.outlierMultiplier}&times; Median)
            </span>
          </div>
        </div>
      </div>

      {/* Cohort Attribute Factors */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
        <div className="bg-gov-50 dark:bg-slate-900 p-2 rounded-lg border border-gov-200 dark:border-slate-800">
          <span className="text-gov-400 dark:text-slate-500 text-[10px] block font-semibold">Asset Category</span>
          <span className="text-gov-800 dark:text-slate-200 font-bold text-[11px] truncate block">{project.assetCategory}</span>
        </div>
        <div className="bg-gov-50 dark:bg-slate-900 p-2 rounded-lg border border-gov-200 dark:border-slate-800">
          <span className="text-gov-400 dark:text-slate-500 text-[10px] block font-semibold">District Scale Tier</span>
          <span className="text-gov-800 dark:text-slate-200 font-bold text-[11px]">{peer.districtTier}</span>
        </div>
        <div className="bg-gov-50 dark:bg-slate-900 p-2 rounded-lg border border-gov-200 dark:border-slate-800">
          <span className="text-gov-400 dark:text-slate-500 text-[10px] block font-semibold">Standard Duration</span>
          <span className="text-gov-800 dark:text-slate-200 font-bold text-[11px]">{peer.typicalDurationMonths} Months</span>
        </div>
        <div className="bg-gov-50 dark:bg-slate-900 p-2 rounded-lg border border-gov-200 dark:border-slate-800">
          <span className="text-gov-400 dark:text-slate-500 text-[10px] block font-semibold">Risk Engine Weight</span>
          <span className="text-risk-critical font-mono font-bold text-[11px]">+{s.score} Points</span>
        </div>
      </div>
    </div>
  );
};
