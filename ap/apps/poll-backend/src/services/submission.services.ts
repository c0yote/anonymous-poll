import { Low } from 'lowdb';
import { Schema } from '../database.js';
import { RecordNotFoundError } from './errors.js';
import { Submission, SubmissionRequest, SubmissionResponse } from '../models/submission.model.js';
import { ulid } from 'ulid';

export class SubmissionService {
  constructor(private readonly db: Low<Schema>) { }

  async submitPollResponse(
    request: SubmissionRequest

  ): Promise<Submission> {
    try {
      const submissionData = {
        id: ulid(),
        pollId: request.pollId,
        submitterId: request.submissionId,
        responses: {
          clarity: request.clarity,
          energy: request.energy,
          psychologicalSafety: request.psychologicalSafety,
          workLifeBalance: request.workLifeBalance,
          confidence: request.confidence,
          efficiency: request.efficiency,
        }
      }
      await this.db.data.submissions.push(submissionData)
      await this.db.write();

      return this.getSubmissionById(submissionData.id)
    } catch (error) {
      console.log("Error occured while doing submission : ", error)
    }
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
      submitterId: submission.submitterId,
      pollId: submission.pollId
    }));
  }

  async getSubmissionById(id: string): Promise<Submission> {
    const submissions = this.db.data.submissions.filter(
      (submission) => submission.id === id
    );

    if (!submissions) {
      throw new RecordNotFoundError(`Poll with id ${id} not found`);
    }

    const submissionDetails = submissions[0];

    return {
      id: submissionDetails.id,
      responses: submissionDetails.responses,
      submitterId: submissionDetails.submitterId,
      pollId: submissionDetails.pollId
    }
  }
}
