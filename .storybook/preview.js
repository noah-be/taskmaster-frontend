import { setup } from '@storybook/vue3';
import { registerPlugins } from '../src/plugins';

setup(registerPlugins);

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
