# 🏗️ NyayaLens AI — System Design & Architecture Specification

> **Project Type:** Solo Real-Time Public Sector Intelligence Platform  
> **Target Domain:** Ministry of Statistics and Programme Implementation (MoSPI) / MPLADS Oversight (SIH26102)  
> **Architect & Lead Developer:** Bhavi (Full-Stack & AI Systems)

---

## 1. Executive System Overview

NyayaLens AI is an explainable early-warning and decision-support intelligence platform that processes structured public infrastructure datasets (12,480+ active schemes) to detect financial anomalies, duplicate works, implementation delays, and contractor overload clusters without making ungrounded fraud accusations.

```
                                  CLIENT TIER
             ┌─────────────────────────┼─────────────────────────┐
             ↓                         ↓                         ↓
   Desktop Command Center    Mobile Field Inspector     3D WebGL Digital Twin
   (GIS & Risk Choropleth)   (GPS Geofence + SHA-256)   (CAD Structure Analysis)
             │                         │                         │
             └─────────────────────────┼─────────────────────────┘
                                       ↓
                             APPLICATION GATEWAY
                     (FastAPI / Vite TypeScript Core)
                                       │
      ┌────────────────────────────────┼────────────────────────────────┐
      ↓                                ↓                                ↓
 1. RISK ENGINE                 2. DATA & GIS HUB             3. SECURITY & SIEM
 • Peer Group Baselines         • PostgreSQL / PostGIS         • 9 Compliance Domains
 • IQR & Z-Score Analysis       • Geospatial Haversine Index   • TOTP MFA Engine
 • NLP Semantic Cosine          • Relationship Graph           • Inactivity Timeout
 • XGBoost Delay Estimator      • Knowledge Base (RAG)         • SHA-256 Audit Trail
 • SHAP Waterfall Fusion        • Document Storage             • 4-Tier RBAC Matrix
```

---

## 2. Architecture Decisions & Tradeoffs

### A. Modular Monolith vs. Distributed Microservices
- **Decision:** Modular Monolith with strict internal domain boundaries.
- **Rationale:** Microservices introduce distributed transaction complexity, network serialization latency, and debugging overhead that diminish hackathon velocity and solo maintainability. A modular monolith provides single-process performance, zero-network internal function calls, and can be horizontally scaled via container replicas.

### B. Statistical Peer Intelligence vs. Generic Machine Learning
- **Decision:** Multi-Signal Ensemble comparing projects against segmented peer cohorts (Asset Category + District Tier + Scale + Seasonality).
- **Rationale:** Traditional one-size-fits-all models fail because construction costs legitimately vary across rural vs. metro zones. Segmented IQR baseline comparisons eliminate false positives and make every score explainable to government auditors.

### C. Cryptographic SHA-256 Ledger vs. Heavyweight Blockchain
- **Decision:** Client-Side WebCrypto SHA-256 digest chaining.
- **Rationale:** Storing multi-megabyte photos on a public blockchain incurs extreme gas fees and privacy violations. NyayaLens hashes metadata, GPS coordinates, timestamp, and photo bytes into an immutable 64-character SHA-256 signature recorded in an append-only audit trail.

---

## 3. High-Level Data Flow

```
1. Ingestion: MPLADS JSON / CSV / API Record
      ↓
2. Normalization & Spatial Indexing (PostGIS / Haversine)
      ↓
3. Peer Cohort Mapping (Sector + Category + District Tier)
      ↓
4. Multi-Signal AI Extraction:
   ├── Cost Anomaly: Z-Score & Outlier Factor over Peer IQR
   ├── Duplicate Detection: Cosine Semantic Match + Distance (<50m)
   ├── Delay Risk: Progress Deficit vs Duration + Contractor Load
   └── Utilization Gap: Disbursed Funds % vs Physical Completion %
      ↓
5. Risk Fusion & SHAP Contribution Calculation (0–100 Scale)
      ↓
6. Presentation: Interactive Map, SHAP Waterfall, Network Graph, SIEM SOC
```
