import {Plan} from "@components/templates/HomeTemplate/Plan";
import {useSelector} from "react-redux";
import {TRootState} from "@/store/state";
import styled from "styled-components";
import {authFetch} from "@api/axios";
import {useEffect, useState} from "react";
import {TPlan} from "@api/types";

type TProps = TPlan;

export const MyRestoreList = () => {

    const { currentDate, planData, weedRecord } = useSelector((state: TRootState) => state.planStore);
    const [restoreList, setRestoreList] = useState([]);

    console.log(planData);

    const getRestoreList = async () => {
        try{
            const res = await authFetch.get("/api/user/plan/delete");
            if(res.status === 200){
                console.log(res.data)
                setRestoreList(res?.data);
            }
        }catch (err){

        }
    }

    useEffect(() => {
        getRestoreList();
    }, []);

    return(
        <StyledUl>
            <ul>
                {restoreList.map((plan: TProps) => (
                    <li key={plan?.planId}>
                        {/*<Plan*/}
                        {/*    coverImage={plan["Book.coverImage"]}*/}
                        {/*    title={plan["Book.title"]}*/}
                        {/*    target={plan["Book.target"]}*/}
                        {/*    totalPage={plan["Book.totalPage"]}*/}
                        {/*    currentPage={plan["Book.currentPage"]}*/}
                        {/*    planId={plan["Book.coverImage"]}*/}
                        {/*    endDate={plan["Book.coverImage"]}*/}
                        {/*    recordStatus={plan["Book.coverImage"]}*/}
                        {/*/>*/}
                    </li>
                ))}
            </ul>
        </StyledUl>
    )
}

const StyledUl = styled.div`
    margin-top: 36px;
  width: 100%;
  display: flex;
  justify-content: center;
  ul{
    flex: 1;
    width: 100%;
    max-width: 364px;
    //overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
