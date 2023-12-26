import { authFetch } from '@api/axios';
import { TPlanData } from '@api/types';
import { AxiosError } from 'axios';

type TResponse<T> = { error: boolean; success: boolean; data: T };

// 플랜 조회하기
export const getPlanList = async (date: string): Promise<TResponse<TPlanData | string>> => {
  try {
    const result = await authFetch.get('/api/plan', { params: { date } });

    return { error: false, success: true, data: result?.data };
  } catch (e) {
    if (e instanceof AxiosError) {
      return { error: true, success: false, data: e.response?.data.message ?? '' };
    }

    return { error: true, success: false, data: '' };
  }
};
