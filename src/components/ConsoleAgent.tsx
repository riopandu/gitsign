import React, { useState } from "react";
import { Terminal, Send, Sparkles, AlertCircle, Play, FileCode2, History, RotateCcw } from "lucide-react";

interface ConsoleAgentProps {
  selectedProjectName: string;
  selectedBranch: string;
  activeCodeSample: {
    filename: string;
    content: string;
    commits: Array<{ message: string; author: string; hash: string; date: string }>;
    issues: Array<{ iid: number; title: string; desc: string; severity: string }>;
    ciYaml: string;
  };
  onLogMsg: (msg: string, type?: "info" | "success" | "warning" | "error") => void;
}

export default function ConsoleAgent({
  selectedProjectName,
  selectedBranch,
  activeCodeSample,
  onLogMsg,
}: ConsoleAgentProps) {
  const [inputText, setInputText] = useState("");
  const [terminalLogs, setTerminalLogs] = useState<Array<{ text: string; time: string; type: "input" | "agent" | "system" | "error" }>>([
    { text: "Gitsign AI Core initialization secure.", time: "03:42:07", type: "system" },
    { text: "Connected to GitLab Agent model framework: gemini-3.5-flash.", time: "03:42:09", type: "system" },
    { text: "Ready to analyze repositories or write code. Select a prompt preset below to initiate scan.", time: "03:42:10", type: "agent" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const addTerminalLog = (text: string, type: "input" | "agent" | "system" | "error") => {
    const time = new Date().toLocaleTimeString();
    setTerminalLogs((prev) => [...prev, { text, time, type }]);
  };

  const handleClearLogs = () => {
    setTerminalLogs([
      { text: "Console buffer cleared. AI Core online.", time: new Date().toLocaleTimeString(), type: "system" }
    ]);
  };

  const executeAgentAnalysis = async (userPrompt: string, systemContext?: string) => {
    if (isLoading) return;
    setIsLoading(true);
    addTerminalLog(userPrompt, "input");
    onLogMsg(`Consulting Gitsign AI Agent: "${userPrompt.slice(0, 45)}..."`, "info");

    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `
            Project Context:
            - Name: ${selectedProjectName}
            - Current Selected Target: ${selectedBranch}
            
            Current repository active data:
            - File under review: ${activeCodeSample.filename}
            - Code Code content: 
            \`\`\`
            ${activeCodeSample.content}
            \`\`\`
            
            Recent Repository Commits:
            ${JSON.stringify(activeCodeSample.commits, null, 2)}
            
            Current Outstanding Open Issues:
            ${JSON.stringify(activeCodeSample.issues, null, 2)}
            
            Active GitLab Pipeline YAML (.gitlab-ci.yml):
            \`\`\`yaml
            ${activeCodeSample.ciYaml}
            \`\`\`
            
            User's specific query:
            ${userPrompt}
          `,
          systemInstruction: systemContext || "You are Gitsign, a highly advanced futuristic AI core dedicated to auditing, managing, and improving GitLab development pipelines, issue lists, and merge requests. Keep your explanations highly technical, concise, optimized, and developer-focused. Include clear suggested file edits or improvements.",
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed execution of Gemini model");
      }

      addTerminalLog(data.result || "No suggestions returned.", "agent");
      onLogMsg("Gitsign AI analysis completed successfully.", "success");
    } catch (error: any) {
      console.error(error);
      addTerminalLog(`Error Gitsign Core execution: ${error.message}`, "error");
      onLogMsg(`Gitsign AI Core encounter error: ${error.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const prompt = inputText;
    setInputText("");
    executeAgentAnalysis(prompt);
  };

  // Recipe presets
  const presets = [
    {
      title: "Audit GitLab CI Pipeline",
      prompt: "Review our active .gitlab-ci.yml configurations. Check for pipeline optimization, caching strategy, security vulnerabilities, and recommend improvements to decrease build time.",
      description: "Analyze the runner container matrix and stage speeds.",
      icon: <FileCode2 className="w-3.5 h-3.5 text-cyan-400" />,
    },
    {
      title: "Triage Repository Issues",
      prompt: "We have some open GitLab issues. Analyze the issue descriptions, categorize them by structural components, and provide step-by-step code solutions for our active file.",
      description: "Generate fixes for known crash or functional issue reports.",
      icon: <AlertCircle className="w-3.5 h-3.5 text-amber-400" />,
    },
    {
      title: "Generate Changelog Summary",
      prompt: "Scan our recent commits and generate a professionally formatted release changelog summary. Group them by features, bug fixes, and maintenance, formatted cleanly in Markdown.",
      description: "Compile git history into structured release notes.",
      icon: <History className="w-3.5 h-3.5 text-emerald-400" />,
    },
    {
      title: "Audit Code File Security",
      prompt: "Perform a deep security review/audit on our active file: look for potential SQL injections, memory leaks, hardcoded credentials, or race conditions. Suggest secure rewrites.",
      description: "Check the active workspace code for secure patterns.",
      icon: <Sparkles className="w-3.5 h-3.5 text-purple-400" />,
    },
  ];

  return (
    <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-5 relative flex flex-col h-full backdrop-blur-md shadow-[0_0_35px_rgba(6,182,212,0.05)]">
      
      {/* Visual Terminal Header */}
      <div className="flex justify-between items-center pb-3 border-b border-cyan-500/10 mb-4 font-mono text-xs">
        <span className="flex items-center gap-1.5 font-bold text-cyan-400 uppercase tracking-widest">
          <Terminal className="w-4 h-4 animate-pulse text-cyan-400" />
          GITSIGN AI COGNITIVE CONSOLE
        </span>
        <button
          onClick={handleClearLogs}
          className="text-slate-500 hover:text-cyan-400 transition-colors py-0.5 px-2 rounded bg-slate-950/20 border border-slate-800"
        >
          Clear Buffer
        </button>
      </div>

      {/* Preset Recipe grids */}
      <div className="mb-4">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2 font-semibold">
          AI AGENT TASK PRESETS
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {presets.map((preset, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => executeAgentAnalysis(preset.prompt)}
              className="flex flex-col text-left p-2.5 rounded-lg bg-black/40 border border-cyan-500/10 hover:border-cyan-400/40 hover:bg-cyan-950/15 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)] transition-all cursor-pointer group disabled:opacity-50"
            >
              <div className="flex items-center gap-2 mb-1">
                {preset.icon}
                <span className="font-mono text-xs font-bold text-cyan-100 group-hover:text-cyan-300">
                  {preset.title}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 leading-normal line-clamp-1">
                {preset.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Visual Display */}
      <div className="flex-1 min-h-[220px] bg-black/90 p-4 rounded-lg border border-cyan-500/10 font-mono text-xs overflow-y-auto mb-4 flex flex-col gap-3 max-h-[350px] custom-scrollbar">
        {terminalLogs.map((log, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between items-center text-[9px] text-slate-500 border-b border-slate-950 pb-0.5">
              <span>
                {log.type === "input" && "🧑‍💻 DEVELOPER_TRANSMISSION"}
                {log.type === "agent" && "🤖 GITSIGN_AGENT_COGNITIVE"}
                {log.type === "system" && "💻 CORE_NETWORK_LOG"}
                {log.type === "error" && "🔴 CORE_SYSTEM_ERROR"}
              </span>
              <span>[{log.time}]</span>
            </div>

            <div className={`whitespace-pre-wrap leading-relaxed ${
              log.type === "input" ? "text-cyan-100 pl-2 border-l border-cyan-500/30" :
              log.type === "agent" ? "text-cyan-400 pl-2 border-l border-cyan-400" :
              log.type === "system" ? "text-slate-400" : "text-rose-400"
            }`}>
              {log.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs animate-pulse">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Gitsign AI Core scanning code blocks, compiling solutions...</span>
          </div>
        )}
      </div>

      {/* Interactive Input Form */}
      <form onSubmit={handleCustomSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          placeholder="Tanyakan analisis GitLab lainnya..."
          className="flex-1 bg-black/50 border border-cyan-500/20 rounded-lg px-3 py-2 text-xs font-mono text-cyan-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all"
        />
        <button
          type="submit"
          disabled={isLoading || !inputText.trim()}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-black font-bold font-mono text-xs rounded-lg transition-all flex items-center gap-1 cursor-pointer"
        >
          <Send className="w-3.5 h-3.5" />
          SEND
        </button>
      </form>
    </div>
  );
}
