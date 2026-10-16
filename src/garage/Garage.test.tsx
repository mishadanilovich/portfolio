// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ru } from '@/content/ru';
import { Garage } from './Garage';

const github = 'https://github.com/mishadanilovich';

function show() {
  return render(
    <Garage
      locale="ru"
      projects={ru.petProjects}
      garage={ru.ui.garage}
      scene={ru.ui.scene}
      github={github}
    />,
  );
}

describe('гараж', () => {
  it('подписывает экран заголовком панели', () => {
    show();

    expect(screen.getByRole('heading', { level: 1, name: 'Пет-проекты' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAccessibleName('Пет-проекты');
    expect(screen.getByRole('main')).toHaveAttribute('data-room', 'garage');
  });

  it('ведёт карточками на страницы пет-проектов', () => {
    show();

    expect(screen.getByRole('link', { name: /FridgeMind/ })).toHaveAttribute(
      'href',
      '/ru/garage/fridgemind',
    );
    expect(screen.getByRole('link', { name: /Coffee Shop/ })).toHaveAttribute(
      'href',
      '/ru/garage/coffee-shop',
    );
  });

  it('показывает три пункта стека и остаток', () => {
    show();

    expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    expect(screen.queryByText('Serwist')).not.toBeInTheDocument();
    expect(screen.getByText('+4')).toBeInTheDocument();
  });

  it('вешает бирку на каждый объект сцены', () => {
    const { container } = show();

    const tags = [...container.querySelectorAll('p[data-project]')];

    expect(tags.map((tag) => tag.getAttribute('data-project'))).toEqual([
      'fridgemind',
      'coffee-shop',
    ]);
  });

  it('даёт выход к дому и ссылку на GitHub без протокола в подписи', () => {
    show();

    expect(screen.getByRole('link', { name: 'Выйти к дому' })).toHaveAttribute('href', '/ru');
    expect(screen.getByRole('link', { name: /GitHub/ })).toHaveAttribute('href', github);
    expect(screen.getByText(/github\.com\/mishadanilovich/)).toBeInTheDocument();
  });
});
