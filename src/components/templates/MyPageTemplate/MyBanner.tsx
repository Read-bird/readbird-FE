import styled from "styled-components";
import {Alert} from "@/utils";

export const MyBanner = () => {

    const handleClick = () => {
        Alert.warning({
            title: "아직 준비중이에요."
        })
    }

    return(
        <StyledBanner onClick={handleClick}></StyledBanner>
    )
}

const StyledBanner = styled.div`
  margin-top: 9px;
  border-radius: 50px;
  border: 2px solid #ABABAB;
  background: #EFEFF0;
  width: 366px;
  height: 70px;
  cursor: pointer;
`
