import RegistrationGuidelines from '../components/RegistrationGuidelines.vue';

export default {
  title: 'Components/RegistrationGuidelines',
  component: RegistrationGuidelines,
  argTypes: {
    visible: { control: 'boolean' }
  }
};

const Template = args => ({
  components: { RegistrationGuidelines },
  setup() {
    return { args };
  },
  template: '<RegistrationGuidelines v-bind="args" />'
});

export const Visible = Template.bind({});
Visible.args = {
  visible: true
};

export const Hidden = Template.bind({});
Hidden.args = {
  visible: false
};
