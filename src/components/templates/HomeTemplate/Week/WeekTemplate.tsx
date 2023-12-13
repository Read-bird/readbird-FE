import { EAchievementStatus, ERecordStatus, TPlanRecord } from '@api/types';
import { IconPlus } from '@assets/icons';
import { IconEggNoPlan, IconEggOnePlan, IconEggThreePlan, IconEggTwoPlan } from '@assets/images';
import { CustomCalendar } from '@components/common/Calendar';
import { Spacing } from '@components/common/Spacing';
import { Plan } from '@components/templates/HomeTemplate/Plan';
import { Fragment } from 'react';
import { AddPlanWrap, EmptyPlan, PlanListBox, PlanVisualBox } from './Styled';

const calendarDummy: TPlanRecord[] = [
  {
    createdAt: '2023-12-10',
    status: EAchievementStatus.success
  },
  {
    createdAt: '2023-12-11',
    status: EAchievementStatus.failed
  },
  {
    createdAt: '2023-12-12',
    status: EAchievementStatus.unstable
  },
  {
    createdAt: '2023-12-13',
    status: null
  },
  {
    createdAt: '2023-12-14',
    status: null
  },
  {
    createdAt: '2023-12-15',
    status: null
  },
  {
    createdAt: '2023-12-16',
    status: null
  }
];

const planDummy = [
  {
    planId: 1,
    title: '나의 라임 오렌지 나무',
    author: 'author',
    coverImage: 'url',
    totalPage: 100,
    currentPage: 80,
    target: 30,
    endDate: '2023-12-21',
    planStatus: ERecordStatus.inProgress,
    recordStatus: ERecordStatus.inProgress
  },
  {
    planId: 2,
    title: '다빈치코드',
    author: 'author',
    coverImage: 'url',
    totalPage: 100,
    currentPage: 30,
    target: 10,
    endDate: '2023-12-15',
    planStatus: ERecordStatus.inProgress,
    recordStatus: ERecordStatus.inProgress
  },
  {
    planId: 3,
    title: '천사와 악마',
    author: 'author',
    coverImage: 'url',
    totalPage: 100,
    currentPage: 1,
    target: 30,
    endDate: '2023-12-30',
    planStatus: ERecordStatus.inProgress,
    recordStatus: ERecordStatus.inProgress
  }
];

export const WeekTemplate = () => {
  const handleClickAdd = () => {
    // 모달 띄움
  };

  return (
    <Fragment>
      <CustomCalendar record={calendarDummy} />
      <Spacing height={20} />
      <PlanVisualBox>
        {
          {
            0: <IconEggNoPlan />,
            1: <IconEggOnePlan />,
            2: <IconEggTwoPlan />,
            3: <IconEggThreePlan />
          }[planDummy?.length ?? 0]
        }
      </PlanVisualBox>
      <Spacing height={20} />
      {!!planDummy?.length ? (
        <PlanListBox>
          {planDummy.map((plan) => (
            <li key={plan.planId}>
              <Plan {...plan} />
            </li>
          ))}
        </PlanListBox>
      ) : (
        <EmptyPlan>아직 읽고 있는 책이 없어요.</EmptyPlan>
      )}
      <AddPlanWrap onClick={handleClickAdd}>
        <IconPlus />
      </AddPlanWrap>
    </Fragment>
  );
};
