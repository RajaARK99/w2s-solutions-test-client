import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Form } from "react-hook-form";

import { useForm } from "@/global";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";
import { Input } from "@/components/Form";

import { signUpFormSchema, useSignUp } from "@/modules/Auth";

const SignUp = () => {
  const navigate = useNavigate();

  const { control } = useForm({
    schema: signUpFormSchema,
  });

  const { mutate, isPending } = useSignUp({ navigate });

  return (
    <Form
      control={control}
      onSubmit={({ data }) => {
        mutate({
          email: data?.email,
          password: data?.password,
          name: data?.name,
        });
      }}
      className="grid place-content-center min-h-screen"
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl text-center">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              inputType="controlled"
              control={control}
              name="name"
              label={"Name"}
              placeholder="John doe"
            />
            <Input
              inputType="controlled"
              control={control}
              name="email"
              label={"Email"}
              placeholder="m@example.com"
              type="email"
            />
            <Input
              inputType="controlled"
              control={control}
              name="password"
              label={"Password"}
              type="password"
              placeholder="••••••••"
            />
            <Button type="submit" className="w-full" isDisabled={isPending}>
              {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
              Create an account
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to={"/sign-in"} className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
};

export default SignUp;
