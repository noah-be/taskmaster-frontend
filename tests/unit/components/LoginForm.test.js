import LoginForm from '@/components/LoginForm.vue';
import RegisterBox from '@/components/RegisterBox.vue';

const pushMock = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: pushMock })
}));

describe('LoginForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    alert = vi.fn();
    vi.resetAllMocks();

    wrapper = mount(LoginForm);
  });

  it('toggles showregisterBox when RegisterBox emits update:show', async () => {
    expect(wrapper.vm.showregisterBox).toBe(false);

    const registerBox = wrapper.findComponent(RegisterBox);
    await registerBox.vm.$emit('update:show', true);

    expect(wrapper.vm.showregisterBox).toBe(true);

    await registerBox.vm.$emit('update:show', false);

    expect(wrapper.vm.showregisterBox).toBe(false);
  });

  it('updates username and password when input is provided', async () => {
    const usernameInput = wrapper.find('input[autocomplete="username"]');
    const passwordInput = wrapper.find('input[autocomplete="current-password"]');

    await usernameInput.setValue('testuser');
    await passwordInput.setValue('testpassword');

    expect(wrapper.vm.username).toBe('testuser');
    expect(wrapper.vm.password).toBe('testpassword');
  });

  it('stores the token in localStorage and calls router.push', async () => {
    fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'exampleToken', redirectUrl: '/tasks' })
      })
    );

    await wrapper.find('form').trigger('submit.prevent');

    expect(localStorage.getItem('token')).toBe('exampleToken');
    expect(pushMock).toHaveBeenCalledWith('/tasks');
  });

  it('displays an alert on login failure', async () => {
    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: false
      })
    );

    fetch = mockFetch;

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');

    expect(mockFetch).toHaveBeenCalled();
    expect(alert).toHaveBeenCalledWith('components.loginForm.loginFailure');
  });

  it('opens the RegisterBox when "Create New Account" button is clicked', async () => {
    const button = wrapper.find('.v-btn.mt-2');
    await button.trigger('click');
    expect(wrapper.vm.showregisterBox).toBe(true);
  });
});
