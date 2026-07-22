/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useSound } from "../hooks/useSound";
import { X, Check, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

interface ComparisonRow {
  criteria: string;
  traditional: string;
  max: string;
  isImportant: boolean;
}

const COMPARISONS: ComparisonRow[] = [
  {
    criteria: "Context Memory",
    traditional: "Forgets details the moment the session closes",
    max: "Evolving context memory network spanning years",
    isImportant: true,
  },
  {
    criteria: "Desktop Execution",
    traditional: "Only answers text, cannot modify environment",
    max: "Directly runs localVM compiling, testing, and clicks",
    isImportant: false,
  },
  {
    criteria: "Screen Vision",
    traditional: "Accepts static uploads, cannot trace layouts",
    max: "120FPS live viewport capture and structure auditing",
    isImportant: true,
  },
  {
    criteria: "Voice Latency",
    traditional: "2000ms+ laggy, robotic voice synthesizers",
    max: "24ms duplex conversation with spatial tones",
    isImportant: false,
  },
  {
    criteria: "Task Reasoning",
    traditional: "Gives up if first response hits compilation error",
    max: "Self-reflects and debugs iteratively in sandbox",
    isImportant: true,
  },
];

export function WhyMax() {
  const { playHover } = useSound();

  return (
    <section id="why-max" className="py-24 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-pink/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-pink/30 bg-brand-pink/5 text-xs text-brand-pink glow-text-pink font-mono uppercase tracking-wider mb-4"
          >
            <ShieldCheck className="w-3.5 h-3.5 animate-pulse text-brand-cyan" />
            COMPETITIVE MATRIX
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4"
          >
            The Generational Leap
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400"
          >
            Stop typing commands into flat chat windows. Max AI integrates directly into your native OS, bringing continuous execution and spatial perception.
          </motion.p>
        </div>

        {/* Comparison grid wrapper */}
        <div className="max-w-5xl mx-auto glass-panel rounded-3xl border border-white/5 overflow-hidden bg-slate-950/40 relative">
          
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-white/5 bg-[#0b0821] p-6 text-sm font-mono tracking-widest font-bold uppercase text-slate-400 gap-4">
            <div className="md:col-span-4 text-left flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-cyan" /> CRITERIA_METRIC
            </div>
            <div className="md:col-span-4 text-left flex items-center gap-2 text-rose-400/80">
              <X className="w-4 h-4" /> TRADITIONAL CHAT ASSISTANT
            </div>
            <div className="md:col-span-4 text-left flex items-center gap-2 text-brand-cyan">
              <Sparkles className="w-4 h-4 text-brand-purple animate-pulse" /> MAX AI SYSTEM
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-white/5">
            {COMPARISONS.map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onMouseEnter={() => playHover()}
                className={`grid grid-cols-1 md:grid-cols-12 p-6 gap-4 items-center transition-all duration-300 hover:bg-white/[0.015] ${
                  row.isImportant ? "relative bg-brand-purple/[0.01]" : ""
                }`}
              >
                {/* Criteria */}
                <div className="md:col-span-4 text-left">
                  <span className="font-display font-semibold text-white block">
                    {row.criteria}
                  </span>
                  {row.isImportant && (
                    <span className="inline-block mt-1 text-[9px] font-mono text-brand-cyan uppercase bg-brand-cyan/10 px-1.5 py-0.5 rounded border border-brand-cyan/20">
                      Core Paradigm
                    </span>
                  )}
                </div>

                {/* Traditional */}
                <div className="md:col-span-4 text-left flex items-start gap-2.5 text-slate-500 text-sm font-sans">
                  <div className="w-5 h-5 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3 h-3 text-rose-500" />
                  </div>
                  <span>{row.traditional}</span>
                </div>

                {/* Max AI */}
                <div className="md:col-span-4 text-left flex items-start gap-2.5 text-slate-200 text-sm font-sans font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_10px_rgba(0,240,255,0.15)]">
                    <Check className="w-3 h-3 text-brand-cyan font-extrabold" />
                  </div>
                  <span className="text-white group-hover:text-brand-cyan transition-colors duration-300">
                    {row.max}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Core Callout Footnote */}
          <div className="p-6 bg-slate-900/40 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-slate-400">
            <div className="flex items-center gap-2 text-left">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
              <span>Full compliance verified on sandboxed virtual machine platforms (2026 build).</span>
            </div>
            <a
              href="#download"
              className="font-mono text-[10px] text-brand-cyan hover:text-white flex items-center gap-1 uppercase tracking-widest transition-all duration-300"
            >
              Get started now <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
