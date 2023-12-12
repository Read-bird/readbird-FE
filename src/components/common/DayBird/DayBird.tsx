import { IconDayBird } from '@assets/icons';
import { ReactNode, SVGProps } from 'react';
import styled from 'styled-components';

type TProps = {
  children?: ReactNode;
  className?: string;
  width?: number;
  height?: number;
  fillColor?: string;
  strokeColor?: string;
  cursor?: 'pointer' | 'default';
} & SVGProps<SVGSVGElement>;

export const DayBird = ({ children, className, cursor = 'default', ...props }: TProps) => {
  return (
    <DateWrap $cursor={cursor}>
      <IconDayBird className={className} {...props} />
      <div className="children-data">{children}</div>
    </DateWrap>
  );
};

const DateWrap = styled.div<{ $cursor: 'pointer' | 'default' }>`
  position: relative;
  flex: 1;
  cursor: ${({ $cursor }) => $cursor};

  display: flex;
  justify-content: center;
  align-items: center;

  .children-data {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
