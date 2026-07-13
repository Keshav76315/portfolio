import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { fadeUp } from "@/lib/animations";

interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl?: string;
}

const CertificationCard = ({
  title,
  issuer,
  date,
  description,
  credentialUrl,
}: CertificationCardProps) => {
  return (
    <motion.div
      variants={fadeUp}
      className="cert-card-compact group"
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <div className="w-11 h-11 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-300">
          <Award className="w-5 h-5 text-accent" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-sm lg:text-base font-semibold text-foreground tracking-tight truncate">
              {title}
            </h3>
            <p className="text-xs text-muted-foreground font-medium">
              {issuer}
            </p>
          </div>
          <span className="date-pill shrink-0 self-start sm:self-center">
            {date}
          </span>
        </div>
        <p className="text-xs text-secondary-foreground/80 leading-relaxed mt-1.5 mb-3 line-clamp-2">
          {description}
        </p>
        {credentialUrl && (
          <a
            href={credentialUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-accent hover:text-accent/80 transition-colors"
          >
            <Award className="w-3.5 h-3.5" />
            Verify Credential
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default CertificationCard;
