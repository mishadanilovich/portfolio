import type { IntercomValues } from './schema';

export type IntercomReply =
  { ok: true } | { ok: false; fields?: Record<string, string>; message?: string };

export async function sendIntercom(
  values: IntercomValues & { website: string },
): Promise<IntercomReply> {
  try {
    const response = await fetch('/api/intercom', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values),
    });

    const reply = (await response.json()) as IntercomReply;

    return response.ok ? reply : { ...reply, ok: false };
  } catch {
    return { ok: false };
  }
}
