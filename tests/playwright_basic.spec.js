import { test, expect } from '@playwright/test';

test('Basic Playwright Test with page fixture', async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle('Google');
})

test.only('Basic Playwright Test with browser fixture', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator("//input[@id='username']").fill('Anubhav');
    await page.locator("input#password").fill('Anubhav');
    await page.locator("input#signInBtn").click();
    let errorMessage = await page.locator("div[style*='block']").textContent();
    expect(errorMessage).toContain('Incorrect username/password.');

})