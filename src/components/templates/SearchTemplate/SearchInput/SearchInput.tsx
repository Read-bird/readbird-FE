import { IconSearch } from '@assets/icons';
import { TFormValue } from '@components/templates/SearchTemplate';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';

export const SearchInput = () => {
  const { register } = useFormContext<TFormValue>();

  return (
    <Wrap>
      <input
        type="text"
        placeholder="원하는 책을 찾아 서재에 넣어보세요"
        {...register('searchText')}
      />
      <button type="submit">
        <IconSearch />
      </button>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
  width: 100%;
  max-width: 364px;
  height: 40px;
  background: white;

  input {
    flex: 1;
    height: 100%;
    font-size: 14px;
    color: black;
    padding: 10px;
    border-radius: 10px;
    border: none;
    background: transparent;

    &::placeholder {
      color: ${({ theme }) => theme.colors.darkGray};
    }
  }

  button {
    border: none;
    background: none;
  }

  svg {
    transform: scale(0.7);
    flex: 0 0 35px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover path {
      fill: ${({ theme }) => theme.colors.basicDark};
      stroke: ${({ theme }) => theme.colors.basicDark};
    }

    &:active {
      transform: scale(0.8);
    }
  }
`;
