import { expect, test, type Page } from '@playwright/test';
import { ru } from '../src/content/ru';

const ui = ru.ui.firstVisit;

function cardOf(page: Page) {
  return page.getByRole('status').filter({ hasText: ui.title });
}

test('встречает карточкой и ведёт из неё в справку', async ({ page }) => {
  await page.goto('/ru');

  await expect(cardOf(page)).toBeVisible();
  await expect(cardOf(page)).toContainText(ui.text);

  await cardOf(page).getByRole('button', { name: ui.legend }).click();

  await expect(page.getByRole('dialog')).toHaveAccessibleName(ru.ui.help.title);
  await expect(cardOf(page)).toBeHidden();
});

test('после «Понятно» не возвращается на перезагрузке', async ({ page }) => {
  await page.goto('/ru');

  await cardOf(page).getByRole('button', { name: ui.dismiss }).click();

  await expect(cardOf(page)).toBeHidden();

  await page.reload();

  await expect(page.getByRole('button', { name: ru.ui.help.open })).toBeVisible();
  await expect(cardOf(page)).toBeHidden();
});

test('уходит вместе с первым экраном при наезде камеры', async ({ page }) => {
  await page.goto('/ru');

  await expect(cardOf(page)).toBeVisible();

  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, -400);

  await expect(page.locator('body')).toHaveAttribute('data-camera', 'focus');
  await expect(cardOf(page)).toBeHidden();
});
