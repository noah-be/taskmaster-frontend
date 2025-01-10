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

  beforeEach(() => {
    wrapper = mount(TodoTable, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: { tasks }
    });
  });

  it('renders all key elements', () => {
    expect(wrapper.find('[data-testid="v-container"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="v-card"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="data-table"]').exists()).toBe(true);
  });

  it('renders tasks with correct data', () => {
    const rows = wrapper.findAll('tr');
    expect(rows.length).toBe(tasks.length + 1);

    tasks.forEach((task, index) => {
      const columns = rows.at(index + 1).findAll('td');
      expect(columns.at(0).text()).toBe(task.title);
      expect(columns.at(1).text()).toBe(task.description);
      expect(columns.at(2).text()).toBe(new Date(task.dueDate).toLocaleDateString());
      expect(columns.at(3).text()).toBe(task.priority);
    });
  });

  it('emits "toggle-task" correctly on checkbox click', async () => {
    const checkbox = wrapper.find('[data-testid="checkbox-1"]');
    expect(checkbox.exists()).toBe(true);

    await checkbox.trigger('click');
    expect(wrapper.emitted('toggle-task')).toBeTruthy();
    expect(wrapper.emitted('toggle-task')[0]).toEqual([tasks[0]._id]);
  });

  it('stops event propagation on checkbox click', async () => {
    const checkbox = wrapper.find('[data-testid="checkbox-1"]');
    const stopPropagationSpy = vi.fn();

    await checkbox.trigger('click', { stopPropagation: stopPropagationSpy });
    expect(stopPropagationSpy).toHaveBeenCalled();
  });

  it('renders priority chips with correct colors', () => {
    tasks.forEach(task => {
      const chip = wrapper.find(`[data-testid="chip-${task._id}"]`);
      expect(chip.exists()).toBe(true);
      const expectedClass = `text-${wrapper.vm.getPriorityColor(task.priority)}`;
      expect(chip.classes()).toContain(expectedClass);
    });
  });

  it('handles all priority levels in getPriorityColor method', () => {
    expect(wrapper.vm.getPriorityColor('High')).toBe('red');
    expect(wrapper.vm.getPriorityColor('Medium')).toBe('orange');
    expect(wrapper.vm.getPriorityColor('Low')).toBe('blue');
    expect(wrapper.vm.getPriorityColor('Unknown')).toBe('grey');
    expect(wrapper.vm.getPriorityColor('')).toBe('grey');
    expect(wrapper.vm.getPriorityColor(undefined)).toBe('grey');
  });

  it('emits "edit-task" with correct data on row click', async () => {
    const row = wrapper.find('[data-testid="data-table"] tbody tr:nth-child(2)');
    expect(row.exists()).toBe(true);

    await row.trigger('click');
    expect(wrapper.emitted('edit-task')).toBeTruthy();
    expect(wrapper.emitted('edit-task')[0]).toEqual([tasks[1]]);
  });

  it('renders headers correctly', () => {
    const headerRow = wrapper.find('thead tr');
    const headers = headerRow.findAll('th');

    const expectedHeaders = ['Title', 'Description', 'Due Date', 'Priority', 'Done'];
    headers.forEach((header, index) => {
      expect(header.text()).toBe(expectedHeaders[index]);
    });
  });

  it('formats null or undefined due dates gracefully', () => {
    expect(wrapper.vm.formatDueDate(null)).toBe('Invalid Date');
    expect(wrapper.vm.formatDueDate(undefined)).toBe('Invalid Date');
    expect(wrapper.vm.formatDueDate('invalid-date')).toBe('Invalid Date');
  });

  it('is a Vue instance', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('exports a valid Vue component', () => {
    expect(TodoTable).toBeTruthy();
  });
});
