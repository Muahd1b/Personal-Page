import { expect, test } from '@playwright/test';

test('renders the application shell', async ({ page }) => {
  const response = await page.goto('/', { waitUntil: 'domcontentloaded' });

  expect(response, 'the navigation should produce an HTTP response').not.toBeNull();
  expect(response!.status(), 'the final response should not be an error').toBeLessThan(400);
  await expect(page.locator('body')).toContainText(/\S+/);
});

test('does not raise an uncaught browser exception during startup', async ({ page }) => {
  const pageErrors: string[] = [];
  page.on('pageerror', error => pageErrors.push(error.message));

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(250);

  expect(pageErrors).toEqual([]);
});
