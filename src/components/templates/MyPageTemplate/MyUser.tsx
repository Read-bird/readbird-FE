import { TRootState } from '@/store/state';
import { Images } from '@assets/images';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

export const MyUser = () => {
  const { userInfo } = useSelector((state: TRootState) => state.userStore);

  return (
    <StyledUserWrap>
      <div className="user-img">
        <Images
          imgUrl={userInfo?.profile ?? undefined}
          imgAlt={`${userInfo?.nickname}의 이미지`}
          imgWidth={45}
          imgHeight={45}
        />
      </div>
      <div className="user-info">
        <h4>{userInfo?.nickname}</h4>
        <h5>{userInfo?.email}</h5>
      </div>
    </StyledUserWrap>
  );
};

const StyledUserWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding-left: 22px;

  .user-img {
    width: 45px;
    height: 45px;
    border-radius: 16px;
    background: #fff;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .user-info {
    margin-left: 10px;
    h4 {
      color: #fff;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: 0.16px;
    }
    h5 {
      margin-top: 4px;
      color: #fff;
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      letter-spacing: 0.16px;
    }
  }
`;
