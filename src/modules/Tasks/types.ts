type TaskStatus = "pending" | "hold" | "completed";

type Task = {
  status: TaskStatus;
  id: string;
  title: string;
  description: string | null;
  dueDate: Date | null;
};

type TasksResponse = {
  tasks: Task[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  nextPage: number | null;
  page: number;
  pagingCounter: number;
  prevPage: number | null;
  totalDocs: number;
  totalPages: number;
};

type CreateTaskArgs = {
  title: string;
  dueDate?: string | null;
  description?: string | null;
};

type UpdateTaskArgs = {
  id: string;
  title?: string;
  dueDate?: string | null;
  description?: string | null;
  status?: TaskStatus;
};
export type { Task, TasksResponse, CreateTaskArgs, UpdateTaskArgs, TaskStatus };
