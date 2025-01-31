import TasksView from '@/views/TasksView.vue';
import { useTaskStore } from '@/stores/taskStore';

describe('TasksView', () => {
  let wrapper, taskStore;

  beforeEach(() => {
    wrapper = mount(TasksView);

    taskStore = useTaskStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('calls fetchTasks on mounted', () => {
    expect(taskStore.fetchTasks).toHaveBeenCalled();
  });
});
