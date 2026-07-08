import React, { useState, useEffect, useRef } from "react";
import { 
  Sun, Moon, Terminal, Search, Menu, X, ChevronDown, ArrowUp, ExternalLink, 
  FileText, Award, Download, Eye, Github, Mail, Linkedin, Instagram, Code, 
  Briefcase, GraduationCap, Laptop, Sparkles, HelpCircle, Keyboard, Compass,
  Printer, Check
} from "lucide-react";

import { PERSONAL_INFO, EDUCATION_TIMELINE, PROJECTS_DATA, CERTIFICATES, INTERESTS, SOFT_SKILLS } from "./data";
import { AIHelper } from "./components/AIHelper";
import { ProjectCard } from "./components/ProjectCard";
import { Timeline } from "./components/Timeline";
import { SkillsGrid } from "./components/SkillsGrid";
import { GitHubSection } from "./components/GitHubSection";
import { ContactSection } from "./components/ContactSection";

// --- Particle Background Engine ---
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }[] = [];

    // Dense distribution of particles for immersive starfield feel
    const particleCount = Math.min(Math.floor((width * height) / 15000), 100);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1
      });
    }

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const themeIsDark = document.documentElement.classList.contains("dark");
      ctx.strokeStyle = themeIsDark ? "rgba(56, 189, 248, 0.06)" : "rgba(14, 165, 233, 0.12)";
      ctx.fillStyle = themeIsDark ? "rgba(56, 189, 248, 0.4)" : "rgba(14, 165, 233, 0.5)";

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Bounce borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse avoidance vector
        if (mouse.x !== -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = (110 - dist) / 110 * 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Custom Cursor States
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHovering, setCursorHovering] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);

  // typing text machine states
  const [titleIdx, setTitleIdx] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Command Palette & Shortcut Guides
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [paletteSearch, setPaletteSearch] = useState("");
  const [showShortcutDrawer, setShowShortcutDrawer] = useState(false);

  // Certificates Previews Modal
  const [previewCert, setPreviewCert] = useState<any | null>(null);

  // Resume Download Hub Modal
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Projects Filter Category
  const [projectFilter, setProjectFilter] = useState<"all" | "android" | "web" | "game">("all");

  // UTC Date Tracker
  const [utcTime, setUtcTime] = useState("");

  // 1. Initial Loader Timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  // 2. Local Time Tracker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().replace("GMT", "UTC"));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Theme Application and Hydration
  useEffect(() => {
    const stored = localStorage.getItem("shahid-portfolio-theme");
    if (stored === "light") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("shahid-portfolio-theme", "light");
    } else {
      setTheme("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("shahid-portfolio-theme", "dark");
    }
  };

  // 4. Scroll Watchers (Back-to-top & Progress bar)
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 5. Custom Cursor Tracker
  useEffect(() => {
    const checkMouse = (e: MouseEvent) => {
      setHasMouse(true);
      setCursorPos({ x: e.clientX, y: e.clientY });
      
      // Determine if hovering over cursor elements
      const target = e.target as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === "pointer" || 
                        target.closest("button") || 
                        target.closest("a") || 
                        target.closest("input") ||
                        target.closest("textarea") ||
                        target.classList.contains("cursor-pointer");
      setCursorHovering(!!isPointer);
    };

    window.addEventListener("mousemove", checkMouse);
    return () => window.removeEventListener("mousemove", checkMouse);
  }, []);

  // 6. Typing Animation Logic
  useEffect(() => {
    const currentWord = PERSONAL_INFO.titles[titleIdx];
    let typingSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && typingText === currentWord) {
      typingSpeed = 1600; // Stay static on word
      setIsDeleting(true);
    } else if (isDeleting && typingText === "") {
      setIsDeleting(false);
      setTitleIdx((prev) => (prev + 1) % PERSONAL_INFO.titles.length);
      typingSpeed = 200;
    }

    const typingTimer = setTimeout(() => {
      setTypingText((prev) => {
        if (isDeleting) {
          return currentWord.substring(0, prev.length - 1);
        } else {
          return currentWord.substring(0, prev.length + 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [typingText, isDeleting, titleIdx]);

  // 7. Keyboard Shortcuts and Command Palette Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette: Ctrl + K or Cmd + K or 'k' alone if not inside input
      const targetTag = (e.target as HTMLElement).tagName.toLowerCase();
      const isInput = targetTag === "input" || targetTag === "textarea";

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      } else if (e.key === "k" && !isInput && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }

      // Quick actions if not inside text input
      if (!isInput) {
        if (e.key.toLowerCase() === "t") {
          e.preventDefault();
          toggleTheme();
        }
        if (e.key.toLowerCase() === "c") {
          e.preventDefault();
          scrollToSection("contact");
        }
        if (e.key.toLowerCase() === "p") {
          e.preventDefault();
          scrollToSection("projects");
        }
        if (e.key.toLowerCase() === "g") {
          e.preventDefault();
          scrollToSection("github");
        }
        if (e.key.toLowerCase() === "a") {
          e.preventDefault();
          const fab = document.getElementById("ai-helper-fab");
          fab?.click();
        }
        if (e.key.toLowerCase() === "h") {
          e.preventDefault();
          setShowShortcutDrawer((prev) => !prev);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [theme]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
      setIsPaletteOpen(false);
    }
  };

  const downloadTextResume = () => {
    const separator = "=========================================================";
    const subSeparator = "---------------------------------------------------------";
    let content = `
${separator}
SHAHID SALEEM ITOO - SOFTWARE & MOBILE DEVELOPER RESUME
${separator}

CONTACT INFORMATION:
- Email: ${PERSONAL_INFO.email}
- GitHub: ${PERSONAL_INFO.github}
- LinkedIn: ${PERSONAL_INFO.linkedin}
- Instagram: ${PERSONAL_INFO.instagram}

SUMMARY:
${PERSONAL_INFO.aboutMe.join("\n")}

EDUCATION HISTORY:
${EDUCATION_TIMELINE.map(edu => `
* ${edu.degree}
  Institution: ${edu.institution}
  Duration: ${edu.duration}
  Details: ${edu.description}
`).join("\n")}

TECHNICAL COMPETENCIES & SKILLS:
- Languages: C, C++, Python, JavaScript, PHP, Kotlin, HTML5, CSS3, XML
- Technologies: Git, GitHub, Bootstrap, Firebase, Android Studio, Responsive Web Design
- Databases: SQL, DBMS
- Concepts: Data Structures, OOP, Algorithms, Computer Networks, Operating Systems, Debugging

FEATURED PROJECTS:
${PROJECTS_DATA.map(p => `
* ${p.title} [Category: ${p.category.toUpperCase()}]
  Description: ${p.description}
  Key Highlights:
    ${p.features.map(f => `- ${f}`).join("\n    ")}
  Technologies Used: ${p.tags.join(", ")}
`).join("\n")}

PROFESSIONAL CERTIFICATIONS:
${CERTIFICATES.map(cert => `
* ${cert.title}
  Issuer: ${cert.issuer}
  Year: ${cert.date}
  ID: ${cert.credentialId}
  Description: ${cert.description}
`).join("\n")}

INTERESTS:
${INTERESTS.map(i => `- ${i.name}`).join("\n")}

${separator}
Generated dynamically on ${new Date().toLocaleDateString()}
${separator}
    `.trim();

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Shahid_Saleem_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadHtmlResume = () => {
    let content = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Resume - Shahid Saleem Itoo</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1e293b; max-width: 800px; margin: 40px auto; padding: 20px; background-color: #f8fafc; }
    h1 { color: #0f172a; border-bottom: 3px solid #0ea5e9; padding-bottom: 10px; margin-bottom: 5px; }
    .subtitle { font-size: 1.1em; color: #64748b; font-weight: 600; margin-bottom: 25px; }
    h2 { color: #1e293b; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; margin-top: 30px; }
    .section { margin-bottom: 25px; }
    .contact-info { display: flex; flex-wrap: wrap; gap: 15px; margin-bottom: 20px; font-size: 0.9em; }
    .contact-info a { color: #0ea5e9; text-decoration: none; font-weight: 500; }
    .item { margin-bottom: 15px; }
    .item-title { font-weight: bold; color: #0f172a; display: flex; justify-content: space-between; }
    .item-subtitle { font-style: italic; color: #475569; font-size: 0.95em; }
    .tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 5px; }
    .tag { background: #e0f2fe; color: #0369a1; padding: 2px 8px; border-radius: 4px; font-size: 0.8em; font-weight: 600; }
    ul { margin: 5px 0 0 20px; padding: 0; }
    li { margin-bottom: 4px; }
  </style>
</head>
<body>
  <h1>Shahid Saleem Itoo</h1>
  <div class="subtitle">Software Developer | Android Developer | Web Developer</div>
  
  <div class="contact-info">
    <span>Email: <a href="mailto:${PERSONAL_INFO.email}">${PERSONAL_INFO.email}</a></span>
    <span>GitHub: <a href="${PERSONAL_INFO.github}">${PERSONAL_INFO.github}</a></span>
    <span>LinkedIn: <a href="${PERSONAL_INFO.linkedin}">${PERSONAL_INFO.linkedin}</a></span>
    <span>Instagram: <a href="${PERSONAL_INFO.instagram}">${PERSONAL_INFO.instagram}</a></span>
  </div>

  <div class="section">
    <h2>About Me</h2>
    <p>${PERSONAL_INFO.aboutMe.join(" ")}</p>
  </div>

  <div class="section">
    <h2>Education</h2>
    ${EDUCATION_TIMELINE.map(edu => `
      <div class="item">
        <div class="item-title">
          <span>${edu.degree}</span>
          <span>${edu.duration}</span>
        </div>
        <div class="item-subtitle">${edu.institution}</div>
        <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #475569;">${edu.description}</p>
      </div>
    `).join("")}
  </div>

  <div class="section">
    <h2>Featured Projects</h2>
    ${PROJECTS_DATA.map(p => `
      <div class="item">
        <div class="item-title">
          <span>${p.title}</span>
          <span style="font-size: 0.85em; color: #64748b; font-weight: normal;">${p.category.toUpperCase()}</span>
        </div>
        <p style="margin: 5px 0 5px 0; font-size: 0.9em;">${p.description}</p>
        <ul style="font-size: 0.85em; color: #334155;">
          ${p.features.map(f => `<li>${f}</li>`).join("")}
        </ul>
        <div class="tags">
          ${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </div>
    `).join("")}
  </div>

  <div class="section">
    <h2>Certifications</h2>
    ${CERTIFICATES.map(cert => `
      <div class="item">
        <div class="item-title">
          <span>${cert.title}</span>
          <span>${cert.date}</span>
        </div>
        <div class="item-subtitle">${cert.issuer} (ID: ${cert.credentialId})</div>
        <p style="margin: 5px 0 0 0; font-size: 0.9em; color: #475569;">${cert.description}</p>
      </div>
    `).join("")}
  </div>
</body>
</html>
    `.trim();

    const blob = new Blob([content], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Shahid_Saleem_Resume.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadResume = () => {
    setIsResumeModalOpen(true);
  };

  // Filter Command Palette Options
  const paletteOptions = [
    { name: "Go to Hero Top", action: () => scrollToSection("hero"), cat: "Navigation" },
    { name: "Go to About Shahid", action: () => scrollToSection("about"), cat: "Navigation" },
    { name: "Go to Education Timeline", action: () => scrollToSection("education"), cat: "Navigation" },
    { name: "Go to Interactive Skills Board", action: () => scrollToSection("skills"), cat: "Navigation" },
    { name: "Go to Custom Projects List", action: () => scrollToSection("projects"), cat: "Navigation" },
    { name: "Go to GitHub Analytics", action: () => scrollToSection("github"), cat: "Navigation" },
    { name: "Go to Contact Form", action: () => scrollToSection("contact"), cat: "Navigation" },
    { name: "Toggle Theme (Light/Dark)", action: () => { toggleTheme(); setIsPaletteOpen(false); }, cat: "System" },
    { name: "Open AI Recruiter Chatbot", action: () => { const fab = document.getElementById("ai-helper-fab"); fab?.click(); setIsPaletteOpen(false); }, cat: "AI Agent" },
    { name: "Trigger Resume Printing", action: () => { handleDownloadResume(); setIsPaletteOpen(false); }, cat: "Resume" }
  ];

  const filteredPaletteOptions = paletteOptions.filter(opt => 
    opt.name.toLowerCase().includes(paletteSearch.toLowerCase()) || 
    opt.cat.toLowerCase().includes(paletteSearch.toLowerCase())
  );

  const filteredProjects = projectFilter === "all"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === projectFilter);

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-500 overflow-x-hidden ${
      theme === "dark" ? "bg-[#020617] text-slate-100" : "bg-slate-50/90 text-slate-900"
    }`}>
      
      {/* 1. INITIAL LANDING LOADER SCREEN */}
      {initialLoading && (
        <div className="fixed inset-0 z-[9999] bg-[#020617] flex flex-col items-center justify-center font-mono">
          <div className="space-y-4 text-center p-6 max-w-sm">
            <div className="h-10 w-10 border-4 border-t-sky-400 border-r-indigo-500 border-l-slate-800 border-b-slate-800 rounded-full animate-spin mx-auto mb-6"></div>
            <div className="flex items-center gap-2 justify-center text-sky-400 text-sm">
              <Terminal className="w-4 h-4 animate-pulse" />
              <span>Initializing Shahid's Workspace...</span>
            </div>
            <p className="text-[11px] text-slate-500 tracking-wider">
              Compiling static vectors, booting neural helper & setting interface states...
            </p>
          </div>
        </div>
      )}

      {/* 2. DYNAMIC CANVAS PARTICLE BACKGROUND */}
      <ParticleCanvas />

      {/* 3. SCROLL PROGRESS INDICATOR */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-indigo-600 z-[999] transition-all duration-100 ease-out origin-left"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 4. CUSTOM SCIFI HOVER HALO CURSOR */}
      {hasMouse && (navigator.maxTouchPoints === 0) && (
        <div 
          className={`fixed pointer-events-none rounded-full z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ease-out border ${
            cursorHovering 
              ? "w-12 h-12 bg-sky-500/10 border-sky-400/80 shadow-[0_0_15px_rgba(56,189,248,0.3)]" 
              : "w-5 h-5 bg-sky-500/5 border-sky-400/30"
          }`}
          style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px` }}
        />
      )}

      {/* 5. FLOATING COMPANION AI CHATBOT (GEMINI INTERFACE) */}
      <AIHelper />

      {/* 6. FIXED KEYBOARD SHORTCUT HELPER PORTAL (BOTTOM LEFT) */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:block">
        <button
          onClick={() => setShowShortcutDrawer(!showShortcutDrawer)}
          className="p-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-sky-500/30 text-slate-400 hover:text-sky-400 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer"
          title="Keyboard Command Center"
        >
          <Keyboard className="w-5 h-5 animate-float" />
        </button>

        {showShortcutDrawer && (
          <div className="absolute bottom-16 left-0 w-64 p-5 rounded-2xl bg-slate-950/95 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200 text-xs text-slate-400 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Laptop className="w-4 h-4 text-sky-400" /> Key bindings
              </span>
              <button onClick={() => setShowShortcutDrawer(false)} className="text-slate-500 hover:text-white p-0.5 rounded">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2 font-mono">
              <div className="flex justify-between"><span>Ctrl + K / K</span> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-white font-sans font-bold">Palette</kbd></div>
              <div className="flex justify-between"><span>Key T</span> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-white font-sans font-bold">Theme</kbd></div>
              <div className="flex justify-between"><span>Key C</span> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-white font-sans font-bold">Contact</kbd></div>
              <div className="flex justify-between"><span>Key P</span> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-white font-sans font-bold">Projects</kbd></div>
              <div className="flex justify-between"><span>Key G</span> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-white font-sans font-bold">GitHub</kbd></div>
              <div className="flex justify-between"><span>Key A</span> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-white font-sans font-bold">AI Bot</kbd></div>
              <div className="flex justify-between"><span>Key H</span> <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-white font-sans font-bold">Hide</kbd></div>
            </div>
          </div>
        )}
      </div>

      {/* 7. GLASS STICKY HEADER */}
      <header className={`sticky top-0 z-50 transition-all border-b ${
        theme === "dark" 
          ? "bg-[#020617]/70 border-white/[0.04] backdrop-blur-md" 
          : "bg-white/80 border-slate-200 backdrop-blur-md text-slate-800"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Name */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="p-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-sky-400 via-indigo-400 to-indigo-500 bg-clip-text text-transparent">
              {PERSONAL_INFO.name}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-semibold tracking-wide">
            {["About", "Education", "Skills", "Projects", "GitHub", "Contact"].map((sect) => (
              <button
                key={sect}
                onClick={() => scrollToSection(sect.toLowerCase())}
                className="hover:text-sky-500 transition-colors cursor-pointer relative py-1 group focus:outline-none"
              >
                {sect}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-sky-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Actions & Theme & Hamburger */}
          <div className="flex items-center gap-3">
            {/* Command Palette Button */}
            <button
              onClick={() => setIsPaletteOpen(true)}
              className="p-2 rounded-xl bg-slate-800/10 hover:bg-slate-800/20 dark:bg-white/5 dark:hover:bg-white/10 text-slate-400 hover:text-sky-400 border border-slate-300 dark:border-white/5 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Open Command Hub (Ctrl+K)"
            >
              <Search className="w-4 h-4" />
              <kbd className="hidden lg:inline px-1 rounded bg-slate-800 border border-white/10 text-[9px]">Ctrl+K</kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-800/10 hover:bg-slate-800/20 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 hover:text-sky-400 border border-slate-300 dark:border-white/5 transition cursor-pointer"
              title={theme === "dark" ? "Switch to Light theme" : "Switch to Dark theme"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden rounded-xl bg-slate-800/10 hover:bg-slate-800/20 dark:bg-white/5 dark:hover:bg-white/10 text-slate-500 border border-slate-300 dark:border-white/5 transition cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className={`md:hidden p-4 space-y-3 border-t animate-in fade-in slide-in-from-top-4 duration-300 ${
            theme === "dark" ? "bg-slate-950 border-white/5" : "bg-white border-slate-200"
          }`}>
            {["About", "Education", "Skills", "Projects", "GitHub", "Contact"].map((sect) => (
              <button
                key={sect}
                onClick={() => scrollToSection(sect.toLowerCase())}
                className="block w-full text-left py-2 px-3 rounded-xl hover:bg-sky-500/10 hover:text-sky-400 transition font-semibold text-sm cursor-pointer"
              >
                {sect}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 8. COMMAND PALETTE MODAL (CTRL+K) */}
      {isPaletteOpen && (
        <div className="fixed inset-0 z-[1000] bg-slate-950/80 backdrop-blur-sm flex items-start justify-center pt-[10vh] px-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl bg-[#090d23] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            {/* Header Input */}
            <div className="p-4 bg-slate-950/60 border-b border-white/5 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-500" />
              <input
                type="text"
                value={paletteSearch}
                onChange={(e) => setPaletteSearch(e.target.value)}
                placeholder="Search commands or sections... (e.g., 'Projects', 'AI')"
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500 text-sm sm:text-base focus:ring-0 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => setIsPaletteOpen(false)}
                className="text-[10px] px-2 py-1 bg-slate-900 hover:bg-slate-800 rounded border border-white/10 text-slate-400 font-mono"
              >
                ESC
              </button>
            </div>

            {/* Options List */}
            <div className="max-h-72 overflow-y-auto p-2">
              {filteredPaletteOptions.length > 0 ? (
                filteredPaletteOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={opt.action}
                    className="w-full p-3 rounded-xl hover:bg-sky-500/10 text-slate-300 hover:text-sky-300 text-xs sm:text-sm text-left flex items-center justify-between group transition cursor-pointer"
                  >
                    <span>{opt.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 border border-white/5 text-slate-500 group-hover:text-sky-400 group-hover:border-sky-500/20 font-bold uppercase tracking-wider">
                      {opt.cat}
                    </span>
                  </button>
                ))
              ) : (
                <div className="p-6 text-center text-slate-500 text-xs">
                  No matching workspace commands found.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 9. MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-24">

        {/* --- SECTION: HERO --- */}
        <section id="hero" className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-12 pt-6 lg:pt-12 relative">
          
          {/* Glass Card Column */}
          <div className="space-y-6 max-w-2xl relative z-10">
            {/* Small Sparkle Tag */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 animate-pulse text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Internship Ready</span>
            </div>

            {/* Display Headings */}
            <div className="space-y-2">
              <span className="text-sm font-semibold tracking-widest uppercase text-slate-500 font-mono">
                SALUTATIONS, I AM
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-white leading-none">
                {PERSONAL_INFO.fullName}
              </h1>
              
              {/* Animated text looping banner */}
              <div className="h-10 sm:h-12 flex items-center">
                <span className="text-lg sm:text-xl md:text-2xl font-mono text-slate-400">
                  A{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-indigo-500 font-semibold border-r-2 border-sky-400 animate-pulse pr-1">
                    {typingText}
                  </span>
                </span>
              </div>
            </div>

            {/* Brief introductory bio */}
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl">
              Currently pursuing a Bachelor of Computer Applications (BCA). Passionate about writing clean, reliable code, compiling robust Android utilities, and designing responsive browser frameworks.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-90 text-white text-xs sm:text-sm font-bold shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_25px_rgba(14,165,233,0.5)] transition-all duration-300 cursor-pointer"
              >
                View Projects
              </button>
              <button
                onClick={handleDownloadResume}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                Print Resume
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 rounded-xl bg-transparent hover:bg-slate-900/40 text-slate-300 hover:text-white border border-white/10 hover:border-sky-500/30 text-xs sm:text-sm font-bold transition cursor-pointer"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Large Premium Developer Illustration */}
          <div className="w-full max-w-md lg:max-w-lg shrink-0 relative flex justify-center">
            {/* Colorful ambient background blur */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 to-indigo-600/15 rounded-full blur-3xl -z-10 animate-mesh-1"></div>
            
            {/* Premium Sci-Fi Developer Workspace SVG */}
            <svg viewBox="0 0 500 500" className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] select-none">
              {/* Workspace Desk Base */}
              <rect x="50" y="420" width="400" height="15" rx="5" fill="#1e293b" opacity="0.9" />
              <line x1="100" y1="435" x2="60" y2="480" stroke="#0f172a" strokeWidth="20" strokeLinecap="round" />
              <line x1="400" y1="435" x2="440" y2="480" stroke="#0f172a" strokeWidth="20" strokeLinecap="round" />

              {/* Developer Desk Lamp */}
              <path d="M120,420 L120,280 Q120,250 150,250 L180,250" fill="none" stroke="#64748b" strokeWidth="6" />
              <ellipse cx="180" cy="250" rx="15" ry="8" fill="#38bdf8" />
              <polygon points="170,254 120,380 240,380" fill="url(#lamp-light)" opacity="0.15" />

              {/* Coding Laptop Shell */}
              <rect x="150" y="270" width="200" height="130" rx="8" fill="#334155" stroke="#475569" strokeWidth="3" />
              <rect x="160" y="280" width="180" height="110" rx="4" fill="#090d16" />
              
              {/* Laptop Keyboard base */}
              <polygon points="120,400 380,400 400,420 100,420" fill="#475569" />
              <rect x="180" y="414" width="140" height="4" rx="2" fill="#0f172a" />

              {/* Code Editor Window lines mock */}
              <rect x="170" y="295" width="40" height="8" rx="2" fill="#38bdf8" opacity="0.9" />
              <rect x="215" y="295" width="25" height="8" rx="2" fill="#818cf8" opacity="0.8" />
              <rect x="170" y="310" width="80" height="6" rx="1.5" fill="#a7f3d0" opacity="0.7" />
              <rect x="170" y="322" width="55" height="6" rx="1.5" fill="#fbcfe8" opacity="0.7" />
              <rect x="230" y="322" width="40" height="6" rx="1.5" fill="#38bdf8" opacity="0.8" />
              <rect x="170" y="334" width="90" height="6" rx="1.5" fill="#fde047" opacity="0.7" />
              <rect x="170" y="346" width="30" height="6" rx="1.5" fill="#38bdf8" opacity="0.7" />
              <rect x="205" y="346" width="45" height="6" rx="1.5" fill="#818cf8" opacity="0.6" />
              <rect x="170" y="358" width="70" height="6" rx="1.5" fill="#a7f3d0" opacity="0.8" />
              <rect x="170" y="370" width="100" height="6" rx="1.5" fill="#fbcfe8" opacity="0.7" />

              {/* Side Floating Android Mock */}
              <rect x="375" y="240" width="45" height="90" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <rect x="380" y="250" width="35" height="70" rx="3" fill="#0f172a" />
              {/* Android Robot logo mock */}
              <circle cx="397" cy="285" r="8" fill="#a7f3d0" opacity="0.8" />
              <line x1="392" y1="272" x2="394" y2="277" stroke="#a7f3d0" strokeWidth="1.5" />
              <line x1="402" y1="272" x2="400" y2="277" stroke="#a7f3d0" strokeWidth="1.5" />

              {/* Floating Spherical UI Nodes */}
              <circle cx="100" cy="180" r="14" fill="url(#grad-blue)" opacity="0.8" />
              <polyline points="95,180 99,183 105,176" fill="none" stroke="#ffffff" strokeWidth="2.5" />

              <circle cx="410" cy="140" r="22" fill="url(#grad-indigo)" opacity="0.85" />
              <text x="396" y="146" fill="#ffffff" fontSize="18" fontFamily="monospace" fontWeight="bold">JS</text>

              <circle cx="250" cy="90" r="30" fill="url(#grad-cyan)" opacity="0.9" />
              <path d="M238,85 L262,85 M238,95 L262,95 M250,75 L250,105" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />

              <circle cx="440" cy="340" r="12" fill="#a7f3d0" opacity="0.2" className="animate-pulse" />

              {/* Define Gradient Colors */}
              <defs>
                <linearGradient id="lamp-light" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="grad-blue" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
                <linearGradient id="grad-indigo" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
                <linearGradient id="grad-cyan" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </section>

        {/* Scroll down indicator block */}
        <div className="flex justify-center pt-8">
          <button 
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-sky-400 transition group focus:outline-none cursor-pointer"
          >
            <span className="text-[10px] tracking-widest uppercase font-bold">Discover More</span>
            <ChevronDown className="w-5 h-5 animate-bounce group-hover:scale-110" />
          </button>
        </div>


        {/* --- SECTION: ABOUT ME --- */}
        <section id="about" className="space-y-12 pt-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white">About Me</h2>
            <div className="h-1 w-12 bg-sky-500 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">A glimpse into my background & soft skills</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Text Narrative */}
            <div className="lg:col-span-3 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Laptop className="w-5 h-5 text-sky-400" />
                Who is Shahid Saleem?
              </h3>
              
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {PERSONAL_INFO.aboutMe.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Spoken Languages Row */}
              <div className="pt-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Spoken Languages:</h4>
                <div className="flex gap-2">
                  {PERSONAL_INFO.languages.map((l) => (
                    <span key={l} className="px-3.5 py-1 rounded-lg bg-slate-950/60 border border-white/5 text-slate-300 text-xs font-semibold">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Soft Skills & Interests Bento */}
            <div className="lg:col-span-2 space-y-6">
              {/* Soft Skills Panel */}
              <div className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Core Soft Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SOFT_SKILLS.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-white/5 hover:border-indigo-500/30 text-indigo-200 transition"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interests Panel */}
              <div className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sky-400" />
                  Primary Interests
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 text-xs">
                  {INTERESTS.map((int, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-900 border border-white/[0.03]">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                      <span>{int.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Certificates Bento Section */}
          <div className="pt-8 space-y-6">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg font-bold text-white">Professional Certifications</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-amber-500/20 transition duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
                        {cert.date}
                      </span>
                      <Award className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {cert.title}
                    </h4>
                    <span className="text-xs text-slate-400 block">{cert.issuer}</span>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">{cert.description}</p>
                  </div>

                  <div className="flex gap-3 pt-5 border-t border-white/5 mt-5">
                    <button
                      onClick={() => setPreviewCert(cert)}
                      className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 hover:border-white/20 transition cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview Credential
                    </button>
                    <button
                      onClick={handleDownloadResume}
                      className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:opacity-90 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Get PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* --- SECTION: EDUCATION TIMELINE --- */}
        <section id="education" className="space-y-12 pt-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white">Education History</h2>
            <div className="h-1 w-12 bg-sky-500 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">My academic and skill qualifications path</p>
          </div>

          <Timeline items={EDUCATION_TIMELINE} />
        </section>


        {/* --- SECTION: SKILLS --- */}
        <section id="skills" className="space-y-12 pt-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white">Technical Competencies</h2>
            <div className="h-1 w-12 bg-sky-500 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">Filterable board of programming languages & skills</p>
          </div>

          <SkillsGrid />
        </section>


        {/* --- SECTION: PROJECTS --- */}
        <section id="projects" className="space-y-12 pt-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white">Featured Projects</h2>
            <div className="h-1 w-12 bg-sky-500 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">A collection of custom applications, utilities, & games</p>
          </div>

          {/* Project Filtering Controls */}
          <div className="flex justify-center gap-2 pb-4 border-b border-white/5">
            {[
              { id: "all", label: "All Projects" },
              { id: "android", label: "Android Apps" },
              { id: "web", label: "Web Sites" },
              { id: "game", label: "Interactive Games" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setProjectFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase border transition cursor-pointer ${
                  projectFilter === tab.id
                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-transparent shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                    : "bg-slate-950/60 text-slate-400 border-white/5 hover:text-white hover:border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects Grid Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>


        {/* --- SECTION: GITHUB --- */}
        <section id="github" className="space-y-12 pt-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white">GitHub Analytics</h2>
            <div className="h-1 w-12 bg-sky-500 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">Live simulation of open-source streaks and contribution boards</p>
          </div>

          <GitHubSection />
        </section>


        {/* --- SECTION: CONTACT --- */}
        <section id="contact" className="space-y-12 pt-12 pb-12">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-display font-bold tracking-tight text-white">Get In Touch</h2>
            <div className="h-1 w-12 bg-sky-500 mx-auto rounded-full"></div>
            <p className="text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">Reach out for collaborations, interviews, or project consults</p>
          </div>

          <ContactSection />
        </section>

      </main>

      {/* 10. MODAL: CERTIFICATE PREVIEW DIALOG */}
      {previewCert && (
        <div className="fixed inset-0 z-[1001] bg-slate-950/90 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-2xl bg-[#090d23] border border-amber-500/20 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.15)] overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-slate-950/60 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Award className="w-4 h-4" /> Certification Credential Document
              </span>
              <button
                onClick={() => setPreviewCert(null)}
                className="text-slate-400 hover:text-white hover:bg-white/5 p-1 rounded transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Custom SVG Mock Certificate Preview */}
            <div className="p-6 sm:p-10 bg-slate-950 flex justify-center">
              <div className="w-full max-w-lg aspect-[1.414/1] rounded-lg border-4 border-double border-amber-500/30 p-6 flex flex-col justify-between text-center relative bg-gradient-to-br from-slate-950 to-slate-900 overflow-hidden">
                {/* Visual watermark background glow */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                  <Award className="w-64 h-64 text-amber-400" />
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] tracking-widest font-extrabold uppercase text-amber-400 block">DIPLOMA CREDENTIAL</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display leading-tight">{previewCert.title}</h3>
                  <p className="text-xs text-slate-400 italic">This is to certify that the specified course specifications were completed successfully by</p>
                  <h4 className="text-lg sm:text-xl font-bold text-sky-400 font-mono tracking-tight">{PERSONAL_INFO.fullName}</h4>
                </div>

                <div className="space-y-2 mt-6">
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">{previewCert.description}</p>
                  <div className="flex justify-between items-center text-[9px] text-slate-500 pt-6 border-t border-white/5 font-mono">
                    <span>ID: {previewCert.credentialId}</span>
                    <span>ISSUED BY: {previewCert.issuer}</span>
                    <span>DATE: {previewCert.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer triggers */}
            <div className="p-4 bg-slate-950/60 border-t border-white/5 flex justify-end gap-3">
              <button
                onClick={() => setPreviewCert(null)}
                className="px-4 py-2 text-xs rounded-xl bg-slate-900 border border-white/5 text-slate-300 hover:bg-slate-800 transition cursor-pointer"
              >
                Close View
              </button>
              <button
                onClick={handleDownloadResume}
                className="px-4 py-2 text-xs rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:opacity-90 transition flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Get PDF Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RESUME DOWNLOAD HUB MODAL */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 z-[1001] bg-slate-950/90 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-lg bg-[#090d23] border border-sky-500/20 rounded-2xl shadow-[0_0_50px_rgba(14,165,233,0.15)] overflow-hidden">
            {/* Header */}
            <div className="p-4 bg-slate-950/60 border-b border-white/5 flex items-center justify-between">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Shahid Saleem's Resume Download Hub
              </span>
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="text-slate-400 hover:text-white hover:bg-white/5 p-1 rounded transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="text-center space-y-2">
                <div className="inline-flex p-3 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-2">
                  <Award className="w-6 h-6 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-white">Select Your Preferred Format</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Download Shahid Saleem's professional developer profile in the format that best fits your review pipeline or ATS systems.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {/* PDF Print Option */}
                <button
                  onClick={() => {
                    setIsResumeModalOpen(false);
                    window.print();
                  }}
                  className="w-full p-4 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-white/5 hover:border-sky-500/30 text-left flex items-start gap-3.5 transition group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    <Printer className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">High-Fidelity PDF / Print Document</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Save as an elegant PDF directly from your browser. Perfectly configured with dedicated print-ready CSS styles.
                    </p>
                  </div>
                </button>

                {/* HTML Interactive Download */}
                <button
                  onClick={() => {
                    setIsResumeModalOpen(false);
                    downloadHtmlResume();
                  }}
                  className="w-full p-4 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-white/5 hover:border-sky-500/30 text-left flex items-start gap-3.5 transition group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                    <Code className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">Responsive HTML Resume File</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Download a standalone web-optimized HTML resume with built-in styling, links, and clean layouts.
                    </p>
                  </div>
                </button>

                {/* Plain Text Download */}
                <button
                  onClick={() => {
                    setIsResumeModalOpen(false);
                    downloadTextResume();
                  }}
                  className="w-full p-4 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-white/5 hover:border-sky-500/30 text-left flex items-start gap-3.5 transition group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">Plain Text Resume (.txt / .md)</h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Download an ultra-clean, ATS-friendly plain text copy with structured Markdown and ASCII dividers.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-950/60 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-500">
              <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-emerald-500" /> Fully Optimized for ATS Review</span>
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-white/10 text-slate-300 transition cursor-pointer text-xs"
              >
                Close Hub
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 11. MODERN PORTFOLIO FOOTER */}
      <footer className={`border-t py-12 transition-colors ${
        theme === "dark" ? "bg-slate-950/80 border-white/[0.04]" : "bg-white border-slate-200"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyrights */}
          <div className="text-xs text-slate-500 text-center md:text-left space-y-1.5">
            <p className="font-bold tracking-tight text-slate-400 flex items-center gap-1.5 justify-center md:justify-start">
              <Code className="w-4 h-4 text-sky-400" /> Crafted by Shahid Saleem Saleem
            </p>
            <p>© 2026 {PERSONAL_INFO.name}. All Rights Reserved.</p>
          </div>

          {/* Time & Availability Badge */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-white/5 font-mono text-[10px] text-slate-400 text-center space-y-1 flex flex-col items-center">
            <span className="flex items-center gap-1.5 font-bold text-sky-400 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              LIVE VISITOR RECORD TERMINAL
            </span>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-3 text-slate-500">
              <span>Time: <span className="text-slate-300">{utcTime || "..."}</span></span>
              <span className="hidden sm:inline">|</span>
              <span>Coordinates: <span className="text-slate-300">UT-ASIA/S-EAST-1</span></span>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex gap-4">
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800/10 hover:bg-slate-800/20 dark:bg-white/5 text-slate-400 hover:text-white transition">
              <Github className="w-4.5 h-4.5" />
            </a>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800/10 hover:bg-slate-800/20 dark:bg-white/5 text-slate-400 hover:text-blue-400 transition">
              <Linkedin className="w-4.5 h-4.5" />
            </a>
            <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800/10 hover:bg-slate-800/20 dark:bg-white/5 text-slate-400 hover:text-pink-400 transition">
              <Instagram className="w-4.5 h-4.5" />
            </a>
            <a href={`mailto:${PERSONAL_INFO.email}`} className="p-2.5 rounded-xl bg-slate-800/10 hover:bg-slate-800/20 dark:bg-white/5 text-slate-400 hover:text-sky-400 transition">
              <Mail className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </footer>

      {/* 12. BACK TO TOP SCROLL BUTTON */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-24 z-40 p-3.5 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-sky-500/30 text-slate-400 hover:text-sky-400 transition shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-center cursor-pointer group"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
        </button>
      )}

    </div>
  );
}
