import { motion } from "framer-motion";
import { type Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-black/50 rounded-lg overflow-hidden border border-primary/20 hover:border-primary/40 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-mono font-bold text-primary mb-3">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-black/40 text-primary/90 text-xs px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href="#projects"
          className="text-primary hover:text-primary/80 font-semibold text-sm flex items-center transition-colors"
        >
          View Project <span className="ml-2 text-xs">→</span>
        </a>
      </div>
    </motion.div>
  );
}
