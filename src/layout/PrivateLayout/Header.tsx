import { FC } from "react";
import { useLocation } from "@tanstack/react-router";

import { Theme, useAuth, useTheme } from "@/components/AuthProvider";
import { Button } from "@/components";

import { SetState } from "@/types";
import { Menu, Sun, Moon } from "lucide-react";

interface Props {
  setShowMenu: SetState<boolean>;
}

const Header: FC<Props> = ({ setShowMenu }) => {
  const { theme, setTheme } = useTheme();

  const { pathname } = useLocation();

  const title = pathname?.split("/")?.[1];

  const { user } = useAuth();

  const changeThemeHandler = (theme: Theme) => {
    setTheme(theme);
  };

  return title === "Home" ? null : (
    <header className="sticky top-0 z-10 flex h-[68px] items-center justify-between gap-2 border-b border-foreground/10 bg-background/95 p-3 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="pl-0 md:hidden"
          onPress={() => {
            setShowMenu((prev) => !prev);
          }}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Sidebar menu</span>
        </Button>
        <p className="max-w-[inherit] truncate text-sm capitalize text-muted-foreground">
          {title}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden min-h-10 max-w-48 truncate md:block">
          <p className="truncate text-sm font-medium text-foreground">
            {user?.name || "N/A"}
          </p>
          <p className="truncate text-xs font-normal text-muted-foreground">
            {user?.email ?? "N/A"}
          </p>
        </div>{" "}
        {theme === "light" ? (
          <Moon
            className="cursor-pointer text-muted-foreground"
            onClick={() => {
              changeThemeHandler("dark");
            }}
          />
        ) : (
          <Sun
            className="cursor-pointer"
            onClick={() => {
              changeThemeHandler("light");
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
