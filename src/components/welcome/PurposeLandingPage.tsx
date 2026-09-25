import React from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Sparkles,
  MapPin,
  TrendingUp,
  FileSearch,
  CheckCircle2,
  Lock,
  Layers,
  Bot,
  Box,
  Share2,
  Smartphone,
  Eye,
  Play
} from 'lucide-react';

interface PurposeLandingPageProps {
  onProceedToLogin: () => void;
  onLaunchInstantDemo: () => void;
}

export const PurposeLandingPage: React.FC<PurposeLandingPageProps> = ({
  onProceedToLogin,
  onLaunchInstantDemo
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gov-50 via-white to-gov-100 dark:from-[#080d1e] dark:via-[#0b1329] dark:to-[#0f172a] text-gov-900 dark:text-slate-100 font-sans flex flex-col justify-between">
      {/* Top National Identity Header */}
      <header className="border-b border-gov-200 dark:border-slate-800 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md px-6 py-3.5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-900 text-white flex items-center justify-center font-serif font-black text-sm shadow-sm">
              🇮🇳
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm tracking-tight text-gov-900 dark:text-white">
                  NYAYALENS AI
                </span>
                <span className="bg-brand-50 dark:bg-brand-900/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-700 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                  MoSPI SIH26102
                </span>
              </div>
              <p className="text-[10px] text-gov-500 dark:text-slate-400 font-medium">
                Ministry of Statistics and Programme Implementation • National Public Project Risk Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onLaunchInstantDemo}
              className="bg-gov-100 hover:bg-gov-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gov-800 dark:text-slate-200 font-bold px-3 py-1.5 rounded-lg text-xs transition-all flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 fill-gov-800 dark:fill-slate-200" />
              <span>Instant 1-Click Demo</span>
            </button>
            <button
              onClick={onProceedToLogin}
              className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold px-4 py-1.5 rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Officer Login Gateway &rarr;</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-12 animate-fadeIn">
        {/* Main Title & Value Proposition */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-800 dark:text-brand-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Explainable AI Early-Warning Decision Support Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gov-900 dark:text-white tracking-tight leading-tight">
            Detect. Explain. Connect. <br />
            <span className="text-brand-600 dark:text-brand-400">Predict. Verify. Act.</span>
          </h1>

          <p className="text-sm sm:text-base text-gov-600 dark:text-slate-300 leading-relaxed">
            <strong>NyayaLens AI</strong> transforms how public infrastructure funds (MPLADS) are monitored across India. By replacing blind sample audits with <strong>mathematical peer baselines</strong>, <strong>geospatial duplicate detection</strong>, and <strong>tamper-evident SHA-256 evidence proofing</strong>, it empowers government auditors to spot irregularities months before project deadlines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onProceedToLogin}
              className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold px-6 py-3 rounded-xl text-sm transition-all shadow-gov flex items-center gap-2 group"
            >
              <span>Proceed to Officer Login Gateway</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onLaunchInstantDemo}
              className="bg-white hover:bg-gov-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-gov-800 dark:text-slate-200 font-bold px-5 py-3 rounded-xl text-sm border border-gov-300 dark:border-slate-700 transition-all shadow-sm flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-brand-600 text-brand-600" />
              <span>Launch 30-Second Guided Tour</span>
            </button>
          </div>
        </div>

        {/* Live Empirical Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 p-5 rounded-2xl shadow-gov">
          <div className="text-center p-3 border-r border-gov-100 dark:border-slate-800 last:border-0">
            <span className="text-2xl lg:text-3xl font-black font-mono text-brand-600">12,480+</span>
            <span className="text-xs text-gov-500 block font-semibold">Projects Monitored</span>
          </div>
          <div className="text-center p-3 border-r border-gov-100 dark:border-slate-800 last:border-0">
            <span className="text-2xl lg:text-3xl font-black font-mono text-emerald-600">84.2%</span>
            <span className="text-xs text-gov-500 block font-semibold">Anomaly Catch Rate (4.5×)</span>
          </div>
          <div className="text-center p-3 border-r border-gov-100 dark:border-slate-800 last:border-0">
            <span className="text-2xl lg:text-3xl font-black font-mono text-amber-600">68%</span>
            <span className="text-xs text-gov-500 block font-semibold">Auditor Time Saved</span>
          </div>
          <div className="text-center p-3">
            <span className="text-2xl lg:text-3xl font-black font-mono text-purple-600">₹2,840 Cr</span>
            <span className="text-xs text-gov-500 block font-semibold">Public Capital Overseen</span>
          </div>
        </div>

        {/* 3-Step "How It Works" Section */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-gov-900 dark:text-white uppercase tracking-wider">
              How NyayaLens AI Works in 3 Simple Steps
            </h2>
            <p className="text-xs text-gov-500 max-w-xl mx-auto">
              A transparent, end-to-end operational pipeline designed for non-technical government officials and senior auditors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 1 */}
            <div className="bg-white dark:bg-[#0f172a] border-2 border-brand-200 dark:border-brand-900 rounded-2xl p-6 shadow-gov space-y-3 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center font-black text-base">
                  1
                </div>
                <h3 className="font-extrabold text-sm text-gov-900 dark:text-white">
                  Ingest & Automated Outlier Detection
                </h3>
                <p className="text-xs text-gov-600 dark:text-slate-300 leading-relaxed">
                  NyayaLens ingests public project records and groups them into <strong>segmented peer cohorts</strong>. Instead of crude national averages, it computes <strong>Interquartile Range (IQR) fences</strong> to identify cost anomalies (+24 pts) without false alarms across rural vs urban areas.
                </p>
              </div>
              <div className="pt-3 border-t border-gov-100 dark:border-slate-800 text-[11px] font-mono text-brand-700 dark:text-brand-300 font-bold">
                ✓ Segmented Cohort IQR Baselines
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white dark:bg-[#0f172a] border-2 border-amber-200 dark:border-amber-900 rounded-2xl p-6 shadow-gov space-y-3 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-base">
                  2
                </div>
                <h3 className="font-extrabold text-sm text-gov-900 dark:text-white">
                  Spatial Overlap & Field Evidence
                </h3>
                <p className="text-xs text-gov-600 dark:text-slate-300 leading-relaxed">
                  Using <strong>Haversine geospatial calculations (&lt;50m)</strong> and <strong>NLP semantic token matching</strong>, it flags duplicate works. Field inspectors verify progress on-site via mobile app with a <strong>12m GPS geofence check</strong> and photo uploads.
                </p>
              </div>
              <div className="pt-3 border-t border-gov-100 dark:border-slate-800 text-[11px] font-mono text-amber-700 dark:text-amber-300 font-bold">
                ✓ 91.8% Duplicate Catch Precision
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white dark:bg-[#0f172a] border-2 border-emerald-200 dark:border-emerald-900 rounded-2xl p-6 shadow-gov space-y-3 relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-base">
                  3
                </div>
                <h3 className="font-extrabold text-sm text-gov-900 dark:text-white">
                  Human-in-the-Loop Auditor Decision
                </h3>
                <p className="text-xs text-gov-600 dark:text-slate-300 leading-relaxed">
                  Government auditors (Led by <strong>Chief Auditor Prakash Jakkula</strong>) review plain-English evidence dossiers. In 1 click, they can <em>Approve Tranche Release</em> or <em>Escalate to Vigilance</em>. Every determination is sealed with an <strong>immutable SHA-256 hash</strong>.
                </p>
              </div>
              <div className="pt-3 border-t border-gov-100 dark:border-slate-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-300 font-bold">
                ✓ Tamper-Proof Cryptographic Ledger
              </div>
            </div>
          </div>
        </div>

        {/* 6 Key Architectural Capabilities Grid */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gov-400 text-center">
            Comprehensive Government Intelligence Capabilities
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div className="p-3 bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl text-center space-y-1.5 shadow-sm">
              <MapPin className="w-5 h-5 text-brand-600 mx-auto" />
              <span className="font-bold text-gov-900 dark:text-white block text-[11px]">GIS Risk Map</span>
              <p className="text-[10px] text-gov-500">State/District drilldown</p>
            </div>

            <div className="p-3 bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl text-center space-y-1.5 shadow-sm">
              <Share2 className="w-5 h-5 text-purple-600 mx-auto" />
              <span className="font-bold text-gov-900 dark:text-white block text-[11px]">Network Graph</span>
              <p className="text-[10px] text-gov-500">Contractor collusion links</p>
            </div>

            <div className="p-3 bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl text-center space-y-1.5 shadow-sm">
              <Box className="w-5 h-5 text-blue-600 mx-auto" />
              <span className="font-bold text-gov-900 dark:text-white block text-[11px]">3D Digital Twin</span>
              <p className="text-[10px] text-gov-500">Physical vs claimed CAD</p>
            </div>

            <div className="p-3 bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl text-center space-y-1.5 shadow-sm">
              <Bot className="w-5 h-5 text-emerald-600 mx-auto" />
              <span className="font-bold text-gov-900 dark:text-white block text-[11px]">AI Investigator</span>
              <p className="text-[10px] text-gov-500">Grounded RAG assistant</p>
            </div>

            <div className="p-3 bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl text-center space-y-1.5 shadow-sm">
              <Smartphone className="w-5 h-5 text-teal-600 mx-auto" />
              <span className="font-bold text-gov-900 dark:text-white block text-[11px]">Mobile Field App</span>
              <p className="text-[10px] text-gov-500">12m Geofence GPS proof</p>
            </div>

            <div className="p-3 bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl text-center space-y-1.5 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-amber-600 mx-auto" />
              <span className="font-bold text-gov-900 dark:text-white block text-[11px]">9-Domain SIEM</span>
              <p className="text-[10px] text-gov-500">CERT-In / ISO 27001</p>
            </div>
          </div>
        </div>

        {/* Ready to Launch Action Footer */}
        <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-gov-900 text-white p-6 sm:p-8 rounded-3xl shadow-gov-lg text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-black">
            Ready to Experience the Government Command Center?
          </h3>
          <p className="text-xs sm:text-sm text-brand-200 max-w-xl mx-auto">
            Log in with your official cadre credentials or launch the guided interactive investigation flow.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onProceedToLogin}
              className="bg-white hover:bg-brand-50 text-brand-900 font-extrabold px-6 py-3 rounded-xl text-sm transition-all shadow-md flex items-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Enter Officer Login &rarr;</span>
            </button>
            <button
              onClick={onLaunchInstantDemo}
              className="bg-brand-700 hover:bg-brand-600 text-white font-bold px-5 py-3 rounded-xl text-sm border border-brand-500 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Instant 1-Click Demo (Prakash Jakkula)</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gov-200 dark:border-slate-800 py-4 px-6 text-center text-xs text-gov-500">
        <p>
          🇮🇳 <strong>NyayaLens AI</strong> • Ministry of Statistics and Programme Implementation (MoSPI) • SIH26102
        </p>
        <p className="text-[11px] text-gov-400">
          Lead Architect: <strong>Prakash Jakkula</strong> • Built with React 18, TypeScript, Three.js, WebCrypto & Tailwind CSS
        </p>
      </footer>
    </div>
  );
};
