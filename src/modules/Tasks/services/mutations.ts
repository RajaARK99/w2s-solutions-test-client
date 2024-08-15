import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { axiosInstance } from "@/global";

import { CreateTaskArgs, Task, UpdateTaskArgs } from "@/modules/Tasks";

const useCreateTask = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation<
    Task,
    AxiosError<{ code: number; message: string }>,
    CreateTaskArgs
  >({
    mutationKey: ["create-task"],
    mutationFn: async (data) => {
      return axiosInstance.post("tasks/create-task", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      onSuccess();
    },
    onError: ({ message }) => {
      toast.error(`Task creation failed. ${message}`);
    },
  });
};
const useUpdateTask = ({ onSuccess }: { onSuccess: () => void }) => {
  const queryClient = useQueryClient();
  return useMutation<
    Task,
    AxiosError<{ code: number; message: string }>,
    UpdateTaskArgs
  >({
    mutationKey: ["update-task"],
    mutationFn: (data) => {
      return axiosInstance.patch("tasks/update-task", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      onSuccess();
    },
    onError: ({ message }) => {
      toast.error(`Task update failed. ${message}`);
    },
  });
};

const useDeleteTask = (id: string, onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<Task, AxiosError<{ code: number; message: string }>>({
    mutationKey: ["delete-task"],
    mutationFn: () => {
      return axiosInstance.delete(`tasks/delete-task/${id}`);
    },
    onError: () => {
      toast.error(`Delete tasks failed. Try again.`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      onSuccess();
    },
  });
};

export { useCreateTask, useUpdateTask, useDeleteTask };
