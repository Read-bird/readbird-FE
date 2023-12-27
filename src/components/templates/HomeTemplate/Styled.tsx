import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.basic};

  display: flex;
  flex-direction: column;
`;

export const Head = styled.section`
  position: relative;
  width: 100%;
  flex: 0 0 95px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const Body = styled.section`
  position: relative;
  flex: 1;
  width: 100%;
  height: calc(100vh - 165px);
  border-radius: 50px 50px 0 0%;
  background-color: ${({ theme }) => theme.colors.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TodayText = styled.strong`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  user-select: none;
`;

export const CalendarWrap = styled.div`
  position: absolute;
  bottom: 8px;
  right: 20px;
  width: auto;
  height: auto;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &:active {
    transform: scale(1.1);
  }
`;

export const FlexBox = styled.div<{ $view: boolean }>`
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;

  .arrow {
    display: ${({ $view }) => ($view ? 'block' : 'none')};
  }
`;
