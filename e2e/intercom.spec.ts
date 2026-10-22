import { expect, test, type Page } from '@playwright/test';
import { ru } from '../src/content/ru';

const ui = ru.ui.intercom;

function dialogOf(page: Page) {
  return page.getByRole('dialog');
}

async function openIntercom(page: Page) {
  await page.goto('/ru');

  const trigger = page
    .getByRole('navigation', { name: ru.ui.header.nav })
    .getByRole('button', { name: ru.ui.header.call, exact: true });
  await expect(trigger).toBeVisible();
  await trigger.click();

  await expect(dialogOf(page)).toBeVisible();

  return trigger;
}

test('отправляет вакансию и показывает подтверждение', async ({ page }) => {
  await page.route('**/api/intercom', (route) =>
    route.fulfill({ json: { ok: true }, status: 200 }),
  );

  await openIntercom(page);

  await dialogOf(page).getByLabel(ui.link).fill('https://careers.example.com/senior-frontend');
  await dialogOf(page).getByLabel(ui.company, { exact: false }).fill('Example Tech');
  await dialogOf(page).getByLabel(ui.contact, { exact: false }).fill('@anna_hr');
  await dialogOf(page).getByRole('button', { name: ui.submit, exact: true }).click();

  await expect(
    dialogOf(page).getByRole('heading', { level: 3, name: ui.successTitle }),
  ).toBeVisible();
  await expect(dialogOf(page).getByText('careers.example.com/senior-frontend')).toBeVisible();
  await expect(dialogOf(page).getByText('@anna_hr')).toBeVisible();

  await dialogOf(page).getByRole('button', { name: ui.successAgain }).click();

  await expect(dialogOf(page).getByLabel(ui.link)).toHaveValue('');
});

test('не пускает пустую форму и ведёт из сводки в поле', async ({ page }) => {
  await openIntercom(page);

  await dialogOf(page).getByRole('button', { name: ui.submit, exact: true }).click();

  const alert = dialogOf(page).getByRole('alert');

  await expect(alert).toContainText('Не получилось позвонить — 2 поля.');
  await expect(dialogOf(page).getByLabel(ui.link)).toHaveAttribute('aria-invalid', 'true');
  await expect(dialogOf(page).getByLabel(ui.description)).toHaveAttribute('aria-invalid', 'true');
  await expect(dialogOf(page).getByText(ui.errors.contact)).toBeVisible();

  await alert.getByRole('link').first().click();

  await expect(dialogOf(page).getByLabel(ui.link)).toBeFocused();
});

test('закрывается по Esc и возвращает фокус на кнопку', async ({ page }) => {
  const trigger = await openIntercom(page);

  await dialogOf(page).getByLabel(ui.company, { exact: false }).fill('Example Tech');
  await page.keyboard.press('Escape');

  await expect(dialogOf(page)).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.click();

  await expect(dialogOf(page).getByLabel(ui.company, { exact: false })).toHaveValue('Example Tech');
});
