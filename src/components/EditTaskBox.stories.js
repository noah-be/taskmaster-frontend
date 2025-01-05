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
  template: `
    <div style="padding: 20px; background-color: #f5f5f5; min-height: 100vh;">
      <EditTaskBox v-bind="args" />
    </div>
  `
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
