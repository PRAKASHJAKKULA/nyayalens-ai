import { SecurityCheckItem } from '../types/security';

export const COMPLIANCE_SECURITY_CHECKS: SecurityCheckItem[] = [
  {
    id: 'SEC-01-LOGIN',
    domainNumber: 1,
    domain: 'LOGIN_PROTECTION',
    title: '1. Login Protection & Brute-Force Defenses',
    status: 'ENFORCED',
    complianceStandard: 'CERT-In / MoSPI Cyber Framework §4.1',
    description: 'Implements rate limiting (max 5 failed attempts per IP/account), 60-second exponential lockout cooldown, NIC mathematical CAPTCHA verification, and anti-credential stuffing algorithms.',
    technicalImplementation: 'Active sliding-window counter with automatic lockout state, generic failure status, and client-side sanitization prior to cryptographic hash comparison.',
    verifiedAt: '2024-09-01T10:00:00Z'
  },
  {
    id: 'SEC-02-SIGNUP',
    domainNumber: 2,
    domain: 'SIGNUP_VERIFICATION',
    title: '2. Signup & Government Domain Verification',
    status: 'ENFORCED',
    complianceStandard: 'NIC Identity & Access Management (IAM) Guidelines 2023',
    description: 'Restricts user account registration exclusively to authorized Indian Government domains (@mospi.gov.in, @nic.in, @ias.nic.in, @pwd.gov.in) with mandatory Employee ID/Cadre verification and 6-digit email OTP confirmation.',
    technicalImplementation: 'Domain regex validation filter + NIST SP 800-63B password entropy validator (requires minimum 12 chars, upper, lower, numbers, and special symbols).',
    verifiedAt: '2024-09-01T10:00:00Z'
  },
  {
    id: 'SEC-03-SESSION',
    domainNumber: 3,
    domain: 'SESSION_SECURITY',
    title: '3. Session Security & Inactivity Timeout',
    status: 'ENFORCED',
    complianceStandard: 'ISO/IEC 27001:2022 Control 8.16 / OWASP Session Mgmt',
    description: 'Enforces 15-minute terminal idle timeout with a 60-second interactive warning modal, single concurrent active session per identity, and cryptographic JWT bearer token invalidation on logout.',
    technicalImplementation: 'Activity listener on DOM events (mousemove, keypress, click) reset timer; cryptographic session signature verified on state mutations.',
    verifiedAt: '2024-09-01T10:00:00Z'
  },
  {
    id: 'SEC-04-ERROR',
    domainNumber: 4,
    domain: 'ERROR_MESSAGE_SECURITY',
    title: '4. Error Message Security & Anti-Enumeration',
    status: 'PASS',
    complianceStandard: 'OWASP Top 10 A05:2021 Security Misconfiguration',
    description: 'Returns generic authentication responses ("Invalid government credentials or unverified account") to prevent threat actor user-enumeration and username harvesting.',
    technicalImplementation: 'All backend and client error handlers sanitize stack traces, internal database schema names, and column identifiers from user-facing surfaces.',
    verifiedAt: '2024-09-01T10:00:00Z'
  },
  {
    id: 'SEC-05-RESET',
    domainNumber: 5,
    domain: 'PASSWORD_RESET',
    title: '5. Password Reset Security & Session Revocation',
    status: 'ENFORCED',
    complianceStandard: 'NIST SP 800-63B Authentication Lifecycle §5.1.2',
    description: 'Single-use cryptographic reset tokens with strict 10-minute expiry, masked email dispatch notification (s***@mospi.gov.in), and instantaneous revocation of all existing active sessions upon password reset.',
    technicalImplementation: 'WebCrypto SHA-256 random token generation with timestamp validation; all prior session tokens invalidated in registry.',
    verifiedAt: '2024-09-01T10:00:00Z'
  },
  {
    id: 'SEC-06-MFA',
    domainNumber: 6,
    domain: 'MFA',
    title: '6. Multi-Factor Authentication (MFA / 2FA)',
    status: 'ENFORCED',
    complianceStandard: 'MoSPI National Informatics Security Policy §8.4',
    description: 'Mandatory 6-digit Time-based One-Time Password (TOTP) authenticator challenge for high-clearance administrative roles (MoSPI Senior Auditor, District Collector) with emergency backup recovery keys.',
    technicalImplementation: 'TOTP 30-second time-step algorithm emulation + 8 one-time cryptographic recovery codes stored with SHA-256 digests.',
    verifiedAt: '2024-09-01T10:00:00Z'
  },
  {
    id: 'SEC-07-API',
    domainNumber: 7,
    domain: 'API_SECURITY',
    title: '7. Backend & API Security (Gateway & Headers)',
    status: 'PASS',
    complianceStandard: 'OWASP API Security Top 10 / CERT-In Best Practices',
    description: 'Enforces Bearer Authorization header validation, request payload schema sanitization, Content Security Policy (CSP), CORS origin restriction, and anti-tamper cryptographic payload hashing.',
    technicalImplementation: 'HTTP header emulation for X-Content-Type-Options: nosniff, X-Frame-Options: DENY, Strict-Transport-Security, and client payload validation schemas.',
    verifiedAt: '2024-09-01T10:00:00Z'
  },
  {
    id: 'SEC-08-LOGGING',
    domainNumber: 8,
    domain: 'LOGGING_MONITORING',
    title: '8. Logging, SIEM Monitoring & Audit Trail',
    status: 'ENFORCED',
    complianceStandard: 'CERT-In Cyber Security Directions 2022 §3.1',
    description: 'Complete SIEM audit logging of all authentication events, privilege escalations, unauthorized access attempts, and evidence modifications with immutable SHA-256 cryptographic signatures.',
    technicalImplementation: 'Structured security event stream recording Actor, Role, IP Address, Event Type, Timestamp, Details, and SHA-256 Immutable Proof Hash.',
    verifiedAt: '2024-09-01T10:00:00Z'
  },
  {
    id: 'SEC-09-RBAC',
    domainNumber: 9,
    domain: 'RBAC_AUTHORIZATION',
    title: '9. Authorization (Access Control & RBAC Matrix)',
    status: 'ENFORCED',
    complianceStandard: 'MoSPI Operational Framework §2.3 / Least Privilege Principle',
    description: 'Strict 4-tier Role-Based Access Control matrix separating privileges between National Auditor, District Collector, Field Inspector, and System Admin with granular capability gates.',
    technicalImplementation: 'Context-level permission validator function `hasPermission(key)` blocking unauthorized actions across UI buttons, inspection submission, and vigilance escalation.',
    verifiedAt: '2024-09-01T10:00:00Z'
  }
];
