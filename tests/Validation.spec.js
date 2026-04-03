import { test, expect } from '@playwright/test';

test("Popup Validations", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("input#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("input#displayed-text")).toBeHidden();
    page.on('dialog', dialog => dialog.accept());
    /*page.on('dialog', async dialog => {
        const message = dialog.message();
        
        if (message.includes('Hello')) {
            console.log('Accepting first dialog:', message);
            await dialog.accept(); // Accept the first one
        } else if (message.includes('Confirm')) {
            console.log('Dismissing second dialog:', message);
            await dialog.dismiss(); // Dismiss the second one
        } else {
            await dialog.accept(); // Fallback
        }
    });*/
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    // await page.locator("a[href='#top']").click();
    // await page.pause()
    // await page.goBack();

    // Handeling frames in Playwright
    const framePage = page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();
})
