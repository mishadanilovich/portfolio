import { describe, expect, it } from 'vitest';
import { en } from './en';
import { ru } from './ru';
import { locales } from './types';

const pairs = [
  ['ru', ru],
  ['en', en],
] as const;

function emptyStringPaths(value: unknown, path = ''): string[] {
  if (typeof value === 'string') return value.trim() === '' ? [path] : [];
  if (Array.isArray(value))
    return value.flatMap((item, i) => emptyStringPaths(item, `${path}[${i}]`));
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, item]) =>
      emptyStringPaths(item, path === '' ? key : `${path}.${key}`),
    );
  }
  return [];
}

describe.each(pairs)('словарь %s', (name, content) => {
  it('объявляет свою локаль', () => {
    expect(content.locale).toBe(name);
    expect(locales).toContain(content.locale);
  });

  it('содержит этажи 2–6 по порядку', () => {
    expect(content.floors.map((f) => f.floor)).toEqual([2, 3, 4, 5, 6]);
  });

  it('не содержит пустых строк', () => {
    expect(emptyStringPaths(content)).toEqual([]);
  });

  it('у каждого этажа есть стек', () => {
    for (const floor of content.floors) {
      expect(floor.stack.length, floor.slug).toBeGreaterThan(0);
    }
  });

  it('у каждого пет-проекта есть внешняя ссылка и достижения', () => {
    expect(content.petProjects.length).toBe(2);
    for (const project of content.petProjects) {
      expect(project.href, project.slug).toMatch(/^https:\/\//);
      expect(project.achievements.length, project.slug).toBeGreaterThan(0);
    }
  });

  it('ссылка на резюме ведёт на PDF своей локали', () => {
    expect(content.cv.href).toBe(`/cv/${content.cv.downloadName}`);
    expect(content.cv.downloadName).toMatch(new RegExp(`-${name.toUpperCase()}\\.pdf$`));
  });

  it('первый проект отрисуется одним плакатом: без списков, но с абзацем', () => {
    const first = content.floors[0];
    expect(first?.slug).toBe('mosgosexpertiza');
    expect(first?.achievements).toEqual([]);
    expect(first?.responsibilities).toEqual([]);
    expect(first?.note).toBeTruthy();
  });

  it('у остальных этажей есть и достижения, и обязанности', () => {
    for (const floor of content.floors.slice(1)) {
      expect(floor.achievements.length, floor.slug).toBeGreaterThan(0);
      expect(floor.responsibilities.length, floor.slug).toBeGreaterThan(0);
      for (const achievement of floor.achievements) {
        expect(achievement.title, floor.slug).toBeTruthy();
      }
    }
  });
});

describe('ru и en не разъезжаются', () => {
  it('одни и те же этажи в одном порядке', () => {
    expect(ru.floors.map((f) => f.slug)).toEqual(en.floors.map((f) => f.slug));
    expect(ru.floors.map((f) => f.floor)).toEqual(en.floors.map((f) => f.floor));
  });

  it('периоды и роли совпадают — они не переводятся', () => {
    expect(ru.floors.map((f) => f.period)).toEqual(en.floors.map((f) => f.period));
    expect(ru.floors.map((f) => f.role)).toEqual(en.floors.map((f) => f.role));
    expect(ru.basement.period).toBe(en.basement.period);
  });

  it('стек у каждого этажа одинаковый — это названия технологий', () => {
    for (const [i, floor] of ru.floors.entries()) {
      expect(en.floors[i]?.stack, floor.slug).toEqual(floor.stack);
    }
  });

  it('списки достижений и обязанностей одной длины', () => {
    for (const [i, floor] of ru.floors.entries()) {
      expect(en.floors[i]?.achievements.length, floor.slug).toBe(floor.achievements.length);
      expect(en.floors[i]?.responsibilities.length, floor.slug).toBe(floor.responsibilities.length);
    }
  });

  it('пет-проекты, факты крыши и контакты совпадают по составу', () => {
    expect(ru.petProjects.map((p) => p.slug)).toEqual(en.petProjects.map((p) => p.slug));
    expect(ru.petProjects.map((p) => p.href)).toEqual(en.petProjects.map((p) => p.href));
    expect(ru.petProjects.map((p) => p.stack)).toEqual(en.petProjects.map((p) => p.stack));
    expect(ru.roof.facts.length).toBe(en.roof.facts.length);
    expect(ru.contacts.map((c) => c.kind)).toEqual(en.contacts.map((c) => c.kind));
  });
});
