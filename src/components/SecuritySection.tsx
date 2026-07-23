/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useSound } from "../hooks/useSound";
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, Key, Cpu, Sparkles } from "lucide-react";

interface SecurityPillar {
  title: string;
  description: string;
  icon: any;
  badge: string;
}

const SECURITY_PILLARS: SecurityPillar[] = [
  {
    title: "Zero-Knowledge Local Architecture",
    description: "Your files, active screen captures, and document parsing operations are processed locally on your machine. Data stays on your hard drive, never on unverified cloud servers.",
    icon: HardDrive,
    badge: "100% LOCAL PROCESSING",
  },
  {
    title: "Sandboxed VM Container Isolation",
    description: "Desktop commands and script compilations execute inside strict VM containers. Enforces path traversal protection (isPathAllowed) to prevent unauthorized folder access.",
    icon: Lock,
    badge: "SANDBOX ISOLATION",
  },
  {
    title: "Encrypted OAuth & Token Rotation",
    description: "OAuth 2.0 sessions are authenticated via JWT tokens with automatic expiration and renewal protocols, guaranteeing continuous identity verification.",
    icon: Key,
    badge: "AES-256 / JWT SECURE",
  },
  {
    title: "Privacy-First Telemetry",
    description: "Zero telemetry logging of personal messages, vision streams, or personal graph memories. Transient vision frames are immediately purged post-inference.",
    icon: EyeOff,
    badge: "ZERO TELEMETRY",
  },
  {
    title: "Protected Cloud Database Sync",
    description: "Cloud memory backups and cross-platform synchronization are stored in encrypted Supabase database tables with strict Row-Level Security (RLS) policies.",
    icon: Server,
    badge: "SUPABASE RLS",
  },
  {
    title: "Future Security Roadmap",
    description: "Continuous security audits, hardware-backed NPU quantization encryption, local biometric unlock handshakes, and SOC2 compliance benchmarks.",
    icon: Cpu,
    badge: "FUTURE ROADMAP",
  },
];

export function SecuritySection() {
  const { playHover } = useSound();

  return (
    <section id="security" className="py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-[#020206]/80 to-transparent">
      {/* Background Lights */}
      <div className="absolute top-[30%] right-[10%] w-[450px] h-[450px] rounded-full bg-emerald-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs text-emerald-400 font-mono uppercase tracking-[0.2em] font-bold mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            ENTERPRISE SECURITY
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white"
          >
            Security & Privacy First
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-slate-400 font-light"
          >
            Max AI is engineered to protect user data through local execution, sandboxed container isolation, and Zero-Knowledge security principles.
          </motion.p>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
          {SECURITY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onMouseEnter={() => playHover()}
                className="interactive-card glass-panel rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/10 bg-slate-950/40 relative overflow-hidden flex flex-col justify-between hover:border-emerald-500/40 transition-all duration-300 group"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none group-hover:bg-emerald-500/10 transition-all duration-500" />
                
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-400 font-sans leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>VERIFIED ARCHITECTURE SAFEGUARD</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
