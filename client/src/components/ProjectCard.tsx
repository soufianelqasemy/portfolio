import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { type Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-black/30 rounded-lg overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
    >
      <div className="h-48 overflow-hidden relative group">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="p-4 rounded-full bg-black/80 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <ExternalLink className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-mono font-bold text-primary mb-3 group-hover:text-primary/90 transition-colors">
          {project.title}
        </h3>
        <p className="text-foreground/80 mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-black/50 text-primary/90 text-xs px-3 py-1.5 rounded-full border border-primary/10 hover:border-primary/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
        {/* Project links removed as requested */}
      </div>
    </motion.div>
  );
}
