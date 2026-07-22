/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSound } from "../hooks/useSound";
import { Terminal, Monitor, Sparkles, CheckCircle2, Play, RefreshCw, Cpu, MessageSquareQuote, Sliders } from "lucide-react";

type DemoState = "idle" | "typing" | "scanning" | "thinking" | "responding" | "completed";

interface DemoPreset {
  id: string;
  tabLabel: string;
  promptText: string;
  thinkingLogs: string[];
  responseTitle: string;
  responseText: string;
  mockUIContent: {
    title: string;
    description: string;
    tag: string;
    status: string;
  };
}

const PRESETS: DemoPreset[] = [
  {
    id: "vision",
    tabLabel: "Screen Understanding",
    promptText: "What is on my screen right now, and how do I optimize the layout?",
    thinkingLogs: [
      "Acquiring high-resolution screen buffer...",
      "Executing OCR & vision layout boundary scans...",
      "Analyzing visual hierarchy & contrast ratios...",
      "Evaluating alignment against Apple & Arc design systems...",
    ],
    responseTitle: "Max Vision Core",
    responseText: "I've analyzed your Figma workspace. I detect a visual alignment error in your Hero CTA module: the primary button has 3px offset padding from the grid lines, and the body text is currently sitting at 4.2:1 contrast ratio, which is below WCAG AA recommendations. Increasing the weight to medium and adding 4px gap will solve it.",
    mockUIContent: {
      title: "Hero Banner Component",
      description: "Padding: px-5 py-3 | Text-Contrast: 4.2:1",
      tag: "Vision Audit",
      status: "3 Alignment Errors Detected",
    }
  },
  {
    id: "voice",
    tabLabel: "Voice AI",
    promptText: "Summarize our engineering sync and list the action items.",
    thinkingLogs: [
      "Transcribing 128kbps stereo spatial microphone array...",
      "Separating speaker voices via neural diarization...",
      "Filtering conversational fluff & technical jargon...",
      "Synthesizing high-level summary & assignee matrix...",
    ],
    responseTitle: "Max Voice Core",
    responseText: "Based on the team transcript, Sarah will finish the Three.js canvas refactoring by Friday. David is taking over the cloud deployment routing. The main blocking issue is Vite's hot module building in dev containers, which David will debug tomorrow. I have synchronized these tickets directly to your Linear workspace.",
    mockUIContent: {
      title: "Transcript: #sync-engineering",
      description: "Duration: 18m | Speakers: 3 (Sarah, David, User)",
      tag: "Acoustic AI",
      status: "Synced to Linear & Notion",
    }
  },
  {
    id: "automation",
    tabLabel: "Desktop Automation",
    promptText: "Deploy the latest release build and message the Slack channel.",
    thinkingLogs: [
      "Initializing desktop environment sandboxed VM...",
      "Compiling TypeScript production assets (npm run build)...",
      "Uploading assets to global edge routing network...",
      "Authenticating with company Slack workspace API...",
    ],
    responseTitle: "Max Automation Core",
    responseText: "Deployment successful! I compiled your source codebase, ran the linter, verified zero warnings, deployed to the staging cluster in 1.4s, and broadcasted the release changelog directly to #announcements-engineering with the live testing URL.",
    mockUIContent: {
      title: "Local Production VM",
      description: "Linter: 0 errors | Build: Complete in 1.4s",
      tag: "OS Agent",
      status: "Staging URL Active: ais-dev-g7...",
    }
  }
];

