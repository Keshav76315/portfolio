import React from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import Magnetic from "@/components/Magnetic";
import { sound } from "@/utils/sound";

interface ThemeToggleProps {
  variant?: "pill" | "circle" | "compact";
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = "pill", className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const handleClick = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    sound.click();
    toggleTheme();
  };

  if (variant === "circle") {
    return (
      <Magnetic strength={0.35}>
        <div onClick={handleClick} className="inline-block cursor-pointer pointer-events-auto z-50 relative">
          <button
            type="button"
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 shadow-xl border cursor-pointer ${
              isDark
                ? "bg-[#27272A] text-amber-300 border-white/10 hover:bg-[#3F3F46]"
                : "bg-[#1C1D20] text-white border-black/10 hover:bg-[#455CE9]"
            } ${className}`}
            aria-label="Toggle Dark/Light Mode"
            title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center pointer-events-none"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-indigo-300" />}
            </motion.div>
          </button>
        </div>
      </Magnetic>
    );
  }

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`px-3 py-1.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 pointer-events-auto relative z-50 cursor-pointer ${
          isDark
            ? "bg-[#27272A] text-white hover:bg-[#3F3F46] border border-white/10"
            : "bg-[#1C1D20] text-white hover:bg-[#455CE9] border border-black/10"
        } ${className}`}
      >
        {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-indigo-300" />}
        <span>{isDark ? "Light" : "Dark"}</span>
      </button>
    );
  }

  // Default Pill Variant
  return (
    <Magnetic strength={0.35}>
      <div onClick={handleClick} className="inline-block cursor-pointer pointer-events-auto z-50 relative">
        <button
          type="button"
          className={`px-4 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 transition-all duration-300 shadow-lg border cursor-pointer ${
            isDark
              ? "bg-[#27272A] text-white hover:bg-[#3F3F46] border-white/15 shadow-[0_4px_20px_rgba(255,255,255,0.05)]"
              : "bg-[#1C1D20] text-white hover:bg-[#455CE9] border-black/10 shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
          } ${className}`}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center pointer-events-none"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-300" />
            )}
          </motion.div>
          <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </Magnetic>
  );
};

export default ThemeToggle;
