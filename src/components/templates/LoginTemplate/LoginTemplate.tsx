import { LoginMainBird, MainLogo } from '@assets/images';
import { Spacing } from '@components/common/Spacing';
import { LoginBtn } from '@components/templates/LoginTemplate/LoginBtn';
import styled from 'styled-components';

export const LoginTemplate = () => {
  return (
    <StyledWrapper>
      <Spacing height={50} />
      <div className="login-logo">
        <LoginMainBird />
      </div>
      <Spacing height={30} />
      <h1>읽어보새</h1>
      <p>
        Reading Books, Breeding Birds
        <br />책 읽고, 키우고, 날아보자!
      </p>
      <Spacing height={15} />
      <div className="main-logo">
        <MainLogo />
      </div>
      <Spacing height={80} />
      <LoginBtn className={'kakao-btn'} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 750px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .login-logo {
    transform: scale(0.9);
  }

  .main-logo {
    min-height: 28px;
  }

  h1 {
    color: var(--stroke-color, #b780db);
    text-align: center;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px;
  }

  p {
    color: var(--stroke-color, #b780db);
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.16px;
  }
`;
