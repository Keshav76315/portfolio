import React from "react";
import { ExternalLink, Award } from "lucide-react";

export interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl?: string;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({
  title,
  issuer,
  date,
  description,
  credentialUrl,
}) => {
  return (
    <div className="border border-[#C9C6BE] bg-[#FFFFFF] p-5 sm:p-6 space-y-3 hover:border-[#2457FF] transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C9C6BE]/60 pb-3">
        <div className="flex items-start gap-3">
          <Award className="w-5 h-5 text-[#2457FF] shrink-0 mt-0.5" />
          <div>
            <h4 className="font-sans font-bold text-lg text-[#111111]">
              {title}
            </h4>
            <span className="font-mono text-xs text-[#5F5D58] block">
              {issuer}
            </span>
          </div>
        </div>
        <span className="font-mono text-xs text-[#111111] bg-[#F3F1EC] border border-[#C9C6BE] px-3 py-1 self-start sm:self-auto">
          {date}
        </span>
      </div>

      <p className="font-sans text-sm text-[#5F5D58] leading-relaxed">
        {description}
      </p>

      {credentialUrl && (
        <div className="pt-2">
          <a
            href={credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase text-[#2457FF] hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>VERIFY CREDENTIAL PDF</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default CertificationCard;
