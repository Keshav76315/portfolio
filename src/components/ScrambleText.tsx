import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { sound } from "@/utils/sound";

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  triggerOnHover?: boolean;
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_#@!$%&*";

export const ScrambleText: React.FC<ScrambleTextProps> = ({
  text,
  className = "",
  scrambleSpeed = 30,
  triggerOnHover = true,
}) => {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const scramble = () => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;
    sound.playHover();

    let iteration = 0;
    const maxIterations = text.length * 3;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration / 3) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("")
      );

      iteration += 1;
      if (iteration >= maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    }, scrambleSpeed);
  };

  useEffect(() => {
    if (isInView) {
      scramble();
    }
  }, [isInView]);

  return (
    <motion.span
      ref={containerRef}
      onMouseEnter={() => {
        if (triggerOnHover) scramble();
      }}
      className={`cursor-pointer inline-block transition-colors ${className}`}
    >
      {displayText}
    </motion.span>
  );
};

export default ScrambleText;
