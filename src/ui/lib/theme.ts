import { MD3LightTheme as PaperDefaultTheme } from 'react-native-paper';
import type { ThemeProp } from 'react-native-paper/lib/typescript/types';
import {
  type Theme as NavigationTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import colors from 'tailwindcss/colors';

export const paperTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    // TODO: use the colors of the project itself and generate the color schemes:
    // https://callstack.github.io/react-native-paper/docs/guides/theming#creating-dynamic-theme-colors
    // primary: '',
    // secondary: '',
    // tertiary: '',
  },
} satisfies ThemeProp;

export const navigatorTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: colors.zinc[100],
  },
} satisfies NavigationTheme;
