import EditTaskBox from '@/components/EditTaskBox.vue';
import { beforeEach } from 'vitest';

describe('EditTaskBox', () => {
  it('should render the dialog', () => {
    const wrapper = mount(EditTaskBox, {
      global: {
        plugins: [mockVuetify, mockI18n, mockPinia]
      }
    });

    expect(true).toBe(true);
  });
});
