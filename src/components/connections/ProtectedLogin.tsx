import { setAccessToken, setCurrentDate, setMonthCurrentDate } from '@/store/reducers';
import { TAppDispatch, TRootState } from '@/store/state';
import dayjs from 'dayjs';
import { Fragment, ReactNode, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

type TProps = {
  loginNode?: ReactNode;
  appNode?: ReactNode;
};

export const ProtectedLogin = ({ loginNode, appNode }: TProps) => {
  const { accessToken } = useSelector((state: TRootState) => state.userStore);
  const dispatch = useDispatch<TAppDispatch>();

  const location = useLocation();
  const isLoginPath = useMemo(() => /login/g.test(location.pathname), [location.pathname]);

  useEffect(() => {
    // 첫 접속시 당일 날짜 등록
    dispatch(setCurrentDate(dayjs().format('YYYY-MM-DD')));
    dispatch(setMonthCurrentDate(dayjs().format('YYYY-MM-DD')));
    // 토큰 등록
    dispatch(setAccessToken(localStorage.getItem('rb-access-token') ?? ''));
  }, []);

  // 토큰 정보가 없고 로그인 화면인 경우
  if (!accessToken && isLoginPath) {
    return <Fragment>{loginNode}</Fragment>;
  }

  // 토큰 정보가 없고 홈 화면인 경우
  if (!accessToken && !isLoginPath) {
    return <Navigate to={`/login`} />;
  }

  // 토큰 정보가 있고 로그인 화면인 경우
  if (accessToken && isLoginPath) {
    return <Navigate to={`/`} />;
  }

  // 토큰 정보가 있고 홈 화면인 경우
  return <Fragment>{appNode}</Fragment>;
};
