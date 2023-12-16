import { Fragment, ReactNode, useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type TProps = {
  loginNode?: ReactNode;
  appNode?: ReactNode;
};

export const ProtectedLogin = ({ loginNode, appNode }: TProps) => {
  const [isLoading, setLoading] = useState(true);
  const [loginToken, setLoginToken] = useState<string | null>(null);

  const location = useLocation();
  const isLoginPath = useMemo(() => /login/g.test(location.pathname), [location.pathname]);

  useEffect(() => {
    // api를 이용해 로그인 토큰을 불러온다
    setLoginToken('토큰이 존재한다고 가정');
    // setLoginToken(null);
    setLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  }

  // 토큰 정보가 없고 로그인 화면인 경우
  if (loginToken === null && isLoginPath) {
    return <Fragment>{loginNode}</Fragment>;
  }

  // 토큰 정보가 없고 홈 화면인 경우
  if (loginToken === null && !isLoginPath) {
    return <Navigate to={`/login`} />;
  }

  // 토큰 정보가 있고 로그인 화면인 경우
  if (loginToken && isLoginPath) {
    return <Navigate to={`/`} />;
  }

  // 토큰 정보가 있고 홈 화면인 경우
  return <Fragment>{appNode}</Fragment>;
};
