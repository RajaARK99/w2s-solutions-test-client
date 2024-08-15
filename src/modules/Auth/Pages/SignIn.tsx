import { Form } from "react-hook-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";

import { useAuth } from "@/components/AuthProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from "@/components";
import { Input } from "@/components/Form";

import { useForm } from "@/global";

import { signInFormSchema, useSignIn } from "@/modules/Auth";

const SignIn = () => {
  const navigate = useNavigate();

  const { control } = useForm({
    schema: signInFormSchema,
  });

  const { setToken, setUser } = useAuth();

  const { mutate, isPending } = useSignIn({ navigate, setToken, setUser });

  return (
    <Form
      control={control}
      onSubmit={({ data }) => {
        mutate({
          email: data?.email,
          password: data?.password,
        });
      }}
      className="grid place-content-center min-h-screen"
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Input
              inputType="controlled"
              control={control}
              name="email"
              label={"Email"}
              placeholder="m@example.com"
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
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </Form>
  );
};

export default SignIn;
