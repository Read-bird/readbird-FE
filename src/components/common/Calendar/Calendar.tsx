import { TPlanRecord } from '@api/types';
import { DayBird } from '@components/common/DayBird';
import { cls, getClassByStatus } from '@utils/classname';
import { convertObject } from '@utils/function';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import ReactCalendar, { TileContentFunc, TileDisabledFunc } from 'react-calendar';
import '../../../styles/calendar.css';

type TProps = {
  currentDate: Date;
  record: TPlanRecord[];
  changeCurrentDate: (date: string) => void;
};

export const Calendar = ({ record, currentDate, changeCurrentDate }: TProps) => {
  const planDateRecord = useMemo(() => convertObject(record, 'date'), [record]);
  const onChange = (value: Date) => {
    changeCurrentDate(dayjs(value).format());
  };

  const tileContent: TileContentFunc = useCallback(
    ({ date }) => {
      const formatDate = dayjs(date).format('YYYY-MM-DD');

      const data = planDateRecord[formatDate];
      const className = getClassByStatus(date, data?.achievementStatus ?? null, currentDate);

      return (
        <DayBird
          key={`${date}`}
          className={cls(className)}
          cursor={className === 'after-today' ? 'default' : 'pointer'}
        >
          <p className={cls(className)}>{dayjs(date).format('DD')}</p>
        </DayBird>
      );
    },
    [planDateRecord, currentDate]
  );

  const tileDisabled: TileDisabledFunc = useCallback(
    ({ date }) => getClassByStatus(date, null, currentDate) === 'after-today',
    [currentDate]
  );

  return (
    <ReactCalendar
      value={currentDate}
      onClickDay={onChange}
      calendarType="gregory"
      formatDay={(_, date) => dayjs(date).format('D')}
      goToRangeStartOnSelect={false}
      maxDate={new Date(dayjs().add(1, 'year').format('YYYY-MM-DD'))}
      showNavigation={false}
      tileContent={tileContent}
      tileDisabled={tileDisabled}
      activeStartDate={currentDate}
    />
  );
};
