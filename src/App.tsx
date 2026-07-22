/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { SoundProvider, useSound } from "./hooks/useSound";
import { CustomCursor, Magnetic } from "./components/Cursor";
import { Backdrop } from "./components/Backdrop";
import { Header } from "./components/Header";
import { AICore } from "./components/AICore";
import { InteractiveDemo } from "./components/InteractiveDemo";
import { Capabilities } from "./components/Capabilities";
import { PerformanceStats } from "./components/PerformanceStats";
import { WhyMax } from "./components/WhyMax";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { DownloadSection } from "./components/DownloadSection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Terminal, ArrowRight, Download, ChevronDown, CheckCircle, Sparkles, Globe, Smartphone } from "lucide-react";
import atulSharmaPhoto from "./assets/images/atul_sharma_1784120840628.jpg";

function MainAppContent() {
  const { playClick, playHover } = useSound();
  const [tickerIndex, setTickerIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll position to guide the 3D Core orbital camera
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(window.scrollY / totalScroll);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Subtitle scrolling tickers for the Hero
  const COMPANION_ABILITIES = [
    "talk in 24ms duplex audio",
    "see and parse active window UI layouts",
    "understand complex codebase designs",
    "remember context across sessions",
    "research and fetch citations",
    "control sandboxed VMs securely",
    "automate background pipelines"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % COMPANION_ABILITIES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleCTAWindows = () => {
    playClick();
    const element = document.getElementById("download");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden selection:bg-brand-purple/30 selection:text-brand-cyan">
      {/* 1. Global Custom Cursor follow engine */}
      <CustomCursor />

      {/* 2. Shimmering backdrop space aurora grids */}
      <Backdrop />

      {/* 3. Navigation controller */}
      <Header />

      {/* 4. Scroll progress visual bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50">
        <div
          className="h-full bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan shadow-[0_0_10px_#00f0ff]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* 5. Majestic Cinematic Hero Section */}
      <section className="min-h-screen pt-32 pb-16 flex items-center justify-center relative px-6 z-10 overflow-hidden">
        
        {/* Floor grid perspective line separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Floating Analyze Widget (Immersive UI specific) */}
        <motion.div 
          initial={{ opacity: 0, x: -50, rotate: -6 }}
          animate={{ opacity: 1, x: 0, rotate: -4 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="hidden xl:block absolute top-36 left-8 w-64 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl shadow-2xl select-none"
        >
          <div className="flex gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
          </div>
          <div className="space-y-3">
            <div className="h-2 w-3/4 bg-white/20 rounded-full" />
            <div className="h-2 w-1/2 bg-white/10 rounded-full" />
            <div className="h-2 w-full bg-white/5 rounded-full" />
          </div>
          <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center">
            <span className="text-[10px] text-indigo-400 font-mono tracking-wider font-semibold">ANALYZING SCREEN...</span>
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          </div>
        </motion.div>

        {/* Floating Active Voice Widget (Immersive UI specific) */}
        <motion.div 
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="hidden xl:block absolute bottom-36 right-8 w-72 p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-3xl shadow-2xl select-none"
        >
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              ◈
            </div>
            <div>
              <div className="text-xs font-bold font-display uppercase tracking-wider text-slate-200">MAX VOICE</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Active Listening</div>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-8 justify-center">
            <motion.div animate={{ height: [8, 16, 8] }} transition={{ duration: 1, repeat: Infinity, delay: 0.1 }} className="w-1 bg-indigo-400 rounded-full" />
            <motion.div animate={{ height: [12, 28, 12] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }} className="w-1 bg-indigo-500 rounded-full" />
            <motion.div animate={{ height: [18, 36, 18] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} className="w-1 bg-white rounded-full" />
            <motion.div animate={{ height: [14, 24, 14] }} transition={{ duration: 1.1, repeat: Infinity, delay: 0.4 }} className="w-1 bg-indigo-500 rounded-full" />
            <motion.div animate={{ height: [6, 12, 6] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.5 }} className="w-1 bg-indigo-400 rounded-full" />
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero contents */}
          <div className="lg:col-span-7 flex flex-col items-start text-left relative">
            
            {/* Creator verified badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-4 select-none hover:border-indigo-500/20 transition-all duration-300"
            >
              <img
                src={atulSharmaPhoto}
                alt="Atul Sharma"
                referrerPolicy="no-referrer"
                className="w-5.5 h-5.5 rounded-full object-cover border border-white/20"
              />
              <span className="text-[11px] text-slate-300 font-sans tracking-wide">
                Created by <strong className="text-white font-medium">Atul Sharma</strong>
              </span>
            </motion.div>

            {/* 2026 flagship introduction badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-300 mb-6 hover:border-indigo-400/40 transition-colors duration-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              Next Gen OS v2.0
            </motion.div>

            {/* Title display */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl sm:text-7xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-6"
            >
              Meet <span className="bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(99,102,241,0.25)]">Max AI</span>
            </motion.h1>

            {/* Capability dynamic scrolling subtitle ticker */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg md:text-xl text-slate-400 font-sans font-light leading-relaxed max-w-xl mb-10 h-[56px] relative overflow-hidden"
            >
              <span>The first intelligent operating system that can </span>
              <div className="inline-block font-semibold text-indigo-300 glow-text-cyan underline decoration-indigo-500/20">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={tickerIndex}
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -22, opacity: 0 }}
                    transition={{ duration: 0.45, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    {COMPANION_ABILITIES[tickerIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Primary Action Buttons (3 Highlighted buttons, Use it on Web is most priority) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-4"
            >
              {/* PRIMARY 1: Use it on Website (Most highlighted & glowing) */}
              <Magnetic>
                <button
                  onClick={() => {
                    playClick();
                    document.getElementById("interactive-demo")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  onMouseEnter={() => playHover()}
                  className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 via-purple-600 to-orange-500 text-white rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_35px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2.5 cursor-pointer border border-white/10"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Globe className="w-4.5 h-4.5 animate-spin" style={{ animationDuration: '10s' }} />
                  <span>Use it on Website</span>
                  <Sparkles className="w-3.5 h-3.5 text-orange-300 animate-pulse" />
                </button>
              </Magnetic>

              {/* SECONDARY 2: Download for Windows */}
              <Magnetic>
                <button
                  onClick={handleCTAWindows}
                  onMouseEnter={() => playHover()}
                  className="group relative px-7 py-4 bg-white text-black rounded-full font-semibold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-black" />
                  <span>Download for Windows</span>
                </button>
              </Magnetic>

              {/* SECONDARY 3: Download for Android */}
              <button
                onClick={() => {
                  playClick();
                  document.getElementById("download")?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={() => playHover()}
                className="px-7 py-4 bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-full font-semibold hover:bg-white/[0.08] hover:border-white/20 hover:text-white hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>Download for Android</span>
              </button>
            </motion.div>

            {/* Quick specifications line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex items-center gap-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest"
            >
              <span>Build 2.6.0 Stable</span>
              <span>•</span>
              <span>AES-256 localVM</span>
            </motion.div>

          </div>

          {/* Right Hero: Majestic Interactive 3D Core Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
            className="lg:col-span-5 h-[420px] md:h-[550px] flex items-center justify-center relative"
          >
            {/* The 3D AICore canvas listens to scroll progress to pivot camera */}
            <AICore scrollProgress={scrollProgress} />
          </motion.div>

        </div>

        {/* Scroll indicator hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">SCROLL DOWN</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-brand-cyan"
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </div>

      </section>

      {/* 6. Capabilites Bento Grid */}
      <Capabilities />

      {/* 7. Animated conversation timeline demo */}
      <InteractiveDemo />

      {/* 8. Dashboard statistical countup counters */}
      <PerformanceStats />

      {/* 9. Head to Head Competitive comparison matrix */}
      <WhyMax />

      {/* 10. Infinite Testimonials scrolling marquee */}
      <Testimonials />

      {/* 11. FAQ Accordion panel */}
      <FAQ />

      {/* 12. Platforms Download center cards with mock progressive download speed tracking */}
      <DownloadSection />

      {/* 12.5. Attractive Contact direct email sync form section */}
      <Contact />

      {/* 13. Majestic brand footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <SoundProvider>
      <MainAppContent />
    </SoundProvider>
  );
}
