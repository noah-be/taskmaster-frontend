import Navbar from '@/components/Navbar.vue';

describe('Navbar.vue', () => {
  const factory = () => {
    return mount(Navbar);
  };

  it('renders buttons as router links', () => {
    const wrapper = factory();
    const buttons = wrapper.findAllComponents({ name: 'VBtn' });
    buttons.forEach(button => {
      expect(button.attributes('router')).toBeDefined();
    });
  });
});
