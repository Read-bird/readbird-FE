import { TThemeColors } from '@style/global-style';
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: TThemeColors;
  }
}
