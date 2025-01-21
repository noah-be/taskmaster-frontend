import EditTaskBox from '@/components/EditTaskBox.vue';
import { createTestingPinia } from '@pinia/testing';
import { useTaskStore } from '@/stores/taskStore';

describe('EditTaskBox', () => {
  let wrapper, taskStore;

  beforeEach(() => {
    wrapper = mount(EditTaskBox, {
      global: {
        plugins: [createTestingPinia()]
      }
    });

    taskStore = useTaskStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should not render the dialog if currentTaskId is not set', async () => {
    const dialog = wrapper.findComponent({ name: 'VDialog' });
    expect(dialog.props('modelValue')).toBe(false);
  });

  it('should render the dialog if currentTaskId is set', async () => {
    taskStore.currentTaskId = 1;
    await wrapper.vm.$nextTick();
    const dialog = wrapper.findComponent({ name: 'VDialog' });
    expect(dialog.exists()).toBe(true);
    expect(dialog.props('modelValue')).toBe(true);
  });
});
