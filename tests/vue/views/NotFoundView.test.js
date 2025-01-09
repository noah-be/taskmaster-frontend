import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { vi } from 'vitest';
import NotFoundView from '@/views/NotFoundView.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

global.plausible = vi.fn();
const vuetify = createVuetify();

describe('NotFoundView.vue', () => {
  let router;

  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/:pathMatch(.*)*', name: 'NotFoundView', component: NotFoundView }]
    });
  });

  it('calls plausible when the component is mounted', async () => {
    router.push('/non-existent-route');
    await router.isReady();

    mount(NotFoundView, {
      global: {
        plugins: [router, vuetify, i18n]
      }
    });

    expect(global.plausible).toHaveBeenCalledWith('404', { props: { path: '/non-existent-route' } });
  });
});
