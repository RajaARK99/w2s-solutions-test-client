import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { privateRootRoute } from ".";

const tasksRootRoute = createRoute({
  getParentRoute: () => privateRootRoute,
  path: "tasks",
});

const tasksIndexRoute = createRoute({
  getParentRoute: () => tasksRootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("@/modules/Tasks/Pages/Tasks")),
});

const tasksRoute = tasksRootRoute.addChildren([tasksIndexRoute]);
export { tasksRoute };
