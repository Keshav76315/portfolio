import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

export interface ProjectChapterProps {
  index: number;
  total: number;
  title: string;
  category: string;
  status: string;
  description: string;
  problemSolution?: string;
  engineeringDetails?: string[];
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  isDark?: boolean;
  mockupPlaceholderText?: string;
}

export const ProjectChapter: React.FC<ProjectChapterProps> = ({
  index,
  total,
  title,
  category,
  status,
  description,
  problemSolution,
  engineeringDetails,
  techStack,
  githubUrl,
  liveUrl,
  isDark = false,
  mockupPlaceholderText,
}) => {
  const indexStr = (index + 1).toString().padStart(2, "0");
  const totalStr = total.toString().padStart(2, "0");

  const containerBg = isDark ? "bg-[#111111] text-[#F3F1EC]" : "bg-transparent text-[#111111]";
  const borderClass = isDark ? "border-[#383735]" : "border-[#C9C6BE]";
  const mutedTextClass = isDark ? "text-[#AAA8A1]" : "text-[#5F5D58]";
  const boxBg = isDark ? "bg-[#1A1918]" : "bg-[#FFFFFF]";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`py-16 md:py-24 border-b ${borderClass} ${containerBg} relative`}
    >
      {/* Chapter Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-8 sm:mb-12 font-mono text-xs tracking-wider border-hairline opacity-80">
        <div className="flex items-center gap-3">
          <span className="text-[#2457FF] font-bold">[{indexStr} / {totalStr}]</span>
          <span className="uppercase tracking-widest">{category}</span>
        </div>
        <div className="mt-2 sm:mt-0 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2457FF]" />
          <span className={mutedTextClass}>{status}</span>
        </div>
      </div>

      {/* Main Chapter Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Title & Story (7 cols on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h3 className="font-sans font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.05]">
              {title}
            </h3>
          </div>

          <p className="font-sans text-base sm:text-lg lg:text-xl font-normal leading-relaxed text-[#111111] dark:text-[#F3F1EC]">
            {description}
          </p>

          {problemSolution && (
            <div className={`p-5 sm:p-6 ${boxBg} border ${borderClass} space-y-2`}>
              <span className="font-mono text-[11px] uppercase tracking-widest text-[#2457FF] block font-semibold">
                // ARCHITECTURE & PROBLEM FOCUS
              </span>
              <p className={`font-sans text-sm sm:text-base leading-relaxed ${mutedTextClass}`}>
                {problemSolution}
              </p>
            </div>
          )}

          {engineeringDetails && engineeringDetails.length > 0 && (
            <div className="space-y-3 pt-2">
              <span className="font-mono text-xs uppercase tracking-widest text-[#5F5D58] font-medium block">
                Engineering Implementation Highlights:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm font-sans">
                {engineeringDetails.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#2457FF] font-mono select-none">→</span>
                    <span className={mutedTextClass}>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Tags */}
          <div className="pt-4 border-t border-hairline space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#5F5D58] block">
              TECHNOLOGY METADATA
            </span>
            <div className="flex flex-wrap gap-2 font-mono text-xs">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className={`px-2.5 py-1 ${boxBg} border ${borderClass} text-[#111111] dark:text-[#F3F1EC]`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase bg-[#111111] text-[#F3F1EC] dark:bg-[#F3F1EC] dark:text-[#111111] px-5 py-2.5 hover:bg-[#2457FF] dark:hover:bg-[#2457FF] dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>EXPLORE REPOSITORY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 font-mono text-xs tracking-wider uppercase border border-[#2457FF] text-[#2457FF] px-5 py-2.5 hover:bg-[#2457FF] hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>LIVE SYSTEM DEMO</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Art-Directed Editorial Visual Frame (5 cols) */}
        <div className="lg:col-span-5">
          <div className={`group relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full ${boxBg} border ${borderClass} p-4 sm:p-6 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-[#2457FF]`}>
            {/* Minimal Window Header Mockup */}
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/20 dark:bg-[#F3F1EC]/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/20 dark:bg-[#F3F1EC]/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#111111]/20 dark:bg-[#F3F1EC]/20" />
              </div>
              <span className="font-mono text-[10px] uppercase text-[#5F5D58] tracking-widest">
                {title.toLowerCase().replace(/[^a-z0-9]/g, "-")}.sys
              </span>
            </div>

            {/* Graphic Content Body */}
            <div className="my-auto flex flex-col items-center justify-center text-center p-6 space-y-3">
              <span className="font-mono text-xs text-[#2457FF] font-semibold tracking-wider">
                [PROJECT CHAPTER {indexStr}]
              </span>
              <h4 className="font-serif italic text-2xl sm:text-3xl text-[#111111] dark:text-[#F3F1EC]">
                {mockupPlaceholderText || title}
              </h4>
              <p className="font-mono text-[11px] text-[#5F5D58] max-w-xs">
                {category} • Production Codebase & Architecture
              </p>
            </div>

            {/* Bottom Technical Status Line */}
            <div className="flex items-center justify-between border-t border-hairline pt-3 font-mono text-[10px] text-[#5F5D58]">
              <span>STATUS: VERIFIED</span>
              <span>KG_STUDIO_V2</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectChapter;
