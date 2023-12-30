import { Images } from '@assets/images';
import { Spacing } from '@components/common/Spacing';
import { TResponseLibrary } from '@components/templates/MyPageTemplate/MyLibraryTemplate/MyLibraryTemplate';
import dayjs from 'dayjs';
import { memo, useEffect, useRef } from 'react';
import { areEqual } from 'react-window';
import styled, { CSSObject, CSSProperties } from 'styled-components';

type TProps = {
  data: {
    list: TResponseLibrary[];
    totalPage: number;
    lastIndex: number;
    currentPage: number;
    getNextPage?: () => void;
  };
  index: number;
  style: CSSProperties;
};

export const Book = memo(({ data, index, style }: TProps) => {
  const props = data.list[index];
  const { coverImage, title, author, publisher } = props;
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (data.lastIndex === index) {
      const handleObserver = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (data.totalPage > data.currentPage) {
              data.getNextPage?.();
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
    <div style={style}>
      <ListItem>
        <Images
          imgUrl={coverImage}
          imgAlt={title + '책 표지'}
          imgWidth={70}
          imgHeight={104}
          imgStyle={imgStyle}
        />
        <Inner>
          <div className="book-info">
            <BookTitle>{title}</BookTitle>
            <Spacing height={5} />
            <TextSpan>{author}</TextSpan>
            <Spacing height={5} />
            <TextSpan>{publisher}</TextSpan>
          </div>
          <TextSpan className="dark">{dayjs(props.endDate).format('YYYY / MM / DD 완독')}</TextSpan>
        </Inner>
      </ListItem>
      {data.lastIndex === index && <div className="last-item" />}
    </div>
  );
}, areEqual);

const imgStyle: CSSObject = {
  borderRadius: '10px',
  border: '1px solid #ababab'
};

const ListItem = styled.div`
  cursor: default;

  width: 100%;
  height: 122px;
  border-radius: 20px;
  background-color: ${({ theme }) => `${theme.colors.basic}80`};
  padding: 9px 12px;

  display: flex;
  align-items: center;
  gap: 7px;

  img {
    flex: 0 0 70px;
  }
`;

const Inner = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 95px;

  .book-info {
    width: 100%;
  }
`;

const BookTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: black;

  display: -webkit-box;
  overflow: hidden;
  word-break: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const TextSpan = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};

  &.dark {
    color: #747474;
  }
`;
