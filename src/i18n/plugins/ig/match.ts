import type { Match, Quarter } from 'date-fns';

import { buildMatchFn, buildMatchPatternFn } from '../utils';

const MATCH_ORDINAL_NUMBER_PATTERN = /^(\d+)/i;
const PARSE_ORDINAL_NUMBER_PATTERN = /\d+/i;

const MATCH_ERA_PATTERNS = {
  narrow: /^(t|a)/i,
  abbreviated: /^(t\.?k\.?|a\.?k\.?)/i,
  wide: /^(tupu kraist|afọ kraist)/i,
};
const PARSE_ERA_PATTERNS = {
  any: [/^t/i, /^a/i] as const,
  wide: [/^tupu kraist/i, /^afọ kraist/i] as const,
};

const MATCH_QUARTER_PATTERNS = {
  narrow: /^[1234]/i,
  abbreviated: /^Ọ[1234]/i,
  wide: /^Ọkara [1234]/i,
};
const PARSE_QUARTER_PARTTERNS = {
  any: [/1/i, /2/i, /3/i, /4/i] as const,
};

const MATCH_MONTH_PATTERNS = {
  narrow: /^[jfmanjsond]/i,
  abbreviated: /^(Jen|Feb|Maa|Epr|Mee|Jun|Jul|Ọgọ|Sep|Ọkt|Nov|Dis)/i,
  wide: /^(Jenụwarị|Febrụwarị|Maachị|Eprel|Mee|Juun|Julaị|Ọgọọst|Septemba|Ọktoba|Novemba|Disemba)/i,
};
const PARSE_MONTH_PATTERNS = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^e/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^ọ/i,
    /^s/i,
    /^ọ/i,
    /^n/i,
    /^d/i,
  ] as const,
  any: [
    /^jen/i,
    /^feb/i,
    /^maa/i,
    /^epr/i,
    /^mee/i,
    /^jun/i,
    /^jul/i,
    /^ọgọ/i,
    /^sep/i,
    /^ọkt/i,
    /^nov/i,
    /^dis/i,
  ] as const,
};

const MATCH_DAY_PATTERNS = {
  narrow: /^[mwtnfs]/i,
  short: /^(Ụka|Mọn|Tiu|Wen|Tọọ|Fra|Sat)/i,
  abbreviated: /^(Ụka|Mọn|Tiu|Wen|Tọọ|Fra|Sat)/i,
  wide: /^(Mbọsị Ụka|Mọnde|Tiuzdee|Wenezdee|Tọọzdee|Fraịdee|Satọdee)/i,
};
const PARSE_DAY_PATTERNS = {
  narrow: [/^ụ/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i] as const,
  any: [/^ụka/i, /^mọn/i, /^tiu/i, /^wen/i, /^tọọ/i, /^fra/i, /^sat/i] as const,
};

const MATCH_DAY_PERIOD_PATTERNS = {
  narrow: /^(a\.m\.|p\.m\.|etiti|ehihie|mgbede|abalị)/i,
  any: /^(a\.m\.|p\.m\.|n'ụtụtụ|n'ehihie|n'abalị)/i,
};
const PARSE_DAY_PERIOD_PATTERNS = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^etiti/i,
    noon: /^ehihie/i,
    morning: /ụtụtụ/i,
    afternoon: /ehihie/i,
    evening: /mgbede/i,
    night: /abalị/i,
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
