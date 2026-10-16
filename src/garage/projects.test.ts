import { describe, expect, it } from 'vitest';
import { ru } from '@/content/ru';
import { findProject, garagePath, placeOf, projectPath, stackPreview } from './projects';

const projects = ru.petProjects;

describe('адреса гаража', () => {
  it('собираются из локали и слага', () => {
    expect(garagePath('ru')).toBe('/ru/garage');
    expect(projectPath('en', 'fridgemind')).toBe('/en/garage/fridgemind');
  });
});

describe('поиск пет-проекта', () => {
  it('находит по слагу', () => {
    expect(findProject(projects, 'coffee-shop')?.title).toBe('Coffee Shop');
  });

  it('не находит чужой слаг', () => {
    expect(findProject(projects, 'fridge')).toBeUndefined();
  });
});

describe('стек на карточке', () => {
  it('показывает три первых пункта и считает остальные', () => {
    const preview = stackPreview(ru.petProjects[0]?.stack ?? []);

    expect(preview.shown).toEqual(['Next.js', 'Prisma', 'PostgreSQL']);
    expect(preview.more).toBe(4);
  });

  it('не выдумывает остаток, когда стек короткий', () => {
    expect(stackPreview(['React', 'Vite'])).toEqual({ shown: ['React', 'Vite'], more: 0 });
    expect(stackPreview([])).toEqual({ shown: [], more: 0 });
  });

  it('у каждого пет-проекта остаток сходится с длиной стека', () => {
    for (const project of projects) {
      const preview = stackPreview(project.stack);

      expect(preview.shown.length + preview.more, project.slug).toBe(project.stack.length);
    }
  });
});

describe('место проекта в списке', () => {
  it('нумерует от единицы и знает соседей', () => {
    expect(placeOf(projects, 'fridgemind')).toMatchObject({ index: 1, total: 2, prev: null });
    expect(placeOf(projects, 'fridgemind').next?.slug).toBe('coffee-shop');

    expect(placeOf(projects, 'coffee-shop')).toMatchObject({ index: 2, total: 2, next: null });
    expect(placeOf(projects, 'coffee-shop').prev?.slug).toBe('fridgemind');
  });

  it('для чужого слага соседей нет', () => {
    expect(placeOf(projects, 'fridge')).toEqual({ index: 0, total: 2, next: null, prev: null });
  });
});
