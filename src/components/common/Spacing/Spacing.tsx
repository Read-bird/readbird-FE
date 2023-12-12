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
  width: ${({ width }) => `${width}px`};
  min-width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`};
  min-height: ${({ height }) => `${height}px`};
`;
