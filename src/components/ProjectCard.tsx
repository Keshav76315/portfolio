import { ExternalLink, Github, Sparkles } from "lucide-react";

interface ProjectCardProps {
  title: string;
  status: string;
  statusType?: "active" | "development" | "complete" | "default";
  description: string;
  tags: string[];
  techStack?: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoPlaceholder?: boolean;
  featured?: boolean;
}

const ProjectCard = ({
  title,
  status,
  statusType = "default",
  description,
  tags,
  techStack,
  liveUrl,
  githubUrl,
  demoPlaceholder = false,
  featured = false,
}: ProjectCardProps) => {
  const statusClasses = {
    active: "status-badge-active",
    development: "status-badge bg-primary/20 text-primary",
    complete: "status-badge bg-green-500/20 text-green-400",
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

          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, idx) => (
              <span key={idx} className="skill-tag text-xs">
                {tag}
              </span>
            ))}
          </div>

          {techStack && techStack.length > 0 && (
            <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/50">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Technology Stack
              </p>
              <ul className="text-sm text-secondary-foreground space-y-1">
                {techStack.map((tech, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-accent" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-3 flex-wrap">
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                <ExternalLink className="w-4 h-4" />
                View Live
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                <Github className="w-4 h-4" />
                View Source Code
              </a>
            )}
            {demoPlaceholder && (
              <span className="btn-ghost opacity-60 cursor-not-allowed">
                <ExternalLink className="w-4 h-4" />
                Demo Video (Coming Soon)
              </span>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};

export default ProjectCard;
