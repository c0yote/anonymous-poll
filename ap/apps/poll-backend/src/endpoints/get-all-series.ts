import { Request, Response } from 'express';
import { SeriesService } from '../services/series.service.js';

export const getAllSeries = async (seriesService: SeriesService) => {
  return async (req: Request, res: Response) => {
    try {
      const series = await seriesService.getAllSeries();

      res.send(series);
    } catch (error) {
      console.error(`[ error ] ${error}`);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
};
