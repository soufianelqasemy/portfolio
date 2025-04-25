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
      className="bg-black/40 backdrop-blur-sm border border-primary/20 rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
    >
      <div className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3 md:mb-4">
          <h3 className="text-lg md:text-xl font-mono font-bold text-primary group-hover:text-primary/90 transition-colors">
            {experience.position}
          </h3>
          <span className="text-xs text-foreground bg-primary/20 px-2 py-1 rounded-full font-mono self-start sm:self-auto">
            {experience.type}
          </span>
        </div>
        <p className="text-foreground/90 mb-2 font-medium text-sm md:text-base">
          {experience.companyUrl ? (
            <a 
              href={experience.companyUrl} 
              className="text-primary hover:text-secondary flex items-center w-fit transition-colors touch-target" 
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
        <p className="text-muted-foreground mb-3 md:mb-4 text-xs md:text-sm">
          <span className="inline-block">{experience.location}</span> • <span className="date-format inline-block">{experience.period}</span>
        </p>
        <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
          {experience.description}
        </p>
        <div className="mt-4 md:mt-5 flex flex-wrap gap-2">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="bg-black/50 text-primary/90 text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-full border border-primary/10 hover:border-primary/30 transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
