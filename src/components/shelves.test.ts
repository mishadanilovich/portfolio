import { describe, expect, it } from 'vitest';
import { ru } from '@/content/ru';
import { shelves } from './Shelves';

describe('полки достижений', () => {
  it('ставят по две рамки на полку', () => {
    expect(shelves(ru.floors[4]?.achievements ?? []).map((row) => row.length)).toEqual([2, 2]);
  });

  it('последнюю рамку оставляют на своей полке', () => {
    expect(shelves(ru.floors[3]?.achievements ?? []).map((row) => row.length)).toEqual([2, 1]);
  });

  it('без достижений полок нет', () => {
    expect(shelves([])).toEqual([]);
  });

  it('не теряет и не переставляет достижения', () => {
    const items = ru.floors[4]?.achievements ?? [];

    expect(shelves(items).flat()).toEqual(items);
  });
});
