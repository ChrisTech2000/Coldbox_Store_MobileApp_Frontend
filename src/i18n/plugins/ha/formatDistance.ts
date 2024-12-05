import type { FormatDistanceFn, FormatDistanceLocale } from 'date-fns';

import type { FormatDistanceTokenValue } from '../utils';

const FORMAT_DISTANCE_LOCALE: FormatDistanceLocale<FormatDistanceTokenValue> = {
  lessThanXSeconds: {
    one: 'kasa da dakika',
    other: 'kasa da dakika {{count}}',
  },
  xSeconds: {
    one: 'dakika 1',
    other: 'dakika {{count}}',
  },
  halfAMinute: 'rabin minti',
  lessThanXMinutes: {
    one: 'kasa da minti',
    other: 'kasa da minti {{count}}',
  },
  xMinutes: {
    one: 'minti 1',
    other: 'minti {{count}}',
  },
  aboutXHours: {
    one: "kusan sa'a 1",
    other: "kusan sa'a {{count}}",
  },
  xHours: {
    one: "sa'a 1",
    other: "sa'a {{count}}",
  },
  xDays: {
    one: 'kwana 1',
    other: 'kwana {{count}}',
  },
  aboutXWeeks: {
    one: 'kusan mako 1',
    other: 'kusan mako {{count}}',
  },
  xWeeks: {
    one: 'mako 1',
    other: 'mako {{count}}',
  },
  aboutXMonths: {
    one: 'kusan wata 1',
    other: 'kusan wata {{count}}',
  },
  xMonths: {
    one: 'wata 1',
    other: 'wata {{count}}',
  },
  aboutXYears: {
    one: 'kusan shekara 1',
    other: 'kusan shekara {{count}}',
  },
  xYears: {
    one: 'shekara 1',
    other: 'shekara {{count}}',
  },
  overXYears: {
    one: 'fiye da shekara 1',
    other: 'fiye da shekara {{count}}',
  },
  almostXYears: {
    one: 'kusan shekara 1',
    other: 'kusan shekara {{count}}',
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
      result = `${result} შემდეგ`; // 'in' prefix
    } else {
      result = `${result} წინ`; // 'ago' suffix
    }
  }

  return result;
};
