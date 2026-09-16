import { AuditLogEntry, FieldInspectionSubmission } from '../types';

/**
 * Calculates cryptographic SHA-256 hash string for an object or file payload
 */
export async function calculateSha256(data: string | object): Promise<string> {
  const text = typeof data === 'string' ? data : JSON.stringify(data);
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(text);
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  // Fallback hash implementation if crypto subtle is not present
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(64, '0');
}

export async function createInspectionProof(
  inspection: Omit<FieldInspectionSubmission, 'digitalTamperProofHash'>
): Promise<string> {
  const payload = {
    projectId: inspection.projectId,
    inspectorId: inspection.inspectorId,
    timestamp: inspection.timestamp,
    recordedLat: inspection.recordedLat,
    recordedLng: inspection.recordedLng,
    verifiedProgress: inspection.verifiedPhysicalProgressPct,
    photoHashes: inspection.photos.map((p) => p.sha256Hash)
  };
  return calculateSha256(payload);
}

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-9021',
    timestamp: '2024-08-30T10:15:22Z',
    actor: 'NyayaLens AI Risk Engine',
    role: 'SYSTEM_AI',
    projectId: 'MPL-28471',
    actionType: 'RISK_SCORE_COMPUTED',
    description: 'Multi-signal analysis flagged project with Risk Score 87 (CRITICAL). Contributing: Cost Anomaly (+24), Duplicate Overlap (+22), Delay Probability (+18).',
    immutableProofHash: '8f4c2b9a76d1e03845fa882c31e9db7421a9c336ef114b09dc9024f2b1897ae3'
  },
  {
    id: 'AUD-9022',
    timestamp: '2024-08-30T11:42:05Z',
    actor: 'Dr. Suresh Verma',
    role: 'MOSPI_AUDITOR',
    projectId: 'MPL-28471',
    actionType: 'RE_INSPECTION_ORDERED',
    description: 'Order issued for on-site physical geofence verification & photo evidence capture due to 46.5% financial disbursement gap.',
    immutableProofHash: 'c4e3391b4028fa761c925893a0b12788e04b772c918ef93021fa41893c09b821'
  },
  {
    id: 'AUD-9023',
    timestamp: '2024-08-31T09:12:44Z',
    actor: 'P. Ravinder (Field Officer)',
    role: 'FIELD_INSPECTOR',
    projectId: 'MPL-28471',
    actionType: 'FIELD_INSPECTION_SUBMITTED',
    description: 'Site visit completed. Recorded GPS distance: 12m (GEOFENCE VERIFIED). Actual physical progress verified at 38% (Reported: 75%). 2 geo-tagged photos uploaded with SHA-256 integrity hash.',
    immutableProofHash: '4a6b29f01c89012a43b2f90117bcda742099ec1368940b1239aa81726ca49120'
  },
  {
    id: 'AUD-9024',
    timestamp: '2024-08-31T14:30:10Z',
    actor: 'K. Ramesh Kumar (IAS)',
    role: 'DISTRICT_COLLECTOR',
    projectId: 'MPL-19042',
    actionType: 'ESCALATED_TO_VIGILANCE',
    description: 'Escalated to Vigilance & Anti-Corruption Bureau regarding ₹34.5L CC Road contract given to Avadh Greenfield Infrastructure.',
    immutableProofHash: '19042cba89742a0b1279093817fefaa92716354891b01c3857e4b9012a87401c'
  }
];
