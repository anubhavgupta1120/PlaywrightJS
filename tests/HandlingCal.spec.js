import { test, expect } from '@playwright/test';

test('Handling Calendar', async ({ page }) => {
    const month = "10";
    const day = "26";
    const year = "2027";
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    const yearAndMonthSetterBtn = page.locator("button.react-calendar__navigation__label");
    const calOpenBtn = page.locator("button.react-date-picker__calendar-button");
    await calOpenBtn.click();
    // To select the year, We have to click on yearAndMonthSetterBtn twice.
    await yearAndMonthSetterBtn.click();
    await yearAndMonthSetterBtn.click();
    await page.locator("//button[text()='" + year + "']").click();
    await page.locator("button.react-calendar__tile").nth(parseInt(month) - 1).click();
    await page.locator("//button[not(contains(@class, 'react-calendar__month-view__days__day--neighboringMonth'))]/abbr[text()='" + day + "']").click();
    await expect(page.locator("input[name*='day']")).toHaveValue(day);
    await expect(page.locator("input[name*='month']")).toHaveValue(month);
    await expect(page.locator("input[name*='year']")).toHaveValue(year);
})