import type { Preview } from '@storybook/react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { StorybookWrapper } from '@/lib/ClickUIWrapper';
import { Container } from '@clickhouse/click-ui';

import './style-overrides.css';

// Initialize MSW
initialize();

export const decorators = [
  (Story) => {
    return (
      <Container orientation="horizontal" justifyContent="center">
        <Story />
      </Container>
    );
  },
  withThemeFromJSXProvider({
    Provider: StorybookWrapper
  })
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    deepControls: { enabled: true }
  },
  tags: ['autodocs'],
  loaders: [mswLoader]
};

export default preview;
