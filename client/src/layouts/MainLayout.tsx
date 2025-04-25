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
        
        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-black/95 backdrop-blur-sm overflow-hidden"
            >
              <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="text-foreground hover:text-primary py-2 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main content */}
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black py-12 w-full">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* About */}
            <div className="text-center md:text-left">
              <a href="#home" className="text-xl font-mono font-bold text-primary mb-3 inline-block">
                <span className="text-foreground">&lt;</span>S.ElQasemy
                <span className="text-foreground">/&gt;</span>
              </a>
              <p className="text-foreground/70 mb-4 max-w-md mx-auto md:mx-0">
                Cybersecurity Engineer with expertise in network security, application development, and machine learning for cybersecurity applications.
              </p>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a 
                  href="https://www.linkedin.com/in/soufiane-e-706261287/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a 
                  href="https://github.com/soufianelqasemy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a 
                  href="https://x.com/QasemySouf9438" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
                <a 
                  href="https://www.instagram.com/soufiane04elq" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-mono font-bold mb-4 text-primary">Quick Links</h3>
              <nav className="grid grid-cols-2 gap-x-4 gap-y-2">
                <a href="#home" className="text-foreground/70 hover:text-primary transition-colors">Home</a>
                <a href="#about" className="text-foreground/70 hover:text-primary transition-colors">About</a>
                <a href="#education" className="text-foreground/70 hover:text-primary transition-colors">Education</a>
                <a href="#experience" className="text-foreground/70 hover:text-primary transition-colors">Experience</a>
                <a href="#projects" className="text-foreground/70 hover:text-primary transition-colors">Projects</a>
                <a href="#skills" className="text-foreground/70 hover:text-primary transition-colors">Skills</a>
                <a href="#contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</a>
                <a 
                  href={cvPdf.path} 
                  download={cvPdf.filename}
                  onClick={handleDownloadCV}
                  className="text-foreground/70 hover:text-primary transition-colors flex items-center"
                >
                  <Download className="h-3 w-3 mr-1" /> CV
                </a>
              </nav>
            </div>
            
            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-mono font-bold mb-4 text-primary">Contact Info</h3>
              <div className="space-y-3 max-w-md mx-auto md:mx-0">
                <div className="flex items-center justify-center md:justify-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Mail className="text-primary h-4 w-4" />
                  </div>
                  <span className="text-foreground/70 email-text break-all">soufiane.elqasemy.45@edu.uiz.ac.ma</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Phone className="text-primary h-4 w-4" />
                  </div>
                  <span className="text-foreground/70">+212 646937382</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-foreground/10 mt-10 pt-6 text-center">
            <p className="text-sm text-foreground/50">
              &copy; {currentYear} Soufiane El Qasemy. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.a
            href="#home"
            className="fixed bottom-6 right-6 bg-primary/80 hover:bg-primary text-background w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all transform hover:scale-110"
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
