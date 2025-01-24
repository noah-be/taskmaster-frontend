import NotFoundView from '@/views/NotFoundView.vue';
import { useRouter, useRoute } from 'vue-router';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
  useRoute: vi.fn()
}));

describe('NotFoundView.vue', () => {
  let wrapper, mockRouter, mockRoute;

  beforeEach(() => {
    mockRouter = { push: vi.fn() };
    mockRoute = { path: '/mock-path' };

    useRouter.mockReturnValue(mockRouter);
    useRoute.mockReturnValue(mockRoute);

    global.plausible = vi.fn();

    wrapper = mount(NotFoundView);
  });

  afterEach(() => {
    vi.clearAllMocks();
    wrapper.unmount();
  });

  it('calls plausible with correct path on mount', () => {
    expect(global.plausible).toHaveBeenCalledWith('404', {
      props: { path: '/mock-path' }
    });
  });

  it('navigates to home when button is clicked', async () => {
    const button = wrapper.findComponent({ ref: 'homeBtn' });
    await button.trigger('click');

    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
