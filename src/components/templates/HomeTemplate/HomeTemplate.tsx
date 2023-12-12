import { CalendarBird } from '@components/common/CalendarBird';
import { Spacing } from '@components/common/Spacing';
import { colors } from '@style/global-style';
import { lastDayMonth } from '@utils/calendar';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Body, CalendarWrap, Head, TodayText, Wrap } from './Styled';

export const HomeTemplate = () => {
  const today = useMemo(() => new Date(), []);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickMove = () => {
    if (location.pathname === '/') {
      // 홈 캘린더로 이동
      navigate('/calendar');
    } else {
      navigate('/');
    }
  };

  return (
    <Wrap>
      <Head>
        <TodayText>{dayjs(today).format('YYYY년 MM월')}</TodayText>
        <Spacing height={10} />
        <CalendarWrap onClick={handleClickMove}>
          <CalendarBird
            fillColor={location.pathname === '/calendar' ? colors.basicDark : colors.white}
          >
            {lastDayMonth(today)[today.getMonth() + 1]}
          </CalendarBird>
        </CalendarWrap>
      </Head>
      <Body>
        <Outlet />
      </Body>
    </Wrap>
  );
};
