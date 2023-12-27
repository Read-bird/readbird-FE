import { TBookData, addBookList, setBookList, setTotalPage } from '@/store/reducers';
import { TAppDispatch } from '@/store/state';
import { axiosFetch } from '@api/axios';
import { TFormValue } from '@components/templates/SearchTemplate/SearchTemplate';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useGetSearchList = () => {
  const dispatch = useDispatch<TAppDispatch>();

  const searchList = useCallback(
    async ({ searchType, searchText, page, scale }: TFormValue) => {
      try {
        const result = await axiosFetch<any, TBookData>({
          method: 'get',
          url: `/api/book?${
            searchType !== 'all' ? `type=${searchType}&` : ''
          }value="${searchText}"&page=${page}&scale=${scale}`
        });

        const call = page === 1 ? setBookList : addBookList;
        dispatch(call(result.data.bookList));
        dispatch(setTotalPage(result.data.totalPage));
        return true;
      } catch (e) {
        if (e instanceof AxiosError) {
          Alert.error({ title: convertError(e.response?.data.messgae) });
        }
        return false;
      }
    },
    [dispatch]
  );

  return { searchList };
};
