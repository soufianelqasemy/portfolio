import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { X, Plus } from "lucide-react";
import { Project, Experience } from "@/types";

// Define ContactMessage type based on schema
type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function Admin() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/contact');
      if (!response.ok) {
        throw new Error('Failed to fetch contact messages');
      }
      const data = await response.json();
      setMessages(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load contact messages. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Initialize state for projects and experience
  const [projects, setProjects] = useState<Project[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [activeTab, setActiveTab] = useState("messages");
  
  // State for project management
  const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false);
  const [isEditProjectDialogOpen, setIsEditProjectDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    id: '',
    title: '',
    description: '',
    image: '',
    technologies: [],
    detailedDescription: '',
    features: [],
    challenges: [],
    outcome: '',
    gallery: []
  });
  const [newTechnology, setNewTechnology] = useState('');
  
  // State for experience management
  const [isAddExpDialogOpen, setIsAddExpDialogOpen] = useState(false);
  const [isEditExpDialogOpen, setIsEditExpDialogOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [experienceForm, setExperienceForm] = useState<Partial<Experience>>({
    position: '',
    type: '',
    company: '',
    location: '',
    period: '',
    description: '',
    skills: [],
    companyUrl: ''
  });
  const [newSkill, setNewSkill] = useState('');
  
  // Function to fetch projects from the server
  const fetchProjects = () => {
    // Get projects from Home.tsx for now (we'd fetch from API in a real app)
    const hardcodedProjects = [
      {
        id: "machine-learning-spam",
        title: "Machine Learning Spam Detection",
        description: "Developed and integrated a machine learning model for spam detection, enhancing cybersecurity measures and filtering capabilities.",
        image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        technologies: ["Python", "scikit-learn", "pandas", "Jupyter", "NLTK", "Matplotlib"],
      },
      {
        id: "rip-ospf-security",
        title: "RIP/OSPF Network Security",
        description: "Enhanced network security by implementing DMAC authentication and OpenSSL encryption to protect data exchanges in a RIP/OSPF environment.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        technologies: ["GNS3", "Cisco Packet Tracer", "OpenSSL", "DMAC Authentication", "Wireshark", "Cisco IOS"],
      },
      {
        id: "secure-cross-platform",
        title: "Secure Cross-Platform Application",
        description: "Created a multi-platform application (iOS, Android, Web) for project management, using Spring Boot for backend, Flutter for frontend, and Spring Security for authentication.",
        image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        technologies: ["Spring Boot", "Flutter", "Spring Security", "PostgreSQL", "JWT", "OAuth2", "Rest API", "Firebase", "CI/CD"],
      },
    ];

    setProjects(hardcodedProjects);
  };

  // Function to fetch experiences from the server
  const fetchExperiences = () => {
    // Get experiences from Home.tsx for now (we'd fetch from API in a real app)
    const hardcodedExperiences = [
      {
        position: "Cybersecurity Intern",
        type: "Internship",
        company: "ASAT (L'Association de Sécurité et d'Assistance Technologique)",
        location: "Casablanca, Morocco",
        period: "Jun 2023 - Sep 2023",
        description:
          "Implemented security measures including authentication protocols and network monitoring tools. Developed a cross-platform secure application with Spring Boot backend and Flutter frontend. Assisted in conducting security audits and vulnerability assessments.",
        skills: ["Network Security", "Spring Boot", "Flutter", "OAuth2/JWT"],
        companyUrl: "https://asat.ma/",
      },
      {
        position: "Cybersecurity Engineering Student",
        type: "Study Project",
        company: "Ibn Zohr University",
        location: "Agadir, Morocco",
        period: "Sep 2021 - Present",
        description:
          "Led a team of 3 in developing a machine learning model for spam detection with 97% accuracy. Deployed a secure API system using Spring Security and OAuth2. Created comprehensive documentation and presented research findings to faculty.",
        skills: ["Machine Learning", "Python (sklearn, pandas)", "API Security", "Team Leadership"],
        companyUrl: "http://www.uiz.ac.ma",
      },
    ];

    setExperiences(hardcodedExperiences);
  };

  // Project management handlers
  const handleAddProject = () => {
    setProjectForm({
      id: '',
      title: '',
      description: '',
      image: '',
      technologies: [],
      detailedDescription: '',
      features: [],
      challenges: [],
      outcome: '',
      gallery: []
    });
    setIsAddProjectDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    setProjectForm({...project});
    setIsEditProjectDialogOpen(true);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(project => project.id !== id);
      setProjects(updatedProjects);
      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
    }
  };

  const handleProjectFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim()) {
      setProjectForm(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const handleRemoveTechnology = (index: number) => {
    setProjectForm(prev => ({
      ...prev,
      technologies: prev.technologies?.filter((_, i) => i !== index)
    }));
  };

  const handleSaveProject = () => {
    if (!projectForm.title || !projectForm.description || !projectForm.image) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Title, description, and image URL are required",
      });
      return;
    }

    const projectId = projectForm.id || `project-${Date.now()}`;
    const newProject = {
      ...projectForm,
      id: projectId
    } as Project;

    if (isAddProjectDialogOpen) {
      setProjects(prev => [...prev, newProject]);
      toast({
        title: "Success",
        description: "Project added successfully",
      });
      setIsAddProjectDialogOpen(false);
    } else if (isEditProjectDialogOpen) {
      setProjects(prev => prev.map(p => p.id === newProject.id ? newProject : p));
      toast({
        title: "Success",
        description: "Project updated successfully",
      });
      setIsEditProjectDialogOpen(false);
    }
  };

  // Experience management handlers
  const handleAddExperience = () => {
    setExperienceForm({
      position: '',
      type: '',
      company: '',
      location: '',
      period: '',
      description: '',
      skills: [],
      companyUrl: ''
    });
    setIsAddExpDialogOpen(true);
  };

  const handleEditExperience = (experience: Experience) => {
    setSelectedExperience(experience);
    setExperienceForm({...experience});
    setIsEditExpDialogOpen(true);
  };

  const handleDeleteExperience = (index: number) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      const updatedExperiences = experiences.filter((_, i) => i !== index);
      setExperiences(updatedExperiences);
      toast({
        title: "Success",
        description: "Experience deleted successfully",
      });
    }
  };

  const handleExperienceFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExperienceForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setExperienceForm(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index: number) => {
    setExperienceForm(prev => ({
      ...prev,
      skills: prev.skills?.filter((_, i) => i !== index)
    }));
  };

  const handleSaveExperience = () => {
    if (!experienceForm.position || !experienceForm.company || !experienceForm.period) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Position, company, and period are required",
      });
      return;
    }

    const newExperience = {...experienceForm} as Experience;

    if (isAddExpDialogOpen) {
      setExperiences(prev => [...prev, newExperience]);
      toast({
        title: "Success",
        description: "Experience added successfully",
      });
      setIsAddExpDialogOpen(false);
    } else if (isEditExpDialogOpen) {
      setExperiences(prev => 
        prev.map((exp, index) => (exp === selectedExperience ? newExperience : exp))
      );
      toast({
        title: "Success",
        description: "Experience updated successfully",
      });
      setIsEditExpDialogOpen(false);
    }
  };

  // Load data for all tabs on initial render
  useEffect(() => {
    fetchMessages();
    fetchProjects();
    fetchExperiences();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
          <Button 
            asChild
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10"
          >
            <a href="/">Back to Home</a>
          </Button>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-900/20 border border-red-500 rounded-md text-red-400">
            {error}
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-black/40 border border-primary/20">
            <TabsTrigger 
              value="messages" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-white"
            >
              Contact Messages
            </TabsTrigger>
            <TabsTrigger 
              value="projects" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-white"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger 
              value="experience" 
              className="data-[state=active]:bg-primary/20 data-[state=active]:text-white"
            >
              Experience
            </TabsTrigger>
          </TabsList>

          {/* Messages Tab Content */}
          <TabsContent value="messages" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary">Contact Messages</h2>
              <Button 
                onClick={() => fetchMessages()} 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                disabled={loading}
              >
                {loading ? "Loading..." : "Refresh"}
              </Button>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center min-h-[300px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : messages.length === 0 ? (
              <Card className="bg-black/40 border-primary/10">
                <CardContent className="pt-6">
                  <p className="text-center text-gray-400">No messages found.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <Card key={message.id} className="bg-black/40 border-primary/10 shadow-glow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-medium">{message.subject}</CardTitle>
                        <span className="text-sm text-gray-400">{formatDate(message.createdAt)}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2">
                        <p className="text-sm text-gray-400">
                          From: <span className="text-primary">{message.name}</span> (<a href={`mailto:${message.email}`} className="text-blue-400 hover:underline">{message.email}</a>)
                        </p>
                      </div>
                      <Separator className="my-4 bg-primary/20" />
                      <p className="whitespace-pre-wrap">{message.message}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Projects Tab Content */}
          <TabsContent value="projects" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary">Manage Projects</h2>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                onClick={handleAddProject}
              >
                <Plus className="h-4 w-4 mr-2" /> Add New Project
              </Button>
            </div>
            
            <div className="space-y-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-black/40 border-primary/10 shadow-glow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardTitle className="text-xl font-medium">{project.title}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-amber-500 text-amber-500 hover:bg-amber-500/10"
                          onClick={() => handleEditProject(project)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-500/10"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Project Dialog */}
            <Dialog open={isAddProjectDialogOpen} onOpenChange={setIsAddProjectDialogOpen}>
              <DialogContent className="bg-black/90 border-primary/20 text-foreground max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-primary">Add New Project</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={projectForm.title} 
                      onChange={handleProjectFormChange}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL *</Label>
                    <Input 
                      id="image" 
                      name="image" 
                      value={projectForm.image} 
                      onChange={handleProjectFormChange}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={projectForm.description} 
                      onChange={handleProjectFormChange}
                      rows={3}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="detailedDescription">Detailed Description</Label>
                    <Textarea 
                      id="detailedDescription" 
                      name="detailedDescription" 
                      value={projectForm.detailedDescription} 
                      onChange={handleProjectFormChange}
                      rows={5}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="outcome">Outcome</Label>
                    <Textarea 
                      id="outcome" 
                      name="outcome" 
                      value={projectForm.outcome} 
                      onChange={handleProjectFormChange}
                      rows={3}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="technologies">Technologies</Label>
                    <div className="flex gap-2">
                      <Input
                        id="newTechnology"
                        value={newTechnology}
                        onChange={(e) => setNewTechnology(e.target.value)}
                        className="bg-black/50 border-primary/30"
                        placeholder="Add technology"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary/10"
                        onClick={handleAddTechnology}
                      >
                        Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {projectForm.technologies?.map((tech, index) => (
                        <div key={index} className="bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
                          <span className="text-primary text-xs">{tech}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-4 w-4 p-0 text-primary hover:bg-primary/10 rounded-full"
                            onClick={() => handleRemoveTechnology(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => setIsAddProjectDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/80 text-background"
                    onClick={handleSaveProject}
                  >
                    Save Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Edit Project Dialog */}
            <Dialog open={isEditProjectDialogOpen} onOpenChange={setIsEditProjectDialogOpen}>
              <DialogContent className="bg-black/90 border-primary/20 text-foreground max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-primary">Edit Project</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={projectForm.title} 
                      onChange={handleProjectFormChange}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL *</Label>
                    <Input 
                      id="image" 
                      name="image" 
                      value={projectForm.image} 
                      onChange={handleProjectFormChange}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={projectForm.description} 
                      onChange={handleProjectFormChange}
                      rows={3}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="detailedDescription">Detailed Description</Label>
                    <Textarea 
                      id="detailedDescription" 
                      name="detailedDescription" 
                      value={projectForm.detailedDescription} 
                      onChange={handleProjectFormChange}
                      rows={5}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="outcome">Outcome</Label>
                    <Textarea 
                      id="outcome" 
                      name="outcome" 
                      value={projectForm.outcome} 
                      onChange={handleProjectFormChange}
                      rows={3}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="technologies">Technologies</Label>
                    <div className="flex gap-2">
                      <Input
                        id="newTechnology"
                        value={newTechnology}
                        onChange={(e) => setNewTechnology(e.target.value)}
                        className="bg-black/50 border-primary/30"
                        placeholder="Add technology"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary/10"
                        onClick={handleAddTechnology}
                      >
                        Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {projectForm.technologies?.map((tech, index) => (
                        <div key={index} className="bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
                          <span className="text-primary text-xs">{tech}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-4 w-4 p-0 text-primary hover:bg-primary/10 rounded-full"
                            onClick={() => handleRemoveTechnology(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => setIsEditProjectDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/80 text-background"
                    onClick={handleSaveProject}
                  >
                    Update Project
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Experience Tab Content */}
          <TabsContent value="experience" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-primary">Manage Experience</h2>
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10"
                onClick={handleAddExperience}
              >
                <Plus className="h-4 w-4 mr-2" /> Add New Experience
              </Button>
            </div>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="bg-black/40 border-primary/10 shadow-glow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl font-medium">{exp.position}</CardTitle>
                        <div className="text-sm text-gray-400 mt-1">
                          {exp.company} • {exp.location} • {exp.period}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-amber-500 text-amber-500 hover:bg-amber-500/10"
                          onClick={() => handleEditExperience(exp)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-500 text-red-500 hover:bg-red-500/10"
                          onClick={() => handleDeleteExperience(index)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4">{exp.description}</p>
                    <h4 className="text-sm font-medium text-primary mb-2">Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Add Experience Dialog */}
            <Dialog open={isAddExpDialogOpen} onOpenChange={setIsAddExpDialogOpen}>
              <DialogContent className="bg-black/90 border-primary/20 text-foreground max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-primary">Add New Experience</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Input 
                      id="position" 
                      name="position" 
                      value={experienceForm.position} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Input 
                      id="type" 
                      name="type" 
                      value={experienceForm.type} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                      placeholder="Full-time, Internship, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      value={experienceForm.company} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={experienceForm.location} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="period">Period *</Label>
                    <Input 
                      id="period" 
                      name="period" 
                      value={experienceForm.period} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                      placeholder="Jan 2023 - Present"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyUrl">Company URL</Label>
                    <Input 
                      id="companyUrl" 
                      name="companyUrl" 
                      value={experienceForm.companyUrl} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                      placeholder="https://company.com"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={experienceForm.description} 
                      onChange={handleExperienceFormChange}
                      rows={5}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="skills">Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        id="newSkill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="bg-black/50 border-primary/30"
                        placeholder="Add skill"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary/10"
                        onClick={handleAddSkill}
                      >
                        Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {experienceForm.skills?.map((skill, index) => (
                        <div key={index} className="bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
                          <span className="text-primary text-xs">{skill}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-4 w-4 p-0 text-primary hover:bg-primary/10 rounded-full"
                            onClick={() => handleRemoveSkill(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => setIsAddExpDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/80 text-background"
                    onClick={handleSaveExperience}
                  >
                    Save Experience
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Edit Experience Dialog */}
            <Dialog open={isEditExpDialogOpen} onOpenChange={setIsEditExpDialogOpen}>
              <DialogContent className="bg-black/90 border-primary/20 text-foreground max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-primary">Edit Experience</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Input 
                      id="position" 
                      name="position" 
                      value={experienceForm.position} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Type</Label>
                    <Input 
                      id="type" 
                      name="type" 
                      value={experienceForm.type} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                      placeholder="Full-time, Internship, etc."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company *</Label>
                    <Input 
                      id="company" 
                      name="company" 
                      value={experienceForm.company} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location" 
                      value={experienceForm.location} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                      placeholder="City, Country"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="period">Period *</Label>
                    <Input 
                      id="period" 
                      name="period" 
                      value={experienceForm.period} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                      placeholder="Jan 2023 - Present"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyUrl">Company URL</Label>
                    <Input 
                      id="companyUrl" 
                      name="companyUrl" 
                      value={experienceForm.companyUrl} 
                      onChange={handleExperienceFormChange}
                      className="bg-black/50 border-primary/30"
                      placeholder="https://company.com"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      value={experienceForm.description} 
                      onChange={handleExperienceFormChange}
                      rows={5}
                      className="bg-black/50 border-primary/30"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="skills">Skills</Label>
                    <div className="flex gap-2">
                      <Input
                        id="newSkill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="bg-black/50 border-primary/30"
                        placeholder="Add skill"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="border-primary text-primary hover:bg-primary/10"
                        onClick={handleAddSkill}
                      >
                        Add
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {experienceForm.skills?.map((skill, index) => (
                        <div key={index} className="bg-primary/10 px-2 py-1 rounded-full flex items-center gap-1">
                          <span className="text-primary text-xs">{skill}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            className="h-4 w-4 p-0 text-primary hover:bg-primary/10 rounded-full"
                            onClick={() => handleRemoveSkill(index)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10"
                    onClick={() => setIsEditExpDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-primary hover:bg-primary/80 text-background"
                    onClick={handleSaveExperience}
                  >
                    Update Experience
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
}