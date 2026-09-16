# 🛠️ NyayaLens AI — Production Maintenance & DevOps Guide

This document details the long-term maintenance, monitoring, continuous updates, security patching, and scalability operations for **NyayaLens AI**.

---

## 1. Automated Continuous Deployment (CI/CD)

### How Updates Work:
Since your repository is linked to Vercel, maintenance is **100% automated**:
1. Make your code or data changes locally.
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "feat: update peer group baselines for FY 2025"
   git push origin main
   ```
3. Vercel automatically detects the push, runs `npm run build`, and updates your live production site with **zero downtime** in under 45 seconds.

### Instant 1-Click Rollback:
If an issue or bug ever occurs in production:
- Go to your **Vercel Dashboard** &rarr; **Deployments**.
- Click on any previous successful deployment &rarr; Click **"Promote to Production"**.
- Your site instantly rolls back in 1 second.

---

## 2. Observability, Logs & Performance Monitoring

### A. Real-Time Runtime Logs
- View live user traffic, HTTP requests, client-side errors, and status codes in your **Vercel Dashboard &rarr; Logs**.

### B. Free Automated Uptime Monitoring
To ensure 99.99% uptime with instant alerts (via Email/Telegram/Slack):
- Use **[UptimeRobot](https://uptimerobot.com/)** or **[BetterStack](https://betterstack.com/)** (both free).
- Set up a monitor pinging `https://<your-vercel-url>.vercel.app` every 5 minutes.

### C. Performance & Web Vitals
- Enable **Vercel Speed Insights** (1-click free enable in Vercel settings) to monitor Core Web Vitals (LCP, FID, CLS) across all desktop and mobile devices in India.

---

## 3. Data & ML Intelligence Maintenance

When new MPLADS project data is published by MoSPI:

| Data Area | File Location | Maintenance Frequency |
| :--- | :--- | :--- |
| **Active Projects Dataset** | `src/data/mockProjects.ts` | Monthly / Quarterly |
| **Peer Group IQR Baselines** | `src/data/peerGroups.ts` | Annually (Adjusting for inflation/DPR rates) |
| **Agencies & Contractors** | `src/data/agenciesAndContractors.ts` | As new tenders are awarded |
| **MoSPI Guidelines (RAG)** | `src/data/guidelineDocs.ts` | When new gazette circulars are released |

---

## 4. Security & Dependency Maintenance

### A. Automated Dependency Patching (Dependabot)
- GitHub Dependabot is enabled to automatically scan `package.json` for security vulnerabilities and open pull requests for outdated packages.
- Run locally periodically:
  ```bash
  npm audit
  npm audit fix
  ```

### B. 9-Domain Security Auditing
- Open the built-in **Security Operations Center (SOC)** in the app (`Security & SIEM` tab) to inspect:
  - Active terminal sessions & revocations.
  - Brute-force rate limiter thresholds.
  - SHA-256 evidence integrity logs.

---

## 5. Custom Domain & SSL Management

- **SSL Certificates**: Handled automatically by Vercel via Let's Encrypt (auto-renews every 90 days with zero manual work).
- **Adding a Custom Domain**:
  1. Go to **Vercel Dashboard** &rarr; **Settings** &rarr; **Domains**.
  2. Enter your domain (e.g. `nyayalens.in` or `nyayalens.gov.in`).
  3. Add the provided CNAME / A record in your DNS provider (GoDaddy, Namecheap, Cloudflare).

---

## 6. Infrastructure Cost & Scaling

- **Hosting Cost**: **$0 / month (Free Forever)** on Vercel Hobby Tier (includes 100 GB global Edge CDN bandwidth, 100+ Edge locations in India, unlimited free SSL).
- **Server Maintenance**: **Zero Server Management** (Serverless static architecture means no OS patching, no Linux server management, no Apache/Nginx crash restarts).
