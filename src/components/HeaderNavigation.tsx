import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { X, Menu, FileText } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

interface NavItem {
  title: string;
  href: string;
  isExternal?: boolean;
}

const navItems: NavItem[] = [
  { title: "Home", href: "#hero" },
  { title: "Work", href: "#work" },
  { title: "Capabilities", href: "#capabilities" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
  { title: "Resume ↗", href: "/Resume.pdf", isExternal: true },
];

export const HeaderNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const { scrollY } = useScroll();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setShowFloatingButton(true);
    } else {
      setShowFloatingButton(false);
    }
  });

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 1. TOP HEADER (Visible at top of page)                         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 sm:px-12 py-8 flex items-center justify-between pointer-events-none transition-colors duration-400">
        
        {/* Brand Logo / Copyright */}
        <div className="pointer-events-auto">
          <Magnetic strength={0.2}>
            <a
              href="#hero"
              className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
                isDark ? "text-[#F4F4F3] hover:opacity-70" : "text-[#1C1D20] hover:opacity-70"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#455CE9] animate-pulse" />
              <span>© Code by Keshav Ghai</span>
            </a>
          </Magnetic>
        </div>

        {/* Top Header Navigation Links (Fades out when floating button pops in) */}
        <nav
          className={`pointer-events-auto hidden md:flex items-center gap-6 font-mono text-xs font-semibold uppercase tracking-wider transition-opacity duration-300 ${
            showFloatingButton ? "opacity-0 pointer-events-none" : "opacity-100"
          } ${isDark ? "text-[#F4F4F3]" : "text-[#1C1D20]"}`}
        >
          <Magnetic strength={0.25}>
            <a href="#work" className="hover:text-[#455CE9] transition-colors py-2 px-1">Work</a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a href="#about" className="hover:text-[#455CE9] transition-colors py-2 px-1">About</a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a href="#contact" className="hover:text-[#455CE9] transition-colors py-2 px-1">Contact</a>
          </Magnetic>
          
          {/* Prominent Resume Button */}
          <Magnetic strength={0.35}>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={`px-4 py-2 rounded-full transition-colors duration-300 inline-flex items-center gap-1.5 font-bold shadow-lg ${
                isDark ? "bg-[#27272A] text-white hover:bg-[#455CE9] border border-white/10" : "bg-[#1C1D20] text-white hover:bg-[#455CE9]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume ↗</span>
            </a>
          </Magnetic>

          {/* Dennis Snellenberg Magnetic Theme Toggle */}
          <ThemeToggle variant="pill" />
        </nav>

      </header>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 2. FLOATING MENU TRIGGER BUTTON (Scales in when scrolling down) */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {(showFloatingButton || isOpen) && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed top-6 right-6 sm:top-8 sm:right-10 z-[70] pointer-events-auto flex items-center gap-3"
          >
            {/* Quick Floating Theme Toggle */}
            {!isOpen && <ThemeToggle variant="circle" />}

            {/* Quick Floating Resume Pill */}
            {!isOpen && (
              <Magnetic strength={0.3}>
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={`px-4 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider shadow-xl transition-colors border hidden sm:inline-flex items-center gap-1.5 ${
                    isDark ? "bg-[#27272A] text-white hover:bg-[#455CE9] border-white/15" : "bg-[#1C1D20] text-white hover:bg-[#455CE9] border-white/10"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Resume ↗</span>
                </a>
              </Magnetic>
            )}

            <Magnetic strength={0.4}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border group cursor-pointer ${
                  isDark ? "bg-[#27272A] text-white border-white/15" : "bg-[#1C1D20] text-white border-white/10"
                }`}
                aria-label="Toggle Navigation Drawer"
              >
                {isOpen ? (
                  <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                )}
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 3. SLIDE-IN CURVED NAVIGATION DRAWER (Dennis Snellenberg Style)*/}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className={`fixed inset-y-0 right-0 w-full sm:w-[480px] z-[65] flex flex-col justify-between p-10 sm:p-14 shadow-[-20px_0_60px_rgba(0,0,0,0.5)] transition-colors duration-400 ${
              isDark ? "bg-[#0D0D0E] text-[#F4F4F3]" : "bg-[#1C1D20] text-[#F4F4F3]"
            }`}
          >
            <div className="space-y-12 my-auto pt-12">
              <div className="border-b border-[#383735] pb-4 font-mono text-[11px] text-[#888680] uppercase tracking-widest flex items-center justify-between">
                <span>NAVIGATION // KESHAV GHAI</span>
                <ThemeToggle variant="compact" />
              </div>

              <div className="space-y-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
                  >
                    <Magnetic strength={0.25}>
                      <a
                        href={item.href}
                        target={item.isExternal ? "_blank" : "_self"}
                        rel={item.isExternal ? "noreferrer" : undefined}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-4 font-sans font-bold text-4xl sm:text-5xl uppercase tracking-tight text-[#F4F4F3] hover:text-[#455CE9] transition-colors duration-300"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#455CE9] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{item.title}</span>
                      </a>
                    </Magnetic>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-4 border-t border-[#383735] pt-6 font-mono text-xs text-[#AAA8A1]">
              <span className="text-[#888680] uppercase tracking-wider block font-bold text-[10px]">
                // DIRECT COMMUNICATIONS &amp; RESUME
              </span>
              <div className="flex flex-wrap gap-4 items-center">
                <a href="/Resume.pdf" target="_blank" rel="noreferrer" className="text-[#455CE9] hover:underline font-bold flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Resume (PDF) ↗</span>
                </a>
                <a href="mailto:ghaikeshav55@gmail.com" className="hover:text-white transition-colors">
                  ghaikeshav55@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderNavigation;
