import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContent, isLocale } from '@/content';
import { Garage } from '@/garage/Garage';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/garage'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);

  return {
    title: `${content.ui.garage.title} — ${content.person.name}`,
    description: content.ui.garage.lead,
  };
}

export default async function GaragePage({ params }: PageProps<'/[locale]/garage'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);
  const github = content.contacts.find((contact) => contact.kind === 'github')?.href ?? '';

  return (
    <Garage
      locale={locale}
      projects={content.petProjects}
      garage={content.ui.garage}
      scene={content.ui.scene}
      github={github}
      newTab={content.ui.newTab}
    />
  );
}
