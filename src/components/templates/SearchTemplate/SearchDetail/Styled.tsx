import styled, { CSSObject } from 'styled-components';

export const Wrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.basic};

  display: flex;
  flex-direction: column;

  &::after {
    content: '';
    position: absolute;
    left: 0px;
    bottom: 0px;

    width: 100%;
    height: calc(100vh - 250px);
    border-radius: 50px 50px 0 0%;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

export const Inner = styled.div`
  position: relative;
  z-index: 10;
  flex: 1;
  width: 100%;
  max-height: calc(100vh - 178px);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 22px;

  h1 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: white;
    line-height: 25px;
  }

  h2 {
    font-size: 18px;
    font-weight: 700;
    color: black;
  }

  .scroll-area {
    flex: 1 0 150px;
    overflow-y: auto;
  }

  .info-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    h3 {
      color: #747474;
      font-size: 16px;
      font-weight: 700;
    }

    span,
    p {
      font-size: 14px;
      font-weight: 400;
      color: #ababab;
    }
  }
`;

export const IconWrap = styled.div`
  position: absolute;
  top: 0px;
  left: 22px;
  z-index: 1;
  cursor: pointer;
  transition: transform 0.2s;
  color: white;

  &:hover {
    color: ${({ theme }) => theme.colors.basicDark};
  }

  &:active {
    transform: scale(1.4);
  }
`;

export const imgStyle: CSSObject = {
  borderRadius: '8px',
  border: '2px solid #AFB1B6'
};

export const FlexBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 5px;

  .info-wrap {
    flex: 0 0 100px;

    &:nth-of-type(2) {
      flex: 1 0 100px;
    }

    &:last-of-type {
      flex: 0 0 70px;
    }
  }
`;

export const ButtonWrap = styled.div`
  position: relative;
  z-index: 10;

  padding: 0 22px 10px;
  flex: 0 0 50px;
  display: flex;
  align-items: center;
  gap: 20px;

  button {
    width: 164px;
    height: 48px;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    font-weight: 500;

    &.btn-buy {
      position: relative;
      background-color: #cfcfcf;
      cursor: default;

      .icon-wrap {
        display: none;
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
      }

      &:hover {
        .icon-wrap {
          display: block;
        }
      }
    }

    &.btn-plan {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.basicDark};
      transition: transform 0.2s;

      &:active {
        transform: scale(1.1);
      }
    }
  }
`;
