import { setRecordStatus, setSelectCollections, successPlan } from '@/store/reducers';
import { axiosFetch } from '@api/axios';
import { ERecordStatus, TResponseCollection } from '@api/types';
import { IconFailed, IconProgress, IconSuccess } from '@assets/icons';
import { MiniModal } from '@components/templates/HomeTemplate/Plan/Modal';
import { colors } from '@style/global-style';
import { Alert } from '@utils/Alert';
import { cls } from '@utils/classname';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Swal from 'sweetalert2';

type TProps = {
  planId: number;
  recordStatus: ERecordStatus;
  selectDate: string;
  maxPage: number;
  currentPage: number;
  dday: boolean;
  openSuccess: () => void;
  openFailed: () => void;
};

export const Stamp = ({
  planId,
  recordStatus,
  selectDate,
  maxPage,
  currentPage,
  dday,
  openSuccess,
  openFailed
}: TProps) => {
  const dispatch = useDispatch();
  const [isOpenModal, setOpenModal] = useState<number | null>(null);
  const isSame = useMemo(() => dayjs(selectDate).isSame(new Date(), 'date'), [selectDate]);

  const handleClose = useCallback(() => {
    setOpenModal(null);
  }, [setOpenModal]);

  const handleClickOpenModal = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (isSame && recordStatus === ERecordStatus.inProgress) {
        setOpenModal((prev) => (prev === planId ? null : planId));
      }
    },
    [planId, isSame, recordStatus]
  );

  const handleClickCheck = () => {
    // 오늘이 dday인경우
    if (dday) {
      Alert.confirm({
        title: '오늘은 플랜 마지막날!',
        text: '책을 끝까지 읽으셨군요.',
        confirmButtonText: '네!',
        cancelButtonText: '잘못 눌렀어요',
        action: (result) => {
          if (result.isConfirmed) {
            handleClickSuccess();
          }
        }
      });
    } else {
      handleClickSuccess();
    }
  };

  // 플랜성공 로직
  const handleClickSuccess = useCallback(async () => {
    try {
      // 쪽 수 저장 및 보내기
      const result = await axiosFetch<
        { status: ERecordStatus; currentPage: number },
        {
          message: string;
          newCharacter: TResponseCollection;
        }
      >({
        method: 'put',
        url: `/api/record/${planId}`,
        options: { data: { status: ERecordStatus.success, currentPage: maxPage } }
      });

      if (result.status === 200) {
        if (result.data.message.includes('success')) {
          // 플랜달성 모달을 띄워주며 캐릭터 획득
          dispatch(successPlan(planId));
          dispatch(
            setSelectCollections([
              {
                ...result.data.newCharacter,
                title: '축하해요! 새가 부화했어요!'
              }
            ])
          );
          openSuccess();
        } else {
          // 플랜의 recordStatus 수정
          dispatch(
            setRecordStatus({
              planId,
              recordStatus: ERecordStatus.success,
              currentPage: maxPage
            })
          );
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.message) });
      }
    } finally {
      setOpenModal(null);
    }
  }, [setOpenModal, maxPage, planId, dispatch, openSuccess]);

  // 실패 로직
  const handleClickFailed = useCallback(() => {
    Alert.input({
      title: '<strong class="alert-input-title">아쉬워요... 어디까지 읽으셨나요?</strong>',
      inputLabel: '쪽 까지 읽었어요.',
      inputAttributes: {
        autocapitalize: 'off'
      },
      inputValidator: (value) => {
        if (Number(value) >= maxPage || Number(value) < currentPage) {
          return '* 읽은 쪽을 다시 확인해주세요.';
        }
      },
      preConfirm: async (page) => {
        try {
          // 쪽 수 저장 및 보내기
          const result = await axiosFetch<
            { status: ERecordStatus; currentPage: number },
            {
              message: string;
            }
          >({
            method: 'put',
            url: `/api/record/${planId}`,
            options: { data: { status: ERecordStatus.failed, currentPage: page } }
          });

          if (result.status === 200) {
            if (result.data.message.includes('failed')) {
              // 실패 모달 띄우기
              openFailed();
              // 플랜의 recordStatus 수정
              dispatch(
                setRecordStatus({
                  planId,
                  recordStatus: ERecordStatus.failed,
                  currentPage: page
                })
              );
            } else {
              // 플랜의 recordStatus 수정
              dispatch(
                setRecordStatus({
                  planId,
                  recordStatus: ERecordStatus.failed,
                  currentPage: page
                })
              );
            }
          }
        } catch (e: any) {
          if (e instanceof AxiosError) {
            Swal.showValidationMessage(e.response?.data.message);
          }
        } finally {
          setOpenModal(null);
        }
      }
    });
  }, [setOpenModal, planId, maxPage, dispatch, openFailed]);

  return (
    <Wrap>
      <IconWrap
        className={cls({ 'cursor-default': recordStatus !== ERecordStatus.inProgress || !isSame })}
        onClick={handleClickOpenModal}
      >
        {
          {
            success: <IconSuccess fillColor={colors.subBlue} />,
            inProgress: <IconProgress />,
            failed: <IconFailed fillColor={colors.subRed} />
          }[recordStatus]
        }
      </IconWrap>
      <MiniModal isOpen={isOpenModal === planId} handleClick={handleClose}>
        <InnerIcon onClick={handleClickCheck}>
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
