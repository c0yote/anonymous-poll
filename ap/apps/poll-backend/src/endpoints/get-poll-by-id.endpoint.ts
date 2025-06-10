import { Request, Response } from 'express';
import { PollService } from '../services/poll.service.js';
import { RecordNotFoundError } from '../services/errors.js';

export const getPollByIdEndpoint = async (pollService: PollService) => {
  return async (req: Request, res: Response) => {
    try {
      const poll = await pollService.getPollById(req.params.id);

      res.send(poll);
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        res.status(404).json({ error: 'Poll not found' });
      } else {
        console.error(`[ error ] ${error}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
};
