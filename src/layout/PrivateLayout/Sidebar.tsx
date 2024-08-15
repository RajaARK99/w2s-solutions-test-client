import { FC, Fragment } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ClipboardList, LayoutDashboard, LogOut } from "lucide-react";

import { Button } from "@/components";

import { cn } from "@/global";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";
import { useAuth } from "@/components/AuthProvider";

import { SetState } from "@/types";

interface Props {
  showMenu: boolean;
  setShowMenu: SetState<boolean>;
}

const NavigateContent: FC<{
  className: string;
  setShowMenu?: SetState<boolean>;
  showMenu?: boolean;
}> = ({ className, setShowMenu, showMenu }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const closeSideBarHandler = () => {
    if (showMenu && setShowMenu) {
      setShowMenu((prevState) => !prevState);
    }
  };
  return (
    <nav
      className={cn(
        "bottom-0 left-0 top-0 z-10 h-screen min-w-64 max-w-64 flex-col overflow-y-hidden border-r border-foreground/10 bg-background md:sticky md:flex",
        className
      )}
    >
      <div className="flex items-center border-b p-2 min-h-[68px]">
        <h3 className="text-xl">Task Management</h3>
      </div>

      <div className="flex-1 space-y-2 p-2">
        <Link
          to={"/dashboard"}
          activeProps={{
            className: "!text-foreground bg-muted",
          }}
          onClick={closeSideBarHandler}
          className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground ring-offset-background hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <LayoutDashboard /> <p>Dashboard</p>
        </Link>

        <Link
          to={"/tasks"}
          activeProps={{
            className: "!text-foreground bg-muted",
          }}
          onClick={closeSideBarHandler}
          className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground ring-offset-background hover:bg-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <ClipboardList /> <p>Tasks</p>
        </Link>
      </div>

      <DialogTrigger>
        <div className="border-t p-2">
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <LogOut /> Logout
          </Button>
        </div>
        <DialogOverlay isDismissable={false}>
          <DialogContent role="alertdialog" className="sm:max-w-[400px]">
            {({ close }) => (
              <>
                <DialogHeader>
                  <DialogTitle>Logout</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-sm text-muted-foreground">
                  Are you sure want to logout?
                </DialogDescription>
                <DialogFooter className="gap-2">
                  <Button onPress={close} variant="outline">
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onPress={() => {
                      localStorage.clear();
                      setUser(null);
                      setTimeout(() => {
                        navigate({
                          to: "/sign-in",
                          replace: false,
                        });
                      }, 10);
                    }}
                  >
                    Logout
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </DialogOverlay>
      </DialogTrigger>
    </nav>
  );
};

const Sidebar: FC<Props> = ({ setShowMenu, showMenu }) => {
  return (
    <Fragment>
      <DialogTrigger
        isOpen={showMenu}
        onOpenChange={(open) => {
          setShowMenu(open);
        }}
      >
        <DialogOverlay>
          <DialogContent side="left" className="w-64 p-0">
            <NavigateContent
              className="flex md:hidden"
              setShowMenu={setShowMenu}
              showMenu={showMenu}
            />
          </DialogContent>
        </DialogOverlay>
      </DialogTrigger>
      <NavigateContent className="hidden md:flex" />
    </Fragment>
  );
};

export default Sidebar;
