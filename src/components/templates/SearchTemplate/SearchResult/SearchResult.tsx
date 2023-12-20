import { IconDayBird } from '@assets/icons';
import { Book } from '@components/templates/SearchTemplate/Book';
import { TFormValue } from '@components/templates/SearchTemplate/SearchTemplate';
import { useSearchOutletProps } from '@hooks/searchOutlet';
import { bookDummy } from '@mocks/index';
import { memo, useCallback, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

export const SearchResult = memo(() => {
  const checkboxes = useMemo(() => ['전체', '책 이름', '글쓴이', '출판사'], []);
  const { setValue } = useFormContext<TFormValue>();
  const { searchItem } = useSearchOutletProps();

  const handleClick = useCallback(
    (checkbox: string) => () => {
      setValue('searchItem', checkbox);
    },
    [setValue]
  );

  const listHeight = useMemo(() => {
    const scrollHeight = document.body.scrollHeight;
    const headerHeight = 90;
    const footerHeight = 70;
    const bodyHeight = 20 + 30 + 20;
    return scrollHeight - (headerHeight + footerHeight + bodyHeight);
  }, []);

  return (
    <Wrap>
      <CheckList>
        {checkboxes.map((checkbox) => (
          <li key={checkbox}>
            <Label htmlFor={`search_${checkbox}`} onClick={handleClick(checkbox)}>
              <input
                type="checkbox"
                id={`search_${checkbox}`}
                checked={checkbox === searchItem}
                readOnly
              />
              <IconWrap className="icon-wrap">
                <IconDayBird />
              </IconWrap>
              <span>{checkbox}</span>
            </Label>
          </li>
        ))}
      </CheckList>
      <FixedSizeList
        height={listHeight}
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
});

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 13px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const CheckList = styled.ul`
  flex: 0 0 30px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-evenly;

  li {
    height: 100%;
  }
`;

const Label = styled.label`
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 5px;

  input {
    display: none;
  }

  input[type='checkbox']:checked ~ .icon-wrap {
    &::after {
      content: '';
      position: absolute;
      top: calc(50% - 1px);
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      z-index: 2;

      width: 4px;
      height: 7px;
      border-width: 0 2px 2px 0;
      border-color: white;
      border-style: solid;
    }

    svg path {
      fill: ${({ theme }) => theme.colors.lightGray};
      stroke: ${({ theme }) => theme.colors.lightGray};
    }
  }

  span {
    font-size: 14px;
    font-weight: 400;
    color: black;
  }
`;

const IconWrap = styled.div`
  position: relative;
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;

  svg {
    width: 20px;
  }
`;
