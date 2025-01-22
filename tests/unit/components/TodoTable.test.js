import { createTestingPinia } from '@pinia/testing';
import { useTaskStore } from '@/stores/taskStore';
import TodoTable from '@/components/TodoTable.vue';

describe('TodoTable.vue', () => {
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
  });

  it('should call taskStore.openEditTaskBox on row click', async () => {
    taskStore.tasks = [{ _id: '1', title: 'Test Task', description: 'Test', dueDate: '2025-01-01', priority: 'High', completed: false }];
    await wrapper.vm.$nextTick();

    const row = wrapper.find('tbody tr');
    await row.trigger('click');

    expect(taskStore.openEditTaskBox).toHaveBeenCalledWith('1');
  });

  it('should call taskStore.toggleTaskCompletion on checkbox click', async () => {
    taskStore.tasks = [{ _id: '2', title: 'Test Task', description: 'Test', dueDate: '2025-01-01', priority: 'High', completed: false }];
    await wrapper.vm.$nextTick();

    const checkbox = wrapper.findComponent({ ref: 'taskCompleted' });
    await checkbox.trigger('click');

    expect(taskStore.toggleTaskCompletion).toHaveBeenCalledWith('2');
  });
});
