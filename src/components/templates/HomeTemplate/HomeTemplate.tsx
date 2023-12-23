import { setCurrentDate, setMonthCurrentDate } from '@/store/reducers';
import { TAppDispatch, TRootState } from '@/store/state';
import { IconReact } from '@assets/icons';
import { CalendarBird } from '@components/common/CalendarBird';
import { Spacing } from '@components/common/Spacing';
import { colors } from '@style/global-style';
import { lastDayMonth } from '@utils/calendar';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Body, CalendarWrap, FlexBox, Head, TodayText, Wrap } from './Styled';

export const HomeTemplate = () => {
  const { currentDate, monthCurrentDate } = useSelector((state: TRootState) => state.planStore);
  const nowDate = useMemo(() => new Date(currentDate), [currentDate]);
  const dispatch = useDispatch<TAppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClickMove = () => {
    if (location.pathname === '/') {
      // 홈 캘린더로 이동
      dispatch(setMonthCurrentDate(dayjs().format('YYYY-MM-DD')));
      navigate('/calendar');
    } else {
      // 캘린더 아이콘으로 홈으로 돌아가면 오늘 날짜로 변경
      dispatch(setCurrentDate(dayjs().format('YYYY-MM-DD')));
      navigate('/');
    }
  };

  const handleClickArrowLeft = () => {
    dispatch(setMonthCurrentDate(dayjs(monthCurrentDate).subtract(1, 'month').format()));
  };

  const handleClickArrowRight = () => {
    dispatch(setMonthCurrentDate(dayjs(monthCurrentDate).add(1, 'month').format()));
  };

  return (
    <Wrap>
      <Head>
        <FlexBox $view={location.pathname === '/calendar'}>
          <IconReact
            iconKey="arrow_left"
            className="arrow"
            size={30}
            color="white"
            cursor="pointer"
            onClick={handleClickArrowLeft}
            aria-label="Previous"
          />
          <TodayText>
            {dayjs(location.pathname === '/calendar' ? monthCurrentDate : currentDate).format(
              'YYYY년 MM월'
            )}
          </TodayText>
          <IconReact
            iconKey="arrow_right"
            className="arrow"
            size={30}
            color="white"
            cursor="pointer"
            onClick={handleClickArrowRight}
            aria-label="Next"
          />
        </FlexBox>
        <Spacing height={10} />
        <CalendarWrap onClick={handleClickMove}>
          <CalendarBird
            fillColor={location.pathname === '/calendar' ? colors.basicDark : colors.white}
          >
            {lastDayMonth(nowDate)[nowDate.getMonth() + 1]}
          </CalendarBird>
        </CalendarWrap>
      </Head>
      <Body>
        <Outlet />
      </Body>
    </Wrap>
  );
};
