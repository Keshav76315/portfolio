import { motion, useScroll, useTransform, useInView, useSpring, useMotionValue, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Mail, Phone, Github, Linkedin, ArrowRight, ArrowUpRight, ExternalLink, FileText } from "lucide-react";
import Navigation from "@/components/Navigation";
import HeroDeckScene from "@/components/HeroDeckScene";
import SystemCapabilities from "@/components/SystemCapabilities";
import ScrambleText from "@/components/ScrambleText";
import { FlipText, StaggerSlideText, PerspectiveSweepText, SplitWordKineticText } from "@/components/HeadingAnimations";
import SystemTerminalModal from "@/components/SystemTerminalModal";
import HUDControls from "@/components/HUDControls";
import SectionSpineNavigation from "@/components/SectionSpineNavigation";
import Magnetic from "@/components/Magnetic";
import CurveTransition from "@/components/CurveTransition";
import CursorProjectPreview, { ProjectPreviewData } from "@/components/CursorProjectPreview";
import HeaderNavigation from "@/components/HeaderNavigation";
import { sound } from "@/utils/sound";
import { useTheme } from "@/context/ThemeContext";

// ─────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const slideUpChild = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const slideUpStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

// ─────────────────────────────────────
// DATA SETS
// ─────────────────────────────────────
const primaryProjects = [
  {
    index: 0,
    title: "Guidon's Eye",
    category: "Desktop HUD & Automation",
    status: "Prototype",
    techStack: ["React 18", "Electron", "TypeScript", "Tailwind CSS"],
    description: "Custom desktop HUD and productivity widget suite for tracking system performance and streamlining daily developer workflows.",
    githubUrl: "https://github.com/Keshav76315",
  },
  {
    index: 1,
    title: "turboSH",
    category: "Security & Middleware",
    status: "Complete",
    techStack: ["Go (Golang)", "Gin", "ONNX Runtime", "Docker"],
    description: "Go-based reverse proxy and security agent featuring shell command parsing, ONNX anomaly detection model integration, and rate-limiting.",
    githubUrl: "https://github.com/Keshav76315",
  },
  {
    index: 2,
    title: "LawBuddy AI",
    category: "Legal Assistant & Local LLM",
    status: "Complete",
    techStack: ["Ollama", "Python", "FastAPI", "React", "TypeScript"],
    description: "Legal query assistant utilizing local LLMs (via Ollama) to parse case documents and assist with legal research while keeping data private on-device.",
    githubUrl: "https://github.com/Keshav76315",
  },
  {
    index: 3,
    title: "Recommendation Engine",
    category: "Machine Learning",
    status: "Complete",
    techStack: ["Python", "Scikit-Learn", "FastAPI", "PostgreSQL"],
    description: "Machine learning recommendation system implementing collaborative and content-based filtering algorithms with FastAPI endpoint serving.",
    githubUrl: "https://github.com/Keshav76315",
  },
];

const secondaryProjects = [
  {
    title: "MedSafe",
    category: "Healthcare & OCR",
    status: "Prototype",
    description: "Medication safety tool combining Tesseract.js OCR for prescription parsing and Gemini AI for dosage guidelines.",
    techStack: ["React 18", "TypeScript", "Gemini API", "Tesseract.js"],
    liveUrl: "https://github.com/Keshav76315",
  },
  {
    title: "CodeChicks",
    category: "Web Application",
    status: "Complete",
    description: "Full-stack community platform with real-time polling, productivity timers, and user authentication.",
    techStack: ["FastAPI", "Python", "MongoDB", "React"],
    liveUrl: "https://github.com/Keshav76315",
  },
  {
    title: "TensorFlow Multi-Model Suite",
    category: "Deep Learning",
    status: "Research",
    description: "Collection of deep learning models including CNN image classifiers, BiLSTM text sequences, and autoencoders.",
    techStack: ["TensorFlow 2.x", "Keras", "OpenCV", "Python"],
    githubUrl: "https://github.com/Keshav76315",
  },
  {
    title: "Notes REST API",
    category: "Backend API",
    status: "Complete",
    description: "RESTful backend API providing CRUD operations, request validation, and MongoDB data persistence.",
    techStack: ["Node.js", "Express.js", "MongoDB", "Mongoose"],
    githubUrl: "https://github.com/Keshav76315",
  },
];

