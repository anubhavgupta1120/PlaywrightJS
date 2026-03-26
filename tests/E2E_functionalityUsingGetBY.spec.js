import { test, expect } from '@playwright/test';

test.describe('Designing e2e flow for the ecommerce application', () => {
    test('Flow with example of chaning of Locators', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();
        const productName = "iphone 13 pro";
        const countryName = " India"
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await page.getByPlaceholder('email@example.com').fill('anubhav@gmail.com');
        await page.getByPlaceholder('enter your passsword').fill('Anubhav@11');
        await page.getByRole("button", { name: "Login" }).click();
        const Products = page.locator('.card-body');
        await Products.first().waitFor();
        // const totalProductAvailable = await Products.count();
        // for (let i = 0; i < totalProductAvailable; i++) {
        //     if (await Products.locator('h5').nth(i).textContent() === productName) {
        //         await Products.locator("text=' Add To Cart'").nth(i).click();
        //         break;
        //     }
        // }
        await Products.filter({ hasText: productName }).getByRole("button", { name: "Add To Cart" }).click();
        await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
        await page.locator('.cart li').first().waitFor();
        await expect(page.getByText("iphone 13 pro")).toBeVisible();
        await page.getByRole("button", { name: "Checkout" }).click();
        let selectCountry = page.getByPlaceholder("Select Country");
        await selectCountry.pressSequentially("ind", { delay: 100 });
        const dropdown = page.locator("section.ta-results");
        await dropdown.waitFor();
        // let availableCountrySuggestionInDropdown = dropdown.locator('button.ng-star-inserted');
        // let totalAvailableCountrySuggestionInDropdown = await availableCountrySuggestionInDropdown.count();
        // for (let i = 0; i < totalAvailableCountrySuggestionInDropdown; i++) {
        //     console.log(await availableCountrySuggestionInDropdown.locator('span').nth(i).textContent());
        //     if (await availableCountrySuggestionInDropdown.locator('span').nth(i).textContent() === countryName) {
        //         await availableCountrySuggestionInDropdown.nth(i).click();
        //         break;
        //     }
        // }
        await dropdown.getByRole("button", { name: countryName }).nth(1).click();
        //await page.pause();
        await page.locator("//div[text()='CVV Code ']/following-sibling::input").fill('776');
        await page.locator("//div[text()='Name on Card ']/following-sibling::input").fill('Anubhav');
        await page.locator("//div[text()='Apply Coupon ']/following-sibling::input").fill('Ax56O');
        await page.locator("a.ng-star-inserted").click();

        await page.locator("label.ng-star-inserted").waitFor();
        let orderId = (await page.locator("label.ng-star-inserted").textContent()).split("|")[1].trim();
        console.log(orderId);
        await page.locator("label[routerlink='/dashboard/myorders']").click();
        let tableLocator = page.locator("table.table");
        await tableLocator.waitFor();
        let rows = tableLocator.locator("tbody tr");

        for (let i = 0; i < await rows.count(); i++) {
            console.log(await rows.nth(i).locator("th").textContent());
            if (await rows.nth(i).locator("th").textContent() === orderId) {
                await expect(rows.nth(i).locator("th")).toHaveText(orderId);
                await rows.nth(i).locator("td button.btn-primary").click();
                break;
            }
        }
    });
})