import { calculateDday } from '@utils/calendar';
import { Fragment, memo, useEffect, useState } from 'react';
import styled from 'styled-components';

type TProps = {
  endDate: string;
};

export const Dday = memo(({ endDate }: TProps) => {
  const [dday, setDday] = useState<string | null>('');

  useEffect(() => {
    const dday = calculateDday(new Date(endDate));
    if (typeof dday === 'number' && dday < 0) {
      setDday(null);
    } else {
      setDday(`${dday}`);
    }
  }, [endDate]);

  return <Fragment>{dday && <DDayLabel>D-{calculateDday(new Date(endDate))}</DDayLabel>}</Fragment>;
});

const DDayLabel = styled.span`
  display: inline-block;
  width: 53px;
  height: 24px;
  line-height: 24px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.basicDark};
  font-size: 12px;
  text-align: center;
  color: white;
`;
