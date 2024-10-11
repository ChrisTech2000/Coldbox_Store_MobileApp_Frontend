import type { LinkingOptions } from '@react-navigation/native';

export const BASE_DEEP_LINK_URL = 'coldtivate://app';
export const BASE_UNIVERSAL_LINK_URL = 'https://mobile.coldtivate.org';

export default {
  prefixes: [BASE_DEEP_LINK_URL, BASE_UNIVERSAL_LINK_URL],
  config: {
    screens: {
      PasswordReset: 'password-reset/:resetCode/:phoneNumber',
      Invite: 'invite/:inviteCode/:userType/:phoneNumber',
    },
  },
} satisfies LinkingOptions<ReactNavigation.RootParamList>;
