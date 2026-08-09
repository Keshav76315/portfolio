import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "01 // HERO" },
  { id: "about", label: "02 // ABOUT" },
  { id: "work", label: "03 // WORK" },
  { id: "capabilities", label: "04 // ENGINE" },
  { id: "experiments", label: "05 // LAB" },
  { id: "experience", label: "06 // TRACK" },
  { id: "certifications", label: "07 // CREDENTIALS" },
  { id: "contact", label: "08 // CONTACT" },
];

export const SectionSpineNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i].id);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden 2xl:flex flex-col gap-4 font-mono text-[10px] text-[#5F5D58] select-none pointer-events-auto">
      <div className="w-px h-12 bg-[#C9C6BE]/60 ml-2 mb-1" />
      
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`flex items-center gap-3 transition-all duration-300 group ${
              isActive ? "text-[#2457FF] font-bold" : "text-[#5F5D58]/60 hover:text-[#111111]"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "bg-[#2457FF] scale-125 shadow-[0_0_8px_rgba(36,87,255,0.6)]"
                  : "bg-[#C9C6BE] group-hover:bg-[#111111]"
              }`}
            />
            <span className="tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono">
              {section.label}
            </span>
          </a>
        );
      })}

      <div className="w-px h-12 bg-[#C9C6BE]/60 ml-2 mt-1" />
    </div>
  );
};

export default SectionSpineNavigation;
