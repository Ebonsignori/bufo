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
    api_base?: number;
    app_base?: number;
  };
  layout?: {
    panes?: Array<{ name: string; command: string }>;
  };
}

export interface TadpoleMeta {
  type?: "tadpole" | "ticket" | "pr";
  name?: string;
  ticket?: string;
  ticket_url?: string;
  pr_number?: string;
  pr_title?: string;
  pr_url?: string;
  links?: Array<{ label: string; url: string }>;
}

export interface TadpoleState {
  tadpole: number | string;
  window_id: string;
  tab_id: string;
  panes: {
    terminal: string;
    server: string;
    main: string;
    info?: string;
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
  meta?: TadpoleMeta;
  state?: TadpoleState;
  customName?: string;
}

export interface GlobalConfig {
  default_project?: string;
  aliases?: Record<string, string>;
  log_retention_days?: number;
}
