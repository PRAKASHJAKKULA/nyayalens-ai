import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { UserRole } from '../../types';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Key,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  X,
  Building2,
  Eye,
  EyeOff,
  Smartphone,
  Send,
  HelpCircle
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    setAuthModalOpen,
    loginUser,
    verifyMfaCode,
    registerGovUser,
    requestPasswordReset,
    isLockedOut,
    lockoutSecondsRemaining,
    failedAttemptsCount,
    validatePasswordStrength
  } = useSecurity();

  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP' | 'MFA' | 'RESET' | 'RESET_SUCCESS'>('LOGIN');

  // Form Inputs
  const [email, setEmail] = useState<string>('suresh.verma@mospi.gov.in');
  const [password, setPassword] = useState<string>('Government@2024');
  const [name, setName] = useState<string>('Dr. Suresh Verma');
  const [employeeId, setEmployeeId] = useState<string>('MOSPI-AUD-8821');
  const [role, setRole] = useState<UserRole>('MOSPI_AUDITOR');
  const [mfaCode, setMfaCode] = useState<string>('884210');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [maskedResetEmail, setMaskedResetEmail] = useState<string>('');

  // NIC Math CAPTCHA
  const [captchaNum1, setCaptchaNum1] = useState<number>(7);
  const [captchaNum2, setCaptchaNum2] = useState<number>(4);
  const [captchaAnswer, setCaptchaAnswer] = useState<string>('11');

  // Status & Feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!authModalOpen) return null;

  const refreshCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 2;
    const n2 = Math.floor(Math.random() * 8) + 2;
    setCaptchaNum1(n1);
    setCaptchaNum2(n2);
    setCaptchaAnswer('');
  };

  const handleLogin = async (e: React.FormEvent) => {
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
        setMode('MFA');
      } else {
        setAuthModalOpen(false);
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
        setAuthModalOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await registerGovUser({
        name,
        email,
        employeeId,
        role,
        pass: password
      });

      if (!res.success) {
        setErrorMessage(res.error || 'Registration failed.');
      } else {
        setAuthModalOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const res = await requestPasswordReset(email);
      if (!res.success) {
        setErrorMessage(res.error || 'Failed to dispatch reset token.');
      } else {
        setMaskedResetEmail(res.maskedEmail || email);
        setMode('RESET_SUCCESS');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const pwdStrength = validatePasswordStrength(password);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gov-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-[#0f172a] border border-gov-300 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Government Gateway Banner */}
        <div className="bg-gov-900 text-white p-4 flex items-center justify-between border-b border-gov-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center font-serif text-white font-bold text-sm">
              🇮🇳
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Government Identity & Access Gateway
              </h3>
              <p className="text-[10px] text-gov-400 font-mono">
                MoSPI / NIC National Cyber Security Framework
              </p>
            </div>
          </div>

          <button
            onClick={() => setAuthModalOpen(false)}
            className="p-1 rounded-lg text-gov-400 hover:text-white hover:bg-gov-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        {mode !== 'MFA' && mode !== 'RESET_SUCCESS' && (
          <div className="flex border-b border-gov-200 dark:border-slate-800 text-xs font-bold">
            <button
              onClick={() => {
                setMode('LOGIN');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 text-center transition-all ${
                mode === 'LOGIN'
                  ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-brand-50/40 dark:bg-brand-950/30 font-extrabold'
                  : 'text-gov-500 hover:text-gov-800'
              }`}
            >
              1. Officer Login
            </button>
            <button
              onClick={() => {
                setMode('SIGNUP');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 text-center transition-all ${
                mode === 'SIGNUP'
                  ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-brand-50/40 dark:bg-brand-950/30 font-extrabold'
                  : 'text-gov-500 hover:text-gov-800'
              }`}
            >
              2. Gov Verification (Signup)
            </button>
            <button
              onClick={() => {
                setMode('RESET');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2.5 text-center transition-all ${
                mode === 'RESET'
                  ? 'border-b-2 border-brand-600 text-brand-600 dark:text-brand-400 bg-brand-50/40 dark:bg-brand-950/30 font-extrabold'
                  : 'text-gov-500 hover:text-gov-800'
              }`}
            >
              3. Reset Token
            </button>
          </div>
        )}

        <div className="p-5 space-y-4">
          {/* Error Message Security Notice (#4) */}
          {errorMessage && (
            <div className="p-3 bg-risk-criticalBg border border-risk-criticalBorder rounded-lg text-xs text-risk-criticalText flex items-start gap-2 animate-fadeIn">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <p className="font-semibold leading-tight">{errorMessage}</p>
            </div>
          )}

          {/* Rate Limiter Lockout Banner (#1) */}
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

          {/* MODE 1: LOGIN FORM */}
          {mode === 'LOGIN' && (
            <form onSubmit={handleLogin} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gov-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Official Government Email:</span>
                  <span className="text-[10px] text-gov-400 font-mono">@mospi.gov.in / @nic.in</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gov-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name.officer@mospi.gov.in"
                    className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-gov-900 dark:text-white focus:outline-none focus:border-brand-600 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-gov-700 dark:text-slate-300">Password:</label>
                  <button
                    type="button"
                    onClick={() => setMode('RESET')}
                    className="text-[11px] text-brand-600 hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
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

              {/* Bot Security CAPTCHA (#1) */}
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

              {/* Preset Quick Fill Demo Credentials */}
              <div className="p-2 bg-brand-50/50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-800/60 rounded-lg text-[10px] text-gov-600 dark:text-slate-400 space-y-1">
                <span className="font-bold text-brand-900 dark:text-brand-300 block">Preset MoSPI Official Credentials:</span>
                <div className="flex flex-wrap gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('suresh.verma@mospi.gov.in');
                      setPassword('Government@2024');
                    }}
                    className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-gov-200 dark:border-slate-800 font-mono text-brand-700 dark:text-brand-400"
                  >
                    Auditor (Dr. Verma)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('ramesh.kumar@ias.nic.in');
                      setPassword('Government@2024');
                    }}
                    className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-gov-200 dark:border-slate-800 font-mono text-brand-700 dark:text-brand-400"
                  >
                    DM / Collector (Ramesh)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('p.ravinder@pwd.gov.in');
                      setPassword('Government@2024');
                    }}
                    className="bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-gov-200 dark:border-slate-800 font-mono text-brand-700 dark:text-brand-400"
                  >
                    Inspector (P. Ravinder)
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLockedOut}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-extrabold py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In with Government Identity'}</span>
              </button>
            </form>
          )}

          {/* MODE 2: SIGNUP & GOV DOMAIN VERIFICATION (#2) */}
          {mode === 'SIGNUP' && (
            <form onSubmit={handleSignup} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-gov-700 dark:text-slate-300">Officer Full Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Officer Name"
                  className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-2 text-xs text-gov-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gov-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Official Government Mail:</span>
                  <span className="text-[10px] text-risk-critical font-mono font-bold">Domain Restricted</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="cadre.officer@mospi.gov.in"
                  className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-2 text-xs text-gov-900 dark:text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-gov-700 dark:text-slate-300">Employee ID / Cadre:</label>
                  <input
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                    placeholder="MOSPI-AUD-8821"
                    className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-2 text-xs text-gov-900 dark:text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-gov-700 dark:text-slate-300">Clearance Role:</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as UserRole)}
                    className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-2 text-xs text-gov-900 dark:text-white"
                  >
                    <option value="MOSPI_AUDITOR">MoSPI Senior Auditor</option>
                    <option value="DISTRICT_COLLECTOR">District Collector</option>
                    <option value="FIELD_INSPECTOR">Field Inspector</option>
                  </select>
                </div>
              </div>

              {/* Password with NIST Complexity Meter */}
              <div className="space-y-1">
                <label className="font-bold text-gov-700 dark:text-slate-300">Password (NIST SP 800-63B):</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Min 12 characters"
                  className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-2 text-xs text-gov-900 dark:text-white font-mono"
                />

                {/* NIST Complexity Progress */}
                <div className="space-y-1 pt-1">
                  <div className="w-full bg-gov-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${
                        pwdStrength.score >= 80
                          ? 'bg-emerald-500 w-full'
                          : pwdStrength.score >= 50
                          ? 'bg-amber-500 w-3/4'
                          : 'bg-red-500 w-1/3'
                      }`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gov-500">
                    <span>{pwdStrength.feedback}</span>
                    <span className="font-mono font-bold">{pwdStrength.score}/100</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verify Gov Identity & Register</span>
              </button>
            </form>
          )}

          {/* MODE 3: MULTI-FACTOR AUTHENTICATION (#6) */}
          {mode === 'MFA' && (
            <form onSubmit={handleMfaSubmit} className="space-y-4 text-xs animate-fadeIn">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-sm text-gov-900 dark:text-white">
                  Two-Factor TOTP Challenge
                </h4>
                <p className="text-[11px] text-gov-500 dark:text-slate-400">
                  Enter the 6-digit dynamic code from your Government Authenticator App or SMS OTP.
                </p>
              </div>

              <div className="space-y-1 text-center">
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
                  Default Demo TOTP: <strong>884210</strong>
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verify TOTP Token & Launch</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('LOGIN')}
                className="w-full text-center text-[11px] text-gov-500 hover:underline font-semibold"
              >
                Back to Standard Login
              </button>
            </form>
          )}

          {/* MODE 4: PASSWORD RESET (#5) */}
          {mode === 'RESET' && (
            <form onSubmit={handlePasswordReset} className="space-y-3 text-xs animate-fadeIn">
              <div className="space-y-1">
                <h4 className="font-extrabold text-gov-900 dark:text-white text-xs">
                  Single-Use Cryptographic Reset Token
                </h4>
                <p className="text-[11px] text-gov-500 leading-relaxed">
                  Enter your registered government email address. A time-limited (10-minute) single-use cryptographic token will be dispatched.
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gov-700 dark:text-slate-300">Government Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="suresh.verma@mospi.gov.in"
                  className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-2 text-xs text-gov-900 dark:text-white font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Dispatch Cryptographic Reset Token</span>
              </button>

              <button
                type="button"
                onClick={() => setMode('LOGIN')}
                className="w-full text-center text-[11px] text-gov-500 hover:underline font-semibold"
              >
                Cancel and return to Login
              </button>
            </form>
          )}

          {/* MODE 5: RESET SUCCESS */}
          {mode === 'RESET_SUCCESS' && (
            <div className="text-center space-y-3 py-3 text-xs animate-fadeIn">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-gov-900 dark:text-white text-sm">Reset Token Dispatched</h4>
              <p className="text-gov-600 dark:text-slate-300 leading-relaxed text-[11px]">
                A 10-minute single-use reset token has been dispatched to <strong>{maskedResetEmail}</strong>. All active sessions across other terminals have been revoked immediately.
              </p>
              <button
                onClick={() => setMode('LOGIN')}
                className="bg-brand-600 text-white font-bold px-4 py-2 rounded-lg text-xs"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
