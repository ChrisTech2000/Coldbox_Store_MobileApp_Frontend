import { MD3LightTheme as DefaultTheme } from 'react-native-paper';
import type { ThemeProp } from 'react-native-paper/lib/typescript/types';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // TODO: use the colors of the project itself and generate the color schemes:
    // https://callstack.github.io/react-native-paper/docs/guides/theming#creating-dynamic-theme-colors
    primary: '#07857E',
    // secondary: '',
    // tertiary: '',
  },
} satisfies ThemeProp;
