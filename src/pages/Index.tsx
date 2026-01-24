import { Mail, Phone, Github, Linkedin, Download, CheckCircle } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";

const frontendSkills = [
  "HTML5 / CSS3",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Bootstrap",
];

const backendSkills = [
  "Node.js",
  "Express.js",
  "MongoDB",
  "REST APIs",
  "JWT Authentication",
];

const toolsSkills = [
  "Python",
  "C++",
  "SQL",
  "Git & GitHub",
  "Google Colab",
];

const aimlSkills = [
  "Data Structures",
  "AI / Machine Learning",
];

const availableForServices = [
  "Custom websites & landing pages (React, HTML, CSS, Tailwind)",
  "Full-stack web applications (MERN stack: React, Node.js, Express, MongoDB)",
  "Python automation scripts & data processing tools",
  "API integration & backend development (Node.js, Express)",
  "UI/UX implementation & responsive design",
];

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
        {/* Header */}
        <header className="flex items-center justify-between mb-20 animate-fade-in">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              Keshav Ghai
            </h1>
            <p className="mt-2 text-lg text-secondary-foreground">
              MERN Developer & Aspiring AI Engineer | Available for Freelance Projects
            </p>
          </div>
          <Navigation />
        </header>

        {/* Full-width stacked sections */}
        <main className="space-y-16">
          {/* About Section */}
          <section id="about" className="w-full animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="glass-card p-8 lg:p-10">
              <h2 className="section-title mb-6">About</h2>
              <p className="text-secondary-foreground leading-relaxed text-lg max-w-4xl">
                B.Tech Computer Science Engineering (AI/ML Specialization) student at
                NxtWave Institute of Advanced Technologies with a strong foundation in
                frontend web development, data structures, and system design. Experienced
                in building responsive web applications using modern JavaScript frameworks,
                with a growing focus on AI/ML and automation.
              </p>

              <div className="mt-10">
                <h3 className="section-subtitle mb-5">Current Focus</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-secondary-foreground">
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Frontend web development (React, modern CSS)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Data Structures & Algorithms
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    System design fundamentals
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    AI / Machine Learning exploration
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    Leadership & technical community building
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
          </section>

          {/* Projects Section */}
          <section id="projects" className="w-full animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center justify-between mb-8">
              <h2 className="section-title">Projects</h2>
              <p className="text-sm text-muted-foreground">Real projects, real code</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProjectCard
                title="MedSafe"
                status="Prototype Ready"
                statusType="active"
                featured
                description="MedSafe is an AI-powered medication safety and verification platform designed to combat counterfeit medicines and prevent dangerous drug interactions. It enables patients, pharmacists, and healthcare providers to verify medication authenticity, analyze interaction risks, and access real-time safety intelligence."
                tags={["AI", "OCR", "Drug Databases", "Web Platform", "Healthcare"]}
                techStack={[
                  "Frontend: React 18, TypeScript, TailwindCSS",
                  "UI: shadcn/ui, Recharts",
                  "Backend: PostgreSQL with RLS, Edge Functions",
                  "AI: Google Gemini 2.0 Flash",
                  "OCR: Tesseract.js",
                  "Auth: Email, Google OAuth, Phone OTP",
                ]}
                liveUrl="https://med-safe-1.lovable.app"
              />

              <ProjectCard
                title="Guidon's Eye"
                status="Prototype Ready"
                statusType="active"
                description="Privacy-first productivity assistant that tracks active applications, provides context-aware nudges, and integrates with a conversational AI backend to boost focus and automation. Built as a lightweight desktop overlay for developers and knowledge workers seeking distraction-free productivity."
                tags={["Desktop HUD", "Productivity", "AI Assistant", "Automation", "Privacy-Focused"]}
                techStack={[
                  "Runtime: Electron (Chromium + Node.js)",
                  "Frontend: Vanilla HTML/CSS/JavaScript",
                  "Backend: Node.js (Main Process)",
                  "Database: MongoDB (Local Instance)",
                  "AI APIs: Google Gemini, Perplexity Sonar",
                  "HTTP Client: Axios with Circuit Breaker",
                  "Logging: Winston (JSON format)",
                ]}
                githubUrl="https://github.com/Keshav76315/guidons-eye"
                demoPlaceholder
              />

              <ProjectCard
                title="Notes API"
                status="Complete"
                statusType="complete"
                description="RESTful Notes API built with Node.js and Express. Provides endpoints for creating, reading, updating, and deleting notes with MongoDB persistence. Demonstrates backend API development best practices including proper error handling, validation, and database integration."
                tags={["REST API", "Backend", "Node.js", "MongoDB", "Express.js"]}
                techStack={[
                  "Runtime: Node.js",
                  "Framework: Express.js",
                  "Database: MongoDB",
                  "HTTP Requests: Axios/Fetch",
                ]}
                githubUrl="https://github.com/Keshav76315/notes-api"
              />
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="w-full animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="glass-card p-8 lg:p-10">
              <h2 className="section-title mb-6">Skills & Tech</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Frontend</h3>
                  <div className="flex flex-wrap gap-3">
                    {frontendSkills.map((skill) => (
                      <span key={skill} className="skill-tag text-base px-4 py-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Backend</h3>
                  <div className="flex flex-wrap gap-3">
                    {backendSkills.map((skill) => (
                      <span key={skill} className="skill-tag text-base px-4 py-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tools & Languages</h3>
                  <div className="flex flex-wrap gap-3">
                    {toolsSkills.map((skill) => (
                      <span key={skill} className="skill-tag text-base px-4 py-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">AI / ML</h3>
                  <div className="flex flex-wrap gap-3">
                    {aimlSkills.map((skill) => (
                      <span key={skill} className="skill-tag text-base px-4 py-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Resume Download Section */}
          <section className="w-full animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="glass-card p-8 lg:p-10 text-center">
              <h2 className="section-title mb-4">Want to know more?</h2>
              <p className="text-secondary-foreground mb-6 max-w-2xl mx-auto">
                Download my resume for a detailed overview of my education, experience, and skills.
              </p>
              <a
                href="/resume.pdf"
                download
                className="btn-primary inline-flex text-lg px-8 py-3"
              >
                <Download className="w-5 h-5" />
                Download Resume
              </a>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="w-full animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <div className="glass-card p-8 lg:p-10">
              <h2 className="section-title mb-4">Get in Touch</h2>
              <p className="text-secondary-foreground mb-8 text-lg">
                I'm open to internships, freelancing, and collaborations.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href="mailto:ghaikeshav55@gmail.com"
                  className="btn-primary"
                >
                  <Mail className="w-4 h-4" />
                  ghaikeshav55@gmail.com
                </a>
                <a href="tel:+917657805107" className="btn-ghost">
                  <Phone className="w-4 h-4" />
                  +91 76578 05107
                </a>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/keshav76315"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/keshav-ghai-b584b030a"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </section>
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
