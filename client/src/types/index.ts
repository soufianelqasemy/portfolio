// Asset type for referenced files
export type Asset = {
  path: string;
  filename: string;
};

// Education type
export type Education = {
  degree: string;
  institution: string;
  location: string;
  period: string;
};

// Experience type
export type Experience = {
  position: string;
  type: string;
  company: string;
  location: string;
  period: string;
  description: string;
  skills: string[];
  companyUrl?: string;
};

// Project type
export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  detailedDescription?: string;
  features?: string[];
  challenges?: string[];
  outcome?: string;
  gallery?: string[];
};

// Skill type
export type Skill = {
  name: string;
  level: number;
};

// Skill category type
export type SkillCategory = {
  name: string;
  skills: Skill[];
};

// Language type
export type Language = {
  name: string;
  level: number;
  proficiency: string;
};

// Contact form data type
export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};
