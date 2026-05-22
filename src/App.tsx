import React, { useState, useEffect } from "react";
import {
  Terminal,
  Cpu,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Settings,
  RefreshCw,
  AlertCircle,
  Link2,
  Play,
  CheckCircle,
  Flame,
  Server,
  Shield,
  Radio,
  Layers,
  Search,
  Code,
  CheckCircle2,
  XCircle,
  Info,
  ExternalLink,
  HelpCircle,
  Sliders,
  Database,
  GitFork,
  BookOpen
} from "lucide-react";

import RunningTicker from "./components/RunningTicker";
import RobotWalker from "./components/RobotWalker";
import ChainSynchronizer from "./components/ChainSynchronizer";
import ConsoleAgent from "./components/ConsoleAgent";
import GitsignLoader from "./components/GitsignLoader";
import { GitLabProject, GitLabCommit, GitLabIssue, GitLabPipeline, AgentActivity, AgentTask } from "./types";

// Static Rich Built-in Template/Simulation Data
const MOCK_PROJECTS: GitLabProject[] = [
  {
    id: 489021,
    name: "gitsign-agent-core",
    path_with_namespace: "gitsign-org/gitsign-agent-core",
    description: "Futuristic GitLab AI Agent managing autonomous pipeline checks, security audits, and automated merge requests.",
    web_url: "https://gitlab.com/gitsign-org/gitsign-agent-core",
    star_count: 142,
    forks_count: 28,
    last_activity_at: "2026-05-22T03:41:00Z"
  },
  {
    id: 590112,
    name: "solana-clanker-interop",
    path_with_namespace: "gitsign-org/solana-clanker-interop",
    description: "Synchronizer middleware for Clanker.world bonding patterns and AI agent liquidity deployment parameters via GitLab pipelines.",
    web_url: "https://gitlab.com/gitsign-org/solana-clanker-interop",
    star_count: 89,
    forks_count: 19,
    last_activity_at: "2026-05-22T02:15:30Z"
  }
];

const MOCK_FILES_FOR_PROJECT: Record<number, Record<string, { content: string; ciYaml: string }>> = {
  489021: {
    "gitsign-agent.ts": {
      content: `/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Gitsign AI Core - Autonomous GitLab Agent
 */

import { GoogleGenAI } from "@google/genai";
import { GitLabClient } from "./gitlab-client";

export class GitsignAgent {
  private ai: GoogleGenAI;
  private gitlab: GitLabClient;

  constructor(apiKey: string, gitlabToken: string) {
    this.ai = new GoogleGenAI({ apiKey });
    this.gitlab = new GitLabClient({ token: gitlabToken });
    console.log("🤖 Gitsign cybernetic neural system connected, status: online.");
  }

  async runTriageFlow(projectId: number) {
    const issues = await this.gitlab.getOpenIssues(projectId);
    console.log(\`Analyzing \${issues.length} outstanding GitLab repository reports...\`);
    
    for (const issue of issues) {
      if (issue.title.includes("Docker") || issue.title.includes("cache")) {
        const remediation = await this.diagnosePipelineFailure(issue);
        await this.gitlab.postComment(projectId, issue.iid, remediation);
      }
    }
  }

  private async diagnosePipelineFailure(issue: any): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: \`Please diagnose this GitLab CI issue and generate Docker/caching solutions: \${issue.description}\`
    });
    return \`🤖 **Gitsign Autotriage Suggestion (powered by Gemini-3.5-flash & Claude-3-haiku):**\\n\\n\${response.text}\`;
  }
}`,
      ciYaml: `stages:
  - lint
  - security
  - build
  - deploy

variables:
  DOCKER_DRIVER: overlay2
  CACHE_KEY_SUFFIX: "v1-node-modules"

cache:
  key: "gitsign-\${CI_COMMIT_REF_SLUG}-\${CACHE_KEY_SUFFIX}"
  paths:
    - node_modules/
    - .npm/

run-linter:
  stage: lint
  image: node:19-alpine
  script:
    - npm ci --prefer-offline
    - npm run lint

security-audit:
  stage: security
  image: node:19-alpine
  script:
    - npm run audit-sec-gitsign
  allow_failure: true

build-container:
  stage: build
  image: docker:24.0
  services:
    - docker:24.0-dind
  script:
    - docker build -t registry.gitlab.com/gitsign-org/gitsign-agent-core:latest .
    - docker push registry.gitlab.com/gitsign-org/gitsign-agent-core:latest
  only:
    - main
`
    },
    "agent_validator.py": {
      content: `# Gitsign Python Pipeline Validator Core
import sys
import yaml

def validate_pipeline_manifest(filepath):
    print("⏳ Loading .gitlab-ci.yml cybernetics matrix...")
    try:
        with open(filepath, 'r') as f:
            data = yaml.safe_load(f)
        
        stages = data.get('stages', [])
        print(f"✅ Found {len(stages)} pipeline execution stages: {stages}")
        
        # Verify cache paths
        if 'cache' not in data:
            print("⚠️ Critical Warning: No cache strategy defined. Runner speeds might be degraded.")
        
        return True
    except Exception as e:
        print(f"❌ Structural error in pipeline script: {e}")
        return False

if __name__ == "__main__":
    validate_pipeline_manifest(".gitlab-ci.yml")
`,
      ciYaml: `# Simple python CI file
stages:
  - test

test-validator:
  stage: test
  image: python:3.11-slim
  script:
    - pip install pyyaml
    - python agent_validator.py
`
    }
  },
  590112: {
    "clanker_bonding.ts": {
      content: `/**
 * Clanker.world bonding curve and liquidity pools scanner middleware
 * Designed to integrate token metrics with GitLab CI runner events.
 */

export interface TokenStatus {
  symbol: string;
  bondingPercent: number;
  marketCapUsd: number;
  npmRegistrySecure: boolean;
}

export async function checkBondingCurveStatus(tokenAddress: string): Promise<TokenStatus> {
  // Querying Solana Clanker Engine network
  console.log("⛓️ Connecting to Solana mainnet-beta via RPC...");
  return {
    symbol: "GITSIGN",
    bondingPercent: 78.4,
    marketCapUsd: 142500,
    npmRegistrySecure: true
  };
}

export function generateGitLabCIEnv(status: TokenStatus): string {
  return \`
    export CLANKER_TOKEN_SYMBOL="\${status.symbol}"
    export CLANKER_BONDING_PERCENT="\${status.bondingPercent}"
    export CLANKER_MARKET_CAP="\${status.marketCapUsd}"
  \`;
}`,
      ciYaml: `stages:
  - audit-token
  - publish-npm

variables:
  CLANKER_TARGET_ADDRESS: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"

evaluate-metrics:
  stage: audit-token
  image: node:19-alpine
  script:
    - npm ci
    - node -e "import('./clanker_bonding.js').then(m => m.checkBondingCurveStatus('$CLANKER_TARGET_ADDRESS'))"

push-npm-package:
  stage: publish-npm
  image: node:19-alpine
  script:
    - echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc
    - npm publish --access public
  only:
    - main
`
    }
  }
};

