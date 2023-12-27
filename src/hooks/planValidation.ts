import { axiosFetch } from '@api/axios';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

export const usePlanValidation = () => {
  // 플랜 유효성 검사
  const planValidation = useCallback(async () => {
    try {
      const response = await axiosFetch<any, { planValidation: boolean }>({
        url: '/api/user/validation',
        method: 'get'
      });

      if (response.status === 200) {
        // planValidation === false => 플랜3개적용되어 더이상 만들면 안됨
        if (response.data.planValidation) {
          return true;
        } else {
          Alert.error({ title: '플랜은 최대 3개까지 등록 가능해요.' });
          return false;
        }
      } else {
        return false;
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.message) });
      }
      return false;
    }
  }, []);

  // 도서 등록 유효성 검사
  const checkReadBook = useCallback(async (bookId: number) => {
    try {
      const result = await axiosFetch({
        url: `/api/user/${bookId}`,
        method: 'get'
      });

      if (result.status === 200) {
        return result.data.readStatus;
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.messgae) });
      }
      return false;
    }
  }, []);

  return { planValidation, checkReadBook };
};
