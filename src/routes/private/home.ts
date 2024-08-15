import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { privateRootRoute } from ".";

const homeRootRoute = createRoute({
  getParentRoute: () => privateRootRoute,
  path: "home",
});

const homeIndexRoute = createRoute({
  getParentRoute: () => homeRootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("@/modules/Home/Pages/Home")),
});

const homeRoute = homeRootRoute.addChildren([homeIndexRoute]);

export { homeRoute };
