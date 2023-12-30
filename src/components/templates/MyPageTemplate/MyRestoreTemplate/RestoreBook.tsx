import { TResponseMyRestore } from '@api/types';
import { Images } from '@assets/images';
import { ProgressBar } from '@components/common/ProgressBar';
import { Spacing } from '@components/common/Spacing';
import { CSSProperties, memo } from 'react';
import { areEqual } from 'react-window';
import styled from 'styled-components';

type TProps = {
  data: {
    list: TResponseMyRestore[];
    handleOpenModal: (restoreData: TResponseMyRestore) => void;
  };
  index: number;
  style: CSSProperties;
};

export const RestoreBook = memo(({ data, index, style }: TProps) => {
  const props = data.list[index];
  const { coverImage, title, planId, currentPage, totalPage } = props;

  const handleClick = () => {
    data.handleOpenModal(props);
  };

  return (
    <div style={style}>
      <Wrap>
        <ImageWrap>
          <Images
            imgUrl={coverImage ?? undefined}
            imgAlt={`${title} 책 표지 이미지`}
            imgWidth={55}
            imgHeight={78}
            imgStyle={imgStyle}
          />
        </ImageWrap>
        <ProgressWrap>
          <div className="book-wrap">
            <FlexBox>
              <span className="book-name">{title}</span>
            </FlexBox>
            <Spacing height={5} />
            <FlexBox $justifyContent="flex-start">
              <span className="book-page">
                {currentPage}쪽 ~ {totalPage}쪽
              </span>
            </FlexBox>
          </div>
          <FlexBox>
            <ProgressBar
              id={`plan${planId}`}
              value={Math.floor((currentPage / totalPage) * 100)}
              max={100}
            />
            <Spacing width={10} />
            <RestoreButton className="active" onClick={handleClick}>
              복구
            </RestoreButton>
          </FlexBox>
        </ProgressWrap>
      </Wrap>
    </div>
  );
}, areEqual);

const Wrap = styled.div`
  width: 100%;
  height: 95px;

  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.basic};
  padding: 10px;
  cursor: default;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const imgStyle = { borderRadius: '10px' };

const ImageWrap = styled.div`
  flex: 0 0 55px;
`;

const ProgressWrap = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const FlexBox = styled.div<{ $justifyContent?: string }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'space-between'};
  align-items: center;

  .book-name {
    font-size: 16px;
    font-weight: 700;
    color: #000000;

    display: -webkit-box;
    overflow: hidden;
    word-break: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .book-page {
    font-size: 14px;
    font-weight: 500;
    color: #747474;
  }

  .book-target {
    font-size: 12px;
    font-weight: 400;
    color: #747474;
  }
`;

const RestoreButton = styled.button`
  width: 53px;
  height: 24px;
  line-height: 24px;
  border: none;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.basicDark};
  font-size: 12px;
  text-align: center;
  color: white;
  cursor: pointer;
`;
