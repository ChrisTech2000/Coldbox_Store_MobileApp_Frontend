import { addHours } from 'date-fns/addHours';
import { isWithinInterval } from 'date-fns/isWithinInterval';
import { parseISO } from 'date-fns/parseISO';
import { set } from 'date-fns/set';
import { startOfDay } from 'date-fns/startOfDay';
import { subDays } from 'date-fns/subDays';
import cloneDeep from 'lodash/cloneDeep';

import type { GetCoolingUnitTemperaturesResponse } from '#types/api.responses';

import type { LineChartEntry } from './components/LineChart';

type ProcessedTemps = {
  info:
    | {
        lastUpdated: string;
        temperature: number;
      }
    | undefined;
  datums: Array<LineChartEntry>;
};

export function processTemperatures(
  temperatures: GetCoolingUnitTemperaturesResponse
): ProcessedTemps {
  if (temperatures.length === 0) return { info: undefined, datums: [] };

  const clone = cloneDeep(temperatures);
  const now = new Date();

  const weekBefore = startOfDay(subDays(now, 7));
  const twoHoursLater = addHours(now, 2);

  const lastTemp = cloneDeep(clone.pop()!);

  for (const [idx, item] of clone.entries()) {
    const parsed = parseISO(item.datetimeStamp);
    if (isWithinInterval(parsed, { start: weekBefore, end: twoHoursLater })) continue;
    clone.splice(idx, 1);
  }

  if (lastTemp) {
    clone.push(lastTemp);

    if (clone.length === 1) {
      const excludedTime = lastTemp.datetimeStamp.split('T')[0];
      clone.unshift({
        ...lastTemp,
        datetimeStamp: set(excludedTime, { hours: 0, minutes: 0, seconds: 0 }).toISOString(),
      });
    }
  }

  const lastEntry = cloneDeep(clone.at(-1)!);

  return {
    info: {
      lastUpdated: lastEntry.datetimeStamp,
      temperature: parseFloat(lastEntry.value),
    },
    datums: clone.map((item) => ({
      timestamp: item.datetimeStamp,
      temperature: parseFloat(item.value),
    })),
  };
}
