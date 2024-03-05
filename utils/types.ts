export type FilterClauseType = {
  id: string;
  condition: string;
  value: number | string;
};

export type SubmissionsParams = {
  limit?: number;
  filters?: string;
  afterDate?: string;
  beforeDate?: string;
  offset?: number;
  status?: "in_progress" | "finished";
  includeEditLink?: boolean;
  sort?: "asc" | "desc";
};

export type Question = {
  id: string;
  name: string;
  type: string;
  value: string;
};

export type Submission = {
  submissionId: string;
  submissionTime: string;
  lastUpdatedAt: string;
  questions: Question[];
};
