import type { FormatRelativeFn } from 'date-fns';

const FORMAT_RELATIVE_LOCALE = {
  lastWeek: (date: Date): string => {
    const weekday = date.getDay();
    const last = weekday === 0 || weekday === 6 ? 'ଗତ' : 'ଗତ';
    return "'" + last + "' eeee 'ରେ' p";
  },
  yesterday: "'ଗତକାଲି' p",
  today: "'ଆଜି' p",
  tomorrow: "'ଆସନ୍ତାକାଲି' p",
  nextWeek: "eeee 'ରେ' p",
  other: 'P',
};

export const formatRelative: FormatRelativeFn = (token, date) => {
  const format = FORMAT_RELATIVE_LOCALE[token];
  if (typeof format === 'function') return format(date);
  return format;
};
