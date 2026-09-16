# 🛡️ NyayaLens AI — Security & Compliance Architecture

This document details the **9-Domain Security & Authentication Architecture** designed to meet Indian National Informatics standards for government data platforms.

---

## 1. Compliance Standards Matrix

| # | Security Domain | Governing Standard | Technical Enforcement |
| :-: | :--- | :--- | :--- |
| **1** | **Login Protection** | CERT-In §4.1 / MoSPI Cyber Framework | 5-strike rate limiter, 60s cooldown lock, NIC Math CAPTCHA. |
| **2** | **Signup & Verification** | NIC IAM Guidelines 2023 | `@mospi.gov.in`, `@nic.in`, `@ias.nic.in` domain gate + Employee ID validation + NIST password complexity. |
| **3** | **Session Security** | ISO/IEC 27001 Control 8.16 | 15-minute inactivity idle timer + 60s countdown warning + cryptographic token invalidation. |
| **4** | **Error Message Security** | OWASP Top 10 A05:2021 | Generic failure response (*"Invalid government credentials"*) preventing user enumeration. |
| **5** | **Password Reset** | NIST SP 800-63B §5.1.2 | Single-use 10-minute cryptographic token + masked dispatch (`s***@nic.in`) + revocation of prior sessions. |
| **6** | **Multi-Factor Auth (MFA)** | MoSPI Cyber Security Policy §8.4 | 6-digit TOTP challenge for `MOSPI_AUDITOR` & `DISTRICT_COLLECTOR` + emergency recovery codes. |
| **7** | **Backend & API Security** | OWASP API Security Top 10 | Bearer Authorization header gateway + CSP + CORS + X-Frame-Options: DENY. |
| **8** | **Logging & Monitoring** | CERT-In Security Directions 2022 | Real-time SIEM Security Operations Center (SOC) stream with immutable SHA-256 signatures. |
| **9** | **Authorization & RBAC** | Least Privilege Framework §2.3 | Strict 4-Tier Role-Based Access Control matrix with granular capability gates. |

---

## 2. Role-Based Access Control (RBAC) Matrix

| Capability / Action | `MOSPI_AUDITOR` | `DISTRICT_COLLECTOR` | `FIELD_INSPECTOR` | `SYSTEM_ADMIN` |
| :--- | :---: | :---: | :---: | :---: |
| **View All-India Projects & Maps** | ✅ Full | ✅ Full | ⚠️ Assigned Region | ✅ Full |
| **Recalculate Risk Engine Weights** | ✅ Yes | ❌ No | ❌ No | ✅ Yes |
| **Escalate to Vigilance / Anti-Corruption** | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
| **Submit Geofenced Field Inspection** | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| **Manage SOC Security Logs & Sessions** | ✅ Yes | ❌ No | ❌ No | ✅ Yes |
| **Access 3D Asset Digital Twin CAD** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| **Verify Cryptographic SHA-256 Ledger** | ✅ Yes | ✅ Yes | ❌ No | ✅ Yes |
