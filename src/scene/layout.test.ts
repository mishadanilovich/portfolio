import { describe, expect, it } from 'vitest';
import { dictionaries } from '@/content';
import {
  createSceneLayout,
  findFloor,
  HOUSE,
  MIN_COMPOSITION_WIDTH,
  PROJECT_FLOORS,
  SCENE_BOTTOM,
  SCENE_TOP,
  TOP_FLOOR,
  type Rect,
} from './layout';

function contains(outer: Rect, inner: Rect): boolean {
  return (
    inner.x >= outer.x &&
    inner.y >= outer.y &&
    inner.x + inner.width <= outer.x + outer.width &&
    inner.y + inner.height <= outer.y + outer.height
  );
}

describe('дом', () => {
  it('состоит из пяти этажей с проектами, снизу вверх', () => {
    expect(HOUSE.floors.map((floor) => floor.floor)).toEqual([...PROJECT_FLOORS]);
    expect(HOUSE.floors).toHaveLength(5);
  });

  it('совпадает по этажам с контент-моделью обеих локалей', () => {
    const geometry = HOUSE.floors.map((floor) => floor.floor);

    for (const content of Object.values(dictionaries)) {
      expect(content.floors.map((floor) => floor.floor)).toEqual(geometry);
    }
  });

  it('стоит на земле, под парапетом крыши', () => {
    expect(HOUSE.facade).toEqual({ x: 200, y: 160, width: 360, height: 600 });
    expect(HOUSE.roof.parapet.y + HOUSE.roof.parapet.height).toBe(HOUSE.facade.y);
    expect(HOUSE.facade.y + HOUSE.facade.height).toBe(HOUSE.basement.rect.y);
  });

  it('набирается этажами без зазоров и перекрытий', () => {
    const bands = [HOUSE.entrance, ...HOUSE.floors].map((level) => level.rect);

    bands.forEach((band, index) => {
      const above = bands[index + 1];
      if (above === undefined) return;

      expect(above.y).toBeLessThan(band.y);
      expect(band.y - (above.y + above.height)).toBe(5);
    });

    expect(HOUSE.entrance.rect).toEqual({ x: 200, y: 662, width: 360, height: 98 });
    expect(HOUSE.floors[0]?.rect).toEqual({ x: 200, y: 562, width: 360, height: 95 });
  });

  it('не делает перекрытия над верхним этажом — его потолок это крыша', () => {
    const top = findFloor(TOP_FLOOR);

    expect(top?.slab).toBeNull();
    expect(top?.rect.y).toBe(HOUSE.facade.y);
    HOUSE.floors
      .filter((floor) => floor.floor !== TOP_FLOOR)
      .forEach((floor) => expect(floor.slab).not.toBeNull());
  });
});

