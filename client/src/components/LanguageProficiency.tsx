import { motion } from "framer-motion";
import { type Language } from "@/types";

type LanguageProficiencyProps = {
  languages: Language[];
};

export default function LanguageProficiency({ languages }: LanguageProficiencyProps) {
  return (
    <div className="mt-16 max-w-3xl mx-auto">
      <h3 className="text-xl font-mono font-bold mb-8 text-center text-primary">
        Languages
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {languages.map((language, index) => (
          <motion.div
            key={language.name}
            className="bg-black/20 rounded-lg p-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <h4 className="font-mono font-bold mb-3 text-foreground">
              {language.name}
            </h4>
            <div className="flex justify-center">
              <div className="flex space-x-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      className={`w-4 h-4 rounded-full ${
                        i < language.level
                          ? "bg-primary"
                          : "bg-primary/30"
                      }`}
                    ></span>
                  ))}
              </div>
            </div>
            <p className="mt-2 text-muted-foreground text-sm">
              {language.proficiency}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
