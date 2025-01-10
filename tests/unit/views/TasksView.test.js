import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import TasksView from '@/views/TasksView.vue';
import NewTaskForm from '@/components/NewTaskForm.vue';
import TodoTable from '@/components/TodoTable.vue';
import EditTaskBox from '@/components/EditTaskBox.vue';

describe('TasksView.vue', () => {
  const vuetify = createVuetify();
  let wrapper;

  const tasksMock = [
    { _id: '1', title: 'Task 1', description: 'Description 1', priority: 'medium', completed: false },
    { _id: '2', title: 'Task 2', description: 'Description 2', priority: 'medium', completed: true }
  ];

  const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => {});

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

  it('renders child components correctly', () => {
    expect(wrapper.findComponent(NewTaskForm).exists()).toBe(true);
    expect(wrapper.findComponent(TodoTable).exists()).toBe(true);
    expect(wrapper.findComponent(EditTaskBox).exists()).toBe(true);
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
    const newTask = { _id: '3', title: 'Task 3', priority: 'medium', completed: false };

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

  it('toggles task completion successfully', async () => {
    const taskIdToToggle = '1';
    const updatedTask = { _id: '1', title: 'Task 1', description: 'Description 1', completed: true };

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(updatedTask)
        })
      )
    );

    wrapper.vm.tasks = [...tasksMock];

    await wrapper.vm.toggleTaskCompletion(taskIdToToggle);

    const taskIndex = wrapper.vm.tasks.findIndex(task => task._id === taskIdToToggle);
    expect(taskIndex).not.toBe(-1);
    expect(wrapper.vm.tasks[taskIndex]).toEqual(updatedTask);

    expect(global.fetch).toHaveBeenCalledWith(`${global.API_BASE_URL}/api/task/toggle/${taskIdToToggle}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer mockToken`
      }
    });
  });

  it('handles task toggle failure gracefully', async () => {
    const taskIdToToggle = '1';

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: false
        })
      )
    );

    const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

    await wrapper.vm.toggleTaskCompletion(taskIdToToggle);

    expect(global.fetch).toHaveBeenCalledWith(`${global.API_BASE_URL}/api/task/toggle/${taskIdToToggle}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer mockToken`
      }
    });

    expect(alertMock).toHaveBeenCalledWith('Error toggling task completion. Please try again.');

    alertMock.mockRestore();
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

  it('does not update task if it is not found', () => {
    const updatedTask = { _id: '3', title: 'Updated Task' };

    wrapper.vm.tasks = [...tasksMock];

    const logSpy = vi.spyOn(console, 'log');

    wrapper.vm.saveTaskChanges(updatedTask);

    expect(wrapper.vm.tasks).toEqual(tasksMock);
    expect(logSpy).toHaveBeenCalledWith('Task not found');
  });
});
