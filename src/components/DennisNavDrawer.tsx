import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import Magnetic from "@/components/Magnetic";

interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "Home", href: "#hero" },
  { title: "Work", href: "#work" },
  { title: "Capabilities", href: "#capabilities" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

export const DennisNavDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Floating Circular Menu Button Trigger */}
      <div className="fixed top-6 right-6 sm:top-8 sm:right-10 z-[70] pointer-events-auto">
        <Magnetic strength={0.4}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1C1D20] text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 border border-white/10 group cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <Menu className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>
        </Magnetic>
      </div>

      {/* Slide-In Navigation Drawer Drawer with Curved SVG border */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-[#1C1D20] text-[#F3F1EC] z-[65] flex flex-col justify-between p-10 sm:p-14 shadow-[-20px_0_60px_rgba(0,0,0,0.5)]"
          >
            {/* Nav Links */}
            <div className="space-y-12 my-auto pt-12">
              <div className="border-b border-[#383735] pb-4 font-mono text-[11px] text-[#888680] uppercase tracking-widest">
                <span>NAVIGATION // KESHAV GHAI</span>
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
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-4 font-sans font-bold text-4xl sm:text-5xl uppercase tracking-tight text-[#F3F1EC] hover:text-[#2457FF] transition-colors duration-300"
                      >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#2457FF] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span>{item.title}</span>
                      </a>
                    </Magnetic>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social & Contact Strip */}
            <div className="space-y-4 border-t border-[#383735] pt-6 font-mono text-xs text-[#AAA8A1]">
              <span className="text-[#888680] uppercase tracking-wider block font-bold text-[10px]">
                // DIRECT COMMUNICATIONS
              </span>
              <div className="flex flex-wrap gap-4">
                <a
                  href="mailto:ghaikeshav55@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  ghaikeshav55@gmail.com
                </a>
                <a
                  href="https://github.com/Keshav76315"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub ↗
                </a>
                <a
                  href="https://linkedin.com/in/keshav-ghai"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DennisNavDrawer;
