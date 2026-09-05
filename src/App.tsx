/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SoundProvider, useSound } from "./hooks/useSound";
import { CustomCursor, Magnetic, TouchRippleSystem } from "./components/Cursor";
import { Backdrop } from "./components/Backdrop";
import { Header } from "./components/Header";
import { AICore } from "./components/AICore";
import { FounderSection } from "./components/FounderSection";
import { Capabilities } from "./components/Capabilities";
import { FeatureComparisonSection } from "./components/FeatureComparisonSection";
import { InteractiveDemo } from "./components/InteractiveDemo";
import { PerformanceStats } from "./components/PerformanceStats";
import { WhyMax } from "./components/WhyMax";
import { SecuritySection } from "./components/SecuritySection";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { DownloadSection } from "./components/DownloadSection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { WindowsDownloadPage } from "./components/WindowsDownloadPage";
import { AndroidDownloadPage } from "./components/AndroidDownloadPage";
import { PricingSection } from "./components/PricingSection";

import { Terminal, ArrowRight, Download, ChevronDown, CheckCircle, Sparkles, Globe, Smartphone } from "lucide-react";
import atulPhoto from "./assets/images/atul.png";

type PageView = "home" | "download-windows" | "download-android";

function MainAppContent() {
  const { playClick, playHover } = useSound();
  const [currentPage, setCurrentPage] = useState<PageView>("home");
  const [tickerIndex, setTickerIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync window hash for routing support
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#download-windows") {
        setCurrentPage("download-windows");
      } else if (hash === "#download-android") {
        setCurrentPage("download-android");
      } else {
        setCurrentPage("home");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToPage = (page: PageView) => {
    setCurrentPage(page);
    if (page === "download-windows") {
      window.location.hash = "#download-windows";
    } else if (page === "download-android") {
      window.location.hash = "#download-android";
    } else {
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Track scroll position
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

  // Subtitle scrolling tickers for Hero
  const COMPANION_ABILITIES = [
    "control sandboxed VMs securely",
    "show real-time stock market views & charts",
    "automate apps across Android & Windows",
    "understand your screen in real time",
    "execute duplex voice with zero latency",
    "automate WhatsApp, YouTube & Spotify",
    "conduct deep autonomous research",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % COMPANION_ABILITIES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleCTAWindows = () => {
    playClick();
    navigateToPage("download-windows");
  };

  const handleCTAWeb = () => {
    playClick();
    window.open("https://max-ai-atulapps.vercel.app/", "_blank", "noopener,noreferrer");
  };

  const handleCTAAndroid = () => {
    playClick();
    navigateToPage("download-android");
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden selection:bg-brand-purple/30 selection:text-brand-cyan">
      {/* 1. Global Custom Cursor (desktop) */}
      <CustomCursor />
      {/* 1b. Mobile Touch Ripple Animations */}
      <TouchRippleSystem />

      {/* 2. Shimmering Backdrop Space */}
      <Backdrop />

      {/* 3. Navigation Header */}
      <Header onNavigateDownloadWindows={() => navigateToPage("download-windows")} />

      {/* 4. Scroll progress visual bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/5 z-50">
        <div
          className="h-full bg-gradient-to-r from-brand-purple via-brand-pink to-brand-cyan shadow-[0_0_10px_#00f0ff]"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* RENDER DEDICATED PAGES OR HOME PAGE */}
      <AnimatePresence mode="wait">
        {currentPage === "download-windows" ? (
          <motion.div
            key="page-windows"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WindowsDownloadPage onBackHome={() => navigateToPage("home")} />
          </motion.div>
        ) : currentPage === "download-android" ? (
          <motion.div
            key="page-android"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AndroidDownloadPage
              onBackHome={() => navigateToPage("home")}
            />
          </motion.div>
        ) : (
          <motion.div
            key="page-home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 5. HERO SECTION */}
            <section className="min-h-screen pt-24 sm:pt-32 pb-12 flex flex-col justify-start lg:justify-center items-start lg:items-center relative px-5 sm:px-6 z-10 overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Floating Widget Left — xl only */}
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

              {/* Floating Widget Right — xl only */}
              <motion.div 
                initial={{ opacity: 0, x: 50, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 3 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                className="hidden xl:block absolute bottom-36 right-8 w-72 p-5 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-3xl shadow-2xl select-none"
              >
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-lg shadow-[0_0_15px_rgba(79,70,229,0.5)]">◈</div>
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

              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start lg:items-center">
                
                {/* Hero Left Content */}
                {/* Hero Left Content — Left-aligned matching user reference */}
                <div className="lg:col-span-7 flex flex-col items-start text-left relative max-w-xl w-full">
                  
                  {/* Creator badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md mb-2.5 select-none hover:border-indigo-500/20 transition-all duration-300"
                  >
                    <img
                      src={atulPhoto}
                      alt="Atul Sharma"
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover border border-white/20"
                    />
                    <span className="text-xs text-slate-300 font-sans tracking-wide">
                      Created by <strong className="text-white font-semibold">Atul Sharma</strong>
                    </span>
                  </motion.div>

                  {/* Flagship badge (Matching user screenshot) */}
                  <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-[11px] font-mono tracking-[0.18em] font-bold text-indigo-300 uppercase mb-5 hover:border-indigo-400/40 transition-colors duration-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse shrink-0" />
                    <span>NEXT GEN OS V2.6</span>
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white mb-4 drop-shadow-[0_0_40px_rgba(99,102,241,0.25)] text-left"
                  >
                    Meet Max AI
                  </motion.h1>

                  {/* Subtitle ticker */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="text-base sm:text-lg md:text-xl text-slate-300 font-sans font-light leading-relaxed max-w-xl mb-7 min-h-[56px] relative overflow-hidden text-left"
                  >
                    <span>The first intelligent operating system that can </span>
                    <div className="inline-block font-semibold text-cyan-300 glow-text-cyan">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={tickerIndex}
                          initial={{ y: 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -15, opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="inline-block"
                        >
                          {COMPANION_ABILITIES[tickerIndex]}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Hero CTA Buttons — left-aligned pill buttons stacked on mobile, row on sm+ */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto pt-1"
                  >
                    {/* BUTTON 1: Use on Web */}
                    <button
                      onClick={handleCTAWeb}
                      className="group relative w-auto px-7 py-3.5 bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#f97316] text-white rounded-full font-bold text-sm sm:text-base overflow-hidden transition-all duration-300 active:scale-95 shadow-[0_0_35px_rgba(168,85,247,0.45)] flex items-center justify-center gap-2.5 cursor-pointer border border-white/20 hover:shadow-[0_0_45px_rgba(249,115,22,0.5)]"
                    >
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Globe className="w-5 h-5 shrink-0" />
                      <span>Use on Web</span>
                      <Sparkles className="w-4 h-4 text-cyan-200 animate-pulse shrink-0" />
                    </button>

                    {/* BUTTON 2: Download for Windows */}
                    <button
                      onClick={handleCTAWindows}
                      className="group relative w-auto px-7 py-3.5 bg-white text-black rounded-full font-bold text-sm sm:text-base overflow-hidden transition-all duration-300 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2.5 cursor-pointer border border-white hover:bg-slate-100"
                    >
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Download className="w-5 h-5 shrink-0 text-black" />
                      <span>Download for Windows</span>
                    </button>

                    {/* BUTTON 3: Download for Android */}
                    <button
                      onClick={handleCTAAndroid}
                      className="group relative w-auto px-7 py-3.5 bg-white/[0.05] border border-white/10 backdrop-blur-xl rounded-full font-semibold text-sm sm:text-base text-white overflow-hidden transition-all duration-300 active:scale-95 hover:bg-white/[0.1] hover:border-white/20 flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                    >
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <Smartphone className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>Download for Android</span>
                    </button>
                  </motion.div>

                  {/* Spec sub-bar (Matching user screenshot) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-6 flex items-center justify-start gap-2.5 text-[11px] font-mono text-cyan-400/80 uppercase tracking-[0.2em]"
                  >
                    <span>BUILD V1.0.0 RELEASE</span>
                    <span className="text-slate-600">•</span>
                    <span>AES-256 LOCALVM</span>
                  </motion.div>

                </div>

                {/* Hero Right: 3D Robot — taller and larger on mobile */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.0, ease: "easeOut" }}
                  className="lg:col-span-5 h-[380px] sm:h-[440px] md:h-[500px] lg:h-[560px] flex items-center justify-center relative w-full mt-4 lg:mt-0"
                >
                  <AICore scrollProgress={scrollProgress} />
                </motion.div>

              </div>

              {/* Scroll down indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hidden sm:block">SCROLL DOWN</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-brand-cyan"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </div>
            </section>

            {/* 6. FOUNDER SECTION (Moved right after Home as requested) */}
            <FounderSection />

          {/* 8. BRAND-NEW FEATURE COMPARISON SECTION */}
            <FeatureComparisonSection />

                        {/* 12. BRAND NEW SECURITY SECTION */}
            <SecuritySection />


            {/* 7. COMPLETE FEATURES SECTION */}
            <Capabilities />

            {/* 9. INTERACTIVE DEMO */}
            <InteractiveDemo />

            {/* 10. PERFORMANCE STATS */}
            <PerformanceStats />

            {/* 11. WHY MAX */}
            <WhyMax />

            {/* 12. PRICING SECTION */}
            <PricingSection onNavigatePage={navigateToPage} />

            {/* 13. UPGRADED FAQ SECTION */}
            <FAQ />

            {/* 15. DOWNLOADS SECTION */}
            <DownloadSection onNavigatePage={navigateToPage} />

            {/* 16. CONTACT SECTION */}
            <Contact />

            {/* 17. FOOTER */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
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
