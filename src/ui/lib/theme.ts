import { MD3LightTheme as PaperDefaultTheme } from 'react-native-paper';
import type { ThemeProp } from 'react-native-paper/lib/typescript/types';
import {
  type Theme as NavigationTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import colors from 'tailwindcss/colors';

import paperFonts from './fonts';

export const paperTheme = {
  ...PaperDefaultTheme,
  colors: {
    // https://callstack.github.io/react-native-paper/docs/guides/theming#creating-dynamic-theme-colors
    primary: 'rgb(7, 133, 126)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(113, 247, 237)',
    onPrimaryContainer: 'rgb(0, 32, 30)',
    secondary: 'rgb(74, 99, 96)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(204, 232, 228)',
    onSecondaryContainer: 'rgb(5, 31, 29)',
    tertiary: 'rgb(72, 97, 123)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(207, 229, 255)',
    onTertiaryContainer: 'rgb(0, 29, 52)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(250, 253, 251)',
    onBackground: 'rgb(25, 28, 28)',
    surface: 'rgb(250, 253, 251)',
    onSurface: 'rgb(25, 28, 28)',
    surfaceVariant: 'rgb(218, 229, 226)',
    onSurfaceVariant: 'rgb(63, 73, 71)',
    outline: 'rgb(111, 121, 119)',
    outlineVariant: 'rgb(190, 201, 199)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(45, 49, 48)',
    inverseOnSurface: 'rgb(239, 241, 240)',
    inversePrimary: 'rgb(79, 219, 208)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(238, 246, 243)',
      level2: 'rgb(230, 241, 239)',
      level3: 'rgb(223, 237, 234)',
      level4: 'rgb(220, 235, 233)',
      level5: 'rgb(215, 232, 230)',
    },
    surfaceDisabled: 'rgba(25, 28, 28, 0.12)',
    onSurfaceDisabled: 'rgba(25, 28, 28, 0.38)',
    backdrop: 'rgba(41, 50, 49, 0.4)',
  },
  fonts: paperFonts,
} satisfies ThemeProp;

export const navigatorTheme = {
  ...NavigationDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    background: colors.white,
  },
} satisfies NavigationTheme;
