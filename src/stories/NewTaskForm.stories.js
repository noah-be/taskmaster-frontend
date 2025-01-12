import NewTaskForm from '../components/NewTaskForm.vue';

export default {
  title: 'Forms/NewTaskForm',
  component: NewTaskForm
};

export const Default = () => ({
  components: { NewTaskForm },
  template: '<NewTaskForm />'
});
