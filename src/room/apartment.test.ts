import { describe, expect, it } from 'vitest';
import { ru } from '@/content/ru';
import { apartmentPath, findApartment, hasLongWord, isSolo, neighbours } from './apartment';

const floors = ru.floors;

describe('адрес квартиры', () => {
  it('собирается из локали и номера этажа', () => {
    expect(apartmentPath('ru', 6)).toBe('/ru/floor/6');
    expect(apartmentPath('en', 2)).toBe('/en/floor/2');
  });
});

describe('поиск квартиры по параметру роута', () => {
  it('находит этаж по номеру', () => {
    expect(findApartment(floors, '6')?.slug).toBe('vk-hr-tek');
  });

  it('не отдаёт этаж по неканоническому или мусорному параметру', () => {
    for (const param of ['06', '6.0', '+6', 'six', '', '0', '-6']) {
      expect(findApartment(floors, param), param).toBeUndefined();
    }
  });

  it('не отдаёт этаж, которого нет в доме', () => {
    expect(findApartment(floors, '1')).toBeUndefined();
    expect(findApartment(floors, '7')).toBeUndefined();
  });
});

describe('соседние этажи', () => {
  it('у первого проекта нет этажа ниже', () => {
    const { below, above } = neighbours(floors, 2);

    expect(below).toBeNull();
    expect(above?.floor).toBe(3);
  });

  it('у верхнего проекта нет этажа выше — дальше крыша', () => {
    const { below, above } = neighbours(floors, 6);

    expect(below?.floor).toBe(5);
    expect(above).toBeNull();
  });

  it('в середине есть оба соседа', () => {
    const { below, above } = neighbours(floors, 4);

    expect(below?.floor).toBe(3);
    expect(above?.floor).toBe(5);
  });

  it('для чужого этажа соседей нет', () => {
    expect(neighbours(floors, 9)).toEqual({ below: null, above: null });
  });
});

describe('облегчённый режим выводится из данных', () => {
  it('включается только у первого проекта', () => {
    expect(floors.filter(isSolo).map((floor) => floor.slug)).toEqual(['mosgosexpertiza']);
  });
});

describe('длинное название на плакате', () => {
  it('ловит слово, которое не влезает в рамку на 52 px', () => {
    expect(hasLongWord('Мосгосэкспертиза')).toBe(true);
    expect(hasLongWord('Mosgosexpertiza')).toBe(true);
  });

  it('не трогает названия, которые переносятся по пробелам', () => {
    expect(hasLongWord('Налоговая система Азербайджана')).toBe(false);
    expect(hasLongWord('VK HR Tek')).toBe(false);
    expect(hasLongWord('FlowHealth')).toBe(false);
  });

  it('срабатывает ровно на тех этажах, где нужно', () => {
    expect(
      ru.floors.filter((floor) => hasLongWord(floor.title)).map((floor) => floor.slug),
    ).toEqual(['mosgosexpertiza']);
  });
});
