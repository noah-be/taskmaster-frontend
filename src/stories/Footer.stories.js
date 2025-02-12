import Footer from '../components/Footer.vue';

export default {
  title: 'Layout/Footer',
  component: Footer
};

const Template = () => ({
  components: { Footer },
  template: '<Footer />'
});

export const Default = Template.bind({});
