import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const TodayText = styled.strong`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const PlanIconWrap = styled.div`
  width: 100%;
  flex: 0 0 180px;
  padding: 0 13px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlanVisualBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 364px;
  border-radius: 20px;
  background-color: ${({ theme }) => `${theme.colors.basic}80`};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyPlan = styled.p`
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  color: #747474;
`;

export const AddPlanWrap = styled.div`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: auto;
  height: auto;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
  transform: scale(0.7);

  &:active {
    transform: scale(0.9);
  }
`;

export const ListWrap = styled.div`
  width: 100%;
  padding: 0 13px;
`;
