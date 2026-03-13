import { test, expect } from '@playwright/test';

test.skip('Basic Playwright Test with page fixture', async ({ page }) => {
    await page.goto('https://www.google.com');
    await expect(page).toHaveTitle('Google');
})

test('Basic Playwright Test with browser fixture', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator("//input[@id='username']").fill('rahulshettyacademy');
    await page.locator("input#password").fill('Learning@830$3mK2');
    await page.locator("input#signInBtn").click();
    // let errorMessage = await page.locator("div[style*='block']").textContent();
    // expect(errorMessage).toContain('Incorrect username/password.');
    const titleOfProduct = page.locator(".card-body a");
    // await titleOfProduct.first().focus();
    await titleOfProduct.first().waitFor();
    const totalProductAvailable = await titleOfProduct.count();
    console.log(totalProductAvailable);
    await verifyGivenProductPresentInList('Blackberry', totalProductAvailable, titleOfProduct);
})

test('playwright by doing handsOn', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('anubhav@gmail.com');
    await page.locator('#userPassword').fill('Anubhav@11');
    await page.locator('#login').click();
    const titleOfProduct = page.locator('.card-body h5');
    await titleOfProduct.first().waitFor();
    const totalProductAvailable = await titleOfProduct.count();
    await verifyGivenProductPresentInList('ADIDAS ORIGINAL', totalProductAvailable, titleOfProduct);
})

async function verifyGivenProductPresentInList(productName, totalProductAvailable, titleOfProduct) {
    for (let i = 0; i < totalProductAvailable; i++) {
        console.log(await titleOfProduct.nth(i).textContent());
        if (await titleOfProduct.nth(i).textContent() == productName) {
            await expect(titleOfProduct.nth(i)).toHaveText(productName);
            break;
        }
    }
}