const MOCK_COMMITS: Record<number, GitLabCommit[]> = {
  489021: [
    {
      id: "7a29f8c0deb8a19bc4229462c19a0a19e5f5f4b9",
      short_id: "7a29f8c0",
      title: "feat: integrate Gemini 3.5 flash dynamic code triage",
      author_name: "gitsign-agent",
      committed_date: "2026-05-22T01:10:00Z",
      message: "Hook pipeline error reports to Gemini 3.5 flash API on runner failure trigger."
    },
    {
      id: "d832ea51fb4289ca12850cd3ffcaee012a93910c",
      short_id: "d832ea51",
      title: "fix: optimize canvas memory foot-print in runner containers",
      author_name: "git-operator",
      committed_date: "2026-05-21T18:40:00Z",
      message: "Disable memory leak tracing during normal integration runs on test.sh"
    },
    {
      id: "a1a89c84918ef03eb4082dcfa82e8dae4c19b0aa",
      short_id: "a1a89c84",
      title: "ci: secure runner authorization with webhook handshakes",
      author_name: "admin",
      committed_date: "2026-05-21T09:12:00Z",
      message: "Set up security audits for runner agents parsing internal issues."
    }
  ],
  590112: [
    {
      id: "f39920199dae13c9fb05bca4023910caad8901b2",
      short_id: "f3992019",
      title: "feat: map bonding curves to Gemini inference token metrics",
      author_name: "clanker-lead",
      committed_date: "2026-05-22T00:04:00Z",
      message: "Allow automated gitlab variable injections based on Solana smart contracts."
    },
    {
      id: "b4502cdfa082bc391ca9e3bb4fac4efda09101ff",
      short_id: "b4502cdf",
      title: "refactor: speed up Docker build layers",
      author_name: "dependabot",
      committed_date: "2026-05-20T11:43:00Z",
      message: "Cache multi-stage builds in .gitlab-ci to prevent cold starts."
    }
  ]
};

