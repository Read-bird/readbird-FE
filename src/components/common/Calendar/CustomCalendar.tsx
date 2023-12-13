import { TPlanRecord } from '@api/types';
import { DayBird } from '@components/common/DayBird';
import { cls, getClassByStatus } from '@utils/classname';
import dayjs from 'dayjs';
import styled from 'styled-components';

type TProps = {
  record: TPlanRecord[];
};

const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

export const CustomCalendar = ({ record }: TProps) => {
  return (
    <Wrap>
      <FlexBox>
        {dayOfWeek.map((day) => (
          <DayOfWeekWrap key={`${day}`}>
            <p>{day}</p>
          </DayOfWeekWrap>
        ))}
      </FlexBox>
      <FlexBox>
        {record.map((weekRecord) => {
          const date = new Date(weekRecord.createdAt);
          const className = getClassByStatus(date, weekRecord.status);

          return (
            <DayBird key={`${weekRecord.createdAt}`} className={cls(className)}>
              <Text className={cls(className)}>{dayjs(weekRecord.createdAt).format('DD')}</Text>
            </DayBird>
          );
        })}
      </FlexBox>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  padding: 20px 30px 0;
  border-radius: 5px;
  background: transparent;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const DayOfWeekWrap = styled.div`
  flex: 1;
  min-width: 30px;
  min-height: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  p {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;

const Text = styled.p`
  font-size: 14px;
  font-weight: 400;
`;
