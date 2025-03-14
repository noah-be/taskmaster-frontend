import Navbar from '../components/Navbar.vue';

export default {
  title: 'Navigation/Navbar',
  component: Navbar
};

const Template = args => ({
  components: { Navbar },
  setup() {
    return { args };
  },
  template: `
    <div>
      <Navbar style="background-color: grey;" v-bind="args" />
    </div>
  `
});

export const Default = Template.bind({});
Default.args = {
  buttonTextColor: 'black' // This solves white text on white background
};
