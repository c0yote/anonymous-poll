import { Low } from 'lowdb';
import { Schema, SeriesSchema } from '../database.js';
import { Series } from '../models/series.model.js';
import { RecordNotFoundError } from './errors.js';
import { PollService } from './poll.service.js';
import { z } from 'zod';
import { ulid } from 'ulid';

export interface CreateSeriesOptions {
  title: string;
  description: string;
}

export const createSeriesSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export class SeriesService {
  constructor(
    private readonly db: Low<Schema>,
    private readonly pollService: PollService
  ) {}

  async getSeriesById(id: string): Promise<Series> {
    const series = this.db.data.series.find((series) => series.id === id);

    if (!series) {
      throw new RecordNotFoundError(`Series with id ${id} not found`);
    }

    return {
      id: series.id,
      name: series.name,
      description: series.description,
      polls: await this.pollService.getPollsbySeriesId(series.id),
    };
  }

  async getAllSeries(): Promise<SeriesSchema[]> {
    const allSeries = this.db.data.series;

    console.log(allSeries);

    return allSeries;
  }

  async createSeries(options: CreateSeriesOptions): Promise<Series> {
    const newSeries: SeriesSchema = {
      id: ulid(),
      name: options.title,
      description: options.description,
      pollIds: []
    }

    this.db.data.series.push(newSeries);

    await this.db.write();

    return this.getSeriesById(newSeries.id);

  }
}
