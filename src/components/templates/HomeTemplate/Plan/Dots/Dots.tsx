import { deletePlanData } from '@/store/reducers';
import { axiosFetch } from '@api/axios';
import { IconReact } from '@assets/icons';
import { MiniModal } from '@components/templates/HomeTemplate/Plan/Modal';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { colors } from '@style/global-style';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { MouseEvent, useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

type TProps = {
  planId: number;
  userId: number | null;
  selectDate: string;
  isProgress: boolean;
};

export const Dots = ({ planId, userId, selectDate, isProgress }: TProps) => {
  const [isOpen, setOpen] = useState<number | null>(null);
  const isSame = useMemo(() => dayjs(selectDate).isSame(new Date(), 'date'), [selectDate]);
  const [isEditModal, setIsEditModal] = useState(false);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    setOpen(null);
  }, [setOpen]);

  const handleClickOpenModal = useCallback(
    (e: MouseEvent<SVGElement>) => {
      e.stopPropagation();

      if (isSame && isProgress) {
        setOpen((prev) => (prev === planId ? null : planId));
      }
    },
    [planId, isSame, isProgress]
  );

  const handleClickOpenEdit = useCallback(() => {
    // 여기서 수정하기 모달 열기
    setIsEditModal(true);
  }, []);

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
        cursor={isSame && isProgress ? 'pointer' : 'default'}
        onClick={handleClickOpenModal}
      />
      <MiniModal isOpen={isOpen === planId} handleClick={handleClose}>
        <Button onClick={handleClickOpenEdit}>수정</Button>
        <Button onClick={handleClickRemove(planId, userId)}>삭제</Button>
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
`;

const Button = styled.button`
  width: 42px;
  height: 28px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.basicDark};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  cursor: pointer;
`;
