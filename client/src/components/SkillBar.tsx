import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { type Skill } from "@/types";

type SkillBarProps = {
  skill: Skill;
  delay?: number;
};

export default function SkillBar({ skill, delay = 0 }: SkillBarProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => {
        setValue(skill.level);
      }, delay);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [isInView, skill.level, delay]);

  return (
    <div ref={ref} className="mb-3 md:mb-4">
      <Progress 
        value={value} 
        indicator={skill.name} 
        className="h-6 md:h-8 touch-target" 
      />
    </div>
  );
}
