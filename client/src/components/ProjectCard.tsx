import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { type Project } from "@/types";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-black/30 rounded-lg overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
    >
      <div className="h-48 overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            // Fallback to a solid color if image fails to load
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect width="400" height="300" fill="%230f172a" /><text x="50%" y="50%" font-family="Arial" font-size="24" fill="%2310b981" text-anchor="middle">Project Image</text></svg>';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
        
        {/* Project icon */}
        <div className="absolute bottom-4 right-4 p-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
          <Code className="h-5 w-5 text-primary" />
        </div>
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 className="text-xl font-mono font-bold text-primary mb-3 transition-colors">
          {project.title}
        </h3>
        <p className="text-foreground/80 mb-4 leading-relaxed flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-black/50 text-primary/90 text-xs px-3 py-1.5 rounded-full border border-primary/10 hover:border-primary/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
