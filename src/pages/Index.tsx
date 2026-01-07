import { Mail, Phone, Github, Linkedin, Instagram } from "lucide-react";
import ParticleBackground from "@/components/ParticleBackground";
import Navigation from "@/components/Navigation";
import ProjectCard from "@/components/ProjectCard";
import FutureProjectCard from "@/components/FutureProjectCard";

const skills = [
  "HTML5 / CSS3",
  "JavaScript",
  "React",
  "Tailwind CSS",
  "Bootstrap",
  "Python",
  "C++",
  "SQL",
  "Git & GitHub",
  "Google Cloud",
  "Data Structures",
  "AI / Machine Learning",
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
              Computer Science (AI/ML) Student · Frontend & Intelligent Systems
            </p>
            <a
              href="/resume.pdf"
              download
              className="btn-primary mt-4 inline-flex"
            >
              Download Resume
            </a>
          </div>
          <Navigation />
        </header>

        {/* Main Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - About & Skills */}
          <section className="lg:col-span-5 space-y-12">
            {/* About */}
            <div id="about" className="glass-card p-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <h2 className="section-title mb-5">About</h2>
              <p className="text-secondary-foreground leading-relaxed">
                B.Tech Computer Science Engineering (AI/ML Specialization) student at
                NxtWave Institute of Advanced Technologies with a strong foundation in
                frontend web development, data structures, and system design. Experienced
                in building responsive web applications using modern JavaScript frameworks,
                with a growing focus on AI/ML and automation.
              </p>

              <div className="mt-8">
                <h3 className="section-subtitle mb-4">Current Focus</h3>
                <ul className="space-y-2 text-secondary-foreground">
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Frontend web development (React, modern CSS)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Data Structures & Algorithms
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    System design fundamentals
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    AI / Machine Learning exploration
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    Leadership & technical community building
                  </li>
                </ul>
              </div>
            </div>

            {/* Skills */}
            <div id="skills" className="glass-card p-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h3 className="section-title mb-5">Skills & Tech</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Right Column - Projects */}
          <section id="projects" className="lg:col-span-7 space-y-10">
            <div className="flex items-center justify-between mb-2 animate-fade-in" style={{ animationDelay: "0.15s" }}>
              <h2 className="section-title">Projects</h2>
              <p className="text-sm text-muted-foreground">A selection — more to come</p>
            </div>

            <div className="space-y-8">
              <div className="animate-fade-in" style={{ animationDelay: "0.25s" }}>
                <ProjectCard
                  title="MedSafe"
                  status="Prototype Ready"
                  statusType="active"
                  featured
                  description="MedSafe is an AI-powered medication safety and verification platform designed to combat counterfeit medicines and prevent dangerous drug interactions. It enables patients, pharmacists, and healthcare providers to verify medication authenticity, analyze interaction risks, and access real-time safety intelligence."
                  tags={["AI", "OCR", "Drug Databases", "Web Platform", "Healthcare"]}
                  liveUrl="https://med-safe-1.lovable.app"
                />
              </div>

              <div className="animate-fade-in" style={{ animationDelay: "0.35s" }}>
                <ProjectCard
                  title="LiveGPT"
                  status="In Development"
                  statusType="development"
                  description="LiveGPT is a productivity assistant and HUD that tracks active apps, surfaces context-aware nudges, and integrates with a conversational backend to give quick insights. Intended as a lightweight overlay to boost focus and automation."
                  tags={["Desktop HUD", "Productivity", "AI Assistant", "Automation"]}
                />
              </div>

              {/* Future Projects */}
              <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: "0.45s" }}>
                {[1, 2, 3, 4].map((i) => (
                  <FutureProjectCard key={i} index={i} />
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Contact Section */}
        <section id="contact" className="mt-20 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <div className="glass-card p-8">
            <h2 className="section-title mb-2">Get in Touch</h2>
            <p className="text-secondary-foreground mb-6">
              I'm open to internships, freelancing, and collaborations.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-6">
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
                href="https://linkedin.com/in/keshav-ghai"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/Kev.exxe"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} Keshav Ghai — Built with ❤️
        </footer>
      </div>
    </div>
  );
};

export default Index;
