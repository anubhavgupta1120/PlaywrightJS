import { test, expect } from '@playwright/test';

test('Learning GetBy Locator of playwright', async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Anubhav@11");
    await page.getByRole("button", { name: 'Submit' }).click();
    await page.getByText("Success! The Form has been submitted successfully!.").waitFor();
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible();
    await page.getByRole("link", { name: 'Shop' }).click();
    await page.locator("div.card").filter({ hasText: "Samsung Note 8" }).
        getByRole("button").click();
})