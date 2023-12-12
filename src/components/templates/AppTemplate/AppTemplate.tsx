import { Navigation } from '@components/common/Navigation';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

export const AppTemplate = () => {
  return (
    <AppWrap>
      <MainWrap>
        <Outlet />
      </MainWrap>
      <Navigation />
    </AppWrap>
  );
};

const AppWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainWrap = styled.main`
  flex: 1;
  width: 100%;
`;
