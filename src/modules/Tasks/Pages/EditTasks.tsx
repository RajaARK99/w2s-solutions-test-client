import { FC } from "react";

import {
  Button,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components";
import { Task } from "../types";
import { Form } from "react-hook-form";
import { useForm } from "@/global";
import { taskFormSchema } from "../schema";
import { useCreateTask, useUpdateTask } from "../services";
import { format } from "date-fns";
import { getLocalTimeZone, today } from "@internationalized/date";
import { DatePicker, Input, TextArea, Select } from "@/components/Form";
import { Loader2 } from "lucide-react";
import { parseDate } from "@internationalized/date";

interface Props {
  task?: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditTasks: FC<Props> = ({ open, onOpenChange, task }) => {
  const { control } = useForm({
    schema: taskFormSchema,
    defaultValues: {
      description: task?.description ?? null,
      dueDate:
        task?.dueDate && parseDate(format(task?.dueDate, "yyyy-MM-dd"))
          ? parseDate(format(task.dueDate, "yyyy-MM-dd"))
          : task?.id
          ? null
          : today(getLocalTimeZone()),
      form: task?.id ? "update" : "create",
      status: task?.status ? task?.status : null,
      title: task?.title ?? (null as unknown as string),
    },
  });

  const { mutate: create, isPending: createLoading } = useCreateTask({
    onSuccess: () => {
      onOpenChange(false);
    },
  });
  const { mutate: update, isPending: updateLoading } = useUpdateTask({
    onSuccess: () => {
      onOpenChange(false);
    },
  });

  const loading = createLoading || updateLoading;
  return (
    <DialogTrigger isOpen={open} onOpenChange={onOpenChange}>
      <DialogOverlay
        isKeyboardDismissDisabled={loading}
        isDismissable={!loading}
      >
        <DialogContent className="sm:max-w-[350px] p-4">
          {({ close }) => (
            <Form
              control={control}
              onSubmit={({ data: { title, description, dueDate, status } }) => {
                if (task?.id) {
                  update({
                    id: task?.id,
                    description,
                    dueDate: dueDate
                      ? format(dueDate.toDate(getLocalTimeZone()), "yyyy-MM-dd")
                      : null,
                    status: status ?? undefined,
                    title,
                  });
                } else {
                  create({
                    description,
                    dueDate: dueDate
                      ? format(dueDate.toDate(getLocalTimeZone()), "yyyy-MM-dd")
                      : null,
                    title,
                  });
                }
              }}
            >
              <DialogHeader>
                <DialogTitle>{task?.id ? "Update" : "Create"} task</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  inputType="controlled"
                  control={control}
                  name="title"
                  label={"Title"}
                  placeholder="Title"
                />
                <DatePicker
                  control={control}
                  name="dueDate"
                  type="controlled"
                  granularity="day"
                  label={"Due date"}
                />
                {task?.id && (
                  <Select
                    control={control}
                    name="status"
                    options={["pending", "hold", "completed"]}
                    label={"Status"}
                    placeholder="Status"
                  />
                )}
                <TextArea
                  control={control}
                  name="description"
                  type="controlled"
                  label={"Description"}
                  placeholder="description"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onPress={close} isDisabled={loading}>
                  Close
                </Button>
                <Button type="submit" isDisabled={loading}>
                  {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
                  {task?.id ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </DialogContent>
      </DialogOverlay>
    </DialogTrigger>
  );
};

export default EditTasks;
