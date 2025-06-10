import { Request, Response } from 'express';
import {
  createPollSchema,
  PollService,
  CreatePollOptions,
} from '../services/poll.service.js';
import { ZodError } from 'zod';

export const createPollEndpoint = (pollService: PollService) => {
  return async (req: Request, res: Response) => {
    try {
      const validated = createPollSchema.parse(req.body) as CreatePollOptions;
      const poll = await pollService.createPoll(validated);
      res.status(201).json(poll);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Invalid request body',
          details: error.errors,
        });
        return;
      }
      throw error;
    }
  };
};
