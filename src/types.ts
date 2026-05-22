export interface GitLabProject {
  id: number;
  name: string;
  path_with_namespace: string;
  description: string | null;
  web_url: string;
  star_count: number;
  forks_count: number;
  last_activity_at: string;
}

export interface GitLabCommit {
  id: string;
  short_id: string;
  title: string;
  author_name: string;
  committed_date: string;
  message: string;
}

export interface GitLabIssue {
  id: number;
  iid: number;
  title: string;
  description: string;
  state: string;
  created_at: string;
  author: {
    name: string;
    username: string;
    avatar_url: string | null;
  };
  web_url: string;
}

export interface GitLabPipeline {
  id: number;
  status: "success" | "failed" | "running" | "pending" | "canceled";
  ref: string;
  sha: string;
  web_url: string;
  created_at: string;
  updated_at: string;
}

export interface AgentActivity {
  id: string;
  timestamp: string;
  type: "info" | "success" | "warning" | "error";
  message: string;
  source: "Gitsign Agent" | "GitLab Hook" | "Gemini Engine";
}

export interface AgentTask {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  category: "review" | "security" | "pipeline" | "issue" | "general";
  assignedModel: "gemini-3.5-flash" | "claude-3-haiku" | "internal";
}
