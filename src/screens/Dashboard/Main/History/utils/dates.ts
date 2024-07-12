import { isWithinInterval, sub } from 'date-fns';

export function isWithinLast24Hours(date: Date): boolean {
  const now = new Date();
  const last24Hours = sub(now, { hours: 24 });

  return isWithinInterval(date, { start: last24Hours, end: now });
}
