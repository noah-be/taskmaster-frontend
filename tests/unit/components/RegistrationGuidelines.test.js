import RegistrationGuidelines from '@/components/RegistrationGuidelines.vue';

describe('RegistrationGuidelines', () => {
  it('should toggle visibility based on the visible prop', async () => {
    let wrapper = mount(RegistrationGuidelines, { props: { visible: true } });

    const container = wrapper.find('.v-container');
    expect(container.attributes('aria-hidden')).toBe('false');
    expect(container.isVisible()).toBe(true);

    await wrapper.setProps({ visible: false });

    expect(container.attributes('aria-hidden')).toBe('true');
    expect(container.attributes('style')).toContain('display: none;');

    wrapper.unmount();
  });
});
