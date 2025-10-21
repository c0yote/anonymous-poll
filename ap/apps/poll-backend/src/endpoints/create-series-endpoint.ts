import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { CreateSeriesOptions, createSeriesSchema, SeriesService } from '../services/series.service.js';

export const createSeriesEndpoint = async (seriesService: SeriesService) => {
  return async (req: Request, res: Response) => {
    try {
      const validated = createSeriesSchema.parse(req.body) as CreateSeriesOptions;
      const series = await seriesService.createSeries(validated);
      res.status(201).json(series);
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
