import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import TodoTable from '@/components/TodoTable.vue';

describe('TodoTable.vue', () => {
  const vuetify = createVuetify();

  const tasks = [
    {
      _id: '1',
      title: 'Task 1',
      description: 'Description 1',
      dueDate: '2024-12-31',
      priority: 'High',
      completed: false
    },
    {
      _id: '2',
      title: 'Task 2',
      description: 'Description 2',
      dueDate: '2024-11-30',
      priority: 'Medium',
      completed: true
    }
  ];

  it('renders tasks correctly', () => {
    const wrapper = mount(TodoTable, {
      global: {
        plugins: [vuetify]
      },
      props: {
        tasks
      }
    });

    const rows = wrapper.findAll('tr');
    expect(rows).toHaveLength(3);

    const firstTaskColumns = rows[1].findAll('td');
    expect(firstTaskColumns.at(0).text()).toBe('Task 1');
    expect(firstTaskColumns.at(1).text()).toBe('Description 1');
    expect(firstTaskColumns.at(2).text()).toBe('12/31/2024');
    expect(firstTaskColumns.at(3).text()).toBe('High');

    const firstTaskCheckbox = rows[1].find("input[type='checkbox']");
    expect(firstTaskCheckbox.element.checked).toBe(false);

    const secondTaskColumns = rows[2].findAll('td');
    expect(secondTaskColumns.at(0).text()).toBe('Task 2');
    expect(secondTaskColumns.at(1).text()).toBe('Description 2');
    expect(secondTaskColumns.at(2).text()).toBe('11/30/2024');
    expect(secondTaskColumns.at(3).text()).toBe('Medium');

    const secondTaskCheckbox = rows[2].find("input[type='checkbox']");
    expect(secondTaskCheckbox.element.checked).toBe(true);
  });

  it('toggles task completion correctly', async () => {
    const wrapper = mount(TodoTable, {
      global: {
        plugins: [vuetify]
      },
      props: {
        tasks
      }
    });

    const firstCheckbox = wrapper.findComponent({ ref: 'checkbox_' + tasks[0]._id });
    const firstCheckboxInput = firstCheckbox.find('input[type="checkbox"]');

    expect(firstCheckboxInput.element.checked).toBe(false);

    await firstCheckboxInput.trigger('click');
    expect(firstCheckboxInput.element.checked).toBe(true);

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('toggle-task')).toBeTruthy();
    expect(wrapper.emitted()['toggle-task'][0]).toEqual([tasks[0]._id]);

    const secondCheckbox = wrapper.findComponent({ ref: 'checkbox_' + tasks[1]._id });
    const secondCheckboxInput = secondCheckbox.find('input[type="checkbox"]');

    expect(secondCheckboxInput.element.checked).toBe(true);

    await secondCheckboxInput.trigger('click');
    expect(secondCheckboxInput.element.checked).toBe(false);

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('toggle-task')).toBeTruthy();
    expect(wrapper.emitted()['toggle-task'][1]).toEqual([tasks[1]._id]);
  });

  it('emits edit-task event when row is clicked', async () => {
    const wrapper = mount(TodoTable, {
      global: {
        plugins: [vuetify]
      },
      props: {
        tasks
      }
    });

    const row = wrapper.findAll('tr').at(1);
    await row.trigger('click');

    expect(wrapper.emitted('edit-task')[0]).toEqual([tasks[0]]);
  });

  it('returns correct color for each priority', () => {
    const wrapper = mount(TodoTable, {
      global: {
        plugins: [vuetify]
      },
      props: {
        tasks
      }
    });

    expect(wrapper.vm.getPriorityColor('High')).toBe('red');
    expect(wrapper.vm.getPriorityColor('Medium')).toBe('orange');
    expect(wrapper.vm.getPriorityColor('Low')).toBe('blue');
    expect(wrapper.vm.getPriorityColor('Unknown')).toBe('grey');
  });
});
