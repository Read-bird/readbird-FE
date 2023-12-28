import { TRootState } from '@/store/state';
import { Images } from '@assets/images';
import { ReactSlider } from '@components/common/Slider';
import { Spacing } from '@components/common/Spacing';
import dayjs from 'dayjs';
import { Dispatch, Fragment, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

type TPops = {
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  handleClose?: () => void;
};

export const CharacterModal = ({ setIsOpen, handleClose }: TPops) => {
  const { selectCollections } = useSelector((state: TRootState) => state.collectionStore);

  const handleConfirm = () => {
    setIsOpen?.(false);
    handleClose?.();
  };

  return (
    <StyledModal>
      <ReactSlider width="100%">
        {selectCollections?.map((data) => (
          <div className="encyclopediaList">
            {data.title && (
              <Fragment>
                <h2>{data.title}</h2>
                <Spacing height={20} />
              </Fragment>
            )}
            <div className="img-wrap">
              <Images imgUrl={data.imageUrl} imgAlt={data.name} />
            </div>
            <Spacing height={15} />
            <div className="info-wrap">
              <h4>{data.name}</h4>
              <p>{data.content}</p>
              <span>획득일 : {dayjs(data.getDate).format('YYYY / MM / DD')}</span>
              {data.title && <i>* 부화한 새는 마이 페이지에서 확인 가능해요.</i>}
            </div>
            {data.description && (
              <Fragment>
                <Spacing height={20} />
                <p className="description">{data.description}</p>
              </Fragment>
            )}
          </div>
        ))}
      </ReactSlider>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .slick-dots {
    bottom: -20px;
  }

  .encyclopediaList {
    display: flex !important;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h2 {
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.basicDark};
    max-width: 240px;
    text-align: center;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .description {
    font-size: 22px;
    font-weight: 700;
    white-space: pre-wrap;
    text-align: center;
    max-width: 240px;
    color: ${({ theme }) => theme.colors.darkGray};
  }

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
    margin: 0 auto;

    img {
      max-width: 220px;
    }
  }

  .info-wrap {
    display: flex;
    flex-direction: column;

    h4 {
      color: ${({ theme }) => theme.colors.basicDark};
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

    i {
      font-size: 14px;
      font-weight: 500;
      color: #cfcfcf;
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
