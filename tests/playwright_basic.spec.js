import { test, expect } from '@playwright/test';

test('Basic Playwright Test with page fixture', async ({ page }) => {
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

test('Practice HandsOn TestCase', async ({ browser }) => {
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

test.describe('How to handle static dropdown, checkbox and radiobutton using playwright', () => {
    test('Handling static dropdown', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        let dropdownVariable = page.locator('select.form-control');
        await dropdownVariable.selectOption("teach");
        await expect(dropdownVariable).toHaveValue('teach');
    });
    test('Handling and asserting radio button using Playwright', async ({ page }) => {

        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        let radioBtn = page.locator('.radiotextsty');
        await radioBtn.nth(1).click();
        await page.locator("#okayBtn").click();
        await expect(radioBtn.nth(1)).toBeChecked();
        let res = await radioBtn.nth(1).isChecked();
        expect(res).toBeTruthy();
    });
    test('Handling child window using playwright, asserting the blinking link and fetch the email from long text using split method', async ({ browser }) => {
        const context = await browser.newContext();
        const mainPage = await context.newPage();
        await mainPage.goto('https://rahulshettyacademy.com/loginpagePractise/');
        // Asserting the blinking link
        const blinkingLink = mainPage.locator("a[href*='documents-request']");
        await expect(blinkingLink).toHaveAttribute("class", "blinkingText");
        // Handling child window using playwright
        const [childPage] = await Promise.all([ // Expectation is that promise has to be fulfilled.
            context.waitForEvent('page'), //Listen for any new page to be opened
            blinkingLink.click()
        ]);

        const emailText = await childPage.locator(".red").textContent();
        const email = emailText.split("@")[1].split(" ")[0];
        console.log(email);
        await mainPage.locator("#username").fill(email);
        await expect(mainPage.locator("#username")).toHaveValue(email);
    })
})