/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Cpu, Zap, Activity, ShieldCheck, RefreshCw } from "lucide-react";

interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  icon: any;
  color: string;
}

const STATS: StatItem[] = [
  {
    id: "commands",
    label: "Supported Commands",
    value: 2540,
    suffix: "+",
    description: "Precompiled native operating system calls and terminal macros mapped.",
    icon: Cpu,
    color: "text-brand-purple border-brand-purple/20 bg-brand-purple/5"
  },
  {
    id: "latency",
    label: "Average Audio Latency",
    value: 24,
    suffix: "ms",
    description: "Sub-perceptual conversational audio loops powered by edge routing grids.",
    icon: Zap,
    color: "text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5"
  },
  {
    id: "actions",
    label: "Automations per Min",
    value: 180,
    suffix: "+",
    description: "Simultaneous background workflows executed on sandboxed VM environments.",
    icon: Activity,
    color: "text-brand-pink border-brand-pink/20 bg-brand-pink/5"
  },
  {
    id: "security",
    label: "E2EE Data Security",
    value: 100,
    suffix: "%",
    description: "Fully client-side, zero-knowledge local storage architecture standard.",
    icon: ShieldCheck,
    color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5"
  }
];

function CountUp({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const currentVal = Math.round(end * (progress * (2 - progress)));
      
      setCount(currentVal);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export function PerformanceStats() {
  return (
    <section id="stats" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Statistics Dashboard panel */}
        <div className="glass-panel rounded-3xl border border-white/5 glow-border-purple p-8 md:p-12 relative overflow-hidden bg-slate-950/40">
          
          {/* Decorative scanner line */}
          <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/30 to-transparent" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 lg:divide-x divide-white/5">
            {STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex flex-col text-left justify-between p-4 first:pt-0 md:first:pt-4 lg:first:pl-0 lg:pl-8 lg:first:pt-0"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-widest">
                      {stat.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-5xl font-display font-bold tracking-tight text-white mb-2">
                      {stat.prefix}
                      <CountUp value={stat.value} />
                      <span className="text-brand-cyan ml-0.5">{stat.suffix}</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Core Telemetry Tagline */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap justify-between items-center text-[10px] font-mono text-slate-500 gap-4">
            <span className="flex items-center gap-1.5 uppercase">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-purple" />
              INTELLIGENT EDGE SCHEDULER ACTIVE
            </span>
            <span className="uppercase">
              GLOBAL BENCHMARK SCORE: <strong className="text-emerald-400 font-bold">143.2 FLOP-SEC</strong>
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
