import { expect, test, type Page } from '@playwright/test';
import { ru } from '../src/content/ru';
import { fill, shortPeriod } from '../src/content/format';

const scene = ru.ui.scene;
const map = ru.ui.miniMap;

const floorAria = (floor: number) => {
  const data = ru.floors.find((item) => item.floor === floor);
  if (data === undefined) throw new Error(`нет этажа ${floor}`);

  return fill(scene.floorAria, {
    floor,
    title: data.title,
    period: shortPeriod(data.period),
  });
};

async function zoomIn(page: Page) {
  await page.mouse.move(720, 450);
  await page.mouse.wheel(0, -400);
  await expect(page.locator('body')).toHaveAttribute('data-camera', 'focus');
}

async function enterFloor(page: Page, floor: number) {
  const link = page.getByRole('link', { name: floorAria(floor) });

  await link.hover();
  await expect(page.locator('body')).toHaveAttribute('data-focus', `floor-${floor}`);
  await link.click();
}

test('подъём доводит камеру до крыши и показывает карточку статуса', async ({ page }) => {
  await page.goto('/ru');
  await expect(page.locator('body')).toHaveAttribute('data-camera', 'overview');

  await zoomIn(page);

  await page.getByRole('button', { name: map.roof }).click();

  await expect(page.locator('body')).toHaveAttribute('data-level', 'roof');
  await expect(page.getByRole('button', { name: map.roof })).toHaveAttribute(
    'aria-current',
    'true',
  );
  await expect(page.getByRole('button', { name: ru.ui.roof.copy })).toBeVisible();
});

test('этаж открывает квартиру и возвращает к дому', async ({ page }) => {
  await page.goto('/ru');
  await zoomIn(page);

  await enterFloor(page, 3);

  await expect(page).toHaveURL(/\/ru\/floor\/3$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(ru.floors[1]?.title ?? '');
  await expect(page.locator('main')).toHaveAttribute('data-room', '3');

  await page.getByRole('link', { name: scene.exitHouse }).click();

  await expect(page).toHaveURL(/\/ru$/);
  await expect(page.locator('[data-room]')).toHaveCount(0);
});

test('гараж открывается из мини-карты и перестаёт прятать сцену на выходе', async ({ page }) => {
  await page.goto('/ru');
  await zoomIn(page);

  await page.locator('[data-minimap]').getByRole('link', { name: map.garage }).click();

  await expect(page).toHaveURL(/\/ru\/garage$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(ru.ui.garage.title);
  await expect(page.getByText(ru.petProjects[0]?.description ?? '')).toBeVisible();

  await page.getByRole('link', { name: scene.exitHouse }).click();

  await expect(page.locator('[data-room]')).toHaveCount(0);
  await expect(page.getByRole('button', { name: ru.ui.help.open })).toBeVisible();
});

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' });

  test('циклов нет, переходы мгновенные, подъём и вход работают', async ({ page }) => {
    await page.goto('/ru');

    const cycles = await page.evaluate(
      () =>
        document
          .getAnimations()
          .filter((item) => item.timeline?.constructor.name === 'DocumentTimeline').length,
    );
    expect(cycles).toBe(0);

    const slow = await page.evaluate(
      () =>
        [...document.querySelectorAll('*')].filter((element) => {
          const style = getComputedStyle(element);

          return [style.transitionDuration, style.transitionDelay]
            .flatMap((value) => value.split(','))
            .some((value) => Number.parseFloat(value) > 0);
        }).length,
    );
    expect(slow).toBe(0);

    await zoomIn(page);
    await enterFloor(page, 3);

    await expect(page.locator('main')).toHaveAttribute('data-room', '3');
  });
});
