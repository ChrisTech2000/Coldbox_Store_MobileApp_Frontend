/* eslint-disable  @typescript-eslint/no-explicit-any */
import type {
  FormatLongFn,
  FormatLongWidth,
  Day,
  Era,
  Month,
  Quarter,
  LocaleDayPeriod,
  LocaleUnitValue,
  LocaleWidth,
  LocalizeFn,
  MatchValueCallback,
  MatchFn,
} from 'date-fns';

export type FormatDistanceTokenValue =
  | string
  | {
      one: string;
      other: string;
    };

export interface BuildFormatLongFnArgs<DefaultMatchWidth extends FormatLongWidth> {
  formats: Partial<{ [format in FormatLongWidth]: string }> & {
    [format in DefaultMatchWidth]: string;
  };
  defaultWidth: DefaultMatchWidth;
}

export function buildFormatLongFn<DefaultMatchWidth extends FormatLongWidth>(
  args: BuildFormatLongFnArgs<DefaultMatchWidth>
): FormatLongFn {
  return (options = {}) => {
    const width = options.width ?? args.defaultWidth;
    const format = args.formats[width as FormatLongWidth] ?? args.formats[args.defaultWidth];
    if (!format) throw new Error(`Format not found for width: ${width}`);
    return format;
  };
}

export type BuildLocalizeFnArgs<
  Value extends LocaleUnitValue,
  ArgCallback extends LocalizeFnArgCallback<Value> | undefined,
> = {
  values: LocalizePeriodValuesMap<Value>;
  defaultWidth: LocaleWidth;
  formattingValues?: LocalizePeriodValuesMap<Value>;
  defaultFormattingWidth?: LocaleWidth;
} & (ArgCallback extends undefined
  ? { argumentCallback?: undefined }
  : { argumentCallback: LocalizeFnArgCallback<Value> });

// Callback to convert raw value to actual type
export type LocalizeFnArgCallback<Value extends LocaleUnitValue | number> = (
  value: Value
) => LocalizeUnitIndex<Value>;

// Map of localized values for each width
export type LocalizePeriodValuesMap<Value extends LocaleUnitValue> = {
  [Pattern in LocaleWidth]?: LocalizeValues<Value>;
};

// Index type for locale unit values not starting at 0
export type LocalizeUnitIndex<Value extends LocaleUnitValue | number> =
  Value extends LocaleUnitValue ? keyof LocalizeValues<Value> : number;

// Converts unit value to tuple of values
export type LocalizeValues<Value extends LocaleUnitValue> = Value extends LocaleDayPeriod
  ? Record<LocaleDayPeriod, string>
  : Value extends Era
    ? LocalizeEraValues
    : Value extends Quarter
      ? LocalizeQuarterValues
      : Value extends Day
        ? LocalizeDayValues
        : Value extends Month
          ? LocalizeMonthValues
          : never;

// Tuple of era values (BC, AD)
export type LocalizeEraValues = readonly [string, string];

// Tuple of quarter values (Q1-Q4)
export type LocalizeQuarterValues = readonly [string, string, string, string];

// Tuple of day values starting with Sunday
export type LocalizeDayValues = readonly [string, string, string, string, string, string, string];

// Tuple of month values starting with January
export type LocalizeMonthValues = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export function buildLocalizeFn<
  Value extends LocaleUnitValue,
  ArgCallback extends LocalizeFnArgCallback<Value> | undefined,
>(args: BuildLocalizeFnArgs<Value, ArgCallback>): LocalizeFn<Value> {
  return (value, options = {}) => {
    const context = options.context?.toString() || 'standalone';
    const width = options.width?.toString() || args.defaultWidth;

    const getValuesArray = (): LocalizeValues<Value> => {
      if (context === 'formatting' && args.formattingValues) {
        const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        return (args.formattingValues[width as LocaleWidth] ||
          args.formattingValues[defaultWidth]) as LocalizeValues<Value>;
      }
      return (args.values[width as LocaleWidth] ||
        args.values[args.defaultWidth]) as LocalizeValues<Value>;
    };

    const valuesArray = getValuesArray();
    const index = args.argumentCallback
      ? args.argumentCallback(value as Value)
      : (value as unknown as LocalizeUnitIndex<Value>);

    // @ts-expect-error :shrug:
    return valuesArray[index];
  };
}

