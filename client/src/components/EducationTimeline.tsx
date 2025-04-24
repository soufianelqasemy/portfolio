import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { type Education } from "@/types";

type EducationTimelineProps = {
  educationList: Education[];
};

export default function EducationTimeline({ educationList }: EducationTimelineProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-10">
        {educationList.map((education, index) => (
          <motion.div
            key={education.degree}
            className="timeline-item flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <div className="timeline-dot relative mr-6">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center relative z-10 shadow-lg shadow-primary/20 glow">
                <GraduationCap className="h-3 w-3 text-background" />
              </div>
            </div>
            <div className="bg-black/30 border border-primary/20 p-6 rounded-lg flex-1 hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 group">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-mono font-bold text-primary group-hover:text-primary/90 transition-colors">
                  {education.degree}
                </h3>
                <span className="text-muted-foreground mt-2 md:mt-0 date-format bg-black/30 px-3 py-1 rounded-full text-sm">
                  {education.period}
                </span>
              </div>
              <p className="text-foreground/90 mb-2 font-medium">{education.institution}</p>
              <p className="text-muted-foreground">{education.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
