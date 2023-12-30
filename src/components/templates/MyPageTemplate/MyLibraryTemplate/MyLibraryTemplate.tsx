import { axiosFetch } from '@api/axios';
import { TSearchBooksResult } from '@api/types';
import { Spacing } from '@components/common/Spacing';
import { Book } from '@components/templates/MyPageTemplate/MyLibraryTemplate/Book';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

export type TResponseData = Omit<TSearchBooksResult, 'bookList'> & { bookList: TResponseLibrary[] };

export type TResponseLibrary = {
  planId: number;
  startDate: string;
  endDate: string;
  bookId: number;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  isbn: string;
  publisher: string;
};

export const MyLibraryTemplate = () => {
  const [bookList, setBookList] = useState<TResponseLibrary[]>([]);
  const page = useRef(1);
  const [totalPage, setTotalPage] = useState(1);

  const listHeight = useMemo(() => {
    const doc = document.querySelector('#root') as HTMLElement;
    const scrollHeight = doc.scrollHeight;
    const headerHeight = 95;
    const footerHeight = 70;
    const bodyHeight = 30;
    return scrollHeight - (headerHeight + footerHeight + bodyHeight);
  }, []);

  const getPlanList = async (page?: number) => {
    try {
      const res = await axiosFetch<any, TResponseData>({
        url: '/api/user/plan/success',
        method: 'get'
      });

      if (res.status === 200) {
        setBookList((prev) => (page === 1 ? res.data.bookList : prev.concat(res.data.bookList)));
        setTotalPage(res.data.totalPage);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        Alert.error({ title: convertError(err.response?.data.message) });
      }
    }
  };

  const getNextPage = useCallback(() => {
    getPlanList(page.current + 1);
    page.current += 1;
  }, []);

  const itemData = useMemo(
    () => ({
      list: bookList,
      totalPage: totalPage,
      lastIndex: bookList.length - 1,
      currentPage: page.current,
      getNextPage: getNextPage,
      disabled: true
    }),
    [bookList, totalPage, page, getNextPage]
  );

  useEffect(() => {
    getPlanList();
  }, []);

  return (
    <Wrap>
      <Spacing height={30} />
      {!!bookList.length ? (
        <FixedSizeList
          height={listHeight}
          itemSize={142}
          width="100%"
          itemCount={bookList.length}
          itemData={itemData}
        >
          {Book}
        </FixedSizeList>
      ) : (
        <Empty>아직 읽은 책이 없어요.</Empty>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: calc(100vh - 165px);
  padding: 0 13px;
`;

const Empty = styled.p`
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  color: #747474;
`;
