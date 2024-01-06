import { calculateDday } from '@utils/calendar';
import { isPastDate } from '@utils/function';
import { Fragment, memo, useEffect, useState } from 'react';
import styled from 'styled-components';

type TProps = {
  startDate: string;
  endDate: string;
  currentDate: string;
};

export const Dday = memo(({ endDate, startDate, currentDate }: TProps) => {
  const [dday, setDday] = useState<string | null>('');

  useEffect(() => {
    const dday = calculateDday(new Date(endDate), currentDate);
    // 종료일 < 오늘날짜
    if (isPastDate(endDate, new Date())) {
      setDday(null);
    }
    // 오늘날짜 < 시작일
    else if (isPastDate(new Date(), startDate)) {
      setDday(null);
    }
    // dday가 숫자면서 마이너스가 아닌 경우
    else if (typeof dday === 'number' && dday < 0) {
      setDday(null);
    }
    // 그외 모든 경우
    else {
      setDday(`D-${dday}`);
    }
  }, [endDate, startDate, currentDate]);

  return <Fragment>{dday && <DDayLabel>{dday}</DDayLabel>}</Fragment>;
});

const DDayLabel = styled.span`
  display: inline-block;
  min-width: 53px;
  height: 24px;
  line-height: 24px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.basicDark};
  font-size: 12px;
  text-align: center;
  color: white;
`;
