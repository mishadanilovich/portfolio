import { en } from './en';
import { ru } from './ru';
import type { Content, Locale } from './types';

const dictionaries: Record<Locale, Content> = { ru, en };

export function getContent(locale: Locale): Content {
  return dictionaries[locale];
}

export { dictionaries };
export * from './format';
export * from './types';
