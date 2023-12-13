import { IconCalendar } from '@assets/icons';
import { ReactNode, SVGProps } from 'react';
import styled from 'styled-components';

type TProps = {
  children?: ReactNode;
  fillColor?: string;
  strokeColor?: string;
} & SVGProps<SVGSVGElement>;

export const CalendarBird = ({ children, ...props }: TProps) => {
  return (
    <Wrap>
      <IconCalendar {...props} />
      <p className="children-data">{children}</p>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  .children-data {
    position: absolute;
    top: 14px;
    left: 50%;
    transform: translateX(-50%);

    font-size: 18px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.basic};
  }
`;
