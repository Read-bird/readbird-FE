import styled from 'styled-components';

export const FormWrap = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5px;

  h2 {
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.basicDark};
    text-align: center;
  }

  h3 {
    align-self: flex-start;
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.basicDark};
  }

  .book-wrap {
    position: relative;
    width: 315px;
    height: 154px;
    border-radius: 8px;
    border: 1px solid #747474;
    padding: 15px;

    display: flex;
    align-items: center;
    gap: 12px;

    img {
      border: 1px solid ${({ theme }) => theme.colors.darkGray};
      border-radius: 10px;
    }

    .book-info-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 110px;

      .book-info {
        width: 100%;
      }
    }
  }

  div.cont {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;

    &.select {
      gap: 5px;
      flex-direction: row;
      align-items: center;

      span {
        color: #ababab;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.16px;
      }
    }
  }

  select {
    display: block;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ababab;
    background: #fff;
    font-size: 16px;
    font-weight: 500;
    padding: 5px;

    &::placeholder {
      color: #cfcfcf;
    }

    &:disabled {
      background-color: #cfcfcf;
    }

    &:nth-of-type(1) {
      width: 98px;
    }

    &:nth-of-type(2) {
      width: 56px;
    }

    &:nth-of-type(3) {
      width: 56px;
    }
  }
`;

export const BookTitle = styled.strong`
  font-size: 16px;
  font-weight: 700;
  color: black;
  max-width: 180px;

  display: -webkit-box;
  overflow: hidden;
  word-break: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const TextSpan = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.darkGray};
`;

export const GuideSpan = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 400;
  color: #ff7676;
  height: 20px;
`;

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  button {
    width: 150px;
    height: 48px;
    border-radius: 10px;
    color: white;
    font-size: 16px;
    cursor: pointer;

    &.cancel {
      font-weight: 400;
      background-color: ${({ theme }) => theme.colors.lightGray};
    }

    &.right {
      font-weight: 500;
      background-color: ${({ theme }) => theme.colors.basicDark};
    }
  }
`;
