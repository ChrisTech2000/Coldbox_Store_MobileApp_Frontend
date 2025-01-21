import * as Sentry from '@sentry/react-native';

import { ENVIRONMENT } from '#constants/environment';

type ExceptionSeverity = 'fatal' | 'error' | 'warning' | 'info';

type Options = {
  severity?: ExceptionSeverity;
  tags?: Record<string, string>;
  extras?: Record<string, unknown>;
  user?: {
    id?: string;
    email?: string;
    username?: string;
  };
};

const IS_DEV_ENV = typeof ENVIRONMENT === 'string' && ENVIRONMENT === 'development';

export default function reportCrash(exception: Error | string, options: Options = {}): void {
  const error = typeof exception === 'string' ? new Error(exception) : exception;
  const { severity = 'error', tags, extras, user } = options;

  if (IS_DEV_ENV) {
    const message = error.message || 'Unknown Error';
    console.group('Crash Report');
    console.error(error);
    console.log('Message:', message);
    console.log('Severity:', severity);
    if (tags) console.log('Tags:', tags);
    if (extras) console.log('Extra Data:', extras);
    if (user) console.log('User:', user);
    console.log('Stack:', error.stack);
    console.groupEnd();
  } else {
    try {
      Sentry.withScope((scope) => {
        scope.setLevel(severity);
        if (tags) {
          const entries = Object.entries(tags);
          for (let i = 0; i < entries.length; i++) {
            const [key, value] = entries[i];
            scope.setTag(key, value);
          }
        }
        if (extras) {
          const entries = Object.entries(extras);
          for (let i = 0; i < entries.length; i++) {
            const [key, value] = entries[i];
            scope.setExtra(key, value);
          }
        }
        if (user) {
          scope.setUser(user);
        }
        Sentry.captureException(error);
      });
    } catch (sentryException) {
      console.error('Failed to report to Sentry:', sentryException);
    }
  }
}
