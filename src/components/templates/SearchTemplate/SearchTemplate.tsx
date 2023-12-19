import { setBookDetail } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { Spacing } from '@components/common/Spacing';
import { SearchDetail } from '@components/templates/SearchTemplate/SearchDetail';
import { SearchInput } from '@components/templates/SearchTemplate/SearchInput';
import { Alert } from '@utils/Alert';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { Body, Head, Wrap } from './Styled';

export type TFormValue = {
  searchText: string | null;
  searchItem: string;
};

export const SearchTemplate = () => {
  const bookDetail = useSelector((state: TRootState) => state.bookDetailStore);
  const dispatch = useDispatch();
  const methods = useForm<TFormValue>({
    defaultValues: {
      searchText: null,
      searchItem: '전체'
    }
  });
  const navigate = useNavigate();
  const searchText = methods.watch('searchText');
  const searchItem = methods.watch('searchItem');

  const handleClickSearch = ({ searchText }: TFormValue) => {
    if (!searchText) {
      Alert.warning({ title: '검색어를 입력해주세요.' });
      return;
    }

    // 검색 화면으로 이동하고 리스트 호출
    navigate('/search/result');
  };

  useEffect(() => {
    return () => {
      dispatch(setBookDetail(null));
    };
  }, []);

  return (
    <FormProvider {...methods}>
      <Wrap onSubmit={methods.handleSubmit(handleClickSearch)}>
        <Head>
          <SearchInput />
          <Spacing height={10} />
        </Head>
        <Body>
          <Outlet context={{ searchText, searchItem }} />
        </Body>
        {bookDetail !== null && <SearchDetail {...bookDetail} />}
      </Wrap>
    </FormProvider>
  );
};
