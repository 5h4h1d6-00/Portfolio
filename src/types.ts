export interface Project {
  id: string;
  title: string;
  category: "android" | "web" | "game";
  description: string;
  features: string[];
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  iconName: string;
  imageUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  description?: string;
  iconName: string;
}

export interface SkillItem {
  name: string;
  level: number; // 0 to 100 for level indicator
  iconName: string;
  category: "language" | "technology" | "database" | "knowledge" | "office";
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
