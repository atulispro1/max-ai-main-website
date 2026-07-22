/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Terminal, Github, Twitter, MessageSquare, Shield } from "lucide-react";
import { useSound } from "../hooks/useSound";
import maxAiLogo from "../assets/images/max_ai_logo_1783596520565.jpg";

export function Footer() {
  const { playClick, playHover } = useSound();

  const handleNavClick = (id: string) => {
    playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-white/5 bg-[#020203] pt-20 pb-12 relative overflow-hidden z-10">
      
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-[35%] right-[35%] h-[200px] w-[30%] bg-indigo-500/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand description */}
          <div className="lg:col-span-5 text-left">
            <div className="flex items-center gap-3.5 mb-5 select-none">
              <img
                src={maxAiLogo}
                alt="Max AI Logo"
                referrerPolicy="no-referrer"
                className="w-8 h-8 rounded-lg object-cover shadow-[0_0_20px_rgba(99,102,241,0.4)] border border-white/10"
              />
              <div className="flex flex-col text-left leading-none">
                <span className="font-display font-semibold text-xl tracking-tight text-white">
                  MAX AI
                </span>
                <span className="text-[8px] text-indigo-400 font-mono tracking-wider mt-0.5 font-bold uppercase">
                  BY ATUL SHARMA
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              A flagship autonomous contextual computing environment designed to revolutionize desktop automation, layout auditing, and human-computer speech arrays.
            </p>
            <div className="flex items-center gap-4 text-slate-500">
              <a href="#" onMouseEnter={playHover} className="hover:text-white transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" onMouseEnter={playHover} className="hover:text-white transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" onMouseEnter={playHover} className="hover:text-white transition-colors duration-200">
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Architecture anchors */}
          <div className="lg:col-span-2.5 text-left">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold mb-5">
              PRODUCT CORES
            </h4>
            <ul className="space-y-3.5 text-sm font-medium text-slate-400">
              <li>
                <button onClick={() => handleNavClick("features")} onMouseEnter={playHover} className="hover:text-brand-cyan transition-colors duration-200 cursor-pointer">
                  Feature Suite
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("demo")} onMouseEnter={playHover} className="hover:text-brand-cyan transition-colors duration-200 cursor-pointer">
                  Interactive Demo
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("why-max")} onMouseEnter={playHover} className="hover:text-brand-cyan transition-colors duration-200 cursor-pointer">
                  Competitive Matrix
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("download")} onMouseEnter={playHover} className="hover:text-brand-cyan transition-colors duration-200 cursor-pointer">
                  Packages & Downloads
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Telemetry anchors */}
          <div className="lg:col-span-2.5 text-left">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold mb-5">
              TELEMETRY LOGIC
            </h4>
            <ul className="space-y-3.5 text-sm font-medium text-slate-400">
              <li>
                <button onClick={() => handleNavClick("faq")} onMouseEnter={playHover} className="hover:text-brand-cyan transition-colors duration-200 cursor-pointer">
                  FAQ Accordion
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("stats")} onMouseEnter={playHover} className="hover:text-brand-cyan transition-colors duration-200 cursor-pointer">
                  System Stats
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("testimonials")} onMouseEnter={playHover} className="hover:text-brand-cyan transition-colors duration-200 cursor-pointer">
                  Founder Profile
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick("contact")} onMouseEnter={playHover} className="hover:text-brand-cyan transition-colors duration-200 cursor-pointer">
                  Contact Creator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: System Certification */}
          <div className="lg:col-span-2 text-left">
            <h4 className="text-xs font-mono text-slate-500 uppercase tracking-widest font-bold mb-5">
              CERTIFICATION
            </h4>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4.5 h-4.5 text-brand-cyan animate-pulse" />
                <span className="text-[10px] font-mono text-brand-cyan font-bold tracking-wider">SECURE SHIELD</span>
              </div>
              <p className="text-[10px] font-mono text-slate-500 leading-normal">
                E2EE Sandbox VM execution verified compliant in 2026. Zero context telemetry leaks.
              </p>
            </div>
          </div>

        </div>

        {/* Footer bottom metadata credits */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-slate-500 gap-4">
          <div className="flex items-center gap-1.5 uppercase">
            <span>© 2026 MAX AI COGNITIVE LABS.</span>
            <span className="text-slate-600">|</span>
            <span>ALL RIGHTS RESERVED.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" onMouseEnter={playHover} className="hover:text-slate-300 transition-colors duration-200">PRIVACY POLICY</a>
            <a href="#" onMouseEnter={playHover} className="hover:text-slate-300 transition-colors duration-200">TERMS OF COMPLIANCE</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
