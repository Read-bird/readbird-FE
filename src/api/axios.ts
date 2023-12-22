import axios, { AxiosRequestConfig, Method } from 'axios';

export const authFetch = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_PATH}`,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

type TAxiosFetch<T extends unknown> = {
  method: Method;
  url: string;
  options?: AxiosRequestConfig<T>;
  errorAction?: (e: any) => void;
};

// authFetch 일괄적으로 사용하기 위해 생성한 fetch 함수
// 제네릭 타입 T는 options에 있는 data의 타입을 말함
export const axiosFetch = async <T = any>({
  method,
  url,
  options,
  errorAction
}: TAxiosFetch<T>) => {
  try {
    return await authFetch({ url, method, ...options });
  } catch (e) {
    errorAction?.(e);
  }
};
