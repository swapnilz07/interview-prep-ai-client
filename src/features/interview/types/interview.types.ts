export interface TechnicalQuestion {
  question: string;
  intention: string;
  answer: string;
}

export interface BehavioralQuestion {
  question: string;
  intention: string;
  answer: string;
}

export interface SkillGap {
  skill: string;
  severity: "low" | "medium" | "high";
}

export interface PreparationPlanDay {
  day: number;
  focus: string;
  tasks: string[];
}

export interface AiMetadata {
  model: string;
  totalTokens: number;
  costInCents: number;
}

export interface InterviewReport {
  _id: string;
  jobDescription: string;
  resume?: string;
  selfDescription?: string;
  title: string;
  matchScore: number;
  technicalQuestions: TechnicalQuestion[];
  behavioralQuestions: BehavioralQuestion[];
  skillGaps: SkillGap[];
  preparationPlan: PreparationPlanDay[];
  user: string;
  status: "draft" | "processing" | "completed" | "failed";
  aiMetadata?: AiMetadata;
  createdAt: string;
  updatedAt: string;
}

export interface GenerateReportPayload {
  title: string;
  jobDescription: string;
  selfDescription?: string;
  resume?: File; // For FormData
}