describe('окна', () => {
  it('не выходят за фасад и остаются внутри своего этажа', () => {
    for (const floor of HOUSE.floors) {
      expect(floor.windows).toHaveLength(4);

      for (const slot of floor.windows) {
        expect(contains(HOUSE.facade, slot.rect)).toBe(true);
        expect(contains(floor.rect, slot.rect)).toBe(true);
      }
    }
  });

  it('дают каждому этажу ровно одно проектное окно', () => {
    for (const floor of HOUSE.floors) {
      const projects = floor.windows.filter((slot) => slot.kind === 'project');

      expect(projects).toHaveLength(1);
      expect(projects[0]).toBe(floor.projectWindow);
    }
  });

  it('не ставят проектные окна соседних этажей в один столбец', () => {
    const columns = HOUSE.floors.map((floor) => floor.projectWindow.column);

    expect(columns).toEqual([3, 0, 2, 1, 3]);
    columns.forEach((column, index) => {
      const next = columns[index + 1];
      if (next !== undefined) expect(column).not.toBe(next);
    });
  });

  it('центрируют ореол на окне и делают его шире окна', () => {
    for (const floor of HOUSE.floors) {
      for (const { rect, glow, center } of floor.windows) {
        expect(center).toEqual({ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
        expect({ x: glow.x + glow.width / 2, y: glow.y + glow.height / 2 }).toEqual(center);
        expect(glow.width).toBeGreaterThan(rect.width);
        expect(glow.height).toBeGreaterThan(rect.height);
      }
    }
  });
});

describe('таблички', () => {
  it('выровнены по вертикальной середине этажа', () => {
    for (const floor of HOUSE.floors) {
      expect(floor.midline).toBe(floor.rect.y + floor.rect.height / 2);
      expect(floor.plaque.anchor.y).toBe(floor.midline);
      expect(floor.plaque.bracket.y).toBe(floor.midline);
    }
  });

  it('ведут кронштейн от фасада к табличке', () => {
    const facadeRight = HOUSE.facade.x + HOUSE.facade.width;

    for (const { plaque } of HOUSE.floors) {
      expect(plaque.bracket.x1).toBe(facadeRight);
      expect(plaque.bracket.x2).toBe(plaque.anchor.x);
      expect(plaque.anchor.x).toBeGreaterThan(facadeRight);
    }
  });

  it('ставят табличку подвала на середину разреза', () => {
    expect(HOUSE.basement.rect).toEqual({ x: 200, y: 760, width: 360, height: 86 });
    expect(HOUSE.basement.plaque.anchor.y).toBe(803);
  });
});

describe('вход и гараж', () => {
  it('держат домофон внутри зоны наведения двери', () => {
    const { door, intercom, hitArea, canopy, houseNumber } = HOUSE.entrance;

    expect(contains(hitArea, door)).toBe(true);
    expect(contains(hitArea, intercom.panel)).toBe(true);
    expect(contains(hitArea, canopy)).toBe(true);
    expect(hitArea.y).toBeLessThanOrEqual(houseNumber.center.y - houseNumber.radius);
  });

  it('ставят гараж слева от дома, на земле', () => {
    expect(HOUSE.garage.rect).toEqual({ x: 54, y: 676, width: 136, height: 84 });
    expect(HOUSE.garage.rect.x + HOUSE.garage.rect.width).toBeLessThan(HOUSE.facade.x);
    expect(HOUSE.garage.rect.y + HOUSE.garage.rect.height).toBe(HOUSE.basement.rect.y);
    expect(contains(HOUSE.garage.rect, HOUSE.garage.gate)).toBe(true);
  });
});

describe('createSceneLayout', () => {
  it('повторяет коэффициент и сдвиг макета на 1440', () => {
    const layout = createSceneLayout({ width: 1440, height: 900 });

    expect(layout.scale).toBe(1.5);
    expect(layout.offsetX).toBeCloseTo(260);
    expect(layout.documentX(HOUSE.facade.x)).toBeCloseTo(560);
    expect(layout.document.height).toBe(1710);
  });

  it('оставляет геометрию дома неизменной при смене вьюпорта', () => {
    const wide = createSceneLayout({ width: 1440, height: 900 });
    const narrow = createSceneLayout({ width: 1280, height: 720 });

    expect(narrow.house).toBe(wide.house);
    expect(narrow.house).toEqual(wide.house);
  });

  it('меняет на узком вьюпорте масштаб, а не раскладку', () => {
    const wide = createSceneLayout({ width: 1440, height: 900 });
    const narrow = createSceneLayout({ width: 1280, height: 900 });
    const ratio = 1280 / 1440;

    expect(narrow.scale / wide.scale).toBeCloseTo(ratio);
    expect(narrow.toPx(100) / wide.toPx(100)).toBeCloseTo(ratio);
    expect(narrow.offsetX / wide.offsetX).toBeCloseTo(ratio);
    expect(narrow.document.height / wide.document.height).toBeCloseTo(ratio);
    expect(narrow.documentY(HOUSE.facade.y) / wide.documentY(HOUSE.facade.y)).toBeCloseTo(ratio);
  });

  it('не сжимает композицию ниже 1280, а подрезает её по краям', () => {
    const minimal = createSceneLayout({ width: MIN_COMPOSITION_WIDTH, height: 900 });
    const narrower = createSceneLayout({ width: 1024, height: 900 });

    expect(narrower.scale).toBe(minimal.scale);
    expect(narrower.offsetX).toBeCloseTo(minimal.offsetX - (MIN_COMPOSITION_WIDTH - 1024) / 2);
  });

  it('центрирует композицию на широком вьюпорте', () => {
    const layout = createSceneLayout({ width: 1920, height: 900 });

    expect(layout.scale).toBe(1.5);
    expect(layout.offsetX).toBeCloseTo(260 + (1920 - 1440) / 2);
  });

  it('кладёт сцену от неба над вывеской до низа подвала', () => {
    const layout = createSceneLayout({ width: 1440, height: 900 });

    expect(layout.bounds).toMatchObject({ top: SCENE_TOP, bottom: SCENE_BOTTOM });
    expect(SCENE_TOP).toBeLessThan(HOUSE.roof.sign.y);
    expect(SCENE_BOTTOM).toBeGreaterThanOrEqual(HOUSE.basement.rect.y + HOUSE.basement.rect.height);
    expect(layout.documentY(SCENE_TOP)).toBe(0);
    expect(layout.documentY(SCENE_BOTTOM)).toBe(layout.document.height);
  });

  it('растягивает землю на всю ширину видимой сцены', () => {
    const layout = createSceneLayout({ width: 1440, height: 900 });

    expect(layout.ground.y).toBe(HOUSE.basement.rect.y);
    expect(layout.ground.x).toBeLessThan(layout.bounds.left);
    expect(layout.ground.x + layout.ground.width).toBeGreaterThan(layout.bounds.right);
    expect(layout.documentX(layout.bounds.left)).toBeCloseTo(0);
    expect(layout.documentX(layout.bounds.right)).toBeCloseTo(1440);
  });
});

describe('сверка с макетом ru/01', () => {
  it('повторяет проектное окно пятого этажа', () => {
    const floor = findFloor(5);

    expect(floor?.projectWindow.rect).toEqual({ x: 316, y: 284, width: 48, height: 56 });
    expect(floor?.projectWindow.glow).toEqual({ x: 296, y: 264, width: 88, height: 96 });
  });

  it('повторяет ряд окон второго этажа', () => {
    const floor = findFloor(2);

    expect(floor?.windows.map((slot) => slot.rect.x)).toEqual([236, 316, 396, 476]);
    expect(floor?.windows.map((slot) => slot.rect.y)).toEqual([584, 584, 584, 584]);
    expect(floor?.windows.map((slot) => slot.kind)).toEqual([
      'blinds',
      'cold',
      'blinds',
      'project',
    ]);
  });

  it('повторяет дверь, домофон и табличку', () => {
    expect(HOUSE.entrance.door).toMatchObject({ x: 340, y: 684, width: 80 });
    expect(HOUSE.entrance.intercom.button.center).toEqual({ x: 439, y: 722 });
    expect(findFloor(5)?.plaque.anchor.x).toBe(572);
  });
});
