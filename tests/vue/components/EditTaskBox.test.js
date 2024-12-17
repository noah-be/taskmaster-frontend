import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import EditTaskBox from '@/components/EditTaskBox.vue';

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}));

describe('EditTaskBox.vue', () => {
  let wrapper;
  const vuetify = createVuetify();
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
        plugins: [vuetify, global.i18n]
      },
      props: {
        task,
        isDialogVisible: true
      }
    });
  });

  it('renders the dialog when visible', () => {
    const dialog = wrapper.findComponent({ name: 'VDialog' });
    expect(dialog.exists()).toBe(true);
    expect(dialog.props('modelValue')).toBe(true);
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

  it('emits save-task when Save Changes is clicked', async () => {
    const saveButton = wrapper.findComponent({ ref: 'saveButton' });
    await saveButton.trigger('click');

    expect(wrapper.emitted('save-task')[0]).toEqual([
      {
        _id: '1',
        title: 'Test Task',
        description: 'Test Description',
        dueDate: '2024-12-31',
        priority: 'Medium'
      }
    ]);
  });

  it('emits delete-task when Delete is clicked', async () => {
    const deleteButton = wrapper.findComponent({ ref: 'deleteButton' });
    await deleteButton.trigger('click');

    expect(wrapper.emitted('delete-task')[0]).toEqual([task._id]);
  });

  it('closes the dialog when closeDialog is called', async () => {
    expect(wrapper.props('isDialogVisible')).toBe(true);

    await wrapper.vm.closeDialog();
    expect(wrapper.emitted('update:is-dialog-visible')[0]).toEqual([false]);
  });

  it('formats the due date correctly', () => {
    const dueDateInput = wrapper.findComponent({ ref: 'dueDateField' });
    const inputElement = dueDateInput.find('input');
    expect(inputElement.element.value).toBe('2024-12-31');
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
