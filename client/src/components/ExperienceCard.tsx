import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { type Experience } from "@/types";

type ExperienceCardProps = {
  experience: Experience;
  index: number;
};

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div
      className="bg-black/30 border border-primary/20 rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-mono font-bold text-primary group-hover:text-primary/90 transition-colors">
            {experience.position}
          </h3>
          <span className="text-xs text-foreground bg-primary/20 px-2 py-1 rounded-full font-mono">
            {experience.type}
          </span>
        </div>
        <p className="text-foreground/90 mb-2 font-medium">
          {experience.companyUrl ? (
            <a 
              href={experience.companyUrl} 
              className="text-primary hover:text-secondary flex items-center w-fit transition-colors" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {experience.company}
              <ExternalLink className="ml-1 h-3 w-3 opacity-70" />
            </a>
          ) : (
            experience.company
          )}
        </p>
        <p className="text-muted-foreground mb-4 text-sm">
          <span className="inline-block">{experience.location}</span> • <span className="date-format inline-block">{experience.period}</span>
        </p>
        <p className="text-foreground/80 leading-relaxed">
          {experience.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="bg-black/50 text-primary/90 text-xs px-3 py-1.5 rounded-full border border-primary/10 hover:border-primary/30 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
