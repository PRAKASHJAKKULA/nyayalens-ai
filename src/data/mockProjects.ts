import { Project } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'MPL-28471',
    title: 'Construction of Multi-Purpose Community Hall & Skill Center',
    mpName: 'G. Kishan Reddy',
    constituency: 'Secunderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    block: 'Amberpet Circle 14',
    sector: 'Community Infrastructure',
    assetCategory: 'Community Hall / Multi-Purpose Center',
    sanctionedAmountLakhs: 29.0,
    spentAmountLakhs: 24.5,
    financialProgressPct: 84.5,
    physicalProgressPct: 38.0,
    sanctionDate: '2024-02-15',
    targetCompletionDate: '2024-11-30',
    status: 'Delayed',
    lat: 17.3872,
    lng: 78.5024,
    implementingAgencyId: 'AGY-GHMC-ENG',
    implementingAgencyName: 'Greater Hyderabad Municipal Corporation (Engineering Div-IV)',
    contractorId: 'CTR-SRI-INFRA-HYD',
    contractorName: 'Sri Sai Ram Infratech Pvt Ltd',
    peerGroupId: 'PEER-COMM-URB-T2',
    riskSignals: {
      costAnomaly: {
        score: 24,
        actualCostLakhs: 29.0,
        peerMedianLakhs: 10.5,
        peerIqrMin: 8.0,
        peerIqrMax: 12.5,
        zScore: 3.42,
        outlierMultiplier: 2.76,
        explanation: 'Sanctioned cost ₹29.0L is 2.76× the median (₹10.5L) of 142 comparable urban community hall projects in Telangana.'
      },
      duplicateRisk: {
        score: 22,
        matchedProjectId: 'MPL-28469',
        matchedProjectTitle: 'Construction of Community Hall & Ward Library',
        textSimilarityPct: 89.4,
        geoDistanceMeters: 42,
        timeProximityDays: 28,
        explanation: 'Highly similar project MPL-28469 sanctioned just 42m away within 28 days under same municipal ward.'
      },
      delayProbability: {
        score: 18,
        probabilityPct: 78.0,
        projectedDelayMonths: 8.5,
        bottleneckFactor: 'Contractor Workload Overload (18 active projects) & 9 months elapsed with only 38% physical progress.',
        explanation: 'Predictive XGBoost model estimates 78% probability of failure to deliver within scheduled timeframe.'
      },
      utilizationAnomaly: {
        score: 13,
        disbursementRatio: 0.845,
        physicalCompletionRatio: 0.38,
        financialProgressGapPct: 46.5,
        explanation: 'Severe financial-physical gap: 84.5% funds disbursed (₹24.5L) while physical progress is only 38%.'
      },
      progressAnomaly: {
        score: 10,
        expectedProgressPct: 85.0,
        actualProgressPct: 38.0,
        deviationPct: -47.0,
        explanation: 'Physical execution is 47% behind schedule compared to standard 9-month milestone targets.'
      },
      totalScore: 87,
      tier: 'CRITICAL'
    },
    evidenceSummary: [
      'Cost is 2.76× median of peer group PEER-COMM-URB-T2 (IQR: ₹8L–₹12.5L)',
      'Potential duplicate overlap with MPL-28469 (42 meters distance, 89.4% NLP similarity)',
      'Fund utilization gap of 46.5% (₹24.5 Lakhs drawn with foundation/framing incomplete)',
      'Implementing agency AGY-GHMC-ENG has 14 other flagged delay cases'
    ],
    inspectionStatus: 'FLAGGED',
    lastInspectedAt: '2024-08-10',
    reviewStatus: 'UNREVIEWED',
    photos: [
      {
        id: 'PHT-28471-01',
        url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f4?w=800&auto=format&fit=crop&q=60',
        caption: 'Amberpet Site: Incomplete pillar framing with stalled brickwork',
        timestamp: '2024-08-10T11:24:00Z',
        geoLat: 17.3872,
        geoLng: 78.5024,
        sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        tamperVerified: true
      },
      {
        id: 'PHT-28471-02',
        url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=60',
        caption: 'Amberpet Site: Foundation dug with water accumulation and abandoned gravel',
        timestamp: '2024-08-10T11:32:00Z',
        geoLat: 17.3873,
        geoLng: 78.5025,
        sha256Hash: 'a89f38b1d926312a03e67e3a985fcfb927b2a59a7f5df554a93a5b399a9b2c34',
        tamperVerified: true
      }
    ]
  },
  {
    id: 'MPL-28469',
    title: 'Construction of Community Hall & Ward Library',
    mpName: 'G. Kishan Reddy',
    constituency: 'Secunderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    block: 'Amberpet Circle 14',
    sector: 'Community Infrastructure',
    assetCategory: 'Community Hall / Multi-Purpose Center',
    sanctionedAmountLakhs: 18.5,
    spentAmountLakhs: 12.0,
    financialProgressPct: 64.8,
    physicalProgressPct: 45.0,
    sanctionDate: '2024-01-18',
    targetCompletionDate: '2024-10-15',
    status: 'In Progress',
    lat: 17.3875,
    lng: 78.5027,
    implementingAgencyId: 'AGY-GHMC-ENG',
    implementingAgencyName: 'Greater Hyderabad Municipal Corporation (Engineering Div-IV)',
    contractorId: 'CTR-DECCAN-ENGG',
    contractorName: 'Deccan Civil & Electrical Associates',
    peerGroupId: 'PEER-COMM-URB-T2',
    riskSignals: {
      costAnomaly: {
        score: 14,
        actualCostLakhs: 18.5,
        peerMedianLakhs: 10.5,
        peerIqrMin: 8.0,
        peerIqrMax: 12.5,
        zScore: 1.84,
        outlierMultiplier: 1.76,
        explanation: 'Cost ₹18.5L is moderately above peer group range.'
      },
      duplicateRisk: {
        score: 24,
        matchedProjectId: 'MPL-28471',
        matchedProjectTitle: 'Construction of Multi-Purpose Community Hall & Skill Center',
        textSimilarityPct: 89.4,
        geoDistanceMeters: 42,
        timeProximityDays: 28,
        explanation: 'Matched with MPL-28471 at same geographic coordinates (42m).'
      },
      delayProbability: {
        score: 12,
        probabilityPct: 54.0,
        projectedDelayMonths: 3.2,
        bottleneckFactor: 'Material procurement lag',
        explanation: 'Moderate delay probability.'
      },
      utilizationAnomaly: {
        score: 8,
        disbursementRatio: 0.648,
        physicalCompletionRatio: 0.45,
        financialProgressGapPct: 19.8,
        explanation: 'Financial progress slightly ahead of physical work.'
      },
      progressAnomaly: {
        score: 7,
        expectedProgressPct: 75.0,
        actualProgressPct: 45.0,
        deviationPct: -30.0,
        explanation: '30% behind expected progress.'
      },
      totalScore: 65,
      tier: 'MODERATE'
    },
    evidenceSummary: [
      'Duplicate candidate matching MPL-28471 at Amberpet',
      'Overlapping scope: Community Hall in adjacent survey plot'
    ],
    inspectionStatus: 'PENDING',
    reviewStatus: 'UNREVIEWED',
    photos: []
  },
  {
    id: 'MPL-19042',
    title: 'Construction of Interlocking CC Road & Heavy Drain',
    mpName: 'Rajnath Singh',
    constituency: 'Lucknow',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    block: 'Sarojini Nagar Block',
    sector: 'Roads & Bridges',
    assetCategory: 'Cement Concrete Road & Drain',
    sanctionedAmountLakhs: 34.5,
    spentAmountLakhs: 31.0,
    financialProgressPct: 89.8,
    physicalProgressPct: 22.0,
    sanctionDate: '2023-11-10',
    targetCompletionDate: '2024-05-30',
    status: 'Delayed',
    lat: 26.7588,
    lng: 80.8922,
    implementingAgencyId: 'AGY-UP-RES-LKO',
    implementingAgencyName: 'UP Rural Engineering Services (Lucknow Division)',
    contractorId: 'CTR-AVADH-BUILDERS',
    contractorName: 'Avadh Greenfield Infrastructure Ltd',
    peerGroupId: 'PEER-ROAD-CC-METRO',
    riskSignals: {
      costAnomaly: {
        score: 22,
        actualCostLakhs: 34.5,
        peerMedianLakhs: 14.5,
        peerIqrMin: 11.2,
        peerIqrMax: 17.0,
        zScore: 3.12,
        outlierMultiplier: 2.38,
        explanation: 'Road segment cost ₹34.5L is 2.38× higher than similar 500m CC road standards (₹14.5L).'
      },
      duplicateRisk: {
        score: 6,
        textSimilarityPct: 32.0,
        geoDistanceMeters: 1420,
        timeProximityDays: 140,
        explanation: 'No immediate duplicate candidate detected.'
      },
      delayProbability: {
        score: 21,
        probabilityPct: 88.0,
        projectedDelayMonths: 9.0,
        bottleneckFactor: 'Contractor blacklisting inquiry & unapproved design modifications.',
        explanation: 'Target completion date passed 3 months ago with only 22% finished.'
      },
      utilizationAnomaly: {
        score: 18,
        disbursementRatio: 0.898,
        physicalCompletionRatio: 0.22,
        financialProgressGapPct: 67.8,
        explanation: 'Extreme utilization discrepancy: 89.8% fund drawn but only 22% physical progress.'
      },
      progressAnomaly: {
        score: 12,
        expectedProgressPct: 100.0,
        actualProgressPct: 22.0,
        deviationPct: -78.0,
        explanation: '78% behind milestone schedule.'
      },
      totalScore: 79,
      tier: 'CRITICAL'
    },
    evidenceSummary: [
      'Disproportionate cost: ₹34.5L vs ₹14.5L peer median',
      'Massive fund release gap (67.8% overdraw relative to physical progress)',
      'Overdue completion date with 22% actual pavement laid'
    ],
    inspectionStatus: 'SCHEDULED',
    reviewStatus: 'ESCALATED',
    reviewNotes: 'Referred to State Vigilance Officer for technical rate auditing.',
    reviewedBy: 'MoSPI Senior Auditor (Zone-North)',
    reviewedAt: '2024-08-20',
    photos: []
  },
  {
    id: 'MPL-33109',
    title: 'Installation of Solar Powered Community Drinking Water Filtration Unit',
    mpName: 'Murlidhar Mohol',
    constituency: 'Pune',
    state: 'Maharashtra',
    district: 'Pune',
    block: 'Haveli Tehsil',
    sector: 'Drinking Water',
    assetCategory: 'Solar Water Filtration & Borewell Unit',
    sanctionedAmountLakhs: 4.9,
    spentAmountLakhs: 4.8,
    financialProgressPct: 98.0,
    physicalProgressPct: 100.0,
    sanctionDate: '2024-01-10',
    targetCompletionDate: '2024-05-15',
    actualCompletionDate: '2024-05-10',
    status: 'Completed',
    lat: 18.5204,
    lng: 73.8567,
    implementingAgencyId: 'AGY-MAH-PWD-PUN',
    implementingAgencyName: 'Maharashtra Public Works Department (Pune Central Div)',
    contractorId: 'CTR-MARATHA-CONST',
    contractorName: 'Maratha Buildcon Engineering Works',
    peerGroupId: 'PEER-WATER-SOLAR-URB',
    riskSignals: {
      costAnomaly: {
        score: 3,
        actualCostLakhs: 4.9,
        peerMedianLakhs: 4.8,
        peerIqrMin: 3.8,
        peerIqrMax: 5.9,
        zScore: 0.12,
        outlierMultiplier: 1.02,
        explanation: 'Cost exactly aligns with Maharashtra urban drinking water peer median (₹4.8L).'
      },
      duplicateRisk: {
        score: 2,
        textSimilarityPct: 15.0,
        geoDistanceMeters: 4500,
        timeProximityDays: 320,
        explanation: 'Distinct installation with verified unique GPS coordinates.'
      },
      delayProbability: {
        score: 1,
        probabilityPct: 5.0,
        projectedDelayMonths: 0,
        bottleneckFactor: 'None',
        explanation: 'Delivered 5 days ahead of schedule.'
      },
      utilizationAnomaly: {
        score: 1,
        disbursementRatio: 0.98,
        physicalCompletionRatio: 1.0,
        financialProgressGapPct: 0.0,
        explanation: 'Disbursements perfectly match completed work tranches.'
      },
      progressAnomaly: {
        score: 1,
        expectedProgressPct: 100.0,
        actualProgressPct: 100.0,
        deviationPct: 0.0,
        explanation: 'Asset fully commissioned and operational.'
      },
      totalScore: 8,
      tier: 'LOW'
    },
    evidenceSummary: [
      'Exemplary project conforming to all peer cost benchmarks',
      'Geo-tagged completion photos verified by Pune Municipal Inspector',
      'Water quality laboratory certification attached'
    ],
    inspectionStatus: 'VERIFIED',
    lastInspectedAt: '2024-05-18',
    reviewStatus: 'ACCEPTED',
    photos: []
  },
  {
    id: 'MPL-44218',
    title: 'Upgradation & Equipment Sanction for PHC Diagnostic Maternity Wing',
    mpName: 'Dayanidhi Maran',
    constituency: 'Chennai Central',
    state: 'Tamil Nadu',
    district: 'Chennai',
    block: 'Teynampet Zone IX',
    sector: 'Healthcare & Sanitation',
    assetCategory: 'PHC Diagnostic & Maternity Annex',
    sanctionedAmountLakhs: 17.5,
    spentAmountLakhs: 14.2,
    financialProgressPct: 81.1,
    physicalProgressPct: 85.0,
    sanctionDate: '2023-12-05',
    targetCompletionDate: '2024-10-30',
    status: 'In Progress',
    lat: 13.0418,
    lng: 80.2505,
    implementingAgencyId: 'AGY-TN-DRDA-CHE',
    implementingAgencyName: 'District Rural Development Agency (Chennai Suburban)',
    contractorId: 'CTR-MARATHA-CONST',
    contractorName: 'Maratha Buildcon Engineering Works',
    peerGroupId: 'PEER-HLTH-PHC-T2',
    riskSignals: {
      costAnomaly: {
        score: 5,
        actualCostLakhs: 17.5,
        peerMedianLakhs: 18.0,
        peerIqrMin: 14.0,
        peerIqrMax: 21.5,
        zScore: -0.15,
        outlierMultiplier: 0.97,
        explanation: 'Sanction is within safe interquartile range (₹14L–₹21.5L).'
      },
      duplicateRisk: {
        score: 4,
        textSimilarityPct: 22.0,
        geoDistanceMeters: 3800,
        timeProximityDays: 210,
        explanation: 'No duplication detected.'
      },
      delayProbability: {
        score: 6,
        probabilityPct: 22.0,
        projectedDelayMonths: 0.5,
        bottleneckFactor: 'Minor equipment import clearance',
        explanation: 'On-track for timely commissioning.'
      },
      utilizationAnomaly: {
        score: 4,
        disbursementRatio: 0.811,
        physicalCompletionRatio: 0.85,
        financialProgressGapPct: -3.9,
        explanation: 'Healthy financial-to-physical ratio.'
      },
      progressAnomaly: {
        score: 3,
        expectedProgressPct: 80.0,
        actualProgressPct: 85.0,
        deviationPct: +5.0,
        explanation: 'Ahead of expected milestone curve.'
      },
      totalScore: 22,
      tier: 'LOW'
    },
    evidenceSummary: [
      'Complies with MoSPI Healthcare infrastructure guidelines',
      'Diagnostic equipment invoices verified and matched against sanctioned BoQ'
    ],
    inspectionStatus: 'VERIFIED',
    reviewStatus: 'ACCEPTED',
    photos: []
  },
  {
    id: 'MPL-51204',
    title: 'Digital Smart Classroom & STEM Science Lab Setup in 3 Govt Schools',
    mpName: 'Narendra Modi',
    constituency: 'Varanasi',
    state: 'Uttar Pradesh',
    district: 'Varanasi',
    block: 'Kashi Vidyapeeth',
    sector: 'Education & Skill',
    assetCategory: 'School Laboratory / Digital Classroom',
    sanctionedAmountLakhs: 22.5,
    spentAmountLakhs: 18.8,
    financialProgressPct: 83.5,
    physicalProgressPct: 35.0,
    sanctionDate: '2024-01-05',
    targetCompletionDate: '2024-06-30',
    status: 'Delayed',
    lat: 25.3176,
    lng: 82.9739,
    implementingAgencyId: 'AGY-UP-RES-LKO',
    implementingAgencyName: 'UP Rural Engineering Services (Lucknow Division)',
    contractorId: 'CTR-AVADH-BUILDERS',
    contractorName: 'Avadh Greenfield Infrastructure Ltd',
    peerGroupId: 'PEER-EDU-SMART-RUR',
    riskSignals: {
      costAnomaly: {
        score: 21,
        actualCostLakhs: 22.5,
        peerMedianLakhs: 6.0,
        peerIqrMin: 4.5,
        peerIqrMax: 7.5,
        zScore: 3.25,
        outlierMultiplier: 3.75,
        explanation: 'Sanction ₹22.5L is 3.75× the state baseline median (₹6.0L) for 3-school cluster digital kits.'
      },
      duplicateRisk: {
        score: 11,
        textSimilarityPct: 45.0,
        geoDistanceMeters: 620,
        timeProximityDays: 60,
        explanation: 'Partial overlap with state Samagra Shiksha IT lab scheme under investigation.'
      },
      delayProbability: {
        score: 20,
        probabilityPct: 82.0,
        projectedDelayMonths: 5.5,
        bottleneckFactor: 'Vendor default on smart-board delivery',
        explanation: 'Target completion expired 2 months ago with zero hardware delivered to 2 schools.'
      },
      utilizationAnomaly: {
        score: 16,
        disbursementRatio: 0.835,
        physicalCompletionRatio: 0.35,
        financialProgressGapPct: 48.5,
        explanation: 'Advance of ₹18.8L paid without mandatory installation proof.'
      },
      progressAnomaly: {
        score: 8,
        expectedProgressPct: 100.0,
        actualProgressPct: 35.0,
        deviationPct: -65.0,
        explanation: '65% behind completion milestone.'
      },
      totalScore: 76,
      tier: 'CRITICAL'
    },
    evidenceSummary: [
      'High cost multiplier (3.75× peer median)',
      'Potential double-procurement with Samagra Shiksha state grant',
      'Unjustified advance disbursement of ₹18.8L'
    ],
    inspectionStatus: 'FLAGGED',
    reviewStatus: 'UNREVIEWED',
    photos: []
  },
  {
    id: 'MPL-60312',
    title: 'Installation of High Mast Solar Street Lighting System at 12 Crossings',
    mpName: 'Amit Shah',
    constituency: 'Gandhinagar',
    state: 'Gujarat',
    district: 'Ahmedabad',
    block: 'Sanand Taluka',
    sector: 'Renewable Energy',
    assetCategory: 'High Mast Solar Light System',
    sanctionedAmountLakhs: 6.8,
    spentAmountLakhs: 5.2,
    financialProgressPct: 76.5,
    physicalProgressPct: 70.0,
    sanctionDate: '2024-03-01',
    targetCompletionDate: '2024-09-15',
    status: 'In Progress',
    lat: 23.0225,
    lng: 72.5714,
    implementingAgencyId: 'AGY-GHMC-ENG',
    implementingAgencyName: 'Greater Hyderabad Municipal Corporation (Engineering Div-IV)',
    contractorId: 'CTR-DECCAN-ENGG',
    contractorName: 'Deccan Civil & Electrical Associates',
    peerGroupId: 'PEER-SOLAR-HIGH-T3',
    riskSignals: {
      costAnomaly: {
        score: 8,
        actualCostLakhs: 6.8,
        peerMedianLakhs: 5.2,
        peerIqrMin: 4.1,
        peerIqrMax: 6.3,
        zScore: 1.15,
        outlierMultiplier: 1.31,
        explanation: 'Slightly higher than peer median due to inclusion of battery storage warranty.'
      },
      duplicateRisk: {
        score: 5,
        textSimilarityPct: 20.0,
        geoDistanceMeters: 2100,
        timeProximityDays: 180,
        explanation: 'No duplicate detected.'
      },
      delayProbability: {
        score: 7,
        probabilityPct: 28.0,
        projectedDelayMonths: 0.8,
        bottleneckFactor: 'Grid synchronization delay',
        explanation: 'Moderate delivery pace.'
      },
      utilizationAnomaly: {
        score: 6,
        disbursementRatio: 0.765,
        physicalCompletionRatio: 0.70,
        financialProgressGapPct: 6.5,
        explanation: 'Expenditure matches procurement milestone.'
      },
      progressAnomaly: {
        score: 4,
        expectedProgressPct: 80.0,
        actualProgressPct: 70.0,
        deviationPct: -10.0,
        explanation: 'Minor 10% lag.'
      },
      totalScore: 30,
      tier: 'LOW'
    },
    evidenceSummary: [
      'Reasonable cost variance with battery enhancement specs',
      'All 12 solar mast pole foundations cast and inspected'
    ],
    inspectionStatus: 'VERIFIED',
    reviewStatus: 'ACCEPTED',
    photos: []
  },
  {
    id: 'MPL-71903',
    title: 'Construction of Public Open Air Gym & Jogging Track at DDA Park',
    mpName: 'Bansuri Swaraj',
    constituency: 'New Delhi',
    state: 'Delhi',
    district: 'South Delhi',
    block: 'Hauz Khas',
    sector: 'Sports & Culture',
    assetCategory: 'Public Open Gym & Playground',
    sanctionedAmountLakhs: 8.8,
    spentAmountLakhs: 8.5,
    financialProgressPct: 96.6,
    physicalProgressPct: 95.0,
    sanctionDate: '2024-02-01',
    targetCompletionDate: '2024-07-31',
    status: 'In Progress',
    lat: 28.5494,
    lng: 77.2001,
    implementingAgencyId: 'AGY-KAR-KRIDL-BLR',
    implementingAgencyName: 'Karnataka Rural Infrastructure Development Ltd (KRIDL Bangalore)',
    contractorId: 'CTR-PRIME-TECH-BLR',
    contractorName: 'Prime Urban Infraworks Bangalore',
    peerGroupId: 'PEER-SPORT-OPEN-URB',
    riskSignals: {
      costAnomaly: {
        score: 3,
        actualCostLakhs: 8.8,
        peerMedianLakhs: 8.5,
        peerIqrMin: 6.8,
        peerIqrMax: 10.2,
        zScore: 0.22,
        outlierMultiplier: 1.04,
        explanation: 'Cost is well within metro Delhi open gym peer distribution.'
      },
      duplicateRisk: {
        score: 3,
        textSimilarityPct: 18.0,
        geoDistanceMeters: 3100,
        timeProximityDays: 200,
        explanation: 'Distinct public amenity park.'
      },
      delayProbability: {
        score: 4,
        probabilityPct: 15.0,
        projectedDelayMonths: 0.2,
        bottleneckFactor: 'None',
        explanation: 'Near completion.'
      },
      utilizationAnomaly: {
        score: 2,
        disbursementRatio: 0.966,
        physicalCompletionRatio: 0.95,
        financialProgressGapPct: 1.6,
        explanation: 'Funds spent matched against delivered fitness equipment.'
      },
      progressAnomaly: {
        score: 2,
        expectedProgressPct: 100.0,
        actualProgressPct: 95.0,
        deviationPct: -5.0,
        explanation: 'Final inspection scheduled for handover.'
      },
      totalScore: 14,
      tier: 'LOW'
    },
    evidenceSummary: [
      'High public utility compliance',
      'All 14 outdoor gym equipment fixtures installed and tested'
    ],
    inspectionStatus: 'VERIFIED',
    reviewStatus: 'ACCEPTED',
    photos: []
  },
  {
    id: 'MPL-88341',
    title: 'Construction of Anganwadi Centre & Mother-Child Care Room',
    mpName: 'Tejasvi Surya',
    constituency: 'Bangalore South',
    state: 'Karnataka',
    district: 'Bangalore Urban',
    block: 'Jayanagar Zone',
    sector: 'Education & Skill',
    assetCategory: 'School Laboratory / Digital Classroom',
    sanctionedAmountLakhs: 16.8,
    spentAmountLakhs: 13.5,
    financialProgressPct: 80.3,
    physicalProgressPct: 52.0,
    sanctionDate: '2024-02-20',
    targetCompletionDate: '2024-10-31',
    status: 'In Progress',
    lat: 12.9250,
    lng: 77.5938,
    implementingAgencyId: 'AGY-KAR-KRIDL-BLR',
    implementingAgencyName: 'Karnataka Rural Infrastructure Development Ltd (KRIDL Bangalore)',
    contractorId: 'CTR-PRIME-TECH-BLR',
    contractorName: 'Prime Urban Infraworks Bangalore',
    peerGroupId: 'PEER-EDU-SMART-RUR',
    riskSignals: {
      costAnomaly: {
        score: 16,
        actualCostLakhs: 16.8,
        peerMedianLakhs: 6.0,
        peerIqrMin: 4.5,
        peerIqrMax: 7.5,
        zScore: 2.45,
        outlierMultiplier: 2.8,
        explanation: 'Cost is 2.8× higher than standard Anganwadi rooms due to premium urban rate application.'
      },
      duplicateRisk: {
        score: 8,
        textSimilarityPct: 35.0,
        geoDistanceMeters: 840,
        timeProximityDays: 95,
        explanation: 'Moderate proximity to existing municipal health outpost.'
      },
      delayProbability: {
        score: 14,
        probabilityPct: 62.0,
        projectedDelayMonths: 4.0,
        bottleneckFactor: 'Interior furnishing delays',
        explanation: 'Moderate risk of missing October target.'
      },
      utilizationAnomaly: {
        score: 11,
        disbursementRatio: 0.803,
        physicalCompletionRatio: 0.52,
        financialProgressGapPct: 28.3,
        explanation: '28.3% gap between payments released and physical work completed.'
      },
      progressAnomaly: {
        score: 7,
        expectedProgressPct: 75.0,
        actualProgressPct: 52.0,
        deviationPct: -23.0,
        explanation: '23% behind milestone.'
      },
      totalScore: 56,
      tier: 'MODERATE'
    },
    evidenceSummary: [
      'Urban cost deviation (+180% above rural Anganwadi baseline)',
      'Fund advance exceeds physical plastering stage'
    ],
    inspectionStatus: 'PENDING',
    reviewStatus: 'UNREVIEWED',
    photos: []
  },
  {
    id: 'MPL-90215',
    title: 'Installation of Reverse Osmosis (RO) Purification Plant at Gram Panchayat',
    mpName: 'M. K. Raghavan',
    constituency: 'Kozhikode',
    state: 'Kerala',
    district: 'Kozhikode',
    block: 'Kunnamangalam',
    sector: 'Drinking Water',
    assetCategory: 'Solar Water Filtration & Borewell Unit',
    sanctionedAmountLakhs: 5.5,
    spentAmountLakhs: 5.4,
    financialProgressPct: 98.1,
    physicalProgressPct: 100.0,
    sanctionDate: '2023-10-12',
    targetCompletionDate: '2024-03-31',
    actualCompletionDate: '2024-03-20',
    status: 'Completed',
    lat: 11.2588,
    lng: 75.7804,
    implementingAgencyId: 'AGY-TN-DRDA-CHE',
    implementingAgencyName: 'District Rural Development Agency (Chennai Suburban)',
    contractorId: 'CTR-MARATHA-CONST',
    contractorName: 'Maratha Buildcon Engineering Works',
    peerGroupId: 'PEER-WATER-SOLAR-URB',
    riskSignals: {
      costAnomaly: {
        score: 2,
        actualCostLakhs: 5.5,
        peerMedianLakhs: 4.8,
        peerIqrMin: 3.8,
        peerIqrMax: 5.9,
        zScore: 0.35,
        outlierMultiplier: 1.14,
        explanation: 'Cost perfectly within safe interquartile range.'
      },
      duplicateRisk: {
        score: 1,
        textSimilarityPct: 12.0,
        geoDistanceMeters: 5200,
        timeProximityDays: 400,
        explanation: 'Unique installation.'
      },
      delayProbability: {
        score: 1,
        probabilityPct: 4.0,
        projectedDelayMonths: 0,
        bottleneckFactor: 'None',
        explanation: 'Successfully commissioned on time.'
      },
      utilizationAnomaly: {
        score: 1,
        disbursementRatio: 0.981,
        physicalCompletionRatio: 1.0,
        financialProgressGapPct: 0.0,
        explanation: 'Financial utilization matches physical output.'
      },
      progressAnomaly: {
        score: 1,
        expectedProgressPct: 100.0,
        actualProgressPct: 100.0,
        deviationPct: 0.0,
        explanation: 'Full completion.'
      },
      totalScore: 6,
      tier: 'LOW'
    },
    evidenceSummary: [
      '100% compliant with drinking water quality and cost metrics',
      'Water meter logs show 2,000L/day supply to 450 households'
    ],
    inspectionStatus: 'VERIFIED',
    reviewStatus: 'ACCEPTED',
    photos: []
  }
];
