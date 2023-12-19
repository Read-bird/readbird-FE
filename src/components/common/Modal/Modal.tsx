import { Dispatch, ReactNode, SetStateAction, useCallback, useMemo } from 'react';
import ReactModal from 'react-modal';
import { CSSProperties } from 'styled-components';

ReactModal.setAppElement('#root');

type TProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  content?: CSSProperties;
  overlay?: CSSProperties;
  contentLabel?: string;
};

export const Modal = ({
  isOpen,
  setIsOpen,
  children,
  content,
  overlay,
  contentLabel = 'Modal'
}: TProps) => {
  const customStyles = useMemo(
    () => ({
      overlay: Object.assign(
        {
          background: '#00000040',
          zIndex: 100
        },
        overlay
      ),
      content: Object.assign(
        {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          borderRadius: '20px'
        },
        content
      )
    }),
    [content, overlay]
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <ReactModal
      // 오픈여부
      isOpen={isOpen}
      // 모달 외부를 클릭했을 때 닫힘
      onRequestClose={closeModal}
      // 스타일
      style={customStyles}
      // 어떤 모달인지 naming
      contentLabel={contentLabel}
    >
      {children}
    </ReactModal>
  );
};
