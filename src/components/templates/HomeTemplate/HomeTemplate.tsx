import { setCurrentDate } from '@/store/reducers';
import { TAppDispatch, TRootState } from '@/store/state';
import { IconReact } from '@assets/icons';
import { CalendarBird } from '@components/common/CalendarBird';
import { Spacing } from '@components/common/Spacing';
import { colors } from '@style/global-style';
import { lastDayMonth } from '@utils/calendar';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Body, CalendarWrap, FlexBox, Head, TodayText, Wrap } from './Styled';

export const HomeTemplate = () => {
  const { currentDate } = useSelector((state: TRootState) => state.planStore);
  const dispatch = useDispatch<TAppDispatch>();
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

  const handleClickArrowLeft = () => {
    dispatch(setCurrentDate(dayjs(currentDate).subtract(1, 'month').format()));
  };

  const handleClickArrowRight = () => {
    dispatch(setCurrentDate(dayjs(currentDate).add(1, 'month').format()));
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
          <TodayText>{dayjs(currentDate).format('YYYY년 MM월')}</TodayText>
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
            {lastDayMonth(currentDate)[currentDate.getMonth() + 1]}
          </CalendarBird>
        </CalendarWrap>
      </Head>
      <Body>
        <Outlet />
      </Body>
    </Wrap>
  );
};
