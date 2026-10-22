import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale } from '@/content';
import { IntercomDialog } from './IntercomDialog';

export async function Intercom() {
  const current = await locale();
  const active = isLocale(current) ? current : defaultLocale;
  const content = getContent(active);

  return (
    <IntercomDialog
      ui={content.ui.intercom}
      locale={active}
      contacts={content.contacts}
      newTab={content.ui.newTab}
    />
  );
}
