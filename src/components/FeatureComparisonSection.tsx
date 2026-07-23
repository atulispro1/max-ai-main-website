/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSound } from "../hooks/useSound";
import { Check, X, Sparkles, Monitor, Globe, Smartphone, ShieldCheck, Zap } from "lucide-react";

interface ComparisonFeature {
  category: string;
  featureName: string;
  description: string;
  desktop: boolean | string;
  web: boolean | string;
  android: boolean | string;
  highlight?: boolean;
}

const COMPARISON_DATA: ComparisonFeature[] = [
  // Flagship OS & Automation
  {
    category: "OS & Desktop Integration",
    featureName: "Native Windows Desktop App",
    description: "Installer (.exe / .msi) with background server, auto-start, & deep links",
    desktop: true,
    web: false,
    android: false,
    highlight: true,
  },
  {
    category: "OS & Desktop Integration",
    featureName: "Native Application Launcher",
    description: "Launches 30+ Windows applications, browsers, terminals, & system tools",
    desktop: "30+ Apps",
    web: false,
    android: "App Intents",
    highlight: true,
  },
  {
    category: "OS & Desktop Integration",
    featureName: "Sandboxed Local File Manager",
    description: "Search, create, rename, copy, move, and delete files inside safe user directories",
    desktop: true,
    web: false,
    android: "Cloud Files",
  },
  {
    category: "OS & Desktop Integration",
    featureName: "Process Manager & System Metrics",
    description: "Real-time monitor for CPU %, Memory RAM, Disk, Battery, & Windows processes",
    desktop: true,
    web: false,
    android: "Battery & Storage",
  },
  {
    category: "OS & Desktop Integration",
    featureName: "Always-On-Top Floating Orb Widget",
    description: "Transparent 3D widget with animated waveform, mic toggle, & camera trigger",
    desktop: true,
    web: false,
    android: false,
    highlight: true,
  },

  // Audio & Voice Mode
  {
    category: "Voice & Audio Synthesis",
    featureName: "Duplex WebSocket Live Audio Mode",
    description: "24ms ultra-low latency real-time voice conversations with interruption detection",
    desktop: true,
    web: true,
    android: true,
    highlight: true,
  },
  {
    category: "Voice & Audio Synthesis",
    featureName: "Custom Voice & TTS Synthesizer",
    description: "Gemini / Cloud TTS backend streaming PCM wrapped WAV audio player",
    desktop: true,
    web: true,
    android: true,
  },

  // Spatial Perception & Vision
  {
    category: "Vision & Spatial Perception",
    featureName: "Live Screen Layout Understanding",
    description: "120FPS real-time viewport capture, auditing UI layout coordinates & code",
    desktop: "Multi-Monitor",
    web: "Web ScreenShare",
    android: false,
    highlight: true,
  },
  {
    category: "Vision & Spatial Perception",
    featureName: "Camera Vision QA",
    description: "Translates workspace surroundings, whiteboards, & physical environments",
    desktop: true,
    web: true,
    android: true,
  },
  {
    category: "Vision & Spatial Perception",
    featureName: "Native Document Intelligence Engine",
    description: "Deep text extraction for .docx, .pptx, .xlsx, .pdf, .txt, .json, .csv, & code",
    desktop: "Native .NET XML",
    web: "Web Parser",
    android: "Mobile Picker",
    highlight: true,
  },

  // Autonomous Intelligence
  {
    category: "Autonomous Intelligence",
    featureName: "OWL Multi-Step Planner Agent",
    description: "Decomposes complex goals into sequential execution steps with self-reflection",
    desktop: true,
    web: true,
    android: true,
    highlight: true,
  },
  {
    category: "Autonomous Intelligence",
    featureName: "Deep Research Engine",
    description: "Multi-query expansion, structured citation trees, & floating insight cards",
    desktop: "Floating Widgets",
    web: "In-Chat View",
    android: "Mobile View",
    highlight: true,
  },
  {
    category: "Autonomous Intelligence",
    featureName: "Persistent Long-Term Memory Network",
    description: "Semantic graph memory extracting facts, preferences, & habits across sessions",
    desktop: true,
    web: true,
    android: "MMKV + Cloud",
    highlight: true,
  },
  {
    category: "Autonomous Intelligence",
    featureName: "Signature Hinglish AI Personality",
    description: "Witty, samjhdar, dramatic, & playful roasting with permanent creator knowledge",
    desktop: true,
    web: true,
    android: true,
  },

  // Security & Cloud Sync
  {
    category: "Security & Cloud Architecture",
    featureName: "Zero-Knowledge OAuth 2.0 Auth",
    description: "Google OAuth 2.0 authentication with automatic Supabase DB sync",
    desktop: true,
    web: true,
    android: true,
  },
  {
    category: "Security & Cloud Architecture",
    featureName: "Sandbox VM Container Protection",
    description: "Path traversal restriction (isPathAllowed) & URL protocol whitelisting",
    desktop: true,
    web: "Browser Sandbox",
    android: "OS Sandbox",
    highlight: true,
  },
];

