import LoginForm from '@/components/LoginForm.vue';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/stores/authStore';

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: vi.fn()
  })
}));

describe('LoginForm', () => {
  let wrapper, authStore;

  beforeEach(() => {
    wrapper = mount(LoginForm, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          RegisterBox: true
        }
      }
    });

    authStore = useAuthStore();
    authStore.login = vi.fn();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('initializes with correct default data', () => {
    const usernameInput = wrapper.find('#login-username');
    const passwordInput = wrapper.find('#login-password');

    expect(usernameInput.element.value).toBe('');
    expect(passwordInput.element.value).toBe('');
    expect(authStore.isRegisterBoxVisible).toBe(false);
  });

  it('sets authStore.isRegisterBoxVisible to true when createAccountBtn is clicked', async () => {
    const button = wrapper.findComponent({ ref: 'createAccountBtn' });
    await button.trigger('click');

    expect(authStore.isRegisterBoxVisible).toBe(true);
  });

  it('calls submitLogin on button click and triggers store login with correct data', async () => {
    const usernameInput = wrapper.find('#login-username');
    const passwordInput = wrapper.find('#login-password');

    await usernameInput.setValue('testuser');
    await passwordInput.setValue('testpass');
    await wrapper.vm.submitLogin();

    expect(authStore.login).toHaveBeenCalledWith('testuser', 'testpass');
  });
});
