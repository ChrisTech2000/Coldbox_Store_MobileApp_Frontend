import type { Match, Quarter } from 'date-fns';

import { buildMatchFn, buildMatchPatternFn } from '../utils';

const MATCH_ORDINAL_NUMBER_PATTERN = /^(\d+)(ମ|ୟ|ଥ|ର୍ଥ)?/i;
const PARSE_ORDINAL_NUMBER_PATTERN = /\d+/i;

const MATCH_ERA_PATTERNS = {
  narrow: /^(ଖ୍ରୀ\.ପୂ\.|ଖ୍ରୀ\.)/i,
  abbreviated: /^(ଖ୍ରୀ\.ପୂ\.|ଖ୍ରୀ\.)/i,
  wide: /^(ଖ୍ରୀଷ୍ଟପୂର୍ବ|ଖ୍ରୀଷ୍ଟାବ୍ଦ)/i,
};
const PARSE_ERA_PATTERNS = {
  any: [/^ଖ୍ରୀ\.ପୂ/i, /^ଖ୍ରୀ/i] as const,
  wide: [/^ଖ୍ରୀଷ୍ଟପୂର୍ବ/i, /^ଖ୍ରୀଷ୍ଟାବ୍ଦ/i] as const,
};

const MATCH_QUARTER_PATTERNS = {
  narrow: /^[1234]/i,
  abbreviated: /^Q[1234]/i,
  wide: /^[1234](ମ|ୟ|ଥ|ର୍ଥ) ତ୍ରୟମାସ/i,
};
const PARSE_QUARTER_PARTTERNS = {
  any: [/1/i, /2/i, /3/i, /4/i] as const,
};

const MATCH_MONTH_PATTERNS = {
  narrow: /^[ଜଫମଏମଜଅସଅନଡ]/i,
  abbreviated: /^(ଜାନୁ|ଫେବୃ|ମାର୍ଚ୍ଚ|ଅପ୍ରେ|ମଇ|ଜୁନ|ଜୁଲା|ଅଗ|ସେପ୍ଟେ|ଅକ୍ଟୋ|ନଭେ|ଡିସେ)/i,
  wide: /^(ଜାନୁଆରୀ|ଫେବୃଆରୀ|ମାର୍ଚ୍ଚ|ଅପ୍ରେଲ|ମଇ|ଜୁନ|ଜୁଲାଇ|ଅଗଷ୍ଟ|ସେପ୍ଟେମ୍ବର|ଅକ୍ଟୋବର|ନଭେମ୍ବର|ଡିସେମ୍ବର)/i,
};
const parseMonthPatterns = {
  narrow: [
    /^ଜା/i,
    /^ଫେ/i,
    /^ମା/i,
    /^ଅ/i,
    /^ମଇ/i,
    /^ଜୁନ/i,
    /^ଜୁଲା/i,
    /^ଅଗ/i,
    /^ସେ/i,
    /^ଅକ୍ଟୋ/i,
    /^ନ/i,
    /^ଡି/i,
  ] as const,
  any: [
    /^ଜା/i,
    /^ଫେ/i,
    /^ମା/i,
    /^ଅପ୍ରେ/i,
    /^ମଇ/i,
    /^ଜୁନ/i,
    /^ଜୁଲା/i,
    /^ଅଗ/i,
    /^ସେ/i,
    /^ଅକ୍ଟୋ/i,
    /^ନ/i,
    /^ଡି/i,
  ] as const,
};

const MATCH_DAY_PATTERNS = {
  narrow: /^[ରସମବଗଶ]/i,
  short: /^(ରବି|ସୋମ|ମଙ୍ଗଳ|ବୁଧ|ଗୁରୁ|ଶୁକ୍ର|ଶନି)/i,
  abbreviated: /^(ରବି|ସୋମ|ମଙ୍ଗଳ|ବୁଧ|ଗୁରୁ|ଶୁକ୍ର|ଶନି)/i,
  wide: /^(ରବିବାର|ସୋମବାର|ମଙ୍ଗଳବାର|ବୁଧବାର|ଗୁରୁବାର|ଶୁକ୍ରବାର|ଶନିବାର)/i,
};
const PARSE_DAY_PATTERNS = {
  narrow: [/^ର/i, /^ସୋ/i, /^ମ/i, /^ବୁ/i, /^ଗୁ/i, /^ଶୁ/i, /^ଶ/i] as const,
  any: [/^ର/i, /^ସୋ/i, /^ମ/i, /^ବୁ/i, /^ଗୁ/i, /^ଶୁ/i, /^ଶ/i] as const,
};

const MATCH_DAY_PERIOD_PATTERNS = {
  narrow: /^(ପୂ|ଅ|ମ|ସ|ସନ୍ଧ୍ୟା|ରାତି)/i,
  any: /^(ପୂର୍ବାହ୍ନ|ଅପରାହ୍ନ|ମଧ୍ୟାହ୍ନ|ସକାଳ|ସନ୍ଧ୍ୟା|ରାତି)/i,
};
const PARSE_DAY_PERIOD_PATTERNS = {
  any: {
    am: /^ପୂ/i,
    pm: /^ଅ/i,
    midnight: /^ମ/i,
    noon: /^ମଧ୍ୟାହ୍ନ/i,
    morning: /ସକାଳ/i,
    afternoon: /ଅପରାହ୍ନ/i,
    evening: /ସନ୍ଧ୍ୟା/i,
    night: /ରାତି/i,
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
    parsePatterns: parseMonthPatterns,
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
