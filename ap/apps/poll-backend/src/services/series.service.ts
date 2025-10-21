import { Low } from 'lowdb';
import { Schema, SeriesSchema } from '../database.js';
import { Series } from '../models/series.model.js';
import { RecordNotFoundError } from './errors.js';
import { PollService } from './poll.service.js';

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
}
