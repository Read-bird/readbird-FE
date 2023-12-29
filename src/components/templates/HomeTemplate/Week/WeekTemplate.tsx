import { setPlan } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { axiosFetch } from '@api/axios';
import { TRegisterFormValue } from '@api/types';
import { IconPlus } from '@assets/icons';
import { WeekCalendar } from '@components/common/Calendar';
import { Spacing } from '@components/common/Spacing';
import { Plan } from '@components/templates/HomeTemplate/Plan';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { usePlanValidation } from '@hooks/planValidation';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { lazy, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AddPlanWrap, EmptyPlan, PageProgress, PlanListBox, PlanVisualBox, Wrap } from './Styled';

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

export const WeekTemplate = () => {
  const MAX_CREATION_COUNT = 3;
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
      <PlanVisualBox>
        {
          {
            0: <IconEggNoPlan />,
            1: <IconEggOnePlan />,
            2: <IconEggTwoPlan />,
            3: <IconEggThreePlan />
          }[planData?.length ?? 0]
        }
      </PlanVisualBox>
      <Spacing height={20} />
      {!!planData?.length ? (
        <PlanListBox>
          {planData.map((plan) => (
            <li key={plan.planId}>
              <Plan {...plan} />
            </li>
          ))}
          <li className="last">
            <PageProgress>
              {planData.length}/{MAX_CREATION_COUNT}
            </PageProgress>
          </li>
        </PlanListBox>
      ) : (
        <EmptyPlan>아직 읽고 있는 책이 없어요.</EmptyPlan>
      )}
      {/* 총 등록개수가 3개가 되면 버튼 숨김 */}
      {(planData?.length ?? 0) < 3 && (
        <AddPlanWrap onClick={handleClickAdd}>
          <IconPlus />
        </AddPlanWrap>
      )}
      <Spacing height={5} />

      <FormProvider {...methods}>
        <PlanModalTemplate isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalIndex={1} />
      </FormProvider>
    </Wrap>
  );
};
