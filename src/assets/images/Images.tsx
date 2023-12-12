import { SyntheticEvent, memo, useCallback } from 'react';
import styled, { CSSObject } from 'styled-components';

type TProps = {
  imgUrl?: string;
  imgAlt?: string;
  imgWidth?: number;
  imgHeight?: number;
  imgKey?: keyof typeof ImageKeys;
  imgStyle?: CSSObject;
};

const ImageKeys = {
  no_image: '' // 여기에 import로 받아온 imgName 넣기 (로컬에서 관리할 img) - 없는 경우 제거
};

export const Images = memo(({ imgUrl, imgAlt, imgWidth, imgHeight, imgKey, imgStyle }: TProps) => {
  const handleError = useCallback((e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = ImageKeys['no_image'];
  }, []);

  return (
    <ImageStyle
      imgStyle={imgStyle}
      src={imgKey ? ImageKeys[imgKey] : imgUrl}
      alt={imgAlt}
      width={imgWidth}
      height={imgHeight}
      onError={handleError}
    />
  );
});

type TImageProps = {
  imgStyle?: CSSObject;
};

export const ImageStyle = styled.img<TImageProps>`
  font-size: 13px;
  ${({ imgStyle }) => imgStyle};
`;
