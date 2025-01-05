import LoginForm from './LoginForm.vue';

export default {
  title: 'Forms/LoginForm',
  component: LoginForm
};

export const Default = () => ({
  components: { LoginForm },
  template: '<LoginForm />'
});
