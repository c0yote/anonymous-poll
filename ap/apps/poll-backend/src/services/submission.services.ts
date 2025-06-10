import { Low } from 'lowdb';
import { Schema } from '../database.js';
import { RecordNotFoundError } from './errors.js';
import { Submission, SubmissionResponse } from '../models/submission.model.js';
import { ulid } from 'ulid';

export class SubmissionService {
  constructor(private readonly db: Low<Schema>) {}

  async submitPollResponse(
    pollId: string,
    response: SubmissionResponse
  ): Promise<Submission> {
    throw new Error('Not implemented');
  }

  async getSubmissionsByPollId(pollId: string): Promise<Submission[]> {
    const submissions = this.db.data.submissions.filter(
      (submission) => submission.pollId === pollId
    );

    if (!submissions) {
      return [];
    }

    return submissions.map((submission) => ({
      id: submission.id,
      responses: submission.responses,
    }));
  }
}
