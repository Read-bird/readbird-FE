import { ReactNode, useEffect } from 'react';
import styled from 'styled-components';

type TProps = {
  isOpen: boolean;
  children: ReactNode;
  handleClick: () => void;
};

export const MiniModal = ({ isOpen, children, handleClick }: TProps) => {
  useEffect(() => {
    document.body.addEventListener('click', handleClick);

    return () => {
      document.body.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Wrap $open={isOpen} onClick={(e) => e.stopPropagation()}>
      {children}
    </Wrap>
  );
};

const Wrap = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;

  width: 54px;
  border: 1px solid ${({ theme }) => theme.colors.darkGray};
  border-radius: 15px;
  padding: 8px 6px;
  background-color: white;

  display: ${({ $open }) => ($open ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
