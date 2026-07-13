import {
  Mail,
  Phone,
  Github,
  Linkedin,
  Download,
  CheckCircle,
  Beaker,
} from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import ExperienceCard from "@/components/ExperienceCard";
import CertificationCard from "@/components/CertificationCard";
import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  scaleUp,
  reveal,
} from "@/lib/animations";

// ─────────────────────────────────────
// PROJECT DATA
// ─────────────────────────────────────

interface ProjectData {
  title: string;
  status: string;
  statusType: "active" | "development" | "complete" | "default";
  description: string;
  tags: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  demoPlaceholder?: boolean;
  featured?: boolean;
  priority: number;
}

// Primary Featured Projects
const featuredProjects: ProjectData[] = [
  {
    title: "Guidon's Eye",
    status: "Prototype Ready",
    statusType: "active",
    featured: true,
    priority: 1,
    description:
      "Privacy-first productivity assistant that tracks active applications, provides context-aware nudges, and integrates with a conversational AI backend to boost focus and automation. Built as a lightweight desktop overlay for developers and knowledge workers seeking distraction-free productivity.",
    tags: [
      "Desktop HUD",
      "Productivity",
      "AI Assistant",
      "Automation",
      "Privacy-Focused",
    ],
    techStack: [
      "Runtime: Electron (Chromium + Node.js)",
      "Frontend: Vanilla HTML/CSS/JavaScript",
      "Backend: Node.js (Main Process)",
      "Database: MongoDB (Local Instance)",
      "AI APIs: Google Gemini, Perplexity Sonar",
      "HTTP Client: Axios with Circuit Breaker",
      "Logging: Winston (JSON format)",
    ],
    githubUrl: "https://github.com/Keshav76315/guidons-eye",
  },
  {
    title: "turboSH",
    status: "Complete",
    statusType: "complete",
    featured: true,
    priority: 2,
    description:
      "An AI‑powered intelligent middleware layer designed to optimize server performance and enhance security. It automatically schedules and rate-limits incoming requests, caches frequent responses, and utilizes machine learning models (Isolation Forest, SVM) to detect anomalies and mitigate threats in real-time without needing a GPU.",
    tags: [
      "Middleware",
      "AI Security",
      "Reverse Proxy",
      "Machine Learning",
      "Go",
    ],
    techStack: [
      "Middleware: Go (net/http, gin)",
      "Data Pipeline: Go + Python (pandas, numpy)",
      "ML: Python (scikit-learn, ONNX)",
      "Monitoring: Prometheus, Grafana",
      "Deployment: Docker",
    ],
    githubUrl: "https://github.com/Keshav76315/turboSH",
  },
  {
    title: "LawBuddy AI",
    status: "Complete",
    statusType: "complete",
    featured: true,
    priority: 3,
    description:
      "An intelligent legal assistant platform powered by a custom, locally-hosted Large Language Model built via fine-tuning — no external API calls, no cloud dependencies. LawBuddy runs entirely on-device for maximum privacy and data sovereignty, providing real-time legal analysis, AI-assisted document drafting, and full case management through a modern web interface.",
    tags: [
      "Local LLM",
      "Ollama",
      "Legal Tech",
      "AI Assistant",
      "Privacy-First",
      "NLP",
    ],
    techStack: [
      "AI: Custom Ollama-hosted Model (LawBuddy:latest)",
      "Backend: Node.js, Express.js",
      "Database: Innovative JSON file-based DB (zero setup)",
      "Frontend: HTML5, CSS3, JavaScript",
      "Auth: Express Sessions",
    ],
    githubUrl: "https://github.com/Keshav76315/LawBuddy",
  },
  {
    title: "Recommendation Engine",
    status: "Complete",
    statusType: "complete",
    featured: true,
    priority: 4,
    description:
      "A production-grade recommendation engine implementing collaborative filtering, content-based filtering, and hybrid approaches to deliver personalized suggestions. Designed as a modular ML pipeline with data preprocessing, model training, and real-time inference capabilities for scalable recommendation use cases.",
    tags: [
      "Machine Learning",
      "Collaborative Filtering",
      "Content-Based",
      "Recommendation System",
      "Data Pipeline",
    ],
    techStack: [
      "Core: Python, Scikit-learn, Pandas, NumPy",
      "Techniques: Collaborative Filtering, Content-Based Filtering",
      "Processing: TF-IDF, Cosine Similarity",
      "Evaluation: Precision, Recall, RMSE",
    ],
    githubUrl: "https://github.com/Keshav76315/recommendation-engine",
  },
];

