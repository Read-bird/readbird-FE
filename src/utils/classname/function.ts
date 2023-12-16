import { EAchievementStatus } from '@api/types';

// className 조합 함수
type TClassArgs = (string | Record<string, boolean> | undefined)[];
export const cls = (...classNames: TClassArgs) => {
  let names: string[] = [];

  for (let data of classNames) {
    if (!data) {
      continue;
    }

    if (typeof data === 'string') {
      names.push(data);
      continue;
    }

    for (let key in data) {
      if (data[key]) {
        names.push(key);
      }
    }
  }

  return names.join(' ');
};

// 캘린더 색상 적용을 위한 classname 산출
export const getClassByStatus = (
  date: Date,
  status: EAchievementStatus | null,
  today = new Date()
) => {
  const recordDate = date;

  if (recordDate.getMonth() !== today.getMonth()) {
    return 'after-today';
  }

  if (recordDate.getDate() === today.getDate()) {
    return 'today';
  }

  if (status === null) {
    return 'before';
  }

  return status;
};
