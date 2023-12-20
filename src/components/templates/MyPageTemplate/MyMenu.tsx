import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {IconArrRightGray} from "@/assets";
import {useState} from "react";
import {PlanModalTemplate} from "@components/templates/PlanModalTemplate";
import {Alert} from "@/utils";
import {authFetch} from "@api/axios";

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
    const [isReset, setIsReset] = useState(false);
    const [isWithdrawal, setIsWithdrawal] = useState(false);

    const handleClick = (path: string) => {
        if(path === "/logout"){
            navigate("/login");
            localStorage.clear();
        }else if(path === "/reset"){
            setIsReset(true);
        }else if(path === "/withdrawal"){
            setIsWithdrawal(true);
        }else{
            navigate(`/mypage${path}`);
        }
    }

    const handleReset = async () => {
        try{
            const res = await authFetch.delete("/api/user/plan/delete");
            if(res.status === 200) {
                setIsReset(false);
                Alert.success({
                    title: "모든 기록이 초기화되었습니다."
                })
            }else{
                Alert.error({
                    title: "오류가 발생했습니다."
                })
            }
        }catch (err: any){
            Alert.error({
                title: `${err.message}`
            });
        }
    }

    return(
        <StyledMenu>
            {myPageMenu?.map((item, key) => (
                <li key={key} onClick={() => handleClick(item?.path)}>
                    <span>{item.title}</span>
                    <IconArrRightGray />
                </li>
            ))}

            <PlanModalTemplate
                isOpen={isReset}
                setIsOpen={setIsReset}
                modalIndex={9}
                modalText={"기록 초기화 시 회원님의\n" + "도감, 기록, 서재가 초기화됩니다."}
                modalSubText={"초기화하시겠습니까?"}
                buttonType={2}
                onConfirm={handleReset}
            />
            <PlanModalTemplate
                isOpen={isWithdrawal}
                setIsOpen={setIsWithdrawal}
                modalIndex={9}
                modalText={"회원 탈퇴 시 회원님의\n" + "사용 기록 및 계정이 삭제됩니다."}
                modalSubText={"회원 탈퇴하시겠습니까?"}
                buttonType={2}
            />
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
