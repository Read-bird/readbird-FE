import { IconHome, IconMyPage, IconSearch } from '@assets/icons';
import { cls } from '@utils/classname';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

export const Navigation = () => {
  const { pathname } = useLocation();

  return (
    <NavWrap>
      <NavLink to="/" className={cls({ selected: pathname === '/' })}>
        <IconHome />
        <span>홈</span>
      </NavLink>
      <NavLink to="/search" className={cls({ selected: pathname === '/search' })}>
        <IconSearch />
        <span>검색</span>
      </NavLink>
      <NavLink to="/mypage" className={cls({ selected: pathname === '/mypage' })}>
        <IconMyPage />
        <span>마이페이지</span>
      </NavLink>
    </NavWrap>
  );
};

const NavWrap = styled.nav`
  flex: 0 0 70px;
  width: 100%;
  max-width: 368px;
  border-top: 1px solid ${({ theme }) => theme.colors.basic};
  padding-top: 10px;

  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.darkGray};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;

  &.selected {
    color: ${({ theme }) => theme.colors.basicDark};

    svg path {
      fill: ${({ theme }) => theme.colors.basicDark};
      stroke: ${({ theme }) => theme.colors.basicDark};
    }
  }

  span {
    font-size: 12px;
  }
`;
