import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

const vuetify = createVuetify();

describe('Navbar.vue', () => {
  const factory = () => {
    return mount(Navbar, {
      global: {
        plugins: [vuetify, i18n]
      }
    });
  };

  it('renders buttons with correct links', () => {
    const wrapper = factory();
    const buttons = wrapper.findAllComponents({ name: 'VBtn' });

    expect(buttons[0].props('to')).toBe('/');
    expect(buttons[1].props('to')).toBe('/about');
    expect(buttons[2].props('to')).toBe('/contact');
  });

  it('renders buttons as router links', () => {
    const wrapper = factory();
    const buttons = wrapper.findAllComponents({ name: 'VBtn' });
    buttons.forEach(button => {
      expect(button.attributes('router')).toBeDefined();
    });
  });
});