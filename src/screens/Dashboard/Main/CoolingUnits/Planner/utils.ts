import { addDays } from 'date-fns/addDays';
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval';

export function weekSubsetArtisan() {
  const start = new Date();
  const end = addDays(start, 6); // 7 days including today, so we add 6 days
  return eachDayOfInterval({ start, end });
}
