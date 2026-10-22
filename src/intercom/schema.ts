import { z } from 'zod';
import { locales, type IntercomErrors } from '@/content/types';

const SHORT = 200;
const LONG = 2000;

const TELEGRAM = /^@[a-zA-Z0-9_]{5,32}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function trimmed(limit: number, long: string) {
  return z.string().trim().max(limit, long);
}

export function intercomSchema(errors: IntercomErrors) {
  return z
    .object({
      locale: z.enum(locales),
      link: trimmed(SHORT, errors.long)
        .refine((value) => value === '' || /^https?:\/\/\S+$/.test(value), errors.link)
        .default(''),
      description: trimmed(LONG, errors.long).default(''),
      company: trimmed(SHORT, errors.long).default(''),
      contact: trimmed(SHORT, errors.long).refine(
        (value) => TELEGRAM.test(value) || EMAIL.test(value),
        errors.contact,
      ),
      comment: trimmed(LONG, errors.long).default(''),
    })
    .superRefine((values, ctx) => {
      if (values.link !== '' || values.description !== '') return;

      for (const path of ['link', 'description'] as const) {
        ctx.addIssue({ code: 'custom', path: [path], message: errors.vacancy });
      }
    });
}

export type IntercomValues = z.infer<ReturnType<typeof intercomSchema>>;
export type IntercomInput = z.input<ReturnType<typeof intercomSchema>>;
