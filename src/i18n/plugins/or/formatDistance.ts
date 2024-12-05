import type { FormatDistanceFn, FormatDistanceLocale } from 'date-fns';

import type { FormatDistanceTokenValue } from '../utils';

const FORMAT_DISTANCE_LOCALE: FormatDistanceLocale<FormatDistanceTokenValue> = {
  lessThanXSeconds: {
    one: '1 ସେକେଣ୍ଡରୁ କମ୍',
    other: '{{count}} ସେକେଣ୍ଡରୁ କମ୍',
  },
  xSeconds: {
    one: '1 ସେକେଣ୍ଡ',
    other: '{{count}} ସେକେଣ୍ଡ',
  },
  halfAMinute: 'ଅଧା ମିନିଟ୍',
  lessThanXMinutes: {
    one: '1 ମିନିଟରୁ କମ୍',
    other: '{{count}} ମିନିଟରୁ କମ୍',
  },
  xMinutes: {
    one: '1 ମିନିଟ୍',
    other: '{{count}} ମିନିଟ୍',
  },
  aboutXHours: {
    one: 'ପ୍ରାୟ 1 ଘଣ୍ଟା',
    other: 'ପ୍ରାୟ {{count}} ଘଣ୍ଟା',
  },
  xHours: {
    one: '1 ଘଣ୍ଟା',
    other: '{{count}} ଘଣ୍ଟା',
  },
  xDays: {
    one: '1 ଦିନ',
    other: '{{count}} ଦିନ',
  },
  aboutXWeeks: {
    one: 'ପ୍ରାୟ 1 ସପ୍ତାହ',
    other: 'ପ୍ରାୟ {{count}} ସପ୍ତାହ',
  },
  xWeeks: {
    one: '1 ସପ୍ତାହ',
    other: '{{count}} ସପ୍ତାହ',
  },
  aboutXMonths: {
    one: 'ପ୍ରାୟ 1 ମାସ',
    other: 'ପ୍ରାୟ {{count}} ମାସ',
  },
  xMonths: {
    one: '1 ମାସ',
    other: '{{count}} ମାସ',
  },
  aboutXYears: {
    one: 'ପ୍ରାୟ 1 ବର୍ଷ',
    other: 'ପ୍ରାୟ {{count}} ବର୍ଷ',
  },
  xYears: {
    one: '1 ବର୍ଷ',
    other: '{{count}} ବର୍ଷ',
  },
  overXYears: {
    one: '1 ବର୍ଷରୁ ଅଧିକ',
    other: '{{count}} ବର୍ଷରୁ ଅଧିକ',
  },
  almostXYears: {
    one: 'ପ୍ରାୟ 1 ବର୍ଷ',
    other: 'ପ୍ରାୟ {{count}} ବର୍ଷ',
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
      result = `${result} ରେ`; // 'in' prefix
    } else {
      result = `${result} ପୂର୍ବରୁ`; // 'ago' suffix
    }
  }

  return result;
};