const MOCK_ISSUES: Record<number, GitLabIssue[]> = {
  489021: [
    {
      id: 3004812,
      iid: 101,
      title: "Out of memory on large node builds during 'test-validator'",
      description: "Memory footprint spikes above 4GB during testing. Gitsign needs to automate max_old_space_size allocations or enable disk swaps inside runner templates.",
      state: "opened",
      created_at: "2026-05-22T01:30:00Z",
      author: {
        name: "DevOps Overseer",
        username: "devops_overseer",
        avatar_url: null
      },
      web_url: "https://gitlab.com/gitsign-org/gitsign-agent-core/issues/101"
    },
    {
      id: 3004815,
      iid: 102,
      title: "Docker registry login handshake Timeout in CI pipeline",
      description: "Sometimes gitlab-managed shared runners fail with 'io timeout' while connecting core. This requires adding restart backoffs and registry health probes.",
      state: "opened",
      created_at: "2026-05-21T14:22:00Z",
      author: {
        name: "Security Auditing Agent",
        username: "sys_sec_audit",
        avatar_url: null
      },
      web_url: "https://gitlab.com/gitsign-org/gitsign-agent-core/issues/102"
    },
    {
      id: 3004819,
      iid: 103,
      title: "Automate dev dependency checks for npm / Clanker",
      description: "Maintainer requested checks on newly published clanker.world modules for registry validity and version lock-ins in package.json.",
      state: "opened",
      created_at: "2026-05-20T08:00:00Z",
      author: {
        name: "Git Master",
        username: "git_master",
        avatar_url: null
      },
      web_url: "https://gitlab.com/gitsign-org/gitsign-agent-core/issues/103"
    }
  ],
  590112: [
    {
      id: 3005901,
      iid: 42,
      title: "NPM install command mismatch in container runners",
      description: "Missing package-lock.json issues in target branch results in cold install failure. We should fallback to standard npm install with caching or enforce strict package lock.",
      state: "opened",
      created_at: "2026-05-21T21:44:00Z",
      author: {
        name: "Solana Sync Overseer",
        username: "solana_sync_bot",
        avatar_url: null
      },
      web_url: "https://gitlab.com/gitsign-org/solana-clanker-interop/issues/42"
    }
  ]
};

