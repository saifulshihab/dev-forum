type Timestamp = string;
type UUID = string;

export enum BudgetType {
  FIXED = "fixed",
  HOURLY = "hourly",
  NEGOTIABLE = "negotiable"
}

export interface IProject {
  id: UUID;
  user_id: UUID;
  title: string;
  description: string;
  budget?: number;
  budget_type: BudgetType;
  estimated_duration?: string;
  skills_required: string[];
  created_at: Timestamp;
  updated_at: Timestamp;
}
