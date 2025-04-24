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
    >
      <h3 className="text-xl font-mono font-bold mb-6 text-primary">
        {category.name}
      </h3>

      {category.skills.map((skill, idx) => (
        <SkillBar 
          key={skill.name} 
          skill={skill}
          delay={idx * 100}
        />
      ))}
    </motion.div>
  );
}
