import { Linking } from 'react-native';
import type { LinkingOptions } from '@react-navigation/native';
import camelCase from 'lodash/camelCase';

import { DEEP_LINK_DOMAIN } from '#constants/environment';
import { subs } from '#services/utils';
import reportCrash from '#ui/lib/reportCrash';

const BASE_DEEP_LINK_URL_SCHEMA = 'coldtivate://app';
const DEEP_LINK_URL = `https://${DEEP_LINK_DOMAIN}`;

const DEEP_LINK_PATHS = {
  INVITE: 'invite/:inviteCode/:userType/:phoneNumber',
  PASSWORD_RESET: 'password-reset/:resetcode/:phoneNumber',
} as const;

export default {
  prefixes: [BASE_DEEP_LINK_URL_SCHEMA, DEEP_LINK_URL],
  async getInitialURL(): Promise<string | null> {
    let initialURL: string | null = null;
    try {
      initialURL = await Linking.getInitialURL();
      if (!initialURL) return null;
      return DeepLinkProcessor.processDeepLink(initialURL);
    } catch (exception) {
      reportCrash(exception as Error, {
        extras: {
          context: 'DeepLinkInitialURL',
          url: initialURL ?? 'null',
          timestamp: new Date().toISOString(),
        },
      });
      return null;
    }
  },
  subscribe(listener) {
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      try {
        listener(DeepLinkProcessor.processDeepLink(url));
      } catch (exception) {
        reportCrash(exception as Error, {
          extras: {
            context: 'DeepLinkSubscribe',
            url: url ?? 'null',
            timestamp: new Date().toISOString(),
          },
        });
      }
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
          resetcode: String,
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
// Internals
///

const WEB_APP_ROUTER_PATHS = {
  PASSWORD_RESET: 'auth/reset/',
  SIGNUP_INVITATION: 'auth/signup-invitation/',
} as const;

class DeepLinkProcessor {
  static processDeepLink(url: string): string {
    if (url.includes(WEB_APP_ROUTER_PATHS.PASSWORD_RESET)) {
      return DeepLinkProcessor._processPasswordResetLink(url);
    }
    if (url.includes(WEB_APP_ROUTER_PATHS.SIGNUP_INVITATION)) {
      return DeepLinkProcessor._processInviteLink(url);
    }
    return url;
  }

  //
  // private methods
  private static _processPasswordResetLink(url: string): string {
    const queryParams = DeepLinkProcessor._stripURL(url);
    const datums = DeepLinkProcessor._queryParamsToObject(queryParams);
    return [DEEP_LINK_URL, subs(DEEP_LINK_PATHS.PASSWORD_RESET, datums)].join('/');
  }

  private static _processInviteLink(url: string): string {
    const queryParams = DeepLinkProcessor._stripURL(url);
    const datums = DeepLinkProcessor._queryParamsToObject(queryParams);
    return [
      DEEP_LINK_URL,
      subs(DEEP_LINK_PATHS.INVITE, {
        inviteCode: datums.invitationCode,
        userType: Number(datums.userType) === 2 ? 'op' : 'sp',
        phoneNumber: datums.phoneNumber,
      }),
    ].join('/');
  }

  private static _stripURL(url: string): string {
    const queryIdx = url.indexOf('?');
    if (queryIdx !== -1) return url.slice(queryIdx + 1);
    throw new Error('[DEEP_LINK_EXCEPTION]: URL QUERY STRIP');
  }

  private static _queryParamsToObject(queryString: string): Record<string, string> {
    const datums: Record<string, string> = {};
    for (const pair of queryString.split('&')) {
      const [key, value] = pair.split('=');
      if (!key || !value) throw new Error('[DEEP_LINK_EXCEPTION]: URL QUERY PARAMS PARSE');
      const k = camelCase(key);
      const v = decodeURIComponent(value);
      datums[k] = v;
    }
    return datums;
  }
}
