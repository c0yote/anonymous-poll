export interface SubmissionResponse {
  clarity: number;
  energy: number;
  psychologicalSafety: number;
  workLifeBalance: number;
  confidence: number;
  efficiency: number;
}

export interface Submission {
  id: string;
  responses: SubmissionResponse;
}
