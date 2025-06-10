import { Request, Response } from 'express';
import { PollService } from '../services/poll.service.js';

export const createPollEndpoint = (pollService: PollService) => {
  return async (req: Request, res: Response) => {
    const poll = await pollService.createPoll(req.body);
    res.status(201).json(poll);
  };
};
