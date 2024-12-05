import type { Localize, LocalizeFn } from 'date-fns';

import { buildLocalizeFn } from '../utils';

const eraValues = {
  narrow: ['ଖ୍ରି.ପୂ', 'ଖ୍ରି.'] as const,
  abbreviated: ['ଖ୍ରି.ପୂ', 'ଖ୍ରି.'] as const,
  wide: ['ଖ୍ରୀଷ୍ଟପୂର୍ବ', 'ଖ୍ରୀଷ୍ଟାବ୍ଦ'] as const,
};

const quarterValues = {
  narrow: ['1', '2', '3', '4'] as const,
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'] as const,
  wide: ['1ମ ତ୍ରୟମାସ', '2ୟ ତ୍ରୟମାସ', '3ୟ ତ୍ରୟମାସ', '4ର୍ଥ ତ୍ରୟମାସ'] as const,
};

const monthValues = {
  narrow: ['ଜା', 'ଫେ', 'ମା', 'ଅ', 'ମଇ', 'ଜୁ', 'ଜୁ', 'ଅ', 'ସେ', 'ଅ', 'ନ', 'ଡି'] as const,
  abbreviated: [
    'ଜାନୁଆରୀ',
    'ଫେବୃଆରୀ',
    'ମାର୍ଚ୍ଚ',
    'ଅପ୍ରେଲ',
    'ମଇ',
    'ଜୁନ',
    'ଜୁଲାଇ',
    'ଅଗଷ୍ଟ',
    'ସେପ୍ଟେମ୍ବର',
    'ଅକ୍ଟୋବର',
    'ନଭେମ୍ବର',
    'ଡିସେମ୍ବର',
  ] as const,
  wide: [
    'ଜାନୁଆରୀ',
    'ଫେବୃଆରୀ',
    'ମାର୍ଚ୍ଚ',
    'ଅପ୍ରେଲ',
    'ମଇ',
    'ଜୁନ',
    'ଜୁଲାଇ',
    'ଅଗଷ୍ଟ',
    'ସେପ୍ଟେମ୍ବର',
    'ଅକ୍ଟୋବର',
    'ନଭେମ୍ବର',
    'ଡିସେମ୍ବର',
  ] as const,
};

const dayValues = {
  narrow: ['ର', 'ସୋ', 'ମ', 'ବୁ', 'ଗୁ', 'ଶୁ', 'ଶ'] as const,
  short: ['ରବି', 'ସୋମ', 'ମଙ୍ଗଳ', 'ବୁଧ', 'ଗୁରୁ', 'ଶୁକ୍ର', 'ଶନି'] as const,
  abbreviated: ['ରବି', 'ସୋମ', 'ମଙ୍ଗଳ', 'ବୁଧ', 'ଗୁରୁ', 'ଶୁକ୍ର', 'ଶନି'] as const,
  wide: ['ରବିବାର', 'ସୋମବାର', 'ମଙ୍ଗଳବାର', 'ବୁଧବାର', 'ଗୁରୁବାର', 'ଶୁକ୍ରବାର', 'ଶନିବାର'] as const,
};

const dayPeriodValues = {
  narrow: {
    am: 'ପୂ',
    pm: 'ଅ',
    midnight: 'ଅର୍ଦ୍ଧରାତ୍ର',
    noon: 'ମଧ୍ୟାହ୍ନ',
    morning: 'ସକାଳ',
    afternoon: 'ଅପରାହ୍ନ',
    evening: 'ସନ୍ଧ୍ୟା',
    night: 'ରାତ୍ର',
  },
  abbreviated: {
    am: 'ପୂର୍ବାହ୍ନ',
    pm: 'ଅପରାହ୍ନ',
    midnight: 'ଅର୍ଦ୍ଧରାତ୍ର',
    noon: 'ମଧ୍ୟାହ୍ନ',
    morning: 'ସକାଳ',
    afternoon: 'ଅପରାହ୍ନ',
    evening: 'ସନ୍ଧ୍ୟା',
    night: 'ରାତ୍ର',
  },
  wide: {
    am: 'ପୂର୍ବାହ୍ନ',
    pm: 'ଅପରାହ୍ନ',
    midnight: 'ଅର୍ଦ୍ଧରାତ୍ର',
    noon: 'ମଧ୍ୟାହ୍ନ',
    morning: 'ସକାଳ',
    afternoon: 'ଅପରାହ୍ନ',
    evening: 'ସନ୍ଧ୍ୟା',
    night: 'ରାତ୍ର',
  },
};

const formattingDayPeriodValues = {
  narrow: {
    am: 'ପୂ',
    pm: 'ଅ',
    midnight: 'ଅର୍ଦ୍ଧରାତ୍ର',
    noon: 'ମଧ୍ୟାହ୍ନ',
    morning: 'ସକାଳେ',
    afternoon: 'ଅପରାହ୍ନରେ',
    evening: 'ସନ୍ଧ୍ୟାରେ',
    night: 'ରାତିରେ',
  },
  abbreviated: {
    am: 'ପୂର୍ବାହ୍ନ',
    pm: 'ଅପରାହ୍ନ',
    midnight: 'ଅର୍ଦ୍ଧରାତ୍ର',
    noon: 'ମଧ୍ୟାହ୍ନ',
    morning: 'ସକାଳେ',
    afternoon: 'ଅପରାହ୍ନରେ',
    evening: 'ସନ୍ଧ୍ୟାରେ',
    night: 'ରାତିରେ',
  },
  wide: {
    am: 'ପୂର୍ବାହ୍ନ',
    pm: 'ଅପରାହ୍ନ',
    midnight: 'ଅର୍ଦ୍ଧରାତ୍ର',
    noon: 'ମଧ୍ୟାହ୍ନ',
    morning: 'ସକାଳେ',
    afternoon: 'ଅପରାହ୍ନରେ',
    evening: 'ସନ୍ଧ୍ୟାରେ',
    night: 'ରାତିରେ',
  },
};

const ordinalNumber: LocalizeFn<number> = (dirtyNumber) => {
  const number = Number(dirtyNumber);
  return number.toString();
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
