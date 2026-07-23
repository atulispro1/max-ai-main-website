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
  category: "desktop" | "web" | "android" | "security" | "ai" | "general";
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "f1",
    question: "What is Max AI and how is it different from ChatGPT or Cursor?",
    answer: "Max AI is an intelligent operating system companion engineered by Atul Sharma. Unlike web-only chatbots, Max AI integrates natively into your OS with 120FPS live screen understanding, sandboxed container VM automation, deep research synthesis, and 24ms duplex audio voice conversations.",
    category: "general",
  },
  {
    id: "f2",
    question: "Why is the Desktop application considered the Flagship version?",
    answer: "The Desktop app (Electron + Node.js backend) has the highest native privilege level. It can launch 30+ desktop apps, manage local files in a sandbox, monitor system CPU/RAM metrics, trigger multi-monitor screen capture, run background VMs, and render an always-on-top 3D orb widget.",
    category: "desktop",
  },
  {
    id: "f3",
    question: "What is the status of the Android Application release?",
    answer: "The Max AI Android app is built with Expo React Native and is under active development. It features custom SVG/3D animated robot avatars, mobile camera AI vision, local MMKV high-speed memory, and native Android app intent launchers (YouTube, Maps, Settings). It will be available for download soon!",
    category: "android",
  },
  {
    id: "f4",
    question: "Can I use Max AI directly on the Web without installing anything?",
    answer: "Yes! You can use Max AI directly in your browser at https://max-ai-atulsapp.vercel.app/. The web version supports Gemini 3.1 Flash/Pro chat, WebSocket Live Voice mode, document parsing, and Supabase cloud memory synchronization.",
    category: "web",
  },
  {
    id: "f5",
    question: "How does Max AI protect user data and screen privacy?",
    answer: "Max AI operates on a Zero-Knowledge privacy model. Screen capture parsing and document intelligence are processed locally. Path traversal protection (isPathAllowed) restricts file access to safe user folders. Transient vision frames are immediately purged post-inference.",
    category: "security",
  },
  {
    id: "f6",
    question: "How does the Long-Term Personal Intelligence & Memory work?",
    answer: "Max AI continuously constructs a semantic graph memory profile. It automatically remembers your preferences, favorite IDEs, browser, facts, and projects without storing raw interrogative queries. Signed-in users sync memories securely via Supabase cloud RLS.",
    category: "ai",
  },
  {
    id: "f7",
    question: "What is the OWL Multi-Step Planner Agent?",
    answer: "The OWL Planner Agent automatically decomposes complex, multi-stage user prompts into structured execution state machines (e.g. searching references -> reading document -> summarizing -> creating a file -> launching an app).",
    category: "ai",
  },
  {
    id: "f8",
    question: "What are the minimum system requirements for Windows?",
    answer: "Windows 10 or Windows 11 (64-bit architecture), Intel Core i5 / AMD Ryzen 5 processor or higher, 8GB system RAM, and 2GB available storage space for the desktop installer package.",
    category: "desktop",
  },
  {
    id: "f9",
    question: "Is Max AI free to download and use?",
    answer: "Yes! Max AI v1.0.0 is officially released and free to download for Windows. The direct installer package is hosted securely on GitHub release assets.",
    category: "general",
  },
  {
    id: "f10",
    question: "Who created Max AI?",
    answer: "Max AI was designed, built, and architected by Atul Sharma. Max AI features a custom signature Hinglish AI personality that playfully roasts Atul while providing top-tier technical intelligence.",
    category: "general",
  },
];

function FAQAccordionItem({ item, isOpen, toggleOpen }: { item: FAQItem; isOpen: boolean; toggleOpen: () => void }) {
  const { playHover, playClick } = useSound();

  const handleToggle = () => {
    playClick();
    toggleOpen();
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "bg-indigo-500/[0.06] border-indigo-500/40 shadow-[0_0_25px_rgba(99,102,241,0.1)]"
          : "bg-slate-950/40 border-white/5 hover:border-white/15"
      }`}
    >
      <button
        onClick={handleToggle}
        onMouseEnter={() => playHover()}
        className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
      >
        <span className="font-display font-semibold text-white text-base md:text-lg group-hover:text-indigo-300 transition-colors duration-200">
          {item.question}
        </span>
        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
            isOpen ? "border-indigo-500 bg-indigo-500 text-white rotate-180" : "border-white/10 bg-white/5 text-slate-400"
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
            <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-white/[0.04] bg-slate-950/30 font-sans font-light">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>("f1");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All FAQs" },
    { id: "desktop", label: "Desktop App" },
    { id: "web", label: "Web App" },
    { id: "android", label: "Android App" },
    { id: "security", label: "Security & Privacy" },
    { id: "ai", label: "AI & Memory" },
  ];

  const filteredItems = selectedCategory === "all"
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <section id="faq" className="py-28 relative overflow-hidden">
      <div className="absolute top-[20%] left-[5%] w-[450px] h-[450px] rounded-full bg-brand-purple/5 blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 text-xs text-brand-cyan glow-text-cyan font-mono uppercase tracking-wider mb-4 font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            KNOWLEDGE BASE & FAQS
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-base font-sans font-light">
            Everything you need to know about Max AI Desktop, Web, Android development, security architecture, and AI vision pipelines.
          </p>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-indigo-500 text-white font-bold shadow-[0_0_15px_rgba(99,102,241,0.4)] border border-indigo-400/40"
                    : "bg-white/[0.03] text-slate-400 border border-white/5 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
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
