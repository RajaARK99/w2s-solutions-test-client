import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { privateRootRoute } from ".";

const dashboardRoute = createRoute({
  getParentRoute: () => privateRootRoute,
  path: "dashboard",
  component: lazyRouteComponent(
    () => import("@/modules/Dashboard/Pages/Dashboard")
  ),
});

export { dashboardRoute };
