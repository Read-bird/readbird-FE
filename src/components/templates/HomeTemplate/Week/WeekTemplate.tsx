import { setPlan } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { axiosFetch } from '@api/axios';
import { IconPlus } from '@assets/icons';
import { IconEggNoPlan, IconEggOnePlan, IconEggThreePlan, IconEggTwoPlan } from '@assets/images';
import { WeekCalendar } from '@components/common/Calendar';
import { Spacing } from '@components/common/Spacing';
import { Plan } from '@components/templates/HomeTemplate/Plan';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { MAX_CREATION_COUNT } from '@constants/plan';
import { Alert } from '@utils/Alert';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddPlanWrap, EmptyPlan, PageProgress, PlanListBox, PlanVisualBox, Wrap } from './Styled';

export const WeekTemplate = () => {
  const { currentDate, planData, weedRecord } = useSelector((state: TRootState) => state.planStore);
  const dispatch = useDispatch();
  const date = useMemo(() => new Date(currentDate), [currentDate]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickAdd = () => {
    // 모달 띄움
    setIsModalOpen(true);
  };

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
          title: e.response?.data,
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

      <PlanModalTemplate isOpen={isModalOpen} setIsOpen={setIsModalOpen} modalIndex={1} />
    </Wrap>
  );
};
