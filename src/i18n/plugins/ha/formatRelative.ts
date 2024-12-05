import type { FormatRelativeFn } from 'date-fns';

const formatRelativeLocale = {
  lastWeek: (date: Date): string => {
    const weekday = date.getDay();
    const last = weekday === 0 || weekday === 6 ? 'jiya' : 'jiya';
    return "'" + last + "' eeee 'da' p";
  },
  yesterday: "'jiya da' p",
  today: "'yau da' p",
  tomorrow: "'gobe da' p",
  nextWeek: "eeee 'da' p",
  other: 'P',
};

export const formatRelative: FormatRelativeFn = (token, date) => {
  const format = formatRelativeLocale[token];
  if (typeof format === 'function') return format(date);
  return format;
};
