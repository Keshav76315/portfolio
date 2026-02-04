import { ExternalLink, Briefcase, CheckCircle2, Layers, Wrench } from "lucide-react";

interface TechCategory {
  category: string;
  items: string[];
}

interface FreelanceCardProps {
  clientName: string;
  projectName: string;
  overview: string;
  features: string[];
  technologies: TechCategory[];
  responsibilities: string[];
  liveUrl?: string;
  accentColor?: "green" | "blue" | "purple" | "orange";
}

const accentStyles = {
  green: {
    border: "from-emerald-500 via-green-400 to-teal-500",
    badge: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400",
    highlight: "text-emerald-400",
  },
  blue: {
    border: "from-blue-500 via-cyan-400 to-indigo-500",
    badge: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    dot: "bg-blue-400",
    highlight: "text-blue-400",
  },
  purple: {
    border: "from-purple-500 via-violet-400 to-fuchsia-500",
    badge: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    dot: "bg-purple-400",
    highlight: "text-purple-400",
  },
  orange: {
    border: "from-orange-500 via-amber-400 to-yellow-500",
    badge: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    dot: "bg-orange-400",
    highlight: "text-orange-400",
  },
};

const FreelanceCard = ({
  clientName,
  projectName,
  overview,
  features,
  technologies,
  responsibilities,
  liveUrl,
  accentColor = "green",
}: FreelanceCardProps) => {
  const colors = accentStyles[accentColor];

  return (
    <article className="relative overflow-hidden">
      {/* Gradient accent border on the left */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl bg-gradient-to-b ${colors.border}`}
      />

      <div className="glass-card p-8 lg:p-10 pl-10 lg:pl-12">
        {/* Header with Client Badge */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Briefcase className={`w-5 h-5 ${colors.highlight}`} />
              <span
                className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full border ${colors.badge}`}
              >
                Client Work
              </span>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold">{clientName}</h3>
            <p className="text-secondary-foreground text-lg mt-1">
              {projectName}
            </p>
          </div>

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary text-base shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
              View Live Project
            </a>
          )}
        </div>

        {/* Overview */}
        <p className="text-secondary-foreground leading-relaxed text-lg mb-8 max-w-4xl">
          {overview}
        </p>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`w-5 h-5 ${colors.highlight}`} />
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Key Features
              </h4>
            </div>
            <ul className="space-y-3">
              {features.map((feature, idx) => {
                const [title, ...rest] = feature.split(" – ");
                const description = rest.join(" – ");
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <span
                      className={`w-2 h-2 rounded-full ${colors.dot} mt-2 shrink-0`}
                    />
                    <div>
                      <span className="font-medium text-foreground">
                        {title}
                      </span>
                      {description && (
                        <span className="text-secondary-foreground">
                          {" "}
                          – {description}
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Column: Tech + Responsibilities */}
          <div className="space-y-8">
            {/* Technologies */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layers className={`w-5 h-5 ${colors.highlight}`} />
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Technologies Used
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) =>
                  tech.items.map((item, idx) => (
                    <span
                      key={`${tech.category}-${idx}`}
                      className="skill-tag text-sm"
                    >
                      {item}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Responsibilities */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Wrench className={`w-5 h-5 ${colors.highlight}`} />
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Role & Responsibilities
                </h4>
              </div>
              <ul className="space-y-2">
                {responsibilities.map((resp, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-secondary-foreground"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FreelanceCard;
