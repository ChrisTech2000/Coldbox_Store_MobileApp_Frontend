import type { LinkingOptions } from '@react-navigation/native';

export const BASE_DEEP_LINK_URL = 'coldtivate://app';

export default {
  prefixes: [BASE_DEEP_LINK_URL],
  config: {
    screens: {
      PasswordReset: 'password-reset/:resetCode/:phoneNumber',
    },
  },
} satisfies LinkingOptions<ReactNavigation.RootParamList>;
