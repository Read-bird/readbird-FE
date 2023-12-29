import styled from 'styled-components';

export const StyledForm = styled.form`
  div.cont {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;

    &.flex {
      flex-direction: row;
      gap: 15px;
      margin-bottom: 0;
    }

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

  label {
    color: #b780db;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.16px;
    margin-bottom: 8px;
    display: block;
  }

  input {
    display: block;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ababab;
    background: #fff;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 15px;
    &:invalid {
      border: 1px solid #f00;
    }

    &::placeholder {
      color: #cfcfcf;
    }

    &.view-search-icon {
      padding: 8px 35px 8px 15px;
    }

    &:disabled {
      background-color: #cfcfcf;
    }
  }

  .search-icon {
    position: absolute;
    right: 8px;
    top: 34px;
    cursor: pointer;

    svg {
      width: 22px;
    }
  }
  small[role='alert'] {
    font-size: 12px;
    height: 12px;
    color: #ff7c7c;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.2px;
  }

  select {
    display: block;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ababab;
    background: #fff;
    font-size: 16px;
    font-weight: 500;
    padding: 8px;

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
      width: 60px;
    }

    &:nth-of-type(3) {
      width: 60px;
    }
  }

  .btn {
    border-radius: 10px;
    padding: 12px 0;
    width: 100%;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }

  .btn-1 {
    background: #cfcfcf;
  }

  .btn-2 {
    background: #b780db;
  }
`;

export const GuideSpan = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 400;
  color: #ff7676;
  height: 20px;
`;
