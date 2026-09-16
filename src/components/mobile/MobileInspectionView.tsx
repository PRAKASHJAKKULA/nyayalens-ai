import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { calculateSha256 } from '../../services/cryptoLedger';
import {
  Smartphone,
  MapPin,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Upload,
  Send,
  ShieldCheck,
  Check,
  Building,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const MobileInspectionView: React.FC = () => {
  const { selectedProject, submitFieldInspection, setActiveTab, projects, setSelectedProjectId } = useProjects();

  const [verifiedProgress, setVerifiedProgress] = useState<number>(selectedProject.physicalProgressPct);
  const [assetVisible, setAssetVisible] = useState<boolean>(true);
  const [workActive, setWorkActive] = useState<boolean>(false);
  const [structuralRating, setStructuralRating] = useState<'High' | 'Moderate' | 'Poor' | 'Not Started'>('Poor');
  const [remarks, setRemarks] = useState<string>('Site verification confirmed only foundation plinth and 4 columns complete. Brickwork halted. No roof truss installed.');
  const [recommendation, setRecommendation] = useState<'NORMAL' | 'NEEDS_REVIEW' | 'ESCALATE'>('ESCALATE');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<boolean>(false);

  // Inspector GPS vs Target Coordinates
  const inspectorLat = selectedProject.lat + 0.0001;
  const inspectorLng = selectedProject.lng + 0.0001;
  const simulatedDistance = 12; // 12 meters
  const isGpsVerified = simulatedDistance <= 50;

  const [uploadedPhotos, setUploadedPhotos] = useState<
    { id: string; url: string; caption: string; timestamp: string; sha256Hash: string }[]
  >([
    {
      id: 'INSP-PHT-01',
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18f15f4?w=800&auto=format&fit=crop&q=60',
      caption: 'Plinth Foundation & Stalled Columns',
      timestamp: new Date().toISOString(),
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    }
  ]);

  const handleSimulatePhotoUpload = async () => {
    const newPhotoId = `PHT-${Date.now().toString().slice(-4)}`;
    const timestamp = new Date().toISOString();
    const photoHash = await calculateSha256(`PHOTO-${selectedProject.id}-${newPhotoId}-${timestamp}`);

    const newPhoto = {
      id: newPhotoId,
      url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&auto=format&fit=crop&q=60',
      caption: `Geo-tagged site capture at GPS (${inspectorLat.toFixed(4)}, ${inspectorLng.toFixed(4)})`,
      timestamp,
      sha256Hash: photoHash
    };

    setUploadedPhotos((prev) => [...prev, newPhoto]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitFieldInspection({
        projectId: selectedProject.id,
        inspectorId: 'INS-TEL-4091',
        inspectorName: 'P. Ravinder (MoSPI Field Officer)',
        timestamp: new Date().toISOString(),
        recordedLat: inspectorLat,
        recordedLng: inspectorLng,
        targetLat: selectedProject.lat,
        targetLng: selectedProject.lng,
        distanceMeters: simulatedDistance,
        isGpsVerified,
        reportedPhysicalProgressPct: 75.0,
        verifiedPhysicalProgressPct: verifiedProgress,
        isAssetVisible: assetVisible,
        isWorkActive: workActive,
        structuralIntegrityRating: structuralRating,
        fieldRemarks: remarks,
        photos: uploadedPhotos,
        recommendation
      });

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      setSubmissionSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-[#0f172a] border border-gov-300 dark:border-slate-800 rounded-2xl overflow-hidden shadow-gov-lg animate-fadeIn">
      {/* Official Header */}
      <div className="bg-gov-900 text-white p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider">
              MoSPI Field Inspection App
            </h4>
            <span className="text-[10px] text-brand-300 font-mono">Officer: INS-TEL-4091</span>
          </div>
        </div>

        <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          GPS Online
        </span>
      </div>

      {submissionSuccess ? (
        <div className="p-6 text-center space-y-4 animate-fadeIn">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold text-gov-900 dark:text-white">Field Verification Submitted</h3>
          <p className="text-xs text-gov-600 dark:text-slate-300 leading-relaxed">
            Inspection report for <strong className="text-brand-600">{selectedProject.id}</strong> has been sealed with an immutable SHA-256 hash and updated in the National Registry.
          </p>

          <div className="bg-gov-50 dark:bg-slate-900 p-2.5 rounded-lg border border-gov-200 dark:border-slate-800 text-[10px] font-mono text-brand-700 dark:text-brand-300 break-all">
            Proof: 4a6b29f01c89012a43b2f90117bcda742099ec1368940b1239aa81726ca49120
          </div>

          <button
            onClick={() => {
              setSubmissionSuccess(false);
              setActiveTab('evidence-explorer');
            }}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 rounded-lg transition-all"
          >
            View Updated Project Case File
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 space-y-3.5 text-xs">
          {/* Inspected Project Dropdown */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-gov-600 dark:text-slate-400">Inspecting Project:</label>
            <select
              value={selectedProject.id}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              aria-label="Select Project for Inspection"
              className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-2 text-xs text-gov-900 dark:text-white font-bold focus:outline-none focus:border-brand-600"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-white dark:bg-slate-900 text-gov-900 dark:text-white">
                  {p.id} — {p.title.slice(0, 28)}... (Risk: {p.riskSignals.totalScore})
                </option>
              ))}
            </select>
          </div>

          {/* 📍 GPS Geofence Proximity Box */}
          <div className="bg-gov-50 dark:bg-slate-900 p-3 rounded-lg border border-gov-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-gov-900 dark:text-white font-bold">
                <MapPin className="w-3.5 h-3.5 text-brand-600" />
                <span>Geofence Validation</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded text-[10px]">
                {simulatedDistance}m Away (PASS)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] text-gov-600 dark:text-slate-400 bg-white dark:bg-slate-950 p-2 rounded border border-gov-200 dark:border-slate-800">
              <div>
                <span>Target Coordinates:</span>
                <p className="font-mono text-gov-900 dark:text-white font-bold">{selectedProject.lat.toFixed(4)}, {selectedProject.lng.toFixed(4)}</p>
              </div>
              <div>
                <span>Device Position:</span>
                <p className="font-mono text-brand-700 dark:text-brand-400 font-bold">{inspectorLat.toFixed(4)}, {inspectorLng.toFixed(4)}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>Location verified within 50m MoSPI compliance radius</span>
            </div>
          </div>

          {/* Physical Progress Slider */}
          <div className="space-y-1 bg-gov-50 dark:bg-slate-900 p-3 rounded-lg border border-gov-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <label className="font-bold text-gov-900 dark:text-white">Verified Physical Progress:</label>
              <span className="font-mono font-extrabold text-brand-600 dark:text-brand-400 text-sm">{verifiedProgress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={verifiedProgress}
              onChange={(e) => setVerifiedProgress(parseInt(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[10px] text-gov-400">
              <span>0% (Not Started)</span>
              <span>Reported: 75%</span>
              <span>100% (Completed)</span>
            </div>
          </div>

          {/* Verification Checklist */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gov-50 dark:bg-slate-900 p-2 rounded-lg border border-gov-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-gov-700 dark:text-slate-300 font-medium text-[11px]">Asset Visible?</span>
              <button
                type="button"
                onClick={() => setAssetVisible(!assetVisible)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  assetVisible ? 'bg-risk-low text-white' : 'bg-risk-critical text-white'
                }`}
              >
                {assetVisible ? 'YES' : 'NO'}
              </button>
            </div>

            <div className="bg-gov-50 dark:bg-slate-900 p-2 rounded-lg border border-gov-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-gov-700 dark:text-slate-300 font-medium text-[11px]">Work Active?</span>
              <button
                type="button"
                onClick={() => setWorkActive(!workActive)}
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  workActive ? 'bg-risk-low text-white' : 'bg-gov-200 dark:bg-slate-800 text-gov-700 dark:text-slate-300'
                }`}
              >
                {workActive ? 'ACTIVE' : 'STALLED'}
              </button>
            </div>
          </div>

          {/* Structural Quality Rating */}
          <div className="space-y-1 bg-gov-50 dark:bg-slate-900 p-2.5 rounded-lg border border-gov-200 dark:border-slate-800">
            <label className="font-bold text-gov-900 dark:text-white text-[11px]">Structural Integrity:</label>
            <div className="grid grid-cols-4 gap-1 pt-0.5">
              {(['High', 'Moderate', 'Poor', 'Not Started'] as const).map((lvl) => (
                <button
                  type="button"
                  key={lvl}
                  onClick={() => setStructuralRating(lvl)}
                  className={`py-1 rounded text-[10px] font-bold transition-all ${
                    structuralRating === lvl
                      ? 'bg-brand-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-950 text-gov-600 dark:text-slate-400 border border-gov-200 dark:border-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Evidence Capture */}
          <div className="space-y-2 bg-gov-50 dark:bg-slate-900 p-2.5 rounded-lg border border-gov-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gov-900 dark:text-white text-[11px]">Photo Evidence ({uploadedPhotos.length}):</span>
              <button
                type="button"
                onClick={handleSimulatePhotoUpload}
                className="text-[10px] bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 px-2 py-0.5 rounded font-bold flex items-center gap-1"
              >
                <Camera className="w-3 h-3" />
                <span>Simulate Photo Shot</span>
              </button>
            </div>

            <div className="space-y-1">
              {uploadedPhotos.map((ph) => (
                <div key={ph.id} className="bg-white dark:bg-slate-950 p-1.5 rounded border border-gov-200 dark:border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="font-medium text-gov-800 dark:text-slate-200 truncate max-w-[200px]">{ph.caption}</span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-bold shrink-0">SHA-256 OK</span>
                </div>
              ))}
            </div>
          </div>

          {/* Inspector Remarks */}
          <div className="space-y-1">
            <label className="font-bold text-gov-900 dark:text-white text-[11px]">Field Notes & Observations:</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={2}
              className="w-full bg-gov-50 dark:bg-slate-900 border border-gov-200 dark:border-slate-800 rounded-lg p-2 text-xs text-gov-900 dark:text-white focus:outline-none focus:border-brand-600"
            />
          </div>

          {/* Recommendation Selection */}
          <div className="space-y-1 bg-gov-50 dark:bg-slate-900 p-2.5 rounded-lg border border-gov-200 dark:border-slate-800">
            <label className="font-bold text-gov-900 dark:text-white text-[11px]">Final Recommendation:</label>
            <div className="grid grid-cols-3 gap-1 pt-0.5">
              <button
                type="button"
                onClick={() => setRecommendation('NORMAL')}
                className={`py-1 rounded text-[10px] font-bold ${
                  recommendation === 'NORMAL' ? 'bg-risk-low text-white' : 'bg-white dark:bg-slate-950 text-gov-600 border border-gov-200 dark:border-slate-800'
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => setRecommendation('NEEDS_REVIEW')}
                className={`py-1 rounded text-[10px] font-bold ${
                  recommendation === 'NEEDS_REVIEW' ? 'bg-risk-moderate text-white' : 'bg-white dark:bg-slate-950 text-gov-600 border border-gov-200 dark:border-slate-800'
                }`}
              >
                Needs Review
              </button>
              <button
                type="button"
                onClick={() => setRecommendation('ESCALATE')}
                className={`py-1 rounded text-[10px] font-bold ${
                  recommendation === 'ESCALATE' ? 'bg-risk-critical text-white' : 'bg-white dark:bg-slate-950 text-gov-600 border border-gov-200 dark:border-slate-800'
                }`}
              >
                Escalate
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-extrabold py-2.5 rounded-lg text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isSubmitting ? 'Generating Proof...' : 'Sign & Submit Official Inspection'}</span>
          </button>
        </form>
      )}
    </div>
  );
};
