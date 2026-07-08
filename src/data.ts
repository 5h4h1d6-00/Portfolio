import { Project, EducationItem, SkillItem } from "./types";

export const PERSONAL_INFO = {
  name: "Shahid Saleem",
  fullName: "Shahid Saleem Itoo",
  email: "shahidsaleemitoo@gmail.com",
  github: "https://github.com/shahidsaleemitoo",
  linkedin: "https://linkedin.com/in/shahidsaleemitoo",
  instagram: "https://instagram.com/shahid6_00",
  titles: [
    "Software Developer",
    "Android Developer",
    "Web Developer",
    "BCA Student",
    "Open Source Contributor",
    "Problem Solver"
  ],
  aboutMe: [
    "I am a Bachelor of Computer Applications (BCA) student with a passion for writing clean, efficient, and highly scalable software.",
    "I enjoy solving challenging problems, exploring modern web and mobile stacks, and contributing to open-source systems.",
    "My development philosophy focuses on crafting user-centric architectures, prioritizing performance, accessibility, and intuitive UI/UX design.",
    "Through continuous self-learning and building real-world projects, I aim to transform complex technical concepts into polished applications."
  ],
  typingSpeed: "50–54 WPM",
  languages: ["English", "Hindi", "Urdu"]
};

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "University of Kashmir",
    duration: "2024 - Present",
    description: "Focusing on core computer science subjects, database architectures, object-oriented concepts, and advanced application development.",
    iconName: "GraduationCap"
  },
  {
    id: "edu-2",
    degree: "Diploma in Data Entry Operator",
    institution: "National Institute of Electronics & IT",
    duration: "2023",
    description: "Mastered high-speed alphanumeric typing, professional document formatting, database records, and advanced spreadsheet analytics.",
    iconName: "Keyboard"
  },
  {
    id: "edu-3",
    degree: "Diploma in Accounting & Tally",
    institution: "Professional Commerce Academy",
    duration: "2023",
    description: "Detailed study of financial accounting principles, balance sheets, tax compliance, and automated bookkeeping using Tally Prime.",
    iconName: "Calculator"
  }
];

