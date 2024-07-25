import { ImpactMetric } from '#types/global';

export const getMetricValue = (metric: ImpactMetric | number | undefined): number => {
  if (!metric) return 0;

  if (typeof metric === 'number') {
    return metric;
  }
  return metric?.value as number;
};
