import { GraduationCap, Keyboard, Calculator } from "lucide-react";
import { EducationItem } from "../types";

const iconMap: Record<string, any> = {
  GraduationCap: GraduationCap,
  Keyboard: Keyboard,
  Calculator: Calculator
};

interface TimelineProps {
  items: EducationItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-12 py-4">
      {items.map((item, index) => {
        const IconComponent = iconMap[item.iconName] || GraduationCap;

        return (
          <div key={item.id} className="relative pl-8 md:pl-12 group" id={`timeline-${item.id}`}>
            {/* Glowing timeline node dot */}
            <div className="absolute -left-[17px] top-0.5 p-1.5 rounded-full bg-slate-950 border-2 border-slate-700 text-slate-400 group-hover:border-sky-500 group-hover:text-sky-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10">
              <IconComponent className="w-4 h-4 md:w-5 h-5" />
            </div>

            {/* Content card */}
            <div className="p-6 rounded-2xl bg-slate-950/40 hover:bg-slate-950/60 border border-white/5 hover:border-sky-500/20 transition-all duration-300 shadow-lg relative overflow-hidden">
              {/* Soft decorative background glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/[0.02] rounded-full blur-2xl group-hover:bg-sky-500/[0.04] transition-colors"></div>

              {/* Timeframe block */}
              <span className="inline-block text-[10px] uppercase font-bold tracking-widest text-sky-400 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 mb-3">
                {item.duration}
              </span>

              {/* Course Title */}
              <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                {item.degree}
              </h3>

              {/* Institution */}
              <h4 className="text-xs sm:text-sm font-semibold text-slate-400 mb-3">
                {item.institution}
              </h4>

              {/* Description */}
              {item.description && (
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
