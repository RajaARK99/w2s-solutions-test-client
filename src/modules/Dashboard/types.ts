type MetricsResponse = {
  total: number;
  pending: number;
  hold: number;
  completed: number;
};

type MonthMetricsResponse = { month: string; tasks: number | null }[];
type YearMetricsResponse = { year: number; tasks: number | null };

export type { MetricsResponse, MonthMetricsResponse, YearMetricsResponse };
