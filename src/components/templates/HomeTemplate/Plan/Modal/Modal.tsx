import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

type TProps = {
  isOpen: boolean;
  children: ReactNode;
  handleClick: () => void;
  className?: string;
};

export const MiniModal = ({ className, isOpen, children, handleClick }: TProps) => {
  useEffect(() => {
    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Wrap $open={isOpen} className={className} onClick={(e) => e.stopPropagation()}>
      {children}
    </Wrap>
  );
};

const Wrap = styled.div<{ $open: boolean }>`
  position: absolute;
  top: -1px;
  right: 54px;
  z-index: 10;

  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  border-radius: 15px;
  padding: 0px 8px;
  background-color: white;

  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  align-items: center;
  gap: 8px;

  &.dots {
    padding: 4px 8px;
    border-radius: 20px;
    gap: 10px;
  }
`;
