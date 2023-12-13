import { ERecordStatus } from '@api/types';
import { IconFailed, IconProgress, IconSuccess } from '@assets/icons';
import { MiniModal } from '@components/templates/HomeTemplate/Plan/Modal';
import { colors } from '@style/global-style';
import { cls } from '@utils/classname';
import { MouseEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

type TProps = {
  planId: number;
  recordStatus: ERecordStatus;
};

export const Stamp = ({ planId, recordStatus }: TProps) => {
  const [isOpen, setOpen] = useState<number | null>(null);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, [setOpen]);

  const handleClickOpenModal = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setOpen((prev) => (prev === planId ? null : planId));
    },
    [planId]
  );

  const handleClickSuccess = useCallback(() => {
    // 성공 로직
    setOpen(null);
  }, []);

  const handleClickFailed = useCallback(() => {
    // 실패 로직
    setOpen(null);
  }, []);

  return (
    <Wrap>
      <IconWrap
        className={cls({ 'cursor-default': recordStatus !== ERecordStatus.inProgress })}
        onClick={handleClickOpenModal}
      >
        {
          {
            success: <IconSuccess />,
            inProgress: <IconProgress />,
            failed: <IconFailed />
          }[recordStatus]
        }
      </IconWrap>
      <MiniModal isOpen={isOpen === planId} handleClick={handleClose}>
        <InnerIcon onClick={handleClickSuccess}>
          <IconSuccess fillColor={colors.subBlue} />
          <p>완독 성공</p>
        </InnerIcon>
        <InnerIcon onClick={handleClickFailed}>
          <IconFailed fillColor={colors.subRed} />
          <p>완독 실패</p>
        </InnerIcon>
      </MiniModal>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
`;

const IconWrap = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 15px;
  background-color: white;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const InnerIcon = styled.div`
  transform: scale(0.8);
  cursor: pointer;

  p {
    font-size: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.darkGray};
  }
`;
