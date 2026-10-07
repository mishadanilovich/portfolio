import { describe, expect, it } from 'vitest';
import { fill, shortPeriod } from './format';

describe('shortPeriod', () => {
  it('сводит период к диапазону лет', () => {
    expect(shortPeriod('05.2021 — 05.2022')).toBe('2021–2022');
    expect(shortPeriod('11.2023 — 08.2025')).toBe('2023–2025');
    expect(shortPeriod('09.2018 — 02.2022')).toBe('2018–2022');
  });

  it('оставляет один год, когда проект начался и кончился в одном году', () => {
    expect(shortPeriod('06.2023 — 11.2023')).toBe('2023');
  });

  it('возвращает исходную строку, если годов нет', () => {
    expect(shortPeriod('по настоящее время')).toBe('по настоящее время');
  });
});

describe('fill', () => {
  it('подставляет значения в шаблон', () => {
    expect(fill('Этаж {floor} · {period}', { floor: 3, period: '2022–2023' })).toBe(
      'Этаж 3 · 2022–2023',
    );
  });

  it('оставляет плейсхолдер, если значения нет', () => {
    expect(fill('Этаж {floor}', {})).toBe('Этаж {floor}');
  });
});
