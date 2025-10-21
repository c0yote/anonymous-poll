export function sharedTypes(): string {
  return 'shared-types';
}

export interface DeltaResult {
  category: string;
  score: number;
  scoreTrend: number;
  unfavorableTrend: number;
  neutralTrend: number;
  favorableTrend: number;
  unfavorablePercentage: number;
  neutralPercentage: number;
  favorablePercentage: number;
}

export interface PollSchema {
  id: string;
  seriesId: string;
  title: string;
  description: string;
  submissionIds: string[];
}

export interface SeriesSchema {
  id: string;
  name: string;
  description: string;
  pollIds: string[];
}
