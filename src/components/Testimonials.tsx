/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, MouseEvent } from "react";
import { motion } from "motion/react";
import { useSound } from "../hooks/useSound";
import { Star, ShieldCheck, Sparkles, Cpu, Award, Code, GraduationCap } from "lucide-react";
import atulSharmaPhoto from "../assets/images/atul_sharma_1784120840628.jpg";

export function Testimonials() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useSound();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Smooth 3D tilt calculations
    const rx = ((y / height) - 0.5) * -10;
    const ry = ((x / width) - 0.5) * 10;

    setTilt({ x: rx, y: ry });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-[#030306]/20 to-transparent">
      {/* Decorative ambient background lights */}
      <div className="absolute top-[30%] left-[5%] w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[130px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-orange-500/5 blur-[120px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs text-indigo-400 glow-text-purple font-mono uppercase tracking-[0.2em] font-semibold mb-4"
          >
            <Award className="w-3.5 h-3.5" />
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
            Meet the lead systems engineer and designer who pioneered the screen-understanding logic, local VM compilations, and zero-latency audio structures of Max AI.
          </motion.p>
        </div>

        {/* Founder Immersive Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
          
          {/* Left Side: 3D Holographic Portrait Card */}
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
              className="interactive-card relative w-full max-w-[340px] rounded-3xl p-6 bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 shadow-[0_0_50px_rgba(99,102,241,0.08)] cursor-grab active:cursor-grabbing transition-shadow duration-300 hover:border-indigo-500/30 overflow-hidden"
            >
              {/* Glow Behind Portrait */}
              <div className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />

              {/* Founder Image Wrapper */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/5 shadow-inner mb-6 group">
                <img
                  src={atulSharmaPhoto}
                  alt="Atul Sharma"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Visual Scanning Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-950/80 border border-indigo-500/30 backdrop-blur-md text-[9px] font-mono font-bold text-indigo-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                    SYSTEMS LEAD
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 select-none">ID: SYS_CREATOR_718</span>
                </div>
              </div>

              {/* Title & Name */}
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                  Atul Sharma
                </h3>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <Code className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-sm font-semibold font-mono text-indigo-400">
                    Creator of Max AI
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-2 pt-2 border-t border-white/5 text-center sm:text-left">
                  ARCHITECTING SYSTEM CORES
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Detailed Narrative and Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 text-left space-y-6"
          >
            <div className="space-y-4">
              <h3 className="font-display font-bold text-3xl text-white tracking-tight">
                Crafting the Intelligent Operating Companion
              </h3>
              
              <p className="text-slate-300 text-base leading-relaxed font-sans font-light">
                As the lead systems designer, Atul Sharma envisioned and engineered the entirety of Max AI. Combining direct screen-analysis heuristics with secure sandboxed container micro-VMs, his objective was to eliminate complex workflow bottlenecks for builders and designers.
              </p>
              
              <p className="text-slate-400 text-sm leading-relaxed font-sans font-light">
                Under Atul's core leadership, Max AI has expanded to process direct duplex audio pipelines with an incredible 24ms timing index. He has optimized every compile and layout synchronization, making sure that what once took minutes now takes milliseconds.
              </p>
            </div>

            {/* Quote Block */}
            <div className="p-5 rounded-2xl bg-indigo-500/[0.02] border border-indigo-500/10 text-slate-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-indigo-500 to-orange-400" />
              <p className="text-sm italic text-slate-300 leading-relaxed font-sans">
                "True design and engineering craftsmanship isn't achieved by piling on features. It lies in absolute latency elimination, visually consistent layout scanning, and building code compilers that flow seamlessly with developer intention."
              </p>
              <div className="mt-3 text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest">
                — Atul Sharma, Founder & Systems Creator
              </div>
            </div>

            {/* Core Architectural Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-0.5">Layout Scan Engine</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Pioneered the 99.8% precision screen scanning algorithms.</p>
                </div>
              </div>

              <div className="flex gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-0.5">Sandboxed Compiler</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">Designed secure container micro-VM runtimes for compilation.</p>
                </div>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
