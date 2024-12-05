import { Locale } from 'date-fns';

import { formatDistance } from './formatDistance';
import { formatRelative } from './formatRelative';
import { formatLong } from './formatLong';
import { localize } from './localize';
import { match } from './match';

export const or: Locale = {
  code: 'or-IN',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1,
  },
};
