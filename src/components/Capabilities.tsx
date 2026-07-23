/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, MouseEvent } from "react";
import { motion } from "motion/react";
import { useSound } from "../hooks/useSound";
import {
  Mic, MonitorCheck, Eye, Cpu, Globe, Database,
  GitBranch, Search, FileText, Settings, Workflow, ShieldAlert, Sparkles
} from "lucide-react";

interface FeatureDetail {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  badge: string;
  previewType: "voice" | "vision" | "camera" | "automation" | "browser" | "memory" | "plan" | "research" | "document" | "workflow" | "reasoning" | "security";
}

const FEATURES: FeatureDetail[] = [
  {
    id: "voice",
    title: "Voice AI",
    description: "Ultra-low latency duplex audio synthesis that responds instantly, matches your conversational pacing, and parses spatial tones.",
    icon: Mic,
    color: "#00f0ff",
    badge: "24ms Latency",
    previewType: "voice"
  },
  {
    id: "screen",
    title: "Screen Understanding",
    description: "Continuously parses and reads your active desktop layout, auditing coordinates, designs, data cells, and layout hierarchies.",
    icon: MonitorCheck,
    color: "#9c54ff",
    badge: "120FPS Vision",
    previewType: "vision"
  },
  {
    id: "camera",
    title: "Camera Vision",
    description: "Translates workspace surroundings into visual matrices, detecting objects, gestures, whiteboards, and personal environments.",
    icon: Eye,
    color: "#ff2a85",
    badge: "Spatial 3D",
    previewType: "camera"
  },
  {
    id: "automation",
    title: "Desktop Automation",
    description: "Safely drives operating system VMs to compile, test, write files, manage folders, and complete manual clicks securely.",
    icon: Cpu,
    color: "#eab308",
    badge: "OS-Native",
    previewType: "automation"
  },
  {
    id: "browser",
    title: "Browser Intelligence",
    description: "Crawl web nodes, complete checkout funnels, book flights, bypass standard page blocks, and extract deep unstructured data.",
    icon: Globe,
    color: "#22c55e",
    badge: "Multi-tab Crawler",
    previewType: "browser"
  },
  {
    id: "memory",
    title: "Long-Term Memory",
    description: "Constructs semantic graph memories across all user sessions, recollecting details, files, and verbal references contextually.",
    icon: Database,
    color: "#00f0ff",
    badge: "Vector DB",
    previewType: "memory"
  },
  {
    id: "planning",
    title: "AI Planning",
    description: "Fractions user commands into dynamic state machines, scheduling resources and optimizing execution speed.",
    icon: GitBranch,
    color: "#9c54ff",
    badge: "Dynamic Heuristic",
    previewType: "plan"
  },
  {
    id: "research",
    title: "Research Mode",
    description: "Synthesizes citations, structures research trees, scrapes references, and authors cohesive, validated briefings.",
    icon: Search,
    color: "#ff2a85",
    badge: "Deep Search",
    previewType: "research"
  },
  {
    id: "document",
    title: "Document Analysis",
    description: "Ingests multithousand-page PDFs, spreadsheets, and databases, mapping structures and finding anomalies.",
    icon: FileText,
    color: "#3b82f6",
    badge: "LLM Parser",
    previewType: "document"
  },
  {
    id: "workflow",
    title: "Smart Workflows",
    description: "Orchestrate cron routines, API triggers, local event listeners, and auto-report completions inside workspace rails.",
    icon: Workflow,
    color: "#00f0ff",
    badge: "Autonomous Pipelines",
    previewType: "workflow"
  },
  {
    id: "reasoning",
    title: "Multi-step Reasoning",
    description: "Runs iterative self-reflection loops, debugging code syntax, validating mathematics, and testing scripts.",
    icon: Settings,
    color: "#9c54ff",
    badge: "Self-Reflection",
    previewType: "reasoning"
  },
  {
    id: "security",
    title: "Privacy & Security",
    description: "Local data processing, end-to-end sandbox VM encryption, secure OAuth handshakes, and Zero-Knowledge storage guarantees.",
    icon: ShieldAlert,
    color: "#ec4899",
    badge: "SOC2 Compliance",
    previewType: "security"
  }
];

