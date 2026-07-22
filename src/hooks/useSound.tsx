/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface SoundContextType {
  muted: boolean;
  toggleMute: () => void;
  playHover: () => void;
  playClick: () => void;
  playSuccess: () => void;
  playScan: () => void;
  playDownload: () => void;
}

const SoundContext = createContext<SoundContextType | null>(null);

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("max_ai_sound_muted");
      return saved ? saved === "true" : false; // Default to unmuted for full immersive experience
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("max_ai_sound_muted", String(muted));
  }, [muted]);

  const toggleMute = () => {
    setMuted((prev) => !prev);
    
    // Play a gentle confirmation tap when unmuting
    setTimeout(() => {
      if (muted) {
        // Just unmuted, try to play click
        const ctx = getAudioContext();
        if (ctx && ctx.state === "suspended") {
          ctx.resume();
        }
      }
    }, 50);
  };

  const playHover = () => {
    if (muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === "suspended") return;

    try {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      // Soft fast tick
      gainNode.gain.setValueAtTime(0.015, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.03);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {
      // Ignore audio synthesis errors gracefully
    }
  };

  const playClick = () => {
    if (muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;
    
    try {
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);

      gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Ignore
    }
  };

  const playSuccess = () => {
    if (muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const playTone = (freq: number, start: number, duration: number, vol: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gainNode.gain.setValueAtTime(0, ctx.currentTime + start);
        gainNode.gain.linearRampToValueAtTime(vol, ctx.currentTime + start + 0.02);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Play major digital chord: C5 -> E5 -> G5 -> C6
      const baseVol = 0.04;
      playTone(523.25, 0, 0.15, baseVol); // C5
      playTone(659.25, 0.06, 0.15, baseVol); // E5
      playTone(783.99, 0.12, 0.18, baseVol); // G5
      playTone(1046.50, 0.18, 0.3, baseVol + 0.02); // C6
    } catch (e) {
      // Ignore
    }
  };

  const playScan = () => {
    if (muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      // Laser sweep from high to low to high
      osc.frequency.setValueAtTime(1500, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.2);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.4);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.05);
      gainNode.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.3);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // Ignore
    }
  };

  const playDownload = () => {
    if (muted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.15);

      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      // Ignore
    }
  };

  // Attempt to activate AudioContext on initial click anywhere
  useEffect(() => {
    const handleGesture = () => {
      const ctx = getAudioContext();
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
    };
    window.addEventListener("click", handleGesture);
    window.addEventListener("touchstart", handleGesture);
    return () => {
      window.removeEventListener("click", handleGesture);
      window.removeEventListener("touchstart", handleGesture);
    };
  }, []);

  return (
    <SoundContext.Provider
      value={{
        muted,
        toggleMute,
        playHover,
        playClick,
        playSuccess,
        playScan,
        playDownload,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
