import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useProjects } from '../../context/ProjectContext';
import { Box, Layers, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

export const DigitalTwin3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { selectedProject, themeMode } = useProjects();
  const [activeLayer, setActiveLayer] = useState<'ALL' | 'FOUNDATION' | 'FRAMING' | 'ROOF' | 'ELECTRICAL'>('ALL');
  const [inspectMode, setInspectMode] = useState<'DISCREPANCY' | 'EXPECTED' | 'VERIFIED'>('DISCREPANCY');

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = 420;

    const isDark = themeMode === 'dark';
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isDark ? '#020611' : '#f1f5f9');

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(12, 10, 14);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, isDark ? 1.2 : 1.5);
    scene.add(ambLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    scene.add(dirLight);

    // Ground Slab
    const groundGeo = new THREE.BoxGeometry(16, 0.4, 14);
    const groundMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0f2942 : 0xcbd5e1,
      roughness: 0.8
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.2;
    ground.receiveShadow = true;
    scene.add(ground);

    const group = new THREE.Group();
    scene.add(group);

    // Layer 1: Plinth Foundation (100% Cast)
    if (activeLayer === 'ALL' || activeLayer === 'FOUNDATION') {
      const plinthGeo = new THREE.BoxGeometry(10, 0.8, 8);
      const plinthMat = new THREE.MeshStandardMaterial({
        color: 0x16a34a,
        roughness: 0.6,
        metalness: 0.2
      });
      const plinth = new THREE.Mesh(plinthGeo, plinthMat);
      plinth.position.y = 0.4;
      plinth.castShadow = true;
      group.add(plinth);
    }

    // Layer 2: Columns & Brickwork (Actual 38%, Claimed 75%)
    if (activeLayer === 'ALL' || activeLayer === 'FRAMING') {
      const columnMat = new THREE.MeshStandardMaterial({
        color: inspectMode === 'DISCREPANCY' ? 0xdc2626 : 0x2563eb,
        roughness: 0.4,
        metalness: 0.5
      });

      const positions = [
        [-4.5, 2.4, -3.5],
        [4.5, 2.4, -3.5],
        [-4.5, 2.4, 3.5],
        [4.5, 2.4, 3.5],
        [0, 2.4, -3.5],
        [0, 2.4, 3.5]
      ];

      positions.forEach((pos, idx) => {
        const height = inspectMode === 'DISCREPANCY' && idx > 3 ? 1.8 : 3.6;
        const colGeo = new THREE.BoxGeometry(0.7, height, 0.7);
        const col = new THREE.Mesh(colGeo, columnMat);
        col.position.set(pos[0], 0.8 + height / 2, pos[2]);
        col.castShadow = true;
        group.add(col);
      });

      // Partial brick walls
      const wallMat = new THREE.MeshStandardMaterial({
        color: inspectMode === 'DISCREPANCY' ? 0xea580c : 0x0284c7,
        wireframe: inspectMode === 'DISCREPANCY',
        transparent: true,
        opacity: 0.8
      });
      const wallGeo = new THREE.BoxGeometry(9.6, 2.2, 0.3);
      const wallBack = new THREE.Mesh(wallGeo, wallMat);
      wallBack.position.set(0, 1.9, -3.5);
      group.add(wallBack);
    }

    // Layer 3: Roof Truss & Slab (Missing in field!)
    if (activeLayer === 'ALL' || activeLayer === 'ROOF') {
      if (inspectMode === 'EXPECTED') {
        const roofGeo = new THREE.ConeGeometry(7, 2, 4);
        const roofMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.3 });
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.set(0, 5.5, 0);
        roof.rotation.y = Math.PI / 4;
        group.add(roof);
      } else if (inspectMode === 'DISCREPANCY') {
        const roofGeo = new THREE.ConeGeometry(7, 2, 4);
        const roofMat = new THREE.MeshBasicMaterial({
          color: 0xdc2626,
          wireframe: true,
          transparent: true,
          opacity: 0.6
        });
        const ghostRoof = new THREE.Mesh(roofGeo, roofMat);
        ghostRoof.position.set(0, 5.5, 0);
        ghostRoof.rotation.y = Math.PI / 4;
        group.add(ghostRoof);
      }
    }

    // Layer 4: Electrical & Plumbing conduit
    if (activeLayer === 'ALL' || activeLayer === 'ELECTRICAL') {
      const pipeGeo = new THREE.TorusGeometry(3.5, 0.08, 8, 24);
      const pipeMat = new THREE.MeshBasicMaterial({
        color: inspectMode === 'DISCREPANCY' ? 0xd97706 : 0x0d9488
      });
      const pipe = new THREE.Mesh(pipeGeo, pipeMat);
      pipe.rotation.x = Math.PI / 2;
      pipe.position.set(0, 3.8, 0);
      group.add(pipe);
    }

    // Orbit Animation
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      group.rotation.y = t * 0.2;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / 420;
      camera.updateProjectionMatrix();
      renderer.setSize(w, 420);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [activeLayer, inspectMode, selectedProject, themeMode]);

  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gov-200 dark:border-slate-800 rounded-xl p-5 shadow-gov space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gov-200 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <h3 className="text-xs font-bold text-gov-900 dark:text-white uppercase tracking-wider">
              3D Physical Asset Digital Twin: <span className="font-mono text-brand-600 dark:text-brand-400">{selectedProject.id}</span>
            </h3>
          </div>
          <p className="text-[11px] text-gov-500 dark:text-slate-400">
            CAD decomposition comparing DPR sanction design vs reported 75% vs verified 38% physical work.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-gov-100 dark:bg-slate-900 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setInspectMode('DISCREPANCY')}
            className={`px-3 py-1 rounded-md font-bold transition-all ${
              inspectMode === 'DISCREPANCY'
                ? 'bg-risk-critical text-white shadow-sm'
                : 'text-gov-600 dark:text-slate-400 hover:text-gov-900'
            }`}
          >
            ⚠️ Anomaly Discrepancy Overlay
          </button>
          <button
            onClick={() => setInspectMode('EXPECTED')}
            className={`px-3 py-1 rounded-md font-bold transition-all ${
              inspectMode === 'EXPECTED'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-gov-600 dark:text-slate-400 hover:text-gov-900'
            }`}
          >
            Sanctioned DPR Plan (100%)
          </button>
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div className="relative w-full h-[420px] rounded-lg overflow-hidden border border-gov-200 dark:border-slate-800 bg-gov-100/50 dark:bg-[#020611]">
        <div ref={containerRef} className="w-full h-full" />

        {/* Layer Filters on Canvas */}
        <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-1 rounded-lg border border-gov-200 dark:border-slate-800 text-xs shadow-sm">
          {(['ALL', 'FOUNDATION', 'FRAMING', 'ROOF', 'ELECTRICAL'] as const).map((layer) => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                activeLayer === layer
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-gov-600 dark:text-slate-400 hover:bg-gov-100 dark:hover:bg-slate-800'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>

        {/* Status Overlay Box */}
        <div className="absolute bottom-3 right-3 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-gov-200 dark:border-slate-800 p-3 rounded-lg text-xs space-y-1 max-w-xs shadow-gov">
          <div className="flex justify-between text-gov-600 dark:text-slate-400">
            <span>Reported Physical Progress:</span>
            <span className="font-bold text-risk-moderate">75.0%</span>
          </div>
          <div className="flex justify-between text-gov-900 dark:text-white">
            <span>Field-Verified Actual:</span>
            <span className="font-bold text-risk-critical">{selectedProject.physicalProgressPct}%</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-gov-200 dark:border-slate-800 text-[10px]">
            <span className="text-risk-critical font-bold">Deficit: -37% Physical Gap</span>
            <span className="text-gov-500 font-mono">Roof/Plaster Stalled</span>
          </div>
        </div>
      </div>

      {/* Structural Checklist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div className="bg-gov-50 dark:bg-slate-900 p-3 rounded-lg border border-gov-200 dark:border-slate-800 flex items-start gap-2">
          <CheckCircle2 className="w-4 h-4 text-risk-low shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-gov-900 dark:text-white">Plinth Substructure</h5>
            <p className="text-gov-500 dark:text-slate-400 text-[11px]">100% Cast & Cured. Verified by Geo-tagged photo PHT-01.</p>
          </div>
        </div>

        <div className="bg-gov-50 dark:bg-slate-900 p-3 rounded-lg border border-gov-200 dark:border-slate-800 flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-risk-moderate shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-gov-900 dark:text-white">RCC Columns & Brickwork</h5>
            <p className="text-gov-500 dark:text-slate-400 text-[11px]">4 of 6 columns cast. Brickwork halted at lintel level.</p>
          </div>
        </div>

        <div className="bg-gov-50 dark:bg-slate-900 p-3 rounded-lg border border-gov-200 dark:border-slate-800 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-risk-critical shrink-0 mt-0.5" />
          <div>
            <h5 className="font-bold text-gov-900 dark:text-white">Roof Slab & Finishing</h5>
            <p className="text-gov-500 dark:text-slate-400 text-[11px]">Unstarted despite 84.5% fund disbursement (₹24.5L).</p>
          </div>
        </div>
      </div>
    </div>
  );
};
