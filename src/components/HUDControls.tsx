import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Terminal, ArrowUp, Sun, Moon } from "lucide-react";
import { sound } from "@/utils/sound";
import { useTheme } from "@/context/ThemeContext";

interface HUDControlsProps {
  onOpenCLI: () => void;
}

export const HUDControls: React.FC<HUDControlsProps> = ({ onOpenCLI }) => {
  const [soundActive, setSoundActive] = useState(sound.enabled);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setSoundActive(sound.enabled);
    if (sound.enabled) {
      sound.playSuccess();
    }
  };

  const handleThemeToggle = () => {
    sound.playClick();
    toggleTheme();
  };

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 p-1.5 rounded-full shadow-2xl backdrop-blur-md transition-colors duration-400 border ${
        isDark
          ? "bg-[#18181B]/95 text-[#F4F4F3] border-white/15"
          : "bg-[#111111]/90 text-[#F3F1EC] border-[#383735]"
      }`}
    >
      {/* Theme Switcher Button */}
      <button
        onClick={handleThemeToggle}
        className={`p-2 rounded-full transition-all duration-300 ${
          isDark
            ? "bg-[#27272A] text-amber-300 hover:bg-[#3F3F46]"
            : "bg-[#1C1B1A] text-indigo-300 hover:bg-[#455CE9] hover:text-white"
        }`}
        title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      >
        {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
      </button>

      {/* CLI Modal Trigger Button */}
      <button
        onClick={() => {
          sound.playClick();
          onOpenCLI();
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] transition-all duration-300 group ${
          isDark
            ? "bg-[#27272A] hover:bg-[#455CE9] text-white"
            : "bg-[#1C1B1A] hover:bg-[#455CE9] text-[#F3F1EC]"
        }`}
        title="Open System CLI Terminal (Press ~)"
      >
        <Terminal className="w-3.5 h-3.5 text-[#455CE9] group-hover:text-white transition-colors" />
        <span className="hidden sm:inline font-semibold">CLI</span>
        <span className="hidden md:inline text-[9px] opacity-60 bg-white/10 px-1 rounded">[~]</span>
      </button>

      {/* Audio Sound FX Toggle */}
      <button
        onClick={toggleSound}
        className={`p-2 rounded-full transition-all duration-300 ${
          soundActive
            ? "bg-[#455CE9] text-white"
            : "bg-[#1C1B1A] text-white/50 hover:bg-white/10"
        }`}
        title={soundActive ? "Mute UI Audio" : "Enable UI Audio"}
      >
        {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
      </button>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className="p-2 rounded-full bg-[#1C1B1A] hover:bg-white/20 text-white transition-all duration-300"
        title="Scroll to Top"
      >
        <ArrowUp className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};

export default HUDControls;
