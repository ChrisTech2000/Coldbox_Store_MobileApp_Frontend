import type { FormatLong } from 'date-fns';

import { buildFormatLongFn } from '../utils';

export const formatLong: FormatLong = {
  date: buildFormatLongFn({
    formats: {
      full: 'EEEE d MMMM y',
      long: 'd MMMM y',
      medium: 'd MMM y',
      short: 'd-M-yy',
    },
    defaultWidth: 'full',
  }),
  time: buildFormatLongFn({
    formats: {
      full: 'h:mm:ss a zzzz',
      long: 'h:mm:ss a z',
      medium: 'h:mm:ss a',
      short: 'h:mm a',
    },
    defaultWidth: 'full',
  }),
  dateTime: buildFormatLongFn({
    formats: {
      full: '{{date}} {{time}}',
      long: '{{date}} {{time}}',
      medium: '{{date}}, {{time}}',
      short: '{{date}}, {{time}}',
    },
    defaultWidth: 'full',
  }),
};
