/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useSound } from "../hooks/useSound";
import { Magnetic } from "./Cursor";
import {
  Check, Sparkles, Zap, Crown, Infinity, MessageSquare,
  Mic, Monitor, Smartphone, Brain, Search, FileText, Camera,
  ShoppingBag, Music, ArrowRight
} from "lucide-react";

const ALL_FEATURES = [
  { icon: MessageSquare, label: "Gemini AI Chat" },
  { icon: Mic, label: "Voice Mode (Live)" },
  { icon: Monitor, label: "Screen Understanding" },
  { icon: Camera, label: "Camera Vision" },
  { icon: Brain, label: "Long-Term Memory" },
  { icon: Search, label: "Deep Research" },
  { icon: FileText, label: "Document Analysis" },
  { icon: Smartphone, label: "Android Automation" },
  { icon: Monitor, label: "Desktop Automation" },
  { icon: ShoppingBag, label: "Shopping Assistant" },
  { icon: Music, label: "Spotify / YouTube Control" },
  { icon: Sparkles, label: "AI Planner Agent" },
];

interface PricingSectionProps {
  onNavigatePage?: (page: "home" | "download-windows" | "download-android") => void;
}

export function PricingSection({ onNavigatePage }: PricingSectionProps) {
  const { playHover, playClick } = useSound();

  const handleGetTrial = () => {
    playClick();
    window.location.href = "https://max-ai-atulsapp.vercel.app";
  };

  const handleGetLifetime = () => {
    playClick();
    window.location.href = "https://max-ai-atulsapp.vercel.app";
  };

  return (
    <section id="pricing" className="py-24 sm:py-28 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-[10%] left-[-15%] w-[600px] h-[600px] rounded-full bg-brand-purple/8 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-15%] w-[600px] h-[600px] rounded-full bg-brand-cyan/8 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-xs text-brand-purple glow-text-purple font-mono uppercase tracking-[0.2em] font-bold mb-4"
          >
            <Crown className="w-3.5 h-3.5 animate-pulse text-yellow-400" />
            SIMPLE, HONEST PRICING
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white"
          >
            Start Free. Go Lifetime.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400 font-light"
          >
            No hidden fees. No monthly subscription traps. Pay once, own it forever.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">

          {/* CARD 1: 7-Day Trial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => playHover()}
            className="interactive-card glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 bg-slate-950/50 relative overflow-hidden flex flex-col hover:border-brand-cyan/30 hover:shadow-[0_0_40px_rgba(0,240,255,0.08)] transition-all duration-300 group"
          >
            <div>
              {/* Icon + Label */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center text-brand-cyan">
                  <Zap className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono text-brand-cyan uppercase tracking-widest bg-brand-cyan/10 border border-brand-cyan/20 px-3 py-1 rounded-full font-bold">
                  7-Day Trial
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-1">Starter Trial</h3>
              <p className="text-sm text-slate-400 mb-6 font-light leading-relaxed">
                Try everything MAX AI has to offer — no commitment. Perfect for exploring all features before going lifetime.
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-display font-bold text-white">₹99</span>
                  <span className="text-slate-400 font-mono text-sm">/ 7 days</span>
                </div>
                <p className="text-xs text-slate-500 mt-1 font-mono">Full access. All features unlocked.</p>
              </div>

              {/* Features list (short) */}
              <div className="space-y-2.5 border-t border-white/5 pt-5">
                {ALL_FEATURES.slice(0, 6).map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} className="flex items-center gap-2.5 text-sm text-slate-300">
                      <div className="w-5 h-5 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-brand-cyan" />
                      </div>
                      <Icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{f.label}</span>
                    </div>
                  );
                })}
                <p className="text-xs text-slate-500 font-mono pl-7">+ all other features</p>
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Magnetic className="w-full">
                <button
                  onClick={handleGetTrial}
                  className="w-full py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-white bg-white/[0.06] border border-white/15 hover:bg-brand-cyan/10 hover:border-brand-cyan/30 hover:text-brand-cyan transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4" />
                  <span>Start 7-Day Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Magnetic>
            </div>
          </motion.div>

          {/* CARD 2: Lifetime (MOST HIGHLIGHTED) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseEnter={() => playHover()}
            className="interactive-card glass-panel rounded-3xl p-6 sm:p-8 border border-brand-purple/40 bg-slate-950/60 relative overflow-hidden flex flex-col shadow-[0_0_60px_rgba(139,92,246,0.18)] group"
          >
            {/* Gradient top bar */}
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan" />

            {/* BEST VALUE badge */}
            <div className="absolute -top-0.5 right-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-brand-purple to-brand-pink text-white text-[10px] font-mono font-bold uppercase tracking-widest rounded-b-xl shadow-[0_4px_20px_rgba(139,92,246,0.4)]">
                <Crown className="w-3 h-3 text-yellow-300" />
                BEST VALUE
              </span>
            </div>

            <div>
              {/* Icon + Label */}
              <div className="flex items-center justify-between mb-6 mt-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-purple/15 border border-brand-purple/40 flex items-center justify-center text-brand-purple shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <Infinity className="w-7 h-7" />
                </div>
                <span className="text-xs font-mono text-brand-purple uppercase tracking-widest bg-brand-purple/10 border border-brand-purple/30 px-3 py-1 rounded-full font-bold">
                  Lifetime
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-1">Lifetime Access</h3>
              <p className="text-sm text-slate-400 mb-6 font-light leading-relaxed">
                Pay once. Use forever. Every current feature plus all future updates included — no monthly fees, ever.
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-display font-bold bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan bg-clip-text text-transparent">₹499</span>
                  <span className="text-slate-400 font-mono text-sm">/ forever</span>
                </div>
                <p className="text-xs text-brand-purple mt-1 font-mono">All future updates included free.</p>
              </div>

              {/* Full features list */}
              <div className="space-y-2.5 border-t border-white/5 pt-5">
                {ALL_FEATURES.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div key={f.label} className="flex items-center gap-2.5 text-sm text-slate-200">
                      <div className="w-5 h-5 rounded-full bg-brand-purple/15 border border-brand-purple/30 flex items-center justify-center shrink-0 shadow-[0_0_6px_rgba(139,92,246,0.2)]">
                        <Check className="w-3 h-3 text-brand-purple" />
                      </div>
                      <Icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{f.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4">
              <Magnetic className="w-full">
                <button
                  onClick={handleGetLifetime}
                  className="w-full py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-brand-purple via-brand-pink to-indigo-500 hover:opacity-90 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                >
                  <Crown className="w-4 h-4 text-yellow-300" />
                  <span>Get Lifetime Access — ₹499</span>
                </button>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-500"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Secure payment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
            <span>Instant activation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
            <span>All platforms included</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
            <span>No recurring charges</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
