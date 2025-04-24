import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { type Language } from "@/types";

type LanguageProficiencyProps = {
  languages: Language[];
};

export default function LanguageProficiency({ languages }: LanguageProficiencyProps) {
  return (
    <div className="mt-20 max-w-3xl mx-auto">
      <h3 className="text-xl font-mono font-bold mb-10 text-center">
        <span className="text-primary">&lt;</span>
        Languages
        <span className="text-primary">/&gt;</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {languages.map((language, index) => (
          <motion.div
            key={language.name}
            className="bg-black/30 border border-primary/20 rounded-lg p-6 text-center hover:border-primary/40 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/10 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <div className="flex justify-center items-center mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center glow">
                <Globe className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
              </div>
            </div>
            <h4 className="font-mono font-bold mb-4 text-foreground text-lg">
              {language.name}
            </h4>
            <div className="flex justify-center mb-3">
              <div className="flex space-x-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => {
                    const isActive = i < language.level;
                    return (
                      <motion.span
                        key={i}
                        initial={{ scale: 0.8, opacity: 0.5 }}
                        animate={{ 
                          scale: isActive ? 1 : 0.8, 
                          opacity: isActive ? 1 : 0.5 
                        }}
                        transition={{ 
                          delay: 0.3 + (0.1 * i), 
                          duration: 0.4,
                          type: "spring",
                          stiffness: 200
                        }}
                        className={`w-4 h-4 rounded-full border ${
                          isActive
                            ? "bg-primary border-primary glow"
                            : "bg-transparent border-primary/40"
                        }`}
                      ></motion.span>
                    );
                  })}
              </div>
            </div>
            <p className="mt-2 text-muted-foreground font-medium">
              {language.proficiency}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
