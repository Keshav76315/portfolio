import { useRef } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import ProjectCard from "./ProjectCard";

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
}

const HorizontalScrollCarousel = ({ projects }: { projects: ProjectData[] }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} id="projects" className="relative h-[300vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8 px-10">
          <div className="flex flex-col justify-center min-w-[30vw] md:min-w-[20vw] lg:min-w-[15vw]">
             <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground/10 mb-4">
                Selected
             </h2>
             <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground">
                Works
             </h2>
             {/* Decorative line */}
             <div className="w-24 h-2 bg-accent mt-6" />
          </div>
          
          {projects.map((project, index) => (
            <div key={index} className="relative w-[85vw] md:w-[60vw] lg:w-[40vw] flex-shrink-0">
               <div className="h-full transform transition-transform duration-500 hover:scale-[1.02]">
                  <ProjectCard {...project} />
               </div>
               {/* Large Index Number */}
               <span className="absolute -top-20 -left-10 text-[10rem] font-bold text-foreground/5 pointer-events-none select-none z-0">
                  {(index + 1).toString().padStart(2, '0')}
               </span>
            </div>
          ))}
          
           {/* "See All" Call to action at the end */}
           <div className="flex flex-col justify-center items-center min-w-[30vw] h-full">
              <span className="text-4xl font-bold text-muted-foreground">More to come.</span>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalScrollCarousel;
