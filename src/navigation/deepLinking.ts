import { Linking } from 'react-native';
import type { LinkingOptions } from '@react-navigation/native';
import camelCase from 'lodash/camelCase';

import { DEEP_LINK_DOMAIN } from '#constants/environment';
import { subs } from '#services/utils';

const BASE_DEEP_LINK_URL_SCHEMA = 'coldtivate://app';
const DEEP_LINK_URL = `https://${DEEP_LINK_DOMAIN}`;

const DEEP_LINK_PATHS = {
  INVITE: 'invite/:inviteCode/:userType/:phoneNumber',
  PASSWORD_RESET: 'password-reset/:resetCode/:phoneNumber',
} as const;

export default {
  prefixes: [BASE_DEEP_LINK_URL_SCHEMA, DEEP_LINK_URL],
  async getInitialURL(): Promise<string | null> {
    try {
      const url = await Linking.getInitialURL();
      if (!url) return null;

      if (url.includes('auth/reset/')) {
        const queryParams = _stripURL(url);
        if (!queryParams) return null;

        const datums = _queryParamsToObject(queryParams);

        return [DEEP_LINK_URL, subs(DEEP_LINK_PATHS.PASSWORD_RESET, datums)].join('/');
      }

      if (url.includes('auth/signup-invitation/')) {
        const queryParams = _stripURL(url);
        if (!queryParams) return null;

        const datums = _queryParamsToObject(queryParams);

        const link = subs(DEEP_LINK_PATHS.INVITE, {
          inviteCode: datums.invitationCode,
          userType: datums.userType === 'operator' ? 'op' : 'sp',
          phoneNumber: datums.phoneNumber,
        });

        return [DEEP_LINK_URL, link].join('/');
      }

      return url;
    } catch {
      return null;
    }
  },
  subscribe(listener) {
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });
    return () => {
      linkingSubscription.remove();
    };
  },
  config: {
    screens: {
      PasswordReset: {
        path: DEEP_LINK_PATHS.PASSWORD_RESET,
        parse: {
          resetCode: String,
          phoneNumber: String,
        },
      },
      Invite: {
        path: DEEP_LINK_PATHS.INVITE,
        parse: {
          inviteCode: String,
          userType: String,
          phoneNumber: String,
        },
      },
    },
  },
} satisfies LinkingOptions<ReactNavigation.RootParamList>;

///
// Internal Util Functions
///

function _stripURL(url: string): string | undefined {
  const queryIndex = url.indexOf('?');
  return queryIndex !== -1 ? url.slice(queryIndex + 1) : undefined;
}

function _queryParamsToObject(queryString: string): Record<string, string> {
  const datums: Record<string, string> = {};
  for (const pair of queryString.split('&')) {
    const [key, value] = pair.split('=');
    if (!key || !value) continue;
    const k = camelCase(key);
    const v = decodeURIComponent(value);
    datums[k] = v;
  }
  return datums;
}
