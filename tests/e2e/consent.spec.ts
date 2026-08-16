import { expect, test, type Page } from "@playwright/test";

const storageKey = "jonasknppel.analytics-consent";
const googleTagRequest = /https:\/\/www\.googletagmanager\.com\/gtag\/js/;

async function recordGoogleTagRequests(page: Page) {
  const requests: string[] = [];

  page.on("request", (request) => {
    if (googleTagRequest.test(request.url())) requests.push(request.url());
  });
  await page.route(googleTagRequest, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: "",
    }),
  );

  return requests;
}

test("defaults to denied and keeps Google blocked after rejection and reload", async ({ page }) => {
  const requests = await recordGoogleTagRequests(page);

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("dialog", { name: "Analytics-Einstellungen" })).toBeVisible();
  expect(requests).toEqual([]);

  const consentCommands = await page.evaluate(() =>
    (window.dataLayer ?? []).map((entry) => Array.from(entry as ArrayLike<unknown>)),
  );
  expect(consentCommands).toContainEqual([
    "consent",
    "default",
    expect.objectContaining({
      analytics_storage: "denied",
      ad_storage: "denied",
      security_storage: "granted",
    }),
  ]);

  await page.getByRole("button", { name: "Nur notwendige" }).click();
  const rejected = JSON.parse(
    (await page.evaluate((key) => window.localStorage.getItem(key), storageKey)) ?? "{}",
  );
  expect(rejected).toMatchObject({
    version: "2026-08-16",
    status: "essential_only",
    analytics: false,
  });
  expect(requests).toEqual([]);

  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.getByRole("dialog", { name: "Analytics-Einstellungen" })).toBeHidden();
  await expect(page.getByRole("button", { name: "Cookie-Einstellungen" })).toBeVisible();
  expect(requests).toEqual([]);
});

test("loads Google only after acceptance and preserves the choice across navigation", async ({ page }) => {
  const requests = await recordGoogleTagRequests(page);

  await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(requests).toEqual([]);
  await page.getByRole("button", { name: "Analytics akzeptieren" }).click();
  await expect.poll(() => requests.length).toBe(1);

  const accepted = JSON.parse(
    (await page.evaluate((key) => window.localStorage.getItem(key), storageKey)) ?? "{}",
  );
  expect(accepted).toMatchObject({
    version: "2026-08-16",
    status: "all_accepted",
    analytics: true,
  });

  await page.goto("/datenschutz/", { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Datenschutzerklärung" })).toBeVisible();
  await expect(page.getByRole("dialog", { name: "Analytics-Einstellungen" })).toBeHidden();
  await expect.poll(() => requests.length).toBeGreaterThan(1);
});

test("withdraws analytics through settings and blocks it on later reloads", async ({ page }) => {
  const requests = await recordGoogleTagRequests(page);

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Analytics akzeptieren" }).click();
  await expect(page.locator("script#google-analytics-script")).toHaveCount(1);

  await page.getByRole("button", { name: "Cookie-Einstellungen" }).click();
  await expect(page.getByRole("dialog", { name: "Analytics-Einstellungen" })).toBeVisible();
  await Promise.all([
    page.waitForEvent("load"),
    page.getByRole("button", { name: "Nur notwendige" }).click(),
  ]);

  const withdrawn = JSON.parse(
    (await page.evaluate((key) => window.localStorage.getItem(key), storageKey)) ?? "{}",
  );
  expect(withdrawn).toMatchObject({
    version: "2026-08-16",
    status: "withdrawn",
    analytics: false,
  });

  const requestsAfterWithdrawal = requests.length;
  await page.reload({ waitUntil: "domcontentloaded" });
  await page.waitForTimeout(300);
  expect(requests).toHaveLength(requestsAfterWithdrawal);
});
