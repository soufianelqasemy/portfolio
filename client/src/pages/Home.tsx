import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import MainLayout from "@/layouts/MainLayout";
import EducationTimeline from "@/components/EducationTimeline";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectCard from "@/components/ProjectCard";
import SkillSection from "@/components/SkillSection";
import LanguageProficiency from "@/components/LanguageProficiency";
import profileImage from "@/assets/profileImage";
import cvPdf from "@/assets/cvPdf";
import {
  ChevronDown,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Linkedin,
  Github,
  Twitter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  // Refs for animating elements when they come into view
  const aboutRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  
  // Check if elements are in view for animations
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const educationInView = useInView(educationRef, { once: true, margin: "-100px" });
  const experienceInView = useInView(experienceRef, { once: true, margin: "-100px" });
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();
  
  // Matrix effect for the background
  const matrixRef = useRef<HTMLDivElement>(null);
  
  // Handle form change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle CV download
  const handleDownloadCV = () => {
    // Create a link element
    const link = document.createElement('a');
    
    // Use correct path to the PDF (now in the public folder)
    const pdfPath = '/SoufianeElQasemy CV.pdf';
    
    // Set attributes
    link.href = pdfPath;
    link.download = 'SoufianeElQasemy-CV.pdf';
    
    // Append to the document
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    
    toast({
      title: "CV Downloaded",
      description: "Thank you for your interest in my CV.",
    });
  };
  
  // Using a simpler approach for the contact form
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate the form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill out all fields in the form.",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address.",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate sending a message (without actually sending)
    setTimeout(() => {
      console.log("Contact form data:", formData);
      
      // Show success message
      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  // Education data
  const educationList = [
    {
      degree: "Engineering Degree in Security IT and Digital Trust",
      institution: "National School of Artificial Intelligence and Data Science",
      location: "Taroudant",
      period: "Jan 2024 - Present"
    },
    {
      degree: "University Technology Diploma - Computer Science",
      institution: "Higher School of Technology",
      location: "Guelmim",
      period: "Sep 2021 - Jun 2023"
    },
    {
      degree: "Scientific Baccalaureate - Physical Sciences (French option)",
      institution: "Al Qods High School",
      location: "Tan-Tan",
      period: "Sep 2020 - Jul 2021"
    }
  ];
  
  // Experience data
  const experiences = [
    {
      position: "Cross-Platform Application Developer",
      type: "Internship",
      company: "Regional Directorate of the Ministry of National Education",
      location: "Tan-Tan",
      period: "May 2023 - Jul 2023",
      description: "Designed and implemented a cross-platform application for training service management. Used Spring Boot (back-end) and Flutter (front-end) to improve organization and tracking of training programs.",
      skills: ["Spring Boot", "Flutter", "Full-stack"]
    },
    {
      position: "Desktop Application Developer",
      type: "Internship",
      company: "ASAT",
      location: "Tan-Tan",
      period: "Jul 2022 - Aug 2022",
      description: "Developed an information system to automate employee attendance tracking. The application, connected to a card scanner, records each entry in real-time in a dedicated database, enabling efficient daily attendance management and precise report generation.",
      skills: ["Desktop Development", "Database", "Card Scanner"],
      companyUrl: "https://asat.ma/"
    }
  ];
  
  // Projects data
  const projects = [
    {
      title: "Machine Learning Spam Detection",
      description: "Developed and integrated a machine learning model for spam detection, enhancing cybersecurity measures and filtering capabilities.",
      image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Machine learning code image
      technologies: ["Python", "scikit-learn", "pandas", "Jupyter"]
    },
    {
      title: "RIP/OSPF Network Security",
      description: "Enhanced network security by implementing DMAC authentication and OpenSSL encryption to protect data exchanges in a RIP/OSPF environment.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Network security image
      technologies: ["GNS3", "Cisco Packet Tracer", "OpenSSL"]
    },
    {
      title: "Secure Cross-Platform Application",
      description: "Created a multi-platform application (iOS, Android, Web) for project management, using Spring Boot for backend, Flutter for frontend, and Spring Security for authentication.",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Better cross-platform app image
      technologies: ["Spring Boot", "Flutter", "Spring Security", "PostgreSQL"]
    }
  ];
  
  // Skills data
  const skillCategories = [
    {
      name: "Cybersecurity",
      skills: [
        { name: "Network Security (RIP/OSPF, IDS/IPS)", level: 95 },
        { name: "Identity Management (IAM)", level: 90 },
        { name: "Encryption (TLS/SSL, IPSec)", level: 90 },
        { name: "API Security (OAuth2, JWT)", level: 85 },
        { name: "Web Security (OWASP, pentesting)", level: 90 }
      ]
    },
    {
      name: "Application Development",
      skills: [
        { name: "Spring Boot", level: 90 },
        { name: "Flutter (Mobile/Embedded)", level: 85 },
        { name: "Spring Security", level: 85 },
        { name: "Web Frameworks (React, Django)", level: 80 },
        { name: "DevOps/DevSecOps (CI/CD, Jenkins)", level: 85 },
        { name: "Database Management (SQL/NoSQL)", level: 85 },
        { name: "Agile Methodologies", level: 85 },
        { name: "Git/GitHub", level: 90 }
      ]
    },
    {
      name: "Virtualization & Containerization",
      skills: [
        { name: "Docker/Kubernetes", level: 90 },
        { name: "VM Management (VMware)", level: 85 }
      ]
    },
    {
      name: "Machine Learning & Data Science",
      skills: [
        { name: "Python (scikit-learn, pandas)", level: 90 },
        { name: "Data Visualization (Matplotlib, Tableau)", level: 80 }
      ]
    },
    {
      name: "Network Administration",
      skills: [
        { name: "GNS3/Cisco Packet Tracer", level: 95 },
        { name: "Protocols (RIP/OSPF, BGP)", level: 90 },
        { name: "Infrastructure Security (Firewalls, VPN)", level: 90 }
      ]
    },
    {
      name: "Robotics & Embedded Systems",
      skills: [
        { name: "Robotics (Arduino, Raspberry Pi)", level: 80 }
      ]
    }
  ];
  
  // Languages data
  const languages = [
    { name: "Arabic", level: 5, proficiency: "Native" },
    { name: "French", level: 4, proficiency: "Fluent" },
    { name: "English", level: 3, proficiency: "Professional" }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section id="home" className="animated-bg h-screen flex items-center relative overflow-hidden hero-section">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="matrix-bg w-full h-full font-mono text-xs text-primary" ref={matrixRef}></div>
        </div>
        <div className="container mx-auto px-4 z-10 pt-20 md:pt-0">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <motion.h1 
                className="text-4xl md:text-6xl font-mono font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="gradient-text">Soufiane</span> <br />
                <span className="text-foreground">El Qasemy</span>
              </motion.h1>
              <motion.h2 
                className="text-xl md:text-2xl mb-6 text-primary/80 font-mono"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Cybersecurity Engineer
              </motion.h2>
              <motion.p 
                className="text-foreground/80 mb-8 text-lg leading-relaxed max-w-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Specializing in network security, application development, and machine learning for cybersecurity applications.
              </motion.p>
              <motion.div 
                className="flex space-x-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button 
                  className="bg-primary hover:bg-primary/80 text-background" 
                  asChild
                >
                  <a href="#contact">Contact Me</a>
                </Button>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10"
                  asChild
                >
                  <a href="#about">Learn More</a>
                </Button>
              </motion.div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <motion.div 
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary glow"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <img 
                  src={profileImage.path}
                  alt="Soufiane El Qasemy" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-primary hover:text-primary/80 transition-colors">
            <ChevronDown className="h-6 w-6" />
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black relative overflow-hidden" ref={aboutRef}>
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary">&lt;</span>
            About Me
            <span className="text-primary">/&gt;</span>
          </motion.h2>
          <div className="max-w-3xl mx-auto backdrop-blur-sm bg-black/40 p-8 rounded-xl border border-primary/10 shadow-glow">
            <motion.div 
              className="w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-mono font-bold mb-6 text-center">
                <span className="gradient-text">Cybersecurity Engineer &amp; Developer</span>
              </h3>
              <p className="text-foreground/90 mb-8 leading-relaxed text-center">
                I am a passionate Cybersecurity Engineer specializing in network security, application development, and machine learning. My technical focus includes designing secure network architectures with RIP/OSPF protocols, creating cross-platform applications with Spring Boot and Flutter, and implementing ML models for threat detection.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-center justify-center md:justify-start p-3 rounded-lg bg-black/30 backdrop-blur-sm">
                  <Calendar className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="date-format font-semibold">Born: February 5, 2004</span>
                </div>
                <div className="flex items-center justify-center md:justify-start p-3 rounded-lg bg-black/30 backdrop-blur-sm">
                  <MapPin className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="font-semibold">Located in Tan-Tan, Morocco</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
                <Button 
                  className="bg-primary hover:bg-primary/80 text-background w-full sm:w-auto font-semibold shadow-glow px-6 py-2.5"
                  onClick={handleDownloadCV}
                >
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </Button>
                <div className="flex items-center gap-4 mt-4 sm:mt-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-black/20 hover:bg-primary/20 text-primary border border-primary/50 w-11 h-11 shadow-glow-sm"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/soufiane-e-706261287/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-black/20 hover:bg-primary/20 text-primary border border-primary/50 w-11 h-11 shadow-glow-sm"
                    asChild
                  >
                    <a href="https://github.com/soufianelqasemy" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-black/20 hover:bg-primary/20 text-primary border border-primary/50 w-11 h-11 shadow-glow-sm"
                    asChild
                  >
                    <a href="https://x.com/QasemySouf9438" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 bg-black/30" ref={educationRef}>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={educationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary">&lt;</span>
            Education
            <span className="text-primary">/&gt;</span>
          </motion.h2>
          <EducationTimeline educationList={educationList} />
        </div>
      </section>

      {/* Experience Section - Mobile Optimized */}
      <section id="experience" className="py-12 md:py-20 bg-black" ref={experienceRef}>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-mono font-bold mb-8 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary">&lt;</span>
            Professional Experience
            <span className="text-primary">/&gt;</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Mobile Optimized */}
      <section id="projects" className="py-12 md:py-20 bg-black/30" ref={projectsRef}>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-mono font-bold mb-8 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary">&lt;</span>
            Projects
            <span className="text-primary">/&gt;</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-black" ref={skillsRef}>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary">&lt;</span>
            Skills
            <span className="text-primary">/&gt;</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {skillCategories.map((category, index) => (
              <SkillSection key={index} category={category} index={index} />
            ))}
          </div>
          
          {/* Languages */}
          <LanguageProficiency languages={languages} />
        </div>
      </section>

      {/* Contact Section - Mobile Optimized */}
      <section id="contact" className="py-12 md:py-20 bg-black/30" ref={contactRef}>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-2xl md:text-3xl font-mono font-bold mb-8 md:mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary">&lt;</span>
            Contact Me
            <span className="text-primary">/&gt;</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black/40 backdrop-blur-sm rounded-xl border border-primary/10 p-6 md:p-8 shadow-glow-sm"
            >
              <h3 className="text-xl font-mono font-bold mb-4 md:mb-6 text-primary text-center md:text-left">Get In Touch</h3>
              <p className="text-foreground/80 mb-6 md:mb-8 leading-relaxed text-sm md:text-base text-center md:text-left">
                Feel free to contact me for any project, collaboration, or opportunity. I am always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              </p>
              
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-0 md:mr-4">
                    <Mail className="text-primary h-5 w-5" />
                  </div>
                  <div className="overflow-hidden w-full email-container text-center md:text-left">
                    <h4 className="font-mono font-bold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground email-text w-full text-xs md:text-sm">soufiane.elqasemy.45@edu.uiz.ac.ma</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-0 md:mr-4">
                    <Phone className="text-primary h-5 w-5" />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-mono font-bold text-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground contact-text text-sm md:text-base">+212 646937382</p>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3 md:mb-0 md:mr-4">
                    <MapPin className="text-primary h-5 w-5" />
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="font-mono font-bold text-foreground mb-1">Location</h4>
                    <p className="text-muted-foreground text-sm md:text-base">Tan-Tan, Morocco</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links - With consistent spacing */}
              <div className="flex items-center justify-center mt-8 gap-4">
                <a 
                  href="https://www.linkedin.com/in/soufiane-e-706261287/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors touch-target"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href="https://github.com/soufianelqasemy" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors touch-target"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a 
                  href="https://x.com/QasemySouf9438" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors touch-target"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 md:mt-0"
            >
              <form onSubmit={handleSubmit} className="space-y-5 bg-black/40 backdrop-blur-sm rounded-xl border border-primary/10 p-6 md:p-8 shadow-glow-sm">
                <div>
                  <label htmlFor="name" className="block text-foreground/80 mb-2 font-mono text-sm md:text-base">Name</label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="w-full bg-black/50 border border-primary/30 text-foreground rounded-md focus:border-primary h-12 touch-target"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-foreground/80 mb-2 font-mono text-sm md:text-base">Email</label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="w-full bg-black/50 border border-primary/30 text-foreground rounded-md focus:border-primary h-12 touch-target"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-foreground/80 mb-2 font-mono text-sm md:text-base">Subject</label>
                  <Input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    className="w-full bg-black/50 border border-primary/30 text-foreground rounded-md focus:border-primary h-12 touch-target"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-foreground/80 mb-2 font-mono text-sm md:text-base">Message</label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    className="w-full bg-black/50 border border-primary/30 text-foreground rounded-md focus:border-primary touch-target py-3"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/80 text-background font-semibold w-full h-14 mt-2 text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
