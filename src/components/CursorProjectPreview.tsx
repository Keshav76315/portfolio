import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export interface ProjectPreviewData {
  title?: string;
  category?: string;
  label?: string;
}

interface CursorProjectPreviewProps {
  activeProject?: ProjectPreviewData | null;
}

export const CursorProjectPreview: React.FC<CursorProjectPreviewProps> = ({ activeProject: propActiveProject }) => {
  const [autoActiveProject, setAutoActiveProject] = useState<ProjectPreviewData | null>(null);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth spring physics matching Dennis Snellenberg cursor modal
  const springConfig = { stiffness: 320, damping: 26, mass: 0.1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    let lastX = -1000;
    let lastY = -1000;

    const checkHitTest = (x: number, y: number) => {
      if (x < 0 || y < 0) return;

      // Temporarily hide pointer-events elements at point to check underlying data targets
      const el = document.elementFromPoint(x, y);
      if (!el) {
        setAutoActiveProject(null);
        return;
      }

      const target = el.closest("[data-cursor-label]") as HTMLElement | null;
      if (target) {
        const label = target.getAttribute("data-cursor-label") || "View";
        const title = target.getAttribute("data-cursor-title") || "";
        setAutoActiveProject({ title, label });
      } else {
        setAutoActiveProject(null);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      checkHitTest(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      if (lastX >= 0 && lastY >= 0) {
        checkHitTest(lastX, lastY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY]);

  // Use explicit prop if provided, otherwise fallback to continuous hit-test tracking
  const currentActive = propActiveProject !== undefined && propActiveProject !== null
    ? propActiveProject
    : autoActiveProject;
    
  const labelText = currentActive?.label || "View";

  // Hide native OS cursor ONLY when custom cursor bubble is active
  useEffect(() => {
    if (currentActive) {
      document.body.classList.add("cursor-none-active");
    } else {
      document.body.classList.remove("cursor-none-active");
    }
    return () => {
      document.body.classList.remove("cursor-none-active");
    };
  }, [currentActive]);

  // Use React Portal to render OUTSIDE any transformed container directly into document.body
  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {currentActive && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            x: smoothX,
            y: smoothY,
            translateX: "-50%",
            translateY: "-50%",
            pointerEvents: "none",
            zIndex: 99999,
          }}
          className="hidden md:flex items-center justify-center pointer-events-none"
        >
          {/* Dennis Snellenberg Signature Blue Custom Cursor Circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-20 h-20 sm:w-24 sm:h-24 bg-[#455CE9] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(69,92,233,0.45)] border border-white/30"
          >
            <span>{labelText}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CursorProjectPreview;
