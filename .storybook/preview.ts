import type { Preview } from '@storybook/react';
import React from 'react';
import { themes } from '@storybook/theming';
import '../src/styles.css';
import './storybook.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    docs: {
      source: {
        type: 'code',
        language: 'tsx',
        format: 'dedent',
      },
      canvas: {
        sourceState: 'shown',
      },
      story: {
        inline: true,
        height: 'auto',
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light' },
          { value: 'dark', icon: 'circle', title: 'Dark' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || 'light';
      const isDocs = context.viewMode === 'docs';

      // Apply theme classes to document
      React.useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        if (theme === 'dark') {
          root.classList.add('dark');
          body.classList.add('dark');
        } else {
          root.classList.remove('dark');
          body.classList.remove('dark');
        }
      }, [theme]);

      // Different styling for docs vs story view
      const wrapperStyle = isDocs ? {
        // Docs view - follow theme background but minimal styling
        backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        padding: '1rem',
        minHeight: 'auto',
        display: 'block',
        transition: 'all 0.2s ease',
      } : {
        // Story view - full page styling
        backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
        color: theme === 'dark' ? '#ffffff' : '#000000',
        minHeight: '100vh',
        padding: '1rem',
        transition: 'all 0.2s ease',
      };

      return React.createElement(
        'div',
        {
          className: theme === 'dark' ? 'dark' : '',
          style: wrapperStyle,
        },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;