import type { Match, Quarter } from 'date-fns';

import { buildMatchFn, buildMatchPatternFn } from '../utils';

const matchOrdinalNumberPattern = /^(\d+)/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(k|b)/i,
  abbreviated: /^(k\.?\.?m\.?|b\.?\.?m\.?)/i,
  wide: /^(kafin miladi|bayan miladi)/i,
};
const parseEraPatterns = {
  any: [/^k/i, /^b/i] as const,
  wide: [/^kafin miladi/i, /^bayan miladi/i] as const,
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^k[1234]/i,
  wide: /^kwata na [1234] na shekara/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i] as const,
};

const matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(Jan|Fab|Mar|Afi|May|Yun|Yul|Agu|Sat|Okt|Nuw|Dis)/i,
  wide: /^(Janairu|Fabrairu|Maris|Afirilu|Mayu|Yuni|Yuli|Agusta|Satumba|Oktoba|Nuwamba|Disamba)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^y/i,
    /^y/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ] as const,
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^af/i,
    /^may/i,
    /^yun/i,
    /^yul/i,
    /^ag/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i,
  ] as const,
};

const matchDayPatterns = {
  narrow: /^[ltkarj]/i,
  short: /^(Lh|Li|Ta|Lr|Al|Ju|As)/i,
  abbreviated: /^(Lah|Lit|Tal|Lar|Alh|Jum|Asa)/i,
  wide: /^(Lahadi|Litinin|Talata|Laraba|Alhamis|Jumma'a|Asabar)/i,
};
const parseDayPatterns = {
  narrow: [/^l/i, /^l/i, /^t/i, /^l/i, /^a/i, /^j/i, /^a/i] as const,
  any: [/^la/i, /^li/i, /^ta/i, /^lar/i, /^al/i, /^j/i, /^as/i] as const,
};

const matchDayPeriodPatterns = {
  narrow: /^(safe|yamma|da safe|da rana|da yamma|dare)/i,
  any: /^(safe|yamma|da safe|da rana|da yamma|dare)/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^s/i,
    pm: /^y/i,
    midnight: /^dare/i,
    noon: /^rana/i,
    morning: /safe/i,
    afternoon: /da rana/i,
    evening: /da yamma/i,
    night: /dare/i,
  },
};

export const match: Match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: (value) => parseInt(value, 10),
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any',
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: (index) => (index + 1) as Quarter,
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any',
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any',
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any',
  }),
};
