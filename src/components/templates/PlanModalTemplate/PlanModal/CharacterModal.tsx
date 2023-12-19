import React, {Dispatch, SetStateAction} from "react";
import styled from "styled-components";

type TPops = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const CharacterModal = ({
                                   setIsOpen
                               }: TPops) => {

    const handleConfirm = () => {
        setIsOpen(false);
    }

    return(
        <StyledModal>
            <div className="img-wrap">
                <img src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MjBfMjcw%2FMDAxNjk1MTkyNTk2NzU5.se6L3TYbDZiOH6RU5nEZ6txbZ_C7tJTxpQnnwuySRjYg.vEtVB1n0kWmewRwBlxnsCHU_5B1FoZ6bb7QOqhXnE2Yg.PNG.himelife%2F25.png&type=sc960_832" alt="img" />
            </div>
            <div className="info-wrap">
                <h4>캐릭터 이름</h4>
                <p>설명 설명</p>
                <span>획득일 : 2023.11.28</span>
            </div>
            <div className="flex" style={{marginTop: "10px"}}>
                <button type="submit" className="btn-2 btn" onClick={handleConfirm}>확인</button>
            </div>
        </StyledModal>
    )
}

const StyledModal = styled.div`
  text-align: center;
  .img-wrap{
    width: 253px;
    height: 253px;
    border: 1px solid rgba(171, 171, 171, 1);
    border-radius: 50%;
    margin: 0 auto;
    overflow: hidden;
    img{
      width: 100%; height: 100%;
      object-fit: cover;
    }
  }
  .info-wrap{
    margin: 20px;
    h4{
      color: #B780DB;
      text-align: center;
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: 0.088px;
    }
    p{
      color: #ABABAB;
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.16px;
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
  }

  .btn {
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
