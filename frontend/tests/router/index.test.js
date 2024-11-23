import { describe, it, expect, beforeEach } from "vitest";
import { createRouter, createWebHistory } from "vue-router";
import router from "@/router";
import HomeView from "@/views/HomeView.vue";

describe("Router Configuration", () => {
  let testRouter;

  beforeEach(() => {
    testRouter = createRouter({
      history: createWebHistory(),
      routes: router.options.routes,
    });
  });

  it("has the correct routes defined", () => {
    const routes = testRouter.getRoutes();

    expect(routes).toHaveLength(5);

    expect(routes[0].path).toBe("/");
    expect(routes[0].name).toBe("home");
    expect(routes[0].components.default).toBe(HomeView);

    expect(routes[1].path).toBe("/about");
    expect(routes[1].name).toBe("about");

    expect(routes[2].path).toBe("/contact");
    expect(routes[2].name).toBe("contact");

    expect(routes[3].path).toBe("/tasks");
    expect(routes[3].name).toBe("tasks");

    expect(routes[4].path).toBe("/:catchAll(.*)");
    expect(routes[4].name).toBe("not-found");
  });

  it("redirects to HomeView for '/'", async () => {
    const resolvedRoute = await testRouter.resolve("/");
    expect(resolvedRoute.name).toBe("home");
    expect(resolvedRoute.matched[0].components.default).toBe(HomeView);
  });

  it("dynamically imports AboutView for '/about'", async () => {
    const resolvedRoute = await testRouter.resolve("/about");
    expect(resolvedRoute.name).toBe("about");
    const component = await resolvedRoute.matched[0].components.default();
    expect(component).toHaveProperty("default");
  });

  it("dynamically imports ContactView for '/contact'", async () => {
    const resolvedRoute = await testRouter.resolve("/contact");
    expect(resolvedRoute.name).toBe("contact");
    const component = await resolvedRoute.matched[0].components.default();
    expect(component).toHaveProperty("default");
  });

  it("dynamically imports TasksView for '/tasks'", async () => {
    const resolvedRoute = await testRouter.resolve("/tasks");
    expect(resolvedRoute.name).toBe("tasks");
    const component = await resolvedRoute.matched[0].components.default();
    expect(component).toHaveProperty("default");
  });

  it("redirects to NotFoundView for unknown routes", async () => {
    const resolvedRoute = await testRouter.resolve("/unknown-route");
    expect(resolvedRoute.name).toBe("not-found");
    const component = await resolvedRoute.matched[0].components.default();
    expect(component).toHaveProperty("default");
  });
});
