import { Alert } from '@/utils';
import styled from 'styled-components';

export const MyBanner = () => {
  const handleClick = () => {
    Alert.warning({
      title: '아직 준비중이에요.'
    });
  };

  return <StyledBanner onClick={handleClick}></StyledBanner>;
};

const StyledBanner = styled.div`
  border-radius: 25px;
  border: 2px solid #ababab;
  background: #efeff0;
  width: 100%;
  height: 70px;
  cursor: pointer;
`;