// Regular (non-featured) projects
const regularProjects: ProjectData[] = [
  {
    title: "MedSafe",
    status: "Prototype Ready",
    statusType: "active",
    priority: 5,
    description:
      "MedSafe is an AI-powered medication safety and verification platform designed to combat counterfeit medicines and prevent dangerous drug interactions. It enables patients, pharmacists, and healthcare providers to verify medication authenticity, analyze interaction risks, and access real-time safety intelligence.",
    tags: ["AI", "OCR", "Drug Databases", "Web Platform", "Healthcare"],
    techStack: [
      "Frontend: React 18, TypeScript, TailwindCSS",
      "UI: shadcn/ui, Recharts",
      "Backend: PostgreSQL with RLS, Edge Functions",
      "AI: Google Gemini 2.0 Flash",
      "OCR: Tesseract.js",
      "Auth: Email, Google OAuth, Phone OTP",
    ],
    liveUrl: "https://med-safe-1.lovable.app",
  },
  {
    title: "CodeChicks",
    status: "Live",
    statusType: "active",
    priority: 6,
    description:
      "A full-stack developer productivity platform centered on real-time collaboration and community engagement. Features a polling-powered global chat system for seamless developer communication, a persistent floating timer widget for focus sessions, personalized dashboards with analytics, and multi-provider OAuth (Google & GitHub).",
    tags: [
      "Real-Time Chat",
      "Polling",
      "OAuth",
      "Community Platform",
      "Glassmorphism",
    ],
    techStack: [
      "Backend: Python, FastAPI, Beanie (MongoDB ODM)",
      "Real-Time: Polling",
      "Auth: Authlib, Python-Jose (JWT), Passlib",
      "Frontend: HTML5, CSS3 (Vanilla), Vanilla JavaScript",
      "Database: MongoDB Atlas (Motor/Beanie)",
      "Deployment: Vercel (Serverless), Netlify",
    ],
    liveUrl: "https://codechicks.vercel.app",
  },
  {
    title: "Notes API",
    status: "Complete",
    statusType: "complete",
    priority: 7,
    description:
      "RESTful Notes API built with Node.js and Express. Provides endpoints for creating, reading, updating, and deleting notes with MongoDB persistence. Demonstrates backend API development best practices including proper error handling, validation, and database integration.",
    tags: ["REST API", "Backend", "Node.js", "MongoDB", "Express.js"],
    techStack: [
      "Runtime: Node.js",
      "Framework: Express.js",
      "Database: MongoDB",
      "HTTP Requests: Axios/Fetch",
    ],
    githubUrl: "https://github.com/Keshav76315/notes-api",
  },
];

// Experimental Models (secondary subsection)
const experimentalProjects: ProjectData[] = [
  {
    title: "TensorFlow Multi-Model AI Suite",
    status: "Active Development",
    statusType: "development",
    priority: 10,
    description:
      "A continuously expanding library of production-ready machine learning models spanning Computer Vision, NLP, and Predictive Analytics. Features diverse implementations from CNNs and BiLSTMs to advanced Unsupervised Learning algorithms.",
    tags: [
      "TensorFlow",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "Unsupervised Learning",
    ],
    techStack: [
      "Core: TensorFlow 2.x, Keras, Scikit-learn",
      "Architectures: CNN, BiLSTM, RNN, Autoencoders",
      "Techniques: Transfer Learning, Tokenization, Clustering (PCA/t-SNE)",
      "Processing: Pandas, OpenCV, NumPy",
    ],
    githubUrl: "https://github.com/Keshav76315/ML-models",
  },
];

// ─────────────────────────────────────
// SKILLS DATA
// ─────────────────────────────────────

const frontendSkills = [
  "React / Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Shadcn UI",
  "HTML5 / CSS3",
];

const backendSkills = [
  "Node.js (Express)",
  "Python (FastAPI / Flask)",
  "Go (Golang)",
  "MongoDB",
  "PostgreSQL",
  "REST / GraphQL APIs",
  "Auth (JWT / OAuth)",
];

const toolsSkills = [
  "Git & GitHub",
  "Docker",
  "AWS",
  "Postman",
  "Prometheus & Grafana",
  "Vercel / Netlify",
  "Linux / WSL",
  "Google Colab",
];

const aimlSkills = [
  "TensorFlow / Keras",
  "Scikit-learn / ONNX",
  "OpenCV",
  "NLP (BiLSTM / Transformers)",
  "Generative AI (LLMs)",
  "Data Analysis (Pandas/NumPy)",
];

