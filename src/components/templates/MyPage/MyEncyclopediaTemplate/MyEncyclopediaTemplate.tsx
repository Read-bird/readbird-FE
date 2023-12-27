import { Spacing } from '@components/common/Spacing';
import { Body, Head, Wrap } from '@components/templates/HomeTemplate/Styled';
import { BackTitle } from '@components/templates/MyPage/BackTitle';
import { EncyclopediaList } from '@components/templates/MyPage/MyEncyclopediaTemplate/EncyclopediaList';

export const MyEncyclopediaTemplate = () => {
  return (
    <Wrap>
      <Head>
        <BackTitle title="나의 도감" />
        <Spacing height={10} />
      </Head>
      <Body>
        <EncyclopediaList />
      </Body>
    </Wrap>
  );
};
