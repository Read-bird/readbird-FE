import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {IconArrRightGray} from "@/assets";

export const MyMenu = () => {

    const myPageMenu = [
        {
            title: "나의 서재",
            path: "/library"
        },
        {
            title: "나의 도감",
            path: "/encyclopedia"
        },
        {
            title: "기록 초기화",
            path: "/reset"
        },
        {
            title: "플랜 복원",
            path: "/restore"
        },
        {
            title: "로그아웃",
            path: "/logout"
        },
        {
            title: "회원 탈퇴",
            path: "/withdrawal"
        },
    ]
    const navigate = useNavigate();


    return(
        <StyledMenu>
            {myPageMenu?.map((item, key) => (
                <li key={key} onClick={() => navigate(`/mypage${item.path}`)}>
                    <span>{item.title}</span>
                    <IconArrRightGray />
                </li>
            ))}
        </StyledMenu>
    )
}

const StyledMenu = styled.ul`
    margin-top: 20px;
  width: 100%;
  li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    cursor: pointer;
    transition: .2s;
    border-radius: 8px;
    &:hover{
      background-color: #E3CCF280;
    }
    span{
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.16px;
    }
  }
`
