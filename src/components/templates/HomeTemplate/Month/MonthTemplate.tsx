import { EAchievementStatus } from '@api/types';
import { IconBook, IconDayBirdMini, IconSuccess } from '@assets/icons';
import { Calendar } from '@components/common/Calendar';
import { Spacing } from '@components/common/Spacing';
import { dummy } from '@mocks/index';
import { DefinitionList, FlexBox, GuideLabel, GuideText, Section, SubTitle, Wrap } from './Styled';

const data = {
  before: '이 날짜에 등록된 플랜이 없어요.',
  [EAchievementStatus.failed]: '플랜을 달성하지 못했어요.',
  [EAchievementStatus.unstable]: '한 개 이상의 플랜을 달성했어요!',
  [EAchievementStatus.success]: '모든 플랜을 달성했어요!'
};

export const MonthTemplate = () => {
  return (
    <Wrap>
      <Section>
        <Calendar record={dummy.monthCalendar(new Date())} />
        <Spacing height={14} />
        <GuideLabel>날짜를 터치하면 해당 플랜으로 이동합니다.</GuideLabel>
        <Spacing height={14} />
        {Object.entries(data).map(([key, value]) => (
          <DefinitionList>
            <dt>
              <IconDayBirdMini className={`${key}`} />
            </dt>
            <GuideText>{value}</GuideText>
          </DefinitionList>
        ))}
      </Section>
      <Spacing height={30} />
      <Section>
        <SubTitle>{new Date().getMonth() + 1}월의 플랜 달성 기록</SubTitle>
        <Spacing height={14} />
        <FlexBox $justify="space-between">
          <FlexBox>
            <IconSuccess fillColor="#E3CCF2" />
            <Spacing width={10} />
            <span>100% 달성한 플랜</span>
          </FlexBox>
          <strong>00개</strong>
        </FlexBox>
        <Spacing height={14} />
        <FlexBox $justify="space-between">
          <FlexBox>
            <IconBook />
            <Spacing width={10} />
            <span>완독에 성공한 책</span>
          </FlexBox>
          <strong>00권</strong>
        </FlexBox>
      </Section>
    </Wrap>
  );
};
