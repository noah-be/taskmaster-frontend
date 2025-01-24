import TasksView from '@/views/TasksView.vue';
import { createTestingPinia } from '@pinia/testing';
import { useTaskStore } from '@/stores/taskStore';

describe('TasksView', () => {
  let wrapper, taskStore;

  beforeEach(() => {
    wrapper = mount(TasksView, {
      global: {
        plugins: [createTestingPinia()]
      }
    });

    taskStore = useTaskStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('calls fetchTasks on mounted', () => {
    expect(taskStore.fetchTasks).toHaveBeenCalled();
  });
});
