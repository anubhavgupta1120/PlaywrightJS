import { test, expect } from '@playwright/test';

test('Basic Playwright Test with page fixture', async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle('Google');
})

test('Basic Playwright Test with browser fixture', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle('Google');
})