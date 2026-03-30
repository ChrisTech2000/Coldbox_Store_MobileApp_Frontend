import { configureFonts } from 'react-native-paper';

const baseVariants = configureFonts({ config: { fontFamily: 'Roboto-Regular' } });

const CUSTOM_VARIANTS_DEFS = {
  TextSmall: {
    ...baseVariants.bodySmall,
    fontFamily: 'Roboto-Regular',
  },
  TextRegular: {
    ...baseVariants.bodyMedium,
    fontFamily: 'Roboto-Regular',
  },
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
  HeadlineSmall: {
    ...baseVariants.headlineSmall,
    fontFamily: 'Roboto-Medium',
  },
  HeadlineMedium: {
    ...baseVariants.headlineMedium,
    fontFamily: 'Roboto-Medium',
  },
  HeadlineLarge: {
    ...baseVariants.headlineLarge,
    fontFamily: 'Roboto-Bold',
  },
  DisplaySmall: {
    ...baseVariants.displaySmall,
    fontFamily: 'Roboto-Medium',
  },
  DisplayMedium: {
    ...baseVariants.displayMedium,
    fontFamily: 'Roboto-Medium',
  },
  DisplayLarge: {
    ...baseVariants.displayLarge,
    fontFamily: 'Roboto-Bold',
  },
  TitleLarge: {
    ...baseVariants.titleLarge,
    fontFamily: 'Roboto-Regular',
  },
} as const;

export type FontVariants = keyof typeof CUSTOM_VARIANTS_DEFS;

export default {
  ...baseVariants,
  ...CUSTOM_VARIANTS_DEFS,
};
