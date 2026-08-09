import React from "react";

interface CapabilityCategory {
  title: string;
  subtitle: string;
  skills: string[];
}

const capabilities: CapabilityCategory[] = [
  {
    title: "Systems & Full-Stack Engineering",
    subtitle: "End-to-End Application Architecture",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "Python (FastAPI / Flask)",
      "Go (Golang)",
      "MongoDB",
      "PostgreSQL",
      "RESTful APIs",
      "OAuth 2.0 / JWT Authentication",
      "Tailwind CSS",
      "Electron Desktop",
    ],
  },
  {
    title: "Artificial Intelligence & ML",
    subtitle: "Model Training & Inference Pipelines",
    skills: [
      "TensorFlow 2.x / Keras",
      "Scikit-Learn",
      "ONNX Runtime",
      "OpenCV Computer Vision",
      "Custom Local LLM Fine-Tuning (Ollama Modelfile)",
      "NLP (BiLSTM / Tokenization)",
      "Anomaly Detection (Isolation Forest, SVM)",
      "Pandas / NumPy / Data Pipelines",
    ],
  },
  {
    title: "DevOps & Infrastructure",
    subtitle: "Tooling & Deployment Workflows",
    skills: [
      "Docker & Containerization",
      "AWS Cloud Essentials",
      "Git & GitHub Workflows",
      "Prometheus & Grafana Monitoring",
      "Linux / Shell Scripting",
      "Vercel & Netlify Deployment",
      "Winston Structured Logging",
    ],
  },
  {
    title: "Architectural Execution & Drafting",
    subtitle: "Physical Space & Construction Documentation",
    skills: [
      "GstarCAD",
      "SketchUp 3D",
      "Working Drawings & Construction Documentation",
      "Floor Plans & Section Detailing",
      "Electrical, Plumbing & Sanitary Layouts",
      "Site Inspection & Coordination",
    ],
  },
];

export const CapabilitiesGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {capabilities.map((cat, index) => (
        <div
          key={cat.title}
          className="border border-[#C9C6BE] bg-[#FFFFFF] p-6 sm:p-8 space-y-4 hover:border-[#2457FF] transition-colors"
        >
          <div className="border-b border-[#C9C6BE]/60 pb-3">
            <span className="font-mono text-[11px] text-[#2457FF] uppercase tracking-widest font-semibold block">
              [CAPABILITY 0{index + 1}]
            </span>
            <h4 className="font-sans font-bold text-xl text-[#111111] mt-1">
              {cat.title}
            </h4>
            <p className="font-mono text-xs text-[#5F5D58] mt-0.5">
              {cat.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {cat.skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs text-[#111111] bg-[#F3F1EC] border border-[#C9C6BE]/60 px-3 py-1.5"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CapabilitiesGrid;
