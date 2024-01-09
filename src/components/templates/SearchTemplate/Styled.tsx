import styled from 'styled-components';

export const Wrap = styled.form`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.basic};

  display: flex;
  flex-direction: column;
`;

export const Head = styled.section`
  position: relative;
  width: 100%;
  flex: 0 0 85px;
  padding: 0 13px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const Body = styled.section`
  position: relative;
  flex: 1;
  width: 100%;
  height: calc(100% - 165px);
  border-radius: 50px 50px 0 0%;
  background-color: ${({ theme }) => theme.colors.white};

  display: flex;
  flex-direction: column;
  align-items: center;
`;
