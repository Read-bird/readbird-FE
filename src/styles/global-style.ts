import { DefaultTheme, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background: #f5f5f5;
  }
  
  #root {
    position: relative;
    max-width: 390px;
    height: 100%;
    margin: 0 auto;
    background: white;
  }
`;

export const colors = {
  basic: '#E3CCF2',
  basicDark: '#B780DB',
  subBlue: '#CBD2FC',
  subRed: '#FDBCB8',
  subYellow: '#FEE9B2',
  white: '#FFFFFF',
  darkGray: '#ABABAB',
  lightGray: '#CFCFCF',
  successFill: '#79F5E7',
  successStroke: '#77CEFF',
  unstableFill: '#FFCF53',
  unstableStroke: '#F2BF3C',
  failFill: '#FF76A7',
  failStroke: '#A33F23',
  fill: '#000000',
  stroke: '#000000',
  transparent: 'transparent',
  disabled: '#ABABAB'
};

export type TThemeColors = typeof colors;

export const theme: DefaultTheme = {
  colors
};
