import { useState } from "react";
import { 
  Code, Terminal, Binary, Cpu, Layers, Smartphone, Globe, Palette, FileCode,
  GitBranch, Github, Layout, Flame, Monitor, Database, Server, GitMerge, 
  Briefcase, Workflow, Network, Settings, Wrench, ClipboardCheck, DollarSign, 
  TrendingUp, FileSpreadsheet, Keyboard, FileText, Tv, AlignLeft, Sparkles, Award
} from "lucide-react";
import { SKILLS, PERSONAL_INFO } from "../data";

const iconMap: Record<string, any> = {
  Code: Code,
  Terminal: Terminal,
  Binary: Binary,
  Cpu: Cpu,
  Layers: Layers,
  Smartphone: Smartphone,
  Globe: Globe,
  Palette: Palette,
  FileCode: FileCode,
  GitBranch: GitBranch,
  Github: Github,
  Layout: Layout,
  Flame: Flame,
  Monitor: Monitor,
  Database: Database,
  Server: Server,
  GitMerge: GitMerge,
  Briefcase: Briefcase,
  Workflow: Workflow,
  Network: Network,
  Settings: Settings,
  Wrench: Wrench,
  ClipboardCheck: ClipboardCheck,
  DollarSign: DollarSign,
  TrendingUp: TrendingUp,
  FileSpreadsheet: FileSpreadsheet,
  Keyboard: Keyboard,
  FileText: FileText,
  Tv: Tv,
  AlignLeft: AlignLeft
};

export function SkillsGrid() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Skills" },
    { id: "language", label: "Languages" },
    { id: "technology", label: "Technologies" },
    { id: "database", label: "Databases" },
    { id: "knowledge", label: "Computer Science" },
    { id: "office", label: "Professional & Office" }
  ];

  const filteredSkills = activeCategory === "all" 
    ? SKILLS 
    : SKILLS.filter(skill => skill.category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center pb-4 border-b border-white/5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
              activeCategory === cat.id
                ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white border-transparent shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                : "bg-slate-950/60 text-slate-400 border-white/5 hover:text-white hover:border-white/10"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Speed Typing & Certificate Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Typing Speed Hero Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950/80 to-slate-900/40 border border-white/10 hover:border-sky-500/20 transition duration-300 flex items-center gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-sky-500/[0.03] rounded-full blur-3xl group-hover:bg-sky-500/[0.05] transition-colors"></div>
          <div className="p-4 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
            <Keyboard className="w-8 h-8 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] tracking-wider text-amber-400 font-bold uppercase">Professional Metric</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-1">
              Typing Speed: <span className="text-sky-400">{PERSONAL_INFO.typingSpeed}</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Highly proficient alphanumeric touch keyboarding optimized for database inputs, speed-coding, and accounting workflows.
            </p>
          </div>
        </div>

        {/* Core Methodology Highlights */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950/80 to-slate-900/40 border border-white/10 hover:border-sky-500/20 transition duration-300 flex items-center gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/[0.03] rounded-full blur-3xl group-hover:bg-indigo-500/[0.05] transition-colors"></div>
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-[10px] tracking-wider text-amber-400 font-bold uppercase">Work Ethic</span>
            </div>
            <h4 className="text-xl font-bold text-white mb-1">
              Agile & Open Source
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Deep understanding of OOP principles, system data structures, and optimized algorithm designs paired with standard Git/GitHub collaborative flows.
            </p>
          </div>
        </div>
      </div>

      {/* Grid of Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSkills.map((skill, index) => {
          const IconComponent = iconMap[skill.iconName] || Code;
          return (
            <div
              key={`${skill.name}-${index}`}
              id={`skill-card-${index}`}
              className="p-4 rounded-xl bg-slate-950/40 hover:bg-slate-950/60 border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-slate-900 text-slate-400 group-hover:text-sky-400 transition-colors">
                  <IconComponent className="w-4 h-4" />
                </div>
                <h5 className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors">
                  {skill.name}
                </h5>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                  <span>Proficiency</span>
                  <span className="text-slate-400 group-hover:text-sky-400 transition-colors font-mono">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full group-hover:from-sky-500 group-hover:to-indigo-600 transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
