// @vitest-environment jsdom

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { en } from '@/content/en';
import { ru } from '@/content/ru';
import IntercomBody from './IntercomBody';

function show(onClose = () => {}) {
  return render(
    <IntercomBody
      ui={ru.ui.intercom}
      contacts={ru.contacts}
      newTab={ru.ui.newTab}
      titleId="intercom-title"
      onClose={onClose}
    />,
  );
}

describe('домофон', () => {
  it('подписывает модалку заголовком колонки', () => {
    show();

    expect(screen.getByRole('heading', { level: 2, name: 'Домофон' })).toHaveAttribute(
      'id',
      'intercom-title',
    );
  });

  it('даёт прямые контакты с предупреждением про новую вкладку', () => {
    show();

    const telegram = screen.getByRole('link', { name: /@f0pp1/ });

    expect(telegram).toHaveAttribute('href', 'https://t.me/f0pp1');
    expect(telegram).toHaveAttribute('target', '_blank');
    expect(telegram).toHaveAccessibleName(expect.stringContaining('Telegram · @f0pp1'));
    expect(telegram).toHaveAccessibleName(expect.stringContaining('откроется в новой вкладке'));

    expect(screen.getByRole('link', { name: ru.contacts[4]?.label })).toHaveAttribute(
      'href',
      'mailto:danilovich36misha@gmail.com',
    );
  });

  it('связывает каждое поле со своей подписью', () => {
    show();

    expect(screen.getByLabelText('Ссылка на вакансию')).toHaveAttribute('type', 'url');
    expect(screen.getByLabelText('Описание вакансии').tagName).toBe('TEXTAREA');
    expect(screen.getByLabelText(/Компания/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Контакт для связи/)).toHaveAttribute(
      'placeholder',
      'Telegram или email',
    );
    expect(screen.getByLabelText(/Комментарий/)).toBeInTheDocument();
  });

  it('закрывается крестиком и «Отменой»', async () => {
    const onClose = vi.fn();
    show(onClose);

    await userEvent.click(screen.getByRole('button', { name: 'Закрыть' }));
    await userEvent.click(screen.getByRole('button', { name: 'Отмена' }));

    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('собирает английскую локаль из своего словаря', () => {
    render(
      <IntercomBody
        ui={en.ui.intercom}
        contacts={en.contacts}
        newTab={en.ui.newTab}
        titleId="intercom-title"
        onClose={() => {}}
      />,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Intercom' })).toBeInTheDocument();
    expect(screen.getByLabelText('Job link')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Call' })).toHaveAttribute('type', 'submit');
  });
});
