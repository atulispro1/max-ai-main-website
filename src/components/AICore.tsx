/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useSound } from "../hooks/useSound";

interface AICoreProps {
  scrollProgress?: number;
  interactive?: boolean;
}

export function AICore({ scrollProgress = 0, interactive = true }: AICoreProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useSound();
  const [hovered, setHovered] = useState(false);
  const [loading, setLoading] = useState(true);

  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Append Three.js canvas alongside React-rendered children
    container.appendChild(renderer.domElement);

    // 4. Lighting setup (Studio Glow & Dynamic Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x6366f1, 3.5); // Indigo main light
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 4.0); // Cyan rim light
    cyanRimLight.position.set(-5, 3, -4);
    scene.add(cyanRimLight);

    const orangeAccentLight = new THREE.PointLight(0xf97316, 3.0, 10); // Orange glowing core
    orangeAccentLight.position.set(0, -1, 2);
    scene.add(orangeAccentLight);

    // 5. Create Holographic Orbiting Rings
    const createRing = (radius: number, colorHex: number, tiltX: number, tiltY: number) => {
      const geometry = new THREE.TorusGeometry(radius, 0.02, 16, 100);
      const material = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.8,
        roughness: 0.2,
        metalness: 0.8,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      scene.add(ring);
      return ring;
    };

    const ring1 = createRing(2.2, 0x00f0ff, Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(2.6, 0x8b5cf6, -Math.PI / 4, Math.PI / 4);
    const ring3 = createRing(3.0, 0xff2a85, Math.PI / 6, -Math.PI / 3);

    // 6. Particle Field System (fewer on mobile for performance)
    const particleCount = window.innerWidth < 768 ? 80 : 250;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const r = (Math.random() * 2 + 1.8);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);

      const color = new THREE.Color(
        Math.random() > 0.5 ? 0x00f0ff : Math.random() > 0.5 ? 0x8b5cf6 : 0xf97316
      );
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 7. Load GLB Model
    let robotGroup = new THREE.Group();
    scene.add(robotGroup);

    const loader = new GLTFLoader();
    loader.load(
      "/model.glb",
      (gltf) => {
        const model = gltf.scene;

        // Auto center & scale bounding box
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / maxDim;
        model.scale.set(scale, scale, scale);
        model.position.sub(center.multiplyScalar(scale));

        // Enhance materials
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.metalness = Math.max(0.4, mat.metalness || 0.5);
              mat.roughness = Math.min(0.4, mat.roughness || 0.3);
            }
          }
        });

        robotGroup.add(model);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading model.glb:", error);
        setLoading(false);
      }
    );

    // 8. Event listeners for mouse & touch interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current.targetX = x;
        mouseRef.current.targetY = y;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 9. Animation Loop
    let timer = new THREE.Timer();
    let animId: number;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(animId);
    };

    const canvasEl = renderer.domElement;
    canvasEl.addEventListener("webglcontextlost", handleContextLost, false);

    const animate = () => {
      animId = requestAnimationFrame(animate);
      try {
        const elapsedTime = timer.getElapsed();

        // Smooth mouse spring dampening
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // Robot floating & rotation tracking
        if (robotGroup) {
          // Floating sinusoidal hover
          robotGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.12 + Math.sin(scrollProgress * Math.PI) * 0.3;
          
          // Interactive tilt towards mouse/finger
          robotGroup.rotation.y = mx * 0.6 + Math.sin(elapsedTime * 0.5) * 0.1;
          robotGroup.rotation.x = -my * 0.4;
        }

        // Rotate Orbiting Rings
        ring1.rotation.z = elapsedTime * 0.4;
        ring1.rotation.y = Math.PI / 6 + elapsedTime * 0.2;

        ring2.rotation.z = -elapsedTime * 0.3;
        ring2.rotation.x = -Math.PI / 4 + elapsedTime * 0.15;

        ring3.rotation.y = -elapsedTime * 0.5;

        // Rotate Particle System
        particleSystem.rotation.y = elapsedTime * 0.08 + mx * 0.2;
        particleSystem.rotation.x = my * 0.2;

        renderer.render(scene, camera);
      } catch (err) {
        console.error("Render loop error in AICore:", err);
      }
    };

    animate();

    return () => {
      canvasEl.removeEventListener("webglcontextlost", handleContextLost);
      window.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container.contains(canvasEl)) {
        container.removeChild(canvasEl);
      }
      renderer.dispose();
    };
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        setHovered(true);
        playHover();
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => playClick()}
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none"
    >
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-md rounded-3xl z-20">
          <div className="w-10 h-10 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin shadow-[0_0_15px_#00f0ff]" />
          <span className="text-xs font-mono text-indigo-300 uppercase tracking-widest animate-pulse">
            LOADING 3D ROBOT CORE...
          </span>
        </div>
      )}

      {/* Floating UI HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
        <motion.div
          className={`absolute rounded-full border border-brand-orange/20 w-[420px] h-[420px] transition-all duration-700 ${
            hovered ? "scale-105 border-brand-orange/45 opacity-100" : "opacity-40"
          }`}
          style={{ borderStyle: "dashed" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute rounded-full border border-brand-cyan/20 w-[310px] h-[310px] transition-all duration-700 ${
            hovered ? "scale-95 border-brand-cyan/40 opacity-80" : "opacity-35"
          }`}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}
