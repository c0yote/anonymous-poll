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
