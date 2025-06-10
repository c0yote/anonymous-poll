import { Poll } from './poll.model.js';

export interface Series {
  id: string;
  name: string;
  description: string;
  polls: Poll[];
}
