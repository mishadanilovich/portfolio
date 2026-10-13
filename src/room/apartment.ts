import type { Achievement, Floor, Locale } from '@/content';

export const APARTMENT_TITLE_ID = 'apartment-title';

const SHELF_CAPACITY = 2;
const MAX_TITLE_WORD = 13;

export function apartmentPath(locale: Locale, floor: number): string {
  return `/${locale}/floor/${floor}`;
}

export function findApartment(floors: Floor[], param: string): Floor | undefined {
  if (!/^[1-9]\d*$/.test(param)) return undefined;

  return floors.find((floor) => floor.floor === Number(param));
}

export function neighbours(
  floors: Floor[],
  floor: number,
): { below: Floor | null; above: Floor | null } {
  const index = floors.findIndex((candidate) => candidate.floor === floor);
  if (index === -1) return { below: null, above: null };

  return { below: floors[index - 1] ?? null, above: floors[index + 1] ?? null };
}

export function isSolo(floor: Floor): boolean {
  return floor.responsibilities.length === 0 && floor.achievements.length === 0;
}

export function shelves(achievements: Achievement[]): Achievement[][] {
  const rows: Achievement[][] = [];

  for (let i = 0; i < achievements.length; i += SHELF_CAPACITY) {
    rows.push(achievements.slice(i, i + SHELF_CAPACITY));
  }

  return rows;
}

export function hasLongWord(title: string): boolean {
  return title.split(/\s+/).some((word) => word.length > MAX_TITLE_WORD);
}
