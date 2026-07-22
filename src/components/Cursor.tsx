/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports fine pointers (mice)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsTouchDevice(!mediaQuery.matches);

    const onChange = (e: MediaQueryListEvent) => {
      setIsTouchDevice(!e.matches);
    };
    mediaQuery.addEventListener("change", onChange);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Track hovered interactive elements
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
      {/* Dynamic light trail follower */}
      <motion.div
        id="cursor-follower"
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 bg-brand-cyan/20 blur-md mix-blend-screen"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovered ? 2.5 : isClicked ? 0.7 : 1,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 25 }}
      />

      {/* Main interactive cursor ring */}
      <motion.div
        id="cursor-ring"
        className={`fixed top-0 left-0 w-5 h-5 rounded-full border pointer-events-none z-50 mix-blend-difference flex items-center justify-center ${
          isHovered
            ? "border-brand-purple bg-brand-purple/10"
            : "border-white"
        }`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          scale: isHovered ? 1.6 : isClicked ? 0.8 : 1,
        }}
      />

      {/* Center cursor dot */}
      <motion.div
        id="cursor-dot"
        className={`fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-50 ${
          isHovered ? "bg-brand-cyan" : "bg-white"
        }`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}

// Premium Magnetic Wrapper for Buttons & Cards
interface MagneticProps {
  children: ReactNode;
  range?: number;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, range = 60, strength = 0.35, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      // Pull element toward the cursor
      setPosition({
        x: distanceX * strength,
        y: distanceY * strength,
      });
    } else {
      // Return to original position
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (el) el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [range, strength]);

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
