export function compareAsc(a: number | string, b: number | string) {
  return a > b ? 1 : a < b ? -1 : 0;
}

export function compareDesc(a: number | string, b: number | string) {
  return a > b ? -1 : a < b ? 1 : 0;
}

export function changePage(
  page: number,
  totalPages: number,
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
) {
  if (page >= 0 && page <= totalPages) {
    setCurrentPage(page);
  }
}

export function parseDateString(dateString: string) {
  const [monthStr, day, year] = dateString.split(/,\s*|\s+/);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthIndex = months.indexOf(monthStr);
  return new Date(Number(year), monthIndex, Number(day));
}
