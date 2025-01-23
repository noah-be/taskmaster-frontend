import RegistrationGuidelines from '@/components/RegistrationGuidelines.vue';

describe('RegistrationGuidelines', () => {
  it('should toggle visibility based on the visible prop', async () => {
    const wrapper = mount(RegistrationGuidelines);

    const container = wrapper.find('.v-container');

    expect(container.attributes('aria-hidden')).toBe('true');
    expect(container.attributes('style')).toContain('display: none;');

    await wrapper.setProps({ visible: true });

    expect(container.attributes('aria-hidden')).toBe('false');
    expect(container.isVisible()).toBe(true);

    wrapper.unmount();
  });
});
