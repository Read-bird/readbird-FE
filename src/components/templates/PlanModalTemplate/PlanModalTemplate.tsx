import { Modal } from '@components/common/Modal';
import { CharacterModal } from '@components/templates/PlanModalTemplate/CharacterModal';
import { RegisterModal } from '@components/templates/PlanModalTemplate/RegisterModal';
import { SimpleModal } from '@components/templates/PlanModalTemplate/SimpleModal';
import { Dispatch, SetStateAction } from 'react';

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modalIndex: number;
  modalText?: string;
  modalSubText?: string;
  buttonType?: number;
  onConfirm?: any;
  planId?: number;
  isRestore?: boolean;
};

// modalIndex
// 1 ---> 플랜 등록 모달
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
  planId,
  isRestore = false
}: TProps) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      content={{
        width: '368px'
      }}
    >
      {modalIndex === 1 && (
        <RegisterModal setIsOpen={setIsOpen} planId={planId} isRestore={isRestore} />
      )}
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
