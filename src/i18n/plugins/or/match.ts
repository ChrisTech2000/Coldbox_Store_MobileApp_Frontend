import type { Match, Quarter } from 'date-fns';

import { buildMatchFn, buildMatchPatternFn } from '../utils';

const matchOrdinalNumberPattern = /^(\d+)(ମ|ୟ|ଥ|ର୍ଥ)?/i;
const parseOrdinalNumberPattern = /\d+/i;

const matchEraPatterns = {
  narrow: /^(ଖ୍ରୀ\.ପୂ\.|ଖ୍ରୀ\.)/i,
  abbreviated: /^(ଖ୍ରୀ\.ପୂ\.|ଖ୍ରୀ\.)/i,
  wide: /^(ଖ୍ରୀଷ୍ଟପୂର୍ବ|ଖ୍ରୀଷ୍ଟାବ୍ଦ)/i,
};
const parseEraPatterns = {
  any: [/^ଖ୍ରୀ\.ପୂ/i, /^ଖ୍ରୀ/i] as const,
  wide: [/^ଖ୍ରୀଷ୍ଟପୂର୍ବ/i, /^ଖ୍ରୀଷ୍ଟାବ୍ଦ/i] as const,
};

const matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^Q[1234]/i,
  wide: /^[1234](ମ|ୟ|ଥ|ର୍ଥ) ତ୍ରୟମାସ/i,
};
const parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i] as const,
};

const matchMonthPatterns = {
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

const matchDayPatterns = {
  narrow: /^[ରସମବଗଶ]/i,
  short: /^(ରବି|ସୋମ|ମଙ୍ଗଳ|ବୁଧ|ଗୁରୁ|ଶୁକ୍ର|ଶନି)/i,
  abbreviated: /^(ରବି|ସୋମ|ମଙ୍ଗଳ|ବୁଧ|ଗୁରୁ|ଶୁକ୍ର|ଶନି)/i,
  wide: /^(ରବିବାର|ସୋମବାର|ମଙ୍ଗଳବାର|ବୁଧବାର|ଗୁରୁବାର|ଶୁକ୍ରବାର|ଶନିବାର)/i,
};
const parseDayPatterns = {
  narrow: [/^ର/i, /^ସୋ/i, /^ମ/i, /^ବୁ/i, /^ଗୁ/i, /^ଶୁ/i, /^ଶ/i] as const,
  any: [/^ର/i, /^ସୋ/i, /^ମ/i, /^ବୁ/i, /^ଗୁ/i, /^ଶୁ/i, /^ଶ/i] as const,
};

const matchDayPeriodPatterns = {
  narrow: /^(ପୂ|ଅ|ମ|ସ|ସନ୍ଧ୍ୟା|ରାତି)/i,
  any: /^(ପୂର୍ବାହ୍ନ|ଅପରାହ୍ନ|ମଧ୍ୟାହ୍ନ|ସକାଳ|ସନ୍ଧ୍ୟା|ରାତି)/i,
};
const parseDayPeriodPatterns = {
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
