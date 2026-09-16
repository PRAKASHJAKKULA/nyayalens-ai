# 🚀 NyayaLens AI — Complete Production Deployment Guide

This guide provides step-by-step instructions for deploying **NyayaLens AI** to production across multiple hosting platforms. All necessary configuration files (`vercel.json`, `netlify.toml`, `public/_redirects`, `Dockerfile`, `nginx.conf`, `.github/workflows/deploy.yml`) have been pre-configured.

---

## ⚡ Quick Deployment Matrix

| Platform | Best For | Setup Time | Cost | Custom Domain & SSL |
| :--- | :--- | :---: | :---: | :---: |
| **Vercel** *(Recommended)* | Instant CDN Deployment | **60 Seconds** | Free | ✅ Free SSL Included |
| **Netlify** | Drag-and-Drop / Git CI | **2 Minutes** | Free | ✅ Free SSL Included |
| **GitHub Pages** | Direct Repository Hosting | **3 Minutes** | Free | ✅ Free SSL Included |
| **Render / Railway** | Cloud / Container Hosting | **3 Minutes** | Free Tier | ✅ Free SSL Included |
| **Docker (Self-Hosted)** | AWS / GCP / DigitalOcean | **5 Minutes** | VPS Cost | ✅ Managed Nginx |

---

## 🟢 Option 1: Deploy to Vercel (Recommended — 60 Seconds)

Vercel provides global Edge CDN distribution and instant builds for Vite React applications.

### Method A: Via GitHub (Continuous Deployment)
1. Push your project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "feat: production ready nyayalens-ai"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/nyayalens-ai.git
   git push -u origin main
   ```
2. Open **[vercel.com/new](https://vercel.com/new)**.
3. Import your **`nyayalens-ai`** repository.
4. Vercel automatically detects Vite:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Your site will be live at `https://nyayalens-ai.vercel.app` in ~45 seconds!

### Method B: Via Vercel CLI (Instant Terminal Deploy)
```bash
npm install -g vercel
vercel
# Follow the prompts (press Enter to accept defaults)
# For production deploy:
vercel --prod
```

---

## 🟠 Option 2: Deploy to Netlify

### Method A: Instant Drag & Drop (Zero Git Required)
1. Ensure the production build is ready:
   ```bash
   npm.cmd run build
   ```
2. Open **[app.netlify.com/drop](https://app.netlify.com/drop)** in your browser.
3. Drag and drop the **`dist`** folder located inside `C:\Users\bhavi\.gemini\antigravity\scratch\nyayalens-ai\dist`.
4. Your site is deployed immediately with a live URL!

### Method B: Via Netlify Git
1. Connect your GitHub repository on **[app.netlify.com](https://app.netlify.com)**.
2. Build settings are automatically loaded from our `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy Site**.

---

## 🟣 Option 3: Deploy to GitHub Pages (Automated GitHub Actions)

We have created an automated CI/CD workflow at `.github/workflows/deploy.yml`.

1. Push your repository to GitHub.
2. Go to your repository on GitHub &rarr; **Settings** &rarr; **Pages** (in left sidebar).
3. Under **Build and deployment** &rarr; **Source**, select **GitHub Actions**.
4. The workflow will automatically trigger, build the project, and deploy your live URL at:
   `https://<YOUR_USERNAME>.github.io/nyayalens-ai/`

---

## 🐳 Option 4: Deploy with Docker (Render, Railway, AWS, DigitalOcean)

A multi-stage `Dockerfile` and optimized `nginx.conf` with security headers and gzip compression are included.

### Build & Run Locally:
```bash
# Build Docker image
docker build -t nyayalens-ai .

# Run container on port 80
docker run -d -p 80:80 --name nyayalens-container nyayalens-ai
```
Visit `http://localhost` in your browser.

### Deploy on Render / Railway:
1. Push to GitHub.
2. In Render / Railway dashboard &rarr; create **New Web Service**.
3. Select **Docker** environment. It will build and serve automatically.

---

## 🔍 Pre-Flight Deployment Checklist

- [x] Production build passes with 0 errors (`npm run build`)
- [x] Single-Page Application (SPA) routing fallback configured (`vercel.json`, `_redirects`, `nginx.conf`)
- [x] Security headers enabled (X-Frame-Options: DENY, X-Content-Type-Options: nosniff, CSP)
- [x] Responsive layout tested for Desktop Command Center & Mobile Field Inspector viewports
- [x] All 9 Security Domains & SIEM Operations Center verified

---

🎉 **Your project is ready to go live to the world!**
