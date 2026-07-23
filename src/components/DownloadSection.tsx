/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSound } from "../hooks/useSound";
import { Magnetic } from "./Cursor";
import { Download, Monitor, Smartphone, CheckCircle, RefreshCw, Cpu, Database, Info, Globe, ShieldCheck, ArrowRight } from "lucide-react";

const DIRECT_WINDOWS_DOWNLOAD_URL = "https://github.com/atulispro1/max-ai-main-website/releases/download/v1.0.0/Max.AI.Setup.1.0.0.exe";
const DIRECT_WEB_URL = "https://max-ai-atulsapp.vercel.app/";

interface DownloadSectionProps {
  onNavigatePage?: (page: "home" | "download-windows" | "download-android") => void;
}

export function DownloadSection({ onNavigatePage }: DownloadSectionProps) {
  const { playHover, playClick } = useSound();

  const handleWindowsClick = () => {
    playClick();
    if (onNavigatePage) {
      onNavigatePage("download-windows");
    } else {
      window.location.hash = "#download-windows";
    }
  };

  const handleAndroidClick = () => {
    playClick();
    if (onNavigatePage) {
      onNavigatePage("download-android");
    } else {
      window.location.hash = "#download-android";
    }
  };

  const handleWebClick = () => {
    playClick();
    window.location.href = DIRECT_WEB_URL;
  };

  return (
    <section id="download" className="py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-[#030308]/40 to-transparent">
      {/* Background gradients */}
      <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-purple/30 bg-brand-purple/10 text-xs text-brand-purple glow-text-purple font-mono uppercase tracking-wider mb-4 font-bold"
          >
            <Download className="w-3.5 h-3.5" />
            OFFICIAL STABLE RELEASES
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white"
          >
            Get Max AI Today
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-lg text-slate-400 font-light"
          >
            Deploy native local spatial intelligence directly on your device. High-performance Electron desktop VM container execution and Web app connectivity.
          </motion.p>
        </div>

        {/* 3 Main Action Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* CARD 1: WINDOWS DESKTOP (Flagship - Most Highlighted) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onMouseEnter={() => playHover()}
            className="interactive-card glass-panel rounded-3xl p-8 border border-indigo-500/30 bg-slate-950/60 relative overflow-hidden flex flex-col justify-between h-[460px] shadow-[0_0_40px_rgba(99,102,241,0.15)] group"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />
            
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <Monitor className="w-8 h-8" />
                </div>
                <div className="text-right font-mono text-xs space-y-1">
                  <span className="text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30 inline-block">
                    STABLE v1.0.0
                  </span>
                  <div className="text-slate-400 text-[11px] mt-1">142 MB • Windows Setup</div>
                </div>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-2 text-left">
                Download for Windows
              </h3>
              
              <p className="text-xs text-slate-400 text-left leading-relaxed mb-6 font-sans font-light">
                The flagship Max AI application. Complete native OS control, 30+ app launcher, multi-monitor screen vision, & floating 3D orb widget.
              </p>

              <div className="space-y-2 border-t border-white/10 pt-4 text-left font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>SHA-256 Verified Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Windows 10 & Windows 11 (64-bit)</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Magnetic className="w-full">
                <button
                  onClick={handleWindowsClick}
                  className="w-full py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:opacity-95 transition-all duration-300 shadow-[0_0_25px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                >
                  <Download className="w-4 h-4" />
                  <span>Download for Windows</span>
                </button>
              </Magnetic>
            </div>
          </motion.div>

          {/* CARD 2: USE ON WEB */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onMouseEnter={() => playHover()}
            className="interactive-card glass-panel rounded-3xl p-8 border border-white/10 bg-slate-950/40 relative overflow-hidden flex flex-col justify-between h-[460px] hover:border-cyan-500/30 transition-all duration-300 group"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Globe className="w-8 h-8" />
                </div>
                <span className="text-cyan-400 font-bold uppercase tracking-wider bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/30 text-xs font-mono">
                  LIVE CLOUD
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-2 text-left">
                Use on Web
              </h3>
              
              <p className="text-xs text-slate-400 text-left leading-relaxed mb-6 font-sans font-light">
                Instant access directly in your browser. Experience Gemini 3.1 Flash/Pro chat, WebSocket Live audio, & document parsing without installing.
              </p>

              <div className="space-y-2 border-t border-white/10 pt-4 text-left font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>No Installation Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Supabase Cloud Sync</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Magnetic className="w-full">
                <button
                  onClick={handleWebClick}
                  className="w-full py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-black bg-white hover:bg-slate-200 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Globe className="w-4 h-4 text-black" />
                  <span>Launch Web App</span>
                </button>
              </Magnetic>
            </div>
          </motion.div>

          {/* CARD 3: DOWNLOAD FOR ANDROID */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onMouseEnter={() => playHover()}
            className="interactive-card glass-panel rounded-3xl p-8 border border-white/10 bg-slate-950/40 relative overflow-hidden flex flex-col justify-between h-[460px] hover:border-emerald-500/30 transition-all duration-300 group"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Smartphone className="w-8 h-8" />
                </div>
                <span className="text-amber-400 font-bold uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30 text-xs font-mono">
                  LAUNCHING SOON
                </span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-2 text-left">
                Download for Android
              </h3>
              
              <p className="text-xs text-slate-400 text-left leading-relaxed mb-6 font-sans font-light">
                Under active optimization with Expo React Native. Features mobile camera AI vision, SVG/3D animated avatars, & Android app intent launchers.
              </p>

              <div className="space-y-2 border-t border-white/10 pt-4 text-left font-mono text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-amber-400" />
                  <span>Android 11.0 or Higher</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Native App Intent Bridge</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <button
                onClick={handleAndroidClick}
                className="w-full py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-slate-200 bg-white/[0.05] border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span>View Android Status</span>
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
