// @vitest-environment jsdom

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { en } from '@/content/en';
import { ru } from '@/content/ru';
import IntercomBody from './IntercomBody';

function show(onClose = () => {}) {
  return render(
    <IntercomBody
      ui={ru.ui.intercom}
      locale="ru"
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
        locale="en"
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

describe('состояния домофона', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('показывает сводку, помечает оба поля вакансии и ведёт по ссылке в поле', async () => {
    show();

    await userEvent.click(screen.getByRole('button', { name: 'Позвонить' }));

    const alert = await screen.findByRole('alert');

    expect(alert).toHaveTextContent('Не получилось позвонить — 2 поля. Вакансия, контакт.');
    expect(screen.getByLabelText('Ссылка на вакансию')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByLabelText('Описание вакансии')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getAllByText(ru.ui.intercom.errors.vacancy)).toHaveLength(1);
    expect(screen.getByText(ru.ui.intercom.errors.contact)).toBeInTheDocument();

    await userEvent.click(within(alert).getByRole('link', { name: 'Вакансия' }));

    expect(screen.getByLabelText('Ссылка на вакансию')).toHaveFocus();
  });

  it('согласует число полей в сводке с их количеством', async () => {
    show();

    await userEvent.type(screen.getByLabelText('Ссылка на вакансию'), 'https://example.com/job');
    await userEvent.click(screen.getByRole('button', { name: 'Позвонить' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Не получилось позвонить — 1 поле.');
  });

  it('блокирует поля на время отправки и сообщает об этом', async () => {
    let release: (value: Response) => void = () => {};
    vi.stubGlobal(
      'fetch',
      vi.fn(() => new Promise<Response>((resolve) => (release = resolve))),
    );

    show();

    await userEvent.type(screen.getByLabelText('Ссылка на вакансию'), 'https://example.com/job');
    await userEvent.type(screen.getByLabelText(/Контакт для связи/), '@anna_hr');
    await userEvent.click(screen.getByRole('button', { name: 'Позвонить' }));

    expect(await screen.findByRole('button', { name: 'Звоним…' })).toBeDisabled();
    expect(screen.getByLabelText('Ссылка на вакансию')).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent('Отправляем заявку');
    expect(screen.queryByRole('button', { name: 'Закрыть' })).not.toBeInTheDocument();

    release(Response.json({ ok: true }));

    expect(await screen.findByRole('heading', { level: 3, name: 'Звонок принят' })).toBeVisible();
  });

  it('после успеха показывает отправленное и умеет начать заново', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Response.json({ ok: true })),
    );

    show();

    await userEvent.type(screen.getByLabelText('Ссылка на вакансию'), 'https://example.com/job');
    await userEvent.type(screen.getByLabelText(/Компания/), 'Example Tech');
    await userEvent.type(screen.getByLabelText(/Контакт для связи/), '@anna_hr');
    await userEvent.click(screen.getByRole('button', { name: 'Позвонить' }));

    expect(await screen.findByText('example.com/job')).toBeInTheDocument();
    expect(screen.getByText('Example Tech')).toBeInTheDocument();
    expect(screen.getByText('@anna_hr')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Отправить ещё одну' }));

    expect(screen.getByLabelText('Ссылка на вакансию')).toHaveValue('');
  });

  it('на отказ сети оставляет введённое и зовёт писать напрямую', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => Promise.reject(new Error('офлайн'))),
    );

    show();

    await userEvent.type(screen.getByLabelText('Ссылка на вакансию'), 'https://example.com/job');
    await userEvent.type(screen.getByLabelText(/Контакт для связи/), '@anna_hr');
    await userEvent.click(screen.getByRole('button', { name: 'Позвонить' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(ru.ui.intercom.errors.send);
    expect(screen.getByLabelText('Ссылка на вакансию')).toHaveValue('https://example.com/job');
  });
});
