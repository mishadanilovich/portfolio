// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ru } from '@/content/ru';
import { RoofPanel } from './RoofPanel';

function show() {
  return render(
    <RoofPanel
      roof={ru.roof}
      contacts={ru.contacts}
      cv={ru.cv}
      ui={ru.ui.roof}
      newTab={ru.ui.newTab}
    />,
  );
}

function rowOf(button: string) {
  const row = screen.getByRole('button', { name: button }).closest('li');

  if (row === null) throw new Error(`Кнопка «${button}» вне строки контакта`);

  return within(row).getByRole('status');
}

describe('карточка крыши', () => {
  it('подписана статусом и показывает все факты', () => {
    show();

    expect(
      screen.getByRole('heading', { level: 1, name: 'Открыт к новым проектам' }),
    ).toBeInTheDocument();

    for (const fact of ru.roof.facts) {
      expect(screen.getByText(fact.label)).toBeInTheDocument();
      expect(screen.getByText(fact.value)).toBeInTheDocument();
    }
  });

  it('выводит все контакты, кроме телефона, и email последним', () => {
    show();

    const links = screen.getAllByRole('link');

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      ru.contacts.map((contact) => contact.href),
    );
  });

  it('уводит внешние ссылки в новую вкладку и предупреждает об этом', () => {
    show();

    for (const name of ['@f0pp1', 'GitHub', 'LinkedIn']) {
      const link = screen.getByRole('link', { name: new RegExp(name) });

      expect(link, name).toHaveAttribute('target', '_blank');
      expect(link, name).toHaveAttribute('rel', expect.stringContaining('noreferrer'));
      expect(link, name).toHaveAccessibleName(expect.stringContaining('откроется в новой вкладке'));
    }
  });

  it('резюме и почту оставляет в текущей вкладке', () => {
    show();

    expect(screen.getByRole('link', { name: 'Резюме, PDF' })).not.toHaveAttribute('target');
    expect(screen.getByRole('link', { name: 'danilovich36misha@gmail.com' })).not.toHaveAttribute(
      'target',
    );
  });

  it('отдаёт резюме на скачивание файлом своей локали', () => {
    show();

    expect(screen.getByRole('link', { name: 'Резюме, PDF' })).toHaveAttribute(
      'download',
      ru.cv.downloadName,
    );
  });

  it.each([
    ['email', 'Скопировать email', 'Email скопирован', 'danilovich36misha@gmail.com'],
    ['Telegram', 'Скопировать Telegram', 'Telegram скопирован', '@f0pp1'],
  ])('копирует %s и сообщает об этом', async (_kind, copy, copied, value) => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    show();

    fireEvent.click(screen.getByRole('button', { name: copy }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: copied })).toBeInTheDocument();
    });

    expect(writeText).toHaveBeenCalledWith(value);
    expect(rowOf(copied)).toHaveTextContent(copied);

    vi.unstubAllGlobals();
  });

  it('держит у каждой кнопки свою область объявлений', () => {
    show();

    expect(screen.getAllByRole('status')).toHaveLength(2);
  });

  it('молчит, когда буфер обмена недоступен', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    show();

    fireEvent.click(screen.getByRole('button', { name: 'Скопировать email' }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalled();
    });

    expect(rowOf('Скопировать email')).toBeEmptyDOMElement();
    expect(screen.getByRole('button', { name: 'Скопировать email' })).toBeInTheDocument();

    vi.unstubAllGlobals();
  });
});
