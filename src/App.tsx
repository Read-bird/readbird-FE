import { LoadingTemplate, RouterLoading } from '@components/templates/LoadingTemplate';
import { useAxiosInterceptor } from '@hooks/axiosInterceptor';
import { appRouter } from '@routers/appRouter';
import { GlobalStyle, theme } from '@style/global-style';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

export const App = () => {
  // axios interceptor
  useAxiosInterceptor();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LoadingTemplate />
      <RouterProvider router={appRouter} fallbackElement={<RouterLoading />} />
    </ThemeProvider>
  );
};
