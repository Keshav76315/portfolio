import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CurveTransitionProps {
  fillColor?: string;
  className?: string;
  direction?: "up" | "down";
}

export const CurveTransition: React.FC<CurveTransitionProps> = ({
  fillColor = "#F4F4F3",
  className = "",
  direction = "down",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className={`relative w-full overflow-hidden pointer-events-none select-none z-20 ${className}`}>
      <svg
        className="w-full h-16 sm:h-24 lg:h-32 block"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path
          fill={fillColor}
          d={
            direction === "down"
              ? "M 0,0 Q 720,100 1440,0 L 1440,100 L 0,100 Z"
              : "M 0,100 Q 720,0 1440,100 L 1440,0 L 0,0 Z"
          }
        />
      </svg>
    </div>
  );
};

export default CurveTransition;
