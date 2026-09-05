/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useSound } from "../hooks/useSound";
import {
  Check,
  X,
  Sparkles,
  Monitor,
  Globe,
  Smartphone,
  ShieldCheck,
  Zap,
  Search,
  SlidersHorizontal,
  Flame,
  LayoutGrid,
  TableProperties,
  ArrowRight,
} from "lucide-react";

export interface ComparisonFeature {
  id: string;
  category: string;
  categoryTag: string;
  featureName: string;
  description: string;
  desktop: boolean | string;
  web: boolean | string;
  android: boolean | string;
  highlight?: boolean;
  demandTier: "High Demand" | "Popular" | "Essential" | "Power Tool";
}

export const ALL_COMPARISON_FEATURES: ComparisonFeature[] = [
  // ─── 1. 🔥 HIGH DEMAND & AUTONOMOUS AI ──────────────────────────────────
  {
    id: "voice-live",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "Gemini Live Duplex Voice",
    description: "24ms ultra-low latency real-time voice streaming with speech interruption detection and natural turn-taking",
    desktop: true,
    web: true,
    android: true,
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "screen-understanding",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "Live Screen Understanding",
    description: "Captures and explains active screen content, UI layouts, menus, errors, code, and documents in real time",
    desktop: "Multi-Monitor",
    web: "Tab / Window",
    android: "Accessibility API",
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "android-automation",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "External App Automation",
    description: "Autonomous hands-free control of 20+ installed applications without manual tapping or switching",
    desktop: "20+ Apps Automated",
    web: false,
    android: "20+ Apps Automated",
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "deep-research",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "Autonomous Deep Research Engine",
    description: "Multi-query iterative web exploration, citation graph construction, and publication-grade synthesis",
    desktop: "Floating Panel",
    web: "In-Chat View",
    android: "Mobile Summary",
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "vector-memory",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "Long-Term Persistent Memory",
    description: "Cross-session semantic graph memory recollecting personal preferences, projects, habits, and past context",
    desktop: true,
    web: true,
    android: "MMKV + Cloud",
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "wake-word",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "Hotword Wake Word ('Hey MAX')",
    description: "Always-ready on-device neural voice trigger for continuous hands-free activation",
    desktop: false,
    web: false,
    android: "Always Listening",
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "phone-calls",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "Hands-Free Phone Calls",
    description: "Voice-activated contact lookup, dialing, and speakerphone call routing natively",
    desktop: false,
    web: false,
    android: "Native Telecom",
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "whatsapp-automation",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "WhatsApp Automation",
    description: "Hands-free messaging, contact chat opening, and accessibility text composition",
    desktop: "Desktop Automation",
    web: false,
    android: "Accessibility Service",
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "youtube-playback",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "YouTube Playback Control",
    description: "Search, play songs, and launch specific videos directly in the official YouTube mobile app",
    desktop: "Browser / Desktop",
    web: false,
    android: "Package Intent",
    demandTier: "High Demand",
  },
  {
    id: "spotify-automation",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "Spotify Audio Automation",
    description: "Instant voice-driven playback of songs, albums, and playlists through Spotify",
    desktop: "Desktop Media Control",
    web: false,
    android: "MediaSession API",
    demandTier: "High Demand",
  },
  {
    id: "coding-mode",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "Full-Stack Coding Assistant",
    description: "Multi-language code generation, refactoring, vulnerability scanning, and syntax debugging",
    desktop: true,
    web: false,
    android: false,
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "shopping-assistant",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "Shopping & Deal Finder",
    description: "Automated e-commerce product comparison, deal discovery, and checkout assist navigation",
    desktop: "Auto-Checkout",
    web: "Deal Finder",
    android: "Auto-Checkout",
    demandTier: "High Demand",
  },
  {
    id: "stock-market",
    category: "🔥 High Demand & Automation",
    categoryTag: "high-demand",
    featureName: "Real-Time Stock Market Intelligence",
    description: "Live global market tickers, candlestick charts, indices (NIFTY, NASDAQ, S&P), and technical indicator insights",
    desktop: "Live Charts & Ticker",
    web: "Real-Time Ticker",
    android: "Live Market Overlay",
    highlight: true,
    demandTier: "High Demand",
  },

  // ─── 2. 🖥️ WINDOWS DESKTOP POWERHOUSE ──────────────────────────────────
  {
    id: "windows-app",
    category: "🖥️ Windows Desktop",
    categoryTag: "desktop",
    featureName: "Native Windows Desktop App",
    description: "Production installer (.exe / .msi) with background daemon, system tray, and hotkey listeners",
    desktop: true,
    web: false,
    android: false,
    highlight: true,
    demandTier: "Power Tool",
  },
  {
    id: "app-launcher",
    category: "🖥️ Windows Desktop",
    categoryTag: "desktop",
    featureName: "30+ Windows App Launcher",
    description: "Voice-driven launching of VS Code, Chrome, Terminal, Notepad, Calculator, Discord, and system tools",
    desktop: "30+ Apps",
    web: false,
    android: "App Intents",
    highlight: true,
    demandTier: "Power Tool",
  },
  {
    id: "sandboxed-file-manager",
    category: "🖥️ Windows Desktop",
    categoryTag: "desktop",
    featureName: "Sandboxed Local File Manager",
    description: "Create, inspect, move, rename, and organize files in designated user directories with path guard",
    desktop: true,
    web: false,
    android: "Cloud Files",
    demandTier: "Power Tool",
  },
  {
    id: "system-monitor",
    category: "🖥️ Windows Desktop",
    categoryTag: "desktop",
    featureName: "System Diagnostics & Process Monitor",
    description: "Live CPU usage %, RAM memory consumption, disk space, battery telemetry, and running processes",
    desktop: "Full Process Stats",
    web: false,
    android: "Battery & Storage",
    demandTier: "Power Tool",
  },
  {
    id: "floating-orb",
    category: "🖥️ Windows Desktop",
    categoryTag: "desktop",
    featureName: "Floating 3D Orb Desktop Widget",
    description: "Always-on-top transparent holographic widget with audio waveform response and mic toggle",
    desktop: true,
    web: false,
    android: false,
    highlight: true,
    demandTier: "Power Tool",
  },
  {
    id: "terminal-cmd",
    category: "🖥️ Windows Desktop",
    categoryTag: "desktop",
    featureName: "Terminal & PowerShell Assistant",
    description: "Generates, inspects, and safely guides PowerShell, Bash, and CMD command executions",
    desktop: "PowerShell / CMD",
    web: false,
    android: false,
    demandTier: "Power Tool",
  },
  {
    id: "multi-monitor",
    category: "🖥️ Windows Desktop",
    categoryTag: "desktop",
    featureName: "Multi-Monitor Awareness",
    description: "Full viewport understanding and capture spanning primary, secondary, and ultra-wide displays",
    desktop: "All Displays",
    web: "Active Screen",
    android: "Single Screen",
    demandTier: "Power Tool",
  },
  {
    id: "boot-autostart",
    category: "🖥️ Windows Desktop",
    categoryTag: "desktop",
    featureName: "Auto-Start on Boot & Tray Minimized",
    description: "Silent background startup ready to respond instantly via global keyboard shortcut (Alt + Space)",
    desktop: true,
    web: false,
    android: "Boot Receiver",
    demandTier: "Power Tool",
  },
  {
    id: "desktop-updater",
    category: "🖥️ Windows Desktop",
    categoryTag: "desktop",
    featureName: "In-App Auto Updater",
    description: "Zero-friction background updates with cryptographic SHA-256 verification and rollback protection",
    desktop: true,
    web: "Auto-Refresh",
    android: "In-App APK Updater",
    demandTier: "Essential",
  },
  {
    id: "zip-tools",
    category: "🖥️ Windows Desktop",
    categoryTag: "desktop",
    featureName: "Zip & Archive Converter / Extractor",
    description: "Compress directories into ZIP archives and extract multi-format compressed files locally",
    desktop: true,
    web: false,
    android: false,
    demandTier: "Power Tool",
  },

  // ─── 3. 📱 ANDROID EXCLUSIVE ──────────────────────────────────────────
  {
    id: "floating-dock",
    category: "📱 Android Exclusive",
    categoryTag: "android",
    featureName: "Persistent Floating Dock Assistant",
    description: "Draggable overlay bubble that floats over ANY app (Instagram, Chrome, WhatsApp) for instant AI assist",
    desktop: false,
    web: false,
    android: "Overlay Window",
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "background-voice",
    category: "📱 Android Exclusive",
    categoryTag: "android",
    featureName: "Background Voice Mode (Screen-Off)",
    description: "Continues bidirectional conversations even when the screen is locked or another app is open",
    desktop: false,
    web: false,
    android: "Foreground Service",
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "maps-navigation",
    category: "📱 Android Exclusive",
    categoryTag: "android",
    featureName: "Google Maps Turn-by-Turn Navigation",
    description: "Hands-free voice routing to any location, live traffic evaluation, and transit navigation",
    desktop: false,
    web: false,
    android: "Maps Deep Link",
    demandTier: "Popular",
  },
  {
    id: "contacts-manager",
    category: "📱 Android Exclusive",
    categoryTag: "android",
    featureName: "Contacts Sync & Phonebook Search",
    description: "Search contacts by nickname or full name with direct one-tap calling and messaging",
    desktop: false,
    web: false,
    android: "Contacts Provider",
    demandTier: "Popular",
  },
  {
    id: "settings-automation",
    category: "📱 Android Exclusive",
    categoryTag: "android",
    featureName: "System Settings Voice Toggles",
    description: "Voice-activated controls for Wi-Fi, Bluetooth, Flashlight, Brightness, and Volume levels",
    desktop: false,
    web: false,
    android: "Settings Bridge",
    demandTier: "Popular",
  },
  {
    id: "hardware-media-control",
    category: "📱 Android Exclusive",
    categoryTag: "android",
    featureName: "Hardware Audio & Media Keys",
    description: "Controls play, pause, skip, and volume across all background streaming media players",
    desktop: "Simulated Keys",
    web: false,
    android: "MediaSession API",
    demandTier: "Popular",
  },
  {
    id: "apk-updater",
    category: "📱 Android Exclusive",
    categoryTag: "android",
    featureName: "Silent APK Package Updater",
    description: "Checks GitHub releases, downloads update package, and launches standard Android PackageInstaller",
    desktop: false,
    web: false,
    android: "FileProvider Intent",
    demandTier: "Essential",
  },
  {
    id: "robot-avatar",
    category: "📱 Android Exclusive",
    categoryTag: "android",
    featureName: "Interactive 3D Robot Companion Avatar",
    description: "Touch-reactive 3D companion with expressive eyes, idle animations, and audio reactive glow",
    desktop: true,
    web: true,
    android: "3D Mobile View",
    highlight: true,
    demandTier: "Popular",
  },

  // ─── 4. ⚡ PRODUCTIVITY & DAILY WORKFLOWS ──────────────────────────────
  {
    id: "gemini-models",
    category: "⚡ Productivity & Intelligence",
    categoryTag: "productivity",
    featureName: "Dual-Engine Gemini Flash & Pro",
    description: "Dynamic routing between ultra-fast Flash 2.5 and deep-reasoning Pro models based on complexity",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Essential",
  },
  {
    id: "owl-planner",
    category: "⚡ Productivity & Intelligence",
    categoryTag: "productivity",
    featureName: "OWL Autonomous Task Planner Agent",
    description: "Breaks high-level goals into sequential executable steps with dynamic self-correction",
    desktop: true,
    web: true,
    android: true,
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "doc-analysis",
    category: "⚡ Productivity & Intelligence",
    categoryTag: "productivity",
    featureName: "Multi-Format Document Intelligence",
    description: "Deep text and tabular extraction for PDF, DOCX, PPTX, XLSX, TXT, Markdown, CSV, and code files",
    desktop: "Native .NET XML",
    web: "Web Parser",
    android: "Document Picker",
    highlight: true,
    demandTier: "Popular",
  },
  {
    id: "camera-vision",
    category: "⚡ Productivity & Intelligence",
    categoryTag: "productivity",
    featureName: "Real-Time Camera Vision QA",
    description: "Analyze physical objects, whiteboards, math problems, handwritten notes, and room spaces",
    desktop: "Webcam Stream",
    web: "Webcam Stream",
    android: "CameraX Live",
    demandTier: "Popular",
  },
  {
    id: "writing-assistant",
    category: "⚡ Productivity & Intelligence",
    categoryTag: "productivity",
    featureName: "Pro Writing & Copywriting Studio",
    description: "Drafts emails, essays, business proposals, and creative stories with customized tone modifiers",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Essential",
  },
  {
    id: "translation",
    category: "⚡ Productivity & Intelligence",
    categoryTag: "productivity",
    featureName: "Real-Time Multilingual Translation",
    description: "Fluid translation across 40+ global languages including Hinglish, Hindi, Spanish, French, and Japanese",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Essential",
  },
  {
    id: "study-mode",
    category: "⚡ Productivity & Intelligence",
    categoryTag: "productivity",
    featureName: "Adaptive Study & Tutoring Mode",
    description: "Breaks difficult STEM topics into simplified mental models with Socratic questioning",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Popular",
  },
  {
    id: "flashcards",
    category: "⚡ Productivity & Intelligence",
    categoryTag: "productivity",
    featureName: "Interactive Flashcard Generator",
    description: "Converts uploaded notes, lecture summaries, or textbook PDFs into spaced-repetition flashcard sets",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Popular",
  },
  {
    id: "calendar-integration",
    category: "⚡ Productivity & Intelligence",
    categoryTag: "productivity",
    featureName: "Calendar & Schedule Sync",
    description: "Schedule appointments, list daily events, and set reminders using conversational language",
    desktop: "Windows Calendar",
    web: false,
    android: "Google Calendar",
    demandTier: "Popular",
  },
  {
    id: "tts-synthesizer",
    category: "⚡ Productivity & Intelligence",
    categoryTag: "productivity",
    featureName: "Neural Voice TTS Audio Synthesizer",
    description: "High-definition, emotionally expressive speech output streaming PCM wrapped WAV buffers",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Essential",
  },

  // ─── 5. 🛠️ DEVELOPER & POWER TOOLS ────────────────────────────────────
  {
    id: "code-generation",
    category: "🛠️ Developer Tools",
    categoryTag: "dev-tools",
    featureName: "Multi-Language Code Synthesis",
    description: "Full-stack code generation across Python, JavaScript, TypeScript, C++, Java, Rust, Go, and SQL",
    desktop: true,
    web: true,
    android: true,
    highlight: true,
    demandTier: "High Demand",
  },
  {
    id: "code-refactoring",
    category: "🛠️ Developer Tools",
    categoryTag: "dev-tools",
    featureName: "Code Refactoring & Optimization",
    description: "Algorithmic complexity reduction, memory leak fixes, and design pattern modernization",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Power Tool",
  },
  {
    id: "bug-detection",
    category: "🛠️ Developer Tools",
    categoryTag: "dev-tools",
    featureName: "Bug & Vulnerability Diagnostics",
    description: "Detects race conditions, unhandled exceptions, memory issues, and logic antipatterns in seconds",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Power Tool",
  },
  {
    id: "git-helper",
    category: "🛠️ Developer Tools",
    categoryTag: "dev-tools",
    featureName: "Git Command & Commit Generator",
    description: "Crafts conventional git commit messages, rebase commands, and resolves complex merge conflicts",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Power Tool",
  },
  {
    id: "regex-sql-builder",
    category: "🛠️ Developer Tools",
    categoryTag: "dev-tools",
    featureName: "Regex & Complex SQL Query Builder",
    description: "Builds and explains complex regular expressions and optimized relational database queries",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Power Tool",
  },
  {
    id: "web-scraping",
    category: "🛠️ Developer Tools",
    categoryTag: "dev-tools",
    featureName: "Web Content Scraper & Formatter",
    description: "Extracts clean markdown and structured tables from articles, documentation, and web forums",
    desktop: "Direct Fetch",
    web: "CORS Proxy",
    android: "Network Client",
    demandTier: "Power Tool",
  },
  {
    id: "json-validator",
    category: "🛠️ Developer Tools",
    categoryTag: "dev-tools",
    featureName: "JSON / Schema Formatter & Validator",
    description: "Parses, reformats, validates, and transforms complex JSON, YAML, and XML data schemas",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Essential",
  },
  {
    id: "curl-generator",
    category: "🛠️ Developer Tools",
    categoryTag: "dev-tools",
    featureName: "cURL Generator & API Tester",
    description: "Generates production API test snippets with authentication headers, payload bodies, and status checks",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Essential",
  },

  // ─── 6. 🔒 PRIVACY, SECURITY & CLOUD ARCHITECTURE ─────────────────────
  {
    id: "zero-knowledge",
    category: "🔒 Security & Privacy",
    categoryTag: "security",
    featureName: "Zero-Knowledge Privacy Policy",
    description: "User conversations and personal memories are never used to train public commercial AI models",
    desktop: true,
    web: true,
    android: true,
    highlight: true,
    demandTier: "Essential",
  },
  {
    id: "sandbox-protection",
    category: "🔒 Security & Privacy",
    categoryTag: "security",
    featureName: "Sandbox VM & Path Guard",
    description: "File operations and process execution are strictly restricted to authorized directories with path verification",
    desktop: "Path Guard",
    web: "Browser Sandbox",
    android: "OS Sandbox",
    highlight: true,
    demandTier: "Essential",
  },
  {
    id: "oauth-auth",
    category: "🔒 Security & Privacy",
    categoryTag: "security",
    featureName: "Google OAuth 2.0 Authentication",
    description: "Secure cryptographic identity verification with automatic Supabase database synchronisation",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Essential",
  },
  {
    id: "encrypted-sync",
    category: "🔒 Security & Privacy",
    categoryTag: "security",
    featureName: "AES-256 Encrypted Cloud Sync",
    description: "End-to-end encrypted backup of memories, user preferences, and saved conversation threads",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Essential",
  },
  {
    id: "offline-cache",
    category: "🔒 Security & Privacy",
    categoryTag: "security",
    featureName: "Fast Offline MMKV Caching",
    description: "Local high-speed memory cache allowing previous sessions to load instantly without waiting on network",
    desktop: "Local Disk",
    web: "IndexedDB",
    android: "MMKV Cache",
    demandTier: "Popular",
  },
  {
    id: "razorpay-gateway",
    category: "🔒 Security & Privacy",
    categoryTag: "security",
    featureName: "Razorpay 256-Bit Payment Gateway",
    description: "Official PCI-DSS Level 1 compliant checkout for UPI, Credit/Debit Cards, NetBanking, and Wallets",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Essential",
  },
  {
    id: "signed-webhooks",
    category: "🔒 Security & Privacy",
    categoryTag: "security",
    featureName: "HMAC SHA-256 Webhook Verification",
    description: "Cryptographically verified server events preventing replay attacks or tampered subscription requests",
    desktop: true,
    web: true,
    android: true,
    demandTier: "Essential",
  },
  {
    id: "permission-guard",
    category: "🔒 Security & Privacy",
    categoryTag: "security",
    featureName: "Explicit Permission Control Center",
    description: "Granular user toggles for microphone, camera, screen capture, and accessibility automation",
    desktop: "Windows Prompts",
    web: "Browser Permissions",
    android: "Runtime Dialogs",
    demandTier: "Essential",
  },
];

