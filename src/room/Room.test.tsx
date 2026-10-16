// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ru } from '@/content/ru';
import { findApartment } from './apartment';
import { Room } from './Room';

const floors = ru.floors;
const room = ru.ui.room;

function show(param: string) {
  const floor = findApartment(floors, param);
  if (floor === undefined) throw new Error(`нет этажа ${param}`);

  return render(<Room locale="ru" floors={floors} floor={floor} room={room} />);
}

describe('квартира', () => {
  it('ставит название проекта заголовком страницы и подписывает им комнату', () => {
    show('6');

    const title = screen.getByRole('heading', { level: 1, name: 'VK HR Tek' });

    expect(title).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAccessibleName('VK HR Tek');
  });

  it('показывает период, роль и весь стек', () => {
    show('6');

    expect(screen.getByText('Этаж 6 · 09.2025 — 04.2026')).toBeInTheDocument();
    expect(screen.getByText('Senior Frontend Developer')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThanOrEqual(
      floors[4]?.stack.length ?? 0,
    );
  });

  it('раскладывает обязанности и достижения по доске и полкам', () => {
    show('6');

    expect(screen.getByRole('heading', { level: 2, name: 'Обязанности' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Достижения' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
  });

  it('у первого проекта остаётся только плакат', () => {
    show('2');

    expect(screen.queryByRole('heading', { name: 'Обязанности' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Достижения' })).not.toBeInTheDocument();
    expect(screen.getByText(floors[0]?.note ?? '')).toBeInTheDocument();
  });

  it('полоса ведёт только по соседним проектам и к дому', () => {
    show('5');

    expect(screen.getByRole('link', { name: '↓ Этаж 4' })).toHaveAttribute('href', '/ru/floor/4');
    expect(screen.getByRole('link', { name: 'Этаж 6 ↑' })).toHaveAttribute('href', '/ru/floor/6');
    expect(screen.getByRole('link', { name: 'Выйти к дому' })).toHaveAttribute('href', '/ru');
    expect(screen.getAllByRole('link')).toHaveLength(3);
  });

  it('с верхнего этажа вверх не ведёт никуда: крыши в квартире нет', () => {
    show('6');

    expect(screen.getByRole('link', { name: '↓ Этаж 5' })).toHaveAttribute('href', '/ru/floor/5');
    expect(screen.queryByText(/Крыша/)).not.toBeInTheDocument();
  });

  it('у первого проекта вниз не ведёт никуда', () => {
    show('2');

    expect(screen.queryByText(/Этаж 1/)).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Этаж 3 ↑' })).toHaveAttribute('href', '/ru/floor/3');
  });

  it('помечает комнату для сцены и держит фокус в ней', () => {
    show('6');

    const main = screen.getByRole('main');

    expect(main).toHaveAttribute('data-room', '6');
    expect(main).toHaveFocus();
  });
});
