import { TPlan } from '@api/types';
import { Plan } from '@components/templates/HomeTemplate/Plan';
import { CSSProperties } from 'react';
import styled from 'styled-components';

type TProps = {
  data: {
    list: TPlan[];
    lastIndex: number;
    iconSize: number;
    maxSize: number;
  };
  index: number;
  style: CSSProperties;
};

export const WeekData = ({ data, index, style }: TProps) => {
  const plan = data.list[index];
  const isLast = data.lastIndex === index;

  return (
    <div style={{ ...style, textAlign: 'center' }}>
      <PlanWrap>
        <Plan {...plan} />
      </PlanWrap>
      {isLast && (
        <PageProgress>
          {data.iconSize}/{data.maxSize}
        </PageProgress>
      )}
    </div>
  );
};

const PlanWrap = styled.div`
  width: 100%;
  height: 110px;
`;

const PageProgress = styled.span`
  margin: 10px 0;
  display: inline-block;
  line-height: 25px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 400;
  color: white;
  background-color: ${({ theme }) => theme.colors.lightGray};
  border-radius: 15px;
`;
