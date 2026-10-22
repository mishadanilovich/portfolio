import type { IntercomValues } from './schema';

const ZONE = 'Europe/Minsk';

const LABELS: Record<Exclude<keyof IntercomValues, 'locale'>, string> = {
  link: 'Ссылка',
  description: 'Описание',
  company: 'Компания',
  contact: 'Контакт',
  comment: 'Комментарий',
};

export function intercomMessage(values: IntercomValues, now: Date): string {
  const when = new Intl.DateTimeFormat('ru-RU', {
    timeZone: ZONE,
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(now);

  const lines = [`Вакансия с сайта · ${values.locale.toUpperCase()} · ${when}`];

  for (const [key, label] of Object.entries(LABELS)) {
    const value = values[key as keyof typeof LABELS];
    if (value !== '') lines.push(`${label}: ${value}`);
  }

  return lines.join('\n');
}
