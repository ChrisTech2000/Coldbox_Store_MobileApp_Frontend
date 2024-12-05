import type { Localize, LocalizeFn } from 'date-fns';

import { buildLocalizeFn } from '../utils';

const ERA_VALUES = {
  narrow: ['KH', 'BH'] as const,
  abbreviated: ['K.H', 'B.H'] as const,
  wide: ['Kafin Haihuwar Annabi', 'Bayan Haihuwar Annabi'] as const,
};

const QUARTER_VALUES = {
  narrow: ['1', '2', '3', '4'] as const,
  abbreviated: ['K1', 'K2', 'K3', 'K4'] as const,
  wide: ['Kwata na ɗaya', 'Kwata na biyu', 'Kwata na uku', 'Kwata na huɗu'] as const,
};

const MONTH_VALUES = {
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

const DAY_VALUES = {
  narrow: ['L', 'L', 'T', 'L', 'A', 'J', 'A'] as const,
  short: ['Lah', 'Lit', 'Tal', 'Lar', 'Alh', 'Jum', 'Asa'] as const,
  abbreviated: ['Lah', 'Lit', 'Tal', 'Lar', 'Alh', 'Jum', 'Asa'] as const,
  wide: ['Lahadi', 'Litinin', 'Talata', 'Laraba', 'Alhamis', 'Jummaʼa', 'Asabar'] as const,
};

const DAY_PERIOD_VALUES = {
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

const FORMATTING_DAY_PERIOD_VALUES = {
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

const _ordinalNumber: LocalizeFn<number> = (dirtyNumber) => {
  const number = Number(dirtyNumber);
  return number.toString();
};

export const localize: Localize = {
  ordinalNumber: _ordinalNumber,
  era: buildLocalizeFn({
    values: ERA_VALUES,
    defaultWidth: 'wide',
  }),
  quarter: buildLocalizeFn({
    values: QUARTER_VALUES,
    defaultWidth: 'wide',
    argumentCallback: (quarter) => quarter - 1,
  }),
  month: buildLocalizeFn({
    values: MONTH_VALUES,
    defaultWidth: 'wide',
  }),
  day: buildLocalizeFn({
    values: DAY_VALUES,
    defaultWidth: 'wide',
  }),
  dayPeriod: buildLocalizeFn({
    values: DAY_PERIOD_VALUES,
    defaultWidth: 'wide',
    formattingValues: FORMATTING_DAY_PERIOD_VALUES,
    defaultFormattingWidth: 'wide',
  }),
};
