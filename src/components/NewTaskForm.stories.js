import NewTaskForm from './NewTaskForm.vue';

export default {
  title: 'Components/NewTaskForm',
  component: NewTaskForm
};

export const Default = () => ({
  components: { NewTaskForm },
  template: '<NewTaskForm />'
});
