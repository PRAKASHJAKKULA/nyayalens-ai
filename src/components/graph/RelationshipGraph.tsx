import React, { useEffect, useRef, useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Project } from '../../types';
import { AGENCIES, CONTRACTORS } from '../../data/agenciesAndContractors';
import {
  Share2,
  Filter,
  ShieldAlert,
  Building,
  User,
  MapPin,
  ChevronRight,
  Info
} from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  type: 'PROJECT' | 'AGENCY' | 'CONTRACTOR' | 'LOCATION';
  x: number;
  y: number;
  radius: number;
  color: string;
  riskScore?: number;
  details?: any;
}

interface GraphLink {
  source: string;
  target: string;
  label: string;
  isAnomaly?: boolean;
}

export const RelationshipGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { selectedProject, setSelectedProjectId, setActiveTab, projects, themeMode } = useProjects();

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.parentElement?.clientWidth || 800;
    const height = 480;
    canvas.width = width;
    canvas.height = height;

    const centerX = width / 2;
    const centerY = height / 2;

    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    // Target Project Node
    const mainNode: GraphNode = {
      id: selectedProject.id,
      label: selectedProject.id,
      type: 'PROJECT',
      x: centerX,
      y: centerY,
      radius: 26,
      color: '#dc2626',
      riskScore: selectedProject.riskSignals.totalScore,
      details: selectedProject
    };
    nodes.push(mainNode);

    // Agency Node
    const agency = AGENCIES.find((a) => a.id === selectedProject.implementingAgencyId) || AGENCIES[0];
    const agencyNode: GraphNode = {
      id: agency.id,
      label: agency.name.split(' ')[0] + ' (Agency)',
      type: 'AGENCY',
      x: centerX - 180,
      y: centerY - 90,
      radius: 22,
      color: '#7c3aed',
      details: agency
    };
    nodes.push(agencyNode);
    links.push({
      source: selectedProject.id,
      target: agency.id,
      label: 'IMPLEMENTED_BY',
      isAnomaly: selectedProject.riskSignals.totalScore >= 75
    });

    // Contractor Node
    const contractor = CONTRACTORS.find((c) => c.id === selectedProject.contractorId) || CONTRACTORS[0];
    const contractorNode: GraphNode = {
      id: contractor.id,
      label: contractor.name.split(' ')[0] + ' (Contractor)',
      type: 'CONTRACTOR',
      x: centerX + 180,
      y: centerY - 90,
      radius: 22,
      color: '#ea580c',
      details: contractor
    };
    nodes.push(contractorNode);
    links.push({
      source: selectedProject.id,
      target: contractor.id,
      label: 'AWARDED_TO',
      isAnomaly: true
    });

    // Location Node
    const locationNode: GraphNode = {
      id: `LOC-${selectedProject.district}`,
      label: `${selectedProject.block}`,
      type: 'LOCATION',
      x: centerX,
      y: centerY + 140,
      radius: 20,
      color: '#0d9488',
      details: { district: selectedProject.district, state: selectedProject.state }
    };
    nodes.push(locationNode);
    links.push({
      source: selectedProject.id,
      target: locationNode.id,
      label: 'LOCATED_AT'
    });

    // Duplicate Project (MPL-28469)
    if (selectedProject.riskSignals.duplicateRisk.matchedProjectId) {
      const dupId = selectedProject.riskSignals.duplicateRisk.matchedProjectId;
      const dupProj = projects.find((p) => p.id === dupId);
      if (dupProj) {
        const dupNode: GraphNode = {
          id: dupProj.id,
          label: `${dupProj.id} (42m Overlap)`,
          type: 'PROJECT',
          x: centerX + 140,
          y: centerY + 120,
          radius: 22,
          color: '#d97706',
          riskScore: dupProj.riskSignals.totalScore,
          details: dupProj
        };
        nodes.push(dupNode);
        links.push({
          source: selectedProject.id,
          target: dupNode.id,
          label: 'DUPLICATE_PAIR',
          isAnomaly: true
        });
        links.push({
          source: dupNode.id,
          target: locationNode.id,
          label: 'SAME_WARD'
        });
      }
    }

    // Repeat contract node
    const otherProjects = projects.filter(
      (p) => p.id !== selectedProject.id && p.contractorId === selectedProject.contractorId
    );
    if (otherProjects.length > 0) {
      const other = otherProjects[0];
      const otherNode: GraphNode = {
        id: other.id,
        label: `${other.id} (Repeat Work)`,
        type: 'PROJECT',
        x: centerX + 260,
        y: centerY - 10,
        radius: 18,
        color: '#2563eb',
        riskScore: other.riskSignals.totalScore,
        details: other
      };
      nodes.push(otherNode);
      links.push({
        source: contractor.id,
        target: otherNode.id,
        label: 'REPEAT_CONTRACT',
        isAnomaly: true
      });
    }

    // Render
    const isDark = themeMode === 'dark';
    ctx.clearRect(0, 0, width, height);

    // Subtle background grid
    ctx.strokeStyle = isDark ? 'rgba(30, 41, 59, 0.4)' : 'rgba(226, 232, 240, 0.8)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Links
    links.forEach((link) => {
      const sNode = nodes.find((n) => n.id === link.source);
      const tNode = nodes.find((n) => n.id === link.target);
      if (!sNode || !tNode) return;

      ctx.beginPath();
      ctx.moveTo(sNode.x, sNode.y);
      ctx.lineTo(tNode.x, tNode.y);

      if (link.isAnomaly) {
        ctx.strokeStyle = '#dc2626';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 4]);
      } else {
        ctx.strokeStyle = isDark ? '#475569' : '#94a3b8';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Label Pill
      const midX = (sNode.x + tNode.x) / 2;
      const midY = (sNode.y + tNode.y) / 2;
      ctx.fillStyle = isDark ? '#0f172a' : '#ffffff';
      ctx.fillRect(midX - 35, midY - 7, 70, 14);
      ctx.strokeStyle = link.isAnomaly ? '#dc2626' : (isDark ? '#334155' : '#cbd5e1');
      ctx.strokeRect(midX - 35, midY - 7, 70, 14);

      ctx.fillStyle = link.isAnomaly ? '#dc2626' : (isDark ? '#cbd5e1' : '#475569');
      ctx.font = 'bold 8.5px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(link.label, midX, midY + 3.5);
    });

    // Draw Nodes
    nodes.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = isDark ? '#0f172a' : '#ffffff';
      ctx.stroke();

      // Node label
      ctx.fillStyle = isDark ? '#f8fafc' : '#0f172a';
      ctx.font = 'bold 11px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + node.radius + 14);

      if (node.type === 'PROJECT' && node.riskScore) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px monospace';
        ctx.fillText(`${node.riskScore}`, node.x, node.y + 3.5);
      }
    });

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const hit = nodes.find((n) => {
        const dist = Math.sqrt((n.x - clickX) ** 2 + (n.y - clickY) ** 2);
        return dist <= n.radius + 5;
      });

      if (hit) {
        setSelectedNode(hit);
        if (hit.type === 'PROJECT' && hit.id !== selectedProject.id) {
          setSelectedProjectId(hit.id);
        }
      }
    };

    canvas.addEventListener('click', handleCanvasClick);
    return () => canvas.removeEventListener('click', handleCanvasClick);
  }, [selectedProject, projects, themeMode]);

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 p-4 rounded-xl shadow-gov">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3 className="text-xs font-bold text-gov-900 dark:text-white uppercase tracking-wider">
              Relationship Network Intelligence: <span className="font-mono text-brand-600 dark:text-brand-400">{selectedProject.id}</span>
            </h3>
          </div>
          <p className="text-[11px] text-gov-500 dark:text-slate-400">
            Node-link mapping across Projects &harr; Agencies &harr; Contractors &harr; Spatial Duplicate Pairs.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs bg-gov-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-gov-200 dark:border-slate-800">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-risk-critical" />
            <span className="text-gov-700 dark:text-slate-300 text-[11px]">Flagged Work</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
            <span className="text-gov-700 dark:text-slate-300 text-[11px]">Agency</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-risk-high" />
            <span className="text-gov-700 dark:text-slate-300 text-[11px]">Contractor</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-600" />
            <span className="text-gov-700 dark:text-slate-300 text-[11px]">Ward Location</span>
          </div>
        </div>
      </div>

      {/* Main Canvas View */}
      <div className="relative w-full h-[480px] bg-white dark:bg-[#020611] rounded-xl overflow-hidden border border-gov-200 dark:border-slate-800 shadow-gov">
        <canvas ref={canvasRef} className="w-full h-full cursor-pointer" />

        {/* Anomaly Callout Card */}
        <div className="absolute top-4 left-4 z-10 max-w-xs bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-risk-criticalBorder p-3 rounded-xl shadow-gov space-y-1 text-xs">
          <div className="flex items-center gap-1.5 text-risk-critical font-bold text-[11px]">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>High Collusion / Overlap Alert</span>
          </div>
          <p className="text-gov-700 dark:text-slate-300 text-[11px] leading-relaxed">
            Contractor <strong className="text-risk-high">Sri Sai Ram Infratech</strong> manages 18 concurrent works with 11 delayed milestones. Project MPL-28471 duplicates MPL-28469 at 42m distance.
          </p>
        </div>

        {/* Selected Node Drawer */}
        {selectedNode && (
          <div className="absolute bottom-4 right-4 z-10 w-72 bg-white dark:bg-slate-900 border border-brand-300 dark:border-brand-800 p-3.5 rounded-xl shadow-gov-lg text-xs space-y-2">
            <div className="flex items-center justify-between border-b border-gov-200 dark:border-slate-800 pb-1.5">
              <span className="font-bold text-gov-900 dark:text-white">{selectedNode.label}</span>
              <span className="text-[9px] font-mono uppercase bg-gov-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-gov-600 dark:text-slate-300 font-bold">
                {selectedNode.type}
              </span>
            </div>

            {selectedNode.type === 'PROJECT' && (
              <div className="space-y-1 text-gov-600 dark:text-slate-400 text-[11px]">
                <p className="font-semibold text-gov-900 dark:text-white line-clamp-1">{selectedNode.details?.title}</p>
                <div className="flex justify-between">
                  <span>Sanction:</span>
                  <span className="font-mono font-bold text-gov-900 dark:text-white">₹{selectedNode.details?.sanctionedAmountLakhs}L</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Score:</span>
                  <span className="font-mono font-bold text-risk-critical">{selectedNode.riskScore}/100</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedProjectId(selectedNode.id);
                    setActiveTab('evidence-explorer');
                  }}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-1.5 rounded-lg mt-1 transition-all text-center block"
                >
                  Open Case File &rarr;
                </button>
              </div>
            )}

            {selectedNode.type === 'CONTRACTOR' && (
              <div className="space-y-0.5 text-gov-600 dark:text-slate-400 text-[11px]">
                <p><strong>Name:</strong> {selectedNode.details?.name}</p>
                <p><strong>Active Works:</strong> {selectedNode.details?.activeContractsCount}</p>
                <p className="text-risk-critical"><strong>Overload Risk:</strong> {selectedNode.details?.riskRating}/100</p>
              </div>
            )}

            {selectedNode.type === 'AGENCY' && (
              <div className="space-y-0.5 text-gov-600 dark:text-slate-400 text-[11px]">
                <p><strong>Agency:</strong> {selectedNode.details?.name}</p>
                <p><strong>Flagged Cases:</strong> {selectedNode.details?.flaggedProjects}</p>
                <p><strong>Avg Delay:</strong> {selectedNode.details?.averageDelayDays} Days</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
