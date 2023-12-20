import { ErrorBird } from '@assets/images';
import { Spacing } from '@components/common/Spacing';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const NotFoundTemplate = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <Wrap>
      <Title>404 ERROR</Title>
      <Spacing height={20} />
      <ImageWrap>
        <ErrorBird />
      </ImageWrap>
      <Spacing height={20} />
      <SubTitle>페이지를 못 찾겠어요!</SubTitle>
      <Spacing height={15} />
      <Text>{`페이지가 존재하지 않거나\n잘못된 경로로 들어왔나 봐요...\n일단은 다시 돌아갈까요?`}</Text>
      <Spacing height={60} />
      <Button className="active" onClick={handleClick}>
        이전 페이지로 돌아가기
      </Button>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: black;
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

const SubTitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  color: black;
`;

const Text = styled.p`
  white-space: pre-wrap;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  color: #747474;
  line-height: 24px;
`;

const Button = styled.button`
  width: 313px;
  height: 48px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.basicDark};
  line-height: 48px;
  text-align: center;
  cursor: pointer;

  font-size: 16px;
  font-weight: 700;
  color: white;
`;
