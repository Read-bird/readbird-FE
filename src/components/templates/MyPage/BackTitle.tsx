import styled from "styled-components";
import {IconArrLeftWhite} from "@/assets";
import {useNavigate} from "react-router-dom";

type TProps = {
    title: string;
}

export const BackTitle = ({title}: TProps) => {

    const navigate = useNavigate();

    return(
        <StyledTitle>
            <span onClick={() => navigate(-1)}><IconArrLeftWhite /></span>
            <h2>{title}</h2>
        </StyledTitle>
    )
}

const StyledTitle = styled.div`
    position: relative;
  width: 100%;
  text-align: center;
  span{
    position: absolute;
    left: 22px; top: 0;
    cursor: pointer;
  }
  h2{
    color: #FFF;
    text-align: center;
    font-size: 22px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.16px;
  }
`
