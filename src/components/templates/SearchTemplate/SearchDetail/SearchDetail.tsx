import { TBook, setBookDetail } from '@/store/reducers';
import { TAppDispatch } from '@/store/state';
import { IconReact, IconReady } from '@assets/icons';
import { Images } from '@assets/images';
import { Spacing } from '@components/common/Spacing';
import { PlanModalTemplate } from '@components/templates/PlanModalTemplate';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ButtonWrap, FlexBox, IconWrap, Inner, Wrap, imgStyle } from './Styled';

type TProps = TBook;

export const SearchDetail = (props: TProps) => {
  const { coverImage, title, author, publisher, description, isbn, totalPage } = props;
  const dispatch = useDispatch<TAppDispatch>();
  const [isOpen, setOpen] = useState(false);

  const handleClickBack = useCallback(() => {
    dispatch(setBookDetail(null));
  }, [dispatch]);

  const handleClickOpenModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <Wrap>
      <Spacing height={50} />
      <Inner>
        <h1>도서정보</h1>
        <IconWrap onClick={handleClickBack}>
          <IconReact iconKey="arrow_left" size={25} />
        </IconWrap>
        <Spacing height={10} />
        <Images
          imgUrl={coverImage}
          imgAlt={`${title} 책 표지`}
          imgWidth={150}
          imgHeight={200}
          imgStyle={imgStyle}
        />
        <Spacing height={15} />
        <h2>{title}</h2>
        <Spacing height={15} />
        <FlexBox>
          <div className="info-wrap">
            <h3>글쓴이</h3>
            <span>{author}</span>
          </div>
          <div className="info-wrap">
            <h3>출판사</h3>
            <span>{publisher}</span>
          </div>
          <div className="info-wrap">
            <h3>총 쪽 수</h3>
            <span>{totalPage.toLocaleString()}쪽</span>
          </div>
        </FlexBox>
        <Spacing height={20} />
        <div className="info-wrap">
          <h3>ISBM</h3>
          <span>{isbn}</span>
        </div>
        <Spacing height={20} />
        <div className="info-wrap">
          <h3>책 소개</h3>
        </div>
        <Spacing height={16} />
        <p className="last-wrap">{description}</p>
        <Spacing height={16} />
      </Inner>
      <ButtonWrap>
        <button type="button" className="btn-buy">
          구매하기
          <div className="icon-wrap">
            <IconReady />
          </div>
        </button>
        <button type="button" className="btn-plan" onClick={handleClickOpenModal}>
          플랜등록
        </button>
      </ButtonWrap>
      <PlanModalTemplate isOpen={isOpen} setIsOpen={setOpen} modalIndex={1} />
    </Wrap>
  );
};
