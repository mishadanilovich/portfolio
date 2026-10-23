import type { Metadata } from 'next';
import { Golos_Text, Literata } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getContent, isLocale, locales } from '@/content';
import { MiniMap } from '@/components/MiniMap';
import { OverviewButton } from '@/components/OverviewButton';
import { SiteHeader } from '@/components/SiteHeader';
import { Help } from '@/help/Help';
import { Intercom } from '@/intercom/Intercom';
import { LANDING_LEVEL } from '@/scene/layout';
import { Scene } from '@/scene/Scene';
import '../globals.css';

const literata = Literata({
  subsets: ['cyrillic', 'latin'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-literata',
});

const golos = Golos_Text({
  subsets: ['cyrillic', 'latin'],
  display: 'swap',
  variable: '--font-golos',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);

  return {
    title: `${content.person.name} — ${content.person.role}`,
    description: content.intro.lead,
  };
}

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);

  return (
    <html lang={locale} className={`${literata.variable} ${golos.variable}`}>
      <body data-camera="overview" data-level={LANDING_LEVEL}>
        <SiteHeader />
        <Help />
        <OverviewButton label={content.ui.scene.overview} />
        {children}
        <MiniMap />
        <Scene />
        <Intercom />
      </body>
    </html>
  );
}
