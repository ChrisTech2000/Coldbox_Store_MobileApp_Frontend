import type { FormatDistanceFn, FormatDistanceLocale } from 'date-fns';

import type { FormatDistanceTokenValue } from '../utils';

const FORMAT_DISTANCE_LOCALE: FormatDistanceLocale<FormatDistanceTokenValue> = {
  lessThanXSeconds: {
    one: 'kere ju iṣẹju kan',
    other: 'kere ju {{count}} iṣẹju',
  },
  xSeconds: {
    one: 'iṣẹju kan',
    other: '{{count}} iṣẹju',
  },
  halfAMinute: 'idaji isẹju',
  lessThanXMinutes: {
    one: 'kere ju iseju kan',
    other: 'kere ju {{count}} iseju',
  },
  xMinutes: {
    one: 'iseju kan',
    other: '{{count}} iseju',
  },
  aboutXHours: {
    one: 'ni wakati kan',
    other: 'ni {{count}} wakati',
  },
  xHours: {
    one: 'wakati kan',
    other: '{{count}} wakati',
  },
  xDays: {
    one: 'ọjọ kan',
    other: '{{count}} ọjọ',
  },
  aboutXWeeks: {
    one: 'ni ọsẹ kan',
    other: 'ni {{count}} ọsẹ',
  },
  xWeeks: {
    one: 'ọsẹ kan',
    other: '{{count}} ọsẹ',
  },
  aboutXMonths: {
    one: 'ni oṣu kan',
    other: 'ni {{count}} oṣu',
  },
  xMonths: {
    one: 'oṣu kan',
    other: '{{count}} oṣu',
  },
  aboutXYears: {
    one: 'ni ọdun kan',
    other: 'ni {{count}} ọdun',
  },
  xYears: {
    one: 'ọdun kan',
    other: '{{count}} ọdun',
  },
  overXYears: {
    one: 'ju ọdun kan',
    other: 'ju {{count}} ọdun',
  },
  almostXYears: {
    one: 'fere to ọdun kan',
    other: 'fere to {{count}} ọdun',
  },
};

export const formatDistance: FormatDistanceFn = (token, count, options) => {
  let result;

  const tokenValue = FORMAT_DISTANCE_LOCALE[token];

  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', String(count));
  }

  if (options?.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      result = `ni ${result}`; // 'in' prefix
    } else {
      result = `${result} sẹyin`; // 'ago' suffix
    }
  }

  return result;
};
