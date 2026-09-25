import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  ShieldCheck,
  Lock,
  Mail,
  Key,
  AlertTriangle,
  RefreshCw,
  Eye,
  EyeOff,
  Smartphone,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Sparkles,
  Play
} from 'lucide-react';

interface OfficerLoginPageProps {
  onLoginSuccess: () => void;
  onBackToPurpose: () => void;
}

export const OfficerLoginPage: React.FC<OfficerLoginPageProps> = ({
  onLoginSuccess,
  onBackToPurpose
}) => {
  const {
    loginUser,
    verifyMfaCode,
    isLockedOut,
    lockoutSecondsRemaining,
    failedAttemptsCount
  } = useSecurity();

  const [step, setStep] = useState<'CREDENTIALS' | 'MFA_CHALLENGE'>('CREDENTIALS');
  const [email, setEmail] = useState<string>('prakash.jakkula@mospi.gov.in');
  const [password, setPassword] = useState<string>('Government@2024');
  const [mfaCode, setMfaCode] = useState<string>('884210');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // NIC Math CAPTCHA
  const [captchaNum1, setCaptchaNum1] = useState<number>(6);
  const [captchaNum2, setCaptchaNum2] = useState<number>(5);
  const [captchaAnswer, setCaptchaAnswer] = useState<string>('11');

  // Feedback & Loading
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 2;
    setCaptchaNum1(n1);
    setCaptchaNum2(n2);
    setCaptchaAnswer('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await loginUser(
        email,
        password,
        parseInt(captchaAnswer) || 0,
        captchaNum1 + captchaNum2
      );

      if (!res.success) {
        setErrorMessage(res.error || 'Authentication failed.');
        refreshCaptcha();
      } else if (res.requiresMfa) {
        setStep('MFA_CHALLENGE');
      } else {
        onLoginSuccess();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await verifyMfaCode(mfaCode);
      if (!res.success) {
        setErrorMessage(res.error || 'Invalid TOTP code.');
      } else {
        onLoginSuccess();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickPrakashLogin = async () => {
    setEmail('prakash.jakkula@mospi.gov.in');
    setPassword('Government@2024');
    setCaptchaAnswer((captchaNum1 + captchaNum2).toString());
    setIsSubmitting(true);
    setErrorMessage(null);

    setTimeout(async () => {
      const res = await loginUser(
        'prakash.jakkula@mospi.gov.in',
        'Government@2024',
        captchaNum1 + captchaNum2,
        captchaNum1 + captchaNum2
      );
      setIsSubmitting(false);
      if (res.requiresMfa) {
        setStep('MFA_CHALLENGE');
      } else {
        onLoginSuccess();
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gov-50 via-white to-gov-100 dark:from-[#080d1e] dark:via-[#0b1329] dark:to-[#0f172a] flex flex-col justify-between text-gov-900 dark:text-slate-100 font-sans">
      {/* Top Bar */}
      <header className="border-b border-gov-200 dark:border-slate-800 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={onBackToPurpose}
            className="flex items-center gap-2 text-xs font-bold text-gov-600 dark:text-slate-300 hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>&larr; Back to App Purpose & Overview</span>
          </button>

          <span className="text-[10px] font-mono font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 px-2 py-0.5 rounded">
            NIC IAM 2023 Compliant Gateway
          </span>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn">
          {/* Official Emblem Banner */}
          <div className="bg-gov-900 text-white p-5 text-center space-y-2 border-b border-gov-800">
            <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center text-xl font-serif font-black mx-auto shadow-md">
              🇮🇳
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider">
                Government Identity & Access Gateway
              </h2>
              <p className="text-[11px] text-gov-400 font-mono">
                Ministry of Statistics & Programme Implementation (MoSPI)
              </p>
            </div>
          </div>

          <div className="p-6 space-y-4 text-xs">
            {/* 1-Click Fast Track for Prakash Jakkula */}
            <div className="p-3.5 bg-brand-50/80 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[11px] text-brand-950 dark:text-brand-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-600" />
                  <span>1-Click Chief Auditor Authentication</span>
                </span>
                <span className="text-[9px] font-mono font-bold bg-brand-600 text-white px-1.5 py-0.2 rounded">
                  RECOMMENDED
                </span>
              </div>
              <p className="text-[10px] text-gov-600 dark:text-slate-400">
                Log in instantly as <strong>Prakash Jakkula</strong> (Chief National Auditor & Vigilance Director, ID: MOSPI-DIR-001).
              </p>
              <button
                type="button"
                onClick={handleQuickPrakashLogin}
                disabled={isSubmitting || isLockedOut}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-2 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Sign In as Prakash Jakkula &rarr;</span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gov-200 dark:border-slate-800" />
              </div>
              <span className="relative bg-white dark:bg-[#0f172a] px-3 text-[10px] font-bold text-gov-400 uppercase tracking-wider">
                Or Manual Official Login
              </span>
            </div>

            {/* Error Message Security Notice */}
            {errorMessage && (
              <div className="p-3 bg-risk-criticalBg border border-risk-criticalBorder rounded-lg text-xs text-risk-criticalText flex items-start gap-2 animate-fadeIn">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="font-semibold leading-tight">{errorMessage}</p>
              </div>
            )}

            {/* Rate Limiter Lockout Banner */}
            {isLockedOut && (
              <div className="p-3 bg-red-950 text-red-200 border border-red-800 rounded-lg text-xs space-y-1 animate-pulse">
                <div className="flex items-center gap-1.5 font-bold">
                  <Lock className="w-4 h-4 text-red-400" />
                  <span>Account Access Locked Out</span>
                </div>
                <p className="text-[11px] text-red-300">
                  Too many failed attempts ({failedAttemptsCount}/5). Cooldown timer: <strong>{lockoutSecondsRemaining}s</strong> remaining.
                </p>
              </div>
            )}

            {/* STEP 1: CREDENTIALS FORM */}
            {step === 'CREDENTIALS' && (
              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div className="space-y-1">
                  <label className="font-bold text-gov-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Government Email:</span>
                    <span className="text-[10px] text-gov-400 font-mono">@mospi.gov.in / @nic.in</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gov-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="prakash.jakkula@mospi.gov.in"
                      className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-gov-900 dark:text-white focus:outline-none focus:border-brand-600 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gov-700 dark:text-slate-300">Password:</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gov-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg pl-9 pr-9 py-2 text-xs text-gov-900 dark:text-white focus:outline-none focus:border-brand-600 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gov-400 hover:text-gov-700"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Math CAPTCHA */}
                <div className="p-2.5 bg-gov-50 dark:bg-slate-900 rounded-lg border border-gov-200 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-gov-700 dark:text-slate-300">Security Math CAPTCHA:</span>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="text-brand-600 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <RefreshCw className="w-3 h-3" /> Refresh
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-sm bg-white dark:bg-slate-950 px-3 py-1.5 rounded border border-gov-300 dark:border-slate-700 tracking-wider">
                      {captchaNum1} + {captchaNum2} = ?
                    </span>
                    <input
                      type="number"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      placeholder="Answer"
                      required
                      className="w-24 bg-white dark:bg-slate-950 border border-gov-300 dark:border-slate-700 rounded p-1.5 text-xs text-center font-mono font-bold focus:outline-none focus:border-brand-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isLockedOut}
                  className="w-full bg-gov-900 hover:bg-black text-white font-extrabold py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Verifying...' : 'Sign In & Launch Dashboard →'}</span>
                </button>
              </form>
            )}

            {/* STEP 2: TOTP MFA CHALLENGE */}
            {step === 'MFA_CHALLENGE' && (
              <form onSubmit={handleMfaSubmit} className="space-y-4 text-center animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-gov-900 dark:text-white">
                    Two-Factor TOTP Verification
                  </h4>
                  <p className="text-[11px] text-gov-500">
                    Enter the 6-digit code sent to your registered government device.
                  </p>
                </div>

                <div className="space-y-1">
                  <input
                    type="text"
                    maxLength={6}
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value)}
                    placeholder="884210"
                    required
                    className="w-48 mx-auto bg-gov-50 dark:bg-slate-900 border-2 border-brand-600 rounded-xl py-2.5 text-center text-lg font-mono font-black tracking-widest text-gov-900 dark:text-white focus:outline-none"
                  />
                  <span className="text-[10px] text-gov-400 block font-mono">
                    Demo TOTP Code: <strong>884210</strong>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify TOTP & Launch Dashboard →</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep('CREDENTIALS')}
                  className="w-full text-center text-[11px] text-gov-500 hover:underline font-semibold"
                >
                  &larr; Back to Email & Password
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gov-200 dark:border-slate-800 py-3.5 px-6 text-center text-xs text-gov-400">
        NIC Secure Gateway • ISO/IEC 27001 & CERT-In Cyber Security Directives Compliant
      </footer>
    </div>
  );
};
