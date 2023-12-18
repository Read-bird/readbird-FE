import { EAchievementStatus, ERecordStatus, TPlanRecord } from '@api/types';
import { lastDayMonth } from '@utils/calendar';

// 주간 캘린더
export const weekCalendar: TPlanRecord[] = [
  {
    date: '2023-12-10',
    achievementStatus: EAchievementStatus.success
  },
  {
    date: '2023-12-11',
    achievementStatus: EAchievementStatus.failed
  },
  {
    date: '2023-12-12',
    achievementStatus: EAchievementStatus.unstable
  },
  {
    date: '2023-12-13',
    achievementStatus: null
  },
  {
    date: '2023-12-14',
    achievementStatus: null
  },
  {
    date: '2023-12-15',
    achievementStatus: null
  },
  {
    date: '2023-12-16',
    achievementStatus: null
  }
];

export const monthCalendar = (currDate: Date): TPlanRecord[] => {
  let calendar: TPlanRecord[] = [];
  const lastDay = lastDayMonth(currDate)[currDate.getMonth() + 1];

  const status: string[] = ['before'];
  for (let key in EAchievementStatus) {
    status.push(key);
  }

  const yearMonth = `${currDate.getFullYear()}-${currDate.getMonth() + 1}`;
  for (let i = 1; i <= lastDay; i++) {
    const random = Math.floor(Math.random() * status.length + 1);
    const data = status[random] ?? null;

    calendar.push({
      date: `${yearMonth}-${i}`,
      achievementStatus: data as EAchievementStatus | null
    });
  }

  return calendar;
};

export const plan = [
  {
    planId: 1,
    title: '나의 라임 오렌지 나무',
    author: 'author',
    coverImage: 'url',
    totalPage: 100,
    currentPage: 80,
    target: 30,
    endDate: '2023-12-21',
    planStatus: ERecordStatus.inProgress,
    recordStatus: ERecordStatus.inProgress
  },
  {
    planId: 2,
    title: '다빈치코드',
    author: 'author',
    coverImage: 'url',
    totalPage: 100,
    currentPage: 30,
    target: 10,
    endDate: '2023-12-15',
    planStatus: ERecordStatus.inProgress,
    recordStatus: ERecordStatus.inProgress
  }
  // {
  //   planId: 3,
  //   title: '천사와 악마',
  //   author: 'author',
  //   coverImage: 'url',
  //   totalPage: 100,
  //   currentPage: 1,
  //   target: 30,
  //   endDate: '2023-12-30',
  //   planStatus: ERecordStatus.inProgress,
  //   recordStatus: ERecordStatus.inProgress
  // }
];
