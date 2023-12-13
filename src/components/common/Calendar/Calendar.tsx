import { EAchievementStatus, TPlanRecord } from '@api/types';
import { DayBird } from '@components/common/DayBird';
import { cls, getClassByStatus } from '@utils/classname';
import dayjs from 'dayjs';
import { MouseEvent, useCallback, useState } from 'react';
import ReactCalendar, { TileContentFunc, TileDisabledFunc } from 'react-calendar';
import '../../../styles/calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

type TProps = {
  record: TPlanRecord[];
};

export const Calendar = ({ record }: TProps) => {
  const [value, setValue] = useState<Value>(new Date());

  const onChange = (value: Value, event: MouseEvent<HTMLButtonElement>) => {
    console.log(value);
  };

  const tileContent: TileContentFunc = useCallback(
    ({ date }) => {
      const className = getClassByStatus(date, EAchievementStatus.success);

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
    [record]
  );

  const tileDisabled: TileDisabledFunc = useCallback(
    ({ date }) => getClassByStatus(date, null) === 'after-today',
    []
  );

  return (
    <ReactCalendar
      value={value}
      onClickDay={onChange}
      calendarType="gregory"
      formatDay={(_, date) => dayjs(date).format('D')}
      goToRangeStartOnSelect={false}
      maxDate={new Date(dayjs().add(1, 'year').format('YYYY-MM-DD'))}
      showNavigation={false}
      tileContent={tileContent}
      tileDisabled={tileDisabled}
    />
  );
};
