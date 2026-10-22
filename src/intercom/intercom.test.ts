import { beforeEach, describe, expect, it } from 'vitest';
import { en } from '@/content/en';
import { ru } from '@/content/ru';
import { intercomMessage } from './message';
import { allow, reset } from './rate-limit';
import { intercomSchema, type IntercomInput } from './schema';

const errors = ru.ui.intercom.errors;
const schema = intercomSchema(errors);

function values(patch: Partial<IntercomInput> = {}): IntercomInput {
  return { locale: 'ru', contact: '@anna_hr', link: 'https://example.com/job', ...patch };
}

function messagesOf(input: IntercomInput): Record<string, string> {
  const parsed = schema.safeParse(input);
  if (parsed.success) return {};

  return Object.fromEntries(
    parsed.error.issues.map((issue) => [issue.path.join('.'), issue.message]),
  );
}

describe('схема домофона', () => {
  it('пропускает вакансию со ссылкой и контактом', () => {
    const parsed = schema.safeParse(values());

    expect(parsed.success).toBe(true);
    expect(parsed.data?.company).toBe('');
  });

  it('пропускает вакансию без ссылки, но с описанием', () => {
    expect(schema.safeParse(values({ link: '', description: 'React, удалёнка' })).success).toBe(
      true,
    );
  });

  it('требует одно из двух полей вакансии и метит оба', () => {
    expect(messagesOf(values({ link: '' }))).toEqual({
      link: errors.vacancy,
      description: errors.vacancy,
    });
  });

  it('не принимает ссылку без схемы', () => {
    expect(messagesOf(values({ link: 'example.com/job' })).link).toBe(errors.link);
  });

  it('принимает контакт только как @username или email', () => {
    expect(schema.safeParse(values({ contact: 'anna@mail.example' })).success).toBe(true);
    expect(messagesOf(values({ contact: 'anna@' })).contact).toBe(errors.contact);
    expect(messagesOf(values({ contact: '@anna' })).contact).toBe(errors.contact);
    expect(messagesOf(values({ contact: '' })).contact).toBe(errors.contact);
  });

  it('обрезает пробелы по краям', () => {
    expect(schema.safeParse(values({ company: '  Example Tech  ' })).data?.company).toBe(
      'Example Tech',
    );
  });

  it('отбивает слишком длинный текст', () => {
    expect(messagesOf(values({ comment: 'я'.repeat(2001) })).comment).toBe(errors.long);
  });

  it('говорит на языке словаря, который ей дали', () => {
    const english = intercomSchema(en.ui.intercom.errors).safeParse(values({ contact: 'anna@' }));

    expect(english.error?.issues[0]?.message).toBe(en.ui.intercom.errors.contact);
  });
});

describe('сообщение в Telegram', () => {
  const at = new Date('2026-10-22T09:30:00Z');

  it('собирает заполненные поля с языком и временем', () => {
    const parsed = schema.parse(
      values({ company: 'Example Tech', comment: 'Созвон на этой неделе' }),
    );

    expect(intercomMessage(parsed, at)).toBe(
      [
        'Вакансия с сайта · RU · 22.10.2026, 12:30',
        'Ссылка: https://example.com/job',
        'Компания: Example Tech',
        'Контакт: @anna_hr',
        'Комментарий: Созвон на этой неделе',
      ].join('\n'),
    );
  });

  it('пропускает пустые поля', () => {
    const parsed = schema.parse(values({ link: '', description: 'React' }));

    expect(intercomMessage(parsed, at)).not.toContain('Ссылка');
    expect(intercomMessage(parsed, at)).toContain('Описание: React');
  });
});

describe('ограничитель частоты', () => {
  beforeEach(reset);

  it('пропускает пять попыток и закрывает шестую', () => {
    const now = Date.now();

    for (let i = 0; i < 5; i++) expect(allow('1.2.3.4', now + i)).toBe(true);
    expect(allow('1.2.3.4', now + 5)).toBe(false);
  });

  it('считает адреса по отдельности', () => {
    const now = Date.now();

    for (let i = 0; i < 5; i++) allow('1.2.3.4', now + i);
    expect(allow('5.6.7.8', now + 5)).toBe(true);
  });

  it('забывает попытки за пределами окна', () => {
    const now = Date.now();

    for (let i = 0; i < 5; i++) allow('1.2.3.4', now + i);
    expect(allow('1.2.3.4', now + 10 * 60 * 1000)).toBe(true);
  });
});
