import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import TodoTable from '@/components/TodoTable.vue';

describe('TodoTable.vue', () => {
  const vuetify = createVuetify();
  let wrapper;

  const tasks = [
    { _id: '1', title: 'Task 1', description: 'Description 1', dueDate: '2024-12-31', priority: 'High', completed: false },
    { _id: '2', title: 'Task 2', description: 'Description 2', dueDate: '2024-11-30', priority: 'Medium', completed: true },
    { _id: '3', title: 'Task 3', description: 'Description 3', dueDate: null, priority: 'Low', completed: false },
    { _id: '4', title: 'Task 4', description: 'Description 4', dueDate: 'Blueberry', priority: 'Unknown', completed: true }
  ];

  beforeAll(() => {
    wrapper = mount(TodoTable, {
      global: {
        plugins: [vuetify, global.i18n]
      },
      props: { tasks }
    });
  });

  it('emits "toggle-task" correctly on checkbox click', async () => {
    const checkbox = wrapper.find('[data-testid="checkbox-1"]');
    expect(checkbox.exists()).toBe(true);

    await checkbox.trigger('click');
    expect(wrapper.emitted('toggle-task')).toBeTruthy();
    expect(wrapper.emitted('toggle-task')[0]).toEqual([tasks[0]._id]);
  });

  it('emits "edit-task" with the correct row data when a table row is clicked', async () => {
    const row = { item: tasks[0] };
    wrapper.vm.onRowClick(row);

    expect(wrapper.emitted('edit-task')).toBeTruthy();
    expect(wrapper.emitted('edit-task')[0]).toEqual([tasks[0]]);
  });

  it('renders tasks with correct data', () => {
    const rows = wrapper.findAll('tr');
    expect(rows.length).toBe(tasks.length + 1);

    const formatedDueDates = ['12/31/2024', '11/30/2024', 'Invalid Date', 'Invalid Date'];

    tasks.forEach((task, index) => {
      const columns = rows.at(index + 1).findAll('td');
      expect(columns.at(0).text()).toBe(task.title);
      expect(columns.at(1).text()).toBe(task.description);
      expect(columns.at(2).text()).toBe(formatedDueDates[index]);
      expect(columns.at(3).text()).toBe(task.priority);
    });
  });

  it('stops event propagation on checkbox click', async () => {
    const checkbox = wrapper.find('[data-testid="checkbox-1"]');
    const stopPropagationSpy = vi.fn();

    await checkbox.trigger('click', { stopPropagation: stopPropagationSpy });
    expect(stopPropagationSpy).toHaveBeenCalled();
  });
});
