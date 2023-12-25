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
// 제네릭 타입 T는 options에 있는 data의 타입을 말함
// 해당 함수에서 바로 에러를 리턴하고 함수를 호출하는 곳에서 에러핸들링을 하는 것이 좋을 것으로 판단..
export const axiosFetch = async <REQ_DATA = any, RES_DATA = any>({
  method,
  url,
  options
}: TAxiosFetch<REQ_DATA>): Promise<AxiosResponse<RES_DATA>> => {
  const response = await authFetch({ url, method, ...options });
  return response;
};
