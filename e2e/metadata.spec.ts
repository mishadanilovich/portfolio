import { expect, test } from '@playwright/test';
import { getContent, locales } from '../src/content';

const origin = 'https://portfolio.example';

for (const locale of locales) {
  test(`${locale}: canonical, languages and social cards describe the current page`, async ({
    page,
    request,
  }) => {
    const content = getContent(locale);
    const pages = [
      { path: '', title: `${content.person.name} — ${content.person.role}` },
      { path: '/garage', title: `${content.ui.garage.title} — ${content.person.name}` },
      ...content.floors.map((floor) => ({
        path: `/floor/${floor.floor}`,
        title: `${floor.title} — ${content.person.name}`,
      })),
      ...content.petProjects.map((project) => ({
        path: `/garage/${project.slug}`,
        title: `${project.title} — ${content.person.name}`,
      })),
    ];

    for (const item of pages) {
      await page.goto(`/${locale}${item.path}`);
      await expect(page).toHaveTitle(item.title);
      await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
        'href',
        `${origin}/${locale}${item.path}`,
      );
      for (const language of locales) {
        await expect(page.locator(`head link[hreflang="${language}"]`)).toHaveAttribute(
          'href',
          `${origin}/${language}${item.path}`,
        );
      }
      await expect(page.locator('head link[hreflang="x-default"]')).toHaveAttribute(
        'href',
        `${origin}/ru${item.path}`,
      );
      await expect(page.locator('head meta[property="og:title"]')).toHaveAttribute(
        'content',
        item.title,
      );
      await expect(page.locator('head meta[property="og:url"]')).toHaveAttribute(
        'content',
        `${origin}/${locale}${item.path}`,
      );
      await expect(page.locator('head meta[property="og:locale"]')).toHaveAttribute(
        'content',
        locale === 'ru' ? 'ru_RU' : 'en_US',
      );
      await expect(page.locator('head meta[property="og:image"]')).toHaveAttribute(
        'content',
        `${origin}/og/${locale}.png`,
      );
      const description = await page
        .locator('head meta[name="description"]')
        .getAttribute('content');
      expect(description).toBeTruthy();
      await expect(page.locator('head meta[property="og:description"]')).toHaveAttribute(
        'content',
        description!,
      );
      await expect(page.locator('head meta[name="twitter:description"]')).toHaveAttribute(
        'content',
        description!,
      );
      await expect(page.locator('head meta[name="twitter:title"]')).toHaveAttribute(
        'content',
        item.title,
      );
      await expect(page.locator('head meta[name="twitter:card"]')).toHaveAttribute(
        'content',
        'summary_large_image',
      );
      await expect(page.locator('head meta[name="twitter:image"]')).toHaveAttribute(
        'content',
        `${origin}/og/${locale}.png`,
      );
    }

    const image = await request.get(`/og/${locale}.png`);
    expect(image.ok()).toBe(true);
    expect(image.headers()['content-type']).toContain('image/png');
    const bytes = await image.body();
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
  });
}
