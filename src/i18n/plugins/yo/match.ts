import type { Match, Quarter } from 'date-fns';

import { buildMatchFn, buildMatchPatternFn } from '../utils';

const matchOrdinalNumberPattern = /^(\d+)/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(s|l)/i,
  abbreviated: /^(BCE|CE)/i,
  wide: /^(Saju Kristi|Lehin Kristi)/i,
};
const parseEraPatterns = {
  any: [/^s/i, /^l/i] as const,
  wide: [/^saju kristi/i, /^lehin kristi/i] as const,
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^K[1234]/i,
  wide: /^Keji kini [1234]/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i] as const,
};

const matchMonthPatterns = {
  narrow: /^[JFMAJSOND]/i,
  abbreviated: /^(Ṣẹ́r|Èrèl|Ẹrẹ̀n|Ìgb|Ẹ̀bi|Òkú|Agẹ|Ògú|Owe|Ọ̀pẹ|Bél|Ọ̀pẹ)/i,
  wide: /^(Oṣù Ṣẹ́rẹ́|Oṣù Èrèlè|Oṣù Ẹrẹ̀nà|Oṣù Ìgbé|Oṣù Ẹ̀bibi|Oṣù Òkúdu|Oṣù Agẹmọ|Oṣù Ògún|Oṣù Owewe|Oṣù Ọ̀wàrà|Oṣù Bélú|Oṣù Ọ̀pẹ̀)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^Ṣ/i,
    /^È/i,
    /^Ẹ/i,
    /^Ì/i,
    /^Ẹ̀/i,
    /^Ò/i,
    /^A/i,
    /^Ò/i,
    /^O/i,
    /^Ọ̀/i,
    /^B/i,
    /^Ọ̀p/i,
  ] as const,
  any: [
    /^Ṣẹ́/i,
    /^Èrè/i,
    /^Ẹrẹ̀/i,
    /^Ìgb/i,
    /^Ẹ̀bi/i,
    /^Òkú/i,
    /^Agẹ/i,
    /^Ògú/i,
    /^Owe/i,
    /^Ọ̀wà/i,
    /^Bél/i,
    /^Ọ̀pẹ/i,
  ] as const,
};

const matchDayPatterns = {
  narrow: /^[AMỊỌRE]/i,
  short: /^(Àì|Aj|Ìs|Ọj|Ẹt|Àb|Àb)/i,
  abbreviated: /^(Àìk|Ajé|Ìsẹ́|Ọjọ́|Ẹti|Àbá|Àbà)/i,
  wide: /^(Ọjọ́ Àìkú|Ọjọ́ Ajé|Ọjọ́ Ìsẹ́gun|Ọjọ́rú|Ọjọ́ Ẹtì|Ọjọ́ Àbámẹ́ta|Ọjọ́ Àbàmẹ́ta)/i,
};
const parseDayPatterns = {
  narrow: [/^À/i, /^A/i, /^Ì/i, /^Ọ/i, /^Ẹ/i, /^À/i, /^À/i] as const,
  any: [/^Àìk/i, /^Aj/i, /^Ìs/i, /^Ọjọ́r/i, /^Ẹt/i, /^Àbám/i, /^Àbàm/i] as const,
};

const matchDayPeriodPatterns = {
  narrow: /^(àárọ̀|ọ̀sán|alẹ́|oru)/i,
  any: /^(àárọ̀|ọ̀sán|alẹ́|oru)/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^à/i,
    pm: /^ọ̀/i,
    midnight: /^o/i,
    noon: /^ọ̀s/i,
    morning: /^àá/i,
    afternoon: /^ọ̀s/i,
    evening: /^a/i,
    night: /^o/i,
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
