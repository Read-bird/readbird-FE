import { TResponseMyRestore } from '@api/types';
import { Images } from '@assets/images';
import { ProgressBar } from '@components/common/ProgressBar';
import styled from 'styled-components';

type TProps = TResponseMyRestore;

export const RestoreBook = (props: TProps) => {
  const { coverImage, title, endDate, planId, currentPage, totalPage } = props;
  return (
    <Wrap>
      <ImageWrap>
        <Images
          imgUrl={coverImage ?? undefined}
          imgAlt={`${title.padEnd(10, '')} 책 표지 이미지`}
          imgWidth={55}
          imgHeight={78}
          imgStyle={imgStyle}
        />
      </ImageWrap>
      <ProgressWrap>
        <div>
          <FlexBox>
            <span className="book-name">{title}</span>
          </FlexBox>
          <FlexBox $justifyContent="flex-start">
            <span className="book-page">
              {currentPage}쪽 ~ {totalPage}쪽
            </span>
          </FlexBox>
        </div>
        <div>
          <ProgressBar
            id={`plan${planId}`}
            value={Math.floor((currentPage / totalPage) * 100)}
            max={100}
          />
          <RestoreButton>복구</RestoreButton>
        </div>
      </ProgressWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.basic};
  padding: 10px;

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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 155px;
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
`;
