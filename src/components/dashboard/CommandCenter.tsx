import React from 'react';
import { useProjects } from '../../context/ProjectContext';
import { MetricCard } from '../common/MetricCard';
import { NationalRiskMap } from './NationalRiskMap';
import {
  FolderKanban,
  ShieldAlert,
  Clock,
  TrendingUp,
  Activity,
  ChevronRight,
  AlertTriangle,
  Play,
  Share2,
  FileSearch,
  Sparkles,
  Layers
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const {
    projects,
    stats,
    setSelectedProjectId,
    setActiveTab,
    liveEvents
  } = useProjects();

  const handleStartJudgeDemo = () => {
    setSelectedProjectId('MPL-28471');
    setActiveTab('evidence-explorer');
  };

  const criticalProjects = projects
    .filter((p) => p.riskSignals.totalScore >= 60)
    .sort((a, b) => b.riskSignals.totalScore - a.riskSignals.totalScore);

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Top Operational Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 p-4 rounded-xl shadow-gov">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base lg:text-lg font-extrabold text-gov-900 dark:text-white tracking-tight">
              National Project Risk Intelligence & Decision Support
            </h1>
            <span className="bg-brand-100 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
              MPLADS MoSPI 2024–25
            </span>
          </div>
          <p className="text-xs text-gov-500 dark:text-slate-400">
            Automated outlier screening, peer group baselines, geospatial overlap detection, and risk-ranked investigation protocols.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleStartJudgeDemo}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2 px-3.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Launch 5-Min Judge Demo Flow</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <MetricCard
          title="Projects Monitored"
          value="12,480"
          subtitle="Active All-India Schemes"
          change="+312 this month"
          icon={FolderKanban}
          color="blue"
        />
        <MetricCard
          title="High & Critical Risk"
          value="127"
          subtitle="Top 1.0% Statistical Outliers"
          change="Requires Human Audit"
          isNegativeChange
          icon={ShieldAlert}
          color="red"
          onClick={() => {
            setSelectedProjectId('MPL-28471');
            setActiveTab('evidence-explorer');
          }}
        />
        <MetricCard
          title="Action Review Queue"
          value="41"
          subtitle="Awaiting Auditor Sign-off"
          change="Pending Determination"
          icon={Clock}
          color="amber"
          onClick={() => setActiveTab('review-center')}
        />
        <MetricCard
          title="Monitored Capital"
          value="₹2,840 Cr"
          subtitle="₹2,310 Cr Disbursed (81.3%)"
          change="Across 28 States & UTs"
          icon={TrendingUp}
          color="emerald"
        />
      </div>

      {/* Real-Time Risk Distribution Bar (Colorful through DATA) */}
      <div className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 p-4 rounded-xl shadow-gov space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold text-gov-900 dark:text-white uppercase tracking-wider text-[11px]">
            National Risk Distribution Index
          </span>
          <span className="font-mono text-gov-500 dark:text-slate-400 text-[11px]">
            100% of 12,480 projects scored against peer baselines
          </span>
        </div>

        {/* Proportional Colored Distribution Bar */}
        <div className="w-full h-4 bg-gov-100 dark:bg-slate-800 rounded-lg overflow-hidden flex shadow-inner">
          <div
            className="bg-risk-low h-full transition-all"
            style={{ width: '71%' }}
            title="LOW (Normal): 71% (8,860 Projects)"
          />
          <div
            className="bg-risk-moderate h-full transition-all"
            style={{ width: '18%' }}
            title="MODERATE (Monitor): 18% (2,246 Projects)"
          />
          <div
            className="bg-risk-high h-full transition-all"
            style={{ width: '8%' }}
            title="HIGH (Review): 8% (998 Projects)"
          />
          <div
            className="bg-risk-critical h-full transition-all"
            style={{ width: '3%' }}
            title="CRITICAL (Immediate Action): 3% (376 Projects)"
          />
        </div>

        {/* Legend with Data Values */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-risk-low" />
            <span className="font-medium text-gov-700 dark:text-slate-300">
              Low (Normal): <strong className="font-mono font-bold">71% (8,860)</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-risk-moderate" />
            <span className="font-medium text-gov-700 dark:text-slate-300">
              Moderate: <strong className="font-mono font-bold">18% (2,246)</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-risk-high" />
            <span className="font-medium text-gov-700 dark:text-slate-300">
              High: <strong className="font-mono font-bold">8% (998)</strong>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-risk-critical" />
            <span className="font-medium text-gov-700 dark:text-slate-300">
              Critical: <strong className="font-mono font-bold text-risk-critical">3% (376)</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Hero: National Risk Map */}
      <NationalRiskMap />

      {/* 2-Column Section: Left (Live Operational Stream) + Right (Priority Risk Ranking Queue) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Live Intelligence Stream */}
        <div className="lg:col-span-5 bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 p-4 rounded-xl shadow-gov space-y-3">
          <div className="flex items-center justify-between border-b border-gov-200 dark:border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-xs font-bold text-gov-900 dark:text-white uppercase tracking-wider">
                Live Intelligence Stream
              </h3>
            </div>
            <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.2 rounded-full flex items-center gap-1 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Operational Real-Time
            </span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {liveEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => {
                  setSelectedProjectId(evt.projectId);
                  setActiveTab('evidence-explorer');
                }}
                className="p-2.5 rounded-lg border border-gov-200 dark:border-slate-800 hover:border-brand-400 hover:bg-gov-50 dark:hover:bg-slate-900 transition-all cursor-pointer space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-gov-500 dark:text-slate-400 font-bold">
                      ● {evt.time}
                    </span>
                    <span className="font-mono font-bold text-brand-600 dark:text-brand-400">
                      {evt.projectId}
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                      evt.severity === 'CRITICAL'
                        ? 'bg-risk-criticalBg text-risk-criticalText border-risk-criticalBorder'
                        : evt.severity === 'HIGH'
                        ? 'bg-risk-highBg text-risk-highText border-risk-highBorder'
                        : 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/60 dark:text-teal-300'
                    }`}
                  >
                    {evt.type}
                  </span>
                </div>

                <p className="font-semibold text-gov-900 dark:text-white line-clamp-1">{evt.title}</p>
                <p className="text-[11px] text-gov-500 dark:text-slate-400 leading-tight line-clamp-2">
                  {evt.changeDesc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Priority Risk Ranking Queue */}
        <div className="lg:col-span-7 bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 p-4 rounded-xl shadow-gov space-y-3">
          <div className="flex items-center justify-between border-b border-gov-200 dark:border-slate-800 pb-2.5">
            <div>
              <h3 className="text-xs font-bold text-gov-900 dark:text-white uppercase tracking-wider">
                Priority Anomaly Screening Feed ({criticalProjects.length} Flagged)
              </h3>
              <p className="text-[11px] text-gov-500 dark:text-slate-400">
                Sorted by transparent multi-signal score (Cost + Duplicate + Delay + Utilization).
              </p>
            </div>

            <button
              onClick={() => setActiveTab('ai-investigator')}
              className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>Query AI Investigator &rarr;</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-gov-500 dark:text-slate-400 border-b border-gov-200 dark:border-slate-800">
                  <th className="pb-2 font-semibold">Project & Location</th>
                  <th className="pb-2 font-semibold">Cost</th>
                  <th className="pb-2 font-semibold">Risk Index</th>
                  <th className="pb-2 font-semibold">Primary Signal</th>
                  <th className="pb-2 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gov-100 dark:divide-slate-800/60">
                {criticalProjects.map((p) => {
                  const s = p.riskSignals;
                  return (
                    <tr
                      key={p.id}
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        setActiveTab('evidence-explorer');
                      }}
                      className="hover:bg-gov-50 dark:hover:bg-slate-900 transition-colors cursor-pointer group"
                    >
                      <td className="py-2.5 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-gov-900 dark:text-white bg-gov-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[11px]">
                            {p.id}
                          </span>
                          <span className="font-medium text-gov-900 dark:text-white truncate max-w-[160px] group-hover:text-brand-600">
                            {p.title}
                          </span>
                        </div>
                        <span className="text-[10px] text-gov-500 block">
                          📍 {p.district}, {p.state}
                        </span>
                      </td>

                      <td className="py-2.5 font-mono font-bold text-gov-900 dark:text-white">
                        ₹{p.sanctionedAmountLakhs}L
                      </td>

                      <td className="py-2.5">
                        <span
                          className={`font-mono font-extrabold px-1.5 py-0.5 rounded text-[11px] border ${
                            s.tier === 'CRITICAL'
                              ? 'bg-risk-criticalBg text-risk-criticalText border-risk-criticalBorder'
                              : 'bg-risk-highBg text-risk-highText border-risk-highBorder'
                          }`}
                        >
                          {s.totalScore} / 100
                        </span>
                      </td>

                      <td className="py-2.5 text-[11px] truncate max-w-[150px]">
                        {s.costAnomaly.outlierMultiplier >= 2.0 ? (
                          <span className="text-risk-critical font-semibold">
                            ⚠️ Cost {s.costAnomaly.outlierMultiplier}× Peer
                          </span>
                        ) : s.duplicateRisk.score >= 15 ? (
                          <span className="text-risk-high font-semibold">
                            🔗 Duplicate ({s.duplicateRisk.geoDistanceMeters}m)
                          </span>
                        ) : (
                          <span className="text-amber-700 dark:text-amber-400 font-semibold">
                            ⏳ Delay ({s.delayProbability.probabilityPct}%)
                          </span>
                        )}
                      </td>

                      <td className="py-2.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProjectId(p.id);
                            setActiveTab('evidence-explorer');
                          }}
                          className="bg-gov-100 hover:bg-brand-600 hover:text-white text-gov-800 font-bold px-2.5 py-1 rounded-md text-[11px] transition-all inline-flex items-center gap-1"
                        >
                          <FileSearch className="w-3 h-3" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
