import type { Metadata } from 'next';
import { Golos_Text, Literata } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getContent, isLocale, locales } from '@/content';
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

  return (
    <html lang={locale} className={`${literata.variable} ${golos.variable}`}>
      <body>{children}</body>
    </html>
  );
}
