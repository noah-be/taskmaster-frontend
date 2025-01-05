import LoginForm from './LoginForm.vue';

export default {
  title: 'Components/LoginForm',
  component: LoginForm
};

export const Default = () => ({
  components: { LoginForm },
  template: '<LoginForm />'
});
