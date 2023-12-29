import { setPlan } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { axiosFetch } from '@api/axios';
import { TRegisterFormValue } from '@api/types';
import { IconPlus } from '@assets/icons';
import { IconEggNoPlan, IconEggOnePlan, IconEggThreePlan, IconEggTwoPlan } from '@assets/images';
import { WeekCalendar } from '@components/common/Calendar';
import { Spacing } from '@components/common/Spacing';
import { Plan } from '@components/templates/HomeTemplate/Plan';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { usePlanValidation } from '@hooks/planValidation';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { AddPlanWrap, EmptyPlan, PageProgress, PlanListBox, PlanVisualBox, Wrap } from './Styled';

export const WeekTemplate = () => {
  const MAX_CREATION_COUNT = 3;
  const methods = useForm<TRegisterFormValue>({
    mode: 'onSubmit',
    defaultValues: {
      bookId: null,
      planId: null,
      title: null,
      author: null,
      publisher: null,
      currentPage: 0,
      totalPage: 0,
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: dayjs().add(1, 'days').format('YYYY-MM-DD'),
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
