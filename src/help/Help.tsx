import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale } from '@/content';
import { HelpDialog } from './HelpDialog';
import { HelpScheme } from './HelpScheme';

export async function Help() {
  const current = await locale();
  const active = isLocale(current) ? current : defaultLocale;
  const content = getContent(active);

  return <HelpDialog ui={content.ui.help} scheme={<HelpScheme label={content.ui.help.scheme} />} />;
}
