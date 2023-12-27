import { setOpen } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { Modal } from '@components/common/Modal';
import { CharacterModal, ReadLessModal } from '@components/templates/PlanModalTemplate';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const CheckModal = () => {
  const { isOpen, openType } = useSelector((state: TRootState) => state.modalStore);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(setOpen(false));
  }, [dispatch]);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      content={{
        width: '368px'
      }}
    >
      {openType === 4 && <CharacterModal handleClose={handleClose} />}
      {openType === 3 && <ReadLessModal handleClose={handleClose} />}
    </Modal>
  );
};
