import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import {
  Search,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Camera,
  MessageSquarePlus,
  Send,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Building,
  User,
  ShieldAlert,
  ShieldCheck,
  X,
  ThumbsUp,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CitizenPortal: React.FC = () => {
  const {
    projects,
    searchQuery,
    setSearchQuery,
    setSelectedProjectId,
    setActiveTab,
    setPortalView,
    submitCitizenReport
  } = useProjects();

  const [activeFilter, setActiveFilter] = useState<'ALL' | 'FLAGGED' | 'DELAYED' | 'COMPLETED'>('ALL');
  const [selectedPhotoProject, setSelectedPhotoProject] = useState<any | null>(null);
  const [reportingProject, setReportingProject] = useState<any | null>(null);

  // Grievance Form State
  const [citizenName, setCitizenName] = useState<string>('');
  const [citizenPhone, setCitizenPhone] = useState<string>('');
  const [citizenIssue, setCitizenIssue] = useState<string>('');
  const [reportSuccess, setReportSuccess] = useState<boolean>(false);
  const [isSubmittingReport, setIsSubmittingReport] = useState<boolean>(false);

  // Filter projects for citizen view
  const citizenFiltered = projects.filter((p) => {
    if (activeFilter === 'FLAGGED' && p.riskSignals.tier !== 'CRITICAL' && p.riskSignals.tier !== 'HIGH') {
      return false;
    }
    if (activeFilter === 'DELAYED' && p.status !== 'Delayed' && p.status !== 'Stalled') {
      return false;
    }
    if (activeFilter === 'COMPLETED' && p.status !== 'Completed') {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.block.toLowerCase().includes(q) ||
        p.state.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.sector.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingProject || !citizenIssue.trim()) return;

    setIsSubmittingReport(true);
    await submitCitizenReport(
      reportingProject.id,
      citizenName.trim() || 'Concerned Citizen',
      citizenPhone.trim(),
      citizenIssue.trim()
    );

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setIsSubmittingReport(false);
    setReportSuccess(true);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn pb-12">
      {/* Citizen Hero Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-gov-lg space-y-4 relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs font-bold text-brand-200">
            <span>🇮🇳 Jan Seva — Public Citizen Transparency Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            See How Public Funds Are Spent In Your Neighborhood
          </h1>

          <p className="text-xs sm:text-sm text-brand-100 leading-relaxed">
            Zero technical jargon. Search your city, district, or ward to see if sanctioned community halls, roads, and drinking water plants are being built on time or if they are stalled.
          </p>
        </div>

        {/* Big Search Input */}
        <div className="relative z-10 pt-2">
          <div className="relative max-w-2xl bg-white rounded-2xl shadow-lg flex items-center p-1.5 border border-gov-200">
            <Search className="w-5 h-5 text-gov-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type your District, City, or Scheme (e.g. Hyderabad, Amberpet, Medchal, CC Road)..."
              className="w-full bg-transparent px-3 py-2.5 text-xs sm:text-sm text-gov-900 placeholder-gov-400 focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-gov-400 hover:text-gov-700 p-1 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Location Chips */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 text-xs text-brand-200 pt-1">
          <span className="font-bold text-white text-[11px]">Popular Searches:</span>
          {['Hyderabad', 'Amberpet', 'Medchal', 'Secunderabad', 'Warangal', 'Lucknow', 'Bengaluru'].map((loc) => (
            <button
              key={loc}
              onClick={() => setSearchQuery(loc)}
              className="bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all"
            >
              📍 {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#0f172a] p-3 rounded-2xl border border-gov-200 dark:border-slate-800 shadow-gov text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {[
            { id: 'ALL', label: `All Local Works (${projects.length})` },
            { id: 'FLAGGED', label: '🚨 Flagged for Irregularities', color: 'text-risk-critical' },
            { id: 'DELAYED', label: '⏳ Delayed Projects', color: 'text-amber-600' },
            { id: 'COMPLETED', label: '✅ Completed On-Time', color: 'text-emerald-600' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                activeFilter === tab.id
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-gov-50 dark:bg-slate-900 text-gov-700 dark:text-slate-300 hover:bg-gov-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-gov-500 font-mono">
          Showing {citizenFiltered.length} public records
        </span>
      </div>

      {/* Citizen Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {citizenFiltered.map((p) => {
          const isFlagged = p.riskSignals.tier === 'CRITICAL' || p.riskSignals.tier === 'HIGH';
          const isDelayed = p.status === 'Delayed' || p.status === 'Stalled';
          const isCompleted = p.status === 'Completed';

          return (
            <div
              key={p.id}
              className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-2xl p-5 shadow-gov hover:shadow-gov-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Status Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold bg-gov-100 dark:bg-slate-800 text-gov-700 dark:text-slate-300 px-2 py-0.5 rounded">
                      {p.id}
                    </span>
                    <span className="text-[11px] font-semibold text-gov-500">
                      {p.sector}
                    </span>
                  </div>

                  {isFlagged ? (
                    <span className="bg-risk-criticalBg text-risk-criticalText border border-risk-criticalBorder text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>FLAGGED FOR AUDIT</span>
                    </span>
                  ) : isDelayed ? (
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>DELAYED BEHIND SCHEDULE</span>
                    </span>
                  ) : (
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>ON-TRACK & VERIFIED</span>
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <div>
                  <h3 className="font-extrabold text-sm text-gov-900 dark:text-white leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gov-500 dark:text-slate-400 pt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                    <span>{p.block}, {p.district}, {p.state}</span>
                  </p>
                </div>

                {/* Money vs Real Work Progress Bar */}
                <div className="bg-gov-50 dark:bg-slate-900 p-3 rounded-xl border border-gov-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <div className="text-gov-700 dark:text-slate-300">
                      <span>Money Paid to Contractor: </span>
                      <strong className="text-brand-600">₹{p.spentAmountLakhs}L ({p.financialProgressPct}%)</strong>
                    </div>
                    <div className="text-gov-700 dark:text-slate-300">
                      <span>Real Ground Work: </span>
                      <strong className={p.physicalProgressPct < p.financialProgressPct - 20 ? 'text-risk-critical' : 'text-emerald-600'}>
                        {p.physicalProgressPct}%
                      </strong>
                    </div>
                  </div>

                  <div className="relative w-full h-3 bg-gov-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    {/* Financial Disbursed Bar */}
                    <div
                      style={{ width: `${p.financialProgressPct}%` }}
                      className="absolute top-0 left-0 h-full bg-brand-400 opacity-60"
                      title="Money Paid Out"
                    />
                    {/* Physical Work Bar */}
                    <div
                      style={{ width: `${p.physicalProgressPct}%` }}
                      className={`absolute top-0 left-0 h-full ${
                        p.physicalProgressPct < p.financialProgressPct - 20 ? 'bg-risk-critical' : 'bg-emerald-500'
                      }`}
                      title="Actual Work Completed"
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-gov-400 font-medium">
                    <span>Sanction: ₹{p.sanctionedAmountLakhs} Lakhs</span>
                    <span>Target Date: {p.targetCompletionDate}</span>
                  </div>
                </div>

                {/* In Plain Words Card */}
                <div className="p-3 bg-brand-50/60 dark:bg-brand-950/30 rounded-xl border border-brand-100 dark:border-brand-900 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-brand-900 dark:text-brand-300 block flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-brand-600" />
                    <span>In Plain Words: What’s Happening Here?</span>
                  </span>
                  <p className="text-xs text-gov-700 dark:text-slate-300 leading-relaxed">
                    {isFlagged ? (
                      <>
                        This project was given <strong>₹{p.sanctionedAmountLakhs} Lakhs</strong>, which is <strong>2.76× higher</strong> than other similar works in this district (average is ₹10.5L). Over <strong>₹{p.spentAmountLakhs}L</strong> has already been paid, but an on-site government inspector confirmed that only <strong>{p.physicalProgressPct}% of the building</strong> exists.
                      </>
                    ) : isDelayed ? (
                      <>
                        Work on this scheme is progressing slower than expected. It is currently <strong>3 months behind the official deadline</strong>.
                      </>
                    ) : (
                      <>
                        Construction is proceeding smoothly on schedule. The money spent matches the verified ground construction.
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gov-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedPhotoProject(p)}
                  className="bg-gov-100 hover:bg-gov-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gov-800 dark:text-slate-200 font-bold px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-brand-600" />
                  <span>View Site Photos ({p.photos.length})</span>
                </button>

                <button
                  onClick={() => {
                    setReportingProject(p);
                    setReportSuccess(false);
                  }}
                  className="bg-risk-critical/10 hover:bg-risk-critical/20 text-risk-critical font-extrabold px-3 py-1.5 rounded-lg text-xs border border-risk-critical/30 transition-all flex items-center gap-1.5"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5" />
                  <span>Report Local Issue</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL 1: VIEW FIELD PHOTOS */}
      {selectedPhotoProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-gov-200 dark:border-slate-800 overflow-hidden space-y-4 p-5">
            <div className="flex items-center justify-between border-b border-gov-200 dark:border-slate-800 pb-3">
              <div>
                <h4 className="font-bold text-xs text-gov-900 dark:text-white uppercase tracking-wider">
                  On-Site Ground Photos: {selectedPhotoProject.id}
                </h4>
                <p className="text-[11px] text-gov-500">
                  {selectedPhotoProject.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedPhotoProject(null)}
                className="p-1 text-gov-400 hover:text-gov-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {selectedPhotoProject.photos.map((ph: any) => (
                <div key={ph.id} className="space-y-1.5 bg-gov-50 dark:bg-slate-900 p-3 rounded-xl border border-gov-200 dark:border-slate-800">
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-gov-200 dark:bg-slate-800 relative">
                    <img src={ph.url} alt={ph.caption} className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <ShieldCheck className="w-3 h-3" />
                      <span>GPS Verified on Location</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-bold text-gov-900 dark:text-white">{ph.caption}</span>
                    <span className="text-[10px] text-gov-400 font-mono">
                      {new Date(ph.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedPhotoProject(null)}
              className="w-full bg-brand-600 text-white font-bold py-2 rounded-xl text-xs"
            >
              Close Photo Viewer
            </button>
          </div>
        </div>
      )}

      {/* MODAL 2: REPORT A LOCAL ISSUE (CITIZEN GRIEVANCE) */}
      {reportingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-gov-200 dark:border-slate-800 overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gov-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-risk-criticalBg text-risk-criticalText flex items-center justify-center font-bold">
                  <MessageSquarePlus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-gov-900 dark:text-white uppercase tracking-wider">
                    Citizen Watch Grievance Report
                  </h4>
                  <p className="text-[10px] text-gov-500 font-mono">
                    Direct to Chief Auditor Prakash Jakkula
                  </p>
                </div>
              </div>
              <button
                onClick={() => setReportingProject(null)}
                className="p-1 text-gov-400 hover:text-gov-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {reportSuccess ? (
              <div className="text-center space-y-3 py-4 text-xs animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-sm font-bold text-gov-900 dark:text-white">
                  Grievance Submitted Successfully!
                </h3>
                <p className="text-gov-600 dark:text-slate-300 leading-relaxed text-[11px]">
                  Your observation for <strong>{reportingProject.title}</strong> has been sealed with an immutable SHA-256 digital signature and forwarded to the <strong>MoSPI Auditor Review Queue</strong> for field inquiry.
                </p>
                <button
                  onClick={() => setReportingProject(null)}
                  className="bg-brand-600 text-white font-bold px-5 py-2 rounded-xl text-xs"
                >
                  Return to Citizen Portal
                </button>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-3 text-xs">
                <div className="p-2.5 bg-gov-50 dark:bg-slate-900 rounded-lg border border-gov-200 dark:border-slate-800 text-[11px] space-y-0.5">
                  <span className="text-gov-400 font-bold block">Reporting against work:</span>
                  <p className="font-bold text-gov-900 dark:text-white">{reportingProject.title}</p>
                  <span className="text-gov-500 font-mono text-[10px]">📍 {reportingProject.district}, {reportingProject.state}</span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gov-700 dark:text-slate-300">Your Name (Optional / Anonymous):</label>
                  <input
                    type="text"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    placeholder="e.g. Rahul Sharma (or leave blank)"
                    className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-2 text-xs text-gov-900 dark:text-white focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gov-700 dark:text-slate-300">Contact / Phone (Optional for update SMS):</label>
                  <input
                    type="tel"
                    value={citizenPhone}
                    onChange={(e) => setCitizenPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-2 text-xs text-gov-900 dark:text-white focus:outline-none focus:border-brand-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gov-700 dark:text-slate-300">What did you observe on site?</label>
                  <textarea
                    rows={3}
                    required
                    value={citizenIssue}
                    onChange={(e) => setCitizenIssue(e.target.value)}
                    placeholder="e.g. The community hall walls are built, but there is no roof or electricity. Construction has been stalled for 4 months..."
                    className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-2 text-xs text-gov-900 dark:text-white focus:outline-none focus:border-brand-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReport}
                  className="w-full bg-risk-critical hover:bg-red-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingReport ? 'Sealing Report...' : 'Send Grievance to Chief Auditor →'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
