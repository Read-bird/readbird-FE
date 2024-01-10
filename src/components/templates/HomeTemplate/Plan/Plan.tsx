import { addFailedPlan, setOpen, setOpenType } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { ERecordStatus, TPlan, TRegisterFormValue } from '@api/types';
import { Images } from '@assets/images';
import { ProgressBar } from '@components/common/ProgressBar';
import { Spacing } from '@components/common/Spacing';
import { Dday } from '@components/templates/HomeTemplate/Plan/Dday';
import { Dots } from '@components/templates/HomeTemplate/Plan/Dots';
import { Stamp } from '@components/templates/HomeTemplate/Plan/Stamp';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

type TProps = TPlan;

export const Plan = (props: TProps) => {
  const {
    coverImage,
    title,
    target,
    totalPage,
    currentPage,
    planId,
    endDate,
    startDate,
    recordStatus,
    author,
    publisher
  } = props;
  const dispatch = useDispatch();
  const { currentDate } = useSelector((state: TRootState) => state.planStore);
  const { userInfo } = useSelector((state: TRootState) => state.userStore);
  // 플랜 수정에 대한 정보
  const methods = useForm<TRegisterFormValue>({
    mode: 'onSubmit',
    defaultValues: {
      planId,
      author,
      currentPage,
      startDate,
      endDate,
      publisher,
      title,
      totalPage,
      coverImage,
      searchData: {
        bookList: [],
        page: 1,
        totalPage: 0
      }
    }
  });

  const openSuccess = useCallback(() => {
    dispatch(setOpen(true));
    dispatch(setOpenType('character'));
  }, [dispatch]);

  const openFailed = useCallback(() => {
    dispatch(addFailedPlan(props));
  }, [dispatch, props]);

  return (
    <Wrap>
      <ImageWrap>
        <Images
          imgUrl={coverImage ?? undefined}
          imgAlt={`책 표지 이미지`}
          imgWidth={55}
          imgHeight={78}
          imgStyle={imgStyle}
        />
      </ImageWrap>
      <ProgressWrap>
        <div>
          <FlexBox>
            <span className="book-name">{title}</span>
            <Dday currentDate={currentDate} startDate={startDate} endDate={endDate} />
          </FlexBox>
          <FlexBox $justifyContent="flex-start">
            <span className="book-page">
              {currentPage}쪽 ~ {Number(currentPage) + Number(target)}쪽
            </span>
            <Spacing width={5} />
          </FlexBox>
        </div>
        <ProgressBar
          id={`plan${planId}`}
          value={Math.floor((currentPage / totalPage) * 100)}
          max={100}
        />
      </ProgressWrap>
      <StatusWrap>
        <FormProvider {...methods}>
          <Dots
            planId={planId}
            userId={userInfo?.id ?? null}
            selectDate={currentDate}
            isProgress={recordStatus === ERecordStatus.inProgress}
            endDate={endDate}
          />
        </FormProvider>
        <Stamp
          planId={planId}
          recordStatus={recordStatus}
          selectDate={currentDate}
          maxPage={Number(currentPage) + Number(target)}
          currentPage={currentPage}
          dday={dayjs(endDate).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')}
          openSuccess={openSuccess}
          openFailed={openFailed}
        />
      </StatusWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.basic};
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const imgStyle = { borderRadius: '10px' };

const ImageWrap = styled.div`
  flex: 0 0 55px;
`;

const ProgressWrap = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StatusWrap = styled.div`
  flex: 0 0 55px;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  .dots-wrap {
    height: 28px;
  }
`;

const FlexBox = styled.div<{ $justifyContent?: string }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'space-between'};
  align-items: center;

  .book-name {
    font-size: 16px;
    font-weight: 700;
    color: #000000;
    line-height: 18px;
    text-align: left;

    display: -webkit-box;
    overflow: hidden;
    word-break: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .book-page {
    font-size: 16px;
    font-weight: 500;
    color: #747474;
  }
`;
