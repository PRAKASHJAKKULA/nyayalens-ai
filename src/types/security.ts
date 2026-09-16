import { UserRole } from './index';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  role: UserRole;
  mfaEnabled: boolean;
  isGovVerified: boolean;
  lastLogin: string;
  sessionToken: string;
}

export type SecurityDomain = 
  | 'LOGIN_PROTECTION'
  | 'SIGNUP_VERIFICATION'
  | 'SESSION_SECURITY'
  | 'ERROR_MESSAGE_SECURITY'
  | 'PASSWORD_RESET'
  | 'MFA'
  | 'API_SECURITY'
  | 'LOGGING_MONITORING'
  | 'RBAC_AUTHORIZATION';

export interface SecurityCheckItem {
  id: string;
  domainNumber: number;
  domain: SecurityDomain;
  title: string;
  status: 'PASS' | 'MONITORED' | 'ENFORCED';
  complianceStandard: string;
  description: string;
  technicalImplementation: string;
  verifiedAt: string;
}

export interface SecurityLogEvent {
  id: string;
  timestamp: string;
  eventType: 
    | 'AUTH_LOGIN_SUCCESS'
    | 'AUTH_LOGIN_FAILED'
    | 'AUTH_BRUTE_FORCE_LOCKOUT'
    | 'AUTH_MFA_CHALLENGE_VERIFIED'
    | 'AUTH_PASSWORD_RESET_DISPATCHED'
    | 'AUTH_GOV_SIGNUP_VERIFIED'
    | 'SESSION_INACTIVITY_EXTENDED'
    | 'SESSION_TIMEOUT_REVOKED'
    | 'RBAC_UNAUTHORIZED_BLOCKED'
    | 'EVIDENCE_INTEGRITY_AUDITED'
    | 'API_RATE_LIMIT_CHECKED';
  actorEmail: string;
  actorRole: string;
  ipAddress: string;
  userAgent: string;
  details: string;
  severity: 'INFO' | 'WARN' | 'HIGH' | 'CRITICAL';
  proofHash: string;
}

export interface ActiveSessionInfo {
  id: string;
  device: string;
  browser: string;
  ipAddress: string;
  location: string;
  loginTime: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface RolePermissions {
  canEscalateVigilance: boolean;
  canApproveReview: boolean;
  canSubmitInspection: boolean;
  canViewAuditLedger: boolean;
  canManageSecuritySOC: boolean;
  canAccessRawCAD: boolean;
  canRecalculateRisk: boolean;
}
