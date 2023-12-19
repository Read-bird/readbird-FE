import styled from "styled-components";
import React, {ChangeEvent, Dispatch, SetStateAction, SyntheticEvent, useState} from "react";

type TProps = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    onConfirm?: any;
}

export const ReadLessModal = ({
                                  setIsOpen,
                                  onConfirm,
                              }: TProps) => {

    const [page, setPage] = useState<string>("");
    const [isError, setIsError] = useState<Boolean>(false);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === "page"){
            setPage(e.target.value);
        }
    }

    const handleConfirm = () => {
        if(!isNaN(Number(page))){
            setIsError(false);
            onConfirm(page);
        }else{
            setIsError(true);
        }
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return(
        <StyledModal>
            <p>아쉬워요... 어디까지 읽으셨나요?</p>
            <div style={{marginTop: "10px"}}>
                <input
                    type="text"
                    name="page"
                    value={page}
                    onChange={handleInput}
                />
                <span> 쪽 까지 읽었어요</span>
            </div>
            {isError && <small role="alert">* 읽은 쪽을 다시 입력해주세요.</small>}

            <div className="flex" style={{marginTop: "10px"}}>
                <button type="button" className="btn-1 btn" onClick={handleClose}>취소</button>
                <button type="submit" className="btn-2 btn" onClick={handleConfirm}>확인</button>
            </div>
        </StyledModal>
    )
}

const StyledModal = styled.div`
  text-align: center;
  p{
    color: #B780DB;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.16px;
    margin-top: 10px;
  }
  input{
    width: 72px;
    border-radius: 8px;
    border: 1px solid #AFB1B6;
    background: #FFF;
    color: #000;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.16px;
    padding: 3px 16px;
  }

  small[role="alert"]{
    font-size: 12px;
    color: #FF7C7C;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.2px;

  }
  span{
    color: #ABABAB;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.16px;
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
