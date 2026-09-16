import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { InvestigatorMessage } from '../../types';
import { queryInvestigatorAgent } from '../../services/ragService';
import {
  Bot,
  Send,
  Sparkles,
  ShieldAlert,
  FileText,
  ChevronRight,
  Terminal,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
  User,
  Layers
} from 'lucide-react';

export const AiInvestigator: React.FC = () => {
  const { projects, setSelectedProjectId, setActiveTab } = useProjects();

  const [inputQuery, setInputQuery] = useState<string>('');
  const [messages, setMessages] = useState<InvestigatorMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `### ◈ MoSPI Grounded Investigation Terminal
I am the operational RAG intelligence assistant for MPLADS oversight. Ask natural language or structured analytical queries to inspect project risk indices, peer deviations, and MoSPI MPLADS Guidelines 2023.`,
      timestamp: '14:00',
      actionPrompts: [
        {
          label: '🚨 Show 5 critical projects in Hyderabad',
          actionKey: 'QUERY',
          payload: { q: 'Show top 5 high-risk projects requiring review' }
        },
        {
          label: '🔎 Why is project MPL-28471 flagged (87 Risk)?',
          actionKey: 'QUERY',
          payload: { q: 'Why is project MPL-28471 high risk?' }
        },
        {
          label: '🔗 Identify duplicate or overlapping works in 100m',
          actionKey: 'QUERY',
          payload: { q: 'Find duplicate works and spatial overlap' }
        },
        {
          label: '📜 Check MoSPI DPR cost & milestone release rules',
          actionKey: 'QUERY',
          payload: { q: 'What are the MoSPI guidelines for cost estimation and milestone fund release?' }
        }
      ]
    }
  ]);

  const handleSend = (queryText?: string) => {
    const q = queryText || inputQuery;
    if (!q.trim()) return;

    const userMsg: InvestigatorMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    setTimeout(() => {
      const response = queryInvestigatorAgent(q, projects);
      setMessages((prev) => [...prev, response]);
    }, 300);
  };

  const handleActionClick = (actionKey: string, payload: any) => {
    if (actionKey === 'QUERY' && payload?.q) {
      handleSend(payload.q);
    } else if (actionKey === 'VIEW_PROJECT' && payload?.projectId) {
      setSelectedProjectId(payload.projectId);
      setActiveTab('evidence-explorer');
    } else if (actionKey === 'VIEW_GRAPH') {
      if (payload?.projectId) setSelectedProjectId(payload.projectId);
      setActiveTab('relationship-graph');
    } else if (actionKey === 'DISPATCH_INSPECTION') {
      if (payload?.projectId) setSelectedProjectId(payload.projectId);
      setActiveTab('field-inspection');
    } else if (actionKey === 'VIEW_MAP') {
      setActiveTab('command-center');
    } else if (actionKey === 'VIEW_EVALUATION') {
      setActiveTab('evaluation-lab');
    }
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl p-5 shadow-gov space-y-4 max-w-5xl mx-auto animate-fadeIn">
      {/* Analyst Command Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gov-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center font-mono shadow-sm">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-gov-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span>NyayaLens Intelligence Command Interface</span>
              <span className="bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 text-[10px] font-mono px-2 py-0.2 rounded font-bold">
                Grounded RAG
              </span>
            </h3>
            <p className="text-[11px] text-gov-500 dark:text-slate-400">
              Query structured MPLADS datasets, peer distributions, and regulatory guidelines without hallucinations.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Hallucination Guard Active</span>
        </div>
      </div>

      {/* Structured Output Stream */}
      <div className="h-[460px] overflow-y-auto space-y-3.5 pr-2 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${
              m.sender === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 font-mono text-[10px] font-bold ${
                m.sender === 'user'
                  ? 'bg-gov-800 text-white'
                  : 'bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-200'
              }`}
            >
              {m.sender === 'user' ? 'AN' : 'AI'}
            </div>

            <div
              className={`max-w-2xl rounded-xl p-4 space-y-2.5 border ${
                m.sender === 'user'
                  ? 'bg-gov-800 text-white border-gov-700 shadow-sm'
                  : 'bg-gov-50 dark:bg-slate-900 text-gov-900 dark:text-slate-200 border-gov-200 dark:border-slate-800 shadow-gov'
              }`}
            >
              <div className="prose prose-xs leading-relaxed whitespace-pre-line text-xs dark:prose-invert">
                {m.text}
              </div>

              {/* Citations Box */}
              {m.citations && m.citations.length > 0 && (
                <div className="pt-2 border-t border-gov-200 dark:border-slate-800 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 dark:text-brand-400 block">
                    Verified Source Citations & Policy Proofs:
                  </span>
                  {m.citations.map((c, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-slate-950 p-2 rounded border border-gov-200 dark:border-slate-800 flex items-center justify-between text-[11px]"
                    >
                      <span className="font-medium text-gov-800 dark:text-slate-300">
                        {c.projectId ? `📁 Project ${c.projectId}: ${c.projectTitle}` : `📜 ${c.guidelineSection}`}
                      </span>
                      {c.evidenceConfidence && (
                        <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                          {Math.round(c.evidenceConfidence * 100)}% Confidence
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Chips */}
              {m.actionPrompts && m.actionPrompts.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {m.actionPrompts.map((btn, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleActionClick(btn.actionKey, btn.payload)}
                      className="bg-white dark:bg-slate-950 hover:bg-brand-50 dark:hover:bg-brand-950 border border-gov-200 dark:border-slate-800 hover:border-brand-400 text-gov-800 dark:text-slate-200 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 shadow-sm"
                    >
                      <span>{btn.label}</span>
                      <ChevronRight className="w-3 h-3 text-brand-600" />
                    </button>
                  ))}
                </div>
              )}

              <span className="text-[10px] text-gov-400 dark:text-slate-500 block text-right font-mono">
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Command Query Input Bar */}
      <div className="pt-2 border-t border-gov-200 dark:border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gov-400" />
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Enter investigation command: 'Show critical projects in Hyderabad', 'Why is MPL-28471 flagged?'..."
              className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 focus:border-brand-600 rounded-lg pl-10 pr-4 py-2.5 text-xs text-gov-900 dark:text-slate-100 placeholder-gov-400 focus:outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-4 py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Execute</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
