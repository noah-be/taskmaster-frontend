import EditTaskBox from './EditTaskBox.vue';

export default {
  title: 'Components/EditTaskBox',
  component: EditTaskBox,
  argTypes: {
    isDialogVisible: { control: 'boolean' },
    task: { control: 'object' }
  }
};

const Template = args => ({
  components: { EditTaskBox },
  setup() {
    return { args };
  },
  template: '<EditTaskBox v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {
  isDialogVisible: true,
  task: {
    title: 'Sample Task',
    description: 'This is a sample task description.',
    dueDate: '2025-01-01',
    priority: 'Medium',
    _id: '12345'
  }
};

export const Hidden = Template.bind({});
Hidden.args = {
  isDialogVisible: false,
  task: {
    title: 'Sample Task',
    description: 'This is a sample task description.',
    dueDate: '2025-01-01',
    priority: 'Medium',
    _id: '12345'
  }
};
