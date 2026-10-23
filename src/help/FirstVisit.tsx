import { locale } from 'next/root-params';
import { defaultLocale, getContent, isLocale } from '@/content';
import { FirstVisitCard } from './FirstVisitCard';

export async function FirstVisit() {
  const current = await locale();
  const active = isLocale(current) ? current : defaultLocale;
  const content = getContent(active);

  return <FirstVisitCard ui={content.ui.firstVisit} />;
}
