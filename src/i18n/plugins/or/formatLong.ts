import type { FormatLong } from 'date-fns';

import { buildFormatLongFn } from '../utils';

export const formatLong: FormatLong = {
  date: buildFormatLongFn({
    formats: {
      full: 'EEEE MMMM d y',
      long: 'MMMM d y',
      medium: 'MMM d y',
      short: 'M/d/yy',
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
