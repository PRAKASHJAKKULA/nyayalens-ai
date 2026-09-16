import { Project, InvestigatorMessage } from '../types';
import { MOSPI_GUIDELINES } from '../data/guidelineDocs';

export function queryInvestigatorAgent(
  query: string,
  projects: Project[]
): InvestigatorMessage {
  const q = query.toLowerCase().trim();

  // 1. Query: Why is project MPL-28471 (or specific ID) high risk?
  const matchedProject = projects.find(
    (p) => q.includes(p.id.toLowerCase()) || (q.includes('28471') && p.id.includes('28471'))
  );

  if (matchedProject) {
    const s = matchedProject.riskSignals;
    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: `### 🔎 Investigation Brief: **${matchedProject.id} — ${matchedProject.title}**
**Risk Score:** \`${s.totalScore}/100\` (${s.tier})

**Key Contributing Signals Identified:**
1. **Cost Anomaly (+${s.costAnomaly.score} pts):** Sanctioned cost of ₹${matchedProject.sanctionedAmountLakhs.toFixed(1)} Lakhs is **${s.costAnomaly.outlierMultiplier}×** higher than the median (₹${s.costAnomaly.peerMedianLakhs.toFixed(1)}L) of comparable projects in ${matchedProject.state}.
2. **Duplicate & Geographic Overlap (+${s.duplicateRisk.score} pts):** ${s.duplicateRisk.explanation}
3. **Delay Probability (+${s.delayProbability.score} pts):** ${s.delayProbability.probabilityPct}% likelihood of project stall due to *${s.delayProbability.bottleneckFactor}*.
4. **Fund Front-Loading (+${s.utilizationAnomaly.score} pts):** ${matchedProject.financialProgressPct.toFixed(1)}% of total funds released against only ${matchedProject.physicalProgressPct.toFixed(1)}% physical completion (Gap: +${s.utilizationAnomaly.financialProgressGapPct}%).

**Regulatory Reference:**
Conforms to *MoSPI MPLADS Guidelines Section 3.4 (Schedule of Rates & Peer Ceiling)* and *Section 6.3 (Milestone-based Fund Release)*.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        {
          projectId: matchedProject.id,
          projectTitle: matchedProject.title,
          guidelineSection: 'MoSPI Guidelines 2023 Sec 3.4 & 4.2',
          evidenceConfidence: 0.96
        }
      ],
      actionPrompts: [
        {
          label: '🔎 Inspect Project Evidence',
          actionKey: 'VIEW_PROJECT',
          payload: { projectId: matchedProject.id }
        },
        {
          label: '📱 Order Geofenced Field Inspection',
          actionKey: 'DISPATCH_INSPECTION',
          payload: { projectId: matchedProject.id }
        },
        {
          label: '🕸️ Explore Relationship Graph',
          actionKey: 'VIEW_GRAPH',
          payload: { projectId: matchedProject.id }
        }
      ]
    };
  }

  // 2. Query: Top high risk projects / highest risk projects
  if (
    q.includes('high risk') ||
    q.includes('top 5') ||
    q.includes('highest') ||
    q.includes('critical') ||
    q.includes('review')
  ) {
    const sorted = [...projects].sort((a, b) => b.riskSignals.totalScore - a.riskSignals.totalScore);
    const top5 = sorted.slice(0, 5);

    const projectListMarkdown = top5
      .map(
        (p, idx) =>
          `${idx + 1}. **[${p.id}](project://${p.id})** — ${p.title.slice(0, 48)}...  \n   📍 *${p.district}, ${p.state}* | Risk: \`${p.riskSignals.totalScore}/100\` (${p.riskSignals.tier}) | Cost: ₹${p.sanctionedAmountLakhs}L`
      )
      .join('\n\n');

    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: `### 🚨 Top Flagged Projects Requiring Immediate Review

I have identified **${top5.length} priority projects** across the national database with severe anomaly indicators:

${projectListMarkdown}

**Recommended Immediate Protocol:**
- Dispatch field officers with the **NyayaLens Field Inspection App** to capture GPS-verified milestone photos.
- Issue provisional hold on remaining fund disbursements where financial gap > 40%.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: top5.map((p) => ({
        projectId: p.id,
        projectTitle: p.title,
        evidenceConfidence: 0.94
      })),
      actionPrompts: [
        {
          label: '🚨 Open Critical Project (MPL-28471)',
          actionKey: 'VIEW_PROJECT',
          payload: { projectId: 'MPL-28471' }
        },
        {
          label: '🗺️ View on National Risk Map',
          actionKey: 'VIEW_MAP',
          payload: {}
        }
      ]
    };
  }

  // 3. Query: Duplicate / Overlap search
  if (q.includes('duplicate') || q.includes('overlap') || q.includes('geo')) {
    const duplicates = projects.filter((p) => p.riskSignals.duplicateRisk.score >= 10);
    return {
      id: `msg-${Date.now()}`,
      sender: 'ai',
      text: `### 🔗 Potential Duplicate & Overlapping Works Detected

NyayaLens identified **${duplicates.length} projects** exhibiting spatial-semantic overlap:

1. **MPL-28471 ↔ MPL-28469 (Amberpet, Hyderabad)**:
   - **Distance:** \`42 meters\` apart
   - **NLP Similarity:** \`89.4%\`
   - **Risk:** Same community hall amenity sanctioned twice under different titles within 28 days.

2. **MPL-51204 ↔ Samagra Shiksha IT Grant (Varanasi)**:
   - **Distance:** \`620 meters\`
   - **Risk:** Multi-scheme dual-funding for school computer labs.

*Per MoSPI Section 4.2, Implementing Agencies are liable for recovery if duplicate funding is verified.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      citations: [
        {
          projectId: 'MPL-28471',
          projectTitle: 'Multi-Purpose Community Hall',
          guidelineSection: 'MoSPI Guidelines 2023 Sec 4.2 (Non-Duplication Undertaking)'
        }
      ],
      actionPrompts: [
        {
          label: '🕸️ Open Network Graph to inspect overlap',
          actionKey: 'VIEW_GRAPH',
          payload: { projectId: 'MPL-28471' }
        }
      ]
    };
  }

  // 4. Query: MoSPI Policy / Guidelines / Rules
  const matchedDoc = MOSPI_GUIDELINES.find((doc) =>
    doc.keywords.some((kw) => q.includes(kw)) || q.includes('rule') || q.includes('guideline')
  ) || MOSPI_GUIDELINES[0];

  return {
    id: `msg-${Date.now()}`,
    sender: 'ai',
    text: `### 📜 MoSPI MPLADS Regulatory Guidance: **${matchedDoc.title}**
*Reference: ${matchedDoc.sectionId} (${matchedDoc.category})*

${matchedDoc.fullText}

**Key Auditor Takeaways:**
- **Sanction Threshold:** Any deviation over 25% requires independent technical justification before funds are sanctioned.
- **Physical Verification:** Geo-tagged photos are mandatory at 0%, 50%, and 100% completion.
- **Automated Vigilance Trigger:** Discrepancies >40% between financial expenditure and physical progress must be referred for audit.`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    citations: [
      {
        guidelineSection: `${matchedDoc.sectionId}: ${matchedDoc.title}`,
        guidelineExcerpt: matchedDoc.summary
      }
    ],
    actionPrompts: [
      {
        label: '⚖️ View Evaluation Lab Benchmarks',
        actionKey: 'VIEW_EVALUATION',
        payload: {}
      }
    ]
  };
}
