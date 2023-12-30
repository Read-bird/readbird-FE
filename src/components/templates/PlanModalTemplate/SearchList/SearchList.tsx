import { TBookDetail } from '@api/types';
import { Images } from '@assets/images';
import { CSSProperties, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { FixedSizeList, areEqual } from 'react-window';
import styled from 'styled-components';

type TProps = {
  bookList: TBookDetail[];
  currentPage: number;
  totalPage: number;
  searchWord: string | null;
  handleNextPage: () => void;
  handleClose: () => void;
  handleClick: (book: TBookDetail) => void;
};

type TSearchItemProps = {
  data: TProps & { lastIndex: number };
  index: number;
  style: CSSProperties;
};

export const SearchList = (props: TProps) => {
  const { bookList, searchWord, handleClose } = props;

  const itemProps = useMemo(
    () => ({
      ...props,
      lastIndex: bookList.length - 1
    }),
    [props, bookList]
  );

  return (
    <ResultWrap>
      {!!bookList?.length ? (
        <FixedSizeList
          width="100%"
          height={270}
          itemCount={bookList.length}
          itemSize={90}
          itemData={itemProps}
        >
          {SearchItem}
        </FixedSizeList>
      ) : (
        <p className="empty-list">
          <span>"{searchWord}"에 대한 검색 결과가 없습니다.</span>
        </p>
      )}
      <span onClick={handleClose}>직접 입력하기</span>
    </ResultWrap>
  );
};

const SearchItem = memo(({ data, index, style }: TSearchItemProps) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const book = data.bookList[index];

  const handleClick = useCallback(
    (book: TBookDetail) => () => {
      data.handleClick(book);
      data.handleClose();
    },
    [data]
  );

  useEffect(() => {
    if (data.lastIndex === index) {
      const handleObserver = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (data.totalPage > data.currentPage) {
              data.handleNextPage();
            }
          }
        });
      };

      observer.current = new IntersectionObserver(handleObserver);

      const lastItem = document.querySelector('.last-item');
      if (lastItem) observer.current.observe(lastItem);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [data, index]);

  return (
    <ResultItem style={style} onClick={handleClick(book)}>
      <div className="img-wrap">
        <Images imgUrl={book.coverImage} imgAlt="cover-img" imgWidth={40} imgHeight={60} />
        <img src={book.coverImage} alt="cover-img" />
      </div>
      <div className="text-wrap">
        <h4>{book.title}</h4>
        <span>
          {book.author} / {book.publisher}
        </span>
        <span>총 {book.totalPage}쪽</span>
      </div>
      {data.lastIndex === index && <div className="last-item" />}
    </ResultItem>
  );
}, areEqual);

const ResultWrap = styled.div`
  border-radius: 10px;
  border: 1px solid #afb1b6;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 18.5%;
  transform: translateX(-50%);
  z-index: 5;
  box-shadow: 0 7px 10px #0000002e;
  width: 326px;

  & > span {
    display: block;
    cursor: pointer;
    border-top: 1px solid #afb1b6;
    color: #ababab;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.2px;
    padding: 15px 0;
    transition: 0.2s;
    &:hover {
      color: #000;
    }
  }

  .empty-list {
    padding: 15px 15px 0;
    span {
      display: block;
      padding-bottom: 15px;
    }
  }
`;

const ResultItem = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  &:hover {
    background-color: #e3ccf280;
  }
  .img-wrap {
    width: 40px;
    height: 60px;
    border-radius: 10px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
      border: 1px solid ${({ theme }) => theme.colors.darkGray};
    }
  }
  .text-wrap {
    margin-left: 6px;
    width: 80%;
    h4 {
      color: #000;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.08px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    span {
      color: #ababab;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: 0.08px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: block;
    }
  }
`;
