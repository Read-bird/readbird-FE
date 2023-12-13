import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 30px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Section = styled.section`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

export const GuideLabel = styled.span`
  display: inline-block;
  width: 100%;
  height: 32px;
  line-height: 32px;
  border-radius: 8px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.lightGray};

  font-size: 14px;
  font-weight: 400;
  color: white;
`;

export const DefinitionList = styled.dl`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;

  margin-bottom: 2px;

  dt {
    display: flex;
    align-items: center;
  }
`;

export const GuideText = styled.dd`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const SubTitle = styled.h1`
  font-size: 24;
  font-weight: 700;
  color: #000000;
`;

export const FlexBox = styled.div<{ $justify?: 'space-between' }>`
  display: flex;
  justify-content: ${({ $justify }) => $justify};
  align-items: center;

  span {
    font-size: 16px;
    font-weight: 500;
    color: #747474;
  }

  strong {
    font-size: 24;
    font-weight: 700;
    color: #000000;
  }
`;
