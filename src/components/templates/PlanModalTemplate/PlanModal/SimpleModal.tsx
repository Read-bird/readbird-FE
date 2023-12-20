import React, {Dispatch, SetStateAction} from "react";
import styled from "styled-components";

type TProps = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    buttonType?: number;
    modalText?: string;
    modalSubText?: string;
    onConfirm?: any;
}

export const SimpleModal = ({
                                setIsOpen,
                                buttonType,
                                modalText,
                                modalSubText,
                                onConfirm
                            }: TProps) => {

    const handleClose = () => {
        setIsOpen(false);
    }

    return(
        <StyledModal>
            <p>{modalText}</p>
            <span>{modalSubText}</span>

            <div className="flex" style={{marginTop: "10px"}}>
                {buttonType === 2 && <button type="button" className="btn-1 btn" onClick={handleClose}>취소</button>}
                <button type="submit" className="btn-2 btn" onClick={onConfirm}>확인</button>
            </div>
        </StyledModal>
    )
}

const StyledModal = styled.div`
  text-align: center;
  p{
    color: #000;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.16px;
    margin-top: 10px;
    white-space: pre;
  }
  span{
    color: #ABABAB;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.16px;
    display: block;
    margin-top: 4px;
  }

  .flex{
    display: flex;
    gap: 15px;
  }

  .btn {
    margin-top: 25px;
    border-radius: 10px;
    padding: 12px 0;
    width: 100%;
    color: #FFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }

  .btn-1 {
    background: #CFCFCF;
  }

  .btn-2 {
    background: #B780DB;
  }
`
