import { Spacing } from '@components/common/Spacing';
import styled from 'styled-components';
import { MyBanner } from './MyBanner';
import { MyMenu } from './MyMenu';

export const MyMainTemplate = () => {
  return (
    <Wrap>
      <Spacing height={20} />
      <MyBanner />
      <Spacing height={10} />
      <MyMenu />
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 13px;
`;
