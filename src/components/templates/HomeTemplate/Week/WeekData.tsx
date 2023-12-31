import { TPlan } from '@api/types';
import { Plan } from '@components/templates/HomeTemplate/Plan';
import { CSSProperties } from 'react';
import styled from 'styled-components';

type TProps = {
  data: TPlan[];
  index: number;
  style: CSSProperties;
};

export const WeekData = ({ data, index, style }: TProps) => {
  const plan = data[index];

  return (
    <div style={{ ...style, textAlign: 'center' }}>
      <PlanWrap>
        <Plan {...plan} />
      </PlanWrap>
    </div>
  );
};

const PlanWrap = styled.div`
  width: 100%;
  height: 110px;
`;
