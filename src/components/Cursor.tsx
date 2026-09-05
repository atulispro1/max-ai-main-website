/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef, ReactNode, useCallback } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";

// ─── Touch Ripple System (Mobile) ───────────────────────────────────────────

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function TouchRippleSystem() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const rippleId = useRef(0);

  useEffect(() => {
    // Only activate on touch devices
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  const addRipple = useCallback((x: number, y: number) => {
    const id = ++rippleId.current;
    setRipples(prev => [...prev, { id, x, y }]);
    // Auto-remove after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== id));
    }, 800);
  }, []);

  useEffect(() => {
    if (!isTouchDevice) return;

    const handleTouchStart = (e: TouchEvent) => {
      Array.from(e.changedTouches).forEach(touch => {
        addRipple(touch.clientX, touch.clientY);
      });
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, [isTouchDevice, addRipple]);

  if (!isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.7, x: ripple.x, y: ripple.y }}
            animate={{ scale: 3.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(0,240,255,0.2) 50%, transparent 100%)",
              filter: "blur(4px)",
              mixBlendMode: "screen",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─── Desktop Custom Cursor ───────────────────────────────────────────────────

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [trailPoints, setTrailPoints] = useState<{ x: number; y: number }[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 380, mass: 0.45 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Slow follower for the glow blob
  const slowSpringConfig = { damping: 22, stiffness: 120, mass: 1.2 };
  const glowXSpring = useSpring(cursorX, slowSpringConfig);
  const glowYSpring = useSpring(cursorY, slowSpringConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsTouchDevice(!mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches);
    mediaQuery.addEventListener("change", onChange);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Trail points
      setTrailPoints(prev => {
        const next = [{ x: e.clientX, y: e.clientY }, ...prev.slice(0, 5)];
        return next;
      });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest(".interactive-card")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      mediaQuery.removeEventListener("change", onChange);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Slow ambient glow blob that lags behind */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full pointer-events-none z-[48] mix-blend-screen"
        style={{
          x: glowXSpring,
          y: glowYSpring,
          translateX: "-50%",
          translateY: "-50%",
          background: isHovered
            ? "radial-gradient(circle, rgba(139,92,246,0.35) 0%, rgba(0,240,255,0.1) 60%, transparent 100%)"
            : "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(0,240,255,0.08) 60%, transparent 100%)",
          filter: "blur(6px)",
          scale: isHovered ? 2 : isClicked ? 0.8 : 1.2,
        }}
      />

      {/* Trail dots */}
      {trailPoints.map((pt, i) => (
        <div
          key={i}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[47]"
          style={{
            width: `${Math.max(1, 4 - i)}px`,
            height: `${Math.max(1, 4 - i)}px`,
            background: `rgba(0, 240, 255, ${Math.max(0, 0.4 - i * 0.07)})`,
            transform: `translate(${pt.x - Math.max(1, 4 - i) / 2}px, ${pt.y - Math.max(1, 4 - i) / 2}px)`,
          }}
        />
      ))}

      {/* Main cursor ring */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border-2 pointer-events-none z-[50] flex items-center justify-center transition-colors duration-200 ${
          isHovered
            ? "border-brand-purple bg-brand-purple/10 backdrop-blur-sm"
            : isClicked
            ? "border-brand-cyan bg-brand-cyan/5"
            : "border-white/80 bg-transparent"
        }`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? "44px" : isClicked ? "18px" : "28px",
          height: isHovered ? "44px" : isClicked ? "18px" : "28px",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      />

      {/* Center dot */}
      <motion.div
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[51] ${
          isHovered ? "bg-brand-purple" : "bg-white"
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          scale: isClicked ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}

// ─── Magnetic Wrapper ────────────────────────────────────────────────────────

interface MagneticProps {
  children: ReactNode;
  range?: number;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, range = 60, strength = 0.35, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setIsTouchDevice(!mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsTouchDevice(!e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.hypot(distanceX, distanceY);

      if (distance < range) {
        setPosition({ x: distanceX * strength, y: distanceY * strength });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    },
    [range, strength]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    const el = ref.current;
    if (!el) return;

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (el) el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouchDevice, handleMouseMove, handleMouseLeave]);

  const { x, y } = position;

  return (
    <motion.div
      ref={ref}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
