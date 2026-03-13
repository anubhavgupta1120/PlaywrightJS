# 🎭 Playwright JavaScript Cheat Sheet

A quick and comprehensive reference guide for using Playwright with JavaScript/Node.js.

---

## 💻 CLI Commands

### Installation & Initialization
```bash
# Initialize a new Playwright project
npm init playwright@latest

# Install Playwright browsers manually
npx playwright install
```

### Running Tests
```bash
# Run all tests in headless mode (default)
npx playwright test

# Run tests in a specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run a specific test file
npx playwright test tests/login.spec.js

# Run tests in headed mode (visible browser)
npx playwright test --headed

# Run tests and open the HTML report afterward
npx playwright test --reporter=html
```

### Debugging & Tooling
```bash
# Open the Playwright UI Mode (Highly Recommended for local testing)
npx playwright test --ui

# Open the Trace Viewer for a specific trace file
npx playwright show-trace trace.zip

# Open the Playwright Inspector / Debug mode
npx playwright test --debug

# Generate tests by recording your browser interactions (Codegen)
npx playwright codegen
npx playwright codegen demo.playwright.dev
```

---

## 🧭 Navigation

```javascript
// Navigate to a URL
await page.goto('https://example.com');

// Reload the current page
await page.reload();

// Go back to the previous page
await page.goBack();

// Go forward
await page.goForward();
```

---

## 🎯 Locators

Playwright recommends using user-facing locators (like `getByRole` or `getByText`) whenever possible.

```javascript
// By Role (Best Practice for accessibility)
await page.getByRole('button', { name: 'Submit' });
await page.getByRole('heading', { level: 1 });

// By Text Content
await page.getByText('Welcome, User');
await page.getByText('Login', { exact: true });

// By Label (Great for form inputs)
await page.getByLabel('Password');

// By Placeholder
await page.getByPlaceholder('Search...');

// By Test ID (e.g., data-testid="login-btn")
await page.getByTestId('login-btn');

// CSS or XPath Selectors (Use when built-in locators aren't enough)
await page.locator('.submit-btn');
await page.locator('#email');
await page.locator('//button[@id="submit"]');

// Filtering Locators
await page.getByRole('listitem').filter({ hasText: 'Item 2' });
```

---

## 🕹️ User Interactions

```javascript
// Click an element
await page.getByRole('button', { name: 'Submit' }).click();

// Double click
await page.getByText('Item').dblclick();

// Right click
await page.getByText('Item').click({ button: 'right' });

// Fill an input field (clears existing text first)
await page.getByLabel('Email').fill('user@example.com');

// Type character by character (useful for auto-suggest fields)
await page.getByLabel('Username').pressSequentially('Anubhav', { delay: 100 });

// Press a keyboard key
await page.getByLabel('Search').press('Enter');
await page.getByLabel('Search').press('Control+A');

// Check/Uncheck a checkbox or radio button
await page.getByLabel('I agree to the terms').check();
await page.getByLabel('Subscribe to newsletter').uncheck();

// Select from a dropdown (<select>)
await page.locator('select#colors').selectOption('blue');    // By value
await page.locator('select#colors').selectOption({ label: 'Blue' }); // By label

// Hover over an element
await page.getByText('Menu').hover();

// Upload a file
await page.getByLabel('Upload resume').setInputFiles('path/to/resume.pdf');
```

---

## ✅ Assertions

Playwright uses the `expect` function from its test runner for assertions.

```javascript
import { test, expect } from '@playwright/test';

// Text & Content Assertions
await expect(page.getByRole('heading')).toHaveText('Welcome');
await expect(page.locator('.alert')).toContainText('Success');

// Visibility Assertions
await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
await expect(page.getByText('Loading...')).toBeHidden();

// State Assertions
await expect(page.getByLabel('I agree')).toBeChecked();
await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();
await expect(page.getByLabel('Username')).toBeEmpty();
await expect(page.getByLabel('Email')).toBeEnabled();

// Value & Attribute Assertions
await expect(page.getByLabel('Email')).toHaveValue('user@example.com');
await expect(page.locator('.avatar')).toHaveAttribute('alt', 'User profile');
await expect(page.locator('.box')).toHaveCSS('background-color', 'rgb(255, 0, 0)');

// Page Level Assertions
await expect(page).toHaveURL('https://example.com/dashboard');
await expect(page).toHaveURL(/.*dashboard/); // Using Regex
await expect(page).toHaveTitle('Dashboard - My App');
```

---

## 🌐 Network & APIs

```javascript
// Wait for a specific network response
const response = await page.waitForResponse('**/api/data');
console.log(await response.json());

// Intercept and mock a network request
await page.route('**/api/users', async route => {
  const json = [{ id: 1, name: 'Anubhav' }];
  await route.fulfill({ json });
});

// Abort specific requests (e.g., block images to speed up tests)
await page.route('**/*.{png,jpg,jpeg}', route => route.abort());
```

---

## ⏱️ Evaluation & Waiting

```javascript
// Run JavaScript inside the browser context
const windowWidth = await page.evaluate(() => window.innerWidth);

// Wait for a specific amount of time (Not recommended, use assertions instead)
await page.waitForTimeout(2000); // 2 seconds

// Wait for an element to appear in the DOM
await page.locator('.notification').waitFor({ state: 'visible' });
```
