import { setCurrentDate } from '@/store/reducers';
import { TAppDispatch } from '@/store/state';
import { LoadingTemplate, RouterLoading } from '@components/templates/LoadingTemplate';
import { useAxiosInterceptor } from '@hooks/axiosInterceptor';
import { appRouter } from '@routers/appRouter';
import { GlobalStyle, theme } from '@style/global-style';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

export const App = () => {
  // 첫 접속시 날짜 등록
  const dispatch = useDispatch<TAppDispatch>();
  // axios interceptor
  useAxiosInterceptor();

  useEffect(() => {
    // 첫 접속시 당일 날짜 등록
    dispatch(setCurrentDate(dayjs().format()));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <LoadingTemplate />
      <RouterProvider router={appRouter} fallbackElement={<RouterLoading />} />
    </ThemeProvider>
  );
};
