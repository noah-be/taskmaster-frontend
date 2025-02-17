import { createTestingPinia } from '@pinia/testing';
import { useTaskStore } from '@/stores/taskStore';
import TodoTable from '@/components/TodoTable.vue';

describe('TodoTable.vue', async () => {
  let wrapper, taskStore;

  beforeEach(async () => {
    wrapper = mount(TodoTable, {
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          EditTaskBox: true
        }
      }
    });

    taskStore = useTaskStore();

    taskStore.tasks = [{ _id: '1', title: 'Test Task', description: 'Test', dueDate: '2025-01-01', priority: 'High', completed: false }];
    await wrapper.vm.$nextTick();
  });

  it('should call taskStore.openEditTaskBox with correct task ID on row click', async () => {
    const row = wrapper.find('tbody tr');
    await row.trigger('click');

    expect(taskStore.openEditTaskBox).toHaveBeenCalledWith('1');
  });

  it('should call taskStore.toggleTaskCompletion with correct task ID on checkbox click', async () => {
    const checkbox = wrapper.findComponent({ ref: 'taskCompleted' });
    await checkbox.trigger('click');

    expect(taskStore.toggleTaskCompletion).toHaveBeenCalledWith('1', expect.any(Function));
  });

  it('should update the checkbox state when item.completed changes', async () => {
    const checkbox = wrapper.findComponent({ ref: 'taskCompleted' });
    expect(checkbox.props('modelValue')).toBe(false);

    await checkbox.setValue(true);

    expect(checkbox.props('modelValue')).toBe(true);
  });

  it('should render visually hidden text for accessibility', () => {
    const hiddenText = wrapper.find('.visually-hidden');
    expect(hiddenText.exists()).toBe(true);
    expect(hiddenText.text()).toBe('components.todoTable.completed');
  });

  it('should stop event propagation when checkbox is clicked', async () => {
    const checkbox = wrapper.findComponent({ ref: 'taskCompleted' });
    const mockStopPropagation = vi.fn();
    await checkbox.trigger('click', { stopPropagation: mockStopPropagation });
    expect(mockStopPropagation).toHaveBeenCalled();
  });
});
