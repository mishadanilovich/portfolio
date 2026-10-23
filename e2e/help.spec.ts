import { expect, test, type Page } from '@playwright/test';
import { ru } from '../src/content/ru';

const ui = ru.ui.help;

function dialogOf(page: Page) {
  return page.getByRole('dialog');
}

async function openHelp(page: Page) {
  await page.goto('/ru');

  const trigger = page
    .getByRole('navigation', { name: ru.ui.header.nav })
    .getByRole('button', { name: ru.ui.header.help });
  await expect(trigger).toBeVisible();
  await trigger.click();

  await expect(dialogOf(page)).toBeVisible();

  return trigger;
}

test('показывает схему дома и шесть пунктов', async ({ page }) => {
  await openHelp(page);

  await expect(dialogOf(page)).toHaveAccessibleName(ui.title);
  await expect(dialogOf(page).getByRole('img', { name: ui.scheme })).toBeVisible();
  await expect(dialogOf(page).getByRole('listitem')).toHaveCount(6);

  for (const item of ui.items) {
    await expect(dialogOf(page).getByText(`${item.term} ${item.text}`)).toBeVisible();
  }
});

test('закрывается по Esc и возвращает фокус на кнопку «?»', async ({ page }) => {
  const trigger = await openHelp(page);

  await expect(dialogOf(page).getByRole('button', { name: ui.close })).toBeFocused();

  await page.keyboard.press('Escape');

  await expect(dialogOf(page)).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('закрывается кнопкой «Понятно» и не двигает камеру', async ({ page }) => {
  await openHelp(page);

  await expect(page.locator('body')).toHaveAttribute('data-camera', 'overview');

  await dialogOf(page).getByRole('button', { name: ui.ok }).click();

  await expect(dialogOf(page)).toBeHidden();
  await expect(page.locator('body')).toHaveAttribute('data-camera', 'overview');
});
