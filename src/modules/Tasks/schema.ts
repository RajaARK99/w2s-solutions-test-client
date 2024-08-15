import {
  dateFieldSchema,
  defaultZodErrorMessage,
  nameZodSchema,
} from "@/global";
import { z } from "zod";

const taskFormSchema = z
  .object({
    title: nameZodSchema,
    dueDate: dateFieldSchema.nullish(),
    description: z.string().nullish(),
    status: z.enum(["pending", "hold", "completed"]).nullish(),
    form: z.enum(["create", "update"]),
  })
  .superRefine((data, { addIssue }) => {
    if (
      data?.form === "update" &&
      (data?.status === null || data?.status === undefined)
    ) {
      addIssue({
        code: "custom",
        message: defaultZodErrorMessage.required_error,
        path: ["status"],
      });
    }
    return data;
  });

export { taskFormSchema };
