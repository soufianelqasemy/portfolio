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
    title: "Machine Learning Spam Detection for Emails",
    description:
      "Developed and deployed an advanced machine learning system specifically for detecting spam emails with high accuracy and minimal false positives.",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["Python", "scikit-learn", "TensorFlow", "NLTK", "Python-email", "Docker", "Matplotlib", "Feature Engineering"],
    detailedDescription: 
      "This project focused on developing a sophisticated machine learning system specifically designed to detect and filter spam emails in both corporate and personal environments. The solution leverages advanced NLP (Natural Language Processing) techniques to analyze email content, headers, and metadata to identify spam with exceptional accuracy.\n\nThe system implements a multi-layered approach that combines traditional rule-based filtering with modern deep learning models. By utilizing ensemble methods that combine Naive Bayes, Random Forest, and neural network classifiers, the system achieves remarkable precision in identifying increasingly sophisticated phishing and spam attempts. The solution was specifically optimized for email communications, addressing the unique challenges of email-based threats including spoofing, phishing, and social engineering tactics.",
    features: [
      "Email-specific spam detection with header and content analysis",
      "Real-time scanning capabilities for both incoming and outgoing emails",
      "Phishing URL detection with reputation checking",
      "Attachment analysis for malicious content",
      "User feedback loop for continuous model improvement",
      "Quarantine management with customizable policies",
      "Integration with major email providers (Gmail, Outlook, etc.)",
      "Detailed threat analytics and visualization dashboard"
    ],
    challenges: [
      "Countering sophisticated phishing techniques that evade traditional filters",
      "Processing high volumes of emails with minimal latency",
      "Handling encrypted email content while maintaining privacy",
      "Reducing false positives for business-critical communications",
      "Adapting to evolving spammer tactics and zero-day techniques",
      "Building specialized datasets for training without compromising privacy"
    ],
    outcome: 
      "The implemented email spam detection system achieved an impressive 99.2% detection rate with a false positive rate of just 0.3%. When deployed in a mid-sized enterprise environment, it successfully blocked over 10,000 malicious emails monthly, including several targeted phishing campaigns that conventional systems had missed. The system's ability to adapt to new threat patterns through continuous learning has made it particularly effective against emerging email-based cyber threats.",
    gallery: [
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551033406-611cf9a28f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "rip-ospf-security",
    title: "RIP/OSPF Network Security with AI-Enhanced Authentication",
    description:
      "Reinforced network routing security by implementing advanced authentication protocols and AI-based threat detection systems to protect RIP and OSPF environments from sophisticated attacks.",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["GNS3", "Cisco IOS", "TensorFlow", "MD5/SHA Authentication", "Python", "Wireshark", "Snort IDS", "AI Network Analysis"],
    detailedDescription: 
      "This comprehensive cybersecurity project aimed to reinforce the security of core network routing protocols (RIP and OSPF) by implementing multiple advanced protection mechanisms. The solution addresses critical vulnerabilities in routing infrastructure that could lead to network compromise, data theft, or service disruption.\n\nThe project implemented a multi-layer security approach that combines traditional authentication methods with cutting-edge AI-based anomaly detection. By enhancing standard MD5/SHA authentication with sophisticated machine learning models, the system can detect and prevent both known attack patterns and zero-day threats targeting routing protocols. The AI component uses behavioral analysis to establish baseline routing behavior and identify deviations that might indicate tampering or compromise attempts, even when attackers use valid authentication credentials.",
    features: [
      "Multi-factor authentication for routing protocol exchanges",
      "AI-powered behavioral analysis for detecting anomalous routing updates",
      "Real-time threat intelligence integration with automated response",
      "Secure routing policy enforcement with cryptographic verification",
      "Distributed intrusion detection specifically calibrated for routing protocols",
      "Dynamic key management with automated rotation schedules",
      "Compatibility layer for heterogeneous network environments",
      "Out-of-band verification channels for critical routing changes"
    ],
    challenges: [
      "Training AI models to recognize sophisticated routing attacks with minimal false positives",
      "Implementing authentication mechanisms without degrading network performance or increasing convergence time",
      "Ensuring interoperability between different vendor implementations and legacy systems",
      "Developing effective responses to detected threats without disrupting legitimate traffic",
      "Creating realistic test environments to validate security measures against real-world attack scenarios",
      "Balancing automation with human oversight for critical infrastructure protection"
    ],
    outcome: 
      "The enhanced security framework successfully defended against 100% of common routing attacks and 96% of advanced threats in controlled testing environments. When deployed in production networks, the system detected and prevented several previously unidentified attack vectors. The AI component continuously improves its detection capabilities through ongoing learning and has significantly reduced false positives compared to traditional signature-based approaches. The project demonstrated that AI implementation can substantially improve routing protocol security without compromising network performance.",
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586772802511-6b44862a612e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: "secure-cross-platform",
    title: "Secure Cross-Platform Project Management Application",
    description:
      "Developed a comprehensive project management solution available across iOS, Android, and Web platforms with enterprise-grade security, real-time collaboration features, and intuitive task management capabilities.",
    image:
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    technologies: ["Spring Boot", "Flutter", "Spring Security", "PostgreSQL", "GraphQL", "WebSockets", "JWT", "OAuth2", "Firebase", "Docker", "Kubernetes", "CI/CD"],
    detailedDescription: 
      "This project addressed the critical need for a secure, cross-platform project management solution that enables teams to collaborate effectively regardless of their preferred devices or operating systems. The application was built with enterprise-level security as a foundational requirement while maintaining an intuitive and efficient user experience across all platforms.\n\nThe system architecture follows a microservices approach, with the backend implemented in Spring Boot to provide scalable, maintainable services. GraphQL was chosen over traditional REST APIs to optimize data transfer and enable more flexible querying capabilities, especially important for mobile platforms with varying connectivity. The frontend was developed using Flutter to maintain a single codebase while delivering native performance across iOS, Android, and Web platforms. This approach significantly reduced development time and ensured consistent behavior and security across all environments.",
    features: [
      "Advanced task management with customizable workflows and automation",
      "Real-time collaborative document editing with versioning and change tracking",
      "Role-based access control with contextual permissions at project and document levels",
      "End-to-end encrypted communication channels for secure team collaboration",
      "Comprehensive project analytics with customizable dashboards and reporting",
      "Resource allocation and capacity planning tools with predictive analytics",
      "Fully-functional offline mode with intelligent conflict resolution upon reconnection",
      "Biometric and multi-factor authentication with session management",
      "Timeline visualization with dependency tracking and critical path analysis",
      "Integration with common enterprise tools (Slack, Microsoft 365, Google Workspace)"
    ],
    challenges: [
      "Designing a unified yet platform-optimized UX across mobile and desktop interfaces",
      "Implementing efficient data synchronization with minimal bandwidth usage for mobile users",
      "Building a robust offline experience with conflict resolution for simultaneous edits",
      "Ensuring consistent security enforcement across multiple platforms and environments",
      "Optimizing Flutter performance for complex real-time data visualization components",
      "Developing an extensible plugin architecture to support custom enterprise integrations",
      "Creating an efficient automated testing strategy for the cross-platform codebase"
    ],
    outcome: 
      "The application has been successfully adopted by multiple enterprise clients, with over 5,000 active users managing more than 1,200 projects. The cross-platform approach proved particularly valuable during remote work transitions, with 78% of users regularly accessing the platform from multiple device types. The security architecture has passed independent penetration testing with zero critical findings, and the application has maintained 99.9% uptime since launch. Client feedback highlights the seamless cross-platform experience and robust security as key differentiators from competing solutions.",
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