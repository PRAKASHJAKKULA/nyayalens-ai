import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Clock, ShieldAlert, CheckCircle, LogOut } from 'lucide-react';

export const SessionTimeoutModal: React.FC = () => {
  const {
    sessionTimeoutWarningOpen,
    sessionSecondsRemaining,
    extendActiveSession,
    logoutUser
  } = useSecurity();

  if (!sessionTimeoutWarningOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gov-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm bg-white dark:bg-[#0f172a] border-2 border-amber-500 rounded-2xl shadow-2xl p-5 space-y-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-gov-900 dark:text-white">
              Session Inactivity Alert
            </h3>
            <span className="text-[10px] text-gov-500 dark:text-slate-400 font-mono">
              ISO/IEC 27001 Security Control 8.16
            </span>
          </div>
        </div>

        <p className="text-gov-700 dark:text-slate-300 leading-relaxed text-[11px]">
          Your government terminal has been idle for 14 minutes. For security compliance, this session will be locked automatically in:
        </p>

        {/* 60s Countdown Timer */}
        <div className="bg-gov-50 dark:bg-slate-900 p-3 rounded-xl border border-gov-200 dark:border-slate-800 text-center space-y-0.5">
          <span className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
            00:{sessionSecondsRemaining < 10 ? `0${sessionSecondsRemaining}` : sessionSecondsRemaining}
          </span>
          <span className="text-[10px] text-gov-400 block uppercase tracking-wider font-semibold">
            Seconds until session revocation
          </span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={logoutUser}
            className="flex-1 bg-gov-100 hover:bg-gov-200 dark:bg-slate-800 text-gov-800 dark:text-slate-200 font-bold py-2 rounded-lg transition-all flex items-center justify-center gap-1 text-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock Now</span>
          </button>
          <button
            onClick={extendActiveSession}
            className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-2 rounded-lg transition-all shadow-sm flex items-center justify-center gap-1 text-xs"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Stay Active</span>
          </button>
        </div>
      </div>
    </div>
  );
};
