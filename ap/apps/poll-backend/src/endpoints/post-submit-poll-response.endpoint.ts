import { Request, Response } from 'express';
import { SubmissionService } from '../services/submission.services.js';

export const submitPollResponseEndpoint = async (
  submissionService: SubmissionService
) => {
  return async (req: Request, res: Response) => {
    try {
      const submission = await submissionService.submitPollResponse(
        req.body,
      );
      res.send(submission);
    } catch (error) {
      console.error(`[ error ] ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};
