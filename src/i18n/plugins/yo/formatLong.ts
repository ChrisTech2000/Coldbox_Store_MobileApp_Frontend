import type { FormatLong } from 'date-fns';

import { buildFormatLongFn } from '../utils';

export const formatLong: FormatLong = {
  date: buildFormatLongFn({
    formats: {
      full: 'EEEE, d Oṣù MMMM y',
      long: 'd Oṣù MMMM y',
      medium: 'd MMM y',
      short: 'dd/MM/y',
    },
    defaultWidth: 'full',
  }),
  time: buildFormatLongFn({
    formats: {
      full: 'HH:mm:ss zzzz',
      long: 'HH:mm:ss z',
      medium: 'HH:mm:ss',
      short: 'HH:mm',
    },
    defaultWidth: 'full',
  }),
  dateTime: buildFormatLongFn({
    formats: {
      full: "{{date}} 'ní' {{time}}",
      long: "{{date}} 'ní' {{time}}",
      medium: '{{date}}, {{time}}',
      short: '{{date}}, {{time}}',
    },
    defaultWidth: 'full',
  }),
};