const MOCK_PIPELINES: Record<number, GitLabPipeline[]> = {
  489021: [
    {
      id: 998240,
      status: "success",
      ref: "main",
      sha: "7a29f8c0deb8a19bc4229462c19a0a19e5f5f4b9",
      web_url: "https://gitlab.com/gitsign-org/gitsign-agent-core/pipelines/998240",
      created_at: "2026-05-22T03:10:00Z",
      updated_at: "2026-05-22T03:15:22Z"
    },
    {
      id: 998231,
      status: "failed",
      ref: "v3-beta-opt",
      sha: "d832ea51fb4289ca12850cd3ffcaee012a93910c",
      web_url: "https://gitlab.com/gitsign-org/gitsign-agent-core/pipelines/998231",
      created_at: "2026-05-22T01:50:00Z",
      updated_at: "2026-05-22T02:02:11Z"
    },
    {
      id: 998188,
      status: "success",
      ref: "main",
      sha: "a1a89c84918ef03eb4082dcfa82e8dae4c19b0aa",
      web_url: "https://gitlab.com/gitsign-org/gitsign-agent-core/pipelines/998188",
      created_at: "2026-05-21T10:00:00Z",
      updated_at: "2026-05-21T10:08:45Z"
    }
  ],
  590112: [
    {
      id: 999101,
      status: "success",
      ref: "main",
      sha: "f39920199dae13c9fb05bca4023910caad8901b2",
      web_url: "https://gitlab.com/gitsign-org/solana-clanker-interop/pipelines/999101",
      created_at: "2026-05-22T02:00:00Z",
      updated_at: "2026-05-22T02:06:50Z"
    },
    {
      id: 999052,
      status: "running",
      ref: "clanker-auth-fix",
      sha: "b4502cdfa082bc391ca9e3bb4fac4efda09101ff",
      web_url: "https://gitlab.com/gitsign-org/solana-clanker-interop/pipelines/999052",
      created_at: "2026-05-22T03:30:00Z",
      updated_at: "2026-05-22T03:42:00Z"
    }
  ]
};

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  // GitLab parameters & UI toggles
  const [gitlabHost, setGitlabHost] = useState("https://gitlab.com");
  const [gitlabToken, setGitlabToken] = useState("");
  const [connectMode, setConnectMode] = useState<"simulation" | "real">("simulation");
  const [isTokenVisible, setIsTokenVisible] = useState(false);

  // Active loaded projects & records
  const [projectsList, setProjectsList] = useState<GitLabProject[]>(MOCK_PROJECTS);
  const [selectedProjectId, setSelectedProjectId] = useState<number>(489021);
  const [activeTab, setActiveTab] = useState<"code" | "pipelines" | "issues" | "commits">("code");

  // Selection sub-states
  const [selectedFileName, setSelectedFileName] = useState("gitsign-agent.ts");
  const [customFileContent, setCustomFileContent] = useState("");
  const [customCiYaml, setCustomCiYaml] = useState("");

  // Loading/Sync states
  const [isConnected, setIsConnected] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(100);

  // Global activity logs trace output
  const [activities, setActivities] = useState<AgentActivity[]>([
    {
      id: "act-1",
      timestamp: "03:42:07",
      type: "info",
      message: "Gitsign Agent launched. Establishing secure connections...",
      source: "Gitsign Agent"
    },
    {
      id: "act-2",
      timestamp: "03:42:09",
      type: "success",
      message: "Claude, Gemini, GitHub, Clanker, and NPM networks linked with Gitsign core.",
      source: "Gemini Engine"
    }
  ]);

  // Handle setting active project and updating corresponding lists
  const handleProjectSelect = (id: number) => {
    setSelectedProjectId(id);
    const filesRecord = MOCK_FILES_FOR_PROJECT[id];
    if (filesRecord) {
      const firstFile = Object.keys(filesRecord)[0];
      setSelectedFileName(firstFile);
      setCustomFileContent(filesRecord[firstFile].content || "");
      setCustomCiYaml(filesRecord[firstFile].ciYaml || "");
    }
    addActivityLog(`Switched focus to repository: ${projectsList.find(p => p.id === id)?.name || id}`, "info");
  };

  // Safe append log helper
  const addActivityLog = (message: string, type: "info" | "success" | "warning" | "error" = "info", source: "Gitsign Agent" | "GitLab Hook" | "Gemini Engine" = "Gitsign Agent") => {
    const freshLog: AgentActivity = {
      id: `act-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString(),
      type,
      message,
      source
    };
    setActivities((prev) => [freshLog, ...prev].slice(0, 40));
  };

  // Manual chain trigger synchronizer
  const handleManualSync = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncProgress(10);
    addActivityLog("Initiating full GitLab chain synchronization sequence...", "warning", "GitLab Hook");

    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          addActivityLog("GitLab repository models successfully re-synced! 100% data fidelity secured.", "success", "Gitsign Agent");
          return 100;
        }
        return prev + 15;
      });
    }, 280);
  };

  // On mount initialized custom variables
  useEffect(() => {
    const filesRecord = MOCK_FILES_FOR_PROJECT[selectedProjectId];
    if (filesRecord && filesRecord[selectedFileName]) {
      setCustomFileContent(filesRecord[selectedFileName].content);
      setCustomCiYaml(filesRecord[selectedFileName].ciYaml);
    }
  }, [selectedProjectId, selectedFileName]);

  // Real connection handler when GitLab token or host is changed (only if mode is 'real')
  const handleSaveRealConfig = async () => {
    if (!gitlabToken.trim()) {
      addActivityLog("Cannot switch to Real GitLab Mode without a Personal Access Token.", "error");
      return;
    }

    addActivityLog(`Verifying credentials with GitLab Host: ${gitlabHost}...`, "info");
    setIsSyncing(true);

    try {
      // Connect and query GitLab /projects via our secure server proxy!
      const targetUrl = "/projects?membership=true&order_by=last_activity_at&per_page=6";
      const fetchUrl = `/api/gitlab/proxy?url=${encodeURIComponent(targetUrl)}`;

      const response = await fetch(fetchUrl, {
        method: "GET",
        headers: {
          "private-token": gitlabToken
        }
      });

      if (!response.ok) {
        throw new Error(`GitLab response failed with status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        // Map dynamic incoming data
        const mappedData: GitLabProject[] = data.map((proj: any) => ({
          id: proj.id,
          name: proj.name,
          path_with_namespace: proj.path_with_namespace,
          description: proj.description || "No project description provided.",
          web_url: proj.web_url,
          star_count: proj.star_count || 0,
          forks_count: proj.forks_count || 0,
          last_activity_at: proj.last_activity_at
        }));

        setProjectsList(mappedData);
        setConnectMode("real");
        setIsConnected(true);
        setSelectedProjectId(mappedData[0].id);
        addActivityLog(`🔗 Securing live connection! Imported ${data.length} actual projects from gitlab.com`, "success", "GitLab Hook");
      } else {
        addActivityLog("Authenticated successfully, but no GitLab projects were found in your workspace.", "warning");
      }
    } catch (err: any) {
      console.error(err);
      addActivityLog(`Failed to sync live GitLab: ${err.message}. Defaulting back to safe simulated matrix.`, "error");
    } finally {
      setIsSyncing(false);
    }
  };

  // Get active variables based on current selection
  const currentProject = projectsList.find((p) => p.id === selectedProjectId) || projectsList[0];
  const currentCommits = MOCK_COMMITS[selectedProjectId] || [];
  const currentIssues = MOCK_ISSUES[selectedProjectId] || [];
  const currentPipelines = MOCK_PIPELINES[selectedProjectId] || [];

  if (isBooting) {
    return <GitsignLoader onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Absolute scanline screen overlay for cyberpunk texture */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.15)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

      {/* Futuristic Header bar with branding */}
      <header className="border-b border-cyan-500/20 bg-slate-900/40 relative backdrop-blur-md z-30 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] animate-pulse">
              <Layers className="w-5.5 h-5.5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-2xl font-extrabold tracking-tight text-white uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500">
                  GITSIGN
                </span>
                <span className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-cyan-400/40 bg-cyan-950/30 text-cyan-300 font-mono font-bold animate-pulse">
                  ACT-SECURE
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400/90 font-mono">
                AI Cyber-Agent core parsing GitLab development flow
              </p>
            </div>
          </div>

          {/* Quick diagnostics toolbar status indicators */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-950/20 border border-cyan-500/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300">Model:</span>
              <span className="text-cyan-300 font-bold">Gemini-3.5-flash</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-950/20 border border-cyan-500/10">
              <Server className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-300">GitLab Integration:</span>
              <span className="text-cyan-300 font-bold uppercase">{connectMode}</span>
            </div>

            <button
              onClick={() => {
                setConnectMode(connectMode === "simulation" ? "real" : "simulation");
                addActivityLog(`Switched mode dynamically to: ${connectMode === "simulation" ? "Real Token Mode" : "Simulation Demo Modus"}`, "info");
              }}
              className="px-2.5 py-1.5 rounded bg-slate-950 border border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-300 text-slate-400 transition-all font-bold cursor-pointer"
            >
              Toggle Mode
            </button>

            <button
              onClick={() => {
                setIsBooting(true);
                addActivityLog("Manually re-triggering Gitsign loader matrix.", "warning");
              }}
              className="px-2.5 py-1.5 rounded bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 hover:text-white transition-all font-bold cursor-pointer flex items-center gap-1.2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              Reboot Matrix
            </button>
          </div>

        </div>
      </header>

      {/* Infinite running text marquee */}
      <RunningTicker />

      {/* Main Container Layout */}
      <main className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-20">
        
        {/* Left Side Column: GitLab parameters & Autonomous sync motors (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          {/* Setup / Configuration Panel */}
          <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-5 backdrop-blur-md shadow-[0_0_35px_rgba(6,182,212,0.05)]">
            <h2 className="font-mono text-sm font-bold text-cyan-400 flex items-center gap-2 mb-4 uppercase tracking-widest">
              <Settings className="w-4 h-4 text-cyan-400" />
              GITLAB CONNECT PARAMETERS
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1.5">
                  GitLab Instance Base Host:
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-500/60 font-mono text-xs">
                    https://
                  </span>
                  <input
                    type="text"
                    value={gitlabHost.replace(/^https?:\/\//, "")}
                    onChange={(e) => setGitlabHost("https://" + e.target.value)}
                    placeholder="gitlab.com"
                    className="w-full bg-black/50 border border-cyan-500/20 rounded-lg pl-18 pr-3 py-2 text-xs font-mono text-cyan-100 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                    GitLab Personal Access Token:
                  </label>
                  <button
                    onClick={() => setIsTokenVisible(!isTokenVisible)}
                    className="text-[10px] text-cyan-500 hover:text-cyan-400 font-mono"
                  >
                    {isTokenVisible ? "Hide" : "Reveal"}
                  </button>
                </div>
                <input
                  type={isTokenVisible ? "text" : "password"}
                  value={gitlabToken}
                  onChange={(e) => setGitlabToken(e.target.value)}
                  placeholder="glpat-XXXXXXXXXXXXXXXXXXXX"
                  className="w-full bg-black/50 border border-cyan-500/20 rounded-lg px-3 py-2 text-xs font-mono text-cyan-100 placeholder-slate-600 focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all"
                />
              </div>

              {/* Toggles and status information */}
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 p-2.5 bg-black/30 rounded border border-cyan-500/5">
                <span className="flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  Method of sync:
                </span>
                <span className={connectMode === "real" ? "text-cyan-400 font-bold" : "text-amber-400 font-bold"}>
                  {connectMode === "real" ? "Secure live REST-v4 API" : "Simulated Local Matrix"}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSaveRealConfig}
                  className="flex-1 py-2 rounded-lg bg-cyan-600 text-slate-950 font-bold font-mono text-xs hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-98 transition-all cursor-pointer text-center"
                >
                  SECURE LINK
                </button>
                {connectMode === "real" && (
                  <button
                    onClick={() => {
                      setConnectMode("simulation");
                      setProjectsList(MOCK_PROJECTS);
                      addActivityLog("Disconnected live GitLab channel. Reverting to sandbox.", "warning");
                    }}
                    className="px-3 py-2 rounded-lg bg-slate-950 hover:bg-slate-900 border border-rose-500/30 text-rose-400 font-mono text-xs hover:border-rose-400 transition-all cursor-pointer"
                  >
                    Disconnect
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Conveyor Sync Motor System */}
          <ChainSynchronizer
            isConnected={isConnected}
            isSyncing={isSyncing}
            onSyncManual={handleManualSync}
            syncProgress={syncProgress}
          />

          {/* Autonomous Walker Simulation Panel */}
          <RobotWalker />

          {/* Real-time System activities terminal list */}
          <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-5 flex-1 min-h-[160px] flex flex-col backdrop-blur-md shadow-[0_0_35px_rgba(6,182,212,0.05)]">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-widest block mb-2 font-bold flex justify-between items-center">
              <span>🖥️ System Activity Logs</span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            </span>
            <div className="flex-1 bg-black/60 p-3 rounded-lg border border-cyan-500/10 font-mono text-[10px] overflow-y-auto max-h-[180px] custom-scrollbar flex flex-col gap-2">
              {activities.map((act) => (
                <div key={act.id} className="leading-normal border-b border-slate-900/40 pb-1.5">
                  <div className="flex justify-between text-slate-500 mb-0.5">
                    <span className="font-bold text-[9px] uppercase tracking-wider text-cyan-400">{act.source}</span>
                    <span>{act.timestamp}</span>
                  </div>
                  <div className={`break-words ${
                    act.type === "error" ? "text-rose-400" :
                    act.type === "success" ? "text-emerald-400" :
                    act.type === "warning" ? "text-amber-300" : "text-cyan-100"
                  }`}>
                    {act.message}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side Column: Interactive Project explorer, pipeline graphs, and Cognitive console (lg:col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Repository Selector Dropdown / Row */}
          <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl p-4 backdrop-blur-md shadow-[0_0_35px_rgba(6,182,212,0.05)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="font-mono text-xs font-bold text-slate-400 uppercase tracking-wide">
                    REPOSITORY CHANNEL
                  </h3>
                  <p className="font-mono text-sm text-cyan-100 font-extrabold tracking-wide">
                    {currentProject.name}
                  </p>
                </div>
              </div>

              {/* Selector select input */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Select repo:</span>
                <select
                  value={selectedProjectId}
                  onChange={(e) => handleProjectSelect(Number(e.target.value))}
                  className="bg-black border border-cyan-500/30 rounded px-2.5 py-1 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 cursor-pointer"
                >
                  {projectsList.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="text-xs text-slate-400 font-mono mt-2 pl-7 border-l border-cyan-500/10">
              {currentProject.description || "No description provided."}
            </p>
          </div>

          {/* Main Visual Tabs Dashboard Module */}
          <div className="bg-slate-900/60 border border-cyan-500/20 rounded-xl flex flex-col flex-1 backdrop-blur-md shadow-[0_0_35px_rgba(6,182,212,0.05)] overflow-hidden">
            
            {/* Custom Tab Headers with glass effect */}
            <div className="grid grid-cols-4 border-b border-cyan-500/20 divide-x divide-cyan-500/10 bg-black/40 font-mono text-xs">
              <button
                onClick={() => setActiveTab("code")}
                className={`py-3 text-center font-bold tracking-wider hover:text-cyan-300 transition-all cursor-pointer uppercase ${
                  activeTab === "code" 
                    ? "bg-slate-900/80 text-cyan-400 border-b-2 border-cyan-400 shadow-[inset_0_-4px_10px_rgba(6,182,212,0.1)]" 
                    : "text-slate-450 hover:bg-slate-950/40"
                }`}
              >
                💾 Repo Code
              </button>
              <button
                onClick={() => setActiveTab("pipelines")}
                className={`py-3 text-center font-bold tracking-wider hover:text-cyan-300 transition-all cursor-pointer uppercase ${
                  activeTab === "pipelines" 
                    ? "bg-slate-900/80 text-cyan-400 border-b-2 border-cyan-400 shadow-[inset_0_-4px_10px_rgba(6,182,212,0.1)]" 
                    : "text-slate-450 hover:bg-slate-950/40"
                }`}
              >
                🚀 Pipelines
              </button>
              <button
                onClick={() => setActiveTab("issues")}
                className={`py-3 text-center font-bold tracking-wider hover:text-cyan-300 transition-all cursor-pointer uppercase ${
                  activeTab === "issues" 
                    ? "bg-slate-900/80 text-cyan-400 border-b-2 border-cyan-400 shadow-[inset_0_-4px_10px_rgba(6,182,212,0.1)]" 
                    : "text-slate-450 hover:bg-slate-950/40"
                }`}
              >
                ⚠️ Issues ({currentIssues.length})
              </button>
              <button
                onClick={() => setActiveTab("commits")}
                className={`py-3 text-center font-bold tracking-wider hover:text-cyan-300 transition-all cursor-pointer uppercase ${
                  activeTab === "commits" 
                    ? "bg-slate-900/80 text-cyan-400 border-b-2 border-cyan-400 shadow-[inset_0_-4px_10px_rgba(6,182,212,0.1)]" 
                    : "text-slate-450 hover:bg-slate-950/40"
                }`}
              >
                ⛓️ Git History
              </button>
            </div>

            {/* TAB CONTENT MODULE */}
            <div className="p-5 flex-1 flex flex-col min-h-[300px]">

              {/* Tab: CODE REVIEWER */}
              {activeTab === "code" && (
                <div className="flex-1 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 font-mono text-xs">
                      <Code className="w-4 h-4 text-cyan-400" />
                      <span className="text-slate-400">File active:</span>
                      <strong className="text-cyan-300 font-bold">{selectedFileName}</strong>
                    </div>

                    {/* File Switcher */}
                    <div className="flex gap-1">
                      {MOCK_FILES_FOR_PROJECT[selectedProjectId] &&
                        Object.keys(MOCK_FILES_FOR_PROJECT[selectedProjectId]).map((file) => (
                          <button
                            key={file}
                            onClick={() => {
                              setSelectedFileName(file);
                              addActivityLog(`Inspecting code file: ${file}`, "info");
                            }}
                            className={`px-2 py-1 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                              selectedFileName === file
                                ? "bg-cyan-500/10 border-cyan-400 text-cyan-300 font-bold"
                                : "bg-black/30 border-slate-800 text-slate-500 hover:border-cyan-500/20"
                            }`}
                          >
                            {file}
                          </button>
                        ))
                      }
                    </div>
                  </div>

                  <div className="flex-1 relative bg-black/80 rounded-lg border border-cyan-500/10 overflow-hidden flex flex-col shadow-inner">
                    <div className="w-full bg-slate-950/90 text-[10px] py-1.5 px-3 font-mono text-cyan-500/70 border-b border-cyan-500/5 flex justify-between select-none">
                      <span>{selectedFileName} - Gitsign Compiler buffer</span>
                      <span>UTF-8 • TSX</span>
                    </div>
                    <pre className="p-4 overflow-x-auto overflow-y-auto text-cyan-200 font-mono text-[11px] leading-relaxed max-h-[220px] custom-scrollbar selection:bg-cyan-500/45">
                      <code>{customFileContent}</code>
                    </pre>
                  </div>

                  <div className="flex items-center gap-2 p-2.5 rounded bg-cyan-950/15 border border-cyan-500/10 font-mono text-[11px] text-cyan-300">
                    <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>You can view and analyze this file using the <strong>Gitsign Console Recipe</strong> below. It'll automatically ingest this content!</span>
                  </div>
                </div>
              )}

              {/* Tab: PIPELINE STATUS */}
              {activeTab === "pipelines" && (
                <div className="flex-1 flex flex-col gap-4">
                  <div className="font-mono text-xs text-slate-400 flex justify-between">
                    <span>GITLAB CI PIPELINE HISTORIC MATRIX</span>
                    <span className="text-cyan-400 font-bold uppercase">Ready</span>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[280px] custom-scrollbar pb-2">
                    {currentPipelines.map((pipe) => (
                      <div
                        key={pipe.id}
                        className="p-3 bg-black/40 border border-cyan-500/10 rounded-lg hover:border-cyan-400/30 transition-all flex justify-between items-center"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-cyan-100">
                              #Pipeline {pipe.id}
                            </span>
                            <span className="text-[10px] bg-slate-900 border border-slate-850 px-1 py-0.5 rounded text-slate-400 font-mono">
                              Ref: {pipe.ref}
                            </span>
                          </div>
                          <div className="text-[10px] font-mono text-slate-500">
                            Triggered on SHA: <span className="text-cyan-500">{pipe.sha.slice(0, 12)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider ${
                            pipe.status === "success" 
                              ? "bg-emerald-950/50 border border-emerald-500/40 text-emerald-400"
                              : pipe.status === "failed"
                              ? "bg-rose-950/50 border border-rose-500/40 text-rose-400"
                              : "bg-amber-950/50 border border-amber-500/40 text-amber-400 animate-pulse"
                          }`}>
                            {pipe.status}
                          </span>
                          <a
                            href={pipe.web_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 px-2 hover:bg-cyan-500/10 border border-cyan-500/10 rounded text-[10px] font-mono text-cyan-400 flex items-center gap-1 group"
                          >
                            <span>LOGS</span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* GitLab runner spec */}
                  <div className="bg-black/40 p-3 rounded-lg border border-cyan-500/10 font-mono text-xs text-slate-400">
                    <span className="text-cyan-400 font-bold block mb-1">Active Runner Configuration:</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>Container Host: <span className="text-cyan-200">docker-dind-gitsign-v3</span></div>
                      <div>Resource Limit: <span className="text-cyan-200">4x vCPU core size</span></div>
                      <div>Image Type: <span className="text-cyan-200">alpine-node-python-combo</span></div>
                      <div>Cache State: <span className="text-cyan-200">ACTIVE - Node Shared Modules</span></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab: ISSUES INDEX */}
              {activeTab === "issues" && (
                <div className="flex-1 flex flex-col gap-4">
                  <div className="font-mono text-xs text-slate-400 flex justify-between">
                    <span>PENDING CODE SECRETS / DEVIANCY AUDITS</span>
                    <span>Total issues: {currentIssues.length}</span>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[300px] custom-scrollbar">
                    {currentIssues.length === 0 ? (
                      <div className="text-center py-8 text-xs font-mono text-slate-500">
                        🎉 Clean slate! No pending issues detected in this channel.
                      </div>
                    ) : (
                      currentIssues.map((issue) => (
                        <div
                          key={issue.id}
                          className="p-3 bg-black/40 border border-cyan-500/10 rounded-lg hover:border-cyan-400/30 transition-all flex flex-col gap-2"
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-mono text-xs font-bold text-cyan-200">
                              #{issue.iid}: {issue.title}
                            </span>
                            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-300 font-mono">
                              Open
                            </span>
                          </div>

                          <p className="text-[11px] font-mono text-slate-400 leading-normal">
                            {issue.description}
                          </p>

                          <div className="flex justify-between items-center text-[10px] font-mono border-t border-cyan-500/5 pt-2">
                            <span className="text-slate-500">
                              Reported by @{issue.author.username}
                            </span>

                            {/* Button directly linking to custom solver trigger console prompt */}
                            <span className="text-cyan-400 italic font-semibold">Ready for Triage</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Tab: COMMIT ARCHIVE */}
              {activeTab === "commits" && (
                <div className="flex-1 flex flex-col gap-4">
                  <div className="font-mono text-xs text-slate-400">
                    REPOSITORY PUSH ACTIVITY PIPELINE FEED
                  </div>

                  <div className="relative border-l-2 border-cyan-500/10 pl-4 ml-2 space-y-4 flex-1 overflow-y-auto max-h-[300px] custom-scrollbar scroll-smooth">
                    {currentCommits.map((commit) => (
                      <div key={commit.id} className="relative group">
                        {/* Bullet point nodes */}
                        <span className="absolute -left-[20px] top-1 h-2.5 w-2.5 rounded-full bg-cyan-400 group-hover:scale-115 transition-transform shadow-[0_0_8px_#22d3ee]" />

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-cyan-100 font-mono">
                              {commit.title}
                            </span>
                            <span className="text-[9px] text-cyan-500 font-mono px-1 bg-black/40 rounded border border-cyan-500/10">
                              {commit.short_id}
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-400 font-mono pl-1">
                            {commit.message}
                          </p>
                          <div className="text-[9px] text-slate-500 font-mono flex gap-2 pl-1">
                            <span>Author: @{commit.author_name}</span>
                            <span>•</span>
                            <span>{new Date(commit.committed_date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Connected Gemini AI Console Panel */}
          <ConsoleAgent
            selectedProjectName={currentProject.name}
            selectedBranch="main"
            activeCodeSample={{
              filename: selectedFileName,
              content: customFileContent,
              commits: currentCommits.map(c => ({ message: c.title, author: c.author_name, hash: c.short_id, date: c.committed_date })),
              issues: currentIssues.map(i => ({ iid: i.iid, title: i.title, desc: i.description, severity: "High" })),
              ciYaml: customCiYaml
            }}
            onLogMsg={(msg, type) => addActivityLog(msg, type, "Gemini Engine")}
          />

        </div>
      </main>

      {/* Futuristic footer metadata */}
      <footer className="border-t border-cyan-500/15 py-6 bg-black/80 relative z-30 select-none text-center font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[11px]">
          <div>
            <span>Gitsign AI Orchestrator Layer V3.5 • All networks synchronized.</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-cyan-400 transition-colors">Documentation</span>
            <span>•</span>
            <span className="hover:text-cyan-400 transition-colors">Secure Sandbox API</span>
            <span>•</span>
            <span className="hover:text-cyan-400 transition-colors text-cyan-400">STATUS: INTERFACE ACTIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
