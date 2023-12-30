import dayjs from 'dayjs';

// 윤달 계산
export const isLeapMonth = (year: number) => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// 월별 마지막 일자
export const lastDayMonth = (day: Date): Record<number, number> => ({
  1: 31,
  2: isLeapMonth(day.getFullYear()) ? 29 : 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31
});

// 특정 날짜까지의 디데이 계산 함수
export const calculateDday = (targetDate: Date) => {
  // 현재 날짜 구하기
  const currentDate = new Date(dayjs().format('YYYY-MM-DD'));

  // 목표 날짜를 포함한 밀리초 단위의 타임스탬프 계산
  const targetTimestamp = targetDate.getTime();

  // 현재 날짜를 포함한 밀리초 단위의 타임스탬프 계산
  const currentTimestamp = currentDate.getTime();

  // 디데이 계산
  const timeDiff = targetTimestamp - currentTimestamp;
  const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff ? daysDiff : 'DAY';
};

// 주간 날짜 불러오기
export const makeWeekArr = (date: Date) => {
  let day = date.getDay();
  let week = [];
  for (let i = 0; i < 7; i++) {
    let newDate = new Date(date.valueOf() + 86400000 * (i - day));
    week.push(newDate);
  }
  return week;
};
