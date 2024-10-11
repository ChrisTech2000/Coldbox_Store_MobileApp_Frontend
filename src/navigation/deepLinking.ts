import type { LinkingOptions } from '@react-navigation/native';

import { DEEP_LINK_URL } from '#constants/environment';

const BASE_DEEP_LINK_URL_SCHEMA = 'coldtivate://app';

export default {
  prefixes: [BASE_DEEP_LINK_URL_SCHEMA, DEEP_LINK_URL],
  config: {
    screens: {
      PasswordReset: 'password-reset/:resetCode/:phoneNumber',
      Invite: 'invite/:inviteCode/:userType/:phoneNumber',
    },
  },
} satisfies LinkingOptions<ReactNavigation.RootParamList>;
