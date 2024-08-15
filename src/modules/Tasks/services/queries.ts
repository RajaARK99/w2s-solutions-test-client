import { useInfiniteQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/global";

import { TasksResponse, TaskStatus } from "../types";

const useTasks = (status?: TaskStatus) => {
  return useInfiniteQuery({
    queryKey: ["tasks", status],
    queryFn: async ({ pageParam }) => {
      const { data } = await axiosInstance.get<TasksResponse>(
        status
          ? `/tasks?page=${pageParam}&limit=10&status=${status}`
          : `/tasks?page=${pageParam}&limit=10`
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage;
    },
    gcTime: 0,
  });
};

export { useTasks };
