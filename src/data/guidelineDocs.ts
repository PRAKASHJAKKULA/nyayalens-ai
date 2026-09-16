export interface GuidelineDoc {
  sectionId: string;
  title: string;
  category: string;
  summary: string;
  fullText: string;
  keywords: string[];
}

export const MOSPI_GUIDELINES: GuidelineDoc[] = [
  {
    sectionId: 'MPLADS-2023-SEC-2.1',
    title: 'Permissible Works & Community Assets',
    category: 'Eligibility',
    summary: 'Works sanctioned under MPLADS must create durable community assets based on local developmental needs.',
    fullText: 'Section 2.1 (MoSPI MPLADS Revised Guidelines 2023): All works recommended under MPLADS must lead to the creation of durable public assets of permanent nature for community benefit. Permissible sectors include Drinking Water, Primary Education, Public Health, Sanitation, Rural Roads, Community Halls, and Renewable Energy. Creation of assets for private or individual ownership is strictly prohibited.',
    keywords: ['permissible', 'eligible', 'community asset', 'durable', 'sanction', 'rules', 'allowed works']
  },
  {
    sectionId: 'MPLADS-2023-SEC-3.4',
    title: 'Cost Estimation, Technical Sanction & Peer Ceiling',
    category: 'Cost & Finance',
    summary: 'District Authority must ensure technical sanction estimates are grounded in standard Schedule of Rates (SoR).',
    fullText: 'Section 3.4 (Technical Sanction & Cost Verification): The District Authority shall verify that the detailed project report (DPR) and cost estimates conform to the prevailing state Schedule of Rates (SoR). Cost anomalies exceeding 25% over district averages for comparable asset types must be subjected to independent engineering scrutiny before financial sanction.',
    keywords: ['cost', 'estimate', 'schedule of rates', 'sor', 'cost anomaly', 'ceiling', 'financial sanction', 'peer', 'budget']
  },
  {
    sectionId: 'MPLADS-2023-SEC-4.2',
    title: 'Duplicate Works & Non-Duplication Undertaking',
    category: 'Compliance & Anti-Fraud',
    summary: 'Implementing Agency must certify that no other scheme funds are utilized for the same work/location.',
    fullText: 'Section 4.2 (Prevention of Duplicate / Overlapping Works): Prior to the release of first installment, the Implementing Agency must submit a Non-Duplication Certificate (NDC) confirming that the proposed work is not being funded through State Government, Centrally Sponsored Schemes (CSS), or local body revenues at the same geo-coordinates.',
    keywords: ['duplicate', 'overlap', 'double funding', 'non duplication certificate', 'geo proximity', 'same location']
  },
  {
    sectionId: 'MPLADS-2023-SEC-5.1',
    title: 'Mandatory Geo-Tagging & Physical Inspection Thresholds',
    category: 'Field Monitoring',
    summary: '100% of sanctioned works require before, during, and after geo-tagged photographs with verifiable coordinates.',
    fullText: 'Section 5.1 (Geo-Tagging & Photographic Evidence): Implementing agencies and field inspectors must upload high-resolution, geo-tagged, time-stamped photographs at three mandatory stages: (a) Pre-commencement, (b) Mid-stage (50% progress), and (c) Final completion. The recorded GPS coordinates must match project sanction coordinates within a tolerance radius of 50 meters.',
    keywords: ['geo tagging', 'inspection', 'gps', 'photos', 'field verification', 'tolerance', 'coordinates']
  },
  {
    sectionId: 'MPLADS-2023-SEC-6.3',
    title: 'Fund Disbursement Milestones & Stalled Works Trigger',
    category: 'Fund Release',
    summary: 'Funds are released in tranches linked to verified physical milestones. Zero progress beyond 6 months triggers audit.',
    fullText: 'Section 6.3 (Milestone-based Fund Release): First installment (up to 50%) is released upon administrative and technical sanction. Second installment is disbursed only after submission of Utilization Certificate (UC) and physical progress exceeding 60%. Projects with financial utilization >70% but physical progress <40% shall be flagged automatically for vigilance review.',
    keywords: ['disbursement', 'utilization', 'installment', 'stalled', 'delay', 'audit trigger', 'uc', 'financial progress']
  }
];
