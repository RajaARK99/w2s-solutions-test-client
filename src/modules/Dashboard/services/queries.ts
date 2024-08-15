import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/global";

import {
  MetricsResponse,
  MonthMetricsResponse,
  YearMetricsResponse,
} from "@/modules/Dashboard";

const useMetrics = () =>
  useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<MetricsResponse>(
        "dashboard/metrics"
      );
      return data;
    },
  });

const useMonthMetrics = () =>
  useQuery({
    queryKey: ["month-metrics"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<MonthMetricsResponse>(
        `dashboard/month-metrics?year=${new Date().getFullYear()}`
      );
      return data;
    },
  });

const useYearMetrics = (year: number) =>
  useQuery({
    queryKey: ["year-metrics", year],
    queryFn: async () => {
      const { data } = await axiosInstance.get<YearMetricsResponse>(
        `dashboard/year-metrics?year=${year}`
      );
      return data;
    },
  });

export { useMetrics, useMonthMetrics, useYearMetrics };
