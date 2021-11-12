export function parseStringToNumber(str: string): number | undefined {
  return !str ? undefined : isNaN(Number(str)) ? undefined : Number(str);
}

export function setDateFromSeconds(seconds: number) {
  return new Date(new Date().getTime() + seconds * 1000);
}
