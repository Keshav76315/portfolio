import React from "react";
import { Github, ExternalLink } from "lucide-react";

export interface ExperimentRowProps {
  title: string;
  category: string;
  status: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const ExperimentRow: React.FC<ExperimentRowProps> = ({
  title,
  category,
  status,
  description,
  techStack,
  githubUrl,
  liveUrl,
}) => {
  return (
    <div className="group border border-[#C9C6BE] hover:border-[#2457FF] bg-[#FFFFFF] p-6 transition-all duration-300 flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-[11px] text-[#5F5D58] border-b border-[#C9C6BE]/40 pb-2">
          <span className="uppercase tracking-wider">{category}</span>
          <span className="text-[#2457FF] font-medium">{status}</span>
        </div>

        <h4 className="font-sans font-bold text-xl text-[#111111] group-hover:text-[#2457FF] transition-colors">
          {title}
        </h4>

        <p className="font-sans text-sm text-[#5F5D58] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="space-y-4 pt-2 border-t border-[#C9C6BE]/40">
        <div className="font-mono text-xs text-[#5F5D58] flex flex-wrap gap-1.5">
          {techStack.map((tech, i) => (
            <span key={tech}>
              {tech}
              {i < techStack.length - 1 ? " • " : ""}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase text-[#111111] hover:text-[#2457FF] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>SOURCE</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase text-[#2457FF] hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LIVE DEMO</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperimentRow;
