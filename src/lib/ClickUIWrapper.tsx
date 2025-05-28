import { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { ClickUIProvider, ThemeName, useCUITheme } from '@clickhouse/click-ui';
import { ChartsThemeProvider } from '@/components/ChartsThemeProvider';

function ThemeProvider({ children }: { children: ReactNode }): ReactElement {
  const cuiTheme = useCUITheme();
  return <EmotionThemeProvider theme={cuiTheme}>{children}</EmotionThemeProvider>;
}

const clickUIProviderConfig = {
  tooltip: {
    delayDuration: 0
  }
};

export function ClickUIWrapper({ children }: { children: ReactNode }): ReactElement {
  return (
    <ClickUIProvider theme={'dark'} config={clickUIProviderConfig}>
      <ThemeProvider>{children}</ThemeProvider>
    </ClickUIProvider>
  );
}

export default ClickUIWrapper;

export const StorybookWrapper = ({
  children,
  theme = 'dark'
}: PropsWithChildren<{
  theme: ThemeName;
}>): ReactElement => {
  return (
    <ClickUIProvider theme={theme}>
      <ChartsThemeProvider>{children}</ChartsThemeProvider>
    </ClickUIProvider>
  );
};
