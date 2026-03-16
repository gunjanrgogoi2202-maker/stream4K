import { Layout } from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import { AppProvider } from "@/context/AppContext";
import { Analytics } from "@/pages/Analytics";
import { Channel } from "@/pages/Channel";
import { Home } from "@/pages/Home";
import { Studio } from "@/pages/Studio";
import { Upgrade } from "@/pages/Upgrade";
import { Watch } from "@/pages/Watch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Outlet />
        </Layout>
        <Toaster />
      </QueryClientProvider>
    </AppProvider>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const watchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/watch/$streamId",
  component: Watch,
});

const studioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/studio",
  component: Studio,
});

const channelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/channel/$username",
  component: Channel,
});

const upgradeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/upgrade",
  component: Upgrade,
});

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: Analytics,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  watchRoute,
  studioRoute,
  channelRoute,
  upgradeRoute,
  analyticsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
