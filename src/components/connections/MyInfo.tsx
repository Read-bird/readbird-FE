import { setUserInfo } from '@/store/reducers';
import { axiosFetch } from '@api/axios';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// 유저 정보 호출
export const MyInfo = () => {
  const dispatch = useDispatch();

  const callMyInfo = useCallback(async () => {
    try {
      const response = await axiosFetch<any>({
        url: '/api/user/info',
        method: 'get'
      });

      if (response.status === 200) {
        dispatch(
          setUserInfo({
            id: response.data.userId,
            email: response.data.email,
            nickname: response.data.nickName,
            profile: response.data.imageUrl
          })
        );
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.message) });
      }
    }
  }, [dispatch]);

  useEffect(() => {
    callMyInfo();
  }, []);

  return null;
};
