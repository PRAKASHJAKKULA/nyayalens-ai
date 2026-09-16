import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { RiskTerrain3D } from '../3d/RiskTerrain3D';
import { Project, RiskTier } from '../../types';
import {
  MapPin,
  Layers,
  Globe2,
  ChevronRight,
  Filter,
  Eye,
  Building,
  TrendingUp,
  AlertTriangle,
  Compass
} from 'lucide-react';

interface StateStat {
  name: string;
  code: string;
  totalProjects: number;
  criticalCount: number;
  highCount: number;
  totalCr: number;
  districts: { name: string; projectsCount: number; highRiskCount: number }[];
}

const INDIAN_STATES_DATA: StateStat[] = [
  {
    name: 'Telangana',
    code: 'TS',
    totalProjects: 1284,
    criticalCount: 18,
    highCount: 42,
    totalCr: 295.4,
    districts: [
      { name: 'Hyderabad', projectsCount: 412, highRiskCount: 12 },
      { name: 'Medchal-Malkajgiri', projectsCount: 290, highRiskCount: 6 },
      { name: 'Rangareddy', projectsCount: 310, highRiskCount: 4 },
      { name: 'Warangal Urban', projectsCount: 272, highRiskCount: 2 }
    ]
  },
  {
    name: 'Maharashtra',
    code: 'MH',
    totalProjects: 2140,
    criticalCount: 14,
    highCount: 38,
    totalCr: 480.0,
    districts: [
      { name: 'Pune', projectsCount: 520, highRiskCount: 2 },
      { name: 'Mumbai Suburban', projectsCount: 640, highRiskCount: 5 },
      { name: 'Nagpur', projectsCount: 480, highRiskCount: 4 },
      { name: 'Nashik', projectsCount: 500, highRiskCount: 3 }
    ]
  },
  {
    name: 'Uttar Pradesh',
    code: 'UP',
    totalProjects: 2890,
    criticalCount: 42,
    highCount: 95,
    totalCr: 620.5,
    districts: [
      { name: 'Lucknow', projectsCount: 610, highRiskCount: 19 },
      { name: 'Varanasi', projectsCount: 490, highRiskCount: 14 },
      { name: 'Kanpur Nagar', projectsCount: 540, highRiskCount: 8 },
      { name: 'Prayagraj', projectsCount: 520, highRiskCount: 7 },
      { name: 'Gorakhpur', projectsCount: 730, highRiskCount: 9 }
    ]
  },
  {
    name: 'Karnataka',
    code: 'KA',
    totalProjects: 1450,
    criticalCount: 9,
    highCount: 28,
    totalCr: 340.2,
    districts: [
      { name: 'Bangalore Urban', projectsCount: 610, highRiskCount: 5 },
      { name: 'Mysore', projectsCount: 320, highRiskCount: 2 },
      { name: 'Belgaum', projectsCount: 280, highRiskCount: 1 },
      { name: 'Dharwad', projectsCount: 240, highRiskCount: 1 }
    ]
  },
  {
    name: 'Tamil Nadu',
    code: 'TN',
    totalProjects: 1620,
    criticalCount: 8,
    highCount: 24,
    totalCr: 385.0,
    districts: [
      { name: 'Chennai', projectsCount: 580, highRiskCount: 2 },
      { name: 'Coimbatore', projectsCount: 390, highRiskCount: 3 },
      { name: 'Madurai', projectsCount: 350, highRiskCount: 2 },
      { name: 'Tiruchirappalli', projectsCount: 300, highRiskCount: 1 }
    ]
  },
  {
    name: 'Gujarat',
    code: 'GJ',
    totalProjects: 1310,
    criticalCount: 11,
    highCount: 30,
    totalCr: 310.8,
    districts: [
      { name: 'Ahmedabad', projectsCount: 490, highRiskCount: 4 },
      { name: 'Surat', projectsCount: 380, highRiskCount: 3 },
      { name: 'Vadodara', projectsCount: 240, highRiskCount: 2 },
      { name: 'Rajkot', projectsCount: 200, highRiskCount: 2 }
    ]
  },
  {
    name: 'Delhi',
    code: 'DL',
    totalProjects: 680,
    criticalCount: 4,
    highCount: 12,
    totalCr: 165.2,
    districts: [
      { name: 'South Delhi', projectsCount: 210, highRiskCount: 1 },
      { name: 'New Delhi', projectsCount: 180, highRiskCount: 1 },
      { name: 'North West Delhi', projectsCount: 150, highRiskCount: 1 },
      { name: 'East Delhi', projectsCount: 140, highRiskCount: 1 }
    ]
  }
];

