import { IconSuccess } from '@assets/icons';
import { colors } from '@style/global-style';
import { MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { TFormValue } from './ReadLessModal';

type TProps = {
  index: number;
};

export const CheckBox = ({ index }: TProps) => {
  const { watch, getValues, setValue, clearErrors } = useFormContext<TFormValue>();
  const checked = watch('requestData')[index]?.checked;

  // 체크박스 적용
  const handleCheck = (e: MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
    clearErrors();
    const prevData = getValues();
    prevData.requestData[index].checked = !prevData.requestData[index].checked;
    setValue('requestData', prevData.requestData);
  };

  return (
    <LabelWrap htmlFor={`failedBookCheck${index}`}>
      <input
        id={`failedBookCheck${index}`}
        type="checkbox"
        checked={checked}
        onClick={handleCheck}
      />
      {checked && <IconSuccess fillColor={colors.basicDark} />}
    </LabelWrap>
  );
};

const LabelWrap = styled.label`
  position: absolute;
  right: 10px;
  bottom: 10px;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid black;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  input {
    display: none;
  }

  svg {
    width: 23px;
    height: 20px;
  }
`;
