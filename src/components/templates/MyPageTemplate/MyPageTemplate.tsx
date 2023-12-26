import { Body, Head, Wrap } from '@components/templates/HomeTemplate/Styled';
import { MyBanner } from '@components/templates/MyPageTemplate/MyBanner';
import { MyMenu } from '@components/templates/MyPageTemplate/MyMenu';
import { MyUser } from '@components/templates/MyPageTemplate/MyUser';

export const MyPageTemplate = () => {
  return (
    <Wrap>
      <Head style={{ paddingBottom: '10px', flex: '0 0 95px' }}>
        <MyUser />
      </Head>
      <Body>
        <MyBanner />
        <MyMenu />
      </Body>
    </Wrap>
  );
};