export const NationalRiskMap: React.FC = () => {
  const {
    filteredProjects,
    selectedProject,
    setSelectedProjectId,
    setActiveTab,
    filterTier,
    setFilterTier,
    filterState,
    setFilterState
  } = useProjects();

  const [mapType, setMapType] = useState<'2D_GIS' | '3D_TERRAIN'>('2D_GIS');
  const [selectedStateData, setSelectedStateData] = useState<StateStat | null>(
    INDIAN_STATES_DATA[0] // Telangana default
  );
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>('Hyderabad');

  const tiers: (RiskTier | 'ALL')[] = ['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'];

  const handleStateClick = (state: StateStat) => {
    setSelectedStateData(state);
    setFilterState(state.name);
    setSelectedDistrictName(state.districts[0]?.name || 'All');
  };

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl shadow-gov overflow-hidden">
      {/* Top Map Control Bar */}
      <div className="px-4 py-3 border-b border-gov-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-gov-50/50 dark:bg-slate-900/50">
        <div className="flex flex-wrap items-center gap-2">
          {/* 2D / 3D Mode Selector */}
          <div className="flex items-center bg-gov-200/60 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
            <button
              onClick={() => setMapType('2D_GIS')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-bold transition-all ${
                mapType === '2D_GIS'
                  ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-300 shadow-sm'
                  : 'text-gov-600 dark:text-slate-400 hover:text-gov-900'
              }`}
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>GIS Geospatial Grid</span>
            </button>
            <button
              onClick={() => setMapType('3D_TERRAIN')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-bold transition-all ${
                mapType === '3D_TERRAIN'
                  ? 'bg-white dark:bg-slate-900 text-brand-700 dark:text-brand-300 shadow-sm'
                  : 'text-gov-600 dark:text-slate-400 hover:text-gov-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D Elevation Terrain</span>
            </button>
          </div>

          {/* Quick Risk Filters */}
          <div className="hidden sm:flex items-center gap-1 bg-gov-200/60 dark:bg-slate-800 p-0.5 rounded-lg text-xs">
            {tiers.map((t) => (
              <button
                key={t}
                onClick={() => setFilterTier(t)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  filterTier === t
                    ? t === 'CRITICAL'
                      ? 'bg-risk-critical text-white'
                      : t === 'HIGH'
                      ? 'bg-risk-high text-white'
                      : t === 'MODERATE'
                      ? 'bg-risk-moderate text-white'
                      : t === 'LOW'
                      ? 'bg-risk-low text-white'
                      : 'bg-brand-600 text-white'
                    : 'text-gov-600 dark:text-slate-400 hover:text-gov-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Drill-down Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gov-600 dark:text-slate-400 font-medium">
          <span
            onClick={() => {
              setFilterState('ALL');
              setSelectedStateData(null);
            }}
            className="cursor-pointer hover:text-brand-600 underline font-semibold"
          >
            India (National)
          </span>
          {selectedStateData && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="font-bold text-gov-900 dark:text-white">{selectedStateData.name}</span>
            </>
          )}
          {selectedDistrictName && (
            <>
              <ChevronRight className="w-3 h-3" />
              <span className="font-mono text-brand-700 dark:text-brand-400 font-bold">{selectedDistrictName}</span>
            </>
          )}
        </div>
      </div>

      {/* Map Content Viewport */}
      {mapType === '3D_TERRAIN' ? (
        <div className="p-4">
          <RiskTerrain3D />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left: Interactive State & District Geospatial Navigator */}
          <div className="lg:col-span-4 border-r border-gov-200 dark:border-slate-800 p-4 space-y-4 bg-gov-50/30 dark:bg-slate-900/30">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gov-500 dark:text-slate-400">
                State Risk Hierarchy
              </h4>
              <span className="text-[11px] font-mono text-brand-600 dark:text-brand-400 font-bold">
                7 Monitored Regions
              </span>
            </div>

            <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
              {INDIAN_STATES_DATA.map((st) => {
                const isSelected = selectedStateData?.name === st.name;
                return (
                  <div
                    key={st.name}
                    onClick={() => handleStateClick(st)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between text-xs ${
                      isSelected
                        ? 'bg-brand-50 dark:bg-brand-950/60 border-brand-300 dark:border-brand-700 shadow-sm'
                        : 'bg-white dark:bg-[#0f172a] border-gov-200 dark:border-slate-800 hover:border-gov-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gov-900 dark:text-white">{st.name}</span>
                        <span className="text-[10px] font-mono text-gov-400 font-semibold">{st.code}</span>
                      </div>
                      <span className="text-[11px] text-gov-500 dark:text-slate-400">
                        {st.totalProjects} Works | ₹{st.totalCr} Cr
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {st.criticalCount > 0 && (
                        <span className="bg-risk-criticalBg text-risk-criticalText border border-risk-criticalBorder text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">
                          {st.criticalCount} Crit
                        </span>
                      )}
                      <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-600' : 'text-gov-400'}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected State Districts Accordion */}
            {selectedStateData && (
              <div className="pt-2 border-t border-gov-200 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold text-gov-700 dark:text-slate-300 block">
                  Districts in {selectedStateData.name}:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {selectedStateData.districts.map((dst) => (
                    <button
                      key={dst.name}
                      onClick={() => setSelectedDistrictName(dst.name)}
                      className={`p-2 rounded-lg border text-left text-xs transition-all ${
                        selectedDistrictName === dst.name
                          ? 'bg-brand-600 text-white border-brand-600 font-bold shadow-sm'
                          : 'bg-white dark:bg-[#0f172a] border-gov-200 dark:border-slate-800 text-gov-700 dark:text-slate-300 hover:bg-gov-100'
                      }`}
                    >
                      <div className="truncate font-semibold">{dst.name}</div>
                      <div className={`text-[10px] ${selectedDistrictName === dst.name ? 'text-brand-100' : 'text-gov-500'}`}>
                        {dst.projectsCount} works ({dst.highRiskCount} risk)
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Geospatial Project Markers & Intelligence Inspector */}
          <div className="lg:col-span-8 p-4 space-y-4 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-gov-200 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                <span className="font-bold text-gov-900 dark:text-white">
                  Active Project Markers in {selectedDistrictName || 'All India'}
                </span>
                <span className="bg-gov-100 dark:bg-slate-800 text-gov-600 dark:text-slate-300 px-2 py-0.2 rounded text-[11px] font-mono">
                  {filteredProjects.length} Projects
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-gov-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-risk-critical" /> Critical (&ge;75)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-risk-high" /> High (50–74)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-risk-moderate" /> Moderate
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-risk-low" /> Normal
                </span>
              </div>
            </div>

            {/* Structured Project Intelligence Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-auto py-2">
              {filteredProjects.slice(0, 6).map((p) => {
                const s = p.riskSignals;
                const isSelected = selectedProject.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProjectId(p.id);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                      isSelected
                        ? 'bg-brand-50/80 dark:bg-brand-950/40 border-brand-500 shadow-gov-md ring-1 ring-brand-500'
                        : 'bg-white dark:bg-[#0f172a] border-gov-200 dark:border-slate-800 hover:border-gov-300 hover:shadow-gov'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-bold text-gov-900 dark:text-white bg-gov-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          {p.id}
                        </span>
                        <span className="text-[10px] text-gov-500 font-medium truncate max-w-[120px]">
                          {p.assetCategory}
                        </span>
                      </div>

                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          s.tier === 'CRITICAL'
                            ? 'bg-risk-criticalBg text-risk-criticalText border-risk-criticalBorder'
                            : s.tier === 'HIGH'
                            ? 'bg-risk-highBg text-risk-highText border-risk-highBorder'
                            : 'bg-risk-lowBg text-risk-lowText border-risk-lowBorder'
                        }`}
                      >
                        {s.totalScore} / 100 {s.tier}
                      </span>
                    </div>

                    <h5 className="text-xs font-bold text-gov-900 dark:text-white line-clamp-1">
                      {p.title}
                    </h5>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-gov-600 dark:text-slate-400 bg-gov-50 dark:bg-slate-900 p-2 rounded-lg">
                      <div>
                        <span>Sanctioned:</span>
                        <p className="font-mono font-bold text-gov-900 dark:text-white">₹{p.sanctionedAmountLakhs} Lakhs</p>
                      </div>
                      <div>
                        <span>Progress Gap:</span>
                        <p className="font-mono font-bold text-risk-high">
                          +{s.utilizationAnomaly.financialProgressGapPct}% Financial Gap
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-gov-500">
                        📍 {p.district}, {p.state}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectId(p.id);
                          setActiveTab('evidence-explorer');
                        }}
                        className="text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                      >
                        <span>Open Case File</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Quick Case Bar */}
            <div className="p-3 bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-brand-900 dark:text-brand-200">Flagship Investigation Case:</span>
                <span className="font-mono text-brand-700 dark:text-brand-400 font-bold">MPL-28471</span>
                <span className="text-gov-600 dark:text-slate-400 hidden sm:inline">(87 Risk, 2.76× Peer Outlier, 42m Overlap)</span>
              </div>
              <button
                onClick={() => {
                  setSelectedProjectId('MPL-28471');
                  setActiveTab('evidence-explorer');
                }}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1 transition-all"
              >
                <span>Inspect Evidence</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
