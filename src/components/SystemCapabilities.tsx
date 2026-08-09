import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Cpu, HardDrive, Compass, ArrowUpRight, ChevronDown } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import { useTheme } from "@/context/ThemeContext";

interface DomainData {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  codeSnippet: string;
  metrics: { label: string; value: string }[];
}

interface SystemCapabilitiesProps {
  onHoverCapability?: (previewData: { title: string; label: string } | null) => void;
}

const domains: DomainData[] = [
  {
    id: "backend",
    number: "01",
    title: "High-Throughput Backends & Distributed Routing",
    tagline: "Resilient microservices, Go reverse proxies, and streaming sockets",
    description: "Zero-bloat backend architecture ground-up. Focused on high concurrency, low latency packet handling, circuit breaker resilience, and secure OAuth telemetry.",
    technologies: ["Go (Golang)", "Node.js / Express", "Python / FastAPI", "MongoDB Atlas", "PostgreSQL", "REST & WebSockets"],
    codeSnippet: `// Go Gin Reverse Proxy & Anomaly Detection Pipeline
router := gin.New()
router.Use(middleware.AdaptiveRateLimiter(5000))
router.Use(middleware.ONNXAnomalyDetector("model.onnx"))
router.Any("/api/v1/*proxy", ProxyHandler)`,
    metrics: [
      { label: "THROUGHPUT", value: "12,400 req/sec" },
      { label: "P99 LATENCY", value: "< 4.2 ms" },
    ],
  },
  {
    id: "ai",
    number: "02",
    title: "On-Device LLMs & Applied Neural Architectures",
    tagline: "Privacy-sovereign local AI inference and computer vision",
    description: "Deploying fine-tuned Quantized LLMs directly on local hardware alongside classical ML pipelines — zero third-party API costs or data leakage.",
    technologies: ["Ollama Local LLMs", "Scikit-Learn", "TensorFlow 2.x", "ONNX Runtime", "OpenCV", "Tesseract.js OCR"],
    codeSnippet: `# LawBuddy Sovereign Modelfile
FROM llama3.2:3b-instruct-q4_K_M
PARAMETER temperature 0.2
SYSTEM "Process case precedents using strictly verified Indian legal statutes."`,
    metrics: [
      { label: "MODEL LATENCY", value: "18.4 tokens/sec" },
      { label: "DATA PRIVACY", value: "100% Sovereign Local" },
    ],
  },
  {
    id: "devops",
    number: "03",
    title: "Container Orchestration & Telemetry Observability",
    tagline: "Automated container builds, Prometheus metrics, and edge deployments",
    description: "Structuring predictable build environments and real-time operational visibility into production microservices via Docker containerization and Prometheus scrapers.",
    technologies: ["Docker Compose", "AWS Cloud", "Prometheus", "Grafana", "Linux Shell", "Winston Logs"],
    codeSnippet: `# Dockerized Prometheus Scraper
services:
  turbosh-engine:
    build: .
    ports: ["8080:8080"]
    environment:
      - PROMETHEUS_METRICS_ENABLED=true`,
    metrics: [
      { label: "CONTAINER STATUS", value: "Healthy (0 restart)" },
      { label: "SCRAPE INTERVAL", value: "15s Prometheus" },
    ],
  },
  {
    id: "spatial",
    number: "04",
    title: "Spatial Precision & Architectural Drafting",
    tagline: "Execution-level CAD working drawings and structural spatial layout",
    description: "Applying CAD drafting precision, structural floor plan constraints, and MEP coordination from architectural practice to digital software systems.",
    technologies: ["GstarCAD", "SketchUp 3D", "Working Drawings", "Floor Plans", "MEP Coordination"],
    codeSnippet: `; CAD Working Drawing Layer Telemetry
LAY_ARCH_WALLS  color=7 (white)   thickness=0.35mm
LAY_MEP_CONDUIT color=5 (blue)    thickness=0.25mm
[EXECUTION STATUS]: Verified for Construction`,
    metrics: [
      { label: "DRAFTING ACCURACY", value: "Execution-Level CAD" },
      { label: "PRACTICE", value: "Studio Eclecea Intern" },
    ],
  },
];

