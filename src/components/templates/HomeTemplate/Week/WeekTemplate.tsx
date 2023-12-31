import { setPlan } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { axiosFetch } from '@api/axios';
import { ERecordStatus, TRegisterFormValue } from '@api/types';
import { IconPlus } from '@assets/icons';
import { WeekCalendar } from '@components/common/Calendar';
import { Spacing } from '@components/common/Spacing';
import { WeekData } from '@components/templates/HomeTemplate/Week/WeekData';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { usePlanValidation } from '@hooks/planValidation';
import { colors } from '@style/global-style';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { lazy, memo, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { FixedSizeList } from 'react-window';
import { AddPlanWrap, EmptyPlan, ListWrap, PlanIconWrap, PlanVisualBox, Wrap } from './Styled';

// 사용하지 않는 이미지의 경우 코드 스플리팅을 통해 다운로드 방지
const IconEggNoPlan = lazy(() =>
  import('@assets/images/IconEggNoPlan').then((data) => ({ default: data.IconEggNoPlan }))
);
const IconEggOnePlan = lazy(() =>
  import('@assets/images/IconEggOnePlan').then((data) => ({ default: data.IconEggOnePlan }))
);
const IconEggThreePlan = lazy(() =>
  import('@assets/images/IconEggThreePlan').then((data) => ({ default: data.IconEggThreePlan }))
);
const IconEggTwoPlan = lazy(() =>
  import('@assets/images/IconEggTwoPlan').then((data) => ({ default: data.IconEggTwoPlan }))
);

export const WeekTemplate = memo(() => {
  // 플랜 등록에 대한 정보
  const methods = useForm<TRegisterFormValue>({
    mode: 'onSubmit',
    defaultValues: {
      isbn: null,
      planId: null,
      title: null,
      author: null,
      publisher: null,
      currentPage: 0,
      totalPage: 0,
      coverImage: null,
      description: null,
      pubDate: null,
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
      searchData: {
        bookList: [],
        page: 1,
        totalPage: 0
      }
    }
  });

  // 플랜 등록 유효성 검사
  const { planValidation } = usePlanValidation();
  const { currentDate, planData, weedRecord } = useSelector((state: TRootState) => state.planStore);
  const dispatch = useDispatch();
  const date = useMemo(() => new Date(currentDate), [currentDate]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const iconSize = planData.filter((plan) => plan.planStatus === ERecordStatus.inProgress).length;

  const listHeight = useMemo(() => {
    const doc = document.querySelector('#root') as HTMLElement;
    const scrollHeight = doc.scrollHeight;
    const headerHeight = 95;
    const footerHeight = 70;
    const bodyHeight = 307;
    return scrollHeight - (headerHeight + footerHeight + bodyHeight);
  }, []);

  // 등록하기 모달 띄우기
  const handleClickAdd = async () => {
    const result = await planValidation();
    if (!result) return;

    // 모달 띄움
    setIsModalOpen(true);
  };

  // 플랜 조회
  const getList = async () => {
    try {
      const result = await axiosFetch({
        method: 'get',
        url: '/api/plan',
        options: { params: { date: dayjs(currentDate).format('YYYY-MM-DD') } }
      });

      dispatch(setPlan({ ...result.data }));
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({
          title: convertError(e.response?.data.messgae),
          action: () => {
            dispatch(setPlan({ weedRecord: [], planData: [], previouslyFailedPlan: [] }));
          }
        });
      }

      throw e;
    }
  };

  useEffect(() => {
    getList();
  }, [currentDate]);

  return (
    <Wrap>
      {<WeekCalendar currentDate={date} record={weedRecord} />}
      <Spacing height={20} />
      <PlanIconWrap>
        <PlanVisualBox>
          {
            {
              0: <IconEggNoPlan />,
              1: <IconEggOnePlan />,
              2: <IconEggTwoPlan />,
              3: <IconEggThreePlan />
            }[iconSize]
          }
          {/* 총 등록개수가 3개가 되면 버튼 숨김 */}
          {iconSize < 3 && (
            <AddPlanWrap onClick={handleClickAdd}>
              <IconPlus fillColor={colors.basicDark} />
            </AddPlanWrap>
          )}
        </PlanVisualBox>
      </PlanIconWrap>
      <Spacing height={20} />
      <ListWrap style={{ height: `${listHeight}px` }}>
        {!!planData?.length ? (
          <FixedSizeList
            width="100%"
            height={listHeight}
            itemSize={120}
            itemCount={planData.length}
            itemData={planData}
          >
            {WeekData}
          </FixedSizeList>
        ) : (
          <EmptyPlan>아직 읽고 있는 책이 없어요.</EmptyPlan>
        )}
      </ListWrap>
      <FormProvider {...methods}>
        <PlanModalTemplate isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalIndex={1} />
      </FormProvider>
    </Wrap>
  );
});
