import { expect, test } from '@playwright/test';

const googleAnalyticsRequest = /googletagmanager\.com|google-analytics\.com/;

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

test('presents the confirmed business identity and conversion paths', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('body')).toContainText(/co-founder & managing director \/ CTO at kernscale/i);
  await expect(page.locator('body')).toContainText('co-found and manage the company');
  await expect(page.locator('body')).toContainText('lead technical architecture and product development');
  await expect(page.locator('body')).toContainText('turn attention into durable digital systems');
  await expect(page.locator('a[href="mailto:info@jonasknppel.me"]')).toHaveText('Discuss');
  const legalControls = page.getByRole('navigation', {
    name: 'Rechtliches und Cookie-Einstellungen',
  });
  await expect(legalControls.getByRole('link', { name: 'Impressum' })).toBeVisible();
  await expect(legalControls.getByRole('link', { name: 'Datenschutz' })).toBeVisible();
  await expect(legalControls.getByRole('button', { name: 'Cookie-Einstellungen' })).toBeVisible();
  await expect(page.getByRole('navigation', { name: 'profile and contact links' })).not.toContainText(
    /impressum|datenschutz/i,
  );
});

test('serves the personal legal pages', async ({ page }) => {
  const impressumResponse = await page.goto('/impressum/', { waitUntil: 'domcontentloaded' });

  expect(impressumResponse?.status()).toBeLessThan(400);
  await expect(page.getByRole('heading', { level: 1, name: 'Impressum' })).toBeVisible();
  await expect(page.locator('main')).toContainText('Jonas Knüppel');
  await expect(page.locator('main')).toContainText('Greifstraße 22');
  await expect(page.locator('main')).toContainText('17034 Neubrandenburg');
  await expect(page.locator('a[href="mailto:info@jonasknppel.me"]')).toBeVisible();
  await expect(page.locator('a[href="/"]')).toBeVisible();

  const privacyResponse = await page.goto('/datenschutz/', { waitUntil: 'domcontentloaded' });

  expect(privacyResponse?.status()).toBeLessThan(400);
  await expect(page.getByRole('heading', { level: 1, name: 'Datenschutzerklärung' })).toBeVisible();
  await expect(page.locator('main')).toContainText('Server-Logfiles');
  await expect(page.locator('main')).toContainText('Kontaktaufnahme per E-Mail');
  await expect(page.locator('main')).toContainText('Google Analytics');
  await expect(page.locator('main')).toContainText('Einwilligung widerrufen');
  await expect(page.locator('main')).toContainText('Ihre Rechte');
});

test('loads Google Analytics only after analytics consent', async ({ page }) => {
  const analyticsRequests: string[] = [];
  page.on('request', (request) => {
    if (googleAnalyticsRequest.test(request.url())) analyticsRequests.push(request.url());
  });
  await page.addInitScript(() => localStorage.clear());

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  expect(analyticsRequests).toEqual([]);
  await expect(page.getByRole('dialog', { name: 'Analytics-Einstellungen' })).toBeVisible();
  await page.getByRole('button', { name: 'Analytics akzeptieren' }).click();
  await expect.poll(() => analyticsRequests.length).toBeGreaterThan(0);
});

test('keeps analytics disabled after rejection and exposes settings', async ({ page }) => {
  const analyticsRequests: string[] = [];
  page.on('request', (request) => {
    if (googleAnalyticsRequest.test(request.url())) analyticsRequests.push(request.url());
  });
  await page.addInitScript(() => {
    localStorage.setItem('jonasknppel.analytics-consent', 'rejected');
  });

  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  expect(analyticsRequests).toEqual([]);
  await page.getByRole('button', { name: 'Cookie-Einstellungen' }).click();
  await expect(page.getByRole('dialog', { name: 'Analytics-Einstellungen' })).toBeVisible();
});

test('publishes synchronized entity metadata and sitemap routes', async ({ page, request }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveTitle('Jonas Knüppel | Co-Founder, Managing Director & CTO at Kernscale');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    /managing director and CTO at Kernscale/i,
  );

  const jsonLd = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() ?? '{}');
  const person = jsonLd['@graph'].find((node: { '@type'?: string }) => node['@type'] === 'Person');
  expect(person.jobTitle).toBe('Co-Founder, Managing Director & CTO');

  const sitemapResponse = await request.get('/sitemap.xml');
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain('https://jonasknppel.me/');
  expect(sitemap).toContain('https://jonasknppel.me/impressum/');
  expect(sitemap).toContain('https://jonasknppel.me/datenschutz/');
});
