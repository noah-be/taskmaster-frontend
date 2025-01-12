import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import EditTaskBox from '@/components/EditTaskBox.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('EditTaskBox.vue', () => {
  let wrapper;
  const task = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    dueDate: '2024-12-31',
    priority: 'Medium'
  };

  beforeEach(() => {
    vi.resetAllMocks();
    wrapper = mount(EditTaskBox, {
      global: {
        plugins: [vuetify, i18n]
      },
      props: {
        task,
        isDialogVisible: true
      }
    });
  });

  it('updates the task data correctly when input is changed', async () => {
    const titleInput = wrapper.findComponent({ ref: 'titleField' });
    await titleInput.setValue('Updated Task');
    expect(wrapper.vm.taskCopy.title).toBe('Updated Task');

    const descriptionInput = wrapper.findComponent({ ref: 'descriptionField' });
    await descriptionInput.setValue('Updated task description');
    expect(wrapper.vm.taskCopy.description).toBe('Updated task description');

    const dueDateInput = wrapper.findComponent({ ref: 'dueDateField' });
    await dueDateInput.setValue('2025-01-01');
    expect(wrapper.vm.taskCopy.dueDate).toBe('2025-01-01');

    const prioritySelect = wrapper.findComponent({ ref: 'prioritySelect' });
    await prioritySelect.setValue('Medium');
    expect(wrapper.vm.taskCopy.priority).toBe('Medium');
  });

  it('emits save-task with correct data when Save Changes is clicked', async () => {
    const saveButton = wrapper.findComponent({ ref: 'saveButton' });
    await saveButton.trigger('click');

    expect(wrapper.emitted('save-task')[0][0]).toEqual(task);
  });

  it('emits delete-task with correct id when Delete is clicked', async () => {
    const deleteButton = wrapper.findComponent({ ref: 'deleteButton' });
    await deleteButton.trigger('click');

    expect(wrapper.emitted('delete-task')[0]).toEqual([task._id]);
  });

  it('returns an empty string for invalid date', async () => {
    const invalidDateTask = {
      ...task,
      dueDate: 'Invalid Date'
    };

    const invalidDateWrapper = mount(EditTaskBox, {
      global: {
        plugins: [vuetify, global.i18n]
      },
      props: {
        task: invalidDateTask,
        isDialogVisible: true
      }
    });

    const dueDateInput = invalidDateWrapper.findComponent({ ref: 'dueDateField' });
    const dueDateInputElement = dueDateInput.find('input');

    expect(dueDateInputElement.element.value).toBe('');
  });
});
