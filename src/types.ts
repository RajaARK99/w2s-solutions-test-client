import type { Dispatch, SetStateAction } from "react";

type Nullish<T> = T extends object
  ? {
      [K in keyof T]?: T[K] | null;
    }
  : T | null | undefined;

type SetState<T> = Dispatch<SetStateAction<T>>;

export type { Nullish, SetState };
