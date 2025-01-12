import { describe, it, expect, beforeEach } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import router from '@/router';

describe('Router Configuration', () => {
  let testRouter;

  beforeEach(() => {
    testRouter = createRouter({
      history: createWebHistory(),
      routes: router.options.routes
    });
  });

  it('dynamically imports views', async () => {
    const routes = ['/about', '/contact', '/tasks'];

    for (const path of routes) {
      const resolvedRoute = await testRouter.resolve(path);
      expect(resolvedRoute.name).toBe(path.substring(1));
      const component = await resolvedRoute.matched[0].components.default();
      expect(component).toHaveProperty('default');
    }
  });

  it('redirects to NotFoundView for unknown routes', async () => {
    const resolvedRoute = await testRouter.resolve('/unknown-route');
    expect(resolvedRoute.name).toBe('not-found');
    const component = await resolvedRoute.matched[0].components.default();
    expect(component).toHaveProperty('default');
  });
});
