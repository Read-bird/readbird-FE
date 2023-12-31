import { DefaultTheme, createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Pretendard', sans-serif;
  }

  body {
    background: #f5f5f5;
    overflow: hidden;
  }

  :root {
    --vh: 100%;
  }
  
  #root {
    position: relative;
    min-width: 360px;
    max-width: 390px;
    margin: 0 auto;
    height: 100vh;
    height: var(--vh);
    background: white;
    overflow-y: auto;

    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    &::-webkit-scrollbar {
      display: none;
    }
  }

  *::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: transparent; 
  }
    
  *::-webkit-scrollbar-thumb {
    width: 5px;
    height: 5px; 
    background-color: #00000080; 
    border-radius: 2px;
  }

  .hidden-scroll::-webkit-scrollbar, .hidden-scroll  *::-webkit-scrollbar {
    display: none;
  }

  .active {
    transition: transform 0.2s;
    
    &:active {
      transform: scale(1.1);
    }
  }

  .slick-dots {
    bottom: 0px;
  }

  .slick-dots li {
    margin: 0;
  }

  .slick-dots li button:before {
    transform: scale(1.5);
  }

  .slick-prev, .slick-next {
    width: 25px;
    height: 25px;
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
