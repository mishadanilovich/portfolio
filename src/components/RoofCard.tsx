import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale } from '@/content';
import { RoofPanel } from './RoofPanel';

export async function RoofCard() {
  const current = await locale();
  const content = getContent(isLocale(current) ? current : defaultLocale);

  return (
    <RoofPanel
      roof={content.roof}
      contacts={content.contacts}
      cv={content.cv}
      ui={content.ui.roof}
    />
  );
}
