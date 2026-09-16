import React, { useState, useEffect } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { PeerComparisonCard } from './PeerComparisonCard';
import {
  ShieldAlert,
  Share2,
  Box,
  Smartphone,
  CheckSquare,
  Clock,
  Coins,
  MapPin,
  FileCheck,
  Building,
  User,
  AlertOctagon,
  Image as ImageIcon,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Info,
  Calendar,
  AlertTriangle,
  History,
  FileText
} from 'lucide-react';

export const EvidenceExplorer: React.FC = () => {
  const {
    selectedProject,
    setSelectedProjectId,
    setActiveTab,
    projects,
    updateProjectReview
  } = useProjects();

  const [activeTabSub, setActiveTabSub] = useState<'OVERVIEW' | 'RISK_ANALYSIS' | 'EVIDENCE_VAULT' | 'TIMELINE' | 'ACTION'>(
    'OVERVIEW'
  );
  const [animatedScore, setAnimatedScore] = useState<number>(0);
  const [reviewNoteInput, setReviewNoteInput] = useState<string>('');
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);

  const s = selectedProject.riskSignals;

  // Animated risk score count-up effect
  useEffect(() => {
    let start = 0;
    const end = s.totalScore;
    const duration = 400; // ms
    const increment = Math.ceil(end / 10);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedScore(end);
        clearInterval(timer);
      } else {
        setAnimatedScore(start);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [selectedProject.id, s.totalScore]);

  const handleEscalate = async () => {
    setIsSubmittingReview(true);
    await updateProjectReview(
      selectedProject.id,
      'ESCALATED',
      reviewNoteInput || 'Escalated to Vigilance & Anti-Corruption Officer due to 2.76× cost anomaly and 42m duplicate risk.'
    );
    setIsSubmittingReview(false);
    setActiveTab('review-center');
  };

  const handleAccept = async () => {
    setIsSubmittingReview(true);
    await updateProjectReview(
      selectedProject.id,
      'ACCEPTED',
      'Anomaly verified against DPR rates. On-site field audit scheduled.'
    );
    setIsSubmittingReview(false);
    setActiveTab('review-center');
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Project Master Intelligence Header */}
      <div className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl p-5 shadow-gov space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 px-2 py-0.5 rounded">
                {selectedProject.id}
              </span>
              <span className="text-[11px] font-semibold text-gov-600 dark:text-slate-300 bg-gov-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                {selectedProject.sector}
              </span>
              <span className="text-[11px] font-medium text-gov-500">
                Category: {selectedProject.assetCategory}
              </span>
            </div>

            <h1 className="text-lg lg:text-xl font-extrabold text-gov-900 dark:text-white tracking-tight">
              {selectedProject.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-gov-600 dark:text-slate-400">
              <span>📍 {selectedProject.block}, {selectedProject.district}, {selectedProject.state}</span>
              <span>👤 MP: <strong>{selectedProject.mpName}</strong> ({selectedProject.constituency})</span>
              <span>🏢 Agency: <strong>{selectedProject.implementingAgencyName}</strong></span>
            </div>
          </div>

          {/* Animated Risk Badge & Quick Actions */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Risk Badge */}
            <div className="flex items-center gap-3 bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 p-3 rounded-xl shadow-sm">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-gov-400 dark:text-slate-500 tracking-wider block">
                  AI Risk Index
                </span>
                <span
                  className={`text-xs font-extrabold px-2 py-0.5 rounded inline-block ${
                    s.tier === 'CRITICAL'
                      ? 'bg-risk-criticalBg text-risk-criticalText border border-risk-criticalBorder'
                      : s.tier === 'HIGH'
                      ? 'bg-risk-highBg text-risk-highText border border-risk-highBorder'
                      : 'bg-risk-lowBg text-risk-lowText border border-risk-lowBorder'
                  }`}
                >
                  {s.tier}
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-mono font-black text-gov-900 dark:text-white">
                  {animatedScore}
                </span>
                <span className="text-xs text-gov-400 font-mono">/100</span>
              </div>
            </div>

            {/* Jump Buttons */}
            <div className="flex flex-col sm:flex-row gap-1.5">
              <button
                onClick={() => setActiveTab('digital-twin-3d')}
                className="bg-gov-100 hover:bg-gov-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gov-800 dark:text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg border border-gov-200 dark:border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <Box className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>3D CAD Twin</span>
              </button>
              <button
                onClick={() => setActiveTab('relationship-graph')}
                className="bg-gov-100 hover:bg-gov-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gov-800 dark:text-slate-200 text-xs font-semibold px-3 py-2 rounded-lg border border-gov-200 dark:border-slate-700 flex items-center gap-1.5 transition-all"
              >
                <Share2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>Network Graph</span>
              </button>
              <button
                onClick={() => setActiveTab('field-inspection')}
                className="bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Field App</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Project Case Selector */}
        <div className="pt-2.5 border-t border-gov-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-gov-400 dark:text-slate-500 font-bold text-[11px] shrink-0">Case Switcher:</span>
          {projects.slice(0, 6).map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectId(p.id)}
              className={`px-2.5 py-1 rounded-md font-mono text-[11px] font-bold shrink-0 transition-all ${
                selectedProject.id === p.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-gov-100 dark:bg-slate-900 text-gov-600 dark:text-slate-400 border border-gov-200 dark:border-slate-800 hover:text-gov-900'
              }`}
            >
              {p.id} ({p.riskSignals.totalScore})
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1 border-b border-gov-200 dark:border-slate-800 overflow-x-auto text-xs font-bold">
        {[
          { id: 'OVERVIEW', label: '1. Executive Overview & Signals' },
          { id: 'RISK_ANALYSIS', label: '2. Peer Group Benchmark' },
          { id: 'TIMELINE', label: '3. Vertical Project Timeline' },
          { id: 'EVIDENCE_VAULT', label: '4. Photographic Proof & Hashes' },
          { id: 'ACTION', label: '5. Auditor Decision Sign-off' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabSub(tab.id as any)}
            className={`px-4 py-2.5 border-b-2 font-bold whitespace-nowrap transition-all ${
              activeTabSub === tab.id
                ? 'border-brand-600 text-brand-600 dark:text-brand-400 bg-white dark:bg-[#0f172a] rounded-t-lg'
                : 'border-transparent text-gov-500 dark:text-slate-400 hover:text-gov-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Executive Overview & Risk Contributors */}
      {activeTabSub === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left 4 Key Parameters */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl p-4 shadow-gov space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gov-900 dark:text-white border-b border-gov-200 dark:border-slate-800 pb-2">
                Core Execution Metrics
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gov-50 dark:bg-slate-900 p-3 rounded-lg border border-gov-200 dark:border-slate-800">
                  <span className="text-gov-500 dark:text-slate-400 text-[10px] block">Sanctioned Cost</span>
                  <span className="text-base font-extrabold font-mono text-gov-900 dark:text-white">
                    ₹{selectedProject.sanctionedAmountLakhs}L
                  </span>
                  <span className="text-[10px] text-risk-critical font-bold block mt-0.5">
                    2.76× Peer Median
                  </span>
                </div>

                <div className="bg-gov-50 dark:bg-slate-900 p-3 rounded-lg border border-gov-200 dark:border-slate-800">
                  <span className="text-gov-500 dark:text-slate-400 text-[10px] block">Funds Disbursed</span>
                  <span className="text-base font-extrabold font-mono text-gov-900 dark:text-white">
                    ₹{selectedProject.spentAmountLakhs}L
                  </span>
                  <span className="text-[10px] text-gov-500 block mt-0.5">
                    {selectedProject.financialProgressPct}% Sanction
                  </span>
                </div>

                <div className="bg-gov-50 dark:bg-slate-900 p-3 rounded-lg border border-gov-200 dark:border-slate-800">
                  <span className="text-gov-500 dark:text-slate-400 text-[10px] block">Verified Physical Progress</span>
                  <span className="text-base font-extrabold font-mono text-gov-900 dark:text-white">
                    {selectedProject.physicalProgressPct}%
                  </span>
                  <span className="text-[10px] text-risk-high font-bold block mt-0.5">
                    Deficit: -47% vs Plan
                  </span>
                </div>

                <div className="bg-gov-50 dark:bg-slate-900 p-3 rounded-lg border border-gov-200 dark:border-slate-800">
                  <span className="text-gov-500 dark:text-slate-400 text-[10px] block">Predicted Delay Risk</span>
                  <span className="text-base font-extrabold font-mono text-risk-critical">
                    {s.delayProbability.probabilityPct}%
                  </span>
                  <span className="text-[10px] text-gov-500 block mt-0.5">
                    +8.5 Months Slip
                  </span>
                </div>
              </div>

              {/* Responsible AI Notice */}
              <div className="p-3 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-lg text-xs space-y-1">
                <div className="flex items-center gap-1.5 text-brand-900 dark:text-brand-200 font-bold text-[11px]">
                  <Info className="w-3.5 h-3.5 text-brand-600" />
                  <span>Responsible AI Early-Warning Protocol</span>
                </div>
                <p className="text-[11px] text-gov-600 dark:text-slate-400 leading-relaxed">
                  NyayaLens does not declare guilt or automatically accuse parties of fraud. It surfaces defensible statistical risk signals for auditor verification.
                </p>
              </div>
            </div>
          </div>

          {/* Right: The 5 Contributing Multi-Signal Risk Breakdown (The Winning Product Structure) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl p-4 shadow-gov space-y-3">
              <div className="flex items-center justify-between border-b border-gov-200 dark:border-slate-800 pb-2.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gov-900 dark:text-white">
                  Multi-Signal Risk Decomposition (SHAP Formulation)
                </h3>
                <span className="text-[11px] font-mono text-brand-600 dark:text-brand-400 font-bold">
                  Score = 87 / 100
                </span>
              </div>

              {/* Signal 1: Cost Anomaly (+24) */}
              <div className="p-3 bg-gov-50 dark:bg-slate-900 rounded-lg border border-gov-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <div className="flex items-center gap-1.5 text-gov-900 dark:text-white">
                    <Coins className="w-4 h-4 text-risk-critical" />
                    <span>Cost Anomaly (Peer Comparison)</span>
                  </div>
                  <span className="font-mono text-risk-critical font-extrabold text-sm">+{s.costAnomaly.score} pts</span>
                </div>
                <div className="w-full bg-gov-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-risk-critical h-full rounded-full" style={{ width: `${(s.costAnomaly.score / 25) * 100}%` }} />
                </div>
                <p className="text-[11px] text-gov-600 dark:text-slate-400 leading-tight">
                  {s.costAnomaly.explanation}
                </p>
              </div>

              {/* Signal 2: Duplicate Similarity (+22) */}
              <div className="p-3 bg-gov-50 dark:bg-slate-900 rounded-lg border border-gov-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <div className="flex items-center gap-1.5 text-gov-900 dark:text-white">
                    <Share2 className="w-4 h-4 text-risk-high" />
                    <span>Duplicate & Geospatial Overlap</span>
                  </div>
                  <span className="font-mono text-risk-high font-extrabold text-sm">+{s.duplicateRisk.score} pts</span>
                </div>
                <div className="w-full bg-gov-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-risk-high h-full rounded-full" style={{ width: `${(s.duplicateRisk.score / 25) * 100}%` }} />
                </div>
                <p className="text-[11px] text-gov-600 dark:text-slate-400 leading-tight">
                  {s.duplicateRisk.explanation}
                </p>
              </div>

              {/* Signal 3: Delay Probability (+18) */}
              <div className="p-3 bg-gov-50 dark:bg-slate-900 rounded-lg border border-gov-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <div className="flex items-center gap-1.5 text-gov-900 dark:text-white">
                    <Clock className="w-4 h-4 text-risk-moderate" />
                    <span>Predicted Delay Probability</span>
                  </div>
                  <span className="font-mono text-risk-moderate font-extrabold text-sm">+{s.delayProbability.score} pts</span>
                </div>
                <div className="w-full bg-gov-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-risk-moderate h-full rounded-full" style={{ width: `${(s.delayProbability.score / 25) * 100}%` }} />
                </div>
                <p className="text-[11px] text-gov-600 dark:text-slate-400 leading-tight">
                  {s.delayProbability.explanation}
                </p>
              </div>

              {/* Signal 4: Fund Utilization Anomaly (+13) */}
              <div className="p-3 bg-gov-50 dark:bg-slate-900 rounded-lg border border-gov-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <div className="flex items-center gap-1.5 text-gov-900 dark:text-white">
                    <AlertOctagon className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    <span>Fund Utilization Front-Loading</span>
                  </div>
                  <span className="font-mono text-amber-700 dark:text-amber-400 font-extrabold text-sm">+{s.utilizationAnomaly.score} pts</span>
                </div>
                <div className="w-full bg-gov-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full rounded-full" style={{ width: `${(s.utilizationAnomaly.score / 15) * 100}%` }} />
                </div>
                <p className="text-[11px] text-gov-600 dark:text-slate-400 leading-tight">
                  {s.utilizationAnomaly.explanation}
                </p>
              </div>

              {/* Signal 5: Progress Anomaly (+10) */}
              <div className="p-3 bg-gov-50 dark:bg-slate-900 rounded-lg border border-gov-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <div className="flex items-center gap-1.5 text-gov-900 dark:text-white">
                    <FileCheck className="w-4 h-4 text-teal-600" />
                    <span>Progress Schedule Lag</span>
                  </div>
                  <span className="font-mono text-teal-700 dark:text-teal-400 font-extrabold text-sm">+{s.progressAnomaly.score} pts</span>
                </div>
                <div className="w-full bg-gov-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full" style={{ width: `${(s.progressAnomaly.score / 15) * 100}%` }} />
                </div>
                <p className="text-[11px] text-gov-600 dark:text-slate-400 leading-tight">
                  {s.progressAnomaly.explanation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Peer Group Benchmark */}
      {activeTabSub === 'RISK_ANALYSIS' && (
        <PeerComparisonCard project={selectedProject} />
      )}

      {/* Tab 3: Vertical Project Lifecycle Timeline */}
      {activeTabSub === 'TIMELINE' && (
        <div className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl p-5 shadow-gov space-y-4">
          <div className="border-b border-gov-200 dark:border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gov-900 dark:text-white">
              Vertical Project Lifecycle & Anomaly Audit Trail
            </h3>
            <p className="text-[11px] text-gov-500 dark:text-slate-400">
              Chronological milestones with automated milestone deviation flags.
            </p>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gov-200 dark:before:bg-slate-700 text-xs">
            {/* Step 1: Sanction */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-4 h-4 rounded-full bg-brand-600 border-2 border-white dark:border-slate-900" />
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-gov-500 font-bold">2024-02-15</span>
                <h4 className="font-bold text-gov-900 dark:text-white">Administrative & Financial Sanction</h4>
                <p className="text-[11px] text-gov-600 dark:text-slate-400">
                  ₹29.00 Lakhs sanctioned by District Collector for Secunderabad Constituency.
                </p>
              </div>
            </div>

            {/* Step 2: Tender Award */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-4 h-4 rounded-full bg-brand-600 border-2 border-white dark:border-slate-900" />
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-gov-500 font-bold">2024-03-10</span>
                <h4 className="font-bold text-gov-900 dark:text-white">Work Order Awarded to Contractor</h4>
                <p className="text-[11px] text-gov-600 dark:text-slate-400">
                  Awarded to <strong>Sri Sai Ram Infratech Pvt Ltd</strong> (GSTIN: 36AABCU9603R1ZM).
                </p>
              </div>
            </div>

            {/* Step 3: Work Commencement */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-4 h-4 rounded-full bg-brand-600 border-2 border-white dark:border-slate-900" />
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-gov-500 font-bold">2024-03-25</span>
                <h4 className="font-bold text-gov-900 dark:text-white">Physical Groundbreaking & Foundation</h4>
                <p className="text-[11px] text-gov-600 dark:text-slate-400">
                  Plinth excavation and preliminary column casting initiated.
                </p>
              </div>
            </div>

            {/* Step 4: ⚠️ Anomaly Flag */}
            <div className="relative bg-risk-criticalBg/80 dark:bg-red-950/40 p-3 rounded-lg border border-risk-criticalBorder">
              <div className="absolute -left-[27px] top-2 w-4 h-4 rounded-full bg-risk-critical border-2 border-white dark:border-slate-900 animate-ping" />
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-risk-criticalText font-bold">2024-06-15</span>
                <h4 className="font-bold text-risk-criticalText flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>⚠️ Physical Progress Stagnation Alert</span>
                </h4>
                <p className="text-[11px] text-risk-criticalText leading-tight">
                  Site inspection reveals execution halted at 38% for &gt;90 days despite release of ₹24.5 Lakhs (84.5% of total budget).
                </p>
              </div>
            </div>

            {/* Step 5: Advance Payment Tranche */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-4 h-4 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900" />
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-gov-500 font-bold">2024-07-20</span>
                <h4 className="font-bold text-gov-900 dark:text-white">Second Tranche Fund Disbursement</h4>
                <p className="text-[11px] text-gov-600 dark:text-slate-400">
                  Cumulative disbursements reach ₹24.50 Lakhs (+46.5% financial vs physical gap).
                </p>
              </div>
            </div>

            {/* Step 6: Target Completion */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0 w-4 h-4 rounded-full bg-gov-300 dark:bg-slate-600 border-2 border-white dark:border-slate-900" />
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-gov-500 font-bold">2024-11-30</span>
                <h4 className="font-bold text-gov-700 dark:text-slate-300">Scheduled Handover Date</h4>
                <p className="text-[11px] text-risk-critical font-semibold">
                  Status: Overdue & Stalled. High risk of non-delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Photographic Proof & Hashes */}
      {activeTabSub === 'EVIDENCE_VAULT' && (
        <div className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl p-5 shadow-gov space-y-4">
          <div className="flex items-center justify-between border-b border-gov-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-gov-900 dark:text-white">
                Geo-Tagged Site Photographs & SHA-256 Hashes
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
              ✓ Cryptographic Proof Valid
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {selectedProject.photos.map((ph) => (
              <div key={ph.id} className="bg-gov-50 dark:bg-slate-900 rounded-xl border border-gov-200 dark:border-slate-800 p-2.5 space-y-2">
                <img src={ph.url} alt={ph.caption} className="w-full h-40 object-cover rounded-lg border border-gov-200 dark:border-slate-700" />
                <div className="space-y-1">
                  <p className="font-bold text-gov-900 dark:text-white">{ph.caption}</p>
                  <div className="flex items-center justify-between text-[10px] text-gov-500 font-mono">
                    <span>GPS: {ph.geoLat}, {ph.geoLng}</span>
                    <span>{new Date(ph.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-1.5 rounded text-[10px] font-mono text-brand-700 dark:text-brand-300 truncate border border-gov-200 dark:border-slate-800">
                    SHA-256: {ph.sha256Hash}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Auditor Decision Sign-off */}
      {activeTabSub === 'ACTION' && (
        <div className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl p-5 shadow-gov space-y-4">
          <div className="flex items-center justify-between border-b border-gov-200 dark:border-slate-800 pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gov-900 dark:text-white">
              Official Auditor Action & Determination
            </h3>
            <span className="font-mono text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded border border-amber-200">
              Current: {selectedProject.reviewStatus}
            </span>
          </div>

          <p className="text-xs text-gov-600 dark:text-slate-300 leading-relaxed">
            Record an official determination for project <strong>{selectedProject.id}</strong>. Every action will be stamped into the cryptographic audit trail with your verified actor ID.
          </p>

          <textarea
            value={reviewNoteInput}
            onChange={(e) => setReviewNoteInput(e.target.value)}
            placeholder="Enter official audit directives or vigilance referral notes..."
            rows={3}
            className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-3 text-xs text-gov-900 dark:text-slate-100 placeholder-gov-400 focus:outline-none focus:border-brand-600"
          />

          <div className="flex flex-wrap items-center justify-end gap-2 pt-2">
            <button
              onClick={handleAccept}
              disabled={isSubmittingReview}
              className="bg-gov-100 hover:bg-gov-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gov-800 dark:text-slate-200 text-xs font-bold px-4 py-2 rounded-lg transition-all"
            >
              Accept Signal (Outlier Validated)
            </button>
            <button
              onClick={handleEscalate}
              disabled={isSubmittingReview}
              className="bg-risk-critical hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Escalate to Vigilance & Anti-Corruption Bureau</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
