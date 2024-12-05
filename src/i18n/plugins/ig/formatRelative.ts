import type { FormatRelativeFn } from 'date-fns';

const FORMAT_RELATIVE_LOCALE = {
  lastWeek: (date: Date): string => {
    const weekday = date.getDay();
    const last = weekday === 0 || weekday === 6 ? 'izu gara aga' : 'izu gara aga';
    return "'" + last + "' eeee 'na' p";
  },
  yesterday: "'ụnyaahụ na' p",
  today: "'taa na' p",
  tomorrow: "'echi na' p",
  nextWeek: "eeee 'na' p",
  other: 'P',
};

export const formatRelative: FormatRelativeFn = (token, date) => {
  const format = FORMAT_RELATIVE_LOCALE[token];
  if (typeof format === 'function') return format(date);
  return format;
};
