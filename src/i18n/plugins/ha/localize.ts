import type { Localize, LocalizeFn } from 'date-fns';

import { buildLocalizeFn } from '../utils';

const eraValues = {
  narrow: ['KH', 'BH'] as const,
  abbreviated: ['K.H', 'B.H'] as const,
  wide: ['Kafin Haihuwar Annabi', 'Bayan Haihuwar Annabi'] as const,
};

const quarterValues = {
  narrow: ['1', '2', '3', '4'] as const,
  abbreviated: ['K1', 'K2', 'K3', 'K4'] as const,
  wide: ['Kwata na ɗaya', 'Kwata na biyu', 'Kwata na uku', 'Kwata na huɗu'] as const,
};

const monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'Y', 'Y', 'A', 'S', 'O', 'N', 'D'] as const,
  abbreviated: [
    'Jan',
    'Fab',
    'Mar',
    'Afi',
    'May',
    'Yun',
    'Yul',
    'Agu',
    'Sat',
    'Okt',
    'Nuw',
    'Dis',
  ] as const,
  wide: [
    'Janairu',
    'Fabrairu',
    'Maris',
    'Afirilu',
    'Mayu',
    'Yuni',
    'Yuli',
    'Agusta',
    'Satumba',
    'Oktoba',
    'Nuwamba',
    'Disamba',
  ] as const,
};

const dayValues = {
  narrow: ['L', 'L', 'T', 'L', 'A', 'J', 'A'] as const,
  short: ['Lah', 'Lit', 'Tal', 'Lar', 'Alh', 'Jum', 'Asa'] as const,
  abbreviated: ['Lah', 'Lit', 'Tal', 'Lar', 'Alh', 'Jum', 'Asa'] as const,
  wide: ['Lahadi', 'Litinin', 'Talata', 'Laraba', 'Alhamis', 'Jummaʼa', 'Asabar'] as const,
};

const dayPeriodValues = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tsakar dare',
    noon: 'tsakar rana',
    morning: 'safe',
    afternoon: 'yamma',
    evening: 'yamma',
    night: 'dare',
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tsakar dare',
    noon: 'tsakar rana',
    morning: 'safe',
    afternoon: 'yamma',
    evening: 'yamma',
    night: 'dare',
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tsakar dare',
    noon: 'tsakar rana',
    morning: 'safe',
    afternoon: 'yamma',
    evening: 'yamma',
    night: 'dare',
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tsakar dare',
    noon: 'tsakar rana',
    morning: 'da safe',
    afternoon: 'da yamma',
    evening: 'da yamma',
    night: 'da dare',
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tsakar dare',
    noon: 'tsakar rana',
    morning: 'da safe',
    afternoon: 'da yamma',
    evening: 'da yamma',
    night: 'da dare',
  },
  wide: {
    am: 'AM',
    pm: 'PM',
    midnight: 'tsakar dare',
    noon: 'tsakar rana',
    morning: 'da safe',
    afternoon: 'da yamma',
    evening: 'da yamma',
    night: 'da dare',
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