const architectureSkills = [
  "GstarCAD",
  "SketchUp",
  "Working Drawings",
  "Construction Documentation",
  "Site Inspection",
];

const designSkills = [
  "Graphic Design",
  "UI Layouting",
  "Visual Communication",
  "Interior Visualization",
];

// ─────────────────────────────────────
// CERTIFICATIONS DATA
// ─────────────────────────────────────

const certifications = [
  {
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM via Coursera",
    date: "February 2026",
    description:
      "Comprehensive 12-course certificate covering the entire data science lifecycle — Python, SQL, data analysis, machine learning, deep learning, and data visualization with hands-on capstone projects.",
    credentialUrl: "/ds-certificate.pdf",
  },
  {
    title: "IBM AI Engineering Professional Certificate",
    issuer: "IBM via Coursera",
    date: "April 2026",
    description:
      "Rigorous training in architecting and deploying AI solutions, emphasizing deep learning frameworks, model optimization, and scalable MLOps practices for production-ready intelligent systems.",
    credentialUrl: "/AI-eng-certificate.pdf",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services via Coursera",
    date: "March 2026",
    description:
      "Core cloud concepts, AWS services, security, architecture, pricing, and support. Foundational knowledge of compute, storage, networking, and database services.",
    credentialUrl: "/AWS-Certificate.pdf",
  },
  {
    title: "Applied Software Engineering Fundamentals",
    issuer: "IBM via Coursera",
    date: "March 2026",
    description:
      "5-course specialization covering SDLC, Git & GitHub workflows, Linux & shell scripting, Python for AI & data science, and building AI applications with Flask.",
    credentialUrl: "/SEF-certificate.pdf",
  },
];

// ─────────────────────────────────────
// FREELANCE SERVICES DATA
// ─────────────────────────────────────

const availableForServices = [
  "Custom websites & landing pages (React, HTML, CSS, Tailwind)",
  "Full-stack web applications (MERN stack: React, Node.js, Express, MongoDB)",
  "Python automation scripts & data processing tools",
  "API integration & backend development (Node.js, Express)",
  "UI/UX implementation & responsive design",
];

// ─────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────

