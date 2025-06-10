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
  submitterId: string
  pollId: string
  responses: SubmissionResponse;
}

export interface SubmissionRequest {
  submissionId: string;
  clarity: number;
  energy: number;
  psychologicalSafety: number;
  workLifeBalance: number;
  confidence: number;
  efficiency: number;
  pollId: string;
}
