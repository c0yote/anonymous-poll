import { Submission } from './submission.model.js';

export interface Poll {
  id: string;
  title: string;
  description: string;
  submissions: Submission[];
}
