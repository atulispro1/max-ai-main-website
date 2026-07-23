/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function Backdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle mouse move to shift gradient highlights (skip on touch devices)
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (clientX / innerWidth - 0.5) * 40,
        y: (clientY / innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Soft interactive starry matrix in canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Core star particles
    interface Star {
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;
      growing: boolean;
      color: string;
    }

    const starsCount = window.innerWidth < 768 ? 25 : 60;
    const stars: Star[] = [];

    // Initialize stars with slightly varying digital tones
    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.05 + 0.01,
        alpha: Math.random(),
        growing: Math.random() > 0.5,
        color: Math.random() > 0.6 ? "#6366f1" : Math.random() > 0.5 ? "#f97316" : "#ffffff",
      });
    }

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw cyber stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Animate alpha
        if (star.growing) {
          star.alpha += star.speed;
          if (star.alpha >= 1) star.growing = false;
        } else {
          star.alpha -= star.speed;
          if (star.alpha <= 0.1) star.growing = true;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha * 0.45;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full -z-10 bg-[#020203] overflow-hidden select-none pointer-events-none"
    >
      {/* Canvas for fine digital stars */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Dynamic Ambient Aurora Glow 1 - Deep Indigo (Immersive UI specification) */}
      <motion.div
        className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-950/40 blur-[130px]"
        animate={{
          x: mousePos.x * 1.5,
          y: mousePos.y * 1.5,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 40 }}
      />

      {/* Dynamic Ambient Aurora Glow 2 - Deep Orange (Immersive UI specification) */}
      <motion.div
        className="absolute bottom-[-10%] right-[-5%] w-[550px] h-[550px] rounded-full bg-orange-950/20 blur-[120px]"
        animate={{
          x: -mousePos.x * 1.8,
          y: -mousePos.y * 1.8,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 40 }}
      />

      {/* Dynamic Ambient Aurora Glow 3 - Violet/Purple ambient glow */}
      <motion.div
        className="absolute top-[40%] left-[30%] w-[450px] h-[450px] rounded-full bg-purple-950/20 blur-[110px]"
        animate={{
          x: mousePos.y * 0.9,
          y: -mousePos.x * 0.9,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 40 }}
      />

      {/* Immersive UI Radial Dot Matrix Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, #ffffff11 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }}
      />

      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />

      {/* Depth vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020203]/40 to-[#020203] opacity-100" />
    </div>
  );
}
