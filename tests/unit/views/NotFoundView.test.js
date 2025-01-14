import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { vi } from 'vitest';
import NotFoundView from '@/views/NotFoundView.vue';

global.plausible = vi.fn();

describe('NotFoundView.vue', () => {
  let router;

  it('calls plausible when the component is mounted', async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/:pathMatch(.*)*', name: 'NotFoundView', component: NotFoundView }]
    });

    router.push('/non-existent-route');
    await router.isReady();

    mount(NotFoundView, {
      global: {
        plugins: [router, vuetify, i18n]
      }
    });

    expect(plausible).toHaveBeenCalledWith('404', { props: { path: '/non-existent-route' } });
  });

  it('calls goHome and navigates to "/" when the home button is clicked', async () => {
    const pushMock = vi.fn();
    router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: '/:pathMatch(.*)*', name: 'NotFoundView', component: NotFoundView }]
    });
    router.push = pushMock;

    const wrapper = mount(NotFoundView, {
      global: {
        plugins: [router, vuetify, i18n]
      }
    });

    const button = wrapper.find('[data-testid="home-button"]');

    expect(button.exists()).toBe(true);

    await button.trigger('click');

    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
