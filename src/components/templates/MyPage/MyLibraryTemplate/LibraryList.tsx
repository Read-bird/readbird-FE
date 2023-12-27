import { TBook } from '@/store/reducers';
import { axiosFetch } from '@api/axios';
import { TSearchBooksResult } from '@api/types';
import { Spacing } from '@components/common/Spacing';
import { Book } from '@components/templates/SearchTemplate/Book';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

export const LibraryList = () => {
  const [bookList, setBookList] = useState<TBook[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const listHeight = useMemo(() => {
    const scrollHeight = document.body.scrollHeight;
    const headerHeight = 95;
    const footerHeight = 70;
    const bodyHeight = 30;
    return scrollHeight - (headerHeight + footerHeight + bodyHeight);
  }, []);

  const getPlanList = async (page?: number) => {
    try {
      const res = await axiosFetch<any, TSearchBooksResult>({
        url: '/api/user/plan/success',
        method: 'get'
      });

      if (res.status === 200) {
        setBookList((prev) => (page === 1 ? res.data.bookList : prev.concat(res.data.bookList)));
        setPage(res.data.page);
        setTotalPage(res.data.totalPage);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        Alert.error({ title: convertError(err.response?.data.message) });
      }
    }
  };

  const getNextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, [setPage]);

  const itemData = useMemo(
    () => ({
      list: bookList,
      totalPage: totalPage,
      lastIndex: bookList.length - 1,
      currentPage: page,
      getNextPage: getNextPage,
      disabled: true
    }),
    [bookList, totalPage, page, getNextPage]
  );

  useEffect(() => {
    getPlanList(page);
  }, [page]);

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
