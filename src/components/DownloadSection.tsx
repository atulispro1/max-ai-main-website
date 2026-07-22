/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSound } from "../hooks/useSound";
import { Magnetic } from "./Cursor";
import { Download, Monitor, Smartphone, CheckCircle, RefreshCw, Cpu, Database, Info } from "lucide-react";

interface PlatformConfig {
  id: "windows" | "android";
  title: string;
  filename: string;
  fileSize: string;
  osVersion: string;
  icon: any;
  specs: string[];
  color: string;
  glowColor: string;
}

const PLATFORMS: PlatformConfig[] = [
  {
    id: "windows",
    title: "Download for Windows",
    filename: "MaxAI_Setup_v2.6.0_x64.msi",
    fileSize: "142 MB",
    osVersion: "Windows 10 / 11 (64-bit)",
    icon: Monitor,
    specs: ["8GB RAM Minimum", "DX12 compatible CPU", "2GB disk space"],
    color: "from-brand-purple to-brand-cyan",
    glowColor: "rgba(156,84,255,0.4)",
  },
  {
    id: "android",
    title: "Download for Android",
    filename: "MaxAI_Mobile_v2.6.0_arm64.apk",
    fileSize: "58 MB",
    osVersion: "Android 11.0 or higher",
    icon: Smartphone,
    specs: ["4GB RAM Minimum", "Snapdragon / MediaTek NPU", "60MB free storage"],
    color: "from-brand-cyan to-emerald-400",
    glowColor: "rgba(0,240,255,0.4)",
  },
];

export function DownloadSection() {
  const { playHover, playClick, playSuccess, playDownload } = useSound();
  const [downloadingId, setDownloadingId] = useState<"windows" | "android" | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState("0 MB/s");
  const [completedId, setCompletedId] = useState<"windows" | "android" | null>(null);

  // Simulated download loop
  const triggerDownload = (id: "windows" | "android") => {
    if (downloadingId) return; // Prevent double trigger
    playClick();
    setDownloadingId(id);
    setDownloadProgress(0);
    setCompletedId(null);

    let progress = 0;
    const timer = setInterval(() => {
      // Simulate erratic connection speed
      const speed = (Math.random() * 25 + 15).toFixed(1);
      setDownloadSpeed(`${speed} MB/s`);

      progress += Math.floor(Math.random() * 8 + 4);
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        setDownloadProgress(100);
        setTimeout(() => {
          setDownloadingId(null);
          setCompletedId(id);
          playSuccess();
        }, 400);
      } else {
        setDownloadProgress(progress);
        playDownload(); // Short synthesis bleep
      }
    }, 180);
  };

  return (
    <section id="download" className="py-28 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full bg-brand-cyan/5 blur-[130px]" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-purple/30 bg-brand-purple/5 text-xs text-brand-purple glow-text-purple font-mono uppercase tracking-wider mb-4"
          >
            <Download className="w-3.5 h-3.5" />
            STABLE PRODUCTION RELEASES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4"
          >
            Get Max AI Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400"
          >
            Deploy local, zero-knowledge contextual computing directly to your machine. Support for high-performance desktop VM execution and mobile voice arrays.
          </motion.p>
        </div>

        {/* Platforms grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {PLATFORMS.map((platform) => {
            const Icon = platform.icon;
            const isDownloading = downloadingId === platform.id;
            const isCompleted = completedId === platform.id;

            return (
              <motion.div
                key={platform.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onMouseEnter={() => playHover()}
                className="interactive-card glass-panel rounded-3xl p-8 border border-white/5 bg-slate-950/40 relative overflow-hidden flex flex-col justify-between h-[450px]"
              >
                {/* Visual Glow Sweep */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-purple to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Platform Header */}
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-200">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div className="text-right font-mono text-xs text-slate-500 space-y-1">
                      <div className="text-brand-cyan font-bold uppercase tracking-widest bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/20 inline-block">
                        BUILD v2.6.0
                      </div>
                      <div className="mt-1">{platform.fileSize}</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-white mb-2 text-left">
                    {platform.title}
                  </h3>
                  
                  {/* File Metadata */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-6 text-left">
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                    <span>File: <strong className="text-slate-300 font-medium">{platform.filename}</strong></span>
                  </div>

                  {/* Requirements List */}
                  <div className="space-y-2.5 mb-8 border-t border-b border-white/5 py-5 text-left">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold block mb-1">
                      MINIMUM SYSTEM REQUIREMENTS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-400">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-brand-purple shrink-0" />
                        <span>{platform.osVersion}</span>
                      </div>
                      {platform.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2">
                          <Database className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Download Actions */}
                <div className="mt-auto">
                  <AnimatePresence mode="wait">
                    {isDownloading ? (
                      <motion.div
                        key="downloading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-brand-cyan flex items-center gap-1.5 uppercase">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            TRANSFERRING BYTES...
                          </span>
                          <span className="text-slate-400 font-bold">{downloadProgress}%</span>
                        </div>
                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                          <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: `${downloadProgress}%` }}
                            className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-mono text-slate-500">
                          <span>SPEED: {downloadSpeed}</span>
                          <span>STATION_LOCAL_VM</span>
                        </div>
                      </motion.div>
                    ) : isCompleted ? (
                      <motion.div
                        key="completed"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center gap-2 py-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl font-mono text-xs uppercase font-bold tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.05)]"
                      >
                        <CheckCircle className="w-4 h-4 fill-current text-emerald-400" />
                        PACKAGE COMPILED STABLE!
                      </motion.div>
                    ) : (
                      <motion.div key="idle" className="w-full">
                        <Magnetic className="w-full">
                          <button
                            onClick={() => triggerDownload(platform.id)}
                            className="w-full py-4 rounded-xl font-display font-bold text-sm uppercase tracking-wider text-dark-bg bg-white hover:bg-transparent hover:text-white border border-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.08)] flex items-center justify-center gap-2 cursor-pointer group-hover:glow-border-purple"
                          >
                            <Download className="w-4 h-4 fill-current" />
                            GET FOR {platform.id === "windows" ? "WINDOWS" : "ANDROID"}
                          </button>
                        </Magnetic>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
