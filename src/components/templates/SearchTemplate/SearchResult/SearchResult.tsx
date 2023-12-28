import { initBookList } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { IconDayBird } from '@assets/icons';
import { Book } from '@components/templates/SearchTemplate/Book';
import { TFormValue } from '@components/templates/SearchTemplate/SearchTemplate';
import { useGetSearchList } from '@components/templates/SearchTemplate/hooks';
import { Alert } from '@utils/Alert';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

const CheckBoxType = {
  전체: 'all' as const,
  '책 이름': 'title' as const,
  글쓴이: 'author' as const,
  출판사: 'publisher' as const
};

export const SearchResult = memo(() => {
  const checkboxes = useMemo(() => ['전체', '책 이름', '글쓴이', '출판사'], []);
  const dispatch = useDispatch();
  const { bookList, totalPage } = useSelector((state: TRootState) => state.bookSearchStore);
  const { searchList } = useGetSearchList();
  const { watch, setValue, getValues, reset } = useFormContext<TFormValue>();
  const searchType = watch('searchType');
  const currentPage = watch('page');

  const handleClick = useCallback(
    (checkbox: string) => async () => {
      const props = getValues();

      if (!props.searchText) {
        Alert.warning({ title: '검색어를 입력해주세요.' });
        return;
      }

      // 타입 변경
      setValue('searchType', CheckBoxType[checkbox as keyof typeof CheckBoxType]);
      setValue('page', 1);

      await searchList({ ...props });
    },
    [setValue, searchList, getValues]
  );

  const listHeight = useMemo(() => {
    const scrollHeight = document.body.scrollHeight;
    const headerHeight = 95;
    const footerHeight = 70;
    const bodyHeight = 20 + 30 + 20;
    return scrollHeight - (headerHeight + footerHeight + bodyHeight);
  }, []);

  const getNextPage = useCallback(async () => {
    const values = getValues();
    const result = await searchList(values);

    if (result) {
      setValue('page', values.page + 1);
    }
  }, [getValues, setValue, searchList]);

  const itemData = useMemo(
    () => ({
      list: bookList,
      totalPage: totalPage,
      lastIndex: bookList.length - 1,
      currentPage: currentPage,
      getNextPage: getNextPage
    }),
    [bookList, totalPage, currentPage, getNextPage]
  );

  useEffect(() => {
    return () => {
      dispatch(initBookList());
      reset();
    };
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
                checked={CheckBoxType[checkbox as keyof typeof CheckBoxType] === searchType}
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
        <Empty>검색된 도서가 없어요</Empty>
      )}
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

const Empty = styled.p`
  width: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
  color: #747474;
`;
