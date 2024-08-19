import { ImpactMetric, ImpactMetricType } from '#types/global';

export type Variation = 'equal' | 'increase' | 'decrease';

export const getMetricValue = (
  metric: ImpactMetric | number | undefined,
  index?: number
): number => {
  if (!metric) return 0;

  if (typeof metric === 'number') {
    return metric;
  }

  if (index && (metric as Array<ImpactMetricType>).length) {
    return (metric as Array<ImpactMetricType>)?.[index].value as number;
  }
  return (metric as ImpactMetricType)?.value as number;
};

export function getVariationValue(from: number, to: number): Variation {
  if (from === to) return 'equal';
  if (from > to) return 'decrease';
  return 'increase';
}

export function sortAndMapData(data: Record<string, number>) {
  return Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .map(([key, val], index) => ({ key, val, index }));
}
