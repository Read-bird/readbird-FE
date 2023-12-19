import { Spacing } from '@components/common/Spacing';
import { Book } from '@components/templates/SearchTemplate/Book';
import { bookDummy } from '@mocks/index';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

export const SearchMain = () => {
  return (
    <Wrap>
      <BannerWrap></BannerWrap>
      <Spacing height={18} />
      <Title>지금 가장 인기 있는 책 TOP 10</Title>
      <Spacing height={18} />
      <FixedSizeList
        height={479}
        itemSize={142}
        width="100%"
        itemCount={bookDummy.books.bookList.length}
        itemData={{
          list: bookDummy.books.bookList,
          totalPage: bookDummy.books.totalPage
        }}
      >
        {Book}
      </FixedSizeList>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 13px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: ${({ theme }) => theme.colors.basicDark};
  align-self: flex-start;
`;