const CATEGORIES = [
  { id: "all", label: "All Features (57)", icon: Sparkles },
  { id: "🔥 High Demand & Automation", label: "🔥 High Demand", icon: Flame },
  { id: "🖥️ Windows Desktop", label: "🖥️ Desktop Power", icon: Monitor },
  { id: "📱 Android Exclusive", label: "📱 Android Mobile", icon: Smartphone },
  { id: "⚡ Productivity & Intelligence", label: "⚡ Productivity", icon: Zap },
  { id: "🛠️ Developer Tools", label: "🛠️ Developer", icon: SlidersHorizontal },
  { id: "🔒 Security & Privacy", label: "🔒 Security", icon: ShieldCheck },
];

export function FeatureComparisonSection() {
  const { playHover, playClick } = useSound();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"auto" | "cards" | "table">("auto");

  const filteredFeatures = useMemo(() => {
    return ALL_COMPARISON_FEATURES.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.featureName.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const renderCell = (val: boolean | string, platform: "desktop" | "web" | "android") => {
    if (val === true) {
      return (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
            platform === "desktop"
              ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.25)]"
              : platform === "android"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
              : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
          }`}
        >
          <Check className="w-3.5 h-3.5 shrink-0" />
          <span>Supported</span>
        </div>
      );
    }
    if (val === false) {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-500 bg-white/[0.02] border border-white/5">
          <X className="w-3.5 h-3.5 text-rose-500/60 shrink-0" />
          <span>Unavailable</span>
        </div>
      );
    }
    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-bold text-center ${
          platform === "desktop"
            ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/40 shadow-[0_0_12px_rgba(99,102,241,0.25)]"
            : platform === "android"
            ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
            : "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30"
        }`}
      >
        {val}
      </div>
    );
  };

  const renderMobileCell = (val: boolean | string, platform: "desktop" | "web" | "android") => {
    if (val === true) {
      return (
        <span
          className={`inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold w-full ${
            platform === "desktop"
              ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
              : platform === "android"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
              : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
          }`}
        >
          <Check className="w-3 h-3 shrink-0" />
          <span>Supported</span>
        </span>
      );
    }
    if (val === false) {
      return (
        <span className="inline-flex items-center justify-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono text-slate-500 bg-white/[0.02] border border-white/5 w-full">
          <X className="w-3 h-3 text-rose-500/60 shrink-0" />
          <span>No</span>
        </span>
      );
    }
    return (
      <span
        className={`inline-flex items-center justify-center px-1.5 py-1 rounded-lg text-[10px] font-mono font-bold text-center leading-tight truncate w-full ${
          platform === "desktop"
            ? "bg-indigo-500/20 text-indigo-200 border border-indigo-500/30"
            : platform === "android"
            ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30"
            : "bg-cyan-500/20 text-cyan-200 border border-cyan-500/30"
        }`}
        title={typeof val === "string" ? val : undefined}
      >
        {val}
      </span>
    );
  };

  return (
    <section
      id="comparison"
      className="py-24 sm:py-28 relative overflow-hidden bg-gradient-to-b from-transparent via-[#030309]/80 to-transparent"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-[15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs text-indigo-300 font-mono uppercase tracking-[0.2em] font-bold mb-4 shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          >
            <Zap className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
            FULL 57-FEATURE CAPABILITY MATRIX
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white"
          >
            Desktop vs Web vs Android
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-slate-400 font-light max-w-2xl mx-auto"
          >
            Every single feature verified directly against the production MAX AI codebase. 
            Compare desktop automation, mobile overlay capabilities, and real-time vision side-by-side.
          </motion.p>

          {/* Search + Category Filter Bar */}
          <div className="mt-8 space-y-4">
            
            {/* Search Input */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all 57 features (e.g. Stocks, WhatsApp, Screen, Voice)..."
                className="w-full pl-11 pr-10 py-3 rounded-full bg-white/[0.04] border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.07] transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white px-1.5 py-0.5 rounded bg-white/10 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex sm:flex-wrap items-center justify-start sm:justify-center gap-2 sm:gap-2.5 overflow-x-auto sm:overflow-visible py-3 px-3 sm:px-2 max-w-4xl mx-auto scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playClick();
                      setSelectedCategory(cat.id);
                    }}
                    onMouseEnter={() => playHover()}
                    className={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 cursor-pointer inline-flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-[0_0_18px_rgba(99,102,241,0.4)] border border-white/20 scale-105"
                        : "bg-white/[0.04] text-slate-400 border border-white/10 hover:bg-white/[0.08] hover:text-white"
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Results count & view switcher on mobile */}
            <div className="flex items-center justify-between sm:justify-end text-xs font-mono text-slate-400 pt-1">
              <span className="sm:hidden text-slate-500">
                Showing {filteredFeatures.length} of 56 features
              </span>
              <div className="flex items-center gap-1 sm:hidden">
                <button
                  onClick={() => {
                    playClick();
                    setViewMode(viewMode === "table" ? "cards" : "table");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-slate-300 flex items-center gap-1 hover:bg-white/10 cursor-pointer"
                >
                  {viewMode === "table" ? (
                    <>
                      <LayoutGrid className="w-3 h-3" />
                      <span>Cards View</span>
                    </>
                  ) : (
                    <>
                      <TableProperties className="w-3 h-3" />
                      <span>Table View</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* ─── 1. MOBILE CARDS VIEW (< sm, or forced) ─────────────────────────── */}
        <div className={`space-y-4 ${viewMode === "table" ? "hidden" : "block sm:hidden"}`}>
          {filteredFeatures.length === 0 ? (
            <div className="p-8 text-center glass-panel rounded-2xl border border-white/10 text-slate-400 text-sm">
              No features match "{searchQuery}". Try searching for something else!
            </div>
          ) : (
            filteredFeatures.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.3) }}
                className={`glass-panel p-5 rounded-2xl border transition-all duration-300 ${
                  item.highlight
                    ? "bg-gradient-to-br from-indigo-950/40 via-slate-950/60 to-slate-950/80 border-indigo-500/30 shadow-[0_0_25px_rgba(99,102,241,0.12)]"
                    : "bg-slate-950/50 border-white/10 hover:border-white/20"
                }`}
              >
                {/* Card Top: Badges & Name */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-display font-bold text-base text-white">
                    {item.featureName}
                  </span>
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-bold shrink-0 ${
                      item.demandTier === "High Demand"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.2)]"
                        : item.demandTier === "Power Tool"
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                        : "bg-white/10 text-slate-300 border border-white/10"
                    }`}
                  >
                    {item.demandTier}
                  </span>
                </div>

                <p className="text-xs text-slate-400 font-light leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* 3 Platform Pill Grid */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/5">
                  
                  {/* Desktop */}
                  <div className="flex flex-col items-center justify-between text-center p-2 rounded-xl bg-indigo-500/5 border border-indigo-500/20 min-h-[64px]">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-indigo-300 font-bold mb-1">
                      <Monitor className="w-3 h-3 shrink-0" />
                      <span>DESKTOP</span>
                    </div>
                    {renderMobileCell(item.desktop, "desktop")}
                  </div>

                  {/* Web */}
                  <div className="flex flex-col items-center justify-between text-center p-2 rounded-xl bg-cyan-500/5 border border-cyan-500/20 min-h-[64px]">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 font-bold mb-1">
                      <Globe className="w-3 h-3 shrink-0" />
                      <span>WEB</span>
                    </div>
                    {renderMobileCell(item.web, "web")}
                  </div>

                  {/* Android */}
                  <div className="flex flex-col items-center justify-between text-center p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/20 min-h-[64px]">
                    <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-300 font-bold mb-1">
                      <Smartphone className="w-3 h-3 shrink-0" />
                      <span>ANDROID</span>
                    </div>
                    {renderMobileCell(item.android, "android")}
                  </div>

                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* ─── 2. DESKTOP TABLE VIEW (>= sm, or forced on mobile) ─────────────── */}
        <div className={`glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl bg-slate-950/70 backdrop-blur-2xl ${
          viewMode === "table" ? "block" : "hidden sm:block"
        }`}>
          <div className="overflow-x-auto scrollbar-thin">
            <div className="min-w-[700px]">
              
              {/* Sticky Table Header */}
              <div className="grid grid-cols-12 border-b border-white/10 bg-[#070617] p-5 items-center text-xs font-mono uppercase tracking-wider font-bold text-slate-300 sticky top-0 z-20 backdrop-blur-md">
                <div className="col-span-6 text-left flex items-center gap-2 pl-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>FEATURE & CAPABILITY ({filteredFeatures.length})</span>
                </div>

                {/* Desktop Column */}
                <div className="col-span-2 text-center flex flex-col items-center justify-center p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/40 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                  <div className="flex items-center gap-1.5 font-display font-bold text-sm text-white">
                    <Monitor className="w-4 h-4 text-indigo-400" />
                    <span>DESKTOP</span>
                  </div>
                  <span className="text-[9px] text-indigo-400 font-mono tracking-widest mt-0.5 font-bold">
                    FLAGSHIP ★
                  </span>
                </div>

                {/* Web Column */}
                <div className="col-span-2 text-center flex flex-col items-center justify-center p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-300">
                  <div className="flex items-center gap-1.5 font-display font-bold text-sm text-white">
                    <Globe className="w-4 h-4 text-cyan-400" />
                    <span>WEB</span>
                  </div>
                  <span className="text-[9px] text-cyan-400/80 font-mono tracking-widest mt-0.5">
                    CLOUD APP
                  </span>
                </div>

                {/* Android Column */}
                <div className="col-span-2 text-center flex flex-col items-center justify-center p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                  <div className="flex items-center gap-1.5 font-display font-bold text-sm text-white">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span>ANDROID</span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-mono tracking-widest mt-0.5 font-bold">
                    LIVE APK
                  </span>
                </div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-white/5">
                {filteredFeatures.length === 0 ? (
                  <div className="p-12 text-center text-slate-400 font-mono text-sm">
                    No features match "{searchQuery}".
                  </div>
                ) : (
                  filteredFeatures.map((row, idx) => {
                    const isFirstOfCategory =
                      idx === 0 ||
                      filteredFeatures[idx - 1].category !== row.category;

                    return (
                      <div key={row.id}>
                        {/* Subtle Category Divider inside table */}
                        {isFirstOfCategory && selectedCategory === "all" && (
                          <div className="bg-white/[0.02] border-y border-white/5 px-6 py-2.5 flex items-center justify-between text-xs font-mono font-bold text-indigo-300 tracking-wider">
                            <span className="flex items-center gap-2">
                              <span>{row.category}</span>
                            </span>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-normal">
                              {row.categoryTag}
                            </span>
                          </div>
                        )}

                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.2 }}
                          onMouseEnter={() => playHover()}
                          className={`grid grid-cols-12 p-4 sm:p-5 items-center transition-all duration-200 hover:bg-white/[0.03] ${
                            row.highlight
                              ? "bg-indigo-500/[0.02]"
                              : ""
                          }`}
                        >
                          {/* Feature Info */}
                          <div className="col-span-6 text-left pr-4 pl-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-display font-semibold text-white text-sm sm:text-base">
                                {row.featureName}
                              </span>
                              {row.demandTier === "High Demand" && (
                                <span className="text-[9px] font-mono uppercase tracking-widest text-rose-300 bg-rose-500/20 border border-rose-500/30 px-2 py-0.5 rounded-full font-bold">
                                  HIGH DEMAND
                                </span>
                              )}
                              {row.demandTier === "Power Tool" && (
                                <span className="text-[9px] font-mono uppercase tracking-widest text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded-full">
                                  POWER
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-400 mt-1 font-sans font-light leading-relaxed">
                              {row.description}
                            </p>
                          </div>

                          {/* Desktop */}
                          <div className="col-span-2 text-center px-2">
                            {renderCell(row.desktop, "desktop")}
                          </div>

                          {/* Web */}
                          <div className="col-span-2 text-center px-2">
                            {renderCell(row.web, "web")}
                          </div>

                          {/* Android */}
                          <div className="col-span-2 text-center px-2">
                            {renderCell(row.android, "android")}
                          </div>
                        </motion.div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          </div>

          {/* Table Footer Callout */}
          <div className="p-5 sm:p-6 bg-slate-900/60 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-slate-400">
            <div className="flex items-center gap-2 text-left">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                All 56 features actively verified in official MAX AI repositories (Desktop, Web, &amp; Android v1.0.1).
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#download-android"
                className="px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-emerald-500/30 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Get Android APK</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#download-windows"
                className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-indigo-500/30 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Download Windows</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
