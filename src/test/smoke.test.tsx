// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

/**
 * Проверяет саму обвязку: jsdom, рендер через RTL и матчеры jest-dom.
 * Алиас `@/` покрывается тестами контент-модели на стадии 2.
 */
describe('тестовая обвязка', () => {
  it('рендерит компонент и применяет матчеры jest-dom', () => {
    render(<button type="button">Позвонить в домофон</button>);

    const button = screen.getByRole('button', { name: 'Позвонить в домофон' });

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });
});
