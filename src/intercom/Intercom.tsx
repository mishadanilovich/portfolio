import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale } from '@/content';
import { IntercomDialog } from './IntercomDialog';

export async function Intercom() {
  const current = await locale();
  const content = getContent(isLocale(current) ? current : defaultLocale);

  return (
    <IntercomDialog
      ui={content.ui.intercom}
      contacts={content.contacts}
      newTab={content.ui.newTab}
    />
  );
}
