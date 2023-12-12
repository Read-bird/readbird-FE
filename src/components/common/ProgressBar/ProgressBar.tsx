import { ProgressHTMLAttributes } from 'react';
import styled from 'styled-components';

type TProps = {
  value: number;
} & Omit<ProgressHTMLAttributes<HTMLProgressElement>, 'value'>;

export const ProgressBar = ({ value, ...props }: TProps) => {
  return (
    <Wrap>
      <StyledProgress value={value} {...props}>
        {value}
      </StyledProgress>
      <Text $percent={value}>{value}%</Text>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 24px;
`;

const StyledProgress = styled.progress`
  width: 100%;
  height: 100%;
  appearance: none;

  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 20px;
    border: none;
  }

  &::-webkit-progress-value {
    background-color: #cbd2fc;
    border-radius: 20px;
    border: none;
  }
`;

const Text = styled.span<{ $percent: number }>`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);

  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 24px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.basicDark};
  text-align: center;
`;
