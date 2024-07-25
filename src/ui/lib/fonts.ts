import { configureFonts } from 'react-native-paper';

const baseVariants = configureFonts({ config: { fontFamily: 'Roboto-Regular' } });

const CUSTOM_VARIANTS_DEFS = {
  TextMedium: {
    ...baseVariants.bodyMedium,
    fontFamily: 'Roboto-Medium',
  },
  TextBold: {
    ...baseVariants.bodyMedium,
    fontFamily: 'Roboto-Bold',
  },
  TitleSmall: {
    ...baseVariants.titleMedium,
    fontFamily: 'Roboto-Medium',
  },
  TitleRegular: {
    ...baseVariants.titleLarge,
    fontFamily: 'Roboto-Regular',
  },
  TitleMedium: {
    ...baseVariants.titleLarge,
    fontFamily: 'Roboto-Medium',
  },
  TitleBold: {
    ...baseVariants.titleLarge,
    fontFamily: 'Roboto-Bold',
  },
  HeadingRegular: {
    ...baseVariants.displayMedium,
    fontFamily: 'Roboto-Medium',
  },
} as const;

export type FontVariants = keyof typeof CUSTOM_VARIANTS_DEFS;

const customVariants = configureFonts({ config: CUSTOM_VARIANTS_DEFS });

export default configureFonts({
  config: {
    ...baseVariants,
    ...customVariants,
  },
});
