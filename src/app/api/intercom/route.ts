import { defaultLocale, getContent, isLocale } from '@/content';
import { intercomMessage } from '@/intercom/message';
import { allow } from '@/intercom/rate-limit';
import { intercomSchema } from '@/intercom/schema';
import { deliver } from '@/intercom/telegram';

function clientOf(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');

  return forwarded?.split(',')[0]?.trim() ?? 'unknown';
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const asked = typeof raw.locale === 'string' && isLocale(raw.locale) ? raw.locale : defaultLocale;
  const { errors } = getContent(asked).ui.intercom;

  if (typeof raw.website === 'string' && raw.website !== '') return Response.json({ ok: true });

  if (!allow(clientOf(request))) {
    return Response.json({ ok: false, message: errors.rate }, { status: 429 });
  }

  const parsed = intercomSchema(errors).safeParse(body);

  if (!parsed.success) {
    const fields: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const path = issue.path.join('.');
      if (path !== '' && fields[path] === undefined) fields[path] = issue.message;
    }

    return Response.json({ ok: false, fields }, { status: 400 });
  }

  const sent = await deliver(intercomMessage(parsed.data, new Date()));

  return sent
    ? Response.json({ ok: true })
    : Response.json({ ok: false, message: errors.send }, { status: 502 });
}
