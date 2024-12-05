import type { FormatRelativeFn } from 'date-fns';

const FORMAT_RELATIVE_LOCALE = {
  lastWeek: (date: Date): string => {
    const weekday = date.getDay();
    const last = weekday === 0 || weekday === 6 ? 'ọsẹ̀ tókọjá' : 'ọsẹ̀ tókọjá';
    return "'" + last + "' eeee 'ní' p";
  },
  yesterday: "'àná ní' p",
  today: "'òní ní' p",
  tomorrow: "'ọ̀la ní' p",
  nextWeek: "eeee 'ní' p",
  other: 'P',
};

export const formatRelative: FormatRelativeFn = (token, date) => {
  const format = FORMAT_RELATIVE_LOCALE[token];
  if (typeof format === 'function') return format(date);
  return format;
};
