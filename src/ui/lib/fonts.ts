import { configureFonts } from 'react-native-paper';

const baseVariants = configureFonts({
  config: {
    fontFamily: 'Roboto-Regular',
  },
});

const customVariants = configureFonts({
  config: {
    TextMedium: {
      ...baseVariants.bodyMedium,
      fontFamily: 'Roboto-Medium',
    },
    TextBold: {
      ...baseVariants.bodyMedium,
      fontFamily: 'Roboto-Bold',
    },
  },
});

export default configureFonts({
  config: {
    ...baseVariants,
    ...customVariants,
  },
});
