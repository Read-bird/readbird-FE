import { Loading } from '@components/common/Loading';
import { useMemo } from 'react';
import styled from 'styled-components';

export const RouterLoading = () => {
  const height = useMemo(() => {
    const doc = document.querySelector('#root') as HTMLElement;
    return { height: `${doc.scrollHeight}px` };
  }, []);

  return (
    <Wrap style={height}>
      <Loading />
    </Wrap>
  );
};

const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f580;
`;
