/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { useSound } from "../hooks/useSound";
import { Magnetic } from "./Cursor";
import { Volume2, VolumeX, Sparkles, Terminal, Download, Menu, X, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import maxAiLogo from "../assets/images/max_ai_logo_1783596520565.jpg";

interface HeaderProps {
  onNavigateDownloadWindows?: () => void;
}

export function Header({ onNavigateDownloadWindows }: HeaderProps) {
  const { muted, toggleMute, playHover, playClick } = useSound();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    playClick();
    setMobileMenuOpen(false);

    // If currently on a dedicated subpage, go home first
    if (window.location.hash) {
      window.location.hash = "";
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#020203]/85 backdrop-blur-2xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-[#020203]/60 to-transparent border-b border-transparent py-5"
      }`}
    >
      {/* Animated gradient line at bottom of header */}
      <div className={`absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-500 ${
        scrolled ? "opacity-100" : "opacity-0"
      }`}>
        <div className="h-full bg-gradient-to-r from-transparent via-brand-purple/40 via-brand-cyan/40 to-transparent animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.hash = "";
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          <img
            src={maxAiLogo}
            alt="Max AI Logo"
            referrerPolicy="no-referrer"
            className="w-9 h-9 rounded-xl object-cover group-hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-white/10"
          />
          <div className="flex flex-col text-left leading-none">
            <span className="font-display font-semibold text-xl tracking-tight text-white group-hover:text-indigo-300 transition-colors duration-300">
              MAX AI
            </span>
            <span className="text-[9px] text-indigo-400 font-mono tracking-widest mt-0.5 font-bold uppercase">
              BY ATUL SHARMA
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-400">
          <button onClick={() => handleNavClick("founder")} onMouseEnter={playHover} className="px-3.5 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-all duration-200 cursor-pointer">
            Founder
          </button>
          <button onClick={() => handleNavClick("features")} onMouseEnter={playHover} className="px-3.5 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-all duration-200 cursor-pointer">
            Features
          </button>
          <button onClick={() => handleNavClick("comparison")} onMouseEnter={playHover} className="px-3.5 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-all duration-200 cursor-pointer">
            Comparison
          </button>
          <button onClick={() => handleNavClick("security")} onMouseEnter={playHover} className="px-3.5 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-all duration-200 cursor-pointer">
            Security
          </button>
          <button onClick={() => handleNavClick("contact")} onMouseEnter={playHover} className="px-3.5 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-all duration-200 cursor-pointer">
            Contact
          </button>
          <button onClick={() => handleNavClick("faq")} onMouseEnter={playHover} className="px-3.5 py-2 rounded-lg hover:bg-white/[0.06] hover:text-white transition-all duration-200 cursor-pointer">
            FAQ
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Quick Windows Download Button - Hidden on smallest screens */}
          <div className="hidden xs:block">
            <Magnetic>
              <button
                onClick={() => {
                  playClick();
                  if (onNavigateDownloadWindows) {
                    onNavigateDownloadWindows();
                  } else {
                    window.location.hash = "#download-windows";
                  }
                }}
                onMouseEnter={playHover}
                className="px-4 py-2.5 rounded-xl text-[10px] sm:text-xs font-display font-bold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.3)] flex items-center gap-1.5 cursor-pointer border border-white/10"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Windows Setup</span>
              </button>
            </Magnetic>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => toggleMute()}
            onMouseEnter={playHover}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer ${
              muted
                ? "border-rose-500/20 bg-rose-500/5 text-rose-400"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
            title={muted ? "Enable Audio" : "Mute Audio"}
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden w-9 h-9 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Panel - Glass slide in */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden fixed top-full left-4 right-4 mt-2 rounded-2xl bg-[#0a081c]/95 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="py-3 px-3 flex flex-col gap-1">
              <button
                onClick={() => handleNavClick("founder")}
                className="text-left px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-semibold cursor-pointer transition-all"
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                  Founder Profile
                </span>
              </button>
              <button
                onClick={() => handleNavClick("features")}
                className="text-left px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-semibold cursor-pointer transition-all"
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                  All Features
                </span>
              </button>
              <button
                onClick={() => handleNavClick("comparison")}
                className="text-left px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-semibold cursor-pointer transition-all"
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                  Platform Comparison
                </span>
              </button>
              <button
                onClick={() => handleNavClick("security")}
                className="text-left px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-semibold cursor-pointer transition-all"
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Security Architecture
                </span>
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="text-left px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-semibold cursor-pointer transition-all"
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  Contact Creator
                </span>
              </button>
              <button
                onClick={() => handleNavClick("faq")}
                className="text-left px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] text-sm font-semibold cursor-pointer transition-all"
              >
                <span className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  FAQ
                </span>
              </button>
              
              <div className="border-t border-white/5 my-2 mx-2" />
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onNavigateDownloadWindows) onNavigateDownloadWindows();
                  else window.location.hash = "#download-windows";
                }}
                className="mx-2 py-3.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:opacity-90 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                Download Windows Installer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
