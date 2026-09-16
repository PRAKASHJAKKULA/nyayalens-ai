import { ImplementingAgency, Contractor } from '../types';

export const AGENCIES: ImplementingAgency[] = [
  {
    id: 'AGY-GHMC-ENG',
    name: 'Greater Hyderabad Municipal Corporation (Engineering Div-IV)',
    registrationNumber: 'TEL-GHMC-ENG-2018-092',
    type: 'Municipal Corp',
    state: 'Telangana',
    district: 'Hyderabad',
    activeProjects: 48,
    flaggedProjects: 14,
    averageDelayDays: 142,
    riskRating: 78,
    isBlacklisted: false
  },
  {
    id: 'AGY-TS-PR-MED',
    name: 'Telangana Panchayati Raj Engineering Dept (Medchal Circle)',
    registrationNumber: 'TEL-PR-MED-2019-104',
    type: 'Panchayati Raj',
    state: 'Telangana',
    district: 'Medchal-Malkajgiri',
    activeProjects: 32,
    flaggedProjects: 8,
    averageDelayDays: 95,
    riskRating: 64,
    isBlacklisted: false
  },
  {
    id: 'AGY-MAH-PWD-PUN',
    name: 'Maharashtra Public Works Department (Pune Central Div)',
    registrationNumber: 'MAH-PWD-PUN-2017-045',
    type: 'PWD',
    state: 'Maharashtra',
    district: 'Pune',
    activeProjects: 55,
    flaggedProjects: 4,
    averageDelayDays: 28,
    riskRating: 22,
    isBlacklisted: false
  },
  {
    id: 'AGY-UP-RES-LKO',
    name: 'UP Rural Engineering Services (Lucknow Division)',
    registrationNumber: 'UP-RES-LKO-2020-312',
    type: 'State Rural Dev',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    activeProjects: 62,
    flaggedProjects: 19,
    averageDelayDays: 180,
    riskRating: 82,
    isBlacklisted: false
  },
  {
    id: 'AGY-KAR-KRIDL-BLR',
    name: 'Karnataka Rural Infrastructure Development Ltd (KRIDL Bangalore)',
    registrationNumber: 'KAR-KRIDL-2016-881',
    type: 'State Rural Dev',
    state: 'Karnataka',
    district: 'Bangalore Urban',
    activeProjects: 41,
    flaggedProjects: 5,
    averageDelayDays: 45,
    riskRating: 30,
    isBlacklisted: false
  },
  {
    id: 'AGY-TN-DRDA-CHE',
    name: 'District Rural Development Agency (Chennai Suburban)',
    registrationNumber: 'TN-DRDA-CHE-2019-743',
    type: 'Zilla Parishad',
    state: 'Tamil Nadu',
    district: 'Chennai',
    activeProjects: 29,
    flaggedProjects: 2,
    averageDelayDays: 15,
    riskRating: 18,
    isBlacklisted: false
  }
];

export const CONTRACTORS: Contractor[] = [
  {
    id: 'CTR-SRI-INFRA-HYD',
    name: 'Sri Sai Ram Infratech Pvt Ltd',
    gstin: '36AABCU9603R1ZM',
    activeContractsCount: 18,
    totalAwardedValueLakhs: 480.5,
    delayedProjectsCount: 11,
    overlapAlertsCount: 6,
    riskRating: 84
  },
  {
    id: 'CTR-DECCAN-ENGG',
    name: 'Deccan Civil & Electrical Associates',
    gstin: '36AAACD4412K1Z9',
    activeContractsCount: 9,
    totalAwardedValueLakhs: 215.0,
    delayedProjectsCount: 3,
    overlapAlertsCount: 2,
    riskRating: 52
  },
  {
    id: 'CTR-MARATHA-CONST',
    name: 'Maratha Buildcon Engineering Works',
    gstin: '27AABCM8821L1ZN',
    activeContractsCount: 14,
    totalAwardedValueLakhs: 340.0,
    delayedProjectsCount: 1,
    overlapAlertsCount: 0,
    riskRating: 19
  },
  {
    id: 'CTR-AVADH-BUILDERS',
    name: 'Avadh Greenfield Infrastructure Ltd',
    gstin: '09AAACA7729P1ZY',
    activeContractsCount: 22,
    totalAwardedValueLakhs: 690.0,
    delayedProjectsCount: 14,
    overlapAlertsCount: 7,
    riskRating: 89
  },
  {
    id: 'CTR-PRIME-TECH-BLR',
    name: 'Prime Urban Infraworks Bangalore',
    gstin: '29AABCP1102Q1ZX',
    activeContractsCount: 12,
    totalAwardedValueLakhs: 285.0,
    delayedProjectsCount: 2,
    overlapAlertsCount: 1,
    riskRating: 26
  }
];
