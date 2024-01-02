import NOT_IMAGE from '@assets/images/noImage.jpeg';
import { SyntheticEvent, memo, useCallback } from 'react';
import styled, { CSSObject } from 'styled-components';

type TProps = {
  imgUrl?: string;
  imgAlt?: string;
  imgWidth?: number;
  imgHeight?: number;
  imgStyle?: CSSObject;
  noImage?: string;
};

export const Images = memo(
  ({ imgUrl, imgAlt, imgWidth, imgHeight, imgStyle, noImage = NOT_IMAGE }: TProps) => {
    const handleError = useCallback(
      (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = noImage;
      },
      [noImage]
    );

    return (
      <ImageStyle
        $imgStyle={imgStyle}
        src={imgUrl ?? noImage}
        alt={imgAlt}
        width={imgWidth}
        height={imgHeight}
        onError={handleError}
      />
    );
  }
);

type TImageProps = {
  $imgStyle?: CSSObject;
};

export const ImageStyle = styled.img<TImageProps>`
  font-size: 13px;
  ${({ $imgStyle }) => $imgStyle};
`;
