import { IconArrRightGray } from '@/assets';
import { setAccessToken } from '@/store/reducers';
import { Alert, FootHeight, HeadHeight, convertError } from '@/utils';
import { axiosFetch } from '@api/axios';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const MyMenu = () => {
  const myPageMenu = [
    {
      title: '나의서재',
      path: '/library'
    },
    {
      title: '나의도감',
      path: '/encyclopedia'
    },
    {
      title: '플랜복원',
      path: '/restore'
    },
    {
      title: '로그아웃',
      path: '/logout'
    },
    {
      title: '회원탈퇴',
      path: '/withdrawal'
    }
  ];
  const listHeight = useMemo(() => {
    const doc = document.querySelector('#root') as HTMLElement;
    const scrollHeight = doc.scrollHeight;
    const bodyHeight = 95;
    const height = scrollHeight - (HeadHeight + FootHeight + bodyHeight);
    return { height: `${height}px` };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isWithdrawal, setIsWithdrawal] = useState(false);

  const handleClick = (path: string) => {
    if (path === '/logout') {
      dispatch(setAccessToken(''));
      navigate('/login');
      localStorage.clear();
    } else if (path === '/withdrawal') {
      setIsWithdrawal(true);
    } else {
      navigate(`/mypage${path}`);
    }
  };

  const handleWithdrawal = async () => {
    try {
      const res = await axiosFetch({
        url: '/api/user/secession',
        method: 'delete'
      });

      if (res.status === 200) {
        Alert.success({
          title: '정상적으로 탈퇴처리되었습니다.',
          action: () => {
            localStorage.clear();
            setIsWithdrawal(false);
            dispatch(setAccessToken(''));
            navigate('/login');
          }
        });
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        Alert.error({ title: convertError(e.response?.data.message) });
      }
    }
  };

  return (
    <StyledMenu style={listHeight}>
      {myPageMenu?.map((item, key) => (
        <li key={key} onClick={() => handleClick(item?.path)}>
          <span>{item.title}</span>
          <IconArrRightGray />
        </li>
      ))}

      <PlanModalTemplate
        isOpen={isWithdrawal}
        setIsOpen={setIsWithdrawal}
        modalIndex={9}
        modalText={'회원 탈퇴 시 회원님의\n' + '사용 기록 및 계정이 삭제됩니다.'}
        modalSubText={'회원 탈퇴하시겠습니까?'}
        buttonType={2}
        onConfirm={handleWithdrawal}
      />
    </StyledMenu>
  );
};

const StyledMenu = styled.ul`
  width: 100%;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 10px;
    cursor: pointer;
    transition: 0.2s;
    border-radius: 8px;
    &:hover {
      background-color: #e3ccf280;
    }
    span {
      color: #000;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.16px;
    }
  }
`;
