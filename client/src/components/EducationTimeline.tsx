import { motion } from "framer-motion";
import { type Education } from "@/types";

type EducationTimelineProps = {
  educationList: Education[];
};

export default function EducationTimeline({ educationList }: EducationTimelineProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="space-y-8">
        {educationList.map((education, index) => (
          <motion.div
            key={education.degree}
            className="timeline-item flex"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <div className="timeline-dot relative mr-6">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center relative z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 text-background"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
            </div>
            <div className="bg-black/50 border border-primary/20 p-6 rounded-lg flex-1 hover:border-primary/40 transition-all">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <h3 className="text-xl font-mono font-bold text-primary">
                  {education.degree}
                </h3>
                <span className="text-muted-foreground mt-2 md:mt-0 date-format">
                  {education.period}
                </span>
              </div>
              <p className="text-foreground/80 mb-2">{education.institution}</p>
              <p className="text-muted-foreground italic">{education.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
