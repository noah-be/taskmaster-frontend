import TodoTable from '../components/TodoTable.vue';

export default {
  title: 'Components/TodoTable',
  component: TodoTable,
  argTypes: {
    tasks: { control: 'array' }
  }
};

const Template = args => ({
  components: { TodoTable },
  setup() {
    return { args };
  },
  template: '<TodoTable v-bind="args" />'
});

export const Default = Template.bind({});
Default.args = {
  tasks: [
    {
      _id: '1',
      title: 'Task 1',
      description: 'Description of Task 1',
      dueDate: '2025-01-15',
      priority: 'High',
      completed: false
    },
    {
      _id: '2',
      title: 'Task 2',
      description: 'Description of Task 2',
      dueDate: '2025-01-20',
      priority: 'Medium',
      completed: true
    },
    {
      _id: '3',
      title: 'Task 3',
      description: 'Description of Task 3',
      dueDate: '2025-01-25',
      priority: 'Low',
      completed: false
    }
  ]
};
