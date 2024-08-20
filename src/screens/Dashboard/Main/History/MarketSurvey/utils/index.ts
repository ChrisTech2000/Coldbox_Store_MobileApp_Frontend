export function sanitizeString(str: string) {
  const trimmedStr = str?.slice(1, -1);
  const items = trimmedStr?.split(', ');
  const sanitizedArray = items?.map((item) => item.trim().replace(/^'(.*)'$/, '$1')) ?? [];

  return sanitizedArray;
}
