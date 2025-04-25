import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Code, Lightbulb, Award, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "@/layouts/MainLayout";
import { Project } from "@/types";

// Mock project data with detailed information
const projectsData: Project[] = [
  {
    id: "machine-learning-spam",
    title: "Machine Learning Spam Detection",
    description:
      "Developed and integrated a machine learning model for spam detection, enhancing cybersecurity measures and filtering capabilities.",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["Python", "scikit-learn", "pandas", "Jupyter", "NLTK", "Matplotlib"],
    detailedDescription: 
      "This project involved developing a sophisticated machine learning model designed to detect and filter spam across multiple communication channels. The primary focus was on email communications, but the model was also adaptable to SMS and web form submissions.\n\nThe system uses Natural Language Processing (NLP) techniques to analyze text content, identifying patterns and features commonly associated with spam. By implementing a combination of supervised learning algorithms, primarily Naive Bayes and Support Vector Machines (SVM), the solution achieved an accuracy rate of over 98% in identifying unwanted communications.",
    features: [
      "Multi-channel spam detection (email, SMS, web forms)",
      "Real-time analysis capabilities with low latency",
      "Continuous learning module for adapting to new spam patterns",
      "Interactive dashboard for monitoring and configuration",
      "API integration options for external systems",
      "Exportable reports and analytics"
    ],
    challenges: [
      "Balancing accuracy with processing efficiency",
      "Handling multilingual content effectively",
      "Adapting to rapidly evolving spam techniques",
      "Managing computational resource requirements",
      "Reducing false positives without compromising security"
    ],
    outcome: 
      "The implemented spam detection system resulted in a 96% reduction in unwanted communications reaching end-users, with a false positive rate of less than 0.5%. The solution has been successfully deployed in production environments and continues to evolve with new threat patterns.",
    gallery: [
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "rip-ospf-security",
    title: "RIP/OSPF Network Security",
    description:
      "Enhanced network security by implementing DMAC authentication and OpenSSL encryption to protect data exchanges in a RIP/OSPF environment.",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["GNS3", "Cisco Packet Tracer", "OpenSSL", "DMAC Authentication", "Wireshark", "Cisco IOS"],
    detailedDescription: 
      "This project focused on strengthening the security infrastructure of network routing protocols, specifically RIP (Routing Information Protocol) and OSPF (Open Shortest Path First). The goal was to protect sensitive routing information from unauthorized access and tampering.\n\nBy implementing DMAC (Digest Message Authentication Code) authentication, the project ensured that only trusted devices could exchange routing updates. Additionally, incorporating OpenSSL for transport layer encryption provided protection against eavesdropping and man-in-the-middle attacks during data exchanges.",
    features: [
      "Secure key exchange mechanism for DMAC authentication",
      "Automated certificate rotation and management",
      "Real-time intrusion detection for routing protocol attacks",
      "Adaptive security policies based on network conditions",
      "Performance-optimized encryption implementation",
      "Comprehensive logging and auditing functionality"
    ],
    challenges: [
      "Minimizing performance impact on routing convergence times",
      "Ensuring backward compatibility with older network equipment",
      "Managing encryption keys across distributed network nodes",
      "Balancing security measures with network latency requirements",
      "Developing robust testing methodologies for security validation"
    ],
    outcome: 
      "The implementation successfully protected routing infrastructure from several common attack vectors while maintaining network performance within acceptable parameters. The solution was tested across multiple network topologies and verified using industry-standard penetration testing tools, confirming its effectiveness against targeted attacks.",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586772802511-6b44862a612e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "secure-cross-platform",
    title: "Secure Cross-Platform Application",
    description:
      "Created a multi-platform application (iOS, Android, Web) for project management, using Spring Boot for backend, Flutter for frontend, and Spring Security for authentication.",
    image:
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["Spring Boot", "Flutter", "Spring Security", "PostgreSQL", "JWT", "OAuth2", "Rest API", "Firebase", "CI/CD"],
    detailedDescription: 
      "This project involved the development of a comprehensive project management solution that works seamlessly across multiple platforms - web, iOS, and Android. The application was designed with security as a fundamental aspect, incorporating modern authentication methods and data protection techniques.\n\nThe backend was built using Spring Boot, providing a robust and scalable API infrastructure. Spring Security was implemented with JWT (JSON Web Tokens) and OAuth2 for secure authentication and authorization. The frontend was developed using Flutter, allowing for a single codebase that delivers native performance across all target platforms.",
    features: [
      "Real-time project tracking and collaboration tools",
      "Role-based access control with fine-grained permissions",
      "End-to-end encrypted messaging between team members",
      "Offline mode with secure local data storage",
      "Biometric authentication options on mobile devices",
      "Automated reporting and analytics dashboard",
      "Document management with version control",
      "Integration capabilities with third-party services"
    ],
    challenges: [
      "Maintaining consistent security across diverse platforms",
      "Optimizing performance for resource-constrained mobile devices",
      "Implementing reliable real-time synchronization mechanisms",
      "Ensuring data privacy compliance across different regions",
      "Creating an intuitive UI that works well on all form factors",
      "Managing complex state across disconnected sessions"
    ],
    outcome: 
      "The application successfully launched across all target platforms, receiving positive feedback for its security features and cross-platform consistency. User adoption exceeded initial projections by 35%, with particularly strong engagement on mobile platforms. The application continues to evolve with regular feature updates and security enhancements.",
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1573867639040-6dd25fa5f597?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const projectId = params?.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    // Find the project by ID
    const foundProject = projectsData.find(p => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
    }
  }, [projectId]);

  if (!project) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-primary mb-6">Project Not Found</h1>
          <p className="text-foreground/70 mb-8">The project you are looking for does not exist or has been removed.</p>
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
          </Button>
        </div>
      </MainLayout>
    );
  }

  const handleNextImage = () => {
    const gallery = project.gallery || [];
    if (gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
    }
  };

  const handlePrevImage = () => {
    const gallery = project.gallery || [];
    if (gallery.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
    }
  };
  
  // Do not add any more useEffect hooks here

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-20">
        {/* Navigation */}
        <div className="mb-12">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
          </Button>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative rounded-xl overflow-hidden shadow-glow h-[300px] md:h-[400px]"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">{project.title}</span>
            </h1>
            <p className="text-foreground/80 mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  className="bg-primary/20 hover:bg-primary/30 text-primary border-none py-1 px-3"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Detailed Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16 backdrop-blur-sm bg-black/40 p-8 rounded-xl border border-primary/10 shadow-glow"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <Code className="h-5 w-5 mr-2 text-primary" /> Project Overview
          </h2>
          <p className="text-foreground/80 whitespace-pre-line">
            {project.detailedDescription}
          </p>
        </motion.div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <CheckCircle2 className="h-5 w-5 mr-2 text-primary" /> Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="backdrop-blur-sm bg-black/40 p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <p className="text-foreground/90">{feature}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Technical Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Lightbulb className="h-5 w-5 mr-2 text-primary" /> Technical Challenges
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="backdrop-blur-sm bg-black/40 p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-colors"
                >
                  <p className="text-foreground/90">{challenge}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Outcome */}
        {project.outcome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-16 backdrop-blur-sm bg-black/40 p-8 rounded-xl border border-primary/10 shadow-glow"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" /> Outcome
            </h2>
            <p className="text-foreground/80">{project.outcome}</p>
          </motion.div>
        )}

        {/* Project Gallery */}
        {(() => {
          const gallery = project.gallery || [];
          return gallery.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-16"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-primary" /> Gallery
              </h2>
              <div className="relative rounded-xl overflow-hidden shadow-glow h-[300px] md:h-[500px]">
                {gallery[currentImageIndex] && (
                  <img
                    src={gallery[currentImageIndex]}
                    alt={`${project.title} - Gallery image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                )}
                {gallery.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                      onClick={handlePrevImage}
                    >
                      &lt;
                    </button>
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                      onClick={handleNextImage}
                    >
                      &gt;
                    </button>
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                      {gallery.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentImageIndex
                              ? "bg-primary"
                              : "bg-gray-400"
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ) : null;
        })()}

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {project.technologies.map((tech, index) => (
              <div
                key={index}
                className="backdrop-blur-sm bg-primary/10 hover:bg-primary/20 transition-colors p-4 rounded-lg flex items-center justify-center text-center"
              >
                <span className="text-foreground/90">{tech}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to Projects */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Projects
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}