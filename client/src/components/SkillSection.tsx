import { motion } from "framer-motion";
import SkillBar from "@/components/SkillBar";
import { type SkillCategory } from "@/types";

type SkillSectionProps = {
  category: SkillCategory;
  index: number;
};

export default function SkillSection({ category, index }: SkillSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className="bg-black/40 backdrop-blur-sm rounded-xl border border-primary/10 p-5 md:p-6 shadow-glow-sm"
    >
      <h3 className="text-lg md:text-xl font-mono font-bold mb-4 md:mb-6 text-primary text-center md:text-left">
        {category.name}
      </h3>

      <div className="space-y-3 md:space-y-4">
        {category.skills.map((skill, idx) => (
          <SkillBar 
            key={skill.name} 
            skill={skill}
            delay={idx * 100}
          />
        ))}
      </div>
    </motion.div>
  );
}
