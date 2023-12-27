import { TRootState } from '@/store/state';
import { lastDayMonth } from '@utils/calendar';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

type TProps = {
  handleClose: () => void;
};

export const ReadLessModal = ({ handleClose }: TProps) => {
  const { previouslyFailedPlan } = useSelector((state: TRootState) => state.planStore);

  // 날짜 리스트 생성
  const options = (...args: number[]) => {
    const array: string[] = [];
    const start = args[0];
    const size = args[1];

    for (let i = start; i <= size; i++) {
      array.push(`${i}`);
    }

    return array;
  };

  // 날짜 리스트 생성
  const generateDate = useCallback((type: 'Y' | 'M' | 'D', date: string) => {
    const compDate = new Date(date);
    const nowDate = new Date();

    const month = compDate.getMonth() + 1;
    if (type === 'Y') {
      return [nowDate.getFullYear(), nowDate.getFullYear() + 10];
    }

    if (type === 'M') {
      return [1, 12];
    }

    const lastMonth = lastDayMonth(compDate)[month];

    return [1, lastMonth];
  }, []);

  // 날짜 수정
  const handleChangeDate = (type: 'Y' | 'M' | 'D', isStart: boolean) => (value: string) => {
    const name: 'startDate' | 'endDate' = isStart ? 'startDate' : 'endDate';
    // const prev = getValues();
    const date = new Date();

    if (type === 'Y') {
      date.setFullYear(Number(value));
    } else if (type === 'M') {
      date.setMonth(Number(value) - 1);
    } else {
      date.setDate(Number(value));
    }

    // setValue(name, dayjs(date).format('YYYY-MM-DD'));
  };

  return (
    <Wrap>
      <h2>이런, 플랜 달성에 실패했어요</h2>
      <div className="book-info"></div>
      <h3>목표 기간을 연장하고 끝까지 읽어볼까요?</h3>
      {/* <div className="cont select">
          <SelectLabel
            id={'startDate-y'}
            options={options(...generateDate('Y'))}
            handleChangeDate={handleChangeDate('Y', true)}
            value={dayjs(startDate).format('YYYY')}
          />
          <span>년</span>
          <SelectLabel
            id={'startDate-m'}
            options={options(...generateDate('M', startDate))}
            handleChangeDate={handleChangeDate('M', true)}
            value={dayjs(startDate).format('M')}
          />
          <span>월</span>
          <SelectLabel
            id={'startDate-d'}
            options={options(...generateDate('D', startDate))}
            handleChangeDate={handleChangeDate('D', true)}
            value={dayjs(startDate).format('D')}
          />
          <span>일 까지</span>
        </div> */}
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 430px;

  .book-info {
    width: 315px;
    height: 154px;
    border-radius: 8px;
    border: 1px solid #747474;
  }
`;
