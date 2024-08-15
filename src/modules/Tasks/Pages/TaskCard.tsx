/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { cn, Observe } from "@/global";
import { format } from "date-fns";
import {
  CircleCheck,
  CircleEllipsis,
  CirclePause,
  Clock3,
  Eye,
  Loader2,
  Trash2,
} from "lucide-react";
import { FC, Fragment, useState } from "react";
import { DialogTrigger } from "react-aria-components";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components";

import { Task, useDeleteTask } from "@/modules/Tasks";

interface Props {
  task: Task;
  tasks: Task[];
  index: number;
  observe: Observe<HTMLDivElement>;
  onEdit: () => void;
}

const TaskCard: FC<Props> = ({ task, tasks, index, observe, onEdit }) => {
  const deleteModalHandler = () => {
    setOpen((prevState) => !prevState);
  };
  const { mutate, isPending } = useDeleteTask(task?.id, () => {
    deleteModalHandler();
  });

  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Card ref={tasks?.length - 1 === index ? observe : undefined}>
        <CardHeader className="flex-row justify-between items-center p-3 gap-2 grid  grid-cols-2">
          <p className="truncate text-xl flex-1">{task?.title}</p>

          <div className="ml-auto flex">
            <div className="flex gap-2 items-center col-start-2 row-start-1 ml-auto">
              <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
                className={cn(
                  "focus:outline-none data-[state=open]:bg-accent data-[focused]:bg-accent"
                )}
                onPress={onEdit}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
            <div className="flex gap-2 items-center col-start-2 row-start-1 ml-auto">
              <Button
                aria-haspopup="true"
                size="icon"
                variant="ghost"
                className={cn(
                  "focus:outline-none data-[state=open]:bg-accent data-[focused]:bg-accent"
                )}
                onPress={deleteModalHandler}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-3 pb-3 space-y-3">
          <div className="flex justify-between items-center">
            <div className={"flex gap-2 items-center text-muted-foreground"}>
              {task?.dueDate && <Clock3 className="size-4 min-h-4 min-w-4" />}
              <p className="flex gap-1 text-xs whitespace-nowrap">
                {task?.dueDate
                  ? format(new Date(task.dueDate), "MMM dd, yyyy")
                  : ""}
              </p>
            </div>

            <div
              className={cn(
                "flex gap-1 items-center text-muted-foreground",
                task?.status === "completed"
                  ? "text-green-400"
                  : task?.status === "hold"
                  ? "text-yellow-600"
                  : "text-primary"
              )}
            >
              {task?.status === "completed" ? (
                <CircleCheck className="size-4 min-h-4 min-w-4" />
              ) : task.status === "hold" ? (
                <CirclePause className="size-4 min-h-4 min-w-4" />
              ) : (
                <CircleEllipsis className="size-4 min-h-4 min-w-4" />
              )}
              <p className="text-xs whitespace-nowrap">{task?.status ?? "-"}</p>
            </div>
          </div>
          {task?.description && (
            <p className="text-xs flex flex-col line-clamp-5">
              {task?.description ?? "-"}
            </p>
          )}
        </CardContent>
      </Card>
      <DialogTrigger isOpen={open} onOpenChange={setOpen}>
        <DialogOverlay
          isKeyboardDismissDisabled={isPending}
          isDismissable={!isPending}
        >
          <DialogContent role="alertdialog" className="sm:max-w-[400px]">
            {({ close }) => (
              <>
                <DialogHeader>
                  <DialogTitle>Delete task</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-sm text-muted-foreground">
                  Are you sure want to delete this task?
                </DialogDescription>
                <DialogFooter className="gap-2">
                  <Button
                    isDisabled={isPending}
                    onPress={close}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    isDisabled={isPending}
                    variant="destructive"
                    onPress={() => {
                      mutate();
                    }}
                  >
                    {isPending ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : null}
                    Confirm
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </DialogOverlay>
      </DialogTrigger>
    </Fragment>
  );
};

export default TaskCard;
