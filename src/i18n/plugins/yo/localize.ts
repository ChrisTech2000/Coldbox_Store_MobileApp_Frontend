import type { Localize, LocalizeFn } from 'date-fns';

import { buildLocalizeFn } from '../utils';

const eraValues = {
  narrow: ['SK', 'LK'] as const,
  abbreviated: ['SK', 'LK'] as const,
  wide: ['Saju Kristi', 'Lehin Kristi'] as const,
};

const quarterValues = {
  narrow: ['1', '2', '3', '4'] as const,
  abbreviated: ['K1', 'K2', 'K3', 'K4'] as const,
  wide: ['Idaji kini', 'Idaji keji', 'Idaji kẹta', 'Idaji kẹrin'] as const,
};

const monthValues = {
  narrow: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] as const,
  abbreviated: [
    'Ṣẹ́rẹ́',
    'Èrèlè',
    'Ẹrẹ̀nà',
    'Ìgbé',
    'Ẹ̀bibi',
    'Òkúdu',
    'Agẹmọ',
    'Ògún',
    'Owewe',
    'Ọ̀wàrà',
    'Bélú',
    'Ọ̀pẹ̀',
  ] as const,
  wide: [
    'Oṣù Ṣẹ́rẹ́',
    'Oṣù Èrèlè',
    'Oṣù Ẹrẹ̀nà',
    'Oṣù Ìgbé',
    'Oṣù Ẹ̀bibi',
    'Oṣù Òkúdu',
    'Oṣù Agẹmọ',
    'Oṣù Ògún',
    'Oṣù Owewe',
    'Oṣù Ọ̀wàrà',
    'Oṣù Bélú',
    'Oṣù Ọ̀pẹ̀',
  ] as const,
};

const dayValues = {
  narrow: ['1', '2', '3', '4', '5', '6', '7'] as const,
  short: ['Àìk', 'Ajé', 'Ìsẹ́', 'Ọjọ́', 'Ọjọ́', 'Ẹtì', 'Àbá'] as const,
  abbreviated: ['Àìkú', 'Ajé', 'Ìsẹ́gun', 'Ọjọ́rú', 'Ọjọ́bọ', 'Ẹtì', 'Àbámẹ́ta'] as const,
  wide: ['Ọjọ́ Àìkú', 'Ọjọ́ Ajé', 'Ọjọ́ Ìsẹ́gun', 'Ọjọ́rú', 'Ọjọ́bọ', 'Ọjọ́ Ẹtì', 'Ọjọ́ Àbámẹ́ta'] as const,
};

const dayPeriodValues = {
  narrow: {
    am: 'àárọ̀',
    pm: 'ọ̀sán',
    midnight: 'àárọ̀',
    noon: 'ọ̀sán',
    morning: 'àárọ̀',
    afternoon: 'ọ̀sán',
    evening: 'ìrọ̀lẹ́',
    night: 'alẹ́',
  },
  abbreviated: {
    am: 'Àárọ̀',
    pm: 'Ọ̀sán',
    midnight: 'Àárọ̀',
    noon: 'Ọ̀sán',
    morning: 'Àárọ̀',
    afternoon: 'Ọ̀sán',
    evening: 'Ìrọ̀lẹ́',
    night: 'Alẹ́',
  },
  wide: {
    am: 'Àárọ̀',
    pm: 'Ọ̀sán',
    midnight: 'Àárọ̀',
    noon: 'Ọ̀sán',
    morning: 'Àárọ̀',
    afternoon: 'Ọ̀sán',
    evening: 'Ìrọ̀lẹ́',
    night: 'Alẹ́',
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: 'àárọ̀',
    pm: 'ọ̀sán',
    midnight: 'àárọ̀',
    noon: 'ọ̀sán',
    morning: 'àárọ̀',
    afternoon: 'ọ̀sán',
    evening: 'ìrọ̀lẹ́',
    night: 'alẹ́',
  },
  abbreviated: {
    am: 'Àárọ̀',
    pm: 'Ọ̀sán',
    midnight: 'Àárọ̀',
    noon: 'Ọ̀sán',
    morning: 'Àárọ̀',
    afternoon: 'Ọ̀sán',
    evening: 'Ìrọ̀lẹ́',
    night: 'Alẹ́',
  },
  wide: {
    am: 'Àárọ̀',
    pm: 'Ọ̀sán',
    midnight: 'Àárọ̀',
    noon: 'Ọ̀sán',
    morning: 'Àárọ̀',
    afternoon: 'Ọ̀sán',
    evening: 'Ìrọ̀lẹ́',
    night: 'Alẹ́',
  },
};

const ordinalNumber: LocalizeFn<number> = (dirtyNumber) => {
  const number = Number(dirtyNumber);
  return number + 'k';
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
