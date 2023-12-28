import styled from 'styled-components';

export const MyBanner = () => {
  const handleClick = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSemXs84Y7kMJ8eRB7qLrcJdFKeHobaGYFgup3MQruE_PVnJDg/viewform',
      '_blank'
    );
  };

  return (
    <StyledBanner onClick={handleClick}>
      <img
        src={'https://readbird2.s3.ap-northeast-2.amazonaws.com/readbird/google_form_banner.png'}
        alt="배너"
      />
    </StyledBanner>
  );
};

const StyledBanner = styled.div`
  border-radius: 25px;
  border: 2px solid #ababab;
  background: #efeff0;
  width: 100%;
  height: 70px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
