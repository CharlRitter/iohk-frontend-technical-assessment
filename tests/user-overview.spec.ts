import { expect, test } from '@playwright/test';

const devSite = 'http://localhost:3000';

test.describe('User Overview', () => {
  test('Test Navigation', async ({ page }) => {
    await page.goto(devSite);
    await page.getByRole('menuitem', { name: 'User Overview' }).click();

    await expect(page.getByRole('main')).toContainText('Dependents by Country');
    await expect(page).toHaveURL(`${devSite}/user-overview`);
  });

  test('Test Filtering', async ({ page }) => {
    await page.goto(`${devSite}/user-overview`);

    await expect(page.getByRole('main')).toContainText('9');

    await page
      .locator('div')
      .filter({ hasText: /^Gender$/ })
      .nth(1)
      .click();
    await page.getByTitle('Male', { exact: true }).click();

    await expect(page.getByRole('main')).toContainText('5');
  });
});
