import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  Menu, 
  X, 
  ChevronUp, 
  Linkedin, 
  Github, 
  Twitter, 
  Instagram,
  Download,
  Mail,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import cvPdf from "@/assets/cvPdf";

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const currentYear = new Date().getFullYear();
  const { toast } = useToast();

  // Handle mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Handle closing mobile menu when clicking links
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Show back to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle CV download
  const handleDownloadCV = () => {
    // Display a toast notification
    toast({
      title: "Downloading CV",
      description: "Your download will start shortly.",
    });
  };

  // Navigation links
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#education", label: "Education" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden w-full">
      {/* Navigation */}
      <nav className="fixed w-full z-20 bg-black/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <a href="#home" className="text-xl font-mono font-bold text-primary">
              <span className="text-foreground">&lt;</span>S.ElQasemy
              <span className="text-foreground">/&gt;</span>
            </a>
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-foreground hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu - improved for better touch targets and visibility */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-sm overflow-hidden border-b border-primary/10"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="text-foreground hover:text-primary py-3 px-2 transition-colors rounded-md flex items-center justify-center text-lg font-medium touch-target active:bg-primary/10"
                  >
                    {link.label}
                  </a>
                ))}
                <a 
                  href={cvPdf.path} 
                  download={cvPdf.filename}
                  onClick={() => {
                    handleDownloadCV();
                    closeMobileMenu();
                  }}
                  className="text-foreground hover:text-primary py-3 px-2 transition-colors rounded-md flex items-center justify-center text-lg font-medium mt-2 touch-target active:bg-primary/10"
                >
                  <Download className="h-4 w-4 mr-2" /> Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main content */}
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>

      {/* Footer - Optimized for mobile */}
      <footer className="bg-black py-8 md:py-12 w-full">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About - Simplified for mobile */}
            <div className="text-center md:text-left">
              <a href="#home" className="text-xl font-mono font-bold text-primary mb-3 inline-block">
                <span className="text-foreground">&lt;</span>S.ElQasemy
                <span className="text-foreground">/&gt;</span>
              </a>
              <p className="text-foreground/70 mb-4 max-w-md mx-auto md:mx-0 text-sm md:text-base">
                Cybersecurity Engineer with expertise in network security, application development, and machine learning.
              </p>
              <div className="flex gap-4 justify-center md:justify-start">
                <a 
                  href="https://www.linkedin.com/in/soufiane-e-706261287/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors touch-target"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://github.com/soufianelqasemy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors touch-target"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="https://x.com/QasemySouf9438" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors touch-target"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/soufiane04elq" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors touch-target"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links - Better touch targets for mobile */}
            <div className="text-center md:text-left mt-6 md:mt-0">
              <h3 className="text-lg font-mono font-bold mb-4 text-primary">Quick Links</h3>
              <nav className="grid grid-cols-2 gap-y-3 gap-x-4">
                <a href="#home" className="text-foreground/70 hover:text-primary transition-colors py-1">Home</a>
                <a href="#about" className="text-foreground/70 hover:text-primary transition-colors py-1">About</a>
                <a href="#education" className="text-foreground/70 hover:text-primary transition-colors py-1">Education</a>
                <a href="#experience" className="text-foreground/70 hover:text-primary transition-colors py-1">Experience</a>
                <a href="#projects" className="text-foreground/70 hover:text-primary transition-colors py-1">Projects</a>
                <a href="#skills" className="text-foreground/70 hover:text-primary transition-colors py-1">Skills</a>
                <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors py-1">Contact</a>
                <div className="flex justify-center">
                  <a 
                    href={cvPdf.path} 
                    download={cvPdf.filename}
                    onClick={handleDownloadCV}
                    className="text-foreground/70 hover:text-primary transition-colors flex items-center py-1"
                  >
                    <Download className="h-4 w-4 mr-1" /> CV
                  </a>
                </div>
              </nav>
            </div>
            
            {/* Contact Info - Optimized for mobile */}
            <div className="text-center md:text-left mt-6 md:mt-0">
              <h3 className="text-lg font-mono font-bold mb-4 text-primary">Contact Info</h3>
              <div className="space-y-4 max-w-md mx-auto md:mx-0">
                <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto md:mx-0 md:mr-3 mb-2 md:mb-0">
                    <Mail className="text-primary h-5 w-5" />
                  </div>
                  <span className="text-foreground/70 text-sm md:text-base break-all">
                    soufiane.elqasemy.45@edu.uiz.ac.ma
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-center md:justify-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto md:mx-0 md:mr-3 mb-2 md:mb-0">
                    <Phone className="text-primary h-5 w-5" />
                  </div>
                  <span className="text-foreground/70 text-sm md:text-base">
                    +212 646937382
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-foreground/10 mt-8 pt-6 text-center relative">
            {/* Back to Top Button - Moved above copyright */}
            <div className="flex justify-center mb-4">
              <a
                href="#home"
                className="bg-primary/80 hover:bg-primary text-background w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110 mx-auto"
                aria-label="Back to top"
              >
                <ChevronUp className="h-5 w-5" />
              </a>
            </div>
            
            <p className="text-sm text-foreground/50">
              &copy; {currentYear} Soufiane El Qasemy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      {/* Fixed Back to Top Button for desktop only */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.a
            href="#home"
            className="fixed bottom-6 right-6 bg-primary/80 hover:bg-primary text-background w-12 h-12 rounded-full md:flex items-center justify-center shadow-lg transition-all transform hover:scale-110 hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