export function InteractiveDemo() {
  const { playHover, playClick, playScan, playSuccess } = useSound();
  const [activePreset, setActivePreset] = useState<DemoPreset>(PRESETS[0]);
  const [demoState, setDemoState] = useState<DemoState>("idle");
  const [typedPrompt, setTypedPrompt] = useState("");
  const [currentThoughtIdx, setCurrentThoughtIdx] = useState(0);
  const [responseText, setResponseText] = useState("");
  const [waveformData, setWaveformData] = useState<number[]>([]);

  const waveformIntervalRef = useRef<number | null>(null);

  // Initialize static waveform state
  useEffect(() => {
    const data = Array.from({ length: 18 }, () => Math.random() * 10 + 5);
    setWaveformData(data);
  }, []);

  // Trigger conversational step machine
  const startDemo = (preset: DemoPreset = activePreset) => {
    playClick();
    setDemoState("typing");
    setTypedPrompt("");
    setResponseText("");
    setCurrentThoughtIdx(0);
    
    if (waveformIntervalRef.current) {
      clearInterval(waveformIntervalRef.current);
    }

    // 1. Simulate typing of prompt
    let charIdx = 0;
    const prompt = preset.promptText;
    const typingTimer = setInterval(() => {
      setTypedPrompt((prev) => prev + prompt[charIdx]);
      charIdx++;
      if (charIdx >= prompt.length) {
        clearInterval(typingTimer);
        // Advance to scanning state after typing is completed
        setTimeout(() => {
          setDemoState("scanning");
          playScan();
          // After scanning laser sweeps, proceed to thinking
          setTimeout(() => {
            setDemoState("thinking");
            startThinkingCycle(preset);
          }, 1500);
        }, 800);
      }
    }, 22);
  };

  // 2. Thinking logs cycle
  const startThinkingCycle = (preset: DemoPreset) => {
    let logIdx = 0;
    const thinkingTimer = setInterval(() => {
      logIdx++;
      if (logIdx < preset.thinkingLogs.length) {
        setCurrentThoughtIdx(logIdx);
      } else {
        clearInterval(thinkingTimer);
        // Advance to responding
        setTimeout(() => {
          setDemoState("responding");
          startRespondingCycle(preset);
        }, 500);
      }
    }, 700);
  };

  // 3. Responding cycle (animated letters + dancing voice waveform)
  const startRespondingCycle = (preset: DemoPreset) => {
    let wordIdx = 0;
    const words = preset.responseText.split(" ");
    
    // Waveform dancing animation
    waveformIntervalRef.current = window.setInterval(() => {
      setWaveformData(Array.from({ length: 18 }, () => Math.random() * 45 + 5));
    }, 90);

    const respondingTimer = setInterval(() => {
      setResponseText((prev) => (prev ? prev + " " + words[wordIdx] : words[wordIdx]));
      wordIdx++;
      
      if (wordIdx >= words.length) {
        clearInterval(respondingTimer);
        if (waveformIntervalRef.current) {
          clearInterval(waveformIntervalRef.current);
          waveformIntervalRef.current = null;
        }
        // Rest voice waves
        setWaveformData(Array.from({ length: 18 }, () => Math.random() * 8 + 3));
        
        setDemoState("completed");
        playSuccess();
      }
    }, 45);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (waveformIntervalRef.current) clearInterval(waveformIntervalRef.current);
    };
  }, []);

  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      {/* Visual neon light beams */}
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full bg-brand-cyan/5 blur-[120px]" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-purple/5 blur-[130px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs text-indigo-300 font-mono uppercase tracking-[0.2em] font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
            Interactive Core Simulation
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4"
          >
            Experience Max AI in Action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-400 font-light"
          >
            Don't just take our word for it. Choose a capability below and watch Max analyze your workspace, automate actions, and speak in real-time.
          </motion.p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
          {PRESETS.map((preset) => {
            const isActive = activePreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  playClick();
                  setActivePreset(preset);
                  setDemoState("idle");
                  setTypedPrompt("");
                  setResponseText("");
                }}
                className={`px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-indigo-500/10 border-indigo-500/50 text-white shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                    : "bg-[#020203]/40 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/10"
                }`}
              >
                {preset.id === "vision" && <Monitor className="w-4 h-4 text-indigo-400" />}
                {preset.id === "voice" && <Sliders className="w-4 h-4 text-orange-400" />}
                {preset.id === "automation" && <Cpu className="w-4 h-4 text-indigo-400" />}
                {preset.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Master Console Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          {/* Left panel: Simulated Screen Workspace */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="glass-panel rounded-2xl overflow-hidden flex-1 flex flex-col border border-white/5 relative">
              {/* Terminal Window Header */}
              <div className="bg-[#020203] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2 uppercase tracking-widest flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    ENVIRONMENT_WORKSPACE_MOCK
                  </span>
                </div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  SANDBOX STABLE
                </span>
              </div>

              {/* Dynamic Mock UI Panel */}
              <div className="p-8 flex-1 flex flex-col justify-between relative bg-slate-950/20 overflow-hidden min-h-[350px]">
                {/* Visual Scanning Holographic Overlay */}
                <AnimatePresence>
                  {demoState === "scanning" && (
                    <motion.div
                      initial={{ top: "0%" }}
                      animate={{ top: "100%" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.4, ease: "easeInOut" }}
                      className="absolute left-0 right-0 h-1 z-30 bg-gradient-to-r from-indigo-500/10 via-indigo-500 to-indigo-500/10 shadow-[0_0_25px_rgba(99,102,241,0.6)] flex justify-center"
                    >
                      <span className="text-[9px] font-mono text-indigo-400 bg-[#020203] border border-indigo-500/30 px-2 py-0.5 rounded -mt-2.5 tracking-wider uppercase">
                        NEURAL VISION RAY BUFFER SCAN
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subtitle / Context tag */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-brand-cyan tracking-wider uppercase border border-brand-cyan/30 px-2 py-0.5 rounded bg-brand-cyan/5">
                      {activePreset.mockUIContent.tag}
                    </span>
                    <h3 className="text-xl font-display font-medium text-slate-200 mt-2">
                      {activePreset.mockUIContent.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    2026-07-09 UTC
                  </span>
                </div>

                {/* Simulated App Mockup representation */}
                <div className="my-6 glass-panel rounded-xl p-5 border border-white/5 bg-slate-950/40 relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-purple animate-ping" />
                    <span className="text-[11px] font-mono text-brand-purple uppercase tracking-wider font-bold">
                      SYSTEM METADATA PARAMETERS
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 font-mono">
                    {activePreset.mockUIContent.description}
                  </p>
                  
                  {/* Digital wireframes inside mock UI */}
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="h-2 bg-white/5 rounded" />
                    <div className="h-2 bg-indigo-500/20 rounded" />
                    <div className="h-2 bg-white/5 rounded" />
                    <div className="h-2 bg-white/5 rounded col-span-2" />
                    <div className="h-2 bg-orange-500/20 rounded" />
                  </div>
                </div>

                {/* Status bar */}
                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${demoState === "scanning" ? "bg-indigo-400 animate-pulse" : "bg-emerald-500"}`} />
                    <span className="text-xs font-mono text-slate-400">
                      STATUS: <strong className="text-slate-300 font-medium">{activePreset.mockUIContent.status}</strong>
                    </span>
                  </div>
                  
                  {/* Action button to trigger */}
                  <button
                    disabled={demoState !== "idle" && demoState !== "completed"}
                    onClick={() => startDemo()}
                    className={`px-4 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all duration-300 border cursor-pointer ${
                      demoState === "idle" || demoState === "completed"
                        ? "bg-indigo-600 hover:bg-indigo-500 border-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                        : "bg-slate-900 border-white/5 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    {demoState === "idle" || demoState === "completed" ? (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Run Simulation
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        Running...
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Conversational Terminal with thinking states & Waveform output */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-panel rounded-2xl overflow-hidden flex-1 flex flex-col border border-white/5 bg-slate-950/60 p-6 relative">
              {/* Inner conversational content */}
              <div className="flex-1 flex flex-col justify-between">
                {/* 1. Prompt / User speech input representation */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-300 font-bold">
                      U
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest">
                      USER REQUEST
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5 text-slate-200 text-sm font-sans min-h-[56px] flex items-center">
                    {typedPrompt ? (
                      <span className="font-medium text-slate-300">
                        {typedPrompt}
                        {demoState === "typing" && (
                          <span className="inline-block w-1.5 h-3 bg-brand-cyan ml-0.5 animate-pulse" />
                        )}
                      </span>
                    ) : (
                      <span className="text-slate-500 italic">Click "Run Simulation" to prompt Max AI...</span>
                    )}
                  </div>
                </div>

                {/* 2. Thinking phase logs */}
                <div className="my-6 py-4 border-t border-b border-white/5 flex-1 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {demoState === "thinking" && (
                      <motion.div
                        key="thinking-logs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="font-mono text-xs text-indigo-400 space-y-1.5"
                      >
                        <div className="flex items-center gap-2 mb-2 text-indigo-300">
                          <Cpu className="w-3.5 h-3.5 animate-spin text-indigo-400" />
                          <span className="font-bold uppercase tracking-wider">MAX_REASONING_LOGS</span>
                        </div>
                        {activePreset.thinkingLogs.map((log, idx) => {
                          const isCompleted = idx < currentThoughtIdx;
                          const isActive = idx === currentThoughtIdx;
                          return (
                            <div
                              key={idx}
                              className={`flex items-center gap-2 transition-opacity duration-300 ${
                                isCompleted ? "opacity-40 text-slate-400" : isActive ? "opacity-100 font-semibold" : "opacity-10"
                              }`}
                            >
                              <span className="text-orange-400">{isCompleted ? "✔" : isActive ? "→" : "○"}</span>
                              <span>{log}</span>
                            </div>
                          );
                        })}
                      </motion.div>
                    )}

                    {demoState === "scanning" && (
                      <motion.div
                        key="scanning-state"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center text-center font-mono py-6"
                      >
                        <Monitor className="w-10 h-10 text-indigo-400 animate-pulse mb-3" />
                        <span className="text-sm text-indigo-400 uppercase font-bold tracking-widest">
                          CAPTURING PORT VIEWPORTS
                        </span>
                        <span className="text-[10px] text-slate-500 mt-1">ALIGNING VECTOR GRAPH SYSMATRIX</span>
                      </motion.div>
                    )}

                    {demoState === "idle" && (
                      <motion.div
                        key="idle-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-6 text-slate-500 font-mono text-xs flex flex-col items-center justify-center"
                      >
                        <MessageSquareQuote className="w-8 h-8 text-slate-700 mb-2" />
                        <span>System standby. Ready to process.</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Output speech waveform & transcription response */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] font-mono text-indigo-400 font-bold">
                        M
                      </span>
                      <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-widest">
                        MAX AI RESPONSE
                      </span>
                    </div>

                    {/* Integrated dynamic Web Audio Waveform representation */}
                    <div className="flex items-end gap-[3px] h-6 px-3 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                      {waveformData.map((height, idx) => (
                        <div
                          key={idx}
                          className={`w-[2px] rounded-full bg-gradient-to-t from-indigo-500 to-orange-400 transition-all duration-100`}
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-slate-300 text-sm font-sans min-h-[110px] flex flex-col justify-start relative overflow-hidden">
                    {responseText ? (
                      <div className="relative z-10">
                        <span className="text-indigo-400 font-semibold font-mono text-xs block mb-1">
                          {activePreset.responseTitle}
                        </span>
                        <p className="leading-relaxed text-slate-300">
                          {responseText}
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-24 text-slate-500 italic text-xs">
                        {demoState === "thinking" ? "Processing thoughts..." : "Waiting for response..."}
                      </div>
                    )}
                    
                    {/* Glowing highlight in transcription box */}
                    {demoState === "responding" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent animate-pulse pointer-events-none" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
