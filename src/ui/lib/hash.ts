export function stringToHash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) + hash + char;
    hash = hash >>> 0;
  }
  const lengthHash = str.length.toString(16);
  return `${hash.toString(36)}-${lengthHash}`;
}
