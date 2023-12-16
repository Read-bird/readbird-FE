import styled from 'styled-components';

type TStyleProps = {
  width?: number;
  height?: number;
};

export const Spacing = (props: TStyleProps) => {
  return <SpaceWrap {...props} />;
};

const SpaceWrap = styled.div.attrs<TStyleProps>(({ style }) => ({
  style: { ...style }
}))<TStyleProps>`
  width: ${({ width }) => (width ? `${width}px` : undefined)};
  min-width: ${({ width }) => (width ? `${width}px` : undefined)};
  height: ${({ height }) => (height ? `${height}px` : undefined)};
  min-height: ${({ height }) => (height ? `${height}px` : undefined)};
`;