const Index = () => {
  const allFeatured = [...featuredProjects].sort((a, b) => a.priority - b.priority);
  const allRegular = [...regularProjects].sort((a, b) => a.priority - b.priority);
  const totalProjectCount = allFeatured.length + allRegular.length + experimentalProjects.length;

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
        {/* ═══════════════════════════════ */}
        {/* HERO SECTION */}
        {/* ═══════════════════════════════ */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col justify-center min-h-[60vh] mb-20 mt-10"
        >
          <div className="flex justify-between items-start mb-20">
            <motion.div variants={scaleUp}>
              <span className="text-sm font-mono tracking-widest uppercase text-muted-foreground">
                Portfolio
              </span>
            </motion.div>
            <motion.div variants={scaleUp}>
              <Navigation />
            </motion.div>
          </div>

          <div className="flex flex-col gap-0 select-none">
            {/* First Name */}
            <div className="overflow-hidden">
              <motion.h1
                variants={reveal}
                className="text-[12vw] leading-[0.9] font-black tracking-tighter uppercase text-foreground/90 mix-blend-difference"
              >
                Keshav
              </motion.h1>
            </div>

            {/* Last Name & Subtitle */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div className="overflow-hidden">
                <motion.h1
                  variants={reveal}
                  className="text-[12vw] leading-[0.9] font-black tracking-tighter uppercase text-foreground/10"
                >
                  Ghai
                </motion.h1>
              </div>

              <motion.div
                variants={fadeUp}
                className="md:max-w-md mt-4 md:mt-10 mx-1"
              >
                <p className="text-xl md:text-2xl font-light text-secondary-foreground leading-relaxed">
                  Software Engineer, AI Builder & Technical Designer. <br />
                  <span className="opacity-60">
                    Crafting digital experiences that merge logic with design.
                  </span>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* ═══════════════════════════════ */}
        {/* MAIN SECTIONS */}
        {/* ═══════════════════════════════ */}
        <main className="space-y-16">
          {/* ─────────────────────────── */}
          {/* ABOUT SECTION */}
          {/* ─────────────────────────── */}
          <motion.section
            id="about"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-full"
          >
            <div className="glass-card p-8 lg:p-10">
              <h2 className="section-title mb-6">About</h2>
              <p className="text-secondary-foreground leading-relaxed text-lg max-w-4xl">
                Software engineer with hands-on experience across full-stack development, AI/ML, automation, and technical design workflows. Currently pursuing a BS in Data Science and Applications at IIT Madras while working in real-world technical environments spanning software systems and architectural execution. Strong interest in building scalable products, intelligent systems, and practical automation solutions.
              </p>

              <div className="mt-10">
                <h3 className="section-subtitle mb-5">Current Focus</h3>
                <ul className="flex flex-wrap gap-4 text-secondary-foreground">
                  <li className="flex items-center gap-3 bg-secondary/30 px-4 py-2 rounded-lg border border-border/50">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Delivering high-quality freelance projects
                  </li>
                  <li className="flex items-center gap-3 bg-secondary/30 px-4 py-2 rounded-lg border border-border/50">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Building SaaS products
                  </li>
                  <li className="flex items-center gap-3 bg-secondary/30 px-4 py-2 rounded-lg border border-border/50">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Integrating AI into web workflows
                  </li>
                  <li className="flex items-center gap-3 bg-secondary/30 px-4 py-2 rounded-lg border border-border/50">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Technical design & architectural execution
                  </li>
                  <li className="flex items-center gap-3 bg-secondary/30 px-4 py-2 rounded-lg border border-border/50">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Advanced Data Structures & System Design
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* ─────────────────────────── */}
          {/* PROJECTS SECTION */}
          {/* ─────────────────────────── */}
          <motion.section
            id="projects"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="w-full"
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <motion.h2
                  variants={fadeUp}
                  className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground/10 leading-none"
                >
                  My
                </motion.h2>
                <motion.h2
                  variants={fadeUp}
                  className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground leading-none"
                >
                  Projects
                </motion.h2>
                <motion.div
                  variants={fadeUp}
                  className="w-24 h-2 bg-accent mt-6"
                />
              </div>
              <motion.span
                variants={fadeUp}
                className="text-sm text-muted-foreground mono hidden md:block"
              >
                {totalProjectCount} Projects
              </motion.span>
            </div>

            {/* Featured Projects */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {allFeatured.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeUp}
                  className={project.featured ? "md:col-span-2" : ""}
                >
                  <div className="relative group">
                    <span className="absolute -top-8 -left-2 text-7xl font-black text-foreground/5 pointer-events-none select-none z-0 hidden md:block">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <ProjectCard {...project} />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Regular Projects */}
            {allRegular.length > 0 && (
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"
              >
                {allRegular.map((project, index) => (
                  <motion.div
                    key={project.title}
                    variants={fadeUp}
                  >
                    <div className="relative group">
                      <span className="absolute -top-8 -left-2 text-7xl font-black text-foreground/5 pointer-events-none select-none z-0 hidden md:block">
                        {(allFeatured.length + index + 1).toString().padStart(2, "0")}
                      </span>
                      <ProjectCard {...project} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Experimental Models Subsection */}
            {experimentalProjects.length > 0 && (
              <motion.div
                variants={fadeUp}
                className="mt-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Beaker className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    Experimental Models
                  </h3>
                  <div className="flex-1 h-px bg-border/30" />
                </div>
                <div className="grid grid-cols-1 gap-5">
                  {experimentalProjects.map((project) => (
                    <motion.div key={project.title} variants={fadeUp}>
                      <div className="experimental-card p-5 lg:p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-semibold">{project.title}</h4>
                          </div>
                          <span className="status-badge bg-primary/20 text-primary text-xs">
                            {project.status}
                          </span>
                        </div>
                        <p className="text-sm text-secondary-foreground leading-relaxed mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.map((tag, idx) => (
                            <span key={idx} className="skill-tag text-xs px-2 py-1">
                              {tag}
                            </span>
                          ))}
                        </div>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-ghost text-xs"
                          >
                            <Github className="w-3.5 h-3.5" />
                            View Source Code
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.section>

          {/* ─────────────────────────── */}
          {/* PROFESSIONAL EXPERIENCE */}
          {/* ─────────────────────────── */}
          <motion.section
            id="experience"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="w-full"
          >
            <div className="flex items-end justify-between mb-10">
              <div>
                <motion.h2
                  variants={fadeUp}
                  className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground/10 leading-none"
                >
                  Professional
                </motion.h2>
                <motion.h2
                  variants={fadeUp}
                  className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground leading-none"
                >
                  Experience
                </motion.h2>
                <motion.div
                  variants={fadeUp}
                  className="w-24 h-2 bg-accent mt-6"
                />
              </div>
              <motion.span
                variants={fadeUp}
                className="text-sm text-muted-foreground mono hidden md:block"
              >
                3 Roles
              </motion.span>
            </div>

            <motion.div
              variants={staggerContainer}
              className="space-y-8"
            >
              <ExperienceCard
                company="Studio Eclecea"
                role="Architectural Intern"
                period="Apr 2026 – Present"
                status="active"
                statusLabel="Active"
                description="Working on residential and interior design projects involving architectural drafting and execution-level detailing. Responsible for floor plans, electrical/plumbing/sanitary layouts, furniture detailing, front elevations, and site inspection reporting while collaborating directly on design refinements."
                responsibilities={[
                  "Floor Plans",
                  "Working Drawings",
                  "Electrical Layouts",
                  "Plumbing Layouts",
                  "Sanitary Detailing",
                  "Furniture Elevations",
                  "Front Elevations",
                  "Interior Planning",
                  "Site Inspections",
                ]}
                tools={[
                  "GstarCAD",
                  "SketchUp",
                  "Construction Documentation",
                  "Working Drawings",
                  "Site Coordination",
                ]}
                isFirst
              />

              <ExperienceCard
                company="Green LeafX"
                role="Freelance Full-Stack Developer"
                period="Client Project"
                status="client"
                statusLabel="Client Work"
                description="Built a comprehensive educational platform dedicated to promoting sustainability and eco-conscious living. Full-stack freelance web application serving as a central hub for environmental education, aggregating content from various sources to provide a seamless learning experience with automated video feeds, structured course modules, and community notes."
                responsibilities={[
                  "End-to-end Full Stack Development",
                  "Cloud Production Migration",
                  "API Optimization",
                  "Eco-Brand UI/UX Design",
                ]}
                tools={[
                  "Python",
                  "Flask",
                  "Jinja2",
                  "SQLite",
                  "HTML5",
                  "CSS3",
                  "JavaScript",
                  "YouTube Data API v3",
                  "PythonAnywhere",
                ]}
              />

              <ExperienceCard
                company="Unified Mentor"
                role="Applied Machine Learning Trainee"
                period="2025"
                status="completed"
                statusLabel="Completed"
                description="Completed a structured applied machine learning training program covering supervised and unsupervised learning, model evaluation, and real-world dataset analysis. Built and evaluated multiple ML models across classification, regression, and clustering tasks."
                tools={[
                  "Python",
                  "Scikit-learn",
                  "Pandas",
                  "NumPy",
                  "Matplotlib",
                ]}
                isLast
              />
            </motion.div>
          </motion.section>

          {/* ─────────────────────────── */}
          {/* FREELANCE SECTION */}
          {/* ─────────────────────────── */}
          <motion.section
            id="freelance"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-full"
          >
            <div className="glass-card p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-5 h-5 text-accent" />
                <h2 className="section-title">Available for Freelance</h2>
              </div>
              <p className="text-secondary-foreground mb-6 text-lg max-w-3xl">
                I take on freelance projects ranging from landing pages to full-stack applications. Here's what I can help with:
              </p>
              <ul className="space-y-3 text-secondary-foreground mb-6">
                {availableForServices.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-0.5">✓</span>
                    {service}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground border-t border-border/50 pt-4">
                <strong className="text-foreground">
                  Typical project turnaround:
                </strong>{" "}
                3–7 days for small scopes | Flexible rates for quick
                turnarounds
              </p>
            </div>
          </motion.section>

          {/* ─────────────────────────── */}
          {/* CERTIFICATIONS SECTION */}
          {/* ─────────────────────────── */}
          <motion.section
            id="certifications"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title">Certifications</h2>
              <motion.span
                variants={fadeUp}
                className="text-sm text-muted-foreground mono hidden md:block"
              >
                {certifications.length}{" "}
                {certifications.length === 1 ? "Certificate" : "Certificates"}
              </motion.span>
            </div>

            <div className="space-y-3">
              {certifications.map((cert) => (
                <CertificationCard key={cert.title} {...cert} />
              ))}
            </div>
          </motion.section>

          {/* ─────────────────────────── */}
          {/* SKILLS SECTION */}
          {/* ─────────────────────────── */}
          <motion.section
            id="skills"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="w-full"
          >
            <div className="glass-card p-8 lg:p-10">
              <motion.h2 variants={fadeUp} className="section-title mb-6">
                Skills & Tech
              </motion.h2>

              <div className="space-y-6">
                {/* Frontend */}
                <div>
                  <motion.h3
                    variants={fadeUp}
                    className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3"
                  >
                    Frontend
                  </motion.h3>
                  <motion.div
                    variants={staggerContainer}
                    className="flex flex-wrap gap-3"
                  >
                    {frontendSkills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={scaleUp}
                        whileHover={{ scale: 1.1 }}
                        className="skill-tag text-base px-4 py-2"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Backend */}
                <div>
                  <motion.h3
                    variants={fadeUp}
                    className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3"
                  >
                    Backend
                  </motion.h3>
                  <motion.div
                    variants={staggerContainer}
                    className="flex flex-wrap gap-3"
                  >
                    {backendSkills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={scaleUp}
                        whileHover={{ scale: 1.1 }}
                        className="skill-tag text-base px-4 py-2"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Tools & Languages */}
                <div>
                  <motion.h3
                    variants={fadeUp}
                    className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3"
                  >
                    Tools & Languages
                  </motion.h3>
                  <motion.div
                    variants={staggerContainer}
                    className="flex flex-wrap gap-3"
                  >
                    {toolsSkills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={scaleUp}
                        whileHover={{ scale: 1.1 }}
                        className="skill-tag text-base px-4 py-2"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* AI / ML */}
                <div>
                  <motion.h3
                    variants={fadeUp}
                    className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3"
                  >
                    AI / ML
                  </motion.h3>
                  <motion.div
                    variants={staggerContainer}
                    className="flex flex-wrap gap-3"
                  >
                    {aimlSkills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={scaleUp}
                        whileHover={{ scale: 1.1 }}
                        className="skill-tag text-base px-4 py-2"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Architecture & Drafting */}
                <div>
                  <motion.h3
                    variants={fadeUp}
                    className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3"
                  >
                    Architecture & Drafting
                  </motion.h3>
                  <motion.div
                    variants={staggerContainer}
                    className="flex flex-wrap gap-3"
                  >
                    {architectureSkills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={scaleUp}
                        whileHover={{ scale: 1.1 }}
                        className="skill-tag text-base px-4 py-2"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                {/* Design & Visualization */}
                <div>
                  <motion.h3
                    variants={fadeUp}
                    className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3"
                  >
                    Design & Visualization
                  </motion.h3>
                  <motion.div
                    variants={staggerContainer}
                    className="flex flex-wrap gap-3"
                  >
                    {designSkills.map((skill) => (
                      <motion.span
                        key={skill}
                        variants={scaleUp}
                        whileHover={{ scale: 1.1 }}
                        className="skill-tag text-base px-4 py-2"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* ─────────────────────────── */}
          {/* RESUME DOWNLOAD */}
          {/* ─────────────────────────── */}
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-full"
          >
            <div className="glass-card p-8 lg:p-10 text-center">
              <h2 className="section-title mb-4">Want to know more?</h2>
              <p className="text-secondary-foreground mb-6 max-w-2xl mx-auto">
                Download my resume for a detailed overview of my education,
                experience, and skills.
              </p>
              <motion.a
                href="/resume_v2.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex text-lg px-8 py-3"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </motion.a>
            </div>
          </motion.section>

          {/* ─────────────────────────── */}
          {/* CONTACT SECTION */}
          {/* ─────────────────────────── */}
          <motion.section
            id="contact"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-full"
          >
            <div className="glass-card p-8 lg:p-10">
              <h2 className="section-title mb-4">Get in Touch</h2>
              <p className="text-secondary-foreground mb-8 text-lg">
                I'm open to internships, freelancing, and collaborations.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <motion.a
                  href="mailto:ghaikeshav55@gmail.com"
                  className="btn-primary"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <Mail className="w-4 h-4" />
                  ghaikeshav55@gmail.com
                </motion.a>
                <motion.a
                  href="tel:+917657805107"
                  className="btn-ghost"
                  whileHover={{ scale: 1.05, x: 5 }}
                >
                  <Phone className="w-4 h-4" />
                  +91 76578 05107
                </motion.a>
              </div>

              <div className="flex items-center gap-4">
                <motion.a
                  href="https://github.com/keshav76315"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  whileHover={{
                    scale: 1.1,
                    rotate: 10,
                    color: "var(--accent)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/keshav-ghai-b584b030a"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                  whileHover={{ scale: 1.1, rotate: -10, color: "#0077b5" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.section>
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Keshav Ghai
        </footer>
      </div>
    </div>
  );
};
export default Index;
