import { TRootState } from '@/store/state';
import { Images } from '@assets/images';
import { Spacing } from '@components/common/Spacing';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

type TPops = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const CharacterModal = ({ setIsOpen }: TPops) => {
  const { selectCollection } = useSelector((state: TRootState) => state.collectionStore);

  const handleConfirm = () => {
    setIsOpen(false);
  };

  return (
    <StyledModal>
      <div className="img-wrap">
        <Images
          imgUrl={selectCollection?.imageUrl}
          imgAlt={selectCollection?.name}
          imgWidth={160}
          imgHeight={155}
        />
      </div>
      <Spacing height={15} />
      <div className="info-wrap">
        <h4>{selectCollection?.name}</h4>
        <p>{selectCollection?.content}</p>
        <span>획득일 : {dayjs(selectCollection?.getDate).format('YYYY / MM / DD')}</span>
      </div>
      <Spacing height={20} />
      <div className="flex">
        <button className="btn-2 btn" onClick={handleConfirm}>
          확인
        </button>
      </div>
    </StyledModal>
  );
};

const StyledModal = styled.div`
  width: 100%;
  height: 430px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .img-wrap {
    width: 253px;
    height: 253px;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.darkGray};
    background-color: ${({ theme }) => theme.colors.basic};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .info-wrap {
    display: flex;
    flex-direction: column;

    h4 {
      color: #b780db;
      text-align: center;
      font-size: 22px;
      font-style: normal;
      font-weight: 700;
      line-height: 28px;
      letter-spacing: 0.088px;
    }
    p {
      color: #ababab;
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.16px;
    }
    span {
      color: #cfcfcf;
      text-align: center;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.16px;
    }
  }

  .btn {
    border-radius: 10px;
    padding: 12px 0;
    width: 253px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }

  .btn-1 {
    background: #cfcfcf;
  }

  .btn-2 {
    background: #b780db;
  }
`;
