import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import RegisterBox from '@/components/RegisterBox.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('RegisterBox.vue', () => {
  let wrapper;

  beforeEach(() => {
    vi.resetAllMocks();

    wrapper = mount(RegisterBox, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        show: true
      }
    });
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
    alert = vi.fn();

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
    expect(alert).toHaveBeenCalledWith('Registration failed. Please try again.');
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
