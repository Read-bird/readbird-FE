import { axiosFetch } from '@api/axios';
import { EAchievementStatus, ERecordStatus } from '@api/types';
import { IconFailed, IconProgress, IconSuccess } from '@assets/icons';
import { MiniModal } from '@components/templates/HomeTemplate/Plan/Modal';
import { colors } from '@style/global-style';
import { Alert } from '@utils/Alert';
import { cls } from '@utils/classname';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

type TProps = {
  planId: number;
  recordStatus: ERecordStatus;
  selectDate: string;
  maxPage: number;
};

export const Stamp = ({ planId, recordStatus, selectDate, maxPage }: TProps) => {
  const [isOpen, setOpen] = useState<number | null>(null);
  const isSame = useMemo(() => dayjs(selectDate).isSame(new Date(), 'date'), [selectDate]);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, [setOpen]);

  const handleClickOpenModal = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (isSame && recordStatus === ERecordStatus.inProgress) {
        setOpen((prev) => (prev === planId ? null : planId));
      }
    },
    [planId, isSame, recordStatus]
  );

  const handleClickSuccess = useCallback(async () => {
    try {
      // 쪽 수 저장 및 보내기
      const result = await axiosFetch<
        { status: EAchievementStatus; currentPage: number },
        {
          message: string;
          newCharacter: string;
        }
      >({
        method: 'put',
        url: `/api/record/${planId}`,
        options: { data: { status: EAchievementStatus.success, currentPage: maxPage } }
      });

      console.log(result.data.message);
      console.log(result.data.newCharacter);
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.message) });
      }
    } finally {
      setOpen(null);
    }
  }, [setOpen, maxPage, planId]);

  const handleClickFailed = useCallback(() => {
    // 실패 로직
    Alert.input({
      title: '<strong class="alert-input-title">아쉬워요... 어디까지 읽으셨나요?</strong>',
      inputLabel: '쪽 까지 읽었어요.',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputValidator: (value) => {
        if (Number(value) >= maxPage) {
          return '* 읽은 쪽을 다시 확인해주세요.';
        }
      },
      preConfirm: async (page) => {
        try {
          // 쪽 수 저장 및 보내기
          const result = await axiosFetch<
            { status: EAchievementStatus; currentPage: number },
            {
              message: string;
              newCharacter: string;
            }
          >({
            method: 'put',
            url: `/api/record/${planId}`,
            options: { data: { status: EAchievementStatus.unstable, currentPage: page } }
          });

          console.log(result.data.message);
          console.log(result.data.newCharacter);
        } catch (e: any) {
          if (e instanceof AxiosError) {
            Swal.showValidationMessage(e.response?.data.message);
          }
        } finally {
          setOpen(null);
        }
      }
    });
  }, [setOpen, planId, maxPage]);

  return (
    <Wrap>
      <IconWrap
        className={cls({ 'cursor-default': recordStatus !== ERecordStatus.inProgress || !isSame })}
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

  &.cursor-default {
    cursor: default;
  }
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
