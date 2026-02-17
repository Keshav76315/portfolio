import { useState } from "react";
import { Mail, Phone, Github, Linkedin, Download, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import FreelanceCard from "@/components/FreelanceCard";
import { motion } from "framer-motion";
import { fadeUp, heroText, staggerContainer, scaleUp, reveal } from "@/lib/animations";

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
  priority: number; // Lower number = higher priority
}

const projects: ProjectData[] = [
  {
    title: "Guidon's Eye",
    status: "Prototype Ready",
    statusType: "active",
    featured: true,
    priority: 1,
    description: "Privacy-first productivity assistant that tracks active applications, provides context-aware nudges, and integrates with a conversational AI backend to boost focus and automation. Built as a lightweight desktop overlay for developers and knowledge workers seeking distraction-free productivity.",
    tags: ["Desktop HUD", "Productivity", "AI Assistant", "Automation", "Privacy-Focused"],
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
    demoPlaceholder: true,
  },
  {
    title: "TensorFlow Multi-Model AI Suite",
    status: "Active Development",
    statusType: "development",
    featured: true,
    priority: 2,
    description: "A continuously expanding library of production-ready machine learning models spanning Computer Vision, Natural Language Processing (NLP), and Predictive Analytics. Designed as a modular experimentation suite, this repository features a diverse range of implementations—from foundational CNNs and BiLSTMs to advanced Unsupervised Learning algorithms. It serves as a practical showcase of AI solutions for real-world challenges in healthcare, content moderation, and automated pattern recognition.",
    tags: ["TensorFlow", "Deep Learning", "Computer Vision", "NLP", "Unsupervised Learning", "AI Research"],
    techStack: [
      "Core: TensorFlow 2.x, Keras, Scikit-learn",
      "Architectures: CNN, BiLSTM, RNN, Autoencoders",
      "Techniques: Transfer Learning, Tokenization, Clustering (PCA/t-SNE)",
      "Processing: Pandas, OpenCV, NumPy",
      "Deployment: Model Serialization (.h5/.keras)",
    ],
    githubUrl: "https://github.com/Keshav76315/ML-models",
  },
  {
    title: "LawBuddy AI",
    status: "Complete",
    statusType: "complete",
    featured: true,
    priority: 3,
    description: "An intelligent legal assistant platform powered by a custom, locally-hosted Large Language Model built via fine-tuning — no external API calls, no cloud dependencies. LawBuddy runs entirely on-device for maximum privacy and data sovereignty, providing real-time legal analysis, AI-assisted document drafting, and full case management through a modern web interface.",
    tags: ["Local LLM", "Ollama", "Legal Tech", "AI Assistant", "Privacy-First", "NLP"],
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
    title: "MedSafe",
    status: "Prototype Ready",
    statusType: "active",
    priority: 4,
    description: "MedSafe is an AI-powered medication safety and verification platform designed to combat counterfeit medicines and prevent dangerous drug interactions. It enables patients, pharmacists, and healthcare providers to verify medication authenticity, analyze interaction risks, and access real-time safety intelligence.",
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
    priority: 5,
    description: "A full-stack developer productivity platform centered on real-time collaboration and community engagement. Features a polling-powered global chat system for seamless developer communication, a persistent floating timer widget for focus sessions, personalized dashboards with analytics, and multi-provider OAuth (Google & GitHub). Styled with a modern Frost/Cyber aesthetic using advanced glassmorphism effects.",
    tags: ["Real-Time Chat", "Polling", "OAuth", "Community Platform", "Glassmorphism"],
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
    priority: 6,
    description: "RESTful Notes API built with Node.js and Express. Provides endpoints for creating, reading, updating, and deleting notes with MongoDB persistence. Demonstrates backend API development best practices including proper error handling, validation, and database integration.",
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
  "MongoDB",
  "PostgreSQL",
  "REST / GraphQL APIs",
  "Auth (JWT / OAuth)",
];

const toolsSkills = [
  "Git & GitHub",
  "Docker",
  "Postman",
  "Vercel / Netlify",
  "Linux / WSL",
  "Google Colab",
];

const aimlSkills = [
  "TensorFlow / Keras",
  "Scikit-learn",
  "OpenCV",
  "NLP (BiLSTM / Transformers)",
  "Generative AI (LLMs)",
  "Data Analysis (Pandas/NumPy)",
];

const availableForServices = [
  "Custom websites & landing pages (React, HTML, CSS, Tailwind)",
  "Full-stack web applications (MERN stack: React, Node.js, Express, MongoDB)",
  "Python automation scripts & data processing tools",
  "API integration & backend development (Node.js, Express)",
  "UI/UX implementation & responsive design",
];

const Index = () => {
  // Sort projects by priority
  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);
  
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
        {/* Header / Hero */}
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col justify-center min-h-[60vh] mb-20 mt-10" // Increased height for impact
        >
           <div className="flex justify-between items-start mb-20">
              <motion.div variants={scaleUp}>
                 {/* Small logo or status could go here */}
                 <span className="text-sm font-mono tracking-widest uppercase text-muted-foreground">Portfolio</span>
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
                      className="text-[12vw] leading-[0.9] font-black tracking-tighter uppercase text-foreground/90 mix-blend-difference"
                  >
                    Ghai
                  </motion.h1>
                </div>
                
                <motion.div variants={fadeUp} className="md:max-w-md mt-4 md:mt-10 mx-1">
                   <p className="text-xl md:text-2xl font-light text-secondary-foreground leading-relaxed">
                      Full Stack Developer & AI Engineer. <br/>
                      <span className="opacity-60">Crafting digital experiences that merge logic with design.</span>
                   </p>
                </motion.div>
             </div>
          </div>
        </motion.header>

        {/* Full-width stacked sections */}
        <main className="space-y-16">
          {/* About Section */}
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
                I am a Full Stack Developer and AI Engineer passionate about building scalable, high-performance web applications. With deep expertise in the MERN stack and Machine Learning, I transform complex requirements into elegant, production-ready solutions. My work bridges the gap between robust engineering and intuitive design, helping businesses and startups launch products that matter.
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
                    Advanced Data Structures & System Design
                  </li>
                  <li className="flex items-center gap-3 bg-secondary/30 px-4 py-2 rounded-lg border border-border/50">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Open Source Contribution
                  </li>
                </ul>
              </div>

              {/* Available For Section */}
              <div className="mt-10 p-6 rounded-xl bg-accent/5 border border-accent/20">
                <h3 className="section-subtitle mb-5 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" />
                  Available For
                </h3>
                <ul className="space-y-3 text-secondary-foreground">
                  {availableForServices.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-accent font-bold mt-0.5">✓</span>
                      {service}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-sm text-muted-foreground border-t border-border/50 pt-4">
                  <strong className="text-foreground">Typical project turnaround:</strong> 3–7 days for small scopes | Flexible rates for quick turnarounds
                </p>
              </div>
            </div>
          </motion.section>

          {/* Projects Section - Responsive Grid */}
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
                <motion.h2 variants={fadeUp} className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground/10 leading-none">
                  Selected
                </motion.h2>
                <motion.h2 variants={fadeUp} className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground leading-none">
                  Works
                </motion.h2>
                <motion.div variants={fadeUp} className="w-24 h-2 bg-accent mt-6" />
              </div>
              <motion.span variants={fadeUp} className="text-sm text-muted-foreground mono hidden md:block">
                {sortedProjects.length} Projects
              </motion.span>
            </div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {sortedProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={fadeUp}
                  className={project.featured ? "md:col-span-2" : ""}
                >
                  <div className="relative group">
                    <span className="absolute -top-8 -left-2 text-7xl font-black text-foreground/5 pointer-events-none select-none z-0 hidden md:block">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <ProjectCard {...project} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          {/* Freelance Section */}
          <motion.section 
            id="freelance" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-full"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title">Freelance Work</h2>
              <p className="text-sm text-muted-foreground">Client projects & collaborations</p>
            </div>

            <div className="space-y-8">
              <motion.div whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                <FreelanceCard
                  clientName="Green LeafX"
                  projectName="Sustainability Education Platform"
                  overview="A comprehensive educational platform dedicated to promoting sustainability and eco-conscious living. Built as a full-stack freelance web application serving as a central hub for environmental education, aggregating content from various sources to provide a seamless learning experience with automated video feeds, structured course modules, and community notes."
                  features={[
                    "Automated Content Aggregation – Integrated YouTube Data API v3 to dynamically fetch, filter, and display educational videos with custom logic for title cleaning and ISO 8601 duration parsing",
                    "Custom Admin Dashboard – Secure, role-based admin panel for managing courses, uploading notes, and viewing real-time platform analytics",
                    "Course Management System – Database-backed architecture supporting multi-level courses (Beginner to Advanced) with rich media and enrollment tracking",
                    "Responsive 'Eco' Design – Custom sustainability-themed UI using modern CSS3 (Glassmorphism, CSS Grid) fully responsive across devices",
                    "Robust Production Backend – Migrated from local to production-ready Flask on PythonAnywhere with SQLite persistence",
                  ]}
                  technologies={[
                    { category: "Backend", items: ["Python", "Flask", "Jinja2"] },
                    { category: "Database", items: ["SQLite"] },
                    { category: "Frontend", items: ["HTML5", "CSS3", "JavaScript"] },
                    { category: "APIs", items: ["YouTube Data API v3"] },
                    { category: "Deployment", items: ["PythonAnywhere"] },
                  ]}
                  responsibilities={[
                    "End-to-end Full Stack Development",
                    "Migrating codebase from local to cloud production",
                    "Optimizing API usage within quota limits",
                    "Designing UI/UX aligned with eco-friendly brand identity",
                  ]}
                  liveUrl="https://greenleafx.pythonanywhere.com"
                  accentColor="green"
                />
              </motion.div>
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section 
            id="skills" 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="w-full"
          >
            <div className="glass-card p-8 lg:p-10">
              <motion.h2 variants={fadeUp} className="section-title mb-6">Skills & Tech</motion.h2>

              <div className="space-y-6">
                <div>
                  <motion.h3 variants={fadeUp} className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Frontend</motion.h3>
                  <motion.div variants={staggerContainer} className="flex flex-wrap gap-3">
                    {frontendSkills.map((skill) => (
                      <motion.span key={skill} variants={scaleUp} whileHover={{ scale: 1.1 }} className="skill-tag text-base px-4 py-2">
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                <div>
                  <motion.h3 variants={fadeUp} className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Backend</motion.h3>
                  <motion.div variants={staggerContainer} className="flex flex-wrap gap-3">
                    {backendSkills.map((skill) => (
                      <motion.span key={skill} variants={scaleUp} whileHover={{ scale: 1.1 }} className="skill-tag text-base px-4 py-2">
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                <div>
                  <motion.h3 variants={fadeUp} className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tools & Languages</motion.h3>
                  <motion.div variants={staggerContainer} className="flex flex-wrap gap-3">
                    {toolsSkills.map((skill) => (
                      <motion.span key={skill} variants={scaleUp} whileHover={{ scale: 1.1 }} className="skill-tag text-base px-4 py-2">
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>

                <div>
                  <motion.h3 variants={fadeUp} className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">AI / ML</motion.h3>
                  <motion.div variants={staggerContainer} className="flex flex-wrap gap-3">
                    {aimlSkills.map((skill) => (
                      <motion.span key={skill} variants={scaleUp} whileHover={{ scale: 1.1 }} className="skill-tag text-base px-4 py-2">
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Resume Download Section */}
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
                Download my resume for a detailed overview of my education, experience, and skills.
              </p>
              <motion.a
                href="/resume.pdf"
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

          {/* Contact Section */}
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
                  whileHover={{ scale: 1.1, rotate: 10, color: "var(--accent)" }}
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
}
export default Index;