export function FeatureComparisonSection() {
  const { playHover, playClick } = useSound();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "OS & Desktop Integration", "Voice & Audio Synthesis", "Vision & Spatial Perception", "Autonomous Intelligence", "Security & Cloud Architecture"];

  const filteredData = selectedCategory === "All"
    ? COMPARISON_DATA
    : COMPARISON_DATA.filter((item) => item.category === selectedCategory);

  const renderCell = (val: boolean | string, isDesktop = false) => {
    if (val === true) {
      return (
        <div className={`flex items-center gap-1.5 justify-center px-2.5 py-1 rounded-full text-xs font-mono font-bold ${
          isDesktop
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
        }`}>
          <Check className="w-3.5 h-3.5" />
          <span>Supported</span>
        </div>
      );
    }
    if (val === false) {
      return (
        <div className="flex items-center gap-1.5 justify-center px-2.5 py-1 rounded-full text-xs font-mono text-slate-500 bg-white/[0.02] border border-white/5">
          <X className="w-3.5 h-3.5 text-rose-500/70" />
          <span>Unavailable</span>
        </div>
      );
    }
    return (
      <div className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold text-center ${
        isDesktop
          ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_10px_rgba(99,102,241,0.2)]"
          : "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
      }`}>
        {val}
      </div>
    );
  };

  return (
    <section id="comparison" className="py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-[#030309]/60 to-transparent">
      {/* Glow Backdrops */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-cyan/10 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-xs text-brand-cyan glow-text-cyan font-mono uppercase tracking-[0.2em] font-bold mb-4"
          >
            <Zap className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
            PLATFORM CAPABILITY COMPARISON
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white"
          >
            Desktop vs Web vs Android
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-slate-400 font-light"
          >
            Explore the exact technical capabilities discovered across all three official Max AI platforms. Desktop is our flagship power tool for OS control.
          </motion.p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={() => playHover()}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-white/20"
                    : "bg-white/[0.03] text-slate-400 border border-white/5 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Matrix Table */}
        <div className="max-w-6xl mx-auto glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-slate-950/60 backdrop-blur-2xl">
          {/* Mobile scroll hint */}
          <div className="sm:hidden flex items-center justify-center gap-1.5 py-2 text-[10px] font-mono text-slate-500 bg-slate-900/40 border-b border-white/5">
            <span className="animate-pulse">←</span>
            <span>SCROLL FOR ALL PLATFORMS</span>
            <span className="animate-pulse">→</span>
          </div>
          
          {/* Horizontally scrollable table on mobile */}
          <div className="overflow-x-auto scrollbar-thin">
            <div className="min-w-[600px] sm:min-w-0">
          
          {/* Table Header */}
          <div className="grid grid-cols-12 border-b border-white/10 bg-[#09081a] p-6 items-center text-sm font-mono uppercase tracking-wider font-bold text-slate-300">
            <div className="col-span-5 sm:col-span-6 text-left flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span>FEATURE & CAPABILITY</span>
            </div>
            
            {/* Desktop Flagship Column */}
            <div className="col-span-3 sm:col-span-2 text-center flex flex-col items-center justify-center p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <div className="flex items-center gap-1.5 font-display font-bold text-sm text-white">
                <Monitor className="w-4 h-4 text-indigo-400" />
                <span>DESKTOP</span>
              </div>
              <span className="text-[9px] text-indigo-400 font-mono tracking-widest mt-0.5">FLAGSHIP ★</span>
            </div>

            {/* Web Column */}
            <div className="col-span-2 sm:col-span-2 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-300">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>WEB</span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono">CLOUD APP</span>
            </div>

            {/* Android Column */}
            <div className="col-span-2 sm:col-span-2 text-center flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 font-display font-bold text-sm text-slate-300">
                <Smartphone className="w-4 h-4 text-emerald-400" />
                <span>ANDROID</span>
              </div>
              <span className="text-[9px] text-amber-400/90 font-mono">SOON</span>
            </div>
          </div>

          {/* Table Body Rows */}
          <div className="divide-y divide-white/5">
            {filteredData.map((row, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                onMouseEnter={() => playHover()}
                className={`grid grid-cols-12 p-5 items-center transition-all duration-300 hover:bg-white/[0.02] ${
                  row.highlight ? "bg-indigo-500/[0.015]" : ""
                }`}
              >
                {/* Feature Description */}
                <div className="col-span-5 sm:col-span-6 text-left pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-white text-sm sm:text-base">
                      {row.featureName}
                    </span>
                    {row.highlight && (
                      <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full hidden sm:inline-block">
                        PRO OS
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 font-sans font-light line-clamp-2">
                    {row.description}
                  </p>
                </div>

                {/* Desktop Column */}
                <div className="col-span-3 sm:col-span-2 text-center px-2">
                  {renderCell(row.desktop, true)}
                </div>

                {/* Web Column */}
                <div className="col-span-2 sm:col-span-2 text-center px-2">
                  {renderCell(row.web)}
                </div>

                {/* Android Column */}
                <div className="col-span-2 sm:col-span-2 text-center px-2">
                  {renderCell(row.android)}
                </div>
              </motion.div>
            ))}
          </div>

          </div>
          </div>

          {/* Table Footer Callout */}
          <div className="p-6 bg-slate-900/60 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-slate-400">
            <div className="flex items-center gap-2 text-left">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>All features verified against official Max AI source codebase v2.6.0.</span>
            </div>
            <a
              href="#download"
              className="px-5 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-indigo-500/30 hover:text-white transition-all cursor-pointer"
            >
              Get Desktop Version →
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
