import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import TasksView from '@/views/TasksView.vue';
import TodoTable from '@/components/TodoTable.vue';
import EditTaskBox from '@/components/EditTaskBox.vue';

describe('TasksView.vue', () => {
  let wrapper;

  const tasksMock = [
    { _id: '1', title: 'Task 1', description: 'Description 1', dueDate: '2024-12-31', priority: 'medium', completed: false },
    { _id: '2', title: 'Task 2', description: 'Description 2', dueDate: '2024-12-31', priority: 'medium', completed: true }
  ];

  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => 'mockToken')
    });

    wrapper = mount(TasksView, {
      global: {
        plugins: [vuetify, i18n]
      }
    });
  });

  it('should send a PATCH request to the correct URL with Authorization header', async () => {
    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    const mockLocalStorage = {
      getItem: vi.fn()
    };
    Object.defineProperty(global, 'localStorage', {
      value: mockLocalStorage
    });

    const mockAlert = vi.fn();
    global.alert = mockAlert;

    mockLocalStorage.getItem.mockReturnValue('fake-token');
    mockFetch.mockResolvedValueOnce({ ok: true });

    const taskId = '123';
    await wrapper.vm.toggleTaskCompletion(taskId);

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith(`${API_BASE_URL}/api/task/toggle/${taskId}`, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer fake-token'
      }
    });
  });

  it('should show an alert if fetch fails', async () => {
    const taskId = '123';
    const error = new Error('Network error');

    const mockAlert = vi.fn();
    global.alert = mockAlert;

    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    mockFetch.mockRejectedValueOnce(error);

    await wrapper.vm.toggleTaskCompletion(taskId);

    expect(mockAlert).toHaveBeenCalledOnce();
    expect(mockAlert).toHaveBeenCalledWith('Error toggling task completion. Please try again.');
  });

  it('updates isDialogVisible when EditTaskBox emits update:is-dialog-visible', async () => {
    const editTaskBox = wrapper.findComponent(EditTaskBox);

    await editTaskBox.vm.$emit('update:is-dialog-visible', true);
    expect(wrapper.vm.isDialogVisible).toBe(true);

    await editTaskBox.vm.$emit('update:is-dialog-visible', false);
    expect(wrapper.vm.isDialogVisible).toBe(false);
  });

  it('fetches tasks on mount', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(tasksMock)
        })
      )
    );

    await wrapper.vm.fetchTasks();
    expect(wrapper.vm.tasks).toEqual(tasksMock);
  });

  it('adds a new task to the list', async () => {
    const newTask = { _id: '3', title: 'Task 3', priority: 'medium', dueDate: '2024-12-31', completed: false };

    wrapper.vm.addTaskToList(newTask);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.tasks).toContainEqual(newTask);
  });

  it('opens the edit dialog with the correct task', async () => {
    const task = tasksMock[0];

    wrapper.findComponent(TodoTable).vm.$emit('edit-task', task);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.currentTask).toEqual(task);
    expect(wrapper.vm.isDialogVisible).toBe(true);
  });

  it('saves task changes and closes the dialog', async () => {
    const updatedTask = { _id: '1', title: 'Updated Task 1', description: 'Updated Description', completed: false };

    wrapper.vm.tasks = [...tasksMock];
    wrapper.vm.saveTaskChanges(updatedTask);

    const taskIndex = wrapper.vm.tasks.findIndex(task => task._id === updatedTask._id);
    expect(taskIndex).not.toBe(-1);
    expect(wrapper.vm.tasks[taskIndex]).toEqual(updatedTask);

    expect(wrapper.vm.isDialogVisible).toBe(false);
  });

  it('handles task deletion', async () => {
    const taskIdToDelete = '1';
    wrapper.vm.tasks = [...tasksMock];

    wrapper.vm.deleteTask(taskIdToDelete);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.tasks.find(task => task._id === taskIdToDelete)).toBeUndefined();
    expect(wrapper.vm.isDialogVisible).toBe(false);
  });

  it('handles fetch errors gracefully', async () => {
    fetch.mockResolvedValueOnce({ ok: false });

    await wrapper.vm.fetchTasks();

    expect(fetch).toHaveBeenCalledWith(`${global.API_BASE_URL}/api/task/getAll`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer mockToken'
      }
    });

    expect(wrapper.vm.tasks).toEqual([]);
  });
});
