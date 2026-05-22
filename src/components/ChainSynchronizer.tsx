import React, { useState, useEffect } from "react";
import { Link2, Unlink, RefreshCw, CheckCircle, Radio } from "lucide-react";

interface ChainSynchronizerProps {
  isConnected: boolean;
  isSyncing: boolean;
  onSyncManual: () => void;
  syncProgress?: number;
}

export default function ChainSynchronizer({
  isConnected,
  isSyncing,
  onSyncManual,
  syncProgress = 100,
}: ChainSynchronizerProps) {
  const [links, setLinks] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  return (
    <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-5 relative overflow-hidden backdrop-blur-md shadow-[0_0_35px_rgba(6,182,212,0.05)]">
      {/* Scanline background */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none opacity-20" />

      <style>{`
        @keyframes chain-flow-right {
          0% { stroke-dashoffset: 40; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes chain-pulse {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(6, 182, 212, 0.4)); opacity: 0.7; }
          50% { filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.9)); opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="font-mono text-xs font-bold text-slate-400 flex items-center gap-1">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            SYNAPSE CHAIN SYNCHRONIZER
          </span>
          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider ${
            isConnected 
              ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300" 
              : "bg-red-500/15 border border-red-500/30 text-red-300"
          }`}>
            {isConnected ? "CHAIN_SECURED" : "CHAIN_UNBOUNDED"}
          </span>
        </div>

        {/* The visual conveyor chain loop */}
        <div className="relative w-full py-6 flex items-center justify-between">
          
          {/* Node 1: Gitsign */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 bg-slate-950 ${
              isConnected 
                ? "border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]" 
                : "border-slate-800"
            }`}>
              <span className="font-mono text-base font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                gi
              </span>
            </div>
            <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
              Gitsign.Agent
            </span>
          </div>

          {/* Connected physical conveyor chain line */}
          <div className="flex-1 px-4 relative flex items-center justify-center">
            
            {/* SVG Laser Link Connection */}
            <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 30">
              {/* Back pipe shadow */}
              <path
                d="M 5,15 L 195,15"
                stroke={isConnected ? "#083344" : "#1e293b"}
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />

              {/* Glowing animated pulse chain laser */}
              <path
                d="M 5,15 L 195,15"
                stroke={isConnected ? "#22d3ee" : "#334155"}
                strokeWidth="2.5"
                strokeDasharray="8, 6"
                strokeLinecap="round"
                fill="none"
                style={{
                  animation: (isConnected && isSyncing)
                    ? "chain-flow-right 1.8s linear infinite"
                    : isConnected 
                    ? "chain-pulse 3s ease-in-out infinite"
                    : "none",
                }}
              />

              {/* Physical overlay chain joints */}
              <path
                d="M 20,15 L 35,15 M 55,15 L 70,15 M 90,15 L 105,15 M 125,15 L 140,15 M 160,15 L 175,15"
                stroke="#1e293b"
                strokeWidth="4"
                strokeLinecap="square"
                className="opacity-70"
              />
            </svg>

            {/* Middle Sync Badge indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button
                disabled={!isConnected || isSyncing}
                onClick={onSyncManual}
                className={`p-2 rounded-full border bg-slate-950 hover:bg-slate-900 transition-all ${
                  isSyncing && isConnected
                    ? "border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-not-allowed"
                    : isConnected
                    ? "border-cyan-500/30 text-cyan-400 hover:border-cyan-300"
                    : "border-slate-800 text-slate-500 cursor-not-allowed"
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${isSyncing && isConnected ? "animate-spin" : ""}`} />
              </button>
            </div>
          </div>

          {/* Node 2: GitLab */}
          <div className="flex flex-col items-center gap-2 z-10">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-all duration-300 bg-slate-950 ${
              isConnected 
                ? "border-orange-500/60 shadow-[0_0_15px_rgba(249,115,22,0.25)]" 
                : "border-slate-800"
            }`}>
              {/* GitLab minimalist orange icon */}
              <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.955,13.587 a0.472,0.472,0,0,0,-0.171,-0.525 L12.001,4.195,1.217,13.064 a0.473,0.473,0,0,0,-0.171,0.525 L3.957,22.8 a0.472,0.472,0,0,0,0.449,0.324 H19.6 a0.472,0.472,0,0,0,0.449,-0.324 Z" />
              </svg>
            </div>
            <span className="font-mono text-[10px] font-bold text-orange-400 uppercase tracking-widest">
              GitLab.Client
            </span>
          </div>

        </div>

        {/* Sync Progress Status and details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-cyan-500/10 text-xs font-mono">
          <div className="space-y-1 text-slate-400">
            <div className="flex justify-between">
              <span>Synapse Bridge:</span>
              <span className={isConnected ? "text-cyan-400" : "text-slate-500"}>
                {isConnected ? "v4.gitlab.com/api" : "NOT_BOUND"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Transfer Stream:</span>
              <span className={isConnected ? "text-cyan-400" : "text-slate-500"}>
                {isConnected ? "Secure SSL (AES-256)" : "NONE"}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            {isConnected ? (
              <>
                <div className="flex justify-between text-slate-400">
                  <span>Synchronization State:</span>
                  <span className={isSyncing ? "text-cyan-300 animate-pulse" : "text-emerald-400"}>
                    {isSyncing ? "SYNCING_REPOS" : "STANDBY_SYNCED"}
                  </span>
                </div>
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden mt-1 relative">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-300"
                    style={{ width: `${syncProgress}%` }}
                  />
                </div>
              </>
            ) : (
              <div className="text-amber-500 text-[11px] leading-relaxed flex items-center gap-1.5 h-full">
                <span>⚠️ Input your GitLab Personal Access Token in the dashboard parameters above to lock the secure API chain link.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