const experiences = [
  {
    role: "Architectural Intern",
    company: "Studio Eclecea",
    period: "Apr 2026 – Present",
    isActive: true,
    description: "Execution-level architectural drafting for residential and interior design projects.",
    scope: ["Floor Plans", "Working Drawings", "MEP Layouts", "Site Inspections"],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Green LeafX",
    period: "Client Project",
    isActive: false,
    description: "Complete web application for sustainability education with automated YouTube feeds and course modules.",
    scope: ["Full-Stack Development", "YouTube API v3", "Cloud Deployment"],
  },
  {
    role: "Applied ML Trainee",
    company: "Unified Mentor",
    period: "2025",
    isActive: false,
    description: "Intensive training program covering supervised/unsupervised learning, model evaluation metrics, and real-world dataset analysis.",
    scope: ["Scikit-learn", "Pandas", "Model Evaluation"],
  },
];

const certifications = [
  {
    title: "IIT Madras — BS Degree in Data Science & Applications",
    issuer: "IIT Madras",
    date: "Enrolled",
    url: "https://study.iitm.ac.in/ds/",
  },
  {
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM / Coursera",
    date: "Certified",
    url: "/ds-certificate.pdf",
  },
  {
    title: "IBM Full Stack Software Developer Professional Certificate",
    issuer: "IBM / Coursera",
    date: "Certified",
    url: "/IBM_SWE_Certificate.png",
  },
  {
    title: "AWS Academy Graduate — AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    date: "Certified",
    url: "/AWS-Certificate.pdf",
  },
  {
    title: "AI Engineer Path — Building LLM Applications",
    issuer: "Scrimba",
    date: "Certified",
    url: "/AI-eng-certificate.pdf",
  },
  {
    title: "Software Engineering Foundations",
    issuer: "Software Engineering Foundations",
    date: "Certified",
    url: "/SEF-certificate.pdf",
  },
];

