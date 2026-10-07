export function shortPeriod(period: string): string {
  const years = period.match(/\d{4}/g);
  if (years === null || years.length === 0) return period;

  const first = years[0] as string;
  const last = years[years.length - 1] as string;

  return first === last ? first : `${first}–${last}`;
}

export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = values[key];
    return value === undefined ? match : String(value);
  });
}
