import { Spacing } from '@components/common/Spacing';
import styled from 'styled-components';

export const ErrorLayout = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <Wrap>
      <strong>문제가 발생했어요!</strong>
      <Spacing height={15} />
      <p>데이터를 불러오는데에 실패했어요.</p>
      <p>다시 시도해주세요!</p>
      <Spacing height={20} />
      <button type="button" className="active" onClick={handleRetry}>
        다시 시도하기
      </button>
    </Wrap>
  );
};

const Wrap = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  strong {
    font-size: 16px;
    font-weight: 700;
    color: black;
  }

  p {
    line-height: 20px;
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.darkGray};
  }

  button {
    width: 248px;
    height: 48px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.basicDark};
    line-height: 48px;
    text-align: center;
    cursor: pointer;

    font-size: 16px;
    font-weight: 700;
    color: white;
  }
`;
