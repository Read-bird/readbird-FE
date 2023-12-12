import { Calendar } from '@components/common/Calendar';
import { Spacing } from '@components/common/Spacing';
import { Fragment } from 'react';

export const MonthTemplate = () => {
  return (
    <Fragment>
      <Calendar />
      <Spacing height={20} />
      캘린더 디자인 수정 예정
    </Fragment>
  );
};
