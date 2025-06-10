import { Poll } from './models/poll.model.js';
import { Series } from './models/series.model.js';
import { Submission } from './models/submission.model.js';

export interface PollSchema {
  id: string;
  seriesId: string;
  title: string;
  description: string;
  submissionIds: string[];
}

export interface SeriesSchema {
  id: string;
  name: string;
  description: string;
  pollIds: string[];
}

export interface SubmissionResponseSchema {
  clarity: number;
  energy: number;
  psychologicalSafety: number;
  workLifeBalance: number;
  confidence: number;
  efficiency: number;
}

export interface SubmissionSchema {
  id: string;
  pollId: string;
  responses: SubmissionResponseSchema;
}

export interface Schema {
  submissions: SubmissionSchema[];
  series: SeriesSchema[];
  polls: PollSchema[];
}

export async function setupDatabase() {
  const { JSONFilePreset } = await import('lowdb/node');
  const db = await JSONFilePreset<Schema>('db.json', {
    submissions: [],
    series: [
      {
        id: '0',
        name: 'Wolverines',
        description: 'Retrospective poll series for Wolverines',
        pollIds: [],
      },
    ],
    polls: [],
  });

  db.write();

  return db;
}
