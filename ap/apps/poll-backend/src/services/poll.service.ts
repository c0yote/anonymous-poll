import { Low } from 'lowdb';
import { PollSchema, Schema } from '../database.js';
import { RecordNotFoundError } from './errors.js';
import { Poll } from '../models/poll.model.js';
import { Submission } from '../models/submission.model.js';
import { SubmissionService } from './submission.services.js';
import { ulid } from 'ulid';
import { z } from 'zod';

export interface CreatePollOptions {
  seriesId: string;
  title: string;
  description: string;
}

export const createPollSchema = z.object({
  seriesId: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

export class PollService {
  constructor(
    private readonly db: Low<Schema>,
    private readonly submissionService: SubmissionService
  ) {}

  async createPoll(options: CreatePollOptions): Promise<Poll> {
    const newPoll = {
      ...options,
      id: ulid(),
      submissionIds: [],
    };

    await this.db.data.polls.push(newPoll);

    await this.db.write();

    return this.getPollById(newPoll.id);
  }

  private async getSubmissionsForPoll(pollId: string): Promise<Submission[]> {
    const submissions = this.submissionService.getSubmissionsByPollId(pollId);

    if (!submissions) {
      return [];
    }

    return submissions;
  }

  async getPollsbySeriesId(seriesId: string): Promise<Poll[]> {
    const polls = this.db.data.polls.filter(
      (poll) => poll.seriesId === seriesId
    );

    if (!polls) {
      return [];
    }

    return await Promise.all(
      polls.map(async (poll) => {
        const submissions = await this.getSubmissionsForPoll(poll.id);
        return {
          ...poll,
          submissions,
        };
      })
    );
  }

  async getPollById(id: string): Promise<Poll> {
    const poll = this.db.data.polls.find((poll) => poll.id === id);

    if (!poll) {
      throw new RecordNotFoundError(`Poll with id ${id} not found`);
    }

    const submissions = await this.getSubmissionsForPoll(poll.id);

    return {
      ...poll,
      submissions,
    };
  }
}
