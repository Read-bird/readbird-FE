import { LoadingTemplate } from '@components/templates/LoadingTemplate';
import { appRouter } from '@routers/appRouter';
import { GlobalStyle, theme } from '@style/global-style';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={appRouter} fallbackElement={<LoadingTemplate />} />
    </ThemeProvider>
  );
};
