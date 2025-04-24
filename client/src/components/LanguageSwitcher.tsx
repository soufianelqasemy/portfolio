import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const languages = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "ar", label: "العربية" }
  ];

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => setLanguage(lang.code as "en" | "fr" | "ar")}
          className={`px-2 py-1 rounded-md text-sm font-medium transition-all ${
            language === lang.code
              ? "bg-primary text-background"
              : "text-muted-foreground hover:text-foreground"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {lang.label}
        </motion.button>
      ))}
    </div>
  );
}