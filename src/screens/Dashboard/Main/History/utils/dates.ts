import { isWithinInterval } from 'date-fns/isWithinInterval';
import { sub } from 'date-fns/sub';

export function isWithinLast24Hours(date: Date): boolean {
  const now = new Date();
  const last24Hours = sub(now, { hours: 24 });

  return isWithinInterval(date, { start: last24Hours, end: now });
}
