import { TBook, addPlanData, setPlanEndData } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { Alert, convertError, go, lastDayMonth } from '@/utils';
import { axiosFetch } from '@api/axios';
import {
  EAchievementStatus,
  ERecordStatus,
  TRegisterFormValue,
  TSearchBooksResult
} from '@api/types';
import { usePlanValidation } from '@hooks/planValidation';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { InputLabel } from './InputLabel';
import { SearchList } from './SearchList';
import { SelectLabel } from './SelectLabel';

type TRegisterProps = {
  bookId?: number;
  title: string | null;
  author: string | null;
  totalPage: number;
  currentPage: number;
  publisher: string | null;
  startDate: string;
  endDate: string;
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
};

export const RegisterModal = ({ setIsOpen, planId }: TProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSearch, setSearch] = useState(false);
  const { planValidation, checkReadBook } = usePlanValidation();

  const {
    watch,
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors }
  } = useFormContext<TRegisterFormValue>();

  const { planData } = useSelector((state: TRootState) => state.planStore);

  const title = watch('title');
  const { bookList, page, totalPage: bookTotalPage } = watch('searchData');
  const bookId = watch('bookId');
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
    // 플랜 유효성 검사
    if (!planId) {
      const result = await planValidation();
      if (!result) return;
    }

    // 도서 등록 유효성 검사
    if (props.bookId) {
      const result = await checkReadBook(props.bookId);
      if (result) {
        Alert.confirm({
          title: '이미 읽은 책은 새가 부화하지 않습니다.',
          text: '그래도 플랜을 등록하시겠어요?',
          action: () => {
            handleSubmitValue(props);
          },
          failed: () => {
            setIsOpen(false);
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
        planId: undefined,
        title: props.title,
        author: props.author,
        totalPage: props.totalPage,
        currentPage: props.currentPage,
        publisher: props.publisher,
        startDate: props.startDate,
        endDate: props.endDate,
        bookId: props.bookId ?? undefined
      };

      const res = !planId
        ? await axiosFetch<TRegisterProps, TResponseProps>({
            url: '/api/plan',
            method: 'post',
            options: {
              data: registerData
            }
          })
        : await axiosFetch<Pick<TRegisterProps, 'endDate'>>({
            url: `/api/plan/${planId}`,
            method: 'put',
            options: {
              data: {
                endDate: props.endDate
              }
            }
          });

      if (!planId ? res.status === 201 : res.status === 200) {
        Alert.success({
          title: '성공!',
          text: !planId ? '플랜이 성공적으로 등록되었습니다.' : '플랜이 성공적으로 수정되었습니다.',
          action: () => {
            if (props.planId) {
              dispatch(setPlanEndData({ planId: props.planId, endDate: props.endDate }));
            } else {
              const addPlan = {
                ...res.data,
                title: props.title,
                author: props.author,
                publisher: props.publisher,
                startDate: props.startDate,
                endDate: props.endDate,
                totalPage: props.totalPage,
                currentPage: props.currentPage,
                planStatus: ERecordStatus.inProgress,
                recordStatus: ERecordStatus.inProgress
              };

              dispatch(addPlanData({ ...addPlan }));
            }
            setIsOpen(false);
            navigate('/');
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
    }
  };

  // 등록/수정 취소
  const handleCloseModal = () => {
    reset();
    setIsOpen(false);
  };

  // 검색 리스트 닫기
  const handleCloseSearchList = () => {
    setSearch(false);
  };

  // 도서 선택
  const handleClickBook = (book: TBook) => {
    setValue('bookId', book.bookId);
    setValue('title', book.title);
    setValue('author', book.author);
    setValue('publisher', book.publisher);
    setValue('totalPage', book.totalPage);
  };

  // 도서 검색
  const searchBookInfo = useCallback(
    async (bookTitle?: string, page?: number) => {
      try {
        const { searchData, title } = getValues();

        const value = bookTitle ?? title;

        if (!value) return;

        const requestData = {
          value,
          page: '' + (page ?? searchData.page),
          scale: '' + 10
        };

        const res = await axiosFetch<any, TSearchBooksResult>({
          url: `/api/book${go(requestData)}`,
          method: 'get'
        });

        setValue('searchData', {
          bookList: page ? searchData.bookList.concat(res.data.bookList) : res.data.bookList,
          page: res.data.page,
          totalPage: res.data.totalPage
        });
      } catch (err) {
        if (err instanceof AxiosError) {
          Alert.error({ title: convertError(err.response?.data.messgae) });
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
        onChange: (event) => {
          const value = event.target.value;
          searchBookInfo(value);
        }
      }),
    [register, searchBookInfo]
  );

  useEffect(() => {
    if (title && !bookId) {
      setSearch(true);
    }
  }, [title, bookId]);

  useEffect(() => {
    return () => reset();
  }, []);

  return (
    <StyledForm onSubmit={handleSubmit(handleSubmitCheck)}>
      <InputLabel
        label={'책 이름'}
        type="text"
        id={'title'}
        placeholder={'데미안'}
        register={titleRegister}
        errors={errors.title}
        defaultValue={title ?? undefined}
        disabled={!!planId || !!bookId}
        isViewSearchIcon={true}
      />
      {!planId && isSearch && (
        <SearchList
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
          disabled={!!planId || !!bookId}
        />
        <InputLabel
          label={'출판사'}
          type={'text'}
          id={'publisher'}
          placeholder={'민음사'}
          register={register('publisher')}
          disabled={!!planId || !!bookId}
        />
      </div>
      <div className="cont flex">
        <InputLabel
          label={'총 쪽 수'}
          type={'number'}
          id={'totalPage'}
          register={register('totalPage')}
          disabled={!!planId || !!bookId}
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
              value: totalPage,
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
            disabled={!!planId}
            value={dayjs(startDate).format('YYYY')}
          />
          <span>년</span>
          <SelectLabel
            id={'startDate-m'}
            options={options(...generateDate('M', startDate))}
            handleChangeDate={handleChangeDate('M', true)}
            disabled={!!planId}
            value={dayjs(startDate).format('M')}
          />
          <span>월</span>
          <SelectLabel
            id={'startDate-d'}
            options={options(...generateDate('D', startDate))}
            handleChangeDate={handleChangeDate('D', true)}
            disabled={!!planId}
            value={dayjs(startDate).format('D')}
          />
          <span>일 부터</span>
        </div>
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

const StyledForm = styled.form`
  div.cont {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 17px;
    position: relative;

    &.flex {
      flex-direction: row;
      gap: 15px;
      margin-bottom: 0;
    }

    &.select {
      gap: 5px;
      flex-direction: row;
      align-items: center;

      span {
        color: #ababab;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.16px;
      }
    }
  }

  label {
    color: #b780db;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.16px;
    margin-bottom: 8px;
    display: block;
  }

  input {
    display: block;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ababab;
    background: #fff;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 15px;
    &:invalid {
      border: 1px solid #f00;
    }

    &::placeholder {
      color: #cfcfcf;
    }

    &[name='title'] {
      padding: 8px 35px 8px 15px;
    }

    &:disabled {
      background-color: #cfcfcf;
    }
  }

  .search-icon {
    position: absolute;
    right: 8px;
    top: 34px;
    cursor: pointer;

    svg {
      width: 22px;
    }
  }
  small[role='alert'] {
    font-size: 12px;
    color: #ff7c7c;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.2px;
  }

  select {
    display: block;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ababab;
    background: #fff;
    font-size: 16px;
    font-weight: 500;
    padding: 8px;

    &::placeholder {
      color: #cfcfcf;
    }

    &:disabled {
      background-color: #cfcfcf;
    }

    &:nth-of-type(1) {
      width: 98px;
    }

    &:nth-of-type(2) {
      width: 60px;
    }

    &:nth-of-type(3) {
      width: 60px;
    }
  }

  .btn {
    border-radius: 10px;
    padding: 12px 0;
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }

  .btn-1 {
    background: #cfcfcf;
  }

  .btn-2 {
    background: #b780db;
  }
`;
