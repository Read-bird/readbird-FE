import styled from 'styled-components';

export const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TodayText = styled.strong`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
`;

export const PlanVisualBox = styled.div`
  flex: 0 0 180px;
  width: 100%;
  max-width: 364px;
  border-radius: 20px;
  background-color: ${({ theme }) => `${theme.colors.basic}80`};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlanListBox = styled.ul`
  flex: 1;
  width: 100%;
  max-width: 364px;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 10px;

  li {
    flex: 0 0 95px;
    width: 100%;

    &.last {
      flex: 0 0 24px;
      width: 100%;

      display: flex;
      justify-content: center;
    }
  }
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
  bottom: 2px;
  right: 10px;
  width: auto;
  height: auto;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &:hover .path-fill {
    fill: ${({ theme }) => theme.colors.basicDark};
  }

  &:active .path-fill {
    fill: ${({ theme }) => theme.colors.basicDark};
  }

  &:active {
    transform: scale(1.1);
  }
`;

export const PageProgress = styled.span`
  display: inline-block;
  line-height: 24px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 400;
  color: white;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 15px;
`;
