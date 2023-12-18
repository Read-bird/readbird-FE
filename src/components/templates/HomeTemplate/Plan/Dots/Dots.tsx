import { TRootState } from '@/store/state';
import { deletePlan } from '@api/plan';
import { IconReact } from '@assets/icons';
import { MiniModal } from '@components/templates/HomeTemplate/Plan/Modal';
import { colors } from '@style/global-style';
import { Alert } from '@utils/Alert';
import { MouseEvent, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

type TProps = {
  planId: number;
};

export const Dots = ({ planId }: TProps) => {
  const [isOpen, setOpen] = useState<number | null>(null);
  const { userId } = useSelector((state: TRootState) => state.userStore);

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
    setOpen(null);
  }, []);

  const handleClickRemove = useCallback(
    (planId: number, userId: number | null) => () => {
      if (userId === null) return;

      Alert.confirm({
        title: '이 플랜을 정말 삭제할까요?',
        text: '* 삭제된 플랜은 마이페이지에서 2주동안 보관됩니다.',
        action: async (result) => {
          if (result.isConfirmed) {
            const result = await deletePlan(planId, userId);
            if (result.success) {
              Alert.success({ title: '삭제되었습니다!' });
            } else {
              Alert.error({ title: `${result.data.replace('Bad Request :', '')}` });
            }
            setOpen(null);
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
        cursor="pointer"
        onClick={handleClickOpenModal}
      />
      <MiniModal isOpen={isOpen === planId} handleClick={handleClose}>
        <Button onClick={handleClickOpenEdit}>수정</Button>
        <Button onClick={handleClickRemove(planId, userId)}>삭제</Button>
      </MiniModal>
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
