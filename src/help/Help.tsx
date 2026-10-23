import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale } from '@/content';
import { HelpButton } from './HelpButton';
import { HelpDialog } from './HelpDialog';
import { HelpScheme } from './HelpScheme';

export async function Help() {
  const current = await locale();
  const active = isLocale(current) ? current : defaultLocale;
  const content = getContent(active);

  return (
    <>
      <HelpButton label={content.ui.help.open} />
      <HelpDialog ui={content.ui.help} scheme={<HelpScheme label={content.ui.help.scheme} />} />
    </>
  );
}
