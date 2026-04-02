export interface BufoProject {
  alias: string;
  session_name: string;
  tadpole_base: string;
  main_repo: string;
  tadpoles: {
    count: number;
    prefix: string;
    branch_pattern: string;
  };
  ports?: {
    api_base?: number | undefined;
    app_base?: number | undefined;
  } | undefined;
  layout?: {
    panes?: Array<{ name: string; command: string }> | undefined;
  } | undefined;
}

export interface TadpoleMeta {
  type?: "tadpole" | "ticket" | "pr" | undefined;
  name?: string | undefined;
  ticket?: string | undefined;
  ticket_url?: string | undefined;
  pr_number?: string | undefined;
  pr_title?: string | undefined;
  pr_url?: string | undefined;
  links?: Array<{ label: string; url: string }> | undefined;
}

export interface TadpoleState {
  tadpole: number | string;
  window_id: string;
  tab_id: string;
  panes: {
    terminal: string;
    server: string;
    main: string;
    info?: string | undefined;
  };
  created_at: string;
}

export interface BufoTadpole {
  project: BufoProject;
  number: number;
  directory: string;
  branch: string;
  locked: boolean;
  active: boolean;
  meta?: TadpoleMeta | undefined;
  state?: TadpoleState | undefined;
  customName?: string | undefined;
}

export interface GlobalConfig {
  default_project?: string | undefined;
  aliases?: Record<string, string> | undefined;
  log_retention_days?: number | undefined;
}

export interface SessionLayout {
  window_id: string;
  terminal_sid: string;
  server_sid: string;
  main_sid: string;
  info_sid: string;
}

export interface BufoSession {
  name: string;
  project: string;
  created: string;
  last_accessed: string;
  summary: string;
  type: "general" | "review" | "court";
  prs?: string[] | undefined;
  // derived at load time:
  active: boolean;
  hasReviewOutput: boolean;
  layout?: SessionLayout | undefined;
}
