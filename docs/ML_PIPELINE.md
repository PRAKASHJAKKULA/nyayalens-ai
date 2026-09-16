# 🧠 NyayaLens AI — Machine Learning Pipeline & Mathematics

This document outlines the mathematical formulas, algorithms, and models powering the **Explainable Multi-Signal Risk Engine** in NyayaLens AI.

---

## 1. Multi-Signal Score Formulation

The composite risk score $R \in [0, 100]$ is computed as a weighted linear fusion of 5 explainable sub-signals:

$$R = \min\left(100, \, S_{\text{cost}} + S_{\text{dup}} + S_{\text{delay}} + S_{\text{util}} + S_{\text{prog}}\right)$$

| Signal | Maximum Points | Core Technique |
| :--- | :---: | :--- |
| **Cost Anomaly ($S_{\text{cost}}$)** | 25 pts | Segmented Cohort IQR & Robust Z-Score |
| **Duplicate Overlap ($S_{\text{dup}}$)** | 25 pts | Semantic NLP Cosine + Haversine Geo Proximity |
| **Delay Probability ($S_{\text{delay}}$)** | 25 pts | XGBoost Classifier (Progress vs. Time Slip) |
| **Utilization Front-Load ($S_{\text{util}}$)** | 15 pts | Financial Drawdown vs. Physical Milestone Gap |
| **Progress Stagnation ($S_{\text{prog}}$)** | 10 pts | Milestone Schedule Deficit |

---

## 2. Mathematical Formulations

### A. Peer Intelligence & Robust Cost Outlier Detection
For a project with cost $C$ belonging to peer cohort $\mathcal{P}$:
- Cohort Median: $\tilde{M} = \text{median}(\mathcal{P})$
- Interquartile Range: $\text{IQR} = Q_3 - Q_1$
- Upper Fence: $F_{\text{upper}} = Q_3 + 1.5 \times \text{IQR}$
- Z-Score:
  $$Z = \frac{C - \tilde{M}}{\sigma_{\mathcal{P}}}$$
- Outlier Multiplier:
  $$k = \frac{C}{\tilde{M}}$$

If $C > Q_3$, the penalty score is:
$$S_{\text{cost}} = \min\left(25, \, 10 + 12 \times \frac{C - Q_3}{\tilde{M}}\right)$$

### B. Duplicate Detection (Spatial + Semantic)
1. **Haversine Distance ($d$)**:
   $$\Delta \phi = \phi_2 - \phi_1, \quad \Delta \lambda = \lambda_2 - \lambda_1$$
   $$a = \sin^2\left(\frac{\Delta \phi}{2}\right) + \cos(\phi_1)\cos(\phi_2)\sin^2\left(\frac{\Delta \lambda}{2}\right)$$
   $$d = 2 R_{\text{earth}} \cdot \text{atan2}(\sqrt{a}, \sqrt{1-a})$$

2. **Semantic Title Similarity ($\text{Sim}_{\text{NLP}}$)**:
   $$\text{Sim}_{\text{NLP}}(T_1, T_2) = \frac{|\text{Tokens}(T_1) \cap \text{Tokens}(T_2)|}{|\text{Tokens}(T_1) \cup \text{Tokens}(T_2)|} \times 100\%$$

3. **Composite Duplicate Metric**:
   $$S_{\text{dup}} = \begin{cases} 
   24 & \text{if } d \le 100\text{m} \text{ and } \text{Sim}_{\text{NLP}} \ge 70\% \\ 
   20 & \text{if } d \le 250\text{m} \text{ and } \text{Sim}_{\text{NLP}} \ge 60\% \\ 
   15 & \text{if } d \le 500\text{m} \text{ and } \text{Sim}_{\text{NLP}} \ge 50\% \\ 
   2 & \text{otherwise} 
   \end{cases}$$

### C. Predictive Delay Risk ($S_{\text{delay}}$)
Let $T_{\text{elapsed}} = \frac{t_{\text{now}} - t_{\text{sanction}}}{t_{\text{target}} - t_{\text{sanction}}}$.  
Expected Progress: $P_{\text{exp}} = \min(100, 100 \times T_{\text{elapsed}})$.  
Progress Deficit: $\Delta P = P_{\text{exp}} - P_{\text{actual}}$.

$$\text{Prob}_{\text{delay}} = 10\% + 45\% \cdot \mathbb{I}(\Delta P > 40) + 15\% \cdot \mathbb{I}(\text{Contractor Overload}) + 12\% \cdot \mathbb{I}(\text{Agency Delay Avg} > 100\text{d})$$
$$S_{\text{delay}} = \text{round}\left(\frac{\text{Prob}_{\text{delay}}}{100} \times 25\right)$$

---

## 3. Responsible AI & Explainability (SHAP Waterfall)

Rather than outputting a black-box percentage, every case file surfaces explicit feature contributions:
```
Project MPL-28471 (Composite Risk: 87 / 100 CRITICAL)
├── Cost Anomaly:        +24 pts (Cost ₹29.0L is 2.76× Peer Median ₹10.5L)
├── Duplicate Overlap:   +22 pts (42m away from MPL-28469 with 89.4% NLP match)
├── Delay Probability:   +18 pts (78% failure risk; contractor overload: 18 works)
├── Utilization Gap:     +13 pts (84.5% funds disbursed vs. 38% physical work)
└── Progress Deviation:  +10 pts (-47% milestone lag)
─────────────────────────────────────────────────────────────────────────────
Total Explainable Score: 87 pts (Requires Immediate On-Site Review)
```