// Touch device check (skip heavy animations on mobile)
const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// 3D Tilt Feature Card Wrapper
function FeatureCard({ feature }: { feature: FeatureDetail; key?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { playHover } = useSound();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowing, setGlowing] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const rx = ((y / height) - 0.5) * -16;
    const ry = ((x / width) - 0.5) * 16;

    setTilt({ x: rx, y: ry });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlowing(false);
  };

  const handleMouseEnter = () => {
    setGlowing(true);
    playHover();
  };

  // Render miniature interactive mock preview per capability
  const renderPreview = () => {
    // On touch devices, render static preview to reduce animation jank
    if (isTouchDevice) {
      return (
        <div className="h-10 w-full bg-slate-900/40 rounded-lg border border-white/5 flex items-center justify-center">
          <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">{feature.badge}</span>
        </div>
      );
    }
    switch (feature.previewType) {
      case "voice":
        return (
          <div className="flex gap-[3px] items-center justify-center h-12 w-full bg-slate-900/60 rounded-lg px-4 border border-white/5 overflow-hidden">
            <span className="text-[10px] font-mono text-slate-500 mr-2 uppercase tracking-widest">RAW_INPUT</span>
            <div className="flex items-end gap-1 flex-1 justify-center">
              <motion.div animate={{ height: ["15%", "95%", "15%"] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} className="w-1 bg-brand-cyan rounded-full" style={{ height: "40%" }} />
              <motion.div animate={{ height: ["20%", "65%", "20%"] }} transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 }} className="w-1 bg-brand-cyan rounded-full" style={{ height: "70%" }} />
              <motion.div animate={{ height: ["10%", "85%", "10%"] }} transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.2 }} className="w-1 bg-brand-purple rounded-full" style={{ height: "90%" }} />
              <motion.div animate={{ height: ["35%", "55%", "35%"] }} transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.3 }} className="w-1 bg-brand-pink rounded-full" style={{ height: "50%" }} />
            </div>
          </div>
        );
      case "vision":
        return (
          <div className="relative h-12 w-full bg-slate-900/60 rounded-lg px-3 border border-white/5 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded bg-brand-purple border border-brand-cyan animate-pulse" />
              <span className="text-[10px] font-mono text-slate-400">FRAME_BOUNDS: [X: 120, Y: 432]</span>
            </div>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[9px] font-mono text-brand-cyan bg-brand-cyan/10 px-1.5 py-0.5 rounded border border-brand-cyan/20 uppercase"
            >
              OK
            </motion.div>
          </div>
        );
      case "camera":
        return (
          <div className="relative h-12 w-full bg-slate-900/80 rounded-lg p-2 border border-white/5 overflow-hidden flex items-center gap-3">
            <div className="w-7 h-7 rounded border border-brand-pink/30 flex items-center justify-center relative bg-brand-pink/5">
              <div className="absolute inset-1 border border-brand-pink/10 animate-ping rounded-sm" />
              <div className="w-1 h-1 rounded-full bg-brand-pink" />
            </div>
            <div className="flex-1 text-[9px] font-mono text-slate-400 space-y-0.5 leading-none">
              <div className="text-brand-pink uppercase tracking-widest font-bold">LENS_REC_NODE</div>
              <div>COGNITIVE OBJECT: "HUMAN_FACIAL_LOCK"</div>
            </div>
          </div>
        );
      case "automation":
        return (
          <div className="h-12 w-full bg-slate-950 rounded-lg p-2 border border-white/5 overflow-hidden flex items-center justify-between">
            <span className="font-mono text-[9px] text-yellow-400">$ npm run deploy</span>
            <motion.span
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.0, repeat: Infinity }}
              className="font-mono text-[8px] text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 uppercase"
            >
              SUCCESS
            </motion.span>
          </div>
        );
      case "browser":
        return (
          <div className="h-12 w-full bg-slate-900/60 rounded-lg p-2 border border-white/5 flex items-center gap-1.5 overflow-hidden">
            <Globe className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "12s" }} />
            <div className="flex-1 bg-slate-950/80 rounded h-7 border border-white/5 flex items-center px-2">
              <span className="font-mono text-[9px] text-slate-400 truncate">https://flights.com/checkout?id=38...</span>
            </div>
          </div>
        );
      case "memory":
        return (
          <div className="h-12 w-full bg-slate-900/60 rounded-lg p-2 border border-white/5 flex items-center gap-2 overflow-hidden">
            <Database className="w-4 h-4 text-brand-cyan" />
            <div className="flex-1 text-[8px] font-mono text-slate-400 space-y-0.5 leading-none">
              <div>QUERY_VECTOR: "SARAH_PHONE"</div>
              <div className="text-brand-cyan uppercase tracking-widest font-bold font-mono">NODE FOUND: +1 415 ...</div>
            </div>
          </div>
        );
      case "plan":
        return (
          <div className="h-12 w-full bg-slate-900/60 rounded-lg p-2 border border-white/5 flex items-center justify-center gap-2 overflow-hidden">
            <div className="w-4 h-4 rounded bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center font-mono text-[8px]">1</div>
            <div className="h-0.5 w-4 bg-brand-purple/30" />
            <div className="w-4 h-4 rounded bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center font-mono text-[8px]">2</div>
            <div className="h-0.5 w-4 bg-brand-cyan/30" />
            <div className="w-4 h-4 rounded bg-brand-pink/20 border border-brand-pink/40 flex items-center justify-center font-mono text-[8px]">3</div>
          </div>
        );
      case "research":
        return (
          <div className="h-12 w-full bg-slate-900/60 rounded-lg p-2 border border-white/5 flex items-center justify-between overflow-hidden">
            <span className="font-mono text-[9px] text-slate-400">Scraping IEEE_SOCIETY...</span>
            <Search className="w-3.5 h-3.5 text-brand-pink animate-bounce" />
          </div>
        );
      case "document":
        return (
          <div className="h-12 w-full bg-slate-900/60 rounded-lg p-2.5 border border-white/5 flex items-center gap-3 overflow-hidden">
            <FileText className="w-5 h-5 text-blue-400" />
            <div className="flex-1 text-[8px] font-mono text-slate-500 leading-none space-y-1">
              <div>COMPENSATION_SEC_S1.PDF</div>
              <div className="w-16 h-1 bg-brand-cyan/45 rounded-full" />
            </div>
          </div>
        );
      case "workflow":
        return (
          <div className="h-12 w-full bg-slate-900/60 rounded-lg p-2 border border-white/5 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-2">
              <Workflow className="w-4 h-4 text-brand-cyan" />
              <span className="font-mono text-[9px] text-slate-400">CRON: "EVERY_HOUR"</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
        );
      case "reasoning":
        return (
          <div className="h-12 w-full bg-slate-950 rounded-lg p-2 border border-white/5 overflow-hidden font-mono text-[8px] text-slate-400 space-y-0.5">
            <div>► RUNNING TESTS (3/3)</div>
            <div className="text-emerald-400 font-bold">✓ TEST_SYNTAX_PARSER_VALID</div>
          </div>
        );
      case "security":
        return (
          <div className="h-12 w-full bg-[#0a081c] rounded-lg px-3 border border-white/5 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-brand-pink animate-pulse" />
              <span className="font-mono text-[9px] text-slate-400">AES-256 E2EE SHIELD</span>
            </div>
            <span className="font-mono text-[8px] text-brand-pink uppercase tracking-widest font-bold">ARMED</span>
          </div>
        );
      default:
        return null;
    }
  };

  const Icon = feature.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        transformStyle: "preserve-3d",
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="interactive-card glass-panel rounded-2xl p-4 sm:p-6 flex flex-col justify-between border border-white/5 glass-panel-hover h-auto sm:h-[320px] relative overflow-hidden group select-none cursor-pointer"
    >
      {/* Dynamic Background Hover Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle 120px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${feature.color}, transparent 100%)`,
        }}
      />

      {/* Top Section */}
      <div className="relative z-10 flex justify-between items-start">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center relative overflow-hidden"
          style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}35` }}
        >
          <Icon className="w-5.5 h-5.5" style={{ color: feature.color }} />
        </div>
        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest bg-white/5 border border-white/10 px-2 py-0.5 rounded">
          {feature.badge}
        </span>
      </div>

      {/* Title & Description */}
      <div className="relative z-10 my-4 text-left">
        <h3 className="text-lg font-display font-semibold text-white mb-2 flex items-center gap-1.5 group-hover:text-brand-cyan transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed font-sans line-clamp-3">
          {feature.description}
        </p>
      </div>

      {/* Dynamic Live Preview Widget */}
      <div className="relative z-10 w-full mt-auto pt-2">
        {renderPreview()}
      </div>
    </motion.div>
  );
}

export function Capabilities() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/5 text-xs text-brand-cyan glow-text-cyan font-mono uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-purple" />
            FLAGSHIP CORE SUITE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4"
          >
            Unrivaled Native AI Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400"
          >
            Designed from the ground up for high-density spatial intelligence, desktop control orchestration, and hyper-personalized context modeling.
          </motion.p>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

      </div>
    </section>
  );
}
