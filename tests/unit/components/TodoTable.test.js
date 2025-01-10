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
    { _id: '3', title: 'Task 3', description: 'Description 3', dueDate: '2024-10-15', priority: 'Low', completed: false },
    { _id: '4', title: 'Task 4', description: 'Description 4', dueDate: '2024-09-20', priority: 'Unknown', completed: true }
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
});
