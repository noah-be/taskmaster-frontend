import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import RegisterBox from '@/components/RegisterBox.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('RegisterBox.vue', () => {
  const vuetify = createVuetify();
  let wrapper;

  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubGlobal('fetch', vi.fn());

    wrapper = mount(RegisterBox, {
      global: {
        plugins: [vuetify]
      },
      props: {
        show: true
      }
    });
  });

  it('renders correctly when show is true', () => {
    const dialog = wrapper.findComponent({ name: 'VDialog' });
    expect(dialog.exists()).toBe(true);
    expect(dialog.props('modelValue')).toBe(true);
  });

  it('emits update:show event when closeModal is called', async () => {
    await wrapper.vm.closeModal();
    expect(wrapper.emitted('update:show')).toBeTruthy();
    expect(wrapper.emitted('update:show')[0]).toEqual([false]);
  });

  it('toggles registration guidelines visibility', async () => {
    const toggleButton = wrapper.findComponent({ ref: 'registrationGuidelinesButton' });

    expect(toggleButton.exists()).toBe(true);
    expect(wrapper.vm.guidelinesVisible).toBe(false);
    await toggleButton.trigger('click');
    expect(wrapper.vm.guidelinesVisible).toBe(true);
    await toggleButton.trigger('click');
    expect(wrapper.vm.guidelinesVisible).toBe(false);
  });

  it('validates username input', async () => {
    const usernameInput = wrapper.findComponent({ ref: 'usernameInput' });
    expect(usernameInput.exists()).toBe(true);

    await usernameInput.setValue('ab');
    await wrapper.vm.validateUsername();
    expect(wrapper.vm.usernameFeedback).toBe('Username must be at least 3 characters');

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ isAvailable: false })
        })
      )
    );

    await usernameInput.setValue('existinguser');
    await wrapper.vm.validateUsername();
    expect(wrapper.vm.usernameFeedback).toBe('Username is already taken');

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ isAvailable: true })
        })
      )
    );

    await usernameInput.setValue('newuser');
    await wrapper.vm.validateUsername();
    expect(wrapper.vm.usernameFeedback).toBe('');
  });

  it('validates password input', async () => {
    const passwordInput = wrapper.findComponent({ ref: 'passwordInput' });
    expect(passwordInput.exists()).toBe(true);

    await passwordInput.setValue('short');
    await wrapper.vm.validatePassword();
    expect(wrapper.vm.passwordFeedback).toBe('Password must be at least 8 characters long');

    await passwordInput.setValue('onlylowercase');
    await wrapper.vm.validatePassword();
    expect(wrapper.vm.passwordFeedback).toBe('Password must include both upper and lower case letters');

    await passwordInput.setValue('NoNumber!');
    await wrapper.vm.validatePassword();
    expect(wrapper.vm.passwordFeedback).toBe('Password must include at least one number');

    await passwordInput.setValue('NoSpecial1');
    await wrapper.vm.validatePassword();
    expect(wrapper.vm.passwordFeedback).toBe('Password must include at least one special symbol');

    await passwordInput.setValue('Valid!Password123');
    await wrapper.vm.validatePassword();
    expect(wrapper.vm.passwordFeedback).toBe('');
  });

  it('disables submit button when form is invalid', async () => {
    const submitButton = wrapper.findComponent({ ref: 'submitButton' });
    expect(submitButton.exists()).toBe(true);
    expect(submitButton.attributes('disabled')).toBeDefined();

    wrapper.vm.username = 'validuser';
    wrapper.vm.password = 'Valid1!Pw';
    await wrapper.vm.$nextTick();

    expect(submitButton.attributes('disabled')).toBeUndefined();
  });

  it('emits closeModal when cancel button is clicked', async () => {
    const cancelButton = wrapper.findComponent({ ref: 'cancelButton' });
    expect(cancelButton.exists()).toBe(true);

    await cancelButton.trigger('click');
    expect(wrapper.emitted('update:show')[0]).toEqual([false]);
  });

  it('registers user and closes modal on success', async () => {
    wrapper.vm.username = 'newuser';
    wrapper.vm.password = 'Valid1!Pw';

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'User registered successfully' })
        })
      )
    );

    const form = wrapper.findComponent({ ref: 'registerForm' });
    expect(form.exists()).toBe(true);

    await form.trigger('submit.prevent');
    expect(wrapper.emitted('update:show')[0]).toEqual([false]);
  });

  it('shows alert on registration failure', async () => {
    global.alert = vi.fn();

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false
        })
      )
    );

    const form = wrapper.findComponent({ ref: 'registerForm' });
    expect(form.exists()).toBe(true);

    await form.trigger('submit.prevent');
    expect(global.alert).toHaveBeenCalledWith('Registration failed. Please try again.');
  });

  it('handles errors during username validation', async () => {
    wrapper.vm.username = 'testuser';

    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Network error')))
    );

    await wrapper.vm.validateUsername();

    expect(wrapper.vm.usernameFeedback).toBe('Error checking username');
  });
});
