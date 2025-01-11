import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import { ref } from 'vue';
import 'vuetify/styles';
import TodoTable from '@/components/TodoTable.vue';

describe('TodoTable.vue', () => {
  const vuetify = createVuetify();
  let wrapper;

  const emit = vi.fn();

  const tasks = [
    //    { _id: '1' }, // Undefined title, description, dueDate, priority
    //    { _id: '2', title: null, description: null, dueDate: null, priority: null, completed: null }, // Null title, description, dueDate, priority

    { _id: '3', title: 'Task 3', description: 'Description 3', dueDate: '2015-10-21', priority: 'High', completed: false }, // priority: 'High'
    { _id: '4', title: 'Task 4', description: 'Description 4', dueDate: '2015-10-21', priority: 'Medium', completed: false }, // priority: 'Medium'
    { _id: '5', title: 'Task 5', description: 'Description 5', dueDate: '2015-10-21', priority: 'Low', completed: false }, // priority: 'Low'

    { _id: '6', title: 'Task 6', description: 'Description 6', dueDate: '2015-10-21', priority: 'High', completed: true }, // completed: true
    { _id: '7', title: '', description: 'Description 7', dueDate: '2015-10-21', priority: 'High', completed: true }, // Empty title
    { _id: '8', title: 'Title 8', description: '', dueDate: '2015-10-21', priority: 'High', completed: true } // Empty description
    //    { _id: '9', title: 'Task 9', description: 'Description 9', dueDate: '', priority: 'High', completed: false } // Empty dueDate
  ];

  beforeEach(() => {
    wrapper = mount(TodoTable, {
      global: {
        plugins: [vuetify, global.i18n]
      },
      props: { tasks }
    });
  });

  // it('renders tasks with correct data', () => {
  //   const rows = wrapper.findAll('tr');

  //   expect(rows.length).toBe(tasks.length + 1);

  //   //const formatedDueDates = ['10/21/2015', '10/21/2015', 'Invalid Date', 'Invalid Date'];

  //   tasks.forEach((task, index) => {
  //     const columns = rows.at(index + 1).findAll('td');
  //     expect(columns.at(0).text()).toBe(task.title);
  //     expect(columns.at(1).text()).toBe(task.description);
  //     expect(columns.at(2).text()).toBe('10/21/2015');
  //     expect(columns.at(3).text()).toBe(task.priority);
  //   });
  // });

  it('stops event propagation on checkbox click and emits "toggle-task" with correct task id', async () => {
    const checkboxes = wrapper.findAll('input[type="checkbox"]');

    expect(checkboxes.length).toBe(tasks.length);

    const stopPropagationSpy = vi.fn();

    for (let index = 0; index < checkboxes.length; index++) {
      const checkbox = checkboxes.at(index);

      await checkbox.trigger('click', { stopPropagation: stopPropagationSpy });

      expect(wrapper.emitted('toggle-task')).toBeTruthy();
      expect(wrapper.emitted('toggle-task')[index]).toEqual([tasks[index]._id]);
      expect(stopPropagationSpy).toHaveBeenCalled();
    }
  });

  it('emits "edit-task" with the correct task data when a table row is clicked', async () => {
    const rows = wrapper.findAll('tr');

    rows.shift(); // Remove the header row

    expect(rows.length).toBe(tasks.length);

    for (let index = 0; index < rows.length; index++) {
      const row = rows.at(index);

      await row.trigger('click');

      expect(wrapper.emitted('edit-task')).toBeTruthy();
      expect(wrapper.emitted('edit-task')[index]).toEqual([tasks[index]]);
    }
  });
});
