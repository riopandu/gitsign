import React, { useState, useEffect } from "react";
import { Shield, Cpu, RefreshCw, Terminal, Layers } from "lucide-react";

interface GitsignLoaderProps {
  onComplete: () => void;
}

export default function GitsignLoader({ onComplete }: GitsignLoaderProps) {
  const [loadingStep, setLoadingStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    "CYBERNETIC COGNITIVE CORRIDOR: ONLINE",
    "DECRYPTING SECURE GITLAB WORKSPACE HANDSHAKE...",
    "LINKING CLAUDE & GEMINI DISTRIBUTED ENGINES...",
    "ESTABLISHING CLANKER NETWORK PERSISTENT SWAP APPARATUS...",
    "SYNCHRONIZING GIT CHANNELS & PIPELINE TEMPLATES...",
    "SECURING GITSIGN ORCHESTRATOR LAYER V3...",
    "READY TO INGEST REPOSITORY PARAMETERS."
  ];

  useEffect(() => {
    // Progress increment
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 35);

    // Text step increment
    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 500);

    // Completion timeout (approx 3.7 seconds total)
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3900);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden font-mono select-none">
      {/* Laser horizontal Scan Line effect */}
      <div className="absolute inset-x-0 h-[2px] bg-cyan-500/25 shadow-[0_0_12px_rgba(6,182,212,0.6)] top-0 animate-[scanline_6s_linear_infinite] pointer-events-none z-40" />
      
      {/* Glowing cyberpunk atmospheric backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Styled pure CSS for 3D glossy ellipse rotation matching the user's provided design */}
      <style>{`
        @keyframes scanline {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        
        /* 3D Orbit system container tilted forward slightly */
        .orbit-container {
          position: relative;
          width: 420px;
          height: 420px;
          perspective: 1200px;
          transform-style: preserve-3d;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Tilted ring holder */
        .orbit-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transform: rotateX(65deg) rotateY(-15deg);
          animation: main-spin 14s linear infinite;
        }

        @keyframes main-spin {
          0% { transform: rotateX(65deg) rotateY(-15deg) rotateZ(0deg); }
          100% { transform: rotateX(65deg) rotateY(-15deg) rotateZ(360deg); }
        }

        /* Styling each glowing glassmorphic 3D disc */
        .orbit-disc {
          position: absolute;
          width: 85px;
          height: 48px;
          left: 50%;
          top: 50%;
          margin-left: -42.5px;
          margin-top: -24px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.4) 0%, rgba(37, 99, 235, 0.4) 40%, rgba(6, 182, 212, 0.1) 85%);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(139, 92, 246, 0.65);
          box-shadow: 
            0 0 15px rgba(37, 99, 235, 0.25),
            inset 0 0 12px rgba(139, 92, 246, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
          transform-style: preserve-3d;
          transition: all 0.3s ease;
        }

        /* Distribute discs along the circular path and keep them perpendicular or slightly aligned */
        /* Formula: cos(angle) * radius, sin(angle) * r. Plus counteract the tilted rotation so they stay visible faces facing out */
        ${Array.from({ length: 11 }).map((_, i) => {
          const angle = (i * 360) / 11;
          const radius = 175; // radius in px
          return `
            .disc-${i} {
              transform: 
                rotateZ(${angle}deg) 
                translateX(${radius}px) 
                rotateZ(-${angle}deg) 
                rotateX(-65deg) 
                rotateY(15deg);
              animation: disc-glow-${i} 3s ease-in-out infinite alternate;
              animation-delay: ${i * 0.2}s;
            }
            @keyframes disc-glow-${i} {
              0% {
                box-shadow: 0 0 12px rgba(37, 99, 235, 0.25), inset 0 0 10px rgba(139, 92, 246, 0.3);
                border-color: rgba(139, 92, 246, 0.5);
              }
              100% {
                box-shadow: 0 0 25px rgba(6, 182, 212, 0.65), inset 0 0 18px rgba(37, 99, 235, 0.6);
                border-color: rgba(6, 182, 212, 0.85);
                background: radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.55) 0%, rgba(6, 182, 212, 0.55) 50%, rgba(37, 99, 235, 0.15) 90%);
              }
            }
          `;
        }).join("\n")}

        /* Hologram particle pulse in the center */
        .core-pulse {
          position: absolute;
          width: 140px;
          height: 140px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%);
          border: 1px dashed rgba(6, 182, 212, 0.2);
          animation: pulse-ring 2.5s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.85); opacity: 0.2; }
          50% { opacity: 0.8; }
          100% { transform: scale(1.35); opacity: 0; }
        }
      `}</style>

      {/* Main concentric orbit visual area */}
      <div className="relative w-[480px] h-[480px] flex items-center justify-center scale-90 sm:scale-100">
        
        {/* Hologram Pulse Rings */}
        <div className="core-pulse" style={{ animationDelay: "0s" }} />
        <div className="core-pulse" style={{ animationDelay: "0.8s" }} />
        <div className="core-pulse" style={{ animationDelay: "1.6s" }} />

        {/* Orbit System */}
        <div className="orbit-container">
          <div className="orbit-ring">
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} className={`orbit-disc disc-${i}`} />
            ))}
          </div>
        </div>

        {/* Inner static textual identifier "gitsign" exactly matching the provided image's centered branding format */}
        <div className="absolute flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <span className="font-sans text-3xl font-black uppercase tracking-[0.25em] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">
            gitsign
          </span>
          <div className="flex items-center gap-1.5 mt-2 bg-cyan-950/45 border border-cyan-500/20 px-2 py-0.5 rounded text-[9px] uppercase tracking-widest text-cyan-400 font-mono font-bold animate-pulse">
            <span className="relative flex h-1.5 w-1.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
            </span>
            <span>Agent initialization core</span>
          </div>
        </div>
      </div>

      {/* Loading sequence and metrics UI at bottom */}
      <div className="max-w-xl w-full px-6 flex flex-col items-center gap-3 mt-4 text-center z-30">
        {/* Progress bar container */}
        <div className="w-full max-w-sm h-1 bg-slate-950 rounded-full overflow-hidden border border-cyan-500/10">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center w-full max-w-sm text-[10px] font-mono text-cyan-500/75 px-1">
          <span>COGNITIVE SWARM SYSTEM</span>
          <span className="font-bold text-cyan-300">{progress}% BOUNDED</span>
        </div>

        {/* Current status trace step log line */}
        <div className="h-6 flex items-center justify-center">
          <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold animate-pulse max-w-md line-clamp-1">
            &gt; {steps[loadingStep]}
          </p>
        </div>

        {/* Explanatory telemetry flags */}
        <div className="flex gap-4 text-[9px] text-slate-500/80 mt-2">
          <span className="flex items-center gap-1">
            <Cpu className="w-3 h-3 text-cyan-500" /> GEMINI V3.5
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3 text-cyan-500" /> SECURE HANDSHAKE
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-cyan-400/80">
            <Terminal className="w-3 h-3" /> BYPASS AGENT BOOT
          </span>
        </div>

        {/* Option to skip loader directly to explore dashboard immediately */}
        <button
          onClick={onComplete}
          className="mt-2 text-[10px] px-3 py-1 bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 hover:text-cyan-300 hover:border-cyan-400 rounded-md transition-all uppercase tracking-widest hover:shadow-[0_0_12px_rgba(6,182,212,0.15)] cursor-pointer"
        >
          Skip Crypt-Matrix
        </button>
      </div>

      {/* Decorative neon corner frames */}
      <div className="absolute top-4 left-4 text-cyan-500/20 text-[9px] uppercase tracking-widest hidden md:block">
        GITSIGN CORE_SYS_ALPHA // PORT_3000
      </div>
      <div className="absolute bottom-4 right-4 text-cyan-500/20 text-[9px] uppercase tracking-widest hidden md:block">
        © 2026 DEEPMIND ANTIGRAVITY ENGINE
      </div>
    </div>
  );
}
