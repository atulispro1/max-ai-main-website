/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion } from "motion/react";
import { useSound } from "../hooks/useSound";
import { Smartphone, ArrowLeft, Globe, Monitor, Sparkles, Cpu, Clock, Rocket, Zap, ShieldCheck, Check } from "lucide-react";
import { FeatureComparisonSection } from "./FeatureComparisonSection";

const DIRECT_WEB_URL = "https://max-ai-atulsapp.vercel.app/";

export function AndroidDownloadPage({
  onBackHome,
  onNavigateWindows,
}: {
  onBackHome: () => void;
  onNavigateWindows: () => void;
}) {
  const { playHover, playClick } = useSound();

  const handleWebClick = () => {
    playClick();
    window.location.href = DIRECT_WEB_URL;
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6 relative flex flex-col items-center text-white overflow-hidden selection:bg-amber-500/30 selection:text-amber-300">
      
      {/* Ambient Glows */}
      <div className="absolute top-[15%] left-[20%] w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[140px] pointer-events-none" />

      {/* Back Button */}
      <div className="max-w-5xl w-full flex justify-start mb-8 z-20">
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

      {/* Main Status Hero Header Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full glass-panel rounded-3xl p-10 border border-amber-500/30 bg-slate-950/70 backdrop-blur-2xl shadow-[0_0_50px_rgba(245,158,11,0.15)] text-center relative overflow-hidden z-10 mb-16"
      >
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-500 via-orange-500 to-indigo-500" />

        {/* Large Android Icon Badge */}
        <div className="w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-8 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
          <Smartphone className="w-12 h-12" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs text-amber-400 font-mono uppercase tracking-[0.2em] font-bold mb-4">
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          UNDER ACTIVE DEVELOPMENT
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tight">
          Max AI for Android is Coming Soon
        </h1>
        
        <p className="text-slate-300 text-base font-sans font-light max-w-2xl mx-auto leading-relaxed mb-8">
          The Android application is currently under active optimization with Expo React Native. It is being meticulously tuned to deliver mobile camera AI vision, SVG/3D animated avatars, local MMKV high-speed storage, and native Android app intent launchers.
        </p>

        {/* Future Feature Roadmap Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left mb-8">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
              <Rocket className="w-4 h-4" />
              <span>Mobile Camera Vision</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Real-time workspace, object, & document camera scanning on Android.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold">
              <Zap className="w-4 h-4" />
              <span>App Intent Launcher</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Launch YouTube, Maps, Settings, & Camera via natural language intents.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>MMKV 100x Storage</span>
            </div>
            <p className="text-xs text-slate-400 font-sans leading-relaxed">
              Ultra-fast local memory cache powered by native MMKV key-value stores.
            </p>
          </div>
        </div>

        {/* "Can't wait?" Alternative Recommendations */}
        <div className="border-t border-white/10 pt-8 flex flex-col items-center gap-6">
          <span className="text-sm font-display font-semibold text-white uppercase tracking-wider">Can't Wait for Android?</span>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Recommend Web App */}
            <button
              onClick={handleWebClick}
              onMouseEnter={() => playHover()}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-display font-bold text-xs uppercase tracking-wider text-black bg-white hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Globe className="w-4 h-4 text-black" />
              <span>Use MAX AI Web Now</span>
            </button>

            {/* Recommend Windows Desktop Version */}
            <button
              onClick={() => {
                playClick();
                onNavigateWindows();
              }}
              onMouseEnter={() => playHover()}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-display font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
            >
              <Monitor className="w-4 h-4" />
              <span>Download Desktop Version</span>
            </button>
          </div>
        </div>

      </motion.div>

      {/* Feature Comparison Section Included Below */}
      <div className="w-full max-w-6xl">
        <FeatureComparisonSection />
      </div>

    </div>
  );
}
