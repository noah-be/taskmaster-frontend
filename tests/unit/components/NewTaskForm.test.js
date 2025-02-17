import NewTaskForm from '@/components/NewTaskForm.vue';
import { createTestingPinia } from '@pinia/testing';
import { useTaskStore } from '@/stores/taskStore';

describe('NewTaskForm', () => {
  let wrapper, taskStore;

  beforeEach(() => {
    wrapper = mount(NewTaskForm, {
      global: {
        plugins: [createTestingPinia()]
      }
    });

    taskStore = useTaskStore();
  });

  afterEach(() => {
    wrapper.unmount();
    vi.resetAllMocks();
  });

  it('should call addTask and resetForm on handleAddTask', async () => {
    const mockAddTask = vi.spyOn(taskStore, 'addTask').mockResolvedValue();

    const mockDate = new Date('2023-01-01T12:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    wrapper.vm.title = 'New Task';
    wrapper.vm.dueDate = '2023-01-01';
    wrapper.vm.priority = 'Medium';

    await wrapper.vm.handleAddTask();

    expect(mockAddTask).toHaveBeenCalledWith({
      title: 'New Task',
      priority: 'Medium',
      dueDate: '2023-01-01',
      t: expect.any(Function)
    });

    expect(wrapper.vm.title).toBe('');
    expect(wrapper.vm.dueDate).toBe('2023-01-01');
    expect(wrapper.vm.priority).toBe('components.newTaskForm.priorityOptions.medium');

    mockAddTask.mockRestore();
  });

  it('should enable or disable the add task button based on the title value', async () => {
    const button = wrapper.findComponent({ ref: 'addTaskBtn' });

    expect(button.attributes('disabled')).toBeDefined();

    wrapper.vm.title = 'New Task';
    await wrapper.vm.$nextTick();
    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('should bind data correctly using v-model for title, priority, and dueDate', async () => {
    const fields = [
      { ref: 'newTaskTitle', value: 'Test Title', model: 'title' },
      { ref: 'newTaskPriority', value: 'High', model: 'priority' },
      { ref: 'newTaskDueDate', value: '2023-01-01', model: 'dueDate' }
    ];

    for (const { ref, value, model } of fields) {
      const input = wrapper.findComponent({ ref });
      await input.setValue(value);
      expect(wrapper.vm[model]).toBe(value);
    }
  });
});
