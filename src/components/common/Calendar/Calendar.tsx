import { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const Calendar = () => {
  const [value, setValue] = useState<Value>(new Date());

  const onChange = (value: Value, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(value);
  };

  return (
    <div className="Calendar">
      <div className="Calendar__container">
        <main className="Calendar__container__content">
          <ReactCalendar onChange={onChange} value={value} />
        </main>
      </div>
    </div>
  );
};
