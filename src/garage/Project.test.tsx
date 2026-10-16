// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ru } from '@/content/ru';
import { Project } from './Project';
import { findProject } from './projects';

const projects = ru.petProjects;

function show(slug: string) {
  const project = findProject(projects, slug);
  if (project === undefined) throw new Error(`нет проекта ${slug}`);

  return render(
    <Project
      locale="ru"
      projects={projects}
      project={project}
      ui={ru.ui.project}
      garage={ru.ui.garage}
      scene={ru.ui.scene}
    />,
  );
}

describe('страница пет-проекта', () => {
  it('ставит название заголовком страницы и подписывает им экран', () => {
    show('fridgemind');

    expect(screen.getByRole('heading', { level: 1, name: 'FridgeMind' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveAccessibleName('FridgeMind');
  });

  it('показывает место проекта и весь стек, а не три пункта', () => {
    show('fridgemind');

    expect(screen.getByText('Пет-проект 1 из 2')).toBeInTheDocument();
    expect(screen.getByText('Serwist')).toBeInTheDocument();
    expect(screen.getByText('IndexedDB')).toBeInTheDocument();
  });

  it('кладёт достижения на малые полки', () => {
    const { container } = show('fridgemind');

    const shelves = container.querySelector('section[data-size="small"]');

    expect(shelves).not.toBeNull();
    expect(shelves?.querySelectorAll('p')).toHaveLength(
      findProject(projects, 'fridgemind')?.achievements.length ?? 0,
    );
  });

  it('открывает внешнюю ссылку в новой вкладке и подписывает адрес', () => {
    show('fridgemind');

    const link = screen.getByRole('link', { name: /Открыть проект/ });

    expect(link).toHaveAttribute('href', 'https://github.com/mishadanilovich/fridgemind');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
    expect(
      screen.getByText(/github\.com\/mishadanilovich\/fridgemind · откроется/),
    ).toBeInTheDocument();
  });

  it('у первого проекта есть только следующий, у последнего — только предыдущий', () => {
    const first = show('fridgemind');

    expect(screen.getByRole('link', { name: 'Следующий: Coffee Shop' })).toHaveAttribute(
      'href',
      '/ru/garage/coffee-shop',
    );
    expect(screen.queryByText(/Предыдущий/)).not.toBeInTheDocument();
    first.unmount();

    show('coffee-shop');

    expect(screen.getByRole('link', { name: 'Предыдущий: FridgeMind' })).toHaveAttribute(
      'href',
      '/ru/garage/fridgemind',
    );
    expect(screen.queryByText(/Следующий/)).not.toBeInTheDocument();
  });

  it('ведёт назад к списку и к дому', () => {
    show('coffee-shop');

    expect(screen.getByRole('link', { name: 'Все пет-проекты' })).toHaveAttribute(
      'href',
      '/ru/garage',
    );
    expect(screen.getByRole('link', { name: 'Выйти к дому' })).toHaveAttribute('href', '/ru');
  });

  it('подсвечивает в сцене именно свой объект', () => {
    const { container } = show('coffee-shop');

    const body = container.querySelector('main > div:last-child');

    expect(body?.getAttribute('style')).toContain('--coffee-shop: 1');
    expect(body).not.toHaveAttribute('data-live');
  });
});
