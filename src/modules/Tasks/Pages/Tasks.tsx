import { TableProperties } from "lucide-react";
import { Fragment, useState } from "react";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  JollySelect,
  SelectItem,
  Skeleton,
} from "@/components";

import { notEmpty, useInView } from "@/global";

import { Task, TaskStatus, useTasks } from "@/modules/Tasks";
import TaskCard from "@/modules/Tasks/Pages/TaskCard";
import EditTasks from "@/modules/Tasks/Pages/EditTasks";

const Tasks = () => {
  const [status, setStatus] = useState<TaskStatus | undefined>(undefined);
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useTasks(status);

  const totalDocs = data?.pages?.[0]?.totalDocs ?? 0;

  const tasks =
    data?.pages
      ?.map((docs) => docs.tasks)
      ?.filter(notEmpty)
      ?.flat(2) ?? [];

  const { observe } = useInView<HTMLDivElement>({
    onEnter: () => {
      if (hasNextPage) {
        fetchNextPage();
      }
    },
  });

  const [editTask, setEditTask] = useState<{
    open: boolean;
    task?: Task | null;
  }>({
    open: false,
    task: null,
  });

  const createTask = () => {
    setEditTask({
      open: true,
      task: null,
    });
  };
  return (
    <Fragment>
      <Card className="min-h-[calc(100vh-92px)] border-dashed m-3 p-2 divide-y">
        <CardHeader className="px-0  flex-col sm:flex-row items-center justify-between pt-3">
          <h2 className="text-xl truncate">List of tasks</h2>

          <div className="flex items-center gap-2">
            <JollySelect
              selectedKey={status ?? null}
              onSelectionChange={(key) => {
                const status = key as unknown as TaskStatus;
                setStatus((prevStatus) => {
                  return status === prevStatus ? undefined : status;
                });
              }}
              placeholder="Status"
              placement="bottom end"
              popOverClassName="w-[200px]"
            >
              <SelectItem id="pending">Pending</SelectItem>
              <SelectItem id="hold">Hold</SelectItem>
              <SelectItem id="completed">Completed</SelectItem>
            </JollySelect>
            {totalDocs === 0 && !isPending ? null : (
              <Button size="sm" onPress={createTask} className={"max-w-40"}>
                Create task
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-2 px-0 grid grid-cols-1 gap-2">
          {!isPending && !isFetchingNextPage && totalDocs === 0 ? (
            <div className="flex h-[400px] items-center justify-center rounded-md flex-1">
              <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                <TableProperties className="size-6" />
                <h3 className="mt-4 text-lg font-semibold">
                  No tasks available.
                </h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  You have not added any tasks. Add one below.
                </p>
                <Button size="sm" onPress={createTask}>
                  Create Task
                </Button>
              </div>
            </div>
          ) : null}
          {totalDocs > 0
            ? tasks?.map((task, i) => {
                return task?.id ? (
                  <TaskCard
                    index={i}
                    task={task}
                    tasks={tasks}
                    onEdit={() => {
                      setEditTask({
                        open: true,
                        task,
                      });
                    }}
                    observe={observe}
                    key={i}
                  />
                ) : null;
              })
            : null}
          {isPending || isFetchingNextPage
            ? Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="min-w-full min-h-[100px]" />
              ))
            : null}
        </CardContent>
      </Card>
      {editTask?.open && (
        <EditTasks
          open={editTask?.open}
          onOpenChange={(open) => {
            setEditTask({
              open,
              task: null,
            });
          }}
          task={editTask?.task}
        />
      )}
    </Fragment>
  );
};

export default Tasks;
