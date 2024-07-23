import { startOfWeek } from 'date-fns/startOfWeek';
import { endOfWeek } from 'date-fns/endOfWeek';
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval';

export function weekSubsetArtisan() {
  const currentDate = new Date();

  const start = startOfWeek(currentDate, { weekStartsOn: 1 }); // → 1 is monday
  const end = endOfWeek(currentDate, { weekStartsOn: 1 });

  return eachDayOfInterval({ start, end });
}
