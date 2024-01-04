import { clearUserInfo, setAccessToken, setUserInfo } from '@/store/reducers';
import { axiosFetch } from '@api/axios';
import { TLoginResType } from '@api/types';
import { BtnKakaoLogin } from '@assets/images/BtnKakaoLogin';
import { Alert } from '@utils/Alert';
import { convertError } from '@utils/errors';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type TProps = {
  className: string;
};

export const LoginBtn = (props: TProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const REST_API_KEY: string | undefined = process.env.REACT_APP_KAKAO_API_KEY;
  const redirectUri: string = process.env.REACT_APP_REDIRECT_URL + '/login/auth';
  const kakaoURL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code`;

  const handleClick = () => {
    window.location.href = kakaoURL;
  };

  const handleClickGuest = async () => {
    try {
      const res = await axiosFetch<any, TLoginResType>({
        url: `/api/user/login-guest`,
        method: 'post'
      });

      if (res.status === 200) {
        const extractedToken = res.headers?.authorization;
        const refreshToken = res.headers?.refreshtoken;
        localStorage.setItem('rb-access-token', extractedToken);
        localStorage.setItem('rb-refresh-token', refreshToken);
        dispatch(
          setUserInfo({
            id: res.data.userId,
            email: res.data.email,
            nickname: res.data.nickname,
            profile: res.data.imageUrl
          })
        );
        dispatch(setAccessToken(extractedToken));
      } else {
        Alert.error({
          title: '로그인 오류가 발생했습니다.',
          action: () => {
            dispatch(clearUserInfo());
            localStorage.clear();
          }
        });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({
          title: convertError(e.response?.data.message),
          action: () => {
            dispatch(clearUserInfo());
            localStorage.clear();
          }
        });
      }
    } finally {
      navigate('/');
    }
  };

  return (
    <StyledBtn className={props.className}>
      <button type="button" title="카카오 로그인" onClick={handleClick}>
        <BtnKakaoLogin />
      </button>
      <button type="button" className="guest-btn" onClick={handleClickGuest}>
        게스트 체험하기
      </button>
    </StyledBtn>
  );
};

const StyledBtn = styled.div`
  width: 100%;
  text-align: center;

  button {
    cursor: pointer;
  }
  button.guest-btn {
    margin-top: 20px;
    color: #ababab;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.16px;
    text-decoration-line: underline;
  }
`;
