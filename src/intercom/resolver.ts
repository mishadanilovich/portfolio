import type { Resolver } from 'react-hook-form';
import type { IntercomErrors } from '@/content';
import { intercomSchema, type IntercomInput, type IntercomValues } from './schema';

export function intercomResolver(
  errors: IntercomErrors,
): Resolver<IntercomInput, unknown, IntercomValues> {
  const schema = intercomSchema(errors);

  return (input) => {
    const parsed = schema.safeParse(input);
    if (parsed.success) return { values: parsed.data, errors: {} };

    const fields: Record<string, { type: string; message: string }> = {};

    for (const issue of parsed.error.issues) {
      const name = issue.path[0];
      if (typeof name === 'string' && fields[name] === undefined) {
        fields[name] = { type: issue.code, message: issue.message };
      }
    }

    return { values: {}, errors: fields };
  };
}