export const SKILLS: SkillItem[] = [
  // Programming Languages
  { name: "C", level: 90, iconName: "Code", category: "language" },
  { name: "C++", level: 85, iconName: "Terminal", category: "language" },
  { name: "Python", level: 80, iconName: "Binary", category: "language" },
  { name: "JavaScript", level: 88, iconName: "Cpu", category: "language" },
  { name: "PHP", level: 75, iconName: "Layers", category: "language" },
  { name: "Kotlin", level: 82, iconName: "Smartphone", category: "language" },
  { name: "HTML5", level: 95, iconName: "Globe", category: "language" },
  { name: "CSS3", level: 90, iconName: "Palette", category: "language" },
  { name: "XML", level: 80, iconName: "FileCode", category: "language" },

  // Technologies
  { name: "Git", level: 85, iconName: "GitBranch", category: "technology" },
  { name: "GitHub", level: 90, iconName: "Github", category: "technology" },
  { name: "Bootstrap", level: 88, iconName: "Layout", category: "technology" },
  { name: "Firebase", level: 78, iconName: "Flame", category: "technology" },
  { name: "Android Studio", level: 85, iconName: "Smartphone", category: "technology" },
  { name: "Responsive Web Design", level: 95, iconName: "Monitor", category: "technology" },

  // Database
  { name: "SQL", level: 85, iconName: "Database", category: "database" },
  { name: "DBMS", level: 88, iconName: "Server", category: "database" },

  // Technical Knowledge
  { name: "Data Structures (C)", level: 85, iconName: "GitMerge", category: "knowledge" },
  { name: "Object-Oriented Programming (OOP)", level: 88, iconName: "Briefcase", category: "knowledge" },
  { name: "Algorithms", level: 80, iconName: "Workflow", category: "knowledge" },
  { name: "Web Development", level: 92, iconName: "Globe", category: "knowledge" },
  { name: "Android Development", level: 85, iconName: "Smartphone", category: "knowledge" },
  { name: "Computer Networks", level: 78, iconName: "Network", category: "knowledge" },
  { name: "Operating Systems", level: 82, iconName: "Settings", category: "knowledge" },
  { name: "Debugging & Problem Solving", level: 90, iconName: "Wrench", category: "knowledge" },

  // Professional Skills
  { name: "Data Entry Operations", level: 95, iconName: "ClipboardCheck", category: "office" },
  { name: "Financial Accounting", level: 80, iconName: "DollarSign", category: "office" },
  { name: "Tally ERP / Prime Operator", level: 85, iconName: "TrendingUp", category: "office" },
  { name: "Microsoft Office Suite", level: 92, iconName: "FileSpreadsheet", category: "office" },
  { name: "Fast Keyboarding (50-54 WPM)", level: 95, iconName: "Keyboard", category: "office" },
  { name: "Documentation", level: 88, iconName: "FileText", category: "office" },
  { name: "Presentation Design", level: 90, iconName: "Tv", category: "office" },
  { name: "Report Formatting", level: 85, iconName: "AlignLeft", category: "office" }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    title: "Hadith Books Website",
    category: "web",
    description: "A world-class digital platform hosting several major collections of Hadith with seamless chapter navigation, reactive search indices, and elegant responsive typography.",
    features: [
      "Multiple Hadith Books integration",
      "Dynamic chapter-by-chapter list view",
      "Fuzzy Search for topics & sub-references",
      "Full offline caching & bookmark support",
      "Optimized load times under 1 second"
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "PHP", "Bootstrap", "SQL"],
    demoUrl: "#",
    githubUrl: PERSONAL_INFO.github,
    iconName: "BookOpen",
    imageUrl: "https://images.unsplash.com/photo-1609599006353-e629f1d00f18?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "proj-2",
    title: "Raahride Ride-Sharing App",
    category: "android",
    description: "A highly robust, reactive Uber-like ride-sharing utility for Android. Implements maps tracking, distance matrix fare calculations, and dynamic real-time ride states.",
    features: [
      "Real-time Google Maps and GPS integration",
      "Dynamic fair computation by distance",
      "Secure backend syncing via Firebase Realtime Database",
      "Dual client profile layouts (Rider & Driver)",
      "Instant push notices & status signals"
    ],
    tags: ["Kotlin", "Android Studio", "Firebase", "Google Maps", "XML"],
    demoUrl: "#",
    githubUrl: PERSONAL_INFO.github,
    iconName: "Car",
    imageUrl: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "proj-3",
    title: "Random Hadith App",
    category: "android",
    description: "A highly-rated spiritual Android application delivering beautifully styled Hadith daily. Features custom visual layout overlays, vector image export, and offline support.",
    features: [
      "Daily inspirational Quote system",
      "Vector layout generator for sharing quote cards",
      "Local Favorites database using SQLite/Room",
      "Full system dark mode compatibility",
      "Zero network requirement (Offline first)"
    ],
    tags: ["Kotlin", "Android Studio", "SQLite", "XML"],
    demoUrl: "#",
    githubUrl: PERSONAL_INFO.github,
    iconName: "Quote",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "proj-4",
    title: "Push ups Count App",
    category: "android",
    description: "An innovative Android fitness utility that uses the device's proximity sensor to count push-up repetitions, track progress graphs, and compute calorie burn rate.",
    features: [
      "Hands-free automatic repetition logging",
      "Interactive weekly/monthly progress statistics",
      "Local streak management engine",
      "Audible speech prompts and notifications",
      "Lightweight resource usage (under 5MB)"
    ],
    tags: ["Kotlin", "Android Studio", "Sensors API", "XML"],
    demoUrl: "#",
    githubUrl: PERSONAL_INFO.github,
    iconName: "Flame",
    imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "proj-5",
    title: "HD Camera App",
    category: "android",
    description: "A custom camera interface utilizing modern CameraX specifications. Allows manual aperture adjustments, focal depth locks, and live filter preview states.",
    features: [
      "Advanced CameraX integration for modern features",
      "Dynamic focus and zoom gesture tracking",
      "Offline non-destructive filters & overlays",
      "Fast storage buffer system",
      "Custom gallery picker panel"
    ],
    tags: ["Kotlin", "Android Studio", "CameraX API", "XML"],
    demoUrl: "#",
    githubUrl: PERSONAL_INFO.github,
    iconName: "Camera",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "proj-6",
    title: "Smart Task To-Do App",
    category: "android",
    description: "A modern, task-management client featuring nested checklists, drag-and-drop hierarchy, color-coded categorization, and robust notifications.",
    features: [
      "Rich sub-task hierarchy structures",
      "Dynamic reminder settings with system alarms",
      "Category tags with visual color anchors",
      "Complete Room database local storage",
      "Aesthetic completion animations"
    ],
    tags: ["Kotlin", "Android Studio", "Room Database", "XML"],
    demoUrl: "#",
    githubUrl: PERSONAL_INFO.github,
    iconName: "CheckSquare",
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "proj-7",
    title: "Motivation App",
    category: "android",
    description: "A daily inspiration and notification application crafted in Kotlin. Delivers tailored motivational widgets, customizable alerts, and journal logs.",
    features: [
      "Custom scheduled quote alerts",
      "Aesthetic floating layout widgets",
      "Local text journaling & reflection logging",
      "Elegant custom slide-in UI transitions",
      "Offline caching of over 5000+ quotes"
    ],
    tags: ["Kotlin", "Android Studio", "WorkManager", "XML"],
    demoUrl: "#",
    githubUrl: PERSONAL_INFO.github,
    iconName: "Compass",
    imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "proj-8",
    title: "Arcade Games Suite",
    category: "game",
    description: "A beautifully animated HTML5 game suite featuring responsive browser editions of Cricket, Badminton, and high-low Guessing Numbers.",
    features: [
      "2D physics & collision detection",
      "Intelligent reactive AI batting engine",
      "Interactive high score leaderboard lists",
      "Smooth touch controls for mobile screens",
      "Dynamic sound effects and retro style UI"
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Canvas API"],
    demoUrl: "#",
    githubUrl: PERSONAL_INFO.github,
    iconName: "Trophy",
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "proj-9",
    title: "Classic Retro Games",
    category: "game",
    description: "Premium browser-based remakes of Classic Snake, Tic-Tac-Toe, and a fully interactive Chess dashboard designed with beautiful custom animations.",
    features: [
      "Framer motion animation layer on Chess pieces",
      "Unbeatable Minimax AI bot for Tic-Tac-Toe",
      "Fluid grid movement animations in Snake",
      "Custom retro sound design and themes",
      "Mobile-optimized responsive game canvases"
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Framer Motion"],
    demoUrl: "#",
    githubUrl: PERSONAL_INFO.github,
    iconName: "Gamepad2",
    imageUrl: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&auto=format&fit=crop&q=80"
  }
];

export const CERTIFICATES = [
  {
    id: "cert-1",
    title: "Diploma in Data Entry Operator",
    issuer: "National Institute of Electronics & Information Technology (NIELIT)",
    date: "2023",
    description: "Awarded for completing advanced vocational courses in alphanumeric speeds, database formatting, spreadsheet models, and secretarial reports.",
    downloadUrl: "#",
    credentialId: "NIELIT-DEO-2023"
  },
  {
    id: "cert-2",
    title: "Diploma in Accounting & Tally Prime",
    issuer: "Professional Commerce Academy",
    date: "2023",
    description: "Certified proficiency in Double-Entry bookkeeping, Ledger creations, inventory management, taxation entries (GST), and automated Tally systems.",
    downloadUrl: "#",
    credentialId: "PCA-ACT-2023"
  }
];

export const INTERESTS = [
  { name: "Programming", iconName: "Code" },
  { name: "Software Development", iconName: "Layers" },
  { name: "Android Development", iconName: "Smartphone" },
  { name: "Mathematics", iconName: "Percent" },
  { name: "Artificial Intelligence", iconName: "Brain" },
  { name: "UI/UX Design", iconName: "Palette" },
  { name: "GitHub & Open Source", iconName: "Github" }
];

export const SOFT_SKILLS = [
  "Fast Learner",
  "Leadership",
  "Effective Communication",
  "Teamwork & Synergy",
  "Creative Solutioning",
  "Logical & Analytical Thinking",
  "Time Management",
  "Discipline",
  "Continuous Self-Learning"
];
