import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Skeleton,
} from "@/components";

import {
  CircleCheck,
  CircleEllipsis,
  CirclePause,
  Package,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { useMetrics, useMonthMetrics, useYearMetrics } from "../services";
import { MonthMetricsResponse } from "../types";
import { cn } from "@/global";

const Dashboard = () => {
  const { data: metrics, isPending: isMetricsPending } = useMetrics();
  const dashboardMetrics = metrics ?? {
    total: 0,
    pending: 0,
    hold: 0,
    completed: 0,
  };

  const { data: monthWiseMetrics, isPending: isMonthWiseMetricsLoading } =
    useMonthMetrics();

  const { data: currentYearResponse, isPending: isCurrentYearLoading } =
    useYearMetrics(new Date().getFullYear());
  const { data: previousYearResponse, isPending: isPreviousYearLoading } =
    useYearMetrics(new Date().getFullYear() - 1);

  const chartData = monthWiseMetrics ?? ([] as unknown as MonthMetricsResponse);

  const chartConfig = {
    tasks: {
      label: "Tasks",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;
  return (
    <div className="min-h-[calc(100vh-68px)] space-y-5 p-5">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {Object.entries(dashboardMetrics!)?.map(([key, value], i) => {
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium capitalize">
                  {key}
                </CardTitle>
                <div
                  className={cn(
                    "size-10 rounded-lg bg-muted flex justify-center items-center",
                    key === "total"
                      ? "bg-pink-300/30 dark:bg-pink-300/10"
                      : key === "pending"
                      ? "bg-blue-300/30 dark:bg-blue-300/10"
                      : key === "hold"
                      ? "bg-yellow-400/30 dark:bg-yellow-400/10"
                      : key === "completed"
                      ? "bg-green-300/30 dark:bg-green-300/10"
                      : ""
                  )}
                >
                  {key === "total" ? (
                    <Package className="size-5 text-pink-700" />
                  ) : key === "pending" ? (
                    <CircleEllipsis className="size-5 text-primary" />
                  ) : key === "hold" ? (
                    <CirclePause className="size-5 text-yellow-600" />
                  ) : key === "completed" ? (
                    <CircleCheck className="size-5 text-green-400" />
                  ) : null}
                </div>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {isMetricsPending ? <Skeleton className="w-8 h-8" /> : value}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 md:gap-8 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{new Date().getFullYear()}</CardTitle>
          </CardHeader>
          <CardContent>
            {isMonthWiseMetricsLoading ? (
              <Skeleton className="h-[250px]" />
            ) : monthWiseMetrics && monthWiseMetrics?.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-[150px] w-full">
                <BarChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 20,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="tasks"
                    fill="var(--color-tasks)"
                    radius={8}
                    barSize={20}
                  />
                </BarChart>
              </ChartContainer>
            ) : (
              <div className="border border-dashed rounded flex justify-center items-center h-[250px] w-full">
                <p className="text-muted-foreground text-sm">
                  You don't have any tasks in this year
                </p>
              </div>
            )}
          </CardContent>
          {monthWiseMetrics && monthWiseMetrics?.length > 0 ? (
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="leading-none text-muted-foreground">
                Showing total tasks in this year.
              </div>
            </CardFooter>
          ) : null}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks by year</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {isCurrentYearLoading ? (
                  <Skeleton className="w-8 h-6" />
                ) : (
                  currentYearResponse?.tasks ?? 0
                )}
                <span className="text-sm font-normal text-muted-foreground">
                  tasks
                </span>
              </div>
              {isCurrentYearLoading ? (
                <Skeleton className="w-full h-7" />
              ) : (
                <ChartContainer
                  config={{
                    tasks: {
                      label: "tasks",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[32px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    layout="vertical"
                    margin={{
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    data={[
                      {
                        date: new Date().getFullYear().toString(),
                        tasks: currentYearResponse?.tasks ?? 0,
                      },
                    ]}
                  >
                    <Bar
                      dataKey="tasks"
                      fill="var(--color-tasks)"
                      radius={4}
                      barSize={32}
                    >
                      <LabelList
                        position="insideLeft"
                        dataKey="date"
                        offset={8}
                        fontSize={12}
                        fill="white"
                      />
                    </Bar>
                    <YAxis dataKey="date" type="category" tickCount={1} hide />
                    <XAxis dataKey="tasks" type="number" hide />
                  </BarChart>
                </ChartContainer>
              )}
            </div>
            <div className="grid auto-rows-min gap-2">
              <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {isPreviousYearLoading ? (
                  <Skeleton className="w-8 h-6" />
                ) : (
                  previousYearResponse?.tasks ?? 0
                )}
                <span className="text-sm font-normal text-muted-foreground">
                  tasks
                </span>
              </div>
              {isPreviousYearLoading ? (
                <Skeleton className="w-full h-7" />
              ) : (
                <ChartContainer
                  config={{
                    tasks: {
                      label: "Tasks",
                      color: "hsl(var(--muted))",
                    },
                  }}
                  className="aspect-auto h-[32px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    layout="vertical"
                    margin={{
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    data={[
                      {
                        date: (new Date().getFullYear() - 1)?.toString(),
                        tasks: previousYearResponse?.tasks ?? 0,
                      },
                    ]}
                  >
                    <Bar
                      dataKey="tasks"
                      fill="var(--color-tasks)"
                      radius={4}
                      barSize={32}
                    >
                      <LabelList
                        position="insideLeft"
                        dataKey="date"
                        offset={8}
                        fontSize={12}
                        fill="hsl(var(--muted-foreground))"
                      />
                    </Bar>
                    <YAxis dataKey="date" type="category" tickCount={1} hide />
                    <XAxis dataKey="tasks" type="number" hide />
                  </BarChart>
                </ChartContainer>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
