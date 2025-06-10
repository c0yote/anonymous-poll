import { Poll } from './poll.model.js';

export interface Series {
  id: string;
  polls: Poll[];
}
