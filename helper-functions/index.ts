export function parseStringToNumber(str: string): number | undefined {
  return !str ? undefined : isNaN(Number(str)) ? undefined : Number(str);
}