export const SystemCapabilities: React.FC<SystemCapabilitiesProps> = ({ onHoverCapability }) => {
  const [expandedId, setExpandedId] = useState<string | null>("backend");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="capabilities"
      className={`relative py-28 sm:py-36 transition-colors duration-400 overflow-hidden ${
        isDark ? "bg-[#0D0D0E] text-[#F4F4F3]" : "bg-[#1C1D20] text-[#F3F1EC]"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        
        {/* Section Title */}
        <div className={`border-b pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 ${isDark ? "border-[#27272A]" : "border-[#383735]"}`}>
          <div>
            <span className="font-mono text-xs text-[#455CE9] uppercase tracking-[0.2em] block mb-3 font-bold">
              04 // SYSTEM DISCIPLINES
            </span>
            <h2 className="font-sans font-bold text-4xl sm:text-6xl uppercase tracking-tight">
              Capabilities
            </h2>
          </div>
          <p className={`font-serif italic text-lg sm:text-xl max-w-md ${isDark ? "text-[#A1A1AA]" : "text-[#AAA8A1]"}`}>
            Production-grade software architecture, AI engines, and spatial engineering standards.
          </p>
        </div>

        {/* Capabilities Rows */}
        <div className={`space-y-0 border-b ${isDark ? "border-[#27272A]" : "border-[#383735]"}`}>
          {domains.map((domain) => {
            const isExpanded = expandedId === domain.id;

            return (
              <div
                key={domain.id}
                data-cursor-label={isExpanded ? "Close" : "Expand"}
                data-cursor-title={domain.title}
                onClick={() => {
                  const willBeExpanded = expandedId !== domain.id;
                  toggleExpand(domain.id);
                  onHoverCapability?.({
                    title: domain.title,
                    label: willBeExpanded ? "Close" : "Expand",
                  });
                }}
                onMouseEnter={() =>
                  onHoverCapability?.({
                    title: domain.title,
                    label: isExpanded ? "Close" : "Expand",
                  })
                }
                onMouseLeave={() => onHoverCapability?.(null)}
                className={`group border-t py-8 sm:py-12 transition-colors duration-500 hover:bg-white/[0.03] px-4 -mx-4 rounded-lg ${
                  isDark ? "border-[#27272A]" : "border-[#383735]"
                }`}
              >
                {/* Collapsed Header Line */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Number & Title */}
                  <div className="lg:col-span-6 flex items-center gap-6">
                    <span className="font-mono text-xs text-[#455CE9] font-bold">
                      [{domain.number}]
                    </span>
                    <h3 className="font-sans font-bold text-2xl sm:text-4xl group-hover:text-[#455CE9] transition-colors duration-300">
                      {domain.title}
                    </h3>
                  </div>

                  {/* Tagline */}
                  <div className="lg:col-span-5">
                    <p className={`font-sans text-sm leading-relaxed ${isDark ? "text-[#A1A1AA]" : "text-[#AAA8A1]"}`}>
                      {domain.tagline}
                    </p>
                  </div>

                  {/* Expand Toggle Chevron */}
                  <div className="lg:col-span-1 flex justify-end">
                    <Magnetic strength={0.4}>
                      <div className={`w-10 h-10 rounded-full group-hover:bg-[#455CE9] flex items-center justify-center transition-colors duration-300 ${
                        isDark ? "bg-[#27272A]" : "bg-[#262626]"
                      }`}>
                        <ChevronDown className={`w-5 h-5 text-white transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      </div>
                    </Magnetic>
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
                  <div className={`pt-8 sm:pt-10 pl-0 sm:pl-12 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t mt-8 ${
                    isDark ? "border-white/10" : "border-white/10"
                  }`}>
                    
                    {/* Left Column: Description & Metrics */}
                    <div className="lg:col-span-6 space-y-6">
                      <p className="font-sans text-base leading-relaxed opacity-90">
                        {domain.description}
                      </p>

                      {/* Live Telemetry Metrics Pills */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        {domain.metrics.map((m, idx) => (
                          <div key={idx} className={`border px-4 py-2.5 rounded-md font-mono text-xs ${
                            isDark ? "bg-[#18181B] border-white/10" : "bg-[#262626] border-white/10"
                          }`}>
                            <span className="text-[#AAA8A1] block text-[10px] uppercase font-bold tracking-wider">{m.label}</span>
                            <span className="text-[#455CE9] font-bold text-sm">{m.value}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Chips */}
                      <div className="space-y-2 pt-2">
                        <span className="font-mono text-[10px] uppercase text-[#AAA8A1] font-semibold tracking-wider">Tech Stack:</span>
                        <div className="flex flex-wrap gap-2">
                          {domain.technologies.map((tech) => (
                            <span key={tech} className="font-mono text-xs bg-white/10 text-white px-3 py-1 rounded-sm border border-white/10">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Code / Modelfile Snippet Terminal */}
                    <div className="lg:col-span-6">
                      <div className={`border rounded-lg p-5 font-mono text-xs shadow-2xl relative ${
                        isDark ? "bg-[#141416] border-white/15 text-white/90" : "bg-[#141416] border-white/15 text-white/90"
                      }`}>
                        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-[11px] text-[#AAA8A1]">
                          <span className="flex items-center gap-2">
                            <Terminal className="w-3.5 h-3.5 text-[#455CE9]" />
                            <span>System Snippet</span>
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <pre className="overflow-x-auto text-[#455CE9]/90 leading-relaxed font-mono whitespace-pre-wrap">
                          <code>{domain.codeSnippet}</code>
                        </pre>
                      </div>
                    </div>

                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SystemCapabilities;
