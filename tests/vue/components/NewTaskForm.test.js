import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import NewTaskForm from '@/components/NewTaskForm.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('NewTaskForm.vue', () => {
  const vuetify = createVuetify();
  let wrapper;

  beforeEach(() => {
    vi.resetAllMocks();
    vi.stubGlobal('fetch', vi.fn());
    wrapper = mount(NewTaskForm, {
      global: {
        plugins: [vuetify]
      }
    });
  });

  it('renders correctly with default values', () => {
    const titleInput = wrapper.find('input[placeholder="Task title"]');
    const prioritySelect = wrapper.findComponent({ name: 'VSelect' });
    const dueDateInput = wrapper.find('input[type="date"]');
    const addButton = wrapper.findComponent({ name: 'VBtn' });

    expect(titleInput.exists()).toBe(true);
    expect(prioritySelect.exists()).toBe(true);
    expect(dueDateInput.exists()).toBe(true);
    expect(addButton.exists()).toBe(true);

    expect(wrapper.vm.title).toBe('');
    expect(wrapper.vm.priority).toBe('Medium');
    expect(wrapper.vm.dueDate).toBe('');
  });

  it('binds title, priority, and dueDate to the data', async () => {
    const wrapper = mount(NewTaskForm, {
      global: {
        plugins: [vuetify]
      }
    });

    const titleField = wrapper.find('input[placeholder="Task title"]');
    await titleField.setValue('New Task');
    expect(wrapper.vm.title).toBe('New Task');

    const priorityField = wrapper.findComponent({ name: 'VSelect' });
    await priorityField.setValue('High');
    expect(wrapper.vm.priority).toBe('High');

    const dueDateField = wrapper.find('input[type="date"]');
    await dueDateField.setValue('2024-12-31');
    expect(wrapper.vm.dueDate).toBe('2024-12-31');
  });

  it('shows alert if title or due date are empty when adding a task', async () => {
    global.alert = vi.fn();

    await wrapper.findComponent({ name: 'VBtn' }).trigger('click');

    expect(global.alert).toHaveBeenCalledWith('Task title and due date are required.');
  });

  it('successfully adds a task when form is valid', async () => {
    const mockTask = { title: 'Test Task', priority: 'High', dueDate: '2024-12-31' };

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTask)
        })
      )
    );

    wrapper.setData({ title: 'Test Task', dueDate: '2024-12-31' });
    await wrapper.findComponent({ name: 'VBtn' }).trigger('click');

    expect(wrapper.emitted('task-added')[0]).toEqual([mockTask]);
    expect(wrapper.vm.title).toBe('');
    expect(wrapper.vm.dueDate).toBe('');
    expect(wrapper.vm.priority).toBe('Medium');
  });

  it('handles errors during task creation', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false }))
    );

    wrapper.setData({ title: 'Test Task', dueDate: '2024-12-31' });
    await wrapper.findComponent({ name: 'VBtn' }).trigger('click');

    expect(wrapper.vm.title).toBe('Test Task');
    expect(wrapper.vm.dueDate).toBe('2024-12-31');
  });

  it('resets form after adding task successfully', async () => {
    const mockTask = { title: 'Test Task', priority: 'High', dueDate: '2024-12-31' };

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTask)
        })
      )
    );

    wrapper.setData({ title: 'Test Task', dueDate: '2024-12-31' });
    await wrapper.findComponent({ name: 'VBtn' }).trigger('click');

    expect(wrapper.vm.title).toBe('');
    expect(wrapper.vm.dueDate).toBe('');
    expect(wrapper.vm.priority).toBe('Medium');
  });

  it('emits task-added when a task is successfully added', async () => {
    const mockTask = { title: 'New Task', priority: 'Low', dueDate: '2024-12-31' };

    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockTask)
        })
      )
    );

    wrapper.setData({ title: 'New Task', dueDate: '2024-12-31' });
    await wrapper.findComponent({ name: 'VBtn' }).trigger('click');

    expect(wrapper.emitted('task-added')[0]).toEqual([mockTask]);
  });

  it('calls fetch with correct parameters when adding a task', async () => {
    const mockToken = 'simulated-token';
    vi.stubGlobal('localStorage', {
      getItem: vi.fn().mockReturnValue(mockToken)
    });

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ title: 'New Task' })
      })
    );
    vi.stubGlobal('fetch', mockFetch);

    wrapper.setData({ title: 'New Task', dueDate: '2024-12-31' });

    await wrapper.findComponent({ name: 'VBtn' }).trigger('click');

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/task',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${mockToken}`
        }),
        body: JSON.stringify({
          title: 'New Task',
          priority: 'Medium',
          dueDate: '2024-12-31'
        })
      })
    );
  });
});
