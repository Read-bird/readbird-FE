import { setBookDetail } from '@/store/reducers';
import { TAppDispatch } from '@/store/state';
import { axiosFetch } from '@api/axios';
import { TBookDetail, TRegisterFormValue } from '@api/types';
import { IconReact, IconReady } from '@assets/icons';
import { Images } from '@assets/images';
import { Spacing } from '@components/common/Spacing';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ButtonWrap, FlexBox, IconWrap, Inner, Wrap, imgStyle } from './Styled';

type TProps = TBookDetail;

export const SearchDetail = (props: TProps) => {
  const methods = useForm<TRegisterFormValue>({
    mode: 'onSubmit',
    defaultValues: {
      bookId: props.bookId,
      planId: null,
      title: props.title,
      author: props.author,
      publisher: props.publisher,
      currentPage: 0,
      totalPage: props.totalPage,
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
      searchData: {
        bookList: [],
        page: 1,
        totalPage: 0
      }
    }
  });

  const { coverImage, title, author, publisher, description, isbn, totalPage } = props;
  const dispatch = useDispatch<TAppDispatch>();
  const [isOpen, setOpen] = useState(false);

  // 뒤로가기
  const handleClickBack = useCallback(() => {
    dispatch(setBookDetail(null));
  }, [dispatch]);

  // 도서 등록하기
  const handleClickOpenModal = useCallback(async () => {
    try {
      const result = await axiosFetch({
        url: `/api/user/${props.bookId}`,
        method: 'get'
      });

      if (result.status === 200) {
        if (!result.data.readStatus) {
          setOpen(true);
        } else {
          Alert.warning({ title: '플랜으로 등록된 책입니다.' });
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.messgae) });
      }
    }
  }, [setOpen, props.bookId]);

  return (
    <Wrap>
      <Spacing height={50} />
      <Inner>
        <h1>도서정보</h1>
        <IconWrap onClick={handleClickBack}>
          <IconReact iconKey="arrow_left" size={25} />
        </IconWrap>
        <Spacing height={10} />
        <Images
          imgUrl={coverImage}
          imgAlt={`${title} 책 표지`}
          imgWidth={150}
          imgHeight={200}
          imgStyle={imgStyle}
        />
        <Spacing height={15} />
        <div className="scroll-area">
          <h2>{title}</h2>
          <Spacing height={15} />
          <FlexBox>
            <div className="info-wrap">
              <h3>글쓴이</h3>
              <span>{author}</span>
            </div>
            <div className="info-wrap">
              <h3>출판사</h3>
              <span>{publisher}</span>
            </div>
            <div className="info-wrap">
              <h3>총 쪽 수</h3>
              <span>{totalPage.toLocaleString()}쪽</span>
            </div>
          </FlexBox>
          <Spacing height={20} />
          <div className="info-wrap">
            <h3>ISBM</h3>
            <span>{isbn}</span>
          </div>
          <Spacing height={20} />
          <div className="info-wrap">
            <h3>책 소개</h3>
            <p>{description}</p>
          </div>
          <Spacing height={15} />
        </div>
      </Inner>
      <ButtonWrap>
        <button type="button" className="btn-buy">
          구매하기
          <div className="icon-wrap">
            <IconReady />
          </div>
        </button>
        <button type="button" className="btn-plan" onClick={handleClickOpenModal}>
          플랜등록
        </button>
      </ButtonWrap>
      <FormProvider {...methods}>
        <PlanModalTemplate isOpen={isOpen} setIsOpen={setOpen} modalIndex={1} />
      </FormProvider>
    </Wrap>
  );
};
