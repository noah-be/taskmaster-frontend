import RegisterBox from '@/components/RegisterBox.vue';
import RegistrationGuidelines from '@/components/RegistrationGuidelines.vue';
import { createTestingPinia } from '@pinia/testing';
import { useAuthStore } from '@/stores/authStore';
import { getUserNameFeedback, getPasswordFeedback } from '@/utils/authUtils';
import { flushPromises } from '@vue/test-utils';
import { ref } from 'vue';

describe('RegisterBox', () => {
  let wrapper, authStore;

  vi.mock('@/utils/authUtils', () => ({
    getUserNameFeedback: vi.fn(),
    getPasswordFeedback: vi.fn()
  }));

  beforeEach(async () => {
    wrapper = mount(RegisterBox, {
      global: {
        plugins: [createTestingPinia()]
      }
    });
    authStore = useAuthStore();
    vi.clearAllMocks();

    authStore.isRegisterBoxVisible = true;
    await wrapper.vm.$nextTick();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render RegisterBox when isRegisterBoxVisible is true', async () => {
    const dialog = wrapper.findComponent({ name: 'VDialog' });
    expect(dialog.exists()).toBe(true);
    expect(dialog.props('modelValue')).toBe(true);
  });

  it('should call closeRegisterBox when v-model updates', async () => {
    const dialog = wrapper.findComponent({ name: 'VDialog' });

    expect(dialog.exists()).toBe(true);
    expect(authStore.isRegisterBoxVisible).toBe(true);

    await dialog.vm.$emit('update:model-value', false);

    expect(authStore.closeRegisterBox).toHaveBeenCalled();
  });

  it('should toggle isGuidelineTextVisible when the button is clicked', async () => {
    const toggleButton = wrapper.findComponent({ ref: 'registrationGuidelinesButton' });

    expect(toggleButton.exists()).toBe(true);

    expect(authStore.isGuidelineTextVisible).toBe(false);

    await toggleButton.trigger('click');

    expect(authStore.toggleGuidelineVisibility).toHaveBeenCalled();
  });

  it('should validate username and update usernameFeedback', async () => {
    getUserNameFeedback.mockResolvedValue('Username is invalid');
    wrapper.vm.username = 'abc';
    await flushPromises();
    expect(getUserNameFeedback).toHaveBeenCalledWith('abc');
    expect(wrapper.vm.usernameFeedback).toBe('Username is invalid');
  });

  it('should validate password and update passwordFeedback', async () => {
    getPasswordFeedback.mockReturnValue('Password is too weak');
    wrapper.vm.password = '1234';
    await flushPromises();
    expect(getPasswordFeedback).toHaveBeenCalledWith('1234');
    expect(wrapper.vm.passwordFeedback).toBe('Password is too weak');
  });

  it('should compute formValid correctly', async () => {
    getUserNameFeedback.mockResolvedValue('');
    getPasswordFeedback.mockReturnValue('');
    wrapper.vm.username = 'validUser';
    wrapper.vm.password = 'validPass123';
    await flushPromises();
    expect(wrapper.vm.formValid).toBe(true);

    wrapper.vm.username = 'ab';
    wrapper.vm.password = '1234';
    await flushPromises();
    expect(wrapper.vm.formValid).toBe(false);
  });

  it('should call authStore.register when formValid is true', async () => {
    getUserNameFeedback.mockResolvedValue('');
    getPasswordFeedback.mockReturnValue('');
    wrapper.vm.username = 'validUser';
    wrapper.vm.password = 'validPass123';
    await flushPromises();
    await wrapper.vm.registerUser();
    expect(authStore.register).toHaveBeenCalledWith('validUser', 'validPass123');
  });

  it('should not call authStore.register when formValid is false', async () => {
    wrapper.vm.username = 'ab';
    wrapper.vm.password = '1234';
    await flushPromises();
    await wrapper.vm.registerUser();
    expect(authStore.register).not.toHaveBeenCalled();
  });

  it('should return the correct button text based on isGuidelineTextVisible', async () => {
    expect(wrapper.vm.guidelinesButtonText).toBe('components.registerBox.registration.showGuidelinesButton');

    authStore.isGuidelineTextVisible = true;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.guidelinesButtonText).toBe('components.registerBox.registration.hideGuidelinesButton');
  });

  it('should bind all relevant data correctly', async () => {
    const bindings = [
      { ref: 'usernameInput', model: 'username', newValue: 'testUser', updatedValue: 'updatedUser' },
      { ref: 'passwordInput', model: 'password', newValue: 'testPass123', updatedValue: 'updatedPass123' }
    ];

    for (const { ref, model, newValue, updatedValue } of bindings) {
      const input = wrapper.findComponent({ ref });
      expect(input.exists()).toBe(true);
      expect(wrapper.vm[model]).toBe('');
      expect(input.props('modelValue')).toBe('');

      await input.vm.$emit('update:modelValue', newValue);
      expect(wrapper.vm[model]).toBe(newValue);

      wrapper.vm[model] = updatedValue;
      await wrapper.vm.$nextTick();
      expect(input.props('modelValue')).toBe(updatedValue);
    }

    const dialog = wrapper.findComponent({ name: 'VDialog' });
    expect(dialog.exists()).toBe(true);
    expect(dialog.props('modelValue')).toBe(true);

    authStore.isRegisterBoxVisible = false;
    await wrapper.vm.$nextTick();
    expect(dialog.props('modelValue')).toBe(false);
  });
});
