import { LoadingBird } from '@assets/images';
import { Dots } from '@components/common/Loading/Dots';
import { Spacing } from '@components/common/Spacing';
import styled from 'styled-components';

export const Loading = () => {
  return (
    <Wrap>
      <ImageWrap>
        <LoadingBird />
      </ImageWrap>
      <Spacing height={20} />
      <FlexBox>
        <Text>책장을 넘기는 중</Text>
        <Dots />
      </FlexBox>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageWrap = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.basicDark};
  background-color: ${({ theme }) => theme.colors.basic};

  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlexBox = styled.div`
  position: relative;
  width: 200px;

  .absolute {
    position: absolute;
    bottom: 0;
    left: 180px;
    font-size: 24px;
    font-weight: 400;
    color: #747474;
    line-height: 24px;
    text-align: center;
  }
`;

const Text = styled.p`
  font-size: 24px;
  font-weight: 400;
  color: #747474;
  line-height: 24px;
  text-align: center;
`;
