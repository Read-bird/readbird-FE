import { authFetch } from '@api/axios';
import { EAchievementStatus, TPlanData } from '@api/types';
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

// 플랜 삭제하기
export const deletePlan = async (planId: number, userId: number): Promise<TResponse<string>> => {
  try {
    const result = await authFetch.delete(`/api/plan/${planId}`, { data: { userId } });

    return { error: false, success: true, data: result.data };
  } catch (e: any) {
    if (e instanceof AxiosError) {
      return { error: true, success: false, data: e.response?.data.message ?? '' };
    }

    return { error: true, success: false, data: '' };
  }
};

// 플랜 달성 등록
export const completedPlan = async (
  planId: number,
  status: EAchievementStatus,
  currentPage: number
): Promise<TResponse<any>> => {
  try {
    const result = await authFetch.put(`/api/record/${planId}`, {
      data: {
        status,
        currentPage
      }
    });
    return { error: false, success: true, data: result.data };
  } catch (e: any) {
    throw e;
  }
};
