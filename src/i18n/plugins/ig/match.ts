import type { Match, Quarter } from 'date-fns';

import { buildMatchFn, buildMatchPatternFn } from '../utils';

const matchOrdinalNumberPattern = /^(\d+)/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(t|a)/i,
  abbreviated: /^(t\.?k\.?|a\.?k\.?)/i,
  wide: /^(tupu kraist|afọ kraist)/i,
};
const parseEraPatterns = {
  any: [/^t/i, /^a/i] as const,
  wide: [/^tupu kraist/i, /^afọ kraist/i] as const,
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^Ọ[1234]/i,
  wide: /^Ọkara [1234]/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i] as const,
};

const matchMonthPatterns = {
  narrow: /^[jfmanjsond]/i,
  abbreviated: /^(Jen|Feb|Maa|Epr|Mee|Jun|Jul|Ọgọ|Sep|Ọkt|Nov|Dis)/i,
  wide: /^(Jenụwarị|Febrụwarị|Maachị|Eprel|Mee|Juun|Julaị|Ọgọọst|Septemba|Ọktoba|Novemba|Disemba)/i,
};
const parseMonthPatterns = {
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

const matchDayPatterns = {
  narrow: /^[mwtnfs]/i,
  short: /^(Ụka|Mọn|Tiu|Wen|Tọọ|Fra|Sat)/i,
  abbreviated: /^(Ụka|Mọn|Tiu|Wen|Tọọ|Fra|Sat)/i,
  wide: /^(Mbọsị Ụka|Mọnde|Tiuzdee|Wenezdee|Tọọzdee|Fraịdee|Satọdee)/i,
};
const parseDayPatterns = {
  narrow: [/^ụ/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i] as const,
  any: [/^ụka/i, /^mọn/i, /^tiu/i, /^wen/i, /^tọọ/i, /^fra/i, /^sat/i] as const,
};

const matchDayPeriodPatterns = {
  narrow: /^(a\.m\.|p\.m\.|etiti|ehihie|mgbede|abalị)/i,
  any: /^(a\.m\.|p\.m\.|n'ụtụtụ|n'ehihie|n'abalị)/i,
};
const parseDayPeriodPatterns = {
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
