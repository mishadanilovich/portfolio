// @vitest-environment jsdom

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeAll, describe, expect, it } from 'vitest';
import { en } from '@/content/en';
import { ru } from '@/content/ru';
import type { Ui } from '@/content';
import { HelpButton } from './HelpButton';
import { HelpDialog } from './HelpDialog';
import { HelpScheme } from './HelpScheme';

function show(ui: Ui = ru.ui) {
  return render(
    <>
      <HelpButton label={ui.header.help} />
      <HelpDialog ui={ui.help} scheme={<HelpScheme label={ui.help.scheme} />} />
    </>,
  );
}

describe('справка', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.open = true;
    };
    HTMLDialogElement.prototype.close = function close() {
      this.open = false;
    };
  });

  it('открывается кнопкой «?» и закрыта до неё', async () => {
    show();

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Как устроен сайт' }));

    expect(screen.getByRole('dialog')).toHaveAccessibleName('Как устроен дом');
  });

  it('нумерует шесть пунктов и подписывает схему', async () => {
    show();

    await userEvent.click(screen.getByRole('button', { name: 'Как устроен сайт' }));

    const dialog = screen.getByRole('dialog');
    const items = within(dialog).getAllByRole('listitem');

    expect(items).toHaveLength(6);
    expect(items[0]).toHaveTextContent(
      'Крыша — текущий статус: локация, формат работы и контакты.',
    );
    expect(items[5]).toHaveTextContent('Мини-карта — быстрый переход по этажам.');
    expect(within(dialog).getByRole('img')).toHaveAccessibleName('Схема дома с номерами');
  });

  it('закрывается крестиком и «Понятно»', async () => {
    show();

    const open = screen.getByRole('button', { name: 'Как устроен сайт' });

    await userEvent.click(open);
    await userEvent.click(screen.getByRole('button', { name: 'Закрыть' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    await userEvent.click(open);
    await userEvent.click(screen.getByRole('button', { name: 'Понятно' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('собирает английскую локаль из своего словаря', async () => {
    show(en.ui);

    await userEvent.click(screen.getByRole('button', { name: 'How the site works' }));

    const dialog = screen.getByRole('dialog');

    expect(dialog).toHaveAccessibleName('How the house works');
    expect(within(dialog).getAllByRole('listitem')[2]).toHaveTextContent(
      'Basement — where it began: my education.',
    );
    expect(within(dialog).getByRole('button', { name: 'Got it' })).toBeInTheDocument();
  });
});
