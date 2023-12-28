import { setOpen, setOpenType } from '@/store/reducers';
import { TRootState } from '@/store/state';
import { Modal } from '@components/common/Modal';
import { CharacterModal, ReadLessModal } from '@components/templates/PlanModalTemplate';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const CheckModal = () => {
  const { isOpen, openType } = useSelector((state: TRootState) => state.modalStore);
  const { previouslyFailedPlan } = useSelector((state: TRootState) => state.planStore);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(setOpen(false));
    dispatch(setOpenType(null));
  }, [dispatch]);

  useEffect(() => {
    if (previouslyFailedPlan.length) {
      dispatch(setOpen(true));
      dispatch(setOpenType('failedPlan'));
    }
  }, [previouslyFailedPlan.length]);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      content={{
        width: '368px'
      }}
    >
      {openType === 'character' && <CharacterModal handleClose={handleClose} />}
      {openType === 'failedPlan' && <ReadLessModal handleClose={handleClose} />}
    </Modal>
  );
};
