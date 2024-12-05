import type { Localize, LocalizeFn } from 'date-fns';

import { buildLocalizeFn } from '../utils';

const eraValues = {
  narrow: ['T.K', 'A.K'] as const,
  abbreviated: ['T.K.', 'A.K.'] as const,
  wide: ['Tupu Kristi', 'Afọ Kristi'] as const,
};

const quarterValues = {
  narrow: ['1', '2', '3', '4'] as const,
  abbreviated: ['Ọ1', 'Ọ2', 'Ọ3', 'Ọ4'] as const,
  wide: ['Ọkara 1', 'Ọkara 2', 'Ọkara 3', 'Ọkara 4'] as const,
};

const monthValues = {
  narrow: ['J', 'F', 'M', 'E', 'M', 'J', 'J', 'Ọ', 'S', 'Ọ', 'N', 'D'] as const,
  abbreviated: [
    'Jen',
    'Feb',
    'Maa',
    'Epr',
    'Mee',
    'Juu',
    'Jul',
    'Ọgọ',
    'Sep',
    'Ọkt',
    'Nov',
    'Dis',
  ] as const,
  wide: [
    'Jenụwarị',
    'Febrụwarị',
    'Maachị',
    'Eprel',
    'Mee',
    'Juun',
    'Julaị',
    'Ọgọọst',
    'Septemba',
    'Ọktoba',
    'Novemba',
    'Disemba',
  ] as const,
};

const dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const,
  short: ['Ụka', 'Mọn', 'Tiu', 'Wen', 'Tọọ', 'Fraị', 'Sat'] as const,
  abbreviated: ['Ụka', 'Mọn', 'Tiu', 'Wen', 'Tọọ', 'Fraị', 'Sat'] as const,
  wide: ['Ụbọchị Ụka', 'Mọnde', 'Tiuzdee', 'Wenezdee', 'Tọọzdee', 'Fraịdee', 'Satọdee'] as const,
};

const dayPeriodValues = {
  narrow: {
    am: 'A.M.',
    pm: 'P.M.',
    midnight: 'etiti abali',
    noon: 'ehihie',
    morning: 'ụtụtụ',
    afternoon: 'ehihie',
    evening: 'mgbede',
    night: 'abali',
  },
  abbreviated: {
    am: 'A.M.',
    pm: 'P.M.',
    midnight: 'etiti abali',
    noon: 'ehihie',
    morning: 'ụtụtụ',
    afternoon: 'ehihie',
    evening: 'mgbede',
    night: 'abali',
  },
  wide: {
    am: 'A.M.',
    pm: 'P.M.',
    midnight: 'etiti abali',
    noon: 'ehihie',
    morning: 'ụtụtụ',
    afternoon: 'ehihie',
    evening: 'mgbede',
    night: 'abali',
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: 'A.M.',
    pm: 'P.M.',
    midnight: 'etiti abali',
    noon: 'ehihie',
    morning: 'na ụtụtụ',
    afternoon: 'na ehihie',
    evening: 'na mgbede',
    night: 'na abali',
  },
  abbreviated: {
    am: 'A.M.',
    pm: 'P.M.',
    midnight: 'etiti abali',
    noon: 'ehihie',
    morning: 'na ụtụtụ',
    afternoon: 'na ehihie',
    evening: 'na mgbede',
    night: 'na abali',
  },
  wide: {
    am: 'A.M.',
    pm: 'P.M.',
    midnight: 'etiti abali',
    noon: 'ehihie',
    morning: 'na ụtụtụ',
    afternoon: 'na ehihie',
    evening: 'na mgbede',
    night: 'na abali',
  },
};

const ordinalNumber: LocalizeFn<number> = (dirtyNumber) => {
  const number = Number(dirtyNumber);
  return number.toString();
};

export const localize: Localize = {
  ordinalNumber,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: 'wide',
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: (quarter) => quarter - 1,
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: 'wide',
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: 'wide',
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide',
  }),
};
