import { setup } from '@storybook/vue3';
import { i18n, registerPlugins } from '../src/plugins';

setup(registerPlugins);

export const globalTypes = {
  locale: {
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'de', right: '🇩🇪', title: 'Deutsch' }
      ]
    }
  }
};

export const decorators = [
  (Story, context) => {
    i18n.global.locale.value = context.globals.locale;
    return Story();
  }
];

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
