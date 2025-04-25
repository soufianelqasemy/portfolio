import { motion } from "framer-motion";
import { Code, ArrowRight } from "lucide-react";
import { type Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      className="bg-black/40 backdrop-blur-sm rounded-lg overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
    >
      <div className="h-40 sm:h-48 overflow-hidden relative">
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
          loading="lazy" // Add lazy loading for better performance
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70"></div>
        
        {/* Project icon */}
        <div className="absolute bottom-3 right-3 p-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30">
          <Code className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        </div>
      </div>
      <div className="p-4 sm:p-5 flex-grow flex flex-col">
        <h3 className="text-lg sm:text-xl font-mono font-bold text-primary mb-2 sm:mb-3 transition-colors">
          {project.title}
        </h3>
        <p className="text-foreground/80 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed flex-grow">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-black/50 text-primary/90 text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-primary/10 hover:border-primary/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <Button 
          className="mt-auto w-full bg-primary/20 hover:bg-primary/40 text-primary border border-primary/30"
          asChild
        >
          <Link href={`/project/${project.id}`}>
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
