import EditTaskBox from '@/components/EditTaskBox.vue';
import { useTaskStore } from '@/stores/taskStore';

describe('EditTaskBox', () => {
  let wrapper, taskStore;

  beforeEach(() => {
    wrapper = mount(EditTaskBox);
    taskStore = useTaskStore();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should not render the dialog if currentTaskId is not set', async () => {
    const dialog = wrapper.findComponent({ name: 'VDialog' });
    expect(dialog.props('modelValue')).toBe(false);
  });

  it('should render the dialog if currentTaskId is set', async () => {
    taskStore.currentTaskId = 1;
    await wrapper.vm.$nextTick();
    const dialog = wrapper.findComponent({ name: 'VDialog' });
    expect(dialog.exists()).toBe(true);
    expect(dialog.props('modelValue')).toBe(true);
  });

  it('should call updateTask and closeEditDialog on saveChanges', async () => {
    wrapper.vm.saveChanges();
    await wrapper.vm.$nextTick();
    expect(taskStore.updateTask).toHaveBeenCalled();
    expect(taskStore.closeEditDialog).toHaveBeenCalled();
  });

  it('should call deleteTask and closeEditDialog on deleteTask', async () => {
    wrapper.vm.deleteTask();
    await wrapper.vm.$nextTick();
    expect(taskStore.deleteTask).toHaveBeenCalled();
    expect(taskStore.closeEditDialog).toHaveBeenCalled();
  });

  it('should update currentTaskId based on dialog visibility', async () => {
    const dialog = wrapper.findComponent({ name: 'VDialog' });

    dialog.vm.$emit('update:model-value', false);
    await wrapper.vm.$nextTick();
    expect(taskStore.currentTaskId).toBeNull();

    taskStore.currentTaskId = '1';
    dialog.vm.$emit('update:model-value', true);
    await wrapper.vm.$nextTick();
    expect(taskStore.currentTaskId).toBe('1');
  });

  it('should update taskCopy when currentTaskId changes', async () => {
    taskStore.tasks = [
      { _id: '1', title: 'Task 1' },
      { _id: '2', title: 'Task 2' }
    ];

    taskStore.currentTaskId = '1';
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.taskCopy).toEqual({
      _id: '1',
      title: 'Task 1'
    });

    taskStore.currentTaskId = '2';
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.taskCopy).toEqual({
      _id: '2',
      title: 'Task 2'
    });

    taskStore.currentTaskId = null;
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.taskCopy).toEqual({});
  });

  it('should update taskCopy fields when inputs change', async () => {
    taskStore.tasks = [{ _id: '1', title: 'Task 1' }];
    taskStore.currentTaskId = '1';
    await wrapper.vm.$nextTick();

    const inputs = [
      { ref: 'taskTitle', field: 'title', value: 'New Task Title' },
      { ref: 'taskDescription', field: 'description', value: 'New Task Description' },
      { ref: 'taskDueDate', field: 'dueDate', value: '2025-01-01' },
      { ref: 'taskPriority', field: 'priority', value: 'High' }
    ];

    for (const input of inputs) {
      const fieldInput = wrapper.findComponent({ ref: input.ref });
      await fieldInput.setValue(input.value);
      expect(wrapper.vm.taskCopy[input.field]).toBe(input.value);
    }
  });
});
