import styled from 'styled-components';

export const LoadingTemplate = () => {
  return <Wrap>로딩중...</Wrap>;
};

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
