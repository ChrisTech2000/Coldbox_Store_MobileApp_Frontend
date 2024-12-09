import type { Localize, LocalizeFn } from 'date-fns';

import { buildLocalizeFn } from '../utils';

const ERA_VALUES = {
  narrow: ['SK', 'LK'] as const,
  abbreviated: ['SK', 'LK'] as const,
  wide: ['Saju Kristi', 'Lehin Kristi'] as const,
};

const QUARTER_VALUES = {
  narrow: ['1', '2', '3', '4'] as const,
  abbreviated: ['K1', 'K2', 'K3', 'K4'] as const,
  wide: ['Idaji kini', 'Idaji keji', 'Idaji kẹta', 'Idaji kẹrin'] as const,
};

const MONTH_VALUES = {
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

const DAY_VALUES = {
  narrow: ['1', '2', '3', '4', '5', '6', '7'] as const,
  short: ['Àìk', 'Ajé', 'Ìsẹ́', 'Ọjọ́', 'Ọjọ́', 'Ẹtì', 'Àbá'] as const,
  abbreviated: ['Àìkú', 'Ajé', 'Ìsẹ́gun', 'Ọjọ́rú', 'Ọjọ́bọ', 'Ẹtì', 'Àbámẹ́ta'] as const,
  wide: ['Ọjọ́ Àìkú', 'Ọjọ́ Ajé', 'Ọjọ́ Ìsẹ́gun', 'Ọjọ́rú', 'Ọjọ́bọ', 'Ọjọ́ Ẹtì', 'Ọjọ́ Àbámẹ́ta'] as const,
};

const DAY_PERIOD_VALUES = {
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

const FORMATTING_DAY_PERIOD_VALUES = {
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

const _ordinalNumber: LocalizeFn<number> = (dirtyNumber) => {
  const number = Number(dirtyNumber);
  return number + 'k';
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
