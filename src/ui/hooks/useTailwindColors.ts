import _styles from '../../../tailwind.config';
import { DefaultColors } from 'tailwindcss/types/generated/colors';
import colors from 'tailwindcss/colors';
import { useMemo } from 'react';
import merge from 'lodash/merge';

interface CustomColors {
  green: {
    primary?: string;
  } & DefaultColors['green'];
}

type AllColors = DefaultColors & CustomColors;

export const useTailwindColors = (): AllColors => {
  const _colors = useMemo(() => {
    const customColors = _styles.theme?.extend?.colors as CustomColors | undefined;
    const tailwindColors = colors as DefaultColors;
    return merge({}, tailwindColors, customColors);
  }, []);

  return _colors;
};
