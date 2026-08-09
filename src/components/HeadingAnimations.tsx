import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { sound } from "@/utils/sound";

// ─────────────────────────────────────────────────────────────────────────────
// 1. FLIP TEXT (3D Split-Flap Mechanical Arrival Board Effect)
// Used for: ABOUT / ENGINEERING DISCIPLINE
// ─────────────────────────────────────────────────────────────────────────────
interface FlipTextProps {
  text: string;
  className?: string;
}

export const FlipText: React.FC<FlipTextProps> = ({ text, className = "" }) => {
  const [key, setKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const triggerFlip = () => {
    sound.playHover();
    setKey((prev) => prev + 1);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={triggerFlip}
      className={`inline-flex flex-wrap cursor-pointer perspective-scene ${className}`}
      style={{ perspective: "1000px" }}
    >
      {text.split("").map((char, index) => (
        <span key={`${key}-${index}`} className="inline-block overflow-hidden">
          <motion.span
            initial={{ rotateX: -90, opacity: 0, y: -10 }}
            animate={isInView ? { rotateX: 0, opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.03,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "top center", display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. STAGGER SLIDE TEXT (Masked Vertical Slide & Character Expansion)
// Used for: SELECTED WORK / PROJECTS
// ─────────────────────────────────────────────────────────────────────────────
interface StaggerSlideTextProps {
  text: string;
  className?: string;
}

export const StaggerSlideText: React.FC<StaggerSlideTextProps> = ({ text, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        sound.playHover();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`inline-flex flex-wrap cursor-pointer overflow-hidden ${className}`}
    >
      {text.split("").map((char, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={
              isInView
                ? {
                    y: "0%",
                    opacity: 1,
                    scale: isHovered ? 1.08 : 1,
                    color: isHovered ? "#2457FF" : "#111111",
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: index * 0.035,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block transition-colors duration-300"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. GLITCH TELEMETRY TEXT (Digital Chromatic Offset & Coordinate Glitch)
// Used for: CAPABILITIES / SYSTEM DISCIPLINES
// ─────────────────────────────────────────────────────────────────────────────
interface GlitchTextProps {
  text: string;
  className?: string;
}

export const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
  const [isGlitched, setIsGlitched] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const triggerGlitch = () => {
    sound.playHover();
    setIsGlitched(true);
    setTimeout(() => setIsGlitched(false), 500);
  };

  useEffect(() => {
    if (isInView) {
      triggerGlitch();
    }
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={triggerGlitch}
      className={`relative inline-block cursor-pointer ${className}`}
    >
      {/* Primary Text */}
      <span className="relative z-10">{text}</span>

      {/* Red/Blue Chromatic Glitch Offsets on Hover / Reveal */}
      {isGlitched && (
        <>
          <span
            className="absolute top-0 left-0 text-rose-500 opacity-80 pointer-events-none z-0 animate-pulse"
            style={{ transform: "translate(-3px, -2px)", clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
          >
            {text}
          </span>
          <span
            className="absolute top-0 left-0 text-[#2457FF] opacity-80 pointer-events-none z-0"
            style={{ transform: "translate(3px, 2px)", clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
          >
            {text}
          </span>
        </>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. PERSPECTIVE SWEEP TEXT (Perspective Scale + Sweep Laser Line)
// Used for: CREDENTIALS / CERTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────
interface PerspectiveSweepTextProps {
  text: string;
  className?: string;
}

export const PerspectiveSweepText: React.FC<PerspectiveSweepTextProps> = ({ text, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        sound.playHover();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-block cursor-pointer ${className}`}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.92, z: -40 }}
        animate={
          isInView
            ? {
                opacity: 1,
                scale: isHovered ? 1.04 : 1,
                z: isHovered ? 20 : 0,
              }
            : {}
        }
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="inline-block transition-transform duration-300"
      >
        {text}
      </motion.span>

      {/* Laser Underline Sweep */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="h-1 bg-[#2457FF] rounded-full origin-left mt-1"
      />
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// 5. DRAMATIC SPLIT WORD KINETIC REVEAL (Kinetic Word Elevate & Letter Spacing)
// Used for: CONTACT / HAVE SOMETHING WORTH BUILDING?
// ─────────────────────────────────────────────────────────────────────────────
interface SplitWordKineticTextProps {
  text: string;
  className?: string;
}

export const SplitWordKineticText: React.FC<SplitWordKineticTextProps> = ({ text, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        sound.playHover();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-wrap gap-x-[0.3em] gap-y-2 cursor-pointer ${className}`}
    >
      {text.split(" ").map((word, index) => (
        <span key={index} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "100%", opacity: 0 }}
            animate={
              isInView
                ? {
                    y: "0%",
                    opacity: 1,
                    letterSpacing: isHovered ? "0.04em" : "0em",
                    color: isHovered ? "#2457FF" : "#F3F1EC",
                  }
                : {}
            }
            transition={{
              duration: 0.8,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block transition-all duration-300"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};
