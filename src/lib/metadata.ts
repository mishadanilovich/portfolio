import type { Metadata } from 'next';
import { defaultLocale, getContent, locales, type Locale } from '@/content';

export function getSiteUrl(): URL {
  const url = new URL(process.env.SITE_URL?.trim() || 'http://localhost:3000');

  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.username !== '' ||
    url.password !== '' ||
    url.pathname !== '/' ||
    url.search !== '' ||
    url.hash !== ''
  ) {
    throw new Error('SITE_URL must be an http(s) origin, without a path, credentials or query.');
  }

  return url;
}

const ogLocales: Record<Locale, string> = { ru: 'ru_RU', en: 'en_US' };

export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const content = getContent(locale);
  const url = `/${locale}${path}`;
  const image = {
    url: `/og/${locale}.png`,
    width: 1200,
    height: 630,
    alt: `${content.intro.title} — ${content.person.name}`,
  };

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(locales.map((language) => [language, `/${language}${path}`])),
        'x-default': `/${defaultLocale}${path}`,
      },
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: `${content.person.name} — ${content.intro.title}`,
      locale: ogLocales[locale],
      alternateLocale: locales
        .filter((language) => language !== locale)
        .map((language) => ogLocales[language]),
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
