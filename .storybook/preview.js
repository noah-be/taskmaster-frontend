import { setup } from '@storybook/vue3';
import { watchEffect } from 'vue';
import { i18n, registerPlugins } from '../src/plugins';
import { withVuetifyTheme } from './withVuetifyTheme.decorator';

setup(app => {
  registerPlugins(app);
});

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
  },
  withVuetifyTheme
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
