/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useSound } from "../hooks/useSound";

interface AICoreProps {
  scrollProgress?: number; // Normalized scroll position (0 to 1)
  interactive?: boolean;
}

export function AICore({ scrollProgress = 0, interactive = true }: AICoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useSound();

  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, active: false, clickPulse: 0 });
  const cameraRotationRef = useRef({ x: 0, y: 0, rx: 0.002, ry: 0.003 });

  // Handle interaction trigger sound
  const handleMouseEnter = () => {
    setHovered(true);
    playHover();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    mouseRef.current.active = false;
  };

  const handleMouseDown = () => {
    setClicked(true);
    playClick();
    mouseRef.current.clickPulse = 1.5; // Trigger a large energy flash pulse
    setTimeout(() => setClicked(false), 300);
  };

  // Capture mouse coordinates relative to canvas center
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Update target positions for spring dampening
      mouseRef.current.tx = x;
      mouseRef.current.ty = y;
      mouseRef.current.active = true;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = containerRef.current?.clientWidth || 550);
    let height = (canvas.height = containerRef.current?.clientHeight || 550);

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = containerRef.current.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // 3D Point Interface
    interface Point3D {
      x: number;
      y: number;
      z: number;
      ox: number; // Original x
      oy: number; // Original y
      oz: number; // Original z
      px: number; // Projected screen x
      py: number; // Projected screen y
      scale: number;
      alpha: number;
      color: string;
      speed: number;
    }

    // Generate core spherical particles (Neural Network cluster)
    const particleCount = 180;
    const coreParticles: Point3D[] = [];
    const sphereRadius = 140;

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution for uniform sphere shell points
      const theta = Math.acos(-1 + (2 * i) / particleCount);
      const phi = Math.sqrt(particleCount * Math.PI) * theta;

      const x = sphereRadius * Math.sin(theta) * Math.cos(phi);
      const y = sphereRadius * Math.sin(theta) * Math.sin(phi);
      const z = sphereRadius * Math.cos(theta);

      const colorRand = Math.random();
      const color = colorRand > 0.70 ? "#6366f1" : colorRand > 0.35 ? "#f97316" : "#ffffff";

      coreParticles.push({
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        px: 0,
        py: 0,
        scale: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.5,
        color,
        speed: Math.random() * 0.02 + 0.005,
      });
    }

    // Orbit Ring Points
    interface OrbitRing {
      particles: Point3D[];
      tiltX: number;
      tiltY: number;
      tiltZ: number;
      radius: number;
      color: string;
      spinSpeed: number;
      offsetPhase: number;
    }

    const ringCount = 3;
    const orbitRings: OrbitRing[] = [];
    const ringColors = ["#6366f1", "#f97316", "#00f0ff"];
    const ringRadii = [190, 230, 270];
    const ringSpeeds = [0.004, -0.0025, 0.0035];
    const ringTilts = [
      { x: 0.6, y: 0.4, z: 0.2 },
      { x: -0.4, y: 0.8, z: -0.3 },
      { x: 0.2, y: -0.5, z: 0.7 },
    ];

    for (let r = 0; r < ringCount; r++) {
      const ringPts: Point3D[] = [];
      const ringPtsCount = 60;
      const radius = ringRadii[r];

      for (let i = 0; i < ringPtsCount; i++) {
        const angle = (i / ringPtsCount) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const y = 0;
        const z = radius * Math.sin(angle);

        ringPts.push({
          x,
          y,
          z,
          ox: x,
          oy: y,
          oz: z,
          px: 0,
          py: 0,
          scale: Math.random() * 1.5 + 1,
          alpha: Math.random() * 0.4 + 0.6,
          color: ringColors[r],
          speed: ringSpeeds[r],
        });
      }

      orbitRings.push({
        particles: ringPts,
        tiltX: ringTilts[r].x,
        tiltY: ringTilts[r].y,
        tiltZ: ringTilts[r].z,
        radius,
        color: ringColors[r],
        spinSpeed: ringSpeeds[r],
        offsetPhase: Math.random() * Math.PI * 2,
      });
    }

    // Perspective parameters
    const focalLength = 400;
    let time = 0;

    // Projection math function
    const project = (point: Point3D, rotX: number, rotY: number, transY: number = 0) => {
      // 1. Rotate on Y-axis (orbital camera)
      let x1 = point.x * Math.cos(rotY) - point.z * Math.sin(rotY);
      let z1 = point.x * Math.sin(rotY) + point.z * Math.cos(rotY);
      let y1 = point.y;

      // 2. Rotate on X-axis (pitch camera)
      let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
      let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);
      let x2 = x1;

      // Camera focal adjustment
      const camZ = z2 + 450; // Distance of core from screen
      const scale = focalLength / camZ;

      point.px = x2 * scale + width / 2;
      point.py = (y2 + transY) * scale + height / 2;
      point.scale = Math.max(0.5, scale * 2.2);
    };

    // Render loop
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse spring movement
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      if (mouse.clickPulse > 0.05) {
        mouse.clickPulse -= 0.05;
      } else {
        mouse.clickPulse = 0;
      }

      // Camera system continuously orbits
      const rotY = time * 0.15 + (mouse.x * 0.001) + (scrollProgress * Math.PI);
      const rotX = Math.sin(time * 0.05) * 0.15 + (mouse.y * 0.001);

      // Scroll storytelling translation shifts the core up or down slightly
      const scrollShiftY = Math.sin(scrollProgress * Math.PI) * 40;

      // --- Draw Outer Orbiting Rings (rendered first) ---
      orbitRings.forEach((ring, ringIdx) => {
        // Increment rotation along its own axis
        ring.offsetPhase += ring.spinSpeed;

        ring.particles.forEach((pt, idx) => {
          // Angle of particle along the ring
          const baseAngle = (idx / ring.particles.length) * Math.PI * 2 + ring.offsetPhase;
          
          // Re-calculate local coords relative to tilt
          const cosB = Math.cos(baseAngle);
          const sinB = Math.sin(baseAngle);

          // Rotate local ring coordinate by tiltX, tiltY, tiltZ
          let lx = ring.radius * cosB;
          let ly = 0;
          let lz = ring.radius * sinB;

          // Apply ring specific tilt rotations
          // Tilt X
          let ly1 = ly * Math.cos(ring.tiltX) - lz * Math.sin(ring.tiltX);
          let lz1 = ly * Math.sin(ring.tiltX) + lz * Math.cos(ring.tiltX);
          // Tilt Y
          let lx2 = lx * Math.cos(ring.tiltY) - lz1 * Math.sin(ring.tiltY);
          let lz2 = lx * Math.sin(ring.tiltY) + lz1 * Math.cos(ring.tiltY);

          pt.x = lx2;
          pt.y = ly1;
          pt.z = lz2;

          // Interactive mouse gravity pull
          if (mouse.active && interactive) {
            const dx = mouse.x - pt.px;
            const dy = mouse.y - pt.py;
            const dist = Math.hypot(dx, dy);
            if (dist < 150) {
              const pull = (150 - dist) * 0.06;
              pt.x += (dx / dist) * pull;
              pt.y += (dy / dist) * pull;
            }
          }

          project(pt, rotX, rotY, scrollShiftY);

          // Draw ring particles
          const alpha = Math.max(0.1, pt.alpha * (hovered ? 0.95 : 0.65) * (pt.z + 300) / 600);
          ctx.beginPath();
          ctx.arc(pt.px, pt.py, pt.scale * (hovered ? 1.4 : 1.0), 0, Math.PI * 2);
          ctx.fillStyle = ring.color;
          ctx.globalAlpha = alpha;
          ctx.shadowBlur = hovered ? 12 : 5;
          ctx.shadowColor = ring.color;
          ctx.fill();
        });

        ctx.shadowBlur = 0; // reset
      });

      // --- Draw Core Neural Cluster ---
      // Apply noise distortion to create an organic, evolving feel
      coreParticles.forEach((pt, idx) => {
        // Oscillating noise effect based on trigonometric fields
        const noiseFreq = theta => Math.sin(theta * 5 + time * 1.5) * 6;
        const noiseVal = noiseFreq(idx);

        // Perturb position
        pt.x = pt.ox + Math.sin(time + idx) * (hovered ? 8 : 4);
        pt.y = pt.oy + Math.cos(time * 0.8 + idx) * (hovered ? 8 : 4);
        pt.z = pt.oz + Math.sin(time * 1.2 + idx) * (hovered ? 8 : 4);

        // Pull core particles slightly towards mouse on hover
        if (mouse.active && interactive) {
          const dx = mouse.x - pt.px;
          const dy = (mouse.y + scrollShiftY) - pt.py;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            const pull = (120 - dist) * 0.08;
            pt.x += (dx / dist) * pull;
            pt.y += (dy / dist) * pull;
          }
        }

        project(pt, rotX, rotY, scrollShiftY);
      });

      // Depth sort particles so we draw back-to-front
      coreParticles.sort((a, b) => b.z - a.z);

      // Neural connection lines (draw only close-by connections)
      ctx.globalAlpha = hovered ? 0.09 : 0.045;
      ctx.lineWidth = 0.5;
      const lineDistLimit = 55;

      for (let i = 0; i < coreParticles.length; i += 2) {
        const p1 = coreParticles[i];
        for (let j = i + 1; j < Math.min(i + 12, coreParticles.length); j++) {
          const p2 = coreParticles[j];
          const dist3D = Math.hypot(p1.x - p2.x, p1.y - p2.y, p1.z - p2.z);

          if (dist3D < lineDistLimit) {
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            // Dynamic gradient between connection points
            ctx.strokeStyle = p1.z > 0 ? "rgba(99, 102, 241, 0.5)" : "rgba(249, 115, 22, 0.5)";
            ctx.stroke();
          }
        }
      }

      // Draw Sphere Shell points
      coreParticles.forEach((pt) => {
        const alpha = Math.max(0.1, pt.alpha * (pt.z + sphereRadius) / (sphereRadius * 2));
        ctx.beginPath();
        ctx.arc(pt.px, pt.py, pt.scale, 0, Math.PI * 2);
        
        // Evolving core color shift
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
      });

      // --- Draw Center Living Plasma Core ---
      // Draw a glowing gradient field at the center representing AI energy
      const centerScale = (hovered ? 1.25 : 1.0) + mouse.clickPulse + Math.sin(time * 3.5) * 0.04;
      const coreX = width / 2;
      const coreY = height / 2 + scrollShiftY;
      const coreRad = 60 * centerScale;

      const gradient = ctx.createRadialGradient(
        coreX, coreY, 2,
        coreX, coreY, coreRad
      );

      // Pulsing glows
      const primaryColor = hovered ? "rgba(249, 115, 22, 0.95)" : "rgba(99, 102, 241, 0.95)";
      const secondaryColor = hovered ? "rgba(99, 102, 241, 0.6)" : "rgba(249, 115, 22, 0.5)";

      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.2, primaryColor);
      gradient.addColorStop(0.65, secondaryColor);
      gradient.addColorStop(1, "rgba(2, 2, 3, 0)");

      ctx.beginPath();
      ctx.arc(coreX, coreY, coreRad, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.92;
      ctx.fill();

      // Additional dynamic lighting bloom circles
      ctx.beginPath();
      ctx.arc(coreX, coreY, coreRad * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = hovered ? "rgba(249, 115, 22, 0.08)" : "rgba(99, 102, 241, 0.06)";
      ctx.globalAlpha = 0.45;
      ctx.fill();

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [hovered, interactive, scrollProgress]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block mix-blend-screen drop-shadow-[0_0_50px_rgba(156,84,255,0.15)]"
      />

      {/* Futuristic Floating UI HUD Rings surrounding the AI core */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          className={`absolute rounded-full border border-brand-orange/20 w-[420px] h-[420px] transition-all duration-700 ${
            hovered ? "scale-105 border-brand-orange/45 opacity-100" : "opacity-40"
          }`}
          style={{ borderStyle: "dashed" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute rounded-full border border-brand-indigo/20 w-[300px] h-[300px] transition-all duration-700 ${
            hovered ? "scale-95 border-brand-indigo/40 opacity-80" : "opacity-35"
          }`}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute flex flex-col items-center justify-center text-center opacity-0 hover:opacity-100 transition-opacity duration-500 bg-[#020203]/90 border border-indigo-500/30 backdrop-blur-md px-4 py-2.5 rounded-lg text-xs font-mono select-none">
          <span className="text-indigo-400 font-bold uppercase tracking-wider">MAX-CORE V2.6</span>
          <span className="text-slate-400 mt-1">LIVING GRAPH NODE MATRIX</span>
          <span className="text-brand-orange mt-0.5 animate-pulse">● SYNAPSE CONNECTED</span>
        </div>
      </div>
    </div>
  );
}
