// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { en } from '@/content/en';
import { ru } from '@/content/ru';
import { onHelpRequest } from './events';

const KEY = 'house:first-visit';

async function mount(ui = ru.ui.firstVisit) {
  vi.resetModules();
  const { FirstVisitCard } = await import('./FirstVisitCard');

  return render(<FirstVisitCard ui={ui} />);
}

describe('карточка первого визита', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('показывается, пока в хранилище пусто', async () => {
    await mount();

    expect(screen.getByRole('status')).toHaveTextContent('Впервые здесь?');
  });

  it('молчит, если её уже закрывали', async () => {
    window.localStorage.setItem(KEY, 'seen');
    await mount();

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('«Понятно» закрывает её насовсем', async () => {
    await mount();

    await userEvent.click(screen.getByRole('button', { name: 'Понятно' }));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(window.localStorage.getItem(KEY)).toBe('seen');
  });

  it('«Показать легенду» зовёт справку и закрывает карточку', async () => {
    const opened = vi.fn();
    const stop = onHelpRequest(opened);
    await mount();

    await userEvent.click(screen.getByRole('button', { name: 'Показать легенду' }));

    expect(opened).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(window.localStorage.getItem(KEY)).toBe('seen');

    stop();
  });

  it('переживает отказ хранилища и всё равно закрывается', async () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('нет доступа');
      },
      setItem: () => {
        throw new Error('нет доступа');
      },
    });

    await mount();

    expect(screen.getByRole('status')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Понятно' }));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('собирает английскую локаль из своего словаря', async () => {
    await mount(en.ui.firstVisit);

    expect(screen.getByRole('status')).toHaveTextContent('First time here?');
    expect(screen.getByRole('button', { name: 'Show legend' })).toBeInTheDocument();
  });
});
