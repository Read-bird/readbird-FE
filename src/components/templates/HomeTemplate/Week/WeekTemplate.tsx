import { IconPlus } from '@assets/icons';
import { IconEggNoPlan, IconEggOnePlan, IconEggThreePlan, IconEggTwoPlan } from '@assets/images';
import { CustomCalendar } from '@components/common/Calendar';
import { Spacing } from '@components/common/Spacing';
import { Plan } from '@components/templates/HomeTemplate/Plan';
import { dummy } from '@mocks/index';
import { AddPlanWrap, EmptyPlan, PlanListBox, PlanVisualBox, Wrap } from './Styled';

export const WeekTemplate = () => {
  const handleClickAdd = () => {
    // 모달 띄움
  };

  return (
    <Wrap>
      <CustomCalendar record={dummy.weekCalendar} />
      <Spacing height={20} />
      <PlanVisualBox>
        {
          {
            0: <IconEggNoPlan />,
            1: <IconEggOnePlan />,
            2: <IconEggTwoPlan />,
            3: <IconEggThreePlan />
          }[dummy.plan?.length ?? 0]
        }
      </PlanVisualBox>
      <Spacing height={20} />
      {!!dummy.plan?.length ? (
        <PlanListBox>
          {dummy.plan.map((plan) => (
            <li key={plan.planId}>
              <Plan {...plan} />
            </li>
          ))}
        </PlanListBox>
      ) : (
        <EmptyPlan>아직 읽고 있는 책이 없어요.</EmptyPlan>
      )}
      {/* 총 등록개수가 3개가 되면 버튼 숨김 */}
      {(dummy.plan?.length ?? 0) < 3 && (
        <AddPlanWrap onClick={handleClickAdd}>
          <IconPlus />
        </AddPlanWrap>
      )}
      <Spacing height={5} />
    </Wrap>
  );
};
