import React from "react";
import { Cpu, Terminal, Compass, Codepen, GitPullRequest } from "lucide-react";

export default function RunningTicker() {
  const brands = [
    { name: "Claude", logo: <Cpu className="w-4 h-4 text-orange-400" />, desc: "Anthropic AI" },
    { name: "Gemini", logo: <Terminal className="w-4 h-4 text-blue-400 font-bold" />, desc: "Google Brain" },
    { name: "GitHub", logo: <Compass className="w-4 h-4 text-purple-400" />, desc: "Git VCS Hub" },
    { name: "Clanker.world", logo: <Codepen className="w-4 h-4 text-emerald-400" />, desc: "Solana Agent Hub" },
    { name: "npm", logo: <GitPullRequest className="w-4 h-4 text-red-400" />, desc: "JS Engine Registry" },
  ];

  // Repeat twice for gapless infinite scrolling
  const list = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="w-full bg-slate-950/90 border-y border-cyan-500/20 py-2.5 overflow-hidden relative backdrop-blur-md">
      {/* Glow overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

      {/* Styled inject for smooth marquee animation */}
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-custom {
          display: flex;
          width: max-content;
          animation: marquee-scroll 35s linear infinite;
        }
        .animate-marquee-custom:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="animate-marquee-custom flex gap-12 items-center">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-950/20 border border-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.05)] hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all cursor-default"
          >
            <div className="p-1 rounded bg-black/40 shadow-inner">
              {item.logo}
            </div>
            <span className="font-mono text-sm font-semibold tracking-wider text-cyan-100">
              {item.name}
            </span>
            <span className="text-[10px] uppercase font-mono text-cyan-500/55 px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/10">
              {item.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
