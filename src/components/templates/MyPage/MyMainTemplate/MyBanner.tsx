import styled from 'styled-components';

export const MyBanner = () => {
  const handleClick = () => {
    window.open(process.env.REACT_APP_EVENT_URL, '_blank');
  };

  return (
    <StyledBanner onClick={handleClick}>
      <img src={process.env.REACT_APP_EVENT_BANNER} alt="배너" />
    </StyledBanner>
  );
};

const StyledBanner = styled.div`
  width: 100%;
  max-width: 360px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
