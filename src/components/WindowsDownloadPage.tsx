/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSound } from "../hooks/useSound";
import { Download, Monitor, ShieldCheck, CheckCircle, RefreshCw, ArrowLeft, AlertCircle, FileCheck, Sparkles, Cpu } from "lucide-react";

const DIRECT_INSTALLER_URL = "https://github.com/atulispro1/max-ai-main-website/releases/download/v1.0.0/Max.AI.Setup.1.0.0.exe";

export function WindowsDownloadPage({ onBackHome }: { onBackHome: () => void }) {
  const { playHover, playClick, playSuccess } = useSound();
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [downloadProgress, setDownloadProgress] = useState(0);

  useEffect(() => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Countdown loop before automatic download
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerAutomaticDownload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const triggerAutomaticDownload = () => {
    setDownloadStarted(true);
    playSuccess();

    // Trigger direct browser download via hidden link
    const link = document.createElement("a");
    link.href = DIRECT_INSTALLER_URL;
    link.download = "Max.AI.Setup.1.0.0.exe";
    document.body.appendChild(link);
    link.click();
    if (link.parentNode === document.body) {
      document.body.removeChild(link);
    }

    // Simulate progress bar UI
    let progress = 0;
    const progressTimer = setInterval(() => {
      progress += 15;
      if (progress >= 100) {
        setDownloadProgress(100);
        clearInterval(progressTimer);
      } else {
        setDownloadProgress(progress);
      }
    }, 150);
  };

  const handleManualDownload = () => {
    playClick();
    triggerAutomaticDownload();
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative flex flex-col items-center justify-center text-white overflow-hidden selection:bg-brand-purple/30 selection:text-brand-cyan">
      
      {/* Background glow effects */}
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[140px] pointer-events-none" />

      {/* Back to Home Header Button */}
      <div className="max-w-4xl w-full flex justify-start mb-8 z-20">
        <button
          onClick={() => {
            playClick();
            onBackHome();
          }}
          onMouseEnter={() => playHover()}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-mono text-slate-300 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Main Download Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full glass-panel rounded-3xl p-10 border border-indigo-500/30 bg-slate-950/70 backdrop-blur-2xl shadow-[0_0_60px_rgba(99,102,241,0.2)] text-center relative overflow-hidden z-10"
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400" />

        {/* Large Windows Logo Badge */}
        <div className="w-24 h-24 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mx-auto mb-8 shadow-[0_0_30px_rgba(99,102,241,0.25)] relative">
          <Monitor className="w-12 h-12" />
          <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-black shadow-lg">
            <CheckCircle className="w-4 h-4 fill-current" />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mb-3 tracking-tight">
          Max AI Desktop Installer
        </h1>
        
        <p className="text-slate-400 text-sm font-sans font-light max-w-lg mx-auto mb-8">
          The flagship intelligent operating system companion for Windows. Preparing your verified production release package.
        </p>

        {/* Status / Countdown Box */}
        <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-8">
          <AnimatePresence mode="wait">
            {!downloadStarted ? (
              <motion.div
                key="preparing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                <div className="flex items-center justify-center gap-2 text-indigo-300 font-mono text-sm font-bold">
                  <RefreshCw className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>Preparing your download...</span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  Your download will begin automatically in <strong className="text-white text-base font-bold">{countdown}</strong> seconds.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="downloading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between font-mono text-xs text-emerald-400">
                  <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                    <FileCheck className="w-4 h-4" />
                    DOWNLOAD INITIATED!
                  </span>
                  <span>{downloadProgress}%</span>
                </div>

                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${downloadProgress}%` }}
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  />
                </div>

                <p className="text-xs text-slate-400 font-sans">
                  Check your browser downloads folder for <strong className="text-slate-200">Max.AI.Setup.1.0.0.exe</strong>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Package Specifications Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left mb-8 text-xs font-mono">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">VERSION</span>
            <span className="text-indigo-300 font-bold">v1.0.0</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">PLATFORM</span>
            <span className="text-slate-200 font-medium">Win 10 & 11</span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">SECURITY</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified
            </span>
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-500 uppercase block">INTEGRITY</span>
            <span className="text-cyan-400 font-bold">SHA-256</span>
          </div>
        </div>

        {/* Manual Download Fallback Button */}
        <div className="border-t border-white/10 pt-6 flex flex-col items-center gap-3">
          <span className="text-xs font-sans text-slate-400">Download didn't start automatically?</span>
          
          <button
            onClick={handleManualDownload}
            onMouseEnter={() => playHover()}
            className="px-8 py-3.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-indigo-600 hover:opacity-90 shadow-[0_0_25px_rgba(99,102,241,0.3)] transition-all flex items-center gap-2 cursor-pointer border border-white/10"
          >
            <Download className="w-4 h-4" />
            <span>Download Manually</span>
          </button>
        </div>

      </motion.div>

    </div>
  );
}
