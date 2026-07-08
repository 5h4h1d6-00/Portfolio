import React from "react";
import { BookOpen, Car, Flame, Camera, CheckSquare, Compass, Trophy, Gamepad2, Github, ExternalLink, Quote, Folder } from "lucide-react";
import { Project } from "../types";

const iconMap: Record<string, any> = {
  BookOpen: BookOpen,
  Car: Car,
  Quote: Quote,
  Flame: Flame,
  Camera: Camera,
  CheckSquare: CheckSquare,
  Compass: Compass,
  Trophy: Trophy,
  Gamepad2: Gamepad2
};

interface ProjectCardProps {
  key?: string;
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const IconComponent = iconMap[project.iconName] || Folder;

  return (
    <div
      id={`project-card-${project.id}`}
      className="group relative rounded-2xl bg-slate-950/40 hover:bg-slate-950/60 border border-white/5 hover:border-sky-500/30 flex flex-col justify-between transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_10px_30px_rgba(14,165,233,0.1)] overflow-hidden"
    >
      {/* Dynamic Project Picture Cover */}
      {project.imageUrl && (
        <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-white/5 bg-slate-900">
          <img
            src={project.imageUrl}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          
          {/* Tag overlaid on the image */}
          <span className="absolute top-3 right-3 text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-sky-400">
            {project.category}
          </span>
        </div>
      )}

      {/* Content wrapper with conditional padding based on image presence */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Icon & Tag (Tag hidden if already shown over image) */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 text-sky-400 group-hover:text-white group-hover:border-sky-500/40 transition-all duration-300 shadow-md">
              <IconComponent className="w-5 h-5" />
            </div>
            {!project.imageUrl && (
              <span className="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400">
                {project.category}
              </span>
            )}
          </div>

          {/* Title & Desc */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Dynamic Key Features */}
          <div className="mb-4">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Key Highlights:</h4>
            <ul className="space-y-1">
              {project.features.map((feature, i) => (
                <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                  <span className="text-sky-500 mt-1 shrink-0">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-white/5">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2.5 py-0.5 rounded-md bg-slate-900 border border-white/5 text-slate-400 group-hover:text-slate-300 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <a
              href={project.githubUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 hover:border-white/20 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer"
            >
              <Github className="w-3.5 h-3.5" />
              Source
            </a>
            <a
              href={project.demoUrl || "#"}
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:opacity-90 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition duration-200 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
