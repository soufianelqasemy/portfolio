import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-transparent hover:bg-primary/10 text-primary border border-primary w-10 h-10"
          aria-label="Change language"
        >
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/90 border-primary/20">
        <DropdownMenuItem
          className={`${
            language === "en" ? "bg-primary/20 text-primary" : "text-foreground hover:text-primary"
          } cursor-pointer transition-colors`}
          onClick={() => setLanguage("en")}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${
            language === "fr" ? "bg-primary/20 text-primary" : "text-foreground hover:text-primary"
          } cursor-pointer transition-colors`}
          onClick={() => setLanguage("fr")}
        >
          Français
        </DropdownMenuItem>
        <DropdownMenuItem
          className={`${
            language === "ar" ? "bg-primary/20 text-primary" : "text-foreground hover:text-primary"
          } cursor-pointer transition-colors`}
          onClick={() => setLanguage("ar")}
        >
          العربية
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}