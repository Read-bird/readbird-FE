import {LoginBtn} from "@components/templates/LoginTemplate/LoginBtn";
import {MainLogo} from "@assets/images/MainLogo";
import styled from "styled-components";

type TProps = {};

export const LoginTemplate = (props: TProps) => {
    return (
        <StyledWrapper>
            <div className="logo-wrap">
                <MainLogo/>
            </div>
            <h1>읽어보새</h1>
            <p>Reading Books, Breeding Birds<br/>책 읽고, 키우고, 날아보자!</p>
            <LoginBtn className={"kakao-btn"} />
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
  text-align: center;

  .logo-wrap {
    padding-top: 200px;
  }

  h1 {
    color: var(--stroke-color, #B780DB);
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
    margin-top: 30px;
  }

  p {
    color: var(--stroke-color, #B780DB);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.16px;
  }
  .kakao-btn{
    margin-top: 160px;
  }
`;
