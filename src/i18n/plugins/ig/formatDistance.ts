import type { FormatDistanceFn, FormatDistanceLocale } from 'date-fns';

import type { FormatDistanceTokenValue } from '../utils';

const FORMAT_DISTANCE_LOCALE: FormatDistanceLocale<FormatDistanceTokenValue> = {
  lessThanXSeconds: {
    one: 'ka nta karịa sekọnd',
    other: 'ka nta karịa sekọnd {{count}}',
  },
  xSeconds: {
    one: 'sekọnd 1',
    other: 'sekọnd {{count}}',
  },
  halfAMinute: 'ọkara nkeji',
  lessThanXMinutes: {
    one: 'ka nta karịa nkeji',
    other: 'ka nta karịa nkeji {{count}}',
  },
  xMinutes: {
    one: 'nkeji 1',
    other: 'nkeji {{count}}',
  },
  aboutXHours: {
    one: 'ihe dị ka elekere 1',
    other: 'ihe dị ka elekere {{count}}',
  },
  xHours: {
    one: 'elekere 1',
    other: 'elekere {{count}}',
  },
  xDays: {
    one: 'ụbọchị 1',
    other: 'ụbọchị {{count}}',
  },
  aboutXWeeks: {
    one: 'ihe dị ka izu 1',
    other: 'ihe dị ka izu {{count}}',
  },
  xWeeks: {
    one: 'izu 1',
    other: 'izu {{count}}',
  },
  aboutXMonths: {
    one: 'ihe dị ka ọnwa 1',
    other: 'ihe dị ka ọnwa {{count}}',
  },
  xMonths: {
    one: 'ọnwa 1',
    other: 'ọnwa {{count}}',
  },
  aboutXYears: {
    one: 'ihe dị ka afọ 1',
    other: 'ihe dị ka afọ {{count}}',
  },
  xYears: {
    one: 'afọ 1',
    other: 'afọ {{count}}',
  },
  overXYears: {
    one: 'karịa afọ 1',
    other: 'karịa afọ {{count}}',
  },
  almostXYears: {
    one: 'ihe fọrọ nke nta ka ọ bụrụ afọ 1',
    other: 'ihe fọrọ nke nta ka ọ bụrụ afọ {{count}}',
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
      result = `na ${result}`; // 'in' prefix
    } else {
      result = `${result} gara aga`; // 'ago' suffix
    }
  }

  return result;
};
