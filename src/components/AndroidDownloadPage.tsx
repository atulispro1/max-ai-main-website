/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, CheckCircle, Download, RefreshCw, ShieldCheck, Sparkles } from "lucide-react";
import { useSound } from "../hooks/useSound";
import maxAiLogo from "../assets/images/max_ai_logo_1783596520565.jpg";

const ANDROID_APK_URL =
  "https://github.com/atulisp01/max-ai-main-website/releases/download/v1.0.0/application-790da840-1614-4c70-8cec-d6dd2da20b7c.apk";

function AndroidMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <path d="M19 28.5h26v20a7 7 0 0 1-7 7H26a7 7 0 0 1-7-7v-20Z" fill="currentColor" />
      <path d="M17 30.5v14a4 4 0 0 0 8 0v-14m14 0v14a4 4 0 0 0 8 0v-14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M20 27a12 12 0 0 1 24 0v2H20v-2Z" fill="currentColor" />
      <path d="m23 16-4-5m22 5 4-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="26.5" cy="23" r="1.6" fill="#07140d" />
      <circle cx="37.5" cy="23" r="1.6" fill="#07140d" />
    </svg>
  );
}

export function AndroidDownloadPage({ onBackHome }: { onBackHome: () => void }) {
  const { playHover, playClick, playSuccess } = useSound();
  const [countdown, setCountdown] = useState(3);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const hasStartedRef = useRef(false);

  const triggerDownload = useCallback((force = false) => {
    if (hasStartedRef.current && !force) return;

    hasStartedRef.current = true;
    setDownloadStarted(true);
    setDownloadProgress(12);
    playSuccess();

    const link = document.createElement("a");
    link.href = ANDROID_APK_URL;
    link.download = "MAX-AI-Android-v1.0.1.apk";
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();

    const progressSteps = [34, 61, 82, 100];
    progressSteps.forEach((progress, index) => {
      window.setTimeout(() => setDownloadProgress(progress), 220 * (index + 1));
    });
  }, [playSuccess]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          triggerDownload();
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [triggerDownload]);

  const handleManualDownload = () => {
    playClick();
    triggerDownload(true);
  };

  const progress = downloadStarted ? downloadProgress : ((3 - countdown) / 3) * 100;

  return (
    <main className="min-h-screen pt-28 pb-14 px-4 sm:px-6 relative flex items-center justify-center overflow-hidden selection:bg-emerald-400/30 selection:text-emerald-100">
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -25, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-24 w-[32rem] h-[32rem] rounded-full bg-emerald-500/10 blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -55, 0], y: [0, 35, 0], scale: [1, 1.16, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-40 -right-24 w-[36rem] h-[36rem] rounded-full bg-brand-purple/15 blur-[150px]"
        />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:42px_42px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => {
            playClick();
            onBackHome();
          }}
          onMouseEnter={() => playHover()}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/20 backdrop-blur-xl text-xs font-mono text-slate-300 transition-colors hover:bg-white/10 hover:border-white/20 hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </motion.button>

        <motion.section
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="glass-panel rounded-[2rem] p-5 sm:p-9 md:p-11 border border-emerald-400/20 bg-slate-950/65 shadow-[0_0_70px_rgba(16,185,129,0.12),0_0_100px_rgba(139,92,246,0.1)] relative overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent" />
          <div className="absolute -top-20 right-8 w-40 h-40 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="h-11 w-11 rounded-xl overflow-hidden border border-white/15 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <img src={maxAiLogo} alt="MAX AI logo" className="w-full h-full object-cover" />
            </div>
            <div className="text-left leading-none">
              <span className="block font-display font-bold tracking-[0.17em] text-sm text-white">MAX AI</span>
              <span className="block mt-1 text-[9px] text-slate-500 font-mono tracking-[0.18em]">ANDROID RELEASE</span>
            </div>
          </div>

          <div className="relative w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-8 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-dashed border-emerald-300/40"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-3 rounded-full border border-brand-cyan/30 border-t-brand-cyan"
            />
            <motion.div
              animate={{ scale: [1, 1.07, 1], boxShadow: ["0 0 28px rgba(52,211,153,0.2)", "0 0 48px rgba(52,211,153,0.42)", "0 0 28px rgba(52,211,153,0.2)"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-[1.5rem] bg-emerald-400/10 border border-emerald-300/30 flex items-center justify-center text-emerald-300"
            >
              <AndroidMark className="w-12 h-12 sm:w-14 sm:h-14" />
            </motion.div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] text-[10px] font-mono uppercase tracking-[0.18em] text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              Official Android APK
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold tracking-tight text-white">Your download is starting...</h1>
            <p className="max-w-xl mx-auto mt-4 text-sm sm:text-base leading-relaxed text-slate-400 font-light">
              Thank you for downloading MAX AI. Your download will begin automatically in a few seconds.
            </p>
          </div>

          <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl border border-white/10 bg-black/20">
            <AnimatePresence mode="wait">
              {!downloadStarted ? (
                <motion.div key="countdown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-emerald-200">
                    <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                    Preparing your secure download
                  </div>
                  <motion.div
                    key={countdown}
                    initial={{ opacity: 0, y: 10, scale: 0.78 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 340, damping: 22 }}
                    className="mt-3 text-5xl sm:text-6xl font-display font-bold tabular-nums text-white"
                  >
                    {countdown}
                  </motion.div>
                  <p className="mt-1 text-xs text-slate-500">Starting automatically</p>
                </motion.div>
              ) : (
                <motion.div key="started" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                  <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-emerald-300">
                    <CheckCircle className="w-4 h-4" />
                    Download initiated
                  </div>
                  <p className="mt-2 text-xs text-slate-400">Check your browser downloads for the MAX AI Android APK.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-2 rounded-full overflow-hidden bg-white/[0.07] border border-white/[0.06]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-brand-cyan to-brand-purple shadow-[0_0_14px_rgba(52,211,153,0.65)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.38, ease: "easeOut" }}
                />
              </div>
              <span className="w-9 text-right text-[11px] font-mono text-slate-400 tabular-nums">{Math.round(progress)}%</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02]">
              <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-500">Version</span>
              <span className="block mt-1 text-xs font-mono font-semibold text-emerald-300">v1.0.1</span>
            </div>
            <div className="p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02]">
              <span className="block text-[9px] font-mono uppercase tracking-wider text-slate-500">Platform</span>
              <span className="block mt-1 text-xs font-mono font-semibold text-slate-200">Android APK</span>
            </div>
            <div className="p-3.5 rounded-xl border border-white/[0.07] bg-white/[0.02] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-cyan" />
              <span className="text-xs font-mono font-semibold text-slate-200">Official release</span>
            </div>
          </div>

          <div className="mt-8 pt-7 border-t border-white/10 text-center">
            <p className="text-xs text-slate-400">If the download doesn't begin automatically, click the Download Now button.</p>
            <button
              onClick={handleManualDownload}
              onMouseEnter={() => playHover()}
              className="mt-4 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-display font-bold text-sm text-slate-950 bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 hover:brightness-110 transition-all shadow-[0_0_28px_rgba(52,211,153,0.25)] cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Now
            </button>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
