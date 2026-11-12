import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';

// Run against a local production server: node scripts/generate-og.mjs http://localhost:3000
const baseURL = process.argv[2] ?? 'http://localhost:3000';
const output = new URL('../public/og/', import.meta.url);
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 756 },
    deviceScaleFactor: 1200 / 1440,
    reducedMotion: 'reduce',
  });
  await page.addInitScript(() => localStorage.setItem('house:first-visit', 'seen'));

  for (const locale of ['ru', 'en']) {
    await page.goto(new URL(`/${locale}`, baseURL).href);
    await page.locator('body[data-camera="overview"]').waitFor({ state: 'attached' });
    await page.evaluate(() => document.fonts.ready);
    // Only the captured card changes; the live site keeps all its controls.
    await page.addStyleTag({
      content: `
      nav, button, a[download], p[data-hidden-in-focus] { display: none !important; }
      header { top: 52px !important; padding: 0 72px !important; height: auto !important;
        background: transparent !important; border: 0 !important; }
      header > a > svg { width: 42px; height: 52px; }
      header > a > span > span:first-child { font-size: 28px !important; }
      header > a > span > span:last-child { font-size: 18px !important; }
    `,
    });
    await page.screenshot({
      path: fileURLToPath(new URL(`${locale}.png`, output)),
      animations: 'disabled',
    });
  }
} finally {
  await browser.close();
}
