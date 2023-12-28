import { axiosFetch } from '@api/axios';
import { TBookDetail } from '@api/types';
import { Spacing } from '@components/common/Spacing';
import { Book } from '@components/templates/SearchTemplate/Book';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

export const SearchMain = () => {
  const [topBookList, setTopBookList] = useState<TBookDetail[]>([]);
  const listHeight = useMemo(() => {
    const scrollHeight = document.body.scrollHeight;
    const headerHeight = 95;
    const footerHeight = 70;
    const bodyHeight = 20 + 66 + 18 + 23 + 18;
    return scrollHeight - (headerHeight + footerHeight + bodyHeight);
  }, []);

  const itemData = useMemo(
    () => ({
      list: topBookList,
      totalPage: 1,
      lastIndex: topBookList.length - 1,
      currentPage: 1
    }),
    [topBookList]
  );

  // 인기 있는 책 호출
  const getTopBooks = async () => {
    try {
      const response = await axiosFetch<any, { bList: TBookDetail[] }>({
        url: '/api/aladin/popular',
        method: 'get'
      });

      if (response.status === 200) {
        setTopBookList(response.data.bList);
      } else {
        Alert.error({ title: '데이터를 불러오지 못했습니다.' });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.message) });
      }
    }
  };

  // 인기 있는 책 호출
  useEffect(() => {
    getTopBooks();
  }, []);

  return (
    <Wrap>
      <Spacing height={20} />
      <BannerWrap></BannerWrap>
      <Spacing height={18} />
      <Title>지금 가장 인기 있는 책 TOP 10</Title>
      <Spacing height={18} />
      <FixedSizeList
        itemSize={142}
        width="100%"
        height={listHeight}
        itemCount={topBookList.length}
        itemData={itemData}
      >
        {Book}
      </FixedSizeList>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 13px;
  display: flex;
  flex-direction: column;
  align-items: center;

  div::-webkit-scrollbar {
    display: none;
  }
`;

const BannerWrap = styled.section`
  width: 100%;
  height: 66px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.lightGray};
`;

const Title = styled.h1`
  font-size: 22px;
  font-weight: 700;
  line-height: 23px;
  color: ${({ theme }) => theme.colors.basicDark};
  align-self: flex-start;
`;
