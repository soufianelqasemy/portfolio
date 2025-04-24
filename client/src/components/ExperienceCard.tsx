import { motion } from "framer-motion";
import { type Experience } from "@/types";

type ExperienceCardProps = {
  experience: Experience;
  index: number;
};

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div
      className="bg-black/20 border border-primary/20 rounded-lg overflow-hidden hover:border-primary/40 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-mono font-bold text-primary">
            {experience.position}
          </h3>
          <span className="text-xs text-muted-foreground bg-primary/20 px-2 py-1 rounded">
            {experience.type}
          </span>
        </div>
        <p className="text-foreground/80 mb-2">{experience.company}</p>
        <p className="text-muted-foreground mb-4">
          {experience.location} • {experience.period}
        </p>
        <p className="text-foreground/80 leading-relaxed">
          {experience.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {experience.skills.map((skill) => (
            <span
              key={skill}
              className="bg-black/40 text-primary/90 text-xs px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
