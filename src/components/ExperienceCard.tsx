import React from "react";

export interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  status: string;
  statusLabel: string;
  description: string;
  responsibilities?: string[];
  tools?: string[];
  isFirst?: boolean;
  isLast?: boolean;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  company,
  role,
  period,
  statusLabel,
  description,
  responsibilities,
  tools,
}) => {
  return (
    <div className="border border-[#C9C6BE] bg-[#FFFFFF] p-6 sm:p-8 space-y-4 hover:border-[#2457FF] transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#C9C6BE]/60 pb-4 gap-2">
        <div>
          <span className="font-mono text-xs text-[#2457FF] uppercase tracking-widest block font-medium">
            {company}
          </span>
          <h4 className="font-sans font-bold text-xl sm:text-2xl text-[#111111]">
            {role}
          </h4>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[#111111] bg-[#F3F1EC] border border-[#C9C6BE] px-3 py-1">
            {period}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#2457FF] border border-[#2457FF]/40 px-2 py-0.5">
            {statusLabel}
          </span>
        </div>
      </div>

      <p className="font-sans text-base text-[#5F5D58] leading-relaxed">
        {description}
      </p>

      {responsibilities && responsibilities.length > 0 && (
        <div className="pt-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#111111] font-semibold block mb-2">
            Scope & Deliverables:
          </span>
          <div className="flex flex-wrap gap-2">
            {responsibilities.map((resp) => (
              <span
                key={resp}
                className="font-mono text-xs text-[#5F5D58] bg-[#F3F1EC] border border-[#C9C6BE]/60 px-2.5 py-1"
              >
                {resp}
              </span>
            ))}
          </div>
        </div>
      )}

      {tools && tools.length > 0 && (
        <div className="pt-2 border-t border-[#C9C6BE]/40 flex flex-wrap items-center gap-2 font-mono text-xs text-[#5F5D58]">
          <span className="text-[#111111] font-medium">Tools:</span>
          {tools.join(" • ")}
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
