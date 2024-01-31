import { addPlanData, setPlanData } from '@/store/reducers';
import { Alert, convertError, debounce, go, isPastDate, lastDayMonth } from '@/utils';
import { axiosFetch } from '@api/axios';
import {
  EAchievementStatus,
  ERecordStatus,
  TBookDetail,
  TRegisterFormValue,
  TSearchBooksResult
} from '@api/types';
import { TSearchListData } from '@components/templates/PlanModalTemplate/SearchList/SearchList';
import { usePlanValidation } from '@hooks/planValidation';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import {
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { FixedSizeList } from 'react-window';
import { InputLabel } from '../InputLabel';
import { SearchList } from '../SearchList';
import { SelectLabel } from '../SelectLabel';
import { GuideSpan, StyledForm } from './Styled';

type TRegisterProps = {
  title: string | null;
  author: string | null;
  totalPage: number;
  currentPage: number;
  publisher: string | null;
  startDate: string;
  endDate: string;
  isbn: string | null;
};

type TResponseProps = {
  planId: number;
  title: string;
  author: string;
  coverImage: string;
  totalPage: number;
  target: 30;
  status: EAchievementStatus;
};

type TProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  planId?: number;
  isRestore: boolean;
  isFuture: boolean;
};

export const RegisterModal = ({ setIsOpen, planId, isRestore, isFuture }: TProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSearch, setSearch] = useState(false);
  const { planValidation, checkReadBook } = usePlanValidation();
  const listRef = useRef<FixedSizeList<TSearchListData>>(null);

  const {
    watch,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors },
    clearErrors,
    setError,
    handleSubmit
  } = useFormContext<TRegisterFormValue>();

  const title = watch('title');
  const isbn = watch('isbn');
  const { bookList, page, totalPage: bookTotalPage } = watch('searchData');
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const totalPage = watch('totalPage');

  // 날짜 리스트 생성
  const options = (...args: number[]) => {
    const array: string[] = [];
    const start = args[0];
    const size = args[1];

    for (let i = start; i <= size; i++) {
      array.push(`${i}`);
    }

    return array;
  };

  // 날짜 리스트 생성
  const generateDate = useCallback((type: 'Y' | 'M' | 'D', date: string) => {
    const compDate = new Date(date);
    const nowDate = new Date();

    const month = compDate.getMonth() + 1;
    if (type === 'Y') {
      return [nowDate.getFullYear(), nowDate.getFullYear() + 10];
    }

    if (type === 'M') {
      return [1, 12];
    }

    const lastMonth = lastDayMonth(compDate)[month];

    return [1, lastMonth];
  }, []);

  // 날짜 수정
  const handleChangeDate = (type: 'Y' | 'M' | 'D', isStart: boolean) => (value: string) => {
    clearErrors();
    const name: 'startDate' | 'endDate' = isStart ? 'startDate' : 'endDate';
    const prev = getValues();
    const date = new Date(prev[name]);

    if (type === 'Y') {
      date.setFullYear(Number(value));
    } else if (type === 'M') {
      date.setMonth(Number(value) - 1);
    } else {
      date.setDate(Number(value));
    }

    setValue(name, dayjs(date).format('YYYY-MM-DD'));
  };

  // 등록/수정 전 check
  const handleSubmitCheck = async (props: TRegisterFormValue) => {
    if (!planId) {
      // 시작일이 오늘보다 이전날짜
      if (isPastDate(props.startDate, new Date())) {
        setError('startDate', {
          message: '* 오늘보다 이전 날짜를 설정할 수 없습니다.'
        });
        return;
      }
    }

    // 종료일이 시작일보다 이전날짜
    if (isPastDate(props.endDate, props.startDate)) {
      setError('endDate', {
        message: '* 시작일보다 이전 날짜를 설정할 수 없습니다.'
      });
      return;
    }

    // 종료일이 1년초과
    if (isPastDate(dayjs(props.startDate).add(1, 'year').format('YYYY-MM-DD'), props.endDate)) {
      setError('endDate', {
        message: '* 시작일에서 1년이 초과하는 날짜를 설정할 수 없습니다.'
      });
      return;
    }

    // 플랜 유효성 검사
    if (!planId) {
      const result = await planValidation();
      if (!result) return;
    }

    // 도서 등록 유효성 검사
    if (props.isbn) {
      const result = await checkReadBook(props.isbn);
      if (result) {
        Alert.confirm({
          title: '이미 읽은 책은 새가 부화하지 않습니다.',
          text: '그래도 플랜을 등록하시겠어요?',
          action: (result) => {
            if (result.isConfirmed) {
              handleSubmitValue(props);
            } else {
              setIsOpen(false);
            }
          }
        });
        return;
      }
    }

    handleSubmitValue(props);
  };

  // 등록/수정
  const handleSubmitValue = async (props: TRegisterFormValue) => {
    try {
      const registerData = {
        isbn: props.isbn,
        planId: isRestore ? props.planId : undefined,
        title: props.title,
        author: props.author,
        description: props.description,
        pubDate: props.pubDate,
        totalPage: props.totalPage,
        currentPage: props.currentPage,
        coverImage: props.coverImage,
        publisher: props.publisher,
        startDate: dayjs(props.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(props.endDate).format('YYYY-MM-DD')
      };

      const editData = {
        startDate: dayjs(props.startDate).format('YYYY-MM-DD'),
        endDate: dayjs(props.endDate).format('YYYY-MM-DD')
      };

      const res = !planId
        ? await axiosFetch<TRegisterProps, TResponseProps>({
            url: '/api/plan',
            method: 'post',
            options: {
              data: registerData
            }
          })
        : await axiosFetch<Pick<TRegisterProps, 'endDate' | 'startDate'>>({
            url: `/api/plan/${planId}`,
            method: 'put',
            options: {
              data: editData
            }
          });

      if (!planId ? res.status === 201 : res.status === 200) {
        const title = isRestore
          ? '플랜이 성공적으로 복구되었습니다.'
          : !planId
            ? '플랜이 성공적으로 등록되었습니다.'
            : '플랜이 성공적으로 수정되었습니다.';

        Alert.success({
          title,
          action: () => {
            if (props.planId) {
              dispatch(setPlanData(res.data));
            } else {
              const regexp = /\/?(mypage)|(search)/g;
              if (!regexp.test(location.pathname)) {
                const addPlan = {
                  ...res.data,
                  isbn: props.isbn,
                  title: props.title,
                  author: props.author,
                  publisher: props.publisher,
                  startDate: props.startDate,
                  endDate: props.endDate,
                  totalPage: props.totalPage,
                  currentPage: props.currentPage,
                  coverImage: props.coverImage,
                  planStatus: ERecordStatus.inProgress,
                  recordStatus: ERecordStatus.inProgress
                };

                dispatch(addPlanData({ ...addPlan }));
              }
            }
          }
        });
      } else {
        Alert.error({
          title: 'Error',
          text: !planId ? '플랜 등록에 실패했습니다.' : '플랜 수정에 실패했습니다.'
        });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        Alert.error({
          title: convertError(err.response?.data.message)
        });
      }
    } finally {
      setIsOpen(false);
      navigate('/');
    }
  };

  // 등록/수정 취소
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  // 검색 리스트 닫기
  const handleCloseSearchList = () => {
    setSearch(false);
  };

  // 도서 선택
  const handleClickBook = useCallback(
    (book: TBookDetail) => {
      setValue('title', book.title);
      setValue('author', book.author);
      setValue('publisher', book.publisher);
      setValue('totalPage', book.totalPage);
      setValue('isbn', book.isbn);
      setValue('coverImage', book.coverImage);
      setValue('pubDate', book.pubDate);
      setValue('description', book.description);
    },
    [setValue]
  );

  // 도서 검색
  const searchBookInfo = useCallback(
    async (bookTitle?: string, page?: number) => {
      try {
        const { searchData, title } = getValues();

        const value = bookTitle ?? title;

        if (!value) return;

        const requestData = {
          type: 'title',
          value,
          page: '' + (page ?? searchData.page),
          scale: '' + 10
        };

        const res = await axiosFetch<any, TSearchBooksResult>({
          url: `/api/book${go(requestData)}`,
          method: 'get'
        });

        if (res.status === 200) {
          setValue('searchData', {
            bookList: page ? searchData.bookList.concat(res.data.bookList) : res.data.bookList,
            page: res.data.page,
            totalPage: res.data.totalPage
          });
        }
      } catch (err) {
        if (err instanceof AxiosError) {
          Alert.error({ title: convertError(err.response?.data.message) });
        }
      }
    },
    [getValues, setValue]
  );

  // 도서 다음페이지 호출
  const handleNextPage = useCallback(() => {
    const { title, searchData } = getValues();
    searchBookInfo(title ?? undefined, searchData.page + 1 ?? undefined);
  }, [searchBookInfo, getValues]);

  const titleRegister = useMemo(
    () =>
      register('title', {
        required: '제목을 입력해주세요.',
        onChange: debounce((event) => {
          const value = event.target.value;
          listRef.current?.scrollToItem(0, 'start');
          searchBookInfo(value);
        }, 400)
      }),
    [register, searchBookInfo]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  // 도서 검색 리스트 열기
  useEffect(() => {
    if (title && !isbn && !planId && !isRestore) {
      setSearch(true);
    }
  }, [title, isbn, planId, isRestore]);

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit(handleSubmitCheck)} onKeyDown={handleKeyDown}>
      <InputLabel
        label={'책 이름'}
        type="text"
        id={'title'}
        placeholder={'데미안'}
        register={titleRegister}
        errors={errors.title}
        defaultValue={title ?? undefined}
        disabled={!!planId || !!isbn || isRestore}
        isViewSearchIcon={!planId && !isRestore}
      />
      {!planId && isSearch && (
        <SearchList
          listRef={listRef}
          searchWord={title}
          bookList={bookList}
          currentPage={page}
          totalPage={bookTotalPage}
          handleClose={handleCloseSearchList}
          handleClick={handleClickBook}
          handleNextPage={handleNextPage}
        />
      )}
      <div className="cont flex">
        <InputLabel
          label={'글쓴이'}
          type={'text'}
          id={'author'}
          placeholder={'헤르만 헤세'}
          register={register('author')}
          disabled={!!planId || !!isbn || isRestore}
        />
        <InputLabel
          label={'출판사'}
          type={'text'}
          id={'publisher'}
          placeholder={'민음사'}
          register={register('publisher')}
          disabled={!!planId || !!isbn || isRestore}
        />
      </div>
      <div className="cont flex">
        <InputLabel
          label={'총 쪽 수'}
          type={'number'}
          id={'totalPage'}
          register={register('totalPage', {
            required: '전체 페이지를 입력하세요.',
            min: {
              value: 2,
              message: '총 쪽 수를 다시 확인해주세요.'
            }
          })}
          disabled={!!planId || !!isbn || isRestore}
          errors={errors.totalPage}
        />
        <InputLabel
          label={'시작하는 쪽'}
          type={'number'}
          id={'currentPage'}
          placeholder={'120'}
          disabled={!!planId}
          register={register('currentPage', {
            required: '시작 페이지를 입력해주세요.',
            max: {
              value: totalPage - 1,
              message: '총 쪽 수보다 낮아야 합니다.'
            }
          })}
          errors={errors.currentPage}
        />
      </div>
      <div className="cont">
        <label>목표 기간</label>
        <div className="cont select">
          <SelectLabel
            id={'startDate-y'}
            options={options(...generateDate('Y', startDate))}
            handleChangeDate={handleChangeDate('Y', true)}
            disabled={!!planId && !isFuture}
            value={dayjs(startDate).format('YYYY')}
          />
          <span>년</span>
          <SelectLabel
            id={'startDate-m'}
            options={options(...generateDate('M', startDate))}
            handleChangeDate={handleChangeDate('M', true)}
            disabled={!!planId && !isFuture}
            value={dayjs(startDate).format('M')}
          />
          <span>월</span>
          <SelectLabel
            id={'startDate-d'}
            options={options(...generateDate('D', startDate))}
            handleChangeDate={handleChangeDate('D', true)}
            disabled={!!planId && !isFuture}
            value={dayjs(startDate).format('D')}
          />
          <span>일 부터</span>
        </div>
        <GuideSpan>{errors.startDate?.message}</GuideSpan>
        <div className="cont select">
          <SelectLabel
            id={'endDate-y'}
            options={options(...generateDate('Y', endDate))}
            handleChangeDate={handleChangeDate('Y', false)}
            value={dayjs(endDate).format('YYYY')}
          />
          <span>년</span>
          <SelectLabel
            id={'endDate-m'}
            options={options(...generateDate('M', endDate))}
            handleChangeDate={handleChangeDate('M', false)}
            value={dayjs(endDate).format('M')}
          />
          <span>월</span>
          <SelectLabel
            id={'endDate-d'}
            options={options(...generateDate('D', endDate))}
            handleChangeDate={handleChangeDate('D', false)}
            value={dayjs(endDate).format('D')}
          />
          <span>일 까지</span>
        </div>
        <GuideSpan>{errors.endDate?.message}</GuideSpan>
      </div>

      <div className="cont flex" style={{ marginTop: '10px' }}>
        <button type="button" className="btn-1 btn" onClick={handleCloseModal}>
          취소
        </button>
        <button type="submit" className="btn-2 btn">
          {!!planId ? '수정' : '확인'}
        </button>
      </div>
    </StyledForm>
  );
};
