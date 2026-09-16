import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useProjects } from '../../context/ProjectContext';
import { Project } from '../../types';
import { Eye, Info, RotateCcw, ShieldAlert, Sparkles, Layers } from 'lucide-react';

export const RiskTerrain3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { filteredProjects, setSelectedProjectId, setActiveTab } = useProjects();
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'perspective' | 'top'>('perspective');

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#030914');
    scene.fog = new THREE.FogExp2('#030914', 0.015);

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 32, 42);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(60, 30, 0x0284c7, 0x0f2942);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Topo Base Platform
    const planeGeo = new THREE.PlaneGeometry(60, 60, 32, 32);
    const planeMat = new THREE.MeshStandardMaterial({
      color: 0x051329,
      roughness: 0.8,
      metalness: 0.2,
      wireframe: false
    });
    const ground = new THREE.Mesh(planeGeo, planeMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    ground.receiveShadow = true;
    scene.add(ground);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight.position.set(20, 40, 20);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xef4444, 3, 50);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);

    // Project Risk Pillars & Beacons
    const projectMeshes: { mesh: THREE.Mesh; project: Project }[] = [];
    const minLat = 8.0;
    const maxLat = 32.0;
    const minLng = 68.0;
    const maxLng = 90.0;

    filteredProjects.forEach((proj) => {
      // Map Lat/Lng to 3D grid coords
      const x = ((proj.lng - minLng) / (maxLng - minLng) - 0.5) * 44;
      const z = -((proj.lat - minLat) / (maxLat - minLat) - 0.5) * 44;

      const score = proj.riskSignals.totalScore;
      const height = Math.max(1.2, (score / 100) * 16);

      // Color selection
      let colorHex = 0x22c55e;
      if (score >= 75) colorHex = 0xef4444;
      else if (score >= 50) colorHex = 0xf97316;
      else if (score >= 30) colorHex = 0xeab308;

      const pillarGeo = new THREE.CylinderGeometry(0.5, 0.7, height, 16);
      const pillarMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: score >= 75 ? 0.6 : 0.2,
        roughness: 0.3,
        metalness: 0.7
      });

      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(x, height / 2, z);
      pillar.castShadow = true;
      pillar.receiveShadow = true;
      scene.add(pillar);

      // Beacon Top Sphere
      const sphereGeo = new THREE.SphereGeometry(0.65, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.9,
        wireframe: score >= 75
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(x, height + 0.5, z);
      scene.add(sphere);

      // Ring pulse for critical projects
      if (score >= 75) {
        const ringGeo = new THREE.RingGeometry(0.8, 1.4, 32);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0xef4444,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.7
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(x, 0.1, z);
        scene.add(ring);
      }

      projectMeshes.push({ mesh: pillar, project: proj });
    });

    // Raycasting for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(projectMeshes.map((p) => p.mesh));

      if (intersects.length > 0) {
        const matched = projectMeshes.find((p) => p.mesh === intersects[0].object);
        if (matched) {
          setHoveredProject(matched.project);
          container.style.cursor = 'pointer';
        }
      } else {
        setHoveredProject(null);
        container.style.cursor = 'default';
      }
    };

    const onClick = () => {
      if (hoveredProject) {
        setSelectedProjectId(hoveredProject.id);
        setActiveTab('evidence-explorer');
      }
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('click', onClick);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle scene rotation
      scene.rotation.y = Math.sin(elapsedTime * 0.15) * 0.1;

      // Pulse beacon lights
      pointLight.intensity = 2.5 + Math.sin(elapsedTime * 4) * 1.2;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('click', onClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.innerHTML = '';
    };
  }, [filteredProjects, viewMode]);

  return (
    <div className="relative w-full h-[480px] lg:h-[540px] rounded-2xl overflow-hidden border border-cyan-900/40 bg-gradient-to-b from-[#051329] to-[#020611] shadow-2xl">
      {/* 3D Canvas Viewport */}
      <div ref={containerRef} className="w-full h-full" />

      {/* 3D Overlay Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
        <div className="bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-cyan-200 uppercase tracking-wider">3D Risk Elevation Terrain</span>
        </div>
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700 px-2.5 py-1 rounded-lg text-xs text-slate-300">
          Height = Risk Index (0–100)
        </div>
      </div>

      {/* Legend Badge */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-4 py-2.5 rounded-xl flex items-center gap-4 text-xs shadow-xl">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
          <span className="text-slate-300">Critical (&ge;75)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-orange-500" />
          <span className="text-slate-300">High (50–74)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-slate-300">Moderate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-slate-300">Low</span>
        </div>
      </div>

      {/* Interactive Tooltip Card */}
      {hoveredProject && (
        <div className="absolute top-4 right-4 z-20 w-80 bg-slate-900/95 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-4 shadow-2xl text-slate-100 transition-all animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-2.5">
            <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 border border-cyan-800 px-2 py-0.5 rounded">
              {hoveredProject.id}
            </span>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded ${
                hoveredProject.riskSignals.tier === 'CRITICAL'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : hoveredProject.riskSignals.tier === 'HIGH'
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {hoveredProject.riskSignals.totalScore}/100 {hoveredProject.riskSignals.tier}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-white line-clamp-2 mb-1">
            {hoveredProject.title}
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            📍 {hoveredProject.district}, {hoveredProject.state}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs mb-3 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
            <div>
              <span className="text-slate-400 block text-[10px]">Sanction</span>
              <span className="font-mono font-bold text-cyan-300">₹{hoveredProject.sanctionedAmountLakhs}L</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Progress Gap</span>
              <span className="font-mono font-bold text-amber-400">
                +{hoveredProject.riskSignals.utilizationAnomaly.financialProgressGapPct}%
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedProjectId(hoveredProject.id);
              setActiveTab('evidence-explorer');
            }}
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-medium text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            Click to Open Investigation File
          </button>
        </div>
      )}
    </div>
  );
};
