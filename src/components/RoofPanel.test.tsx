// @vitest-environment jsdom

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { ru } from '@/content/ru';
import { RoofPanel } from './RoofPanel';

function show() {
  return render(<RoofPanel roof={ru.roof} contacts={ru.contacts} cv={ru.cv} ui={ru.ui.roof} />);
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

  it('копирует email и сообщает об этом', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    show();

    fireEvent.click(screen.getByRole('button', { name: 'Скопировать email' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Email скопирован' })).toBeInTheDocument();
    });

    expect(writeText).toHaveBeenCalledWith('danilovich36misha@gmail.com');
    expect(screen.getByRole('status')).toHaveTextContent('Email скопирован');

    vi.unstubAllGlobals();
  });

  it('молчит, когда буфер обмена недоступен', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    vi.stubGlobal('navigator', { ...navigator, clipboard: { writeText } });
    show();

    fireEvent.click(screen.getByRole('button', { name: 'Скопировать email' }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalled();
    });

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.getByRole('button', { name: 'Скопировать email' })).toBeInTheDocument();

    vi.unstubAllGlobals();
  });
});
