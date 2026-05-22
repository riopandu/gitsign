import React, { useState } from "react";
import { Play, Pause, Activity, Radio, Cpu, RotateCcw } from "lucide-react";

export default function RobotWalker() {
  const [isWalking, setIsWalking] = useState(true);
  const [speed, setSpeed] = useState(1); // multiplier (0.5x, 1x, 2x)
  const [pulseCore, setPulseCore] = useState(true);

  // Derive duration based on speed selection
  const duration = (1.25 / speed).toFixed(2);

  return (
    <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-5 relative overflow-hidden backdrop-blur-md shadow-[0_0_35px_rgba(6,182,212,0.05)]">
      {/* Laser grids/scanline backgrounds */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.3)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-20" />
      <div className="absolute top-0 right-0 p-2 text-[9px] font-mono tracking-widest text-cyan-500/40 uppercase">
        Gitsign Autonomy-V3
      </div>

      <style>{`
        @keyframes leg-left-swing {
          0%, 100% { transform: rotate(-18deg) translateY(0px); }
          50% { transform: rotate(22deg) translateY(-2px); }
        }
        @keyframes leg-right-swing {
          0%, 100% { transform: rotate(22deg) translateY(-2px); }
          50% { transform: rotate(-18deg) translateY(0px); }
        }
        @keyframes foot-left-swing {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes arm-left-swing {
          0%, 100% { transform: rotate(15deg); }
          50% { transform: rotate(-25deg); }
        }
        @keyframes arm-right-swing {
          0%, 100% { transform: rotate(-25deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes robot-torso-bob {
          0%, 100% { transform: translateY(0px); }
          25% { transform: translateY(-3px) rotate(-1deg); }
          50% { transform: translateY(1px); }
          75% { transform: translateY(-2px) rotate(1deg); }
        }
        @keyframes laser-pulse {
          0%, 100% { filter: drop-shadow(0 0 4px #06b6d2) opacity(0.85); bounce: 0%; }
          50% { filter: drop-shadow(0 0 12px #22d3ee) opacity(1); }
        }
      `}</style>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Visual Panel styling */}
        <div className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-lg relative border border-cyan-500/10 min-h-[220px]">
          {/* Animated SVG Robot */}
          <div className="relative w-44 h-48 select-none flex items-center justify-center">
            
            <svg
              id="gitsign-bot-svg"
              width="140"
              height="180"
              viewBox="0 0 140 180"
              className="overflow-visible"
            >
              <g 
                style={{ 
                  transformOrigin: "70px 105px",
                  animation: isWalking ? `robot-torso-bob ${duration}s ease-in-out infinite` : "none" 
                }}
              >
                {/* Left Arm */}
                <g 
                  style={{ 
                    transformOrigin: "42px 75px",
                    animation: isWalking ? `arm-left-swing ${duration}s ease-in-out infinite` : "none"
                  }}
                >
                  {/* Metal Shoulder and limb */}
                  <rect x="28" y="70" width="12" height="35" rx="6" fill="#1e293b" stroke="#06b6d2" strokeWidth="1.5" />
                  {/* Glowing Laser Hand */}
                  <circle cx="34" cy="102" r="4.5" fill="#22d3ee" className="animate-pulse" />
                </g>

                {/* Right Arm */}
                <g 
                  style={{ 
                    transformOrigin: "98px 75px",
                    animation: isWalking ? `arm-right-swing ${duration}s ease-in-out infinite` : "none"
                  }}
                >
                  {/* Metal Shoulder and limb */}
                  <rect x="100" y="70" width="12" height="35" rx="6" fill="#1e293b" stroke="#06b6d2" strokeWidth="1.5" />
                  {/* Glowing Laser Hand */}
                  <circle cx="106" cy="102" r="4.5" fill="#22d3ee" className="animate-pulse" />
                </g>

                {/* Back Plate / Exo Gear */}
                <rect x="44" y="65" width="52" height="50" rx="10" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

                {/* Main Cyber Torso */}
                <rect x="46" y="68" width="48" height="42" rx="6" fill="#1e293b" stroke="#0891b2" strokeWidth="2" />

                {/* Neon Reactor Chest Core */}
                <g style={{ animation: pulseCore ? "laser-pulse 1.5s ease-in-out infinite" : "none" }}>
                  <circle cx="70" cy="88" r="14" fill="#083344" stroke="#22d3ee" strokeWidth="1.5" />
                  <polygon points="70,79 78,92 62,92" fill="#22d3ee" />
                  <circle cx="70" cy="88" r="3" fill="#ffffff" />
                </g>

                {/* Futuristic Head */}
                <g transform="translate(0, -5)">
                  {/* Neck */}
                  <rect x="64" y="58" width="12" height="8" fill="#334155" stroke="#0891b2" strokeWidth="1" />
                  {/* Visor Mask */}
                  <rect x="50" y="32" width="40" height="26" rx="6" fill="#0f172a" stroke="#06b6d2" strokeWidth="2" />
                  {/* Hologram Eye Strip */}
                  <rect x="56" y="40" width="28" height="6" rx="3" fill="#022137" />
                  {/* Glowing Laser Dots (Double Active Eyes) */}
                  <circle cx="63" cy="43" r="2.5" fill="#22d3ee" className="animate-ping" style={{ animationDuration: '2s' }} />
                  <circle cx="63" cy="43" r="2.5" fill="#22d3ee" />
                  <circle cx="77" cy="43" r="2.5" fill="#22d3ee" className="animate-ping" style={{ animationDuration: '2s' }} />
                  <circle cx="77" cy="43" r="2.5" fill="#22d3ee" />
                  
                  {/* External Dual Receivers / Antennas */}
                  <line x1="55" y1="32" x2="51" y2="22" stroke="#06b6d2" strokeWidth="1.8" />
                  <circle cx="51" cy="22" r="2" fill="#22d3ee" />
                  <line x1="85" y1="32" x2="89" y2="22" stroke="#06b6d2" strokeWidth="1.8" />
                  <circle cx="89" cy="22" r="2" fill="#22d3ee" />
                </g>
              </g>

              {/* Left Leg */}
              <g 
                style={{ 
                  transformOrigin: "56px 110px",
                  animation: isWalking ? `leg-left-swing ${duration}s ease-in-out infinite` : "none"
                }}
              >
                {/* Upper Leg */}
                <line x1="56" y1="110" x2="52" y2="135" stroke="#0891b2" strokeWidth="4.5" />
                {/* Joint Knee */}
                <circle cx="52" cy="135" r="4.5" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.5" />
                {/* Lower Leg */}
                <line x1="52" y1="135" x2="48" y2="160" stroke="#06b6d2" strokeWidth="3" />
                {/* Mechanical Foot */}
                <path d="M40 160 L54 160 L50 155 Z" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.2" />
              </g>

              {/* Right Leg */}
              <g 
                style={{ 
                  transformOrigin: "84px 110px",
                  animation: isWalking ? `leg-right-swing ${duration}s ease-in-out infinite` : "none"
                }}
              >
                {/* Upper Leg */}
                <line x1="84" y1="110" x2="88" y2="135" stroke="#0891b2" strokeWidth="4.5" />
                {/* Joint Knee */}
                <circle cx="88" cy="135" r="4.5" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.5" />
                {/* Lower Leg */}
                <line x1="88" y1="135" x2="92" y2="160" stroke="#06b6d2" strokeWidth="3" />
                {/* Mechanical Foot */}
                <path d="M84 160 L98 160 L94 155 Z" fill="#1e293b" stroke="#22d3ee" strokeWidth="1.2" />
              </g>

              {/* Floor laser line */}
              <line x1="15" y1="161" x2="125" y2="161" stroke="#083344" strokeWidth="2.5" />
              <line x1="30" y1="161" x2="110" y2="161" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3, 3" className="opacity-70" />
            </svg>

            {/* Glowing Scan Bar */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-8 w-24 h-[1px] bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse pointer-events-none opacity-40" />
          </div>
        </div>

        {/* Control and Telemetry Panel */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-mono text-sm font-semibold text-cyan-400 flex items-center gap-1.5 uppercase">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              Core Autonomous Walk
            </h3>
            <p className="text-slate-400 text-xs mt-1">
              Gitsign internal synthetic engine walking and analyzing live GitLab updates synchronously.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setIsWalking(!isWalking)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-2 border transition-all ${
                isWalking
                  ? "bg-amber-950/40 border-amber-500/30 text-amber-300 hover:border-amber-400 hover:bg-amber-950/60"
                  : "bg-cyan-950/40 border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-950/60"
              }`}
            >
              {isWalking ? (
                <>
                  <Pause className="w-3.5 h-3.5" /> PAUSE AGENT
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" /> WALK AGENT
                </>
              )}
            </button>

            <button
              onClick={() => setPulseCore(!pulseCore)}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-2 border transition-all ${
                pulseCore
                  ? "bg-slate-800 border-slate-700 text-slate-300"
                  : "bg-cyan-950/40 border-cyan-500/40 text-cyan-200"
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> CORE: {pulseCore ? "SHIELDED" : "OFFREACTIVE"}
            </button>
          </div>

          {/* Speed tuning */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" /> Animation Clock speed
              </span>
              <span className="text-cyan-400 font-bold">{speed}x</span>
            </div>
            <div className="flex gap-2">
              {[0.5, 1, 1.75, 2.5].map((val) => (
                <button
                  key={val}
                  onClick={() => setSpeed(val)}
                  className={`flex-1 py-1 rounded font-mono text-xs transition-all ${
                    speed === val
                      ? "bg-cyan-600 text-black font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]"
                      : "bg-slate-950 text-slate-400 border border-slate-800 hover:border-cyan-500/30"
                  }`}
                >
                  {val === 1 ? "Normal" : `${val}x`}
                </button>
              ))}
            </div>
          </div>

          {/* Core Telemetry metrics */}
          <div className="bg-black/40 p-2.5 rounded-md border border-cyan-500/5 font-mono text-[11px] space-y-1">
            <div className="flex justify-between text-slate-400">
              <span>Status:</span>
              <span className={isWalking ? "text-emerald-400 animate-pulse" : "text-amber-400"}>
                {isWalking ? "PROCEEDING_ACTIVE" : "ENGINE_HALTED"}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Sync Rate:</span>
              <span className="text-cyan-300">{(speed * 8.4).toFixed(1)} Hz</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Instruction latency:</span>
              <span className="text-cyan-400">{(12 / speed).toFixed(0)}ms</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Cognitive Load:</span>
              <div className="w-16 bg-slate-950 h-2 rounded overflow-hidden mt-1 relative flex">
                <div 
                  className="bg-cyan-400 h-full transition-all duration-500" 
                  style={{ width: `${isWalking ? Math.min(100, Math.floor(45 * speed)) : 10}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
