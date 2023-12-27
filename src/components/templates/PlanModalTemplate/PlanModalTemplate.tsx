import { Modal } from '@components/common/Modal';
import { SimpleModal } from '@components/templates/PlanModalTemplate/PlanModal';
import { RegisterModal } from '@components/templates/PlanModalTemplate/Register/RegisterModal';
import { Dispatch, SetStateAction } from 'react';
import {
  CharacterModal,
  ReadLessModal
} from 'src/components/templates/PlanModalTemplate/PlanModal';

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIndex: number;
  modalText?: string;
  modalSubText?: string;
  buttonType?: number;
  onConfirm?: any;
  isEdit?: any;
  planId?: number;
};

// modalIndex
// 1 ---> 플랜 등록 모달
// 2 ---> 플랜 달성 실패 모달
// 3 ---> 덜 읽음 모달
// 4 ---> 도감 캐릭터 모달
// 9 ---> 단순 확인/취소 모달

export const PlanModalTemplate = ({
  isOpen,
  setIsOpen,
  modalIndex,
  modalText,
  modalSubText,
  buttonType,
  onConfirm,
  planId
}: TProps) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={{
        width: '368px'
      }}
    >
      {modalIndex === 1 && <RegisterModal setIsOpen={setIsOpen} planId={planId} />}
      {modalIndex === 3 && <ReadLessModal setIsOpen={setIsOpen} onConfirm={onConfirm} />}
      {modalIndex === 4 && <CharacterModal setIsOpen={setIsOpen} />}
      {modalIndex === 9 && (
        <SimpleModal
          setIsOpen={setIsOpen}
          modalText={modalText}
          modalSubText={modalSubText}
          buttonType={buttonType}
          onConfirm={onConfirm}
        />
      )}
    </Modal>
  );
};
