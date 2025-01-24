import LoginForm from '@/components/LoginForm.vue';
import RegisterBox from '@/components/RegisterBox.vue';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/stores/authStore';

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
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('initializes with correct default data', () => {
    const usernameInput = wrapper.find('#login-username');
    const passwordInput = wrapper.find('#login-password');

    expect(usernameInput.element.value).toBe('');
    expect(passwordInput.element.value).toBe('');
    expect(wrapper.vm.showregisterBox).toBe(false);
  });

  it('set showregisterBox to true when createAccountBtn is clicked', async () => {
    const button = wrapper.findComponent({ ref: 'createAccountBtn' });
    await button.trigger('click');
    expect(wrapper.vm.showregisterBox).toBe(true);
  });

  it('renders RegisterBox with correct props and handles update:show event', async () => {
    const registerBox = wrapper.findComponent(RegisterBox);
    expect(registerBox.exists()).toBe(true);
    expect(registerBox.props('show')).toBe(wrapper.vm.showregisterBox);

    await registerBox.vm.$emit('update:show', true);
    expect(wrapper.vm.showregisterBox).toBe(true);

    await registerBox.vm.$emit('update:show', false);
    expect(wrapper.vm.showregisterBox).toBe(false);
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
