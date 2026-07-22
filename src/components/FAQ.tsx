/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSound } from "../hooks/useSound";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "f1",
    question: "How does Max AI run local programs and automations securely?",
    answer: "Max AI compiles scripts, installs packages, and runs testing operations inside a local, highly-isolated sandbox VM container. This isolates executing modules, preventing any unauthorized folder accesses or command injections on your physical host machine. You maintain full granular permission tables.",
    category: "security",
  },
  {
    id: "f2",
    question: "Does my vision data or active screen capture get sent to external cloud servers?",
    answer: "No. Main screen-parsing, layout boundary auditing, and local OCR processes are executed fully locally on your device's NPU using custom quantized vision weights. When deep multimodal reasoning is explicitly triggered, frames are securely encrypted using AES-256 before transport, and destroyed instantly post-inference. Zero telemetry is logged.",
    category: "privacy",
  },
  {
    id: "f3",
    question: "Can I define my own custom automation routines or integrate other IDEs?",
    answer: "Absolutely. Max AI exposes a rich local API. You can write custom automation routines in TypeScript, Python, or standard Bash. It seamlessly integrates with VS Code, Cursor, terminal environments, and communication platforms like Slack or Linear via local OAuth handshakes.",
    category: "workflow",
  },
  {
    id: "f4",
    question: "What are the minimum requirements for Windows and Android?",
    answer: "For Windows: Windows 10 or 11 (64-bit architecture), Intel Core i5 / AMD Ryzen 5 or higher, 8GB system memory, and 2GB free storage disk space. For Android: Android 11.0 or newer, with at least 4GB of RAM and SnapDragon/Dimensity quantization support.",
    category: "specs",
  }
];

function FAQAccordionItem({ item, isOpen, toggleOpen }: { item: FAQItem; isOpen: boolean; toggleOpen: () => void; key?: string }) {
  const { playHover, playClick } = useSound();

  const handleToggle = () => {
    playClick();
    toggleOpen();
  };

  return (
    <div
      className={`rounded-xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-brand-purple/[0.04] border-brand-purple/40 shadow-[0_0_20px_rgba(156,84,255,0.04)]"
          : "bg-slate-950/40 border-white/5 hover:border-white/10"
      }`}
    >
      <button
        onClick={handleToggle}
        onMouseEnter={() => playHover()}
        className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
      >
        <span className="font-display font-medium text-white text-base md:text-lg group-hover:text-brand-cyan transition-colors duration-200">
          {item.question}
        </span>
        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen ? "border-brand-purple bg-brand-purple text-white rotate-180" : "border-white/10 bg-white/5 text-slate-400"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-white/[0.03] bg-slate-950/20">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="py-24 relative">
      <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-brand-purple/5 blur-[120px]" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-cyan/30 bg-brand-cyan/5 text-xs text-brand-cyan glow-text-cyan font-mono uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            SYSTEM LOGIC DEBATES
          </div>
          <h2 className="text-4xl font-display font-bold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-base font-sans">
            Have questions regarding sandbox privacy constraints, compilation security metrics, or client-side context storage? Read through our standard telemetry logic answers.
          </p>
        </div>

        {/* Accordions list */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <FAQAccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              toggleOpen={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