export interface BuildMatchFnArgs<
  Result extends LocaleUnitValue,
  DefaultMatchWidth extends LocaleWidth,
  DefaultParseWidth extends LocaleWidth,
> {
  matchPatterns: BuildMatchFnMatchPatterns<DefaultMatchWidth>;
  defaultMatchWidth: DefaultMatchWidth;
  parsePatterns: BuildMatchFnParsePatterns<Result, DefaultParseWidth>;
  defaultParseWidth: DefaultParseWidth;
  valueCallback?: MatchValueCallback<Result extends LocaleDayPeriod ? string : number, Result>;
}

export type BuildMatchFnMatchPatterns<DefaultWidth extends LocaleWidth> = {
  [Width in LocaleWidth]?: RegExp;
} & {
  [Width in DefaultWidth]: RegExp;
};

export type BuildMatchFnParsePatterns<
  Value extends LocaleUnitValue,
  DefaultWidth extends LocaleWidth,
> = {
  [Width in LocaleWidth]?: ParsePattern<Value>;
} & {
  [Width in DefaultWidth]: ParsePattern<Value>;
};

export type ParsePattern<Value extends LocaleUnitValue> = Value extends LocaleDayPeriod
  ? Record<LocaleDayPeriod, RegExp>
  : Value extends Quarter
    ? readonly [RegExp, RegExp, RegExp, RegExp]
    : Value extends Era
      ? readonly [RegExp, RegExp]
      : Value extends Day
        ? readonly [RegExp, RegExp, RegExp, RegExp, RegExp, RegExp, RegExp]
        : Value extends Month
          ? readonly [
              RegExp,
              RegExp,
              RegExp,
              RegExp,
              RegExp,
              RegExp,
              RegExp,
              RegExp,
              RegExp,
              RegExp,
              RegExp,
              RegExp,
            ]
          : never;

export function buildMatchFn<
  Value extends LocaleUnitValue,
  DefaultMatchWidth extends LocaleWidth,
  DefaultParseWidth extends LocaleWidth,
>(args: BuildMatchFnArgs<Value, DefaultMatchWidth, DefaultParseWidth>): MatchFn<Value> {
  return (string, options = {}) => {
    const width = options.width;

    const matchPattern = width
      ? (args.matchPatterns[width] ?? args.matchPatterns[args.defaultMatchWidth])
      : args.matchPatterns[args.defaultMatchWidth];

    const matchResult = string.match(matchPattern);
    if (!matchResult) return null;

    const parsePatterns = width
      ? (args.parsePatterns[width] ?? args.parsePatterns[args.defaultParseWidth])
      : args.parsePatterns[args.defaultParseWidth];

    const matchedString = matchResult[0];

    const key = (
      Array.isArray(parsePatterns)
        ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString))
        : findKey(parsePatterns, (pattern: any) => pattern.test(matchedString))
    ) as Value extends LocaleDayPeriod ? string : number;

    const value = options.valueCallback
      ? options.valueCallback(args.valueCallback ? (args.valueCallback(key) as any) : key)
      : args.valueCallback
        ? args.valueCallback(key)
        : (key as unknown as Value);

    return {
      value,
      rest: string.slice(matchedString.length),
    };
  };
}

function findKey<Value, Obj extends { [key in string | number]: Value }>(
  object: Obj,
  predicate: (value: Value) => boolean
): keyof Obj | undefined {
  return Object.entries(object).find(([, value]) => predicate(value))?.[0] as keyof Obj | undefined;
}

function findIndex<Item>(array: Item[], predicate: (item: Item) => boolean): number | undefined {
  const index = array.findIndex(predicate);
  return index === -1 ? undefined : index;
}

export interface BuildMatchPatternFnArgs<Result> {
  matchPattern: RegExp;
  parsePattern: RegExp;
  valueCallback?: MatchValueCallback<string, Result>;
}

export function buildMatchPatternFn<Result>(
  args: BuildMatchPatternFnArgs<Result>
): MatchFn<Result> {
  return (string, options = {}) => {
    const matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;

    const parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;

    const parsedValue = parseResult[0];
    const callbackValue = args.valueCallback?.(parsedValue) ?? parsedValue;
    const finalValue = (options.valueCallback?.(callbackValue as any) ?? callbackValue) as Result;

    const matchedString = matchResult[0];

    return { value: finalValue, rest: string.slice(matchedString.length) };
  };
}
