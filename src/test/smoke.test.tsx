// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('тестовая обвязка', () => {
  it('рендерит компонент и применяет матчеры jest-dom', () => {
    render(<button type="button">Позвонить в домофон</button>);

    const button = screen.getByRole('button', { name: 'Позвонить в домофон' });

    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });
});
