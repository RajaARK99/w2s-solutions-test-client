import { axiosInstance } from "@/global";
import { useMutation } from "@tanstack/react-query";
import { NavigateFn } from "@tanstack/react-router";
import { flushSync } from "react-dom";
import { toast } from "sonner";
import { AxiosError } from "axios";

import {
  SignInForm,
  SignInResponse,
  SignUpForm,
  SignUpResponse,
} from "@/modules/Auth/types";
import { User } from "@/modules/Users";

import { Nullish, SetState } from "@/types";

const useSignIn = ({
  navigate,
  setUser,
  setToken,
}: {
  navigate: NavigateFn;
  setUser: SetState<Nullish<User> | null>;
  setToken: SetState<string | null>;
}) => {
  return useMutation<
    SignInResponse,
    AxiosError<{ code: number; message: string }>,
    SignInForm
  >({
    mutationKey: ["sign-in"],
    mutationFn: (data) => {
      return axiosInstance.post("auth/sign-in", data);
    },
    onError: ({ response, message }) => {
      toast.error(`SignIn failed. ${response?.data?.message ?? message ?? ""}`);
    },
    onSuccess: ({ data }) => {
      const user = data?.user;
      const token = data?.token;

      if (user?.id && token) {
        localStorage?.setItem("token", token);
        localStorage?.setItem("user", JSON.stringify(user));
        flushSync(() => {
          setUser(user);
          setToken(token);
        });
        setTimeout(() => {
          navigate({
            to: "/dashboard",
            replace: false,
          });
        }, 10);
      } else {
        toast("Sign in failed, try again.");
      }
    },
  });
};

const useSignUp = ({ navigate }: { navigate: NavigateFn }) => {
  return useMutation<
    SignUpResponse,
    AxiosError<{ code: number; message: string }>,
    SignUpForm
  >({
    mutationKey: ["sign-up"],
    mutationFn: (data) => {
      return axiosInstance.post("auth/sign-up", data);
    },
    onError: ({ message, response }) => {
      toast.error(
        `Sign up failed. ${response?.data?.message ?? message ?? ""}`
      );
    },
    onSuccess: ({ message }) => {
      if (message) {
        toast.success(message);
      }
      navigate({
        to: "/sign-in",
      });
    },
  });
};

export { useSignIn, useSignUp };
