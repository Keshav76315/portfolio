import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles, Check, Copy } from "lucide-react";
import { sound } from "@/utils/sound";

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

interface SystemTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SystemTerminalModal: React.FC<SystemTerminalModalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "sys_init",
      output: (
        <div className="space-y-1 text-[#AAA8A1]">
          <p className="text-emerald-400 font-bold">KESHAV GHAI // KESHAV_OS v2.4 ONLINE</p>
          <p>Type <span className="text-[#2457FF] font-bold">help</span> to list available CLI commands.</p>
        </div>
      ),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    sound.playClick();
    if (!cmd) return;

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-xs text-[#AAA8A1] py-1">
            <p className="text-[#F3F1EC] font-bold">Available System Commands:</p>
            <p><span className="text-[#2457FF] w-24 inline-block font-bold">about</span> - Brief engineering profile &amp; focus</p>
            <p><span className="text-[#2457FF] w-24 inline-block font-bold">projects</span> - List featured production systems</p>
            <p><span className="text-[#2457FF] w-24 inline-block font-bold">skills</span> - Inspect technical stack &amp; capabilities</p>
            <p><span className="text-[#2457FF] w-24 inline-block font-bold">contact</span> - Output direct email &amp; phone details</p>
            <p><span className="text-[#2457FF] w-24 inline-block font-bold">resume</span> - Open PDF resume in new tab</p>
            <p><span className="text-[#2457FF] w-24 inline-block font-bold">clear</span> - Clear terminal output buffer</p>
          </div>
        );
        break;
      case "about":
        outputNode = (
          <p className="text-xs text-[#F3F1EC] leading-relaxed py-1">
            Keshav Ghai is a Software Engineer &amp; Creative Technologist. BS Data Science at IIT Madras, Arch Intern at Studio Eclecea. Specializes in Go proxies, local Ollama LLMs, and high-performance full-stack web applications.
          </p>
        );
        break;
      case "projects":
        outputNode = (
          <div className="space-y-2 text-xs text-[#F3F1EC] py-1">
            <p>1. <span className="text-[#2457FF] font-bold">TurboSH</span> - High-throughput reverse proxy &amp; OAuth platform in Go.</p>
            <p>2. <span className="text-[#2457FF] font-bold">LawBuddy</span> - Local Ollama legal research engine with zero cloud egress.</p>
            <p>3. <span className="text-[#2457FF] font-bold">Green LeafX</span> - Sustainability learning portal with automated YouTube API v3 feeds.</p>
            <p>4. <span className="text-[#2457FF] font-bold">MedSafe</span> - Medication safety platform with Tesseract OCR &amp; Gemini 2.0.</p>
          </div>
        );
        break;
      case "skills":
        outputNode = (
          <div className="text-xs text-[#AAA8A1] space-y-1 py-1">
            <p><span className="text-emerald-400 font-bold">[Backends]</span> Go, Node.js, FastAPI, Express, MongoDB, PostgreSQL, WebSockets</p>
            <p><span className="text-emerald-400 font-bold">[AI &amp; ML]</span> Ollama LLMs, TensorFlow, Scikit-learn, ONNX, OpenCV, Tesseract</p>
            <p><span className="text-emerald-400 font-bold">[Infrastructure]</span> Docker, Prometheus, Grafana, AWS Cloud, Linux Shell</p>
            <p><span className="text-emerald-400 font-bold">[Spatial CAD]</span> GstarCAD 2D/3D, SketchUp, MEP Layouts, Floor Plans</p>
          </div>
        );
        break;
      case "contact":
        outputNode = (
          <div className="text-xs text-[#F3F1EC] space-y-1 py-1">
            <p>Email: <span className="text-[#2457FF] font-bold">ghaikeshav55@gmail.com</span></p>
            <p>Phone: <span className="text-[#2457FF] font-bold">+91 76578 05107</span></p>
            <p>GitHub: <a href="https://github.com/Keshav76315" target="_blank" rel="noreferrer" className="underline text-emerald-400">github.com/Keshav76315</a></p>
          </div>
        );
        break;
      case "resume":
        window.open("/Resume.pdf", "_blank");
        outputNode = <p className="text-xs text-emerald-400">Opening PDF Resume in new tab...</p>;
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        outputNode = (
          <p className="text-xs text-rose-400">
            Command not recognized: "{cmd}". Type <span className="underline">help</span> for command list.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: input, output: outputNode }]);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#111111]/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-3xl bg-[#111111] border border-[#383735] rounded-xl shadow-2xl overflow-hidden font-mono text-sm flex flex-col h-[520px]"
          >
            {/* Window Header Bar */}
            <div className="bg-[#1C1B1A] px-4 py-3 border-b border-[#383735] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="font-mono text-xs text-[#AAA8A1] ml-2 flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#2457FF]" />
                  <span>keshav_cli_terminal.sys</span>
                </span>
              </div>

              <button
                onClick={onClose}
                className="text-[#AAA8A1] hover:text-white p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto space-y-4">
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-[#2457FF]">
                    <span>guest@kg-v2:~$</span>
                    <span className="text-[#F3F1EC] font-bold">{item.command}</span>
                  </div>
                  <div>{item.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Prompt Form */}
            <form onSubmit={handleCommand} className="border-t border-[#383735] bg-[#161514] p-3 flex items-center gap-2">
              <span className="text-xs text-[#2457FF] font-bold pl-2">guest@kg-v2:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type 'help', 'projects', 'skills', 'contact'..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-[#F3F1EC] font-mono placeholder:text-[#5F5D58]"
              />
              <button type="submit" className="p-1.5 text-[#2457FF] hover:text-white transition-colors">
                <CornerDownLeft className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SystemTerminalModal;
