import { Request, Response } from 'express';
import { SeriesService } from '../services/series.service.js';
import { RecordNotFoundError } from '../services/errors.js';

export const getSeriesByIdEndpoint = async (seriesService: SeriesService) => {
  return async (req: Request, res: Response) => {
    try {
      const series = await seriesService.getSeriesById(req.params.id);

      res.send(series);
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        res.status(404).json({ error: 'Series not found' });
      } else {
        console.error(`[ error ] ${error}`);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
};
