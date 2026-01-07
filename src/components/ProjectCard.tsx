import { ExternalLink, Github, Sparkles } from "lucide-react";

interface ProjectCardProps {
  title: string;
  status: string;
  statusType?: "active" | "development" | "default";
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const ProjectCard = ({
  title,
  status,
  statusType = "default",
  description,
  tags,
  liveUrl,
  githubUrl,
  featured = false,
}: ProjectCardProps) => {
  const statusClasses = {
    active: "status-badge-active",
    development: "status-badge bg-primary/20 text-primary",
    default: "status-badge",
  };

  return (
    <article
      className={`glass-card-hover p-6 lg:p-8 ${
        featured ? "ring-1 ring-primary/20" : ""
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              {featured && (
                <Sparkles className="w-5 h-5 text-accent" />
              )}
              <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            <span className={statusClasses[statusType]}>{status}</span>
          </div>

          <p className="text-secondary-foreground leading-relaxed mb-5">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, idx) => (
              <span key={idx} className="skill-tag text-xs">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                <Github className="w-4 h-4" />
                Source
              </a>
            )}
          </div>
        </div>

        <div className="lg:w-2/5 flex items-center">
          <div className="project-visual animate-float">
            <span className="mono text-xs">Preview</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
