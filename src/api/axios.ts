import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

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
};

// authFetch 일괄적으로 사용하기 위해 생성한 fetch 함수
// 제네릭 타입 REQ_DATA는 options에 있는 data의 타입
// RES_DATA는 response data 타입
export const axiosFetch = async <REQ_DATA = any, RES_DATA = any>({
  method,
  url,
  options
}: TAxiosFetch<REQ_DATA>): Promise<AxiosResponse<RES_DATA>> => {
  try {
    const response = await authFetch({ url, method, ...options });
    return response;
  } catch (e) {
    throw e;
  }
};
