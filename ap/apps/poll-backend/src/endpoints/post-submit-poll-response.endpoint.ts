import { Request, Response } from 'express';
import { SubmissionService } from '../services/submission.services.js';
import { RecordNotFoundError } from '../services/errors.js';

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
      if (error instanceof RecordNotFoundError) {
        res.status(404).json({ error: 'Poll not found' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
};
