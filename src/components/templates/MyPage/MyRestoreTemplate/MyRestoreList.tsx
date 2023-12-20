import {Plan} from "@components/templates/HomeTemplate/Plan";
import {useSelector} from "react-redux";
import {TRootState} from "@/store/state";
import styled from "styled-components";

export const MyRestoreList = () => {

    const { currentDate, planData, weedRecord } = useSelector((state: TRootState) => state.planStore);

    return(
        <StyledUl>
            <ul>
                {planData.map((plan) => (
                    <li key={plan.planId}>
                        <Plan {...plan} />
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
