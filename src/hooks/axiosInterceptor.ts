import { setAccessToken, setLoading } from '@/store/reducers';
import { TAppDispatch } from '@/store/state';
import { authFetch } from '@api/axios';
import { Alert } from '@utils/Alert';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useAxiosInterceptor = () => {
  const dispatch = useDispatch<TAppDispatch>();

  useEffect(() => {
    authFetch.interceptors.request.use(
      (config) => {
        dispatch(setLoading(true));
        config.headers.Authorization = `${localStorage.getItem('rb-access-token')}`;
        config.headers.RefreshToken = `${localStorage.getItem('rb-refresh-token')}`;
        return config;
      },
      (error) => {
        dispatch(setLoading(false));
        return Promise.reject(error);
      }
    );

    authFetch.interceptors.response.use(
      (response) => {
        dispatch(setLoading(false));
        return response;
      },
      async (error) => {
        dispatch(setLoading(false));

        if (error.response === undefined) {
          Alert.error({
            title: '서버와의 연결이 원활하지 않습니다.',
            action: () => {
              dispatch(setAccessToken(''));
              localStorage.clear();
              window.location.replace('/login');
            }
          });
          return;
        }

        const config = error.config;
        const status = error.response.status;
        const message = error.response.data;

        // 토큰이 만료되을 때
        if (status === 412) {
          if (message.includes('토큰 갱신')) {
            const response = await authFetch.post('/api/user/token', {
              RefreshToken: localStorage.getItem('rb-refresh-token')
            });
            // 리프레시 토큰 요청이 성공할 때
            if (response.status === 200) {
              const authorization = response.headers?.authorization;
              localStorage.setItem('rb-access-token', authorization);
              axios.defaults.headers.common.Authorization = `Bearer ${authorization}`;
              // 진행중이던 요청 이어서하기
              const originRequest = config;
              originRequest.headers.Authorization = `Bearer ${authorization}`;
              return axios(originRequest);
            }
          }
          // 토큰과 리프레시 토큰이 모두 만료되어 로그인이 필요할 떄
          else if (message.includes('로그인')) {
            Alert.error({
              title: '로그인이 필요합니다.',
              action: () => {
                dispatch(setAccessToken(''));
                localStorage.clear();
                window.location.replace('/login');
              }
            });
          }
        }
        // 유저 토큰이 유효하지 않을 떄
        else if (status === 401) {
          Alert.error({
            title: '유저정보가 올바르지 않습니다.',
            action: () => {
              dispatch(setAccessToken(''));
              localStorage.clear();
              window.location.replace('/login');
            }
          });
        }

        return Promise.reject(error);
      }
    );
  }, []);
};
