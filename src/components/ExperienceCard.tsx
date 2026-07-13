import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { Building2, MapPin } from "lucide-react";

interface ExperienceCardProps {
  company: string;
  role: string;
  period: string;
  status: "active" | "completed" | "client";
  statusLabel: string;
  description: string;
  responsibilities?: string[];
  tools?: string[];
  isFirst?: boolean;
  isLast?: boolean;
}

const statusStyles = {
  active: "bg-accent/20 text-accent border border-accent/30",
  completed: "bg-green-500/15 text-green-400 border border-green-500/25",
  client: "bg-primary/15 text-primary border border-primary/25",
};

const ExperienceCard = ({
  company,
  role,
  period,
  status,
  statusLabel,
  description,
  responsibilities,
  tools,
  isFirst = false,
  isLast = false,
}: ExperienceCardProps) => {
  return (
    <motion.div
      variants={fadeUp}
      className="relative pl-14"
    >
      {/* Timeline connector line */}
      {!isLast && (
        <div
          className="absolute left-[23px] top-6 bottom-0 w-px"
          style={{
            background: `linear-gradient(to bottom, hsl(var(--border) / 0.5) 0%, hsl(var(--border) / 0.15) 100%)`,
          }}
        />
      )}

      {/* Timeline dot */}
      <div
        className={`absolute left-[18px] top-7 w-3 h-3 rounded-full z-10 ${
          status === "active"
            ? "border-2 border-accent bg-accent shadow-[0_0_12px_hsl(165_70%_45%/0.5)]"
            : "border-2 border-primary/60 bg-background"
        }`}
      />

      {/* Card */}
      <div className="experience-card p-6 lg:p-8">
        {/* Left accent border */}
        <div
          className={`absolute left-0 top-6 bottom-6 w-[3px] rounded-full ${
            status === "active"
              ? "bg-gradient-to-b from-accent via-accent/60 to-accent/10"
              : status === "client"
              ? "bg-gradient-to-b from-primary via-primary/60 to-primary/10"
              : "bg-gradient-to-b from-green-400/80 via-green-400/40 to-green-400/5"
          }`}
        />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <Building2 className="w-4 h-4 text-muted-foreground" />
              <h3 className="text-xl lg:text-2xl font-bold tracking-tight">{company}</h3>
            </div>
            <p className="text-secondary-foreground font-medium">{role}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="date-pill">{period}</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${statusStyles[status]}`}
            >
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-secondary-foreground leading-relaxed mb-5 max-w-4xl">
          {description}
        </p>

        {/* Responsibilities */}
        {responsibilities && responsibilities.length > 0 && (
          <div className="mb-5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Key Responsibilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              {responsibilities.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-secondary-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/70 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tools */}
        {tools && tools.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Tools & Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-secondary/40 text-secondary-foreground border border-border/30"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
