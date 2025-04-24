import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import MainLayout from "@/layouts/MainLayout";
import EducationTimeline from "@/components/EducationTimeline";
import ExperienceCard from "@/components/ExperienceCard";
import ProjectCard from "@/components/ProjectCard";
import SkillSection from "@/components/SkillSection";
import LanguageProficiency from "@/components/LanguageProficiency";
import { apiRequest } from "@/lib/queryClient";
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
import { useMutation } from "@tanstack/react-query";

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
    // Create an anchor element
    const link = document.createElement('a');
    
    // Set the download attribute with the filename
    link.download = cvPdf.filename;
    
    // Set the href attribute to the CV path (this is a module import path)
    // We need to use a dynamic import to get the actual URL
    import(/* @vite-ignore */ cvPdf.path.replace('@assets/', '/attached_assets/'))
      .then(module => {
        // Create a blob URL from the module default export
        const fileUrl = module.default;
        
        // Set the href to the blob URL
        link.href = fileUrl;
        
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
      })
      .catch(error => {
        console.error('Error downloading CV:', error);
        toast({
          variant: "destructive",
          title: "Download Failed",
          description: "There was an error downloading the CV. Please try again.",
        });
      });
  };
  
  // Handle form submission mutation
  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. I'll get back to you soon!",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error sending your message. Please try again.",
      });
    }
  });
  
  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };
  
  // Education data
  const educationList = [
    {
      degree: "Diplôme d'ingénieur en Sécurité et Confiance Numérique",
      institution: "Ecole Nationale Supérieure de l'Intelligence Artificielle et Sciences des Données",
      location: "Taroudant",
      period: "Jan 2024 - Present"
    },
    {
      degree: "Diplome universiatire de technologie - informatique",
      institution: "Ecole supérieure de technologie",
      location: "Guelmim",
      period: "Sep 2021 - Jun 2023"
    },
    {
      degree: "Baccalauréat Scientifique – Sciences Physiques option francais",
      institution: "Lyceé Al Qods",
      location: "Tan-Tan",
      period: "Sep 2020 - Jul 2021"
    }
  ];
  
  // Experience data
  const experiences = [
    {
      position: "Développeur d'Application Multiplateforme",
      type: "Stage",
      company: "Direction Régionale du Ministère de l'Éducation Nationale et de la Formation Professionnelle",
      location: "Tan-Tan",
      period: "May 2023 - Jul 2023",
      description: "Conception et réalisation d'une application multiplateforme pour la gestion du service de formation. Développement avec Spring Boot (back-end) et Flutter (front-end), améliorant l'organisation et le suivi des formations.",
      skills: ["Spring Boot", "Flutter", "Full-stack"]
    },
    {
      position: "Développeur Desktop",
      type: "Stage",
      company: "ASAT",
      location: "Tan-Tan",
      period: "Jul 2022 - Aug 2022",
      description: "Développement d'un système d'information pour automatiser le pointage des présences des employés. L'application, couplée à un scanner de cartes, enregistre chaque passage en temps réel dans une base de données dédiée, permettant une gestion efficace des présences quotidiennes et la génération de rapports précis.",
      skills: ["Desktop Development", "Database", "Card Scanner"],
      companyUrl: "https://asat.ma/"
    }
  ];
  
  // Projects data
  const projects = [
    {
      title: "Détection de spams par apprentissage automatique",
      description: "Développement et intégration d'un modèle de machine learning pour détecter les spams, renforçant les mesures de cybersécurité.",
      image: "https://images.unsplash.com/photo-1562408590-e32931084e23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["Python", "scikit-learn", "pandas", "Jupyter"]
    },
    {
      title: "Sécurisation Réseau RIP/OSPF",
      description: "Renforcement de la sécurité réseau en implémentant l'authentification DMAC et le chiffrement OpenSSL pour protéger les échanges de données dans un environnement RIP/OSPF.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["GNS3", "Cisco Packet Tracer", "OpenSSL"]
    },
    {
      title: "Application Cross-Platforme Sécurisée",
      description: "Création d'une application multiplateforme (iOS, Android, Web) pour la gestion de projets, utilisant Spring Boot pour le back-end et Flutter pour le front-end, avec Spring Security pour l'authentification.",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      technologies: ["Spring Boot", "Flutter", "Spring Security", "PostgreSQL"]
    }
  ];
  
  // Skills data
  const skillCategories = [
    {
      name: "Cybersécurité",
      skills: [
        { name: "Sécurisation réseau (RIP/OSPF, IDS/IPS)", level: 95 },
        { name: "Gestion des identités (IAM)", level: 90 },
        { name: "Chiffrement (TLS/SSL, IPSec)", level: 90 },
        { name: "Sécurité des API (OAuth2, JWT)", level: 85 },
        { name: "Sécurité Web (OWASP, pentesting)", level: 90 }
      ]
    },
    {
      name: "Développement d'applications",
      skills: [
        { name: "Spring Boot", level: 90 },
        { name: "Flutter (Mobile/Embedded)", level: 85 },
        { name: "Spring Security", level: 85 },
        { name: "Web Frameworks (React, Django)", level: 80 },
        { name: "DevOps/DevSecOps (CI/CD, Jenkins)", level: 85 },
        { name: "Database Management (SQL/NoSQL)", level: 85 },
        { name: "Méthodologies Agile", level: 85 },
        { name: "Git/GitHub", level: 90 }
      ]
    },
    {
      name: "Virtualisation & Conteneurisation",
      skills: [
        { name: "Docker/Kubernetes", level: 90 },
        { name: "Gestion de VM (VMware)", level: 85 }
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
      name: "Administration réseau",
      skills: [
        { name: "GNS3/Cisco Packet Tracer", level: 95 },
        { name: "Protocoles (RIP/OSPF, BGP)", level: 90 },
        { name: "Infrastructure Security (Firewalls, VPN)", level: 90 }
      ]
    },
    {
      name: "Robotique & Embedded Systems",
      skills: [
        { name: "Robotique (Arduino, Raspberry Pi)", level: 80 }
      ]
    }
  ];
  
  // Languages data
  const languages = [
    { name: "Arabe", level: 5, proficiency: "Native" },
    { name: "Francais", level: 4, proficiency: "Fluent" },
    { name: "Anglais", level: 3, proficiency: "Professional" }
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
      <section id="about" className="py-20 bg-black" ref={aboutRef}>
        <div className="container mx-auto px-4">
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
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex justify-center">
                <div className="relative rounded-lg overflow-hidden w-full max-w-md border border-black/30">
                  <img 
                    src="https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Cybersecurity professional" 
                    className="w-full h-80 object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2 md:pl-12"
              initial={{ opacity: 0, x: 20 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-mono font-bold mb-6 gradient-text">
                Cybersecurity Engineer &amp; Developer
              </h3>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                Born on February 5, 2004, I am a passionate Cybersecurity Engineer with expertise in network security, application development, and machine learning for cybersecurity applications.
              </p>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                My technical focus includes securing networks with RIP/OSPF protocols, developing cross-platform applications with Spring Boot and Flutter, and implementing machine learning models for security threat detection.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center email-container max-w-full">
                  <Mail className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="email-text block w-full">soufiane.elqasemy.45@edu.uiz.ac.ma</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="contact-text">+212 646937382</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
                  <span>Tan-Tan, Morocco</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="text-primary mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="date-format">05 Feb 2004</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <Button 
                  className="bg-black hover:bg-black/80 text-foreground"
                  onClick={handleDownloadCV}
                >
                  <Download className="mr-2 h-4 w-4" /> Download CV
                </Button>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-transparent hover:bg-primary/10 text-primary border border-primary w-10 h-10"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/soufiane-e-706261287/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-transparent hover:bg-primary/10 text-primary border border-primary w-10 h-10"
                    asChild
                  >
                    <a href="https://github.com/soufianelqasemy" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-transparent hover:bg-primary/10 text-primary border border-primary w-10 h-10"
                    asChild
                  >
                    <a href="https://x.com/QasemySouf9438" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <Twitter className="h-4 w-4" />
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

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-black" ref={experienceRef}>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary">&lt;</span>
            Professional Experience
            <span className="text-primary">/&gt;</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} experience={experience} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black/30" ref={projectsRef}>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary">&lt;</span>
            Projects
            <span className="text-primary">/&gt;</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/30" ref={contactRef}>
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-mono font-bold mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-primary">&lt;</span>
            Contact Me
            <span className="text-primary">/&gt;</span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-mono font-bold mb-6 text-primary">Get In Touch</h3>
              <p className="text-foreground/80 mb-8 leading-relaxed">
                Feel free to contact me for any project, collaboration, or opportunity. I am always open to discussing new projects, creative ideas or opportunities to be part of your vision.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Mail className="text-primary h-5 w-5" />
                  </div>
                  <div className="overflow-hidden w-full email-container">
                    <h4 className="font-mono font-bold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground email-text w-full">soufiane.elqasemy.45@edu.uiz.ac.ma</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <Phone className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-foreground mb-1">Phone</h4>
                    <p className="text-muted-foreground contact-text">+212 646937382</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-mono font-bold text-foreground mb-1">Location</h4>
                    <p className="text-muted-foreground">Tan-Tan, Morocco</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-foreground/80 mb-2 font-mono">Name</label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="w-full bg-black/50 border border-primary/30 text-foreground rounded-md focus:border-primary"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-foreground/80 mb-2 font-mono">Email</label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="w-full bg-black/50 border border-primary/30 text-foreground rounded-md focus:border-primary"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-foreground/80 mb-2 font-mono">Subject</label>
                  <Input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    className="w-full bg-black/50 border border-primary/30 text-foreground rounded-md focus:border-primary"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-foreground/80 mb-2 font-mono">Message</label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={5} 
                    className="w-full bg-black/50 border border-primary/30 text-foreground rounded-md focus:border-primary"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/80 text-background font-semibold w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
