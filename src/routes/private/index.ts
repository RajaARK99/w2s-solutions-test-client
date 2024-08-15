import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router";

export * from "@/routes/private/dashboard";
export * from "@/routes/private/tasks";

import { rootRoute, dashboardRoute, tasksRoute } from "@/routes";

const privateRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "private-route",
  component: lazyRouteComponent(
    () => import("@/layout/PrivateLayout/PrivateLayout")
  ),
  beforeLoad: ({ context: { isAuthenticated } }) => {
    if (!isAuthenticated) {
      throw redirect({
        to: "/sign-in",
        replace: false,
      });
    }
  },
});

const privateRoute = privateRootRoute.addChildren([dashboardRoute, tasksRoute]);

export { privateRootRoute, privateRoute };
