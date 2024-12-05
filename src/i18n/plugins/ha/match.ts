import type { Match, Quarter } from 'date-fns';

import { buildMatchFn, buildMatchPatternFn } from '../utils';

const MATCH_ORDINAL_NUMBER_PATTERN = /^(\d+)/i;
const PARSE_ORDINAL_NUMBER_PATTERN = /\d+/i;

const MATCH_ERA_PATTERNS = {
  narrow: /^(k|b)/i,
  abbreviated: /^(k\.?\.?m\.?|b\.?\.?m\.?)/i,
  wide: /^(kafin miladi|bayan miladi)/i,
};
const PARSE_ERA_PATTERNS = {
  any: [/^k/i, /^b/i] as const,
  wide: [/^kafin miladi/i, /^bayan miladi/i] as const,
};

const MATCH_QUARTER_PATTERNS = {
  narrow: /^[1234]/i,
  abbreviated: /^k[1234]/i,
  wide: /^kwata na [1234] na shekara/i,
};
const PARSE_QUARTER_PARTTERNS = {
  any: [/1/i, /2/i, /3/i, /4/i] as const,
};

const MATCH_MONTH_PATTERNS = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(Jan|Fab|Mar|Afi|May|Yun|Yul|Agu|Sat|Okt|Nuw|Dis)/i,
  wide: /^(Janairu|Fabrairu|Maris|Afirilu|Mayu|Yuni|Yuli|Agusta|Satumba|Oktoba|Nuwamba|Disamba)/i,
};
const PARSE_MONTH_PATTERNS = {
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

const MATCH_DAY_PATTERNS = {
  narrow: /^[ltkarj]/i,
  short: /^(Lh|Li|Ta|Lr|Al|Ju|As)/i,
  abbreviated: /^(Lah|Lit|Tal|Lar|Alh|Jum|Asa)/i,
  wide: /^(Lahadi|Litinin|Talata|Laraba|Alhamis|Jumma'a|Asabar)/i,
};
const PARSE_DAY_PATTERNS = {
  narrow: [/^l/i, /^l/i, /^t/i, /^l/i, /^a/i, /^j/i, /^a/i] as const,
  any: [/^la/i, /^li/i, /^ta/i, /^lar/i, /^al/i, /^j/i, /^as/i] as const,
};

const MATCH_DAY_PERIOD_PATTERNS = {
  narrow: /^(safe|yamma|da safe|da rana|da yamma|dare)/i,
  any: /^(safe|yamma|da safe|da rana|da yamma|dare)/i,
};
const PARSE_DAY_PERIOD_PATTERNS = {
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
    matchPattern: MATCH_ORDINAL_NUMBER_PATTERN,
    parsePattern: PARSE_ORDINAL_NUMBER_PATTERN,
    valueCallback: (value) => parseInt(value, 10),
  }),
  era: buildMatchFn({
    matchPatterns: MATCH_ERA_PATTERNS,
    defaultMatchWidth: 'wide',
    parsePatterns: PARSE_ERA_PATTERNS,
    defaultParseWidth: 'any',
  }),
  quarter: buildMatchFn({
    matchPatterns: MATCH_QUARTER_PATTERNS,
    defaultMatchWidth: 'wide',
    parsePatterns: PARSE_QUARTER_PARTTERNS,
    defaultParseWidth: 'any',
    valueCallback: (index) => (index + 1) as Quarter,
  }),
  month: buildMatchFn({
    matchPatterns: MATCH_MONTH_PATTERNS,
    defaultMatchWidth: 'wide',
    parsePatterns: PARSE_MONTH_PATTERNS,
    defaultParseWidth: 'any',
  }),
  day: buildMatchFn({
    matchPatterns: MATCH_DAY_PATTERNS,
    defaultMatchWidth: 'wide',
    parsePatterns: PARSE_DAY_PATTERNS,
    defaultParseWidth: 'any',
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: MATCH_DAY_PERIOD_PATTERNS,
    defaultMatchWidth: 'any',
    parsePatterns: PARSE_DAY_PERIOD_PATTERNS,
    defaultParseWidth: 'any',
  }),
};
