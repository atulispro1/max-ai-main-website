/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, MouseEvent } from "react";
import { motion } from "motion/react";
import { useSound } from "../hooks/useSound";
import { Award, Code, Cpu, ShieldCheck } from "lucide-react";
import atulPhoto from "../assets/images/atul.png";

export function FounderSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useSound();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rx = ((y / height) - 0.5) * -12;
    const ry = ((x / width) - 0.5) * 12;

    setTilt({ x: rx, y: ry });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="founder" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#030308]/40 to-transparent">
      {/* Ambient glows */}
      <div className="absolute top-[30%] left-[5%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-orange-600/10 blur-[130px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 font-mono uppercase tracking-[0.2em] font-bold mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
          >
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            FOUNDER PROFILE
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white"
          >
            Behind the Creation of Max AI
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-slate-400 max-w-2xl mx-auto font-light"
          >
            Meet the lead systems engineer and designer who architected the screen-understanding engine, local VM sandbox execution, and zero-latency duplex audio pipelines of Max AI.
          </motion.p>
        </div>

        {/* Founder Split View Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          
          {/* Left: 3D Tilt Holographic Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => playHover()}
              style={{
                transformStyle: "preserve-3d",
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              }}
              className="interactive-card relative w-full max-w-[360px] rounded-3xl p-6 bg-gradient-to-b from-white/[0.06] to-slate-950/80 border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.15)] cursor-grab active:cursor-grabbing transition-all duration-300 hover:border-indigo-500/40 overflow-hidden"
            >
              {/* Photo Glow Backdrop */}
              <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-36 h-36 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />

              {/* Profile Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-6 group">
                <img
                  src={atulPhoto}
                  alt="Atul Sharma"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-950/90 border border-indigo-500/40 backdrop-blur-md text-[10px] font-mono font-bold text-indigo-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    FOUNDER & ARCHITECT
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 select-none">BUILD 2026.1</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                  Atul Sharma
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <Code className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-semibold font-mono text-indigo-400">
                    Creator of Max AI
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-3 pt-3 border-t border-white/5 text-center sm:text-left uppercase tracking-wider">
                  SYSTEMS ENGINEERING & AI DESIGN
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Story Narrative & Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 text-left space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-display font-bold text-3xl text-white tracking-tight">
                Engineering a Seamless Human-AI OS
              </h3>
              
              <p className="text-slate-300 text-base leading-relaxed font-sans font-light">
                Driven by a vision of complete context continuity, Atul Sharma engineered Max AI from the ground up to solve the friction of traditional AI tools. By pairing live 120FPS spatial viewport scanning with secure local VM automation, Max AI transforms how developers and power users interact with their operating systems.
              </p>
              
              <p className="text-slate-400 text-sm leading-relaxed font-sans font-light">
                Under Atul's systems direction, Max AI features low-latency 24ms duplex audio, automated file pipeline orchestration, and persistent semantic long-term memory graph networks across all sessions.
              </p>
            </div>

            {/* Founder Quote */}
            <div className="p-6 rounded-2xl bg-indigo-500/[0.03] border border-indigo-500/20 text-slate-300 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-orange-400" />
              <p className="text-sm italic text-slate-200 leading-relaxed font-sans">
                "True product craft lies in removing latency and cognitive friction. Max AI isn't just another text prompt — it is a spatial companion that perceives your screen, executes tasks natively, and evolves with your context."
              </p>
              <div className="mt-4 text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                <span>— Atul Sharma</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Founder & Lead Systems Creator</span>
              </div>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-0.5">Spatial UI Scanner</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Pioneered screen layout coordinate parsing algorithms.</p>
                </div>
              </div>

              <div className="flex gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-0.5">Sandboxed VM Runtime</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Built safe local execution containers for terminal commands.</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
