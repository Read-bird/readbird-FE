import { Alert } from '@utils/Alert';
import dayjs from 'dayjs';
import { useEffect } from 'react';

export const CheckDay = () => {
  useEffect(() => {
    const storedToday = localStorage.getItem('today');
    const today = dayjs().format('YYYY-MM-DD');
    if (storedToday !== today) {
      Alert.basic({
        title: '이런, 하루가 지나버렸어요',
        text: '* 새로고침 후 오늘의 플랜을 확인해 주세요.',
        action: () => {
          localStorage.setItem('today', today);
        }
      });
    }
  }, []);

  return null;
};
