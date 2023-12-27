import { Spacing } from '@components/common/Spacing';
import { Body, Head, Wrap } from '@components/templates/HomeTemplate/Styled';
import { BackTitle } from '@components/templates/MyPage/BackTitle';
import { MyUser } from '@components/templates/MyPageTemplate/MyUser';
import { Outlet, useLocation } from 'react-router-dom';

export const MyPageTemplate = () => {
  const location = useLocation();

  return (
    <Wrap>
      <Head>
        {
          {
            '/mypage': <MyUser />,
            '/mypage/restore': <BackTitle title="플랜 복원" />,
            '/mypage/library': <BackTitle title="나의 서재" />,
            '/mypage/encyclopedia': <BackTitle title="나의 도감" />
          }[location.pathname]
        }
        <Spacing height={10} />
      </Head>
      <Body>
        <Outlet />
      </Body>
    </Wrap>
  );
};
