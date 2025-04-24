import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

type Language = "en" | "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const defaultContext: LanguageContextType = {
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

// Hook for easy access to the language context
export function useLanguage() {
  return useContext(LanguageContext);
}

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Try to get language from localStorage, default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    return (savedLanguage as Language) || "en";
  });
  
  // Import translations dynamically
  const [translations, setTranslations] = useState<Record<string, string>>({});

  useEffect(() => {
    // Save to localStorage when language changes
    localStorage.setItem("selectedLanguage", language);
    
    // Load translation file based on selected language
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../translations/${language}.ts`);
        setTranslations(translationModule.default);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        setTranslations({});
      }
    };
    
    loadTranslations();
    
    // Set document direction for RTL languages
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    
    // Add a class to the body to style RTL content
    if (language === "ar") {
      document.body.classList.add("rtl");
    } else {
      document.body.classList.remove("rtl");
    }
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};