import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Globe, ArrowDownRight, ArrowRight } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import CyberneticGlobeCanvas from "@/components/CyberneticGlobeCanvas";
import { useTheme } from "@/context/ThemeContext";

export const HeroDeckScene: React.FC = () => {
  const { scrollY } = useScroll();
  const marqueeX = useTransform(scrollY, [0, 1000], [0, -400]);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      id="hero"
      className={`relative w-full min-h-screen transition-colors duration-400 overflow-hidden flex flex-col justify-between pt-24 pb-12 ${
        isDark ? "bg-[#141416] text-[#F4F4F3]" : "bg-[#F4F4F3] text-[#1C1D20]"
      }`}
    >
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 1. TOP LOCATION GLOBE BADGE                                       */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 w-full relative z-20 flex items-center justify-end">
        
        {/* Floating Magnetic Location Globe Badge (Punjab, India) */}
        <Magnetic strength={0.35}>
          <div
            className={`flex items-center gap-3 px-5 py-2.5 rounded-full shadow-xl cursor-pointer hover:bg-[#455CE9] transition-colors duration-300 ${
              isDark ? "bg-[#27272A] text-white border border-white/10" : "bg-[#1C1D20] text-white"
            }`}
          >
            <div className="flex flex-col text-[11px] font-mono leading-tight">
              <span className="text-white/70">Located in</span>
              <span className="font-bold text-white">Punjab, India</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white animate-spin-slow" />
            </div>
          </div>
        </Magnetic>

      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 2. HERO COMPOSITION: 3D CYBERNETIC GLOBE + CONTINUOUS MARQUEE     */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="relative w-full my-auto flex flex-col items-center justify-center min-h-[500px] sm:min-h-[580px] lg:min-h-[640px]">
        
        {/* 100% Full-Bleed Continuous Infinite Scroll Marquee */}
        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden">
          <motion.div style={{ x: marqueeX }} className="w-full overflow-hidden">
            <div className="animate-marquee-infinite">
              <h1
                className={`font-sans font-extrabold text-[15vw] sm:text-[14vw] uppercase tracking-tighter leading-none whitespace-nowrap transition-colors duration-400 ${
                  isDark ? "text-[#F4F4F3]/90" : "text-[#1C1D20]/90"
                }`}
              >
                Keshav Ghai — Software Engineer &amp; Applied AI Builder —&nbsp;
              </h1>
              <h1
                className={`font-sans font-extrabold text-[15vw] sm:text-[14vw] uppercase tracking-tighter leading-none whitespace-nowrap transition-colors duration-400 ${
                  isDark ? "text-[#F4F4F3]/90" : "text-[#1C1D20]/90"
                }`}
              >
                Keshav Ghai — Software Engineer &amp; Applied AI Builder —&nbsp;
              </h1>
            </div>
          </motion.div>
        </div>

        {/* Central Standalone 3D Cybernetic Globe Centerpiece (In Place of Photo) */}
        <div className="relative z-10 w-[320px] sm:w-[440px] lg:w-[540px] h-[320px] sm:h-[440px] lg:h-[540px] flex items-center justify-center pointer-events-none">
          <CyberneticGlobeCanvas />
        </div>

        {/* Asymmetric Floating Headline Descriptor (Right) */}
        <div className="absolute right-6 sm:right-16 bottom-12 z-20 hidden lg:flex flex-col items-start space-y-2 max-w-xs text-left">
          <ArrowDownRight className={`w-6 h-6 ${isDark ? "text-[#F4F4F3]" : "text-[#1C1D20]"}`} />
          <p className={`font-serif italic text-2xl leading-tight ${isDark ? "text-[#F4F4F3]" : "text-[#1C1D20]"}`}>
            Software Engineer &amp; Creative Technologist
          </p>
          <span className={`font-mono text-xs uppercase tracking-widest font-semibold ${isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/70"}`}>
            BS Data Science @ IIT Madras
          </span>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* 3. HERO FOOTER CTA & EXPLORE LINK                                 */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div
        className={`max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 w-full relative z-20 flex items-center justify-between font-mono text-xs border-t pt-6 transition-colors duration-400 ${
          isDark ? "text-[#A1A1AA] border-white/15" : "text-[#1C1D20]/80 border-[#1C1D20]/15"
        }`}
      >
        <span>SCROLL TO EXPLORE WORK</span>

        <Magnetic strength={0.3}>
          <a
            href="#work"
            className={`inline-flex items-center gap-3 px-7 py-3.5 rounded-full shadow-xl hover:bg-[#455CE9] transition-colors duration-300 font-bold uppercase tracking-wider ${
              isDark ? "bg-[#27272A] text-white border border-white/10" : "bg-[#1C1D20] text-white"
            }`}
          >
            <span>Explore Work</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </Magnetic>
      </div>

    </section>
  );
};

export default HeroDeckScene;
