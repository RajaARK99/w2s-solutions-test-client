import { z } from "zod";

import { emailZodSchema, nameZodSchema, passwordZodSchema } from "@/global";

const signInFormSchema = z.object({
  email: emailZodSchema,
  password: passwordZodSchema,
});

const signUpFormSchema = z.object({
  name: nameZodSchema,
  email: emailZodSchema,
  password: passwordZodSchema,
});

export { signInFormSchema, signUpFormSchema };
