import Header from '../components/Header.vue';

export default {
  title: 'Layout/Header',
  component: Header
};

const Template = () => ({
  components: { Header },
  template: '<Header />'
});

export const Default = Template.bind({});
