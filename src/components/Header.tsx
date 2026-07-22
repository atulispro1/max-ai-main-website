/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { useSound } from "../hooks/useSound";
import { Magnetic } from "./Cursor";
import { Volume2, VolumeX, Sparkles, Terminal, Download, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import maxAiLogo from "../assets/images/max_ai_logo_1783596520565.jpg";

export function Header() {
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
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#020203]/70 backdrop-blur-md border-white/5 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
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
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-400">
          <button onClick={() => handleNavClick("features")} onMouseEnter={playHover} className="hover:text-white transition-colors duration-200 cursor-pointer">
            Features
          </button>
          <button onClick={() => handleNavClick("demo")} onMouseEnter={playHover} className="hover:text-white transition-colors duration-200 cursor-pointer">
            Interactive Demo
          </button>
          <button onClick={() => handleNavClick("why-max")} onMouseEnter={playHover} className="hover:text-white transition-colors duration-200 cursor-pointer">
            Why Max
          </button>
          <button onClick={() => handleNavClick("testimonials")} onMouseEnter={playHover} className="hover:text-white transition-colors duration-200 cursor-pointer">
            Founder Profile
          </button>
          <button onClick={() => handleNavClick("contact")} onMouseEnter={playHover} className="hover:text-white transition-colors duration-200 cursor-pointer">
            Contact Creator
          </button>
          <button onClick={() => handleNavClick("faq")} onMouseEnter={playHover} className="hover:text-white transition-colors duration-200 cursor-pointer">
            FAQ
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          
          {/* Sound Toggle */}
          <button
            onClick={() => {
              toggleMute();
            }}
            onMouseEnter={playHover}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 cursor-pointer ${
              muted
                ? "border-rose-500/20 bg-rose-500/5 text-rose-400 hover:bg-rose-500/10"
                : "border-brand-cyan/20 bg-brand-cyan/5 text-brand-cyan hover:bg-brand-cyan/10 hover:shadow-[0_0_15px_rgba(0,240,255,0.1)]"
            }`}
            title={muted ? "Enable Interface Synthesizer" : "Mute Sound Synthesizer"}
          >
            {muted ? (
              <VolumeX className="w-4.5 h-4.5" />
            ) : (
              <Volume2 className="w-4.5 h-4.5 animate-pulse" />
            )}
          </button>

          {/* Quick Download Button */}
          <div className="hidden sm:block">
            <Magnetic>
              <button
                onClick={() => handleNavClick("download")}
                onMouseEnter={playHover}
                className="px-5 py-2.5 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-white bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(156,84,255,0.25)] flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Windows Setup
              </button>
            </Magnetic>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="lg:hidden w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#0a081c]/95 border-b border-white/5 backdrop-blur-lg overflow-hidden py-6 z-50 flex flex-col px-6 gap-4"
          >
            <button
              onClick={() => handleNavClick("features")}
              className="text-left py-2.5 text-slate-300 hover:text-brand-cyan text-base font-semibold cursor-pointer border-b border-white/5"
            >
              Features
            </button>
            <button
              onClick={() => handleNavClick("demo")}
              className="text-left py-2.5 text-slate-300 hover:text-brand-cyan text-base font-semibold cursor-pointer border-b border-white/5"
            >
              Interactive Demo
            </button>
            <button
              onClick={() => handleNavClick("why-max")}
              className="text-left py-2.5 text-slate-300 hover:text-brand-cyan text-base font-semibold cursor-pointer border-b border-white/5"
            >
              Why Max
            </button>
            <button
              onClick={() => handleNavClick("testimonials")}
              className="text-left py-2.5 text-slate-300 hover:text-brand-cyan text-base font-semibold cursor-pointer border-b border-white/5"
            >
              Founder Profile
            </button>
            <button
              onClick={() => handleNavClick("contact")}
              className="text-left py-2.5 text-slate-300 hover:text-brand-cyan text-base font-semibold cursor-pointer border-b border-white/5"
            >
              Contact Creator
            </button>
            <button
              onClick={() => handleNavClick("faq")}
              className="text-left py-2.5 text-slate-300 hover:text-brand-cyan text-base font-semibold cursor-pointer border-b border-white/5"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick("download")}
              className="w-full py-3 mt-2 rounded-xl text-xs font-display font-bold uppercase tracking-wider text-dark-bg bg-white hover:opacity-90 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 fill-current" />
              Download Packages
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
