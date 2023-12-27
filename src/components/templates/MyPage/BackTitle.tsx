import { IconArrLeftWhite } from '@/assets';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type TProps = {
  title: string;
};

export const BackTitle = ({ title }: TProps) => {
  const navigate = useNavigate();

  // 뒤로가기
  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <StyledTitle>
      <span onClick={goBack}>
        <IconArrLeftWhite />
      </span>
      <h2>{title}</h2>
    </StyledTitle>
  );
};

const StyledTitle = styled.div`
  position: relative;
  width: 100%;
  text-align: center;
  span {
    position: absolute;
    left: 22px;
    top: 0;
    cursor: pointer;
  }
  h2 {
    color: #fff;
    text-align: center;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.16px;
  }
`;
