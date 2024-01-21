import { deletePlanData } from '@/store/reducers';
import { axiosFetch } from '@api/axios';
import { TRegisterFormValue } from '@api/types';
import { IconReact } from '@assets/icons';
import { MiniModal } from '@components/templates/HomeTemplate/Plan/Modal';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { colors } from '@style/global-style';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { isPastDate } from '@utils/function';
import { AxiosError } from 'axios';
import { MouseEvent, useCallback, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

type TProps = {
  planId: number;
  userId: number | null;
  selectDate: string;
  isProgress: boolean;
  endDate: string;
};

export const Dots = ({ planId, userId, selectDate, isProgress, endDate }: TProps) => {
  const [isOpen, setOpen] = useState<number | null>(null);
  const [isEditModal, setIsEditModal] = useState(false);
  const dispatch = useDispatch();
  const { setValue } = useFormContext<TRegisterFormValue>();

  const handleClose = useCallback(() => {
    setOpen(null);
  }, [setOpen]);

  const handleClickOpenModal = useCallback(
    (e: MouseEvent<SVGElement>) => {
      e.stopPropagation();
      setOpen((prev) => (prev === planId ? null : planId));
    },
    [planId]
  );

  const handleClickOpenEdit = useCallback(() => {
    // 여기서 수정하기 모달 열기
    setValue('endDate', endDate);
    setIsEditModal(true);
  }, [endDate, setValue]);

  // 플랜삭제
  const handleClickRemove = useCallback(
    (planId: number, userId: number | null) => () => {
      if (userId === null) return;

      Alert.confirm({
        title: '이 플랜을 정말 삭제할까요?',
        text: '* 삭제된 플랜은 마이페이지에서 2주동안 보관됩니다.',
        action: async (result) => {
          if (result.isConfirmed) {
            try {
              const result = await axiosFetch({
                url: `api/plan/${planId}`,
                method: 'delete',
                options: {
                  data: { userId }
                }
              });

              if (result.status === 200) {
                Alert.success({
                  title: '삭제되었습니다!',
                  action: () => {
                    dispatch(deletePlanData(planId));
                    setOpen(null);
                  }
                });
              }
            } catch (e) {
              if (e instanceof AxiosError) {
                Alert.error({ title: convertError(e.response?.data.message) });
              }
            }
          }
        }
      });
    },
    []
  );

  return (
    <Wrap>
      <IconReact
        iconKey="dots"
        size={25}
        color={colors.darkGray}
        cursor={'pointer'}
        onClick={handleClickOpenModal}
      />
      <MiniModal className="dots" isOpen={isOpen === planId} handleClick={handleClose}>
        <Button onClick={handleClickRemove(planId, userId)}>삭제</Button>
        {(isProgress || isPastDate(new Date(), selectDate)) && (
          <Button onClick={handleClickOpenEdit}>수정</Button>
        )}
      </MiniModal>

      <PlanModalTemplate
        isOpen={isEditModal}
        setIsOpen={setIsEditModal}
        modalIndex={1}
        planId={planId}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
  width: 54px;
`;

const Button = styled.button`
  width: 44px;
  height: 21px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.basicDark};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
`;
