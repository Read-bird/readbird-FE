import { Loading } from '@components/common/Loading';
import styled from 'styled-components';

export const LoadingTemplate = () => {
  return (
    <Wrap>
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
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f520;
`;
