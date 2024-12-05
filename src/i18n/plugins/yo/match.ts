import type { Match, Quarter } from 'date-fns';

import { buildMatchFn, buildMatchPatternFn } from '../utils';

const matchOrdinalNumberPattern = /^(\d+)/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(s|l)/i,
  abbreviated: /^(s\.?k\.?|l\.?k\.?)/i,
  wide: /^(saju kristiani|lehin kristiani)/i,
};
const parseEraPatterns = {
  any: [/^s/i, /^l/i] as const,
  wide: [/^saju kristiani/i, /^lehin kristiani/i] as const,
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^i[1234]/i,
  wide: /^idaji k[1234]/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i] as const,
};

const matchMonthPatterns = {
  narrow: /^[jfmagosnd]/i,
  abbreviated: /^(she|ere|ern|igb|agy|oku|ije|ogu|owe|ope|ben|ose)/i,
  wide: /^(osu shɛrɛ|osu erele|osu ɛrɛna|osu igbe|osu ɛbibi|osu okudu|osu agɛmo|osu ogunja|osu owara|osu ɔpɛ|osu belu|osu ɔpɛ keje)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^s/i,
    /^e/i,
    /^ɛ/i,
    /^i/i,
    /^ɛ/i,
    /^o/i,
    /^a/i,
    /^o/i,
    /^o/i,
    /^ɔ/i,
    /^b/i,
    /^ɔ/i,
  ] as const,
  any: [
    /^she/i,
    /^ere/i,
    /^ɛrɛ/i,
    /^igb/i,
    /^ɛbi/i,
    /^oku/i,
    /^agɛ/i,
    /^ogu/i,
    /^owa/i,
    /^ɔpɛ$/i,
    /^bel/i,
    /^ɔpɛ k/i,
  ] as const,
};

const matchDayPatterns = {
  narrow: /^[abɛɔir]/i,
  short: /^(ài|aj|ìs|ɔj|ɛt|àb|ab)/i,
  abbreviated: /^(àìk|ajé|ìsɛ́|ɔjɔ́|ɛti|àbá|àbà)/i,
  wide: /^(ɔjɔ́ àìkú|ɔjɔ́ ajé|ɔjɔ́ ìsɛ́gun|ɔjɔ́rú|ɔjɔ́ ɛtì|ɔjɔ́ àbámɛ́ta|ɔjɔ́ àbàmɛ́ta)/i,
};
const parseDayPatterns = {
  narrow: [/^à/i, /^a/i, /^ì/i, /^ɔ/i, /^ɛ/i, /^à/i, /^à/i] as const,
  any: [/^àì/i, /^aj/i, /^ìs/i, /^ɔjɔ́r/i, /^ɛt/i, /^àbám/i, /^àbàm/i] as const,
};

const matchDayPeriodPatterns = {
  narrow: /^(àárɔ̀|ɔ̀sán|alɛ́|oru)/i,
  any: /^(àárɔ̀|ɔ̀sán|alɛ́|oru)/i,
};
const parseDayPeriodPatterns = {
  any: {
    am: /^à/i,
    pm: /^ɔ̀/i,
    midnight: /^o/i,
    noon: /^ɔ̀s/i,
    morning: /^àá/i,
    afternoon: /^ɔ̀s/i,
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