// ─────────────────────────────────────
// REVEAL TEXT COMPONENT
// ─────────────────────────────────────
const RevealText = ({ children, className }: { children: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = children.split(" ");

  return (
    <motion.p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-top">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.02,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
};

// ─────────────────────────────────────
// SECTION REVEAL HEADER COMPONENT
// ─────────────────────────────────────
const SectionReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ─────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────
export const Index = () => {
  const [cliOpen, setCliOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Shortcut key listener for CLI ~ button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        sound.playClick();
        setCliOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track scroll for progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [activePreview, setActivePreview] = useState<ProjectPreviewData | null>(null);

  // Clear hover preview state on scroll to prevent stuck CSS hover glitch
  useEffect(() => {
    const handleScroll = () => {
      setActivePreview(null);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`min-h-screen font-sans relative transition-colors duration-400 ${
        isDark ? "bg-[#141416] text-[#F4F4F3]" : "bg-[#F4F4F3] text-[#1C1D20]"
      }`}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#455CE9] z-[60] origin-left"
        style={{ scaleX }}
      />

      <HeaderNavigation />
      <CursorProjectPreview activeProject={activePreview} />
      <SectionSpineNavigation />

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* DENNIS SNELLENBERG HERO CANVAS                                 */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <HeroDeckScene />


      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* ABOUT — DENNIS SNELLENBERG EDITORIAL PARAGRAPH                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section
        id="about"
        className={`relative py-28 sm:py-36 border-t transition-colors duration-400 ${
          isDark ? "bg-[#141416] text-[#F4F4F3] border-[#27272A]" : "bg-[#F4F4F3] text-[#1C1D20] border-[#E3E3E3]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Editorial Paragraph */}
            <div className="lg:col-span-8 space-y-8">
              <RevealText className={`font-sans font-light text-2xl sm:text-4xl lg:text-[2.75rem] leading-[1.35] ${
                isDark ? "text-[#F4F4F3]" : "text-[#1C1D20]"
              }`}>
                Helping brands and technical teams build zero-bloat digital infrastructure. Full-stack developer and AI system builder with real-world experience across high-throughput Go backends, sovereign local LLMs, and CAD drafting.
              </RevealText>
              
              <p className={`font-sans text-sm max-w-xl leading-relaxed ${
                isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/70"
              }`}>
                The combination of my passion for software engineering, applied machine learning, and architectural spatial discipline positions me in a unique place in the digital development world.
              </p>
            </div>

            {/* Floating Circular Magnetic Buttons ("About me" & "Resume (PDF)") */}
            <div className="lg:col-span-4 flex flex-wrap items-center justify-start lg:justify-end gap-4">
              <Magnetic strength={0.4}>
                <a
                  href="#contact"
                  className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center shadow-2xl hover:bg-[#455CE9] transition-colors duration-300 border group cursor-pointer ${
                    isDark ? "bg-[#27272A] text-white border-white/10" : "bg-[#1C1D20] text-white border-white/10"
                  }`}
                >
                  <span className="group-hover:scale-110 transition-transform">About me</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.4}>
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#455CE9] text-white font-mono text-xs font-bold uppercase tracking-wider flex flex-col items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300 border border-white/20 group cursor-pointer text-center p-2"
                >
                  <span className="group-hover:scale-110 transition-transform">Resume ↗</span>
                </a>
              </Magnetic>
            </div>

          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* SELECTED WORK — DENNIS SNELLENBERG MINIMAL LIST ROWS           */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section
        id="work"
        className={`relative py-28 sm:py-36 border-t transition-colors duration-400 ${
          isDark ? "bg-[#141416] text-[#F4F4F3] border-[#27272A]" : "bg-[#F4F4F3] text-[#1C1D20] border-[#E3E3E3]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
          
          {/* Section Header */}
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b pb-8 ${
            isDark ? "border-[#27272A]" : "border-[#E3E3E3]"
          }`}>
            <SectionReveal>
              <span className="font-mono text-xs text-[#455CE9] uppercase tracking-[0.2em] block mb-3 font-bold">
                03 // RECENT WORK
              </span>
              <h2 className="font-sans font-bold text-4xl sm:text-6xl uppercase tracking-tight">
                Work
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.2}>
              <span className={`font-mono text-xs mt-4 sm:mt-0 font-semibold ${isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/60"}`}>
                {primaryProjects.length} Selected Projects
              </span>
            </SectionReveal>
          </div>

          {/* Project List Rows */}
          <div className={`space-y-0 border-b ${isDark ? "border-[#27272A]" : "border-[#E3E3E3]"}`}>
            {primaryProjects.map((project, idx) => {
              const isHovered = activePreview?.title === project.title;
              return (
                <div
                  key={project.title}
                  data-cursor-label="View"
                  data-cursor-title={project.title}
                  onMouseEnter={() =>
                    setActivePreview({
                      title: project.title,
                      category: project.category,
                    })
                  }
                  onMouseLeave={() => setActivePreview(null)}
                >
                  <ProjectItem project={project} idx={idx} isHovered={isHovered} />
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CAPABILITIES — INTERACTIVE SYSTEM DISCIPLINES & CONSOLE        */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <SystemCapabilities onHoverCapability={setActivePreview} />


      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* EXPERIMENTS & SECONDARY PROJECTS                              */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section
        id="experiments"
        className={`relative py-28 sm:py-36 border-t transition-colors duration-400 ${
          isDark ? "bg-[#141416] text-[#F4F4F3] border-[#27272A]" : "bg-[#F4F4F3] text-[#1C1D20] border-[#E3E3E3]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
          <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b pb-8 ${
            isDark ? "border-[#27272A]" : "border-[#E3E3E3]"
          }`}>
            <SectionReveal>
              <span className="font-mono text-xs text-[#455CE9] uppercase tracking-[0.2em] block mb-3 font-bold">
                05 // LAB &amp; EXPERIMENTS
              </span>
              <h2 className="font-sans font-bold text-4xl sm:text-6xl uppercase tracking-tight">
                Lab
              </h2>
            </SectionReveal>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideUpStagger}
          >
            {secondaryProjects.map((exp) => (
              <motion.div
                key={exp.title}
                data-cursor-label="Source"
                data-cursor-title={exp.title}
                variants={slideUpChild}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setActivePreview({ title: exp.title, label: "Source" })}
                onMouseLeave={() => setActivePreview(null)}
                className={`group border-t pt-6 flex flex-col justify-between space-y-6 ${
                  isDark ? "border-[#27272A]" : "border-[#E3E3E3]"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-[#455CE9] font-bold uppercase tracking-wider">
                      {exp.category}
                    </span>
                    <span className={isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/60"}>{exp.status}</span>
                  </div>

                  <h4 className="font-sans font-bold text-2xl group-hover:text-[#455CE9] transition-colors duration-300">
                    {exp.title}
                  </h4>

                  <p className={`font-sans text-sm leading-relaxed ${isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/70"}`}>
                    {exp.description}
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex flex-wrap gap-2 font-mono text-xs">
                    {exp.techStack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2.5 py-1 border rounded-sm text-[11px] font-semibold ${
                          isDark ? "bg-[#1F1F23] border-[#27272A] text-white" : "bg-white border-[#E3E3E3] text-[#1C1D20]"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-5 pt-1">
                    {exp.githubUrl && (
                      <a
                        href={exp.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover-underline inline-flex items-center gap-1.5 font-mono text-xs uppercase hover:text-[#455CE9] transition-colors font-bold"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                    {exp.liveUrl && (
                      <a
                        href={exp.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="hover-underline inline-flex items-center gap-1.5 font-mono text-xs uppercase hover:text-[#455CE9] transition-colors font-bold"
                      >
                        <span>Live Preview</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* EXPERIENCE — TIMELINE                                         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section
        id="experience"
        className={`relative py-28 sm:py-36 border-t transition-colors duration-400 ${
          isDark ? "bg-[#141416] text-[#F4F4F3] border-[#27272A]" : "bg-[#F4F4F3] text-[#1C1D20] border-[#E3E3E3]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
          <SectionReveal>
            <span className="font-mono text-xs text-[#455CE9] uppercase tracking-[0.2em] block mb-3 font-bold">
              06 // TRACK RECORD
            </span>
            <h2 className="font-sans font-bold text-4xl sm:text-6xl uppercase tracking-tight mb-16">
              Experience
            </h2>
          </SectionReveal>

          <motion.div
            className="space-y-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideUpStagger}
          >
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.company}
                data-cursor-label="Details"
                data-cursor-title={exp.company}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setActivePreview({ title: exp.company, label: "Details" })}
                onMouseLeave={() => setActivePreview(null)}
                className={`group py-10 sm:py-14 border-t transition-colors duration-500 px-4 -mx-4 rounded-lg ${
                  isDark ? "border-[#27272A] hover:bg-[#1F1F23]" : "border-[#E3E3E3] hover:bg-white/60"
                }`}
                variants={slideUpChild}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  <div className="lg:col-span-4 flex items-start justify-between lg:flex-col lg:gap-2">
                    <div>
                      <h4 className="font-sans font-bold text-xl sm:text-2xl group-hover:text-[#455CE9] transition-colors">
                        {exp.role}
                      </h4>
                      <span className="font-mono text-xs text-[#455CE9] font-semibold">{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs ${isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/60"}`}>{exp.period}</span>
                      {exp.isActive && (
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <p className={`font-sans text-sm leading-relaxed ${isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/70"}`}>
                      {exp.description}
                    </p>
                  </div>

                  <div className="lg:col-span-3 flex flex-wrap gap-2">
                    {exp.scope.map((item) => (
                      <span
                        key={item}
                        className={`font-mono text-[11px] px-3 py-1.5 border rounded-sm ${
                          isDark ? "bg-[#1F1F23] border-[#27272A] text-white" : "bg-white border-[#E3E3E3] text-[#1C1D20]"
                        }`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
            <div className={`border-t ${isDark ? "border-[#27272A]" : "border-[#E3E3E3]"}`} />
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CERTIFICATIONS                                                */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <section
        id="certifications"
        className={`relative py-28 sm:py-36 border-t transition-colors duration-400 ${
          isDark ? "bg-[#141416] text-[#F4F4F3] border-[#27272A]" : "bg-[#F4F4F3] text-[#1C1D20] border-[#E3E3E3]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
          <SectionReveal>
            <span className="font-mono text-xs text-[#455CE9] uppercase tracking-[0.2em] block mb-3 font-bold">
              07 // CREDENTIALS
            </span>
            <h2 className="font-sans font-bold text-4xl sm:text-6xl uppercase tracking-tight mb-16">
              Certifications
            </h2>
          </SectionReveal>

          <motion.div
            className="space-y-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={slideUpStagger}
          >
            {certifications.map((cert) => (
              <motion.a
                key={cert.title}
                data-cursor-label="View"
                data-cursor-title={cert.title}
                href={cert.url}
                target="_blank"
                rel="noreferrer"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setActivePreview({ title: cert.title, label: "View" })}
                onMouseLeave={() => setActivePreview(null)}
                className={`group flex flex-col sm:flex-row sm:items-center justify-between py-6 sm:py-8 border-t transition-all duration-500 px-4 -mx-4 rounded-lg gap-2 ${
                  isDark ? "border-[#27272A] hover:bg-[#1F1F23]" : "border-[#E3E3E3] hover:bg-white/60"
                }`}
                variants={slideUpChild}
              >
                <div className="flex items-center gap-4">
                  <span className="font-sans font-bold text-lg sm:text-xl group-hover:text-[#455CE9] transition-colors">
                    {cert.title}
                  </span>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className={`font-mono text-xs ${isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/60"}`}>{cert.issuer}</span>
                  <span className="font-mono text-xs text-[#455CE9] font-medium">{cert.date}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:text-[#455CE9] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </motion.a>
            ))}
            <div className={`border-t ${isDark ? "border-[#27272A]" : "border-[#E3E3E3]"}`} />
          </motion.div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* CONTACT — DENNIS SNELLENBERG FLAGSHIP FOOTER                  */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <CurveTransition fillColor={isDark ? "#0D0D0E" : "#1C1D20"} direction="down" />

      <section
        id="contact"
        className={`relative py-28 sm:py-36 text-[#F3F1EC] transition-colors duration-400 overflow-hidden ${
          isDark ? "bg-[#0D0D0E]" : "bg-[#1C1D20]"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 relative z-10 space-y-16">
          
          {/* Availability Status Telemetry Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-8 font-mono text-xs text-[#AAA8A1]">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
              <span className="text-white font-bold tracking-wider uppercase">AVAILABLE FOR NEW PROJECTS &amp; ROLES</span>
            </div>
            <span className="text-white/60">PUNJAB, INDIA — IST (UTC +5:30)</span>
          </div>

          {/* Header & Oversized Headline */}
          <div className="space-y-8 border-b border-[#383735] pb-16">
            <div>
              <span className="font-sans font-bold text-3xl sm:text-5xl uppercase tracking-tight text-[#F3F1EC]">
                Let's work
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <h2 className="font-sans font-extrabold text-5xl sm:text-7xl lg:text-[7.5rem] uppercase tracking-tight text-[#F3F1EC] leading-none">
                together
              </h2>

              {/* Floating Magnetic Blue Circle Button (Dennis Snellenberg Signature) */}
              <Magnetic strength={0.4}>
                <a
                  href="mailto:ghaikeshav55@gmail.com"
                  className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#455CE9] text-white flex flex-col items-center justify-center font-mono text-sm font-bold uppercase tracking-wider shadow-[0_20px_60px_rgba(69,92,233,0.5)] hover:scale-110 transition-transform duration-300 border border-white/20 group cursor-pointer"
                >
                  <span className="group-hover:scale-110 transition-transform">Get in touch</span>
                </a>
              </Magnetic>
            </div>
          </div>

          {/* Direct Communication Grid */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 pt-4 font-mono text-xs text-[#AAA8A1]">
            <div className="flex flex-wrap gap-4 items-center">
              <Magnetic strength={0.25}>
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#455CE9] text-white px-6 py-3.5 rounded-full border border-white/20 hover:bg-[#3449c9] transition-colors inline-flex items-center gap-2 font-bold shadow-lg"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Resume (PDF) ↗</span>
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href="mailto:ghaikeshav55@gmail.com"
                  className="bg-[#262626] text-[#F3F1EC] px-6 py-3.5 rounded-full border border-white/10 hover:border-[#455CE9] transition-colors inline-block font-semibold"
                >
                  ghaikeshav55@gmail.com
                </a>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href="tel:+917657805107"
                  className="bg-[#262626] text-[#F3F1EC] px-6 py-3.5 rounded-full border border-white/10 hover:border-[#455CE9] transition-colors inline-block font-semibold"
                >
                  +91 76578 05107
                </a>
              </Magnetic>
            </div>

            <div className="flex items-center gap-6">
              <a href="https://github.com/Keshav76315" target="_blank" rel="noreferrer" className="hover:text-white transition-colors font-bold">
                GitHub ↗
              </a>
              <a href="https://linkedin.com/in/keshav-ghai" target="_blank" rel="noreferrer" className="hover:text-white transition-colors font-bold">
                LinkedIn ↗
              </a>
            </div>
          </div>

        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                        */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <footer className={`border-t transition-colors duration-400 ${
        isDark ? "bg-[#09090B] text-[#71717A] border-[#27272A]" : "bg-[#111111] text-[#5F5D58] border-[#383735]"
      }`}>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <span>© {new Date().getFullYear()} Keshav Ghai</span>
          <span className="text-[11px]">Designed &amp; Engineered in Punjab, India</span>
        </div>
      </footer>

      {/* Floating Interactive HUD Controls */}
      <HUDControls onOpenCLI={() => setCliOpen(true)} />

      {/* Interactive System CLI Terminal Drawer */}
      <SystemTerminalModal isOpen={cliOpen} onClose={() => setCliOpen(false)} />
    </div>
  );
};

// ─────────────────────────────────────
// PROJECT ITEM SUB-COMPONENT
// ─────────────────────────────────────

const ProjectItem = ({
  project,
  idx,
  isHovered,
}: {
  project: typeof primaryProjects[0];
  idx: number;
  isHovered: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.article
      ref={ref}
      className={`group border-t py-12 sm:py-16 lg:py-20 cursor-none transition-colors duration-400 ${
        isDark ? "border-[#27272A]" : "border-[#E3E3E3]"
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, delay: idx * 0.1 }}
    >
      {/* Collapsed View: Title Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 lg:gap-8">
        <div className="flex items-baseline gap-4 sm:gap-6">
          <span className={`font-mono text-xs tabular-nums font-semibold ${isDark ? "text-white/40" : "text-[#1C1D20]/40"}`}>
            {(project.index + 1).toString().padStart(2, "0")}
          </span>
          <h3 className={`font-sans font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight transition-colors duration-500 leading-[1.05] ${
            isHovered ? "text-[#455CE9]" : isDark ? "text-[#F4F4F3]" : "text-[#1C1D20]"
          }`}>
            {project.title}
          </h3>
        </div>

        <div className="flex items-center gap-6 lg:gap-8 pl-8 sm:pl-14 lg:pl-0">
          <span className={`font-mono text-xs uppercase tracking-wider font-semibold ${isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/70"}`}>
            {project.category}
          </span>
          <span className={`hidden sm:flex items-center gap-2 font-mono text-xs ${isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/70"}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#455CE9]" />
            {project.status}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3 }}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ml-auto lg:ml-0 shrink-0 ${
              isHovered
                ? "border-[#455CE9] bg-[#455CE9]"
                : isDark
                ? "border-[#27272A] bg-[#1F1F23]"
                : "border-[#E3E3E3] bg-transparent"
            }`}
          >
            <ArrowRight className={`w-4 h-4 transition-colors -rotate-45 ${isHovered ? "text-white" : isDark ? "text-[#F4F4F3]" : "text-[#1C1D20]"}`} />
          </motion.div>
        </div>
      </div>

      {/* Expanded Details Drawer */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className={`pt-8 sm:pt-10 pl-8 sm:pl-14 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t mt-8 ${
          isDark ? "border-[#27272A]" : "border-[#E3E3E3]"
        }`}>
          {/* Description & Status */}
          <div className="lg:col-span-7 space-y-4">
            <p className={`font-sans text-base sm:text-lg leading-relaxed ${
              isDark ? "text-[#F4F4F3]" : "text-[#1C1D20]"
            }`}>
              {project.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="font-mono text-xs uppercase text-[#455CE9] font-bold tracking-wider">
                Status: {project.status}
              </span>
              <span className={`font-mono text-xs ${isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/60"}`}>
                • {project.category}
              </span>
            </div>
          </div>

          {/* Tech Stack & Repository Links */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className={`font-mono text-[10px] uppercase font-bold tracking-wider block ${
                isDark ? "text-[#A1A1AA]" : "text-[#1C1D20]/60"
              }`}>
                Architecture &amp; Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className={`font-mono text-xs px-3 py-1 border rounded-sm ${
                      isDark ? "bg-[#1F1F23] border-[#27272A] text-white" : "bg-white border-[#E3E3E3] text-[#1C1D20]"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {project.githubUrl && (
              <div className="pt-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#455CE9] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#3449c9] transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository ↗</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.article>
  );
};

export default Index;
