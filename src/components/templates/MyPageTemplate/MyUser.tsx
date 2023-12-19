import styled from "styled-components";

export const MyUser = () => {

    const storageInfo: any = localStorage.getItem("rb-user-info");
    const userNick = JSON.parse(storageInfo)?.nickName;
    const userEmail = JSON.parse(storageInfo)?.email;


    return(
        <StyledUserWrap>
            <div className="user-img">
                <img src={"https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA5MjBfMjcw%2FMDAxNjk1MTkyNTk2NzU5.se6L3TYbDZiOH6RU5nEZ6txbZ_C7tJTxpQnnwuySRjYg.vEtVB1n0kWmewRwBlxnsCHU_5B1FoZ6bb7QOqhXnE2Yg.PNG.himelife%2F25.png&type=sc960_832"} alt="user-img" />
            </div>
            <div className="user-info">
                <h4>{userNick}</h4>
                <h5>{userEmail}</h5>
            </div>
        </StyledUserWrap>
    )
}

const StyledUserWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 22px;
    .user-img{
      width: 45px;
      height: 45px;
      border-radius: 16px;
      background: #FFF;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  
  .user-info{
    margin-left: 10px;
    h4{
      color: #FFF;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: 0.16px;
    }
    h5{
      margin-top: 4px;
      color: #FFF;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: 0.16px;
    }
  }
`
