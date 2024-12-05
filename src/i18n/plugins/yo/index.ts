import { Locale } from 'date-fns';

import { formatDistance } from './formatDistance';
import { formatRelative } from './formatRelative';
import { formatLong } from './formatLong';
import { localize } from './localize';
import { match } from './match';

export const yo: Locale = {
  code: 'yo-NG',
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 1 /* Monday */,
    firstWeekContainsDate: 1,
  },
};
