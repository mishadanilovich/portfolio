import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { defaultLocale, getContent, isLocale } from '@/content';
import { findApartment } from '@/room/apartment';
import { Room } from '@/room/Room';

export function generateStaticParams() {
  return getContent(defaultLocale).floors.map((floor) => ({ n: String(floor.floor) }));
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/floor/[n]'>): Promise<Metadata> {
  const { locale, n } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);
  const floor = findApartment(content.floors, n);
  if (floor === undefined) notFound();

  return {
    title: `${floor.title} — ${content.person.name}`,
    description: floor.description,
  };
}

export default async function FloorPage({ params }: PageProps<'/[locale]/floor/[n]'>) {
  const { locale, n } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);
  const floor = findApartment(content.floors, n);
  if (floor === undefined) notFound();

  return (
    <Room
      locale={locale}
      floors={content.floors}
      floor={floor}
      room={content.ui.room}
      scene={content.ui.scene}
    />
  );
}
