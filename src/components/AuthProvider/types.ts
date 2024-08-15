import { Nullish, SetState } from "@/types";
import { User } from "@/modules/Users";

interface AuthContext {
  auth: {
    isAuthenticated: boolean;
    setUser: SetState<Nullish<User> | null>;
    setToken: SetState<string | null>;
    user: Nullish<User> | null;
    token: string | null;
  };
  theme: { theme: Theme; setTheme: (theme: Theme) => void };
}

type Theme = "dark" | "light" | "system";

export type { AuthContext, Theme };
