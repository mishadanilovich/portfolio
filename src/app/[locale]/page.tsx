import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent, isLocale } from '@/content';
import { pageMetadata } from '@/lib/metadata';
import { Intro } from '@/components/Intro';
import { RoofCard } from '@/components/RoofCard';
import { FirstVisit } from '@/help/FirstVisit';

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);
  return pageMetadata(
    locale,
    '',
    `${content.person.name} — ${content.person.role}`,
    `${content.intro.lead} React, TypeScript, Next.js. ${content.intro.status}.`,
  );
}

export default function Page() {
  return (
    <>
      <FirstVisit />
      <Intro />
      <RoofCard />
    </>
  );
}
