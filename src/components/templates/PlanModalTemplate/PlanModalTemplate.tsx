import {Dispatch, Fragment, ReactNode, SetStateAction} from "react";
import {RegisterModal} from "@components/templates/PlanModalTemplate/Register";
import styled, {CSSProperties} from "styled-components";
import ReactModal from "react-modal";
import {Modal} from "@components/common/Modal";

type TProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	modalIndex: number
};

// modalIndex
// 1 ---> 플랜 등록 모달
// 2 ---> 플랜 달성 실패 모달
// 9 ---> 단순 확인 모달

export const PlanModalTemplate = ({
	isOpen,
	setIsOpen,
	modalIndex
}: TProps) => {

	return (
		<Modal
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			content={{
				width: "368px"
			}}
		>
			{modalIndex === 1 &&
				<RegisterModal
					setIsOpen={setIsOpen}
				/>
			}
		</Modal>
	);
};
