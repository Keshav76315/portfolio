import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { fadeUp } from "@/lib/animations";

interface CertificationCardProps {
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialUrl?: string;
  imageUrl?: string;
}

const CertificationCard = ({
  title,
  issuer,
  date,
  description,
  credentialUrl,
  imageUrl,
}: CertificationCardProps) => {
  return (
    <motion.div
      variants={fadeUp}
      className="glass-card-hover p-6 lg:p-8 flex flex-col gap-6"
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Icon / Badge Area */}
        <div className="flex-shrink-0 flex items-start justify-center">
          <div className="w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Award className="w-8 h-8 text-accent" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground tracking-tight">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                {issuer}
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full whitespace-nowrap self-start">
              {date}
            </span>
          </div>

          <p className="text-secondary-foreground text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Credential Link */}
          {credentialUrl && (
            <motion.a
              href={credentialUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-ghost text-xs inline-flex"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Verify Credential
            </motion.a>
          )}
        </div>
      </div>

      {/* Certificate Image */}
      {imageUrl && (
        <div className="w-full rounded-xl overflow-hidden border border-border/40 bg-secondary/20">
          <img
            src={imageUrl}
            alt={`${title} - Certificate`}
            className="w-full rounded-xl"
          />
        </div>
      )}
    </motion.div>
  );
};

export default CertificationCard;
