# 🎭 Playwright with JavaScript — Complete Learning Notes

---

## Table of Contents

1. [Introduction to Playwright](#1-introduction-to-playwright)
2. [Installation & Setup](#2-installation--setup)
3. [Project Structure](#3-project-structure)
4. [Core Concepts](#4-core-concepts)
5. [Locators & Selectors](#5-locators--selectors)
6. [Actions & Interactions](#6-actions--interactions)
7. [Assertions](#7-assertions)
8. [Waiting Strategies](#8-waiting-strategies)
9. [Page Object Model (POM)](#9-page-object-model-pom)
10. [Fixtures](#10-fixtures)
11. [API Testing](#11-api-testing)
12. [Handling Frames & iFrames](#12-handling-frames--iframes)
13. [File Upload & Download](#13-file-upload--download)
14. [Screenshots & Videos](#14-screenshots--videos)
15. [Network Interception & Mocking](#15-network-interception--mocking)
16. [Authentication & Storage State](#16-authentication--storage-state)
17. [Parallel Execution](#17-parallel-execution)
18. [Configuration (playwright.config.js)](#18-configuration-playwrightconfigjs)
19. [Reporters](#19-reporters)
20. [CI/CD Integration](#20-cicd-integration)
21. [Best Practices](#21-best-practices)
22. [Cheat Sheet](#22-cheat-sheet)

---

## 1. Introduction to Playwright

Playwright is an open-source automation framework by **Microsoft** that enables reliable end-to-end testing for modern web applications.

### Why Playwright?
- Supports **Chromium, Firefox, and WebKit** (Safari engine) — all in one tool
- Built-in **auto-waiting** — no flaky sleeps needed
- Supports **multiple languages**: JavaScript, TypeScript, Python, Java, C#
- Works with **headless and headed** browsers
- Supports **mobile emulation**, **geolocation**, and **permissions**
- First-class **API testing** support
- Rich **tracing, screenshots, and video** capabilities

### Playwright vs Selenium vs Cypress

| Feature | Playwright | Selenium | Cypress |
|---|---|---|---|
| Multi-browser | ✅ Yes | ✅ Yes | ⚠️ Limited |
| Auto-waiting | ✅ Built-in | ❌ Manual | ✅ Built-in |
| API Testing | ✅ Yes | ❌ No | ✅ Yes |
| Speed | 🚀 Fast | 🐢 Slow | ⚡ Fast |
| iFrame support | ✅ Easy | ✅ Yes | ⚠️ Limited |
| Mobile emulation | ✅ Yes | ⚠️ Limited | ❌ No |

---

## 2. Installation & Setup

### Prerequisites
- Node.js (v14 or above)
- npm or yarn

### Step 1: Create a new project
```bash
mkdir my-playwright-project
cd my-playwright-project
npm init -y
```

### Step 2: Install Playwright
```bash
npm init playwright@latest
```
This command will:
- Ask you to choose JavaScript or TypeScript
- Create a `playwright.config.js` file
- Create a sample `tests/` folder
- Install browser binaries (Chromium, Firefox, WebKit)

### Step 3: Install browsers manually (if needed)
```bash
npx playwright install
# Install specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### Step 4: Run tests
```bash
npx playwright test                        # Run all tests
npx playwright test --headed               # Run with visible browser
npx playwright test tests/login.spec.js    # Run specific file
npx playwright test --project=chromium     # Run on specific browser
```

### Step 5: Open Playwright UI Mode
```bash
npx playwright test --ui
```

### Step 6: Open HTML Report
```bash
npx playwright show-report
```

---

## 3. Project Structure

```
my-playwright-project/
├── tests/
│   ├── login.spec.js
│   ├── dashboard.spec.js
│   └── api.spec.js
├── pages/                    ← Page Object Model files
│   ├── LoginPage.js
│   └── DashboardPage.js
├── fixtures/                 ← Custom fixtures
│   └── baseFixtures.js
├── utils/                    ← Helper utilities
│   └── helpers.js
├── test-data/                ← Test data files
│   └── users.json
├── playwright.config.js      ← Main configuration
└── package.json
```

---

## 4. Core Concepts

### 4.1 Basic Test Structure

```javascript
const { test, expect } = require('@playwright/test');

test.describe('Login Tests', () => {

  test.beforeAll(async () => {
    // Runs once before all tests in this describe block
    console.log('Setting up test suite...');
  });

  test.afterAll(async () => {
    // Runs once after all tests in this describe block
    console.log('Cleaning up test suite...');
  });

  test.beforeEach(async ({ page }) => {
    // Runs before each test
    await page.goto('https://example.com/login');
  });

  test.afterEach(async ({ page }) => {
    // Runs after each test
    await page.screenshot({ path: 'screenshot.png' });
  });

  test('should login successfully', async ({ page }) => {
    await page.fill('#username', 'admin');
    await page.fill('#password', 'password123');
    await page.click('#loginBtn');
    await expect(page).toHaveURL(/dashboard/);
  });

});
```

### 4.2 Browser, Context, and Page

```
Browser
  └── BrowserContext  (like an incognito window — isolated cookies/session)
        └── Page      (a single tab)
```

```javascript
const { chromium } = require('@playwright/test');

const browser = await chromium.launch({ headless: false });

// Create a new context (isolated session)
const context = await browser.newContext();

// Create a new page (tab)
const page = await context.newPage();

await page.goto('https://example.com');

await browser.close();
```

### 4.3 Multiple Tabs / Windows

```javascript
test('open new tab', async ({ page, context }) => {
  // Listen for a new page event
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('#openNewTab')
  ]);

  await newPage.waitForLoadState();
  console.log(await newPage.title());
});
```

### 4.4 Mobile Emulation

```javascript
const { devices } = require('@playwright/test');
const iPhone = devices['iPhone 13'];

const context = await browser.newContext({
  ...iPhone,
  locale: 'en-US',
});
const page = await context.newPage();
await page.goto('https://example.com');
```

---

## 5. Locators & Selectors

Locators are the heart of Playwright — they find elements on the page.

### 5.1 Recommended Locators (Preferred)

```javascript
// By Role (ARIA role — most recommended)
page.getByRole('button', { name: 'Submit' })
page.getByRole('textbox', { name: 'Username' })
page.getByRole('link', { name: 'Home' })
page.getByRole('checkbox', { name: 'Remember me' })
page.getByRole('heading', { name: 'Dashboard' })

// By Label
page.getByLabel('Email Address')

// By Placeholder
page.getByPlaceholder('Enter your email')

// By Text Content
page.getByText('Welcome back!')
page.getByText('Submit', { exact: true })

// By Alt Text (images)
page.getByAltText('Profile picture')

// By Title
page.getByTitle('Settings')

// By Test ID (data-testid attribute)
page.getByTestId('login-button')
// Requires: <button data-testid="login-button">
```

### 5.2 CSS & XPath Selectors (Fallback)

```javascript
// CSS Selectors
page.locator('#username')           // by ID
page.locator('.btn-primary')        // by class
page.locator('input[type="email"]') // by attribute
page.locator('form > button')       // child combinator
page.locator('input:nth-child(2)')  // nth-child
page.locator('text=Submit')         // by text (CSS)

// XPath
page.locator('//button[@id="submit"]')
page.locator('xpath=//div[@class="container"]//span')
```

### 5.3 Chaining & Filtering Locators

```javascript
// Chaining locators
const row = page.locator('table tr').nth(2);
const cell = row.locator('td').first();

// Filter by text
const items = page.locator('li').filter({ hasText: 'Active' });

// Filter by containing another locator
const rows = page.locator('tr').filter({
  has: page.locator('td.status', { hasText: 'Active' })
});

// Get by index
page.locator('.item').nth(0)    // first item
page.locator('.item').first()   // first item
page.locator('.item').last()    // last item
```

### 5.4 Locator Methods

```javascript
const btn = page.getByRole('button', { name: 'Submit' });

// Check visibility
await btn.isVisible();
await btn.isEnabled();
await btn.isChecked();
await btn.isEditable();
await btn.isDisabled();
await btn.isHidden();

// Get count
await page.locator('.item').count();

// Get text
await btn.textContent();
await btn.innerText();
await btn.inputValue();          // for inputs

// Get attribute
await btn.getAttribute('href');
await btn.getAttribute('class');
```

---

## 6. Actions & Interactions

### 6.1 Navigation

```javascript
await page.goto('https://example.com');
await page.goto('https://example.com', { waitUntil: 'networkidle' });
await page.goBack();
await page.goForward();
await page.reload();
await page.waitForURL('**/dashboard');
console.log(page.url());
console.log(await page.title());
```

### 6.2 Clicking

```javascript
await page.click('#submitBtn');
await page.getByRole('button', { name: 'Submit' }).click();

// Double click
await page.dblclick('#item');

// Right click
await page.click('#item', { button: 'right' });

// Click at specific position
await page.click('#canvas', { position: { x: 100, y: 50 } });

// Click with modifier key (Ctrl+Click)
await page.click('#link', { modifiers: ['Control'] });

// Force click (ignores actionability checks)
await page.click('#btn', { force: true });

// Tap (for mobile)
await page.tap('#btn');
```

### 6.3 Typing & Filling

```javascript
// Fill (clears and types — fastest)
await page.fill('#username', 'john@example.com');

// Type (simulates keystrokes — slower, triggers events)
await page.type('#username', 'john@example.com');
await page.type('#username', 'john@example.com', { delay: 100 }); // slow typing

// Press a key
await page.press('#username', 'Enter');
await page.press('body', 'Escape');
await page.press('#search', 'Control+A'); // select all
await page.press('#search', 'Control+C'); // copy

// Clear an input
await page.fill('#username', '');

// Focus an element
await page.focus('#username');
```

### 6.4 Select Dropdowns

```javascript
// By value
await page.selectOption('#country', 'US');

// By label (visible text)
await page.selectOption('#country', { label: 'United States' });

// By index
await page.selectOption('#country', { index: 1 });

// Multiple select
await page.selectOption('#skills', ['javascript', 'python']);
```

### 6.5 Checkboxes & Radio Buttons

```javascript
// Check
await page.check('#rememberMe');
await page.getByLabel('Accept Terms').check();

// Uncheck
await page.uncheck('#rememberMe');

// Set state
await page.getByLabel('Newsletter').setChecked(true);
await page.getByLabel('Newsletter').setChecked(false);

// Radio button — just click it
await page.click('#radio-option-2');
```

### 6.6 Hover & Focus

```javascript
await page.hover('#menuItem');
await page.focus('#searchInput');
```

### 6.7 Keyboard Shortcuts

```javascript
await page.keyboard.press('Tab');
await page.keyboard.press('Enter');
await page.keyboard.press('ArrowDown');
await page.keyboard.type('Hello World');
await page.keyboard.down('Shift');
await page.keyboard.press('ArrowLeft');
await page.keyboard.up('Shift');
```

### 6.8 Mouse Actions

```javascript
await page.mouse.move(100, 200);
await page.mouse.click(100, 200);
await page.mouse.dblclick(100, 200);
await page.mouse.down();
await page.mouse.up();

// Drag and drop
await page.dragAndDrop('#source', '#target');
// or with mouse
await page.mouse.move(100, 100);
await page.mouse.down();
await page.mouse.move(300, 300);
await page.mouse.up();
```

### 6.9 Scroll

```javascript
// Scroll page
await page.evaluate(() => window.scrollTo(0, 1000));

// Scroll to element
await page.locator('#footer').scrollIntoViewIfNeeded();

// Scroll within element
await page.locator('#scrollableDiv').evaluate(el => el.scrollTop = 500);
```

---

## 7. Assertions

Playwright uses `expect()` for assertions. These auto-wait for conditions to be true.

### 7.1 Page Assertions

```javascript
// URL
await expect(page).toHaveURL('https://example.com/dashboard');
await expect(page).toHaveURL(/dashboard/);

// Title
await expect(page).toHaveTitle('My App - Dashboard');
await expect(page).toHaveTitle(/Dashboard/);
```

### 7.2 Locator Assertions

```javascript
const btn = page.getByRole('button', { name: 'Submit' });
const input = page.getByLabel('Username');

// Visibility
await expect(btn).toBeVisible();
await expect(btn).toBeHidden();

// State
await expect(btn).toBeEnabled();
await expect(btn).toBeDisabled();
await expect(input).toBeFocused();

// Checkbox
await expect(page.getByLabel('Accept')).toBeChecked();
await expect(page.getByLabel('Accept')).not.toBeChecked();

// Text content
await expect(btn).toHaveText('Submit');
await expect(btn).toHaveText(/submit/i);  // regex
await expect(btn).toContainText('Sub');

// Value (inputs)
await expect(input).toHaveValue('john@example.com');
await expect(input).toHaveValue(/john/);

// Attribute
await expect(btn).toHaveAttribute('type', 'submit');
await expect(page.locator('img')).toHaveAttribute('src', /profile/);

// CSS class
await expect(btn).toHaveClass('btn-primary');
await expect(btn).toHaveClass(/active/);

// Count
await expect(page.locator('.item')).toHaveCount(5);

// Screenshot comparison
await expect(page).toHaveScreenshot('homepage.png');
await expect(page.locator('#header')).toHaveScreenshot('header.png');
```

### 7.3 Soft Assertions

Soft assertions do NOT stop the test when they fail — all assertions run first, then the test fails.

```javascript
test('soft assertions example', async ({ page }) => {
  await page.goto('https://example.com');

  await expect.soft(page).toHaveTitle('My App');
  await expect.soft(page.getByRole('button')).toBeVisible();
  await expect.soft(page.getByText('Welcome')).toBeVisible();

  // Test continues even if previous soft assertions fail
  console.log('Done checking');
});
```

### 7.4 Negating Assertions

```javascript
await expect(btn).not.toBeVisible();
await expect(btn).not.toBeDisabled();
await expect(input).not.toHaveValue('');
```

### 7.5 Custom Timeout for Assertions

```javascript
await expect(btn).toBeVisible({ timeout: 10000 }); // wait up to 10s
```

---

## 8. Waiting Strategies

### 8.1 Auto-Waiting (Default)

Playwright automatically waits for elements to be:
- **Attached** to the DOM
- **Visible** on the page
- **Stable** (not animating)
- **Enabled** (not disabled)
- **Ready to receive events**

```javascript
// These all auto-wait internally — no explicit wait needed
await page.click('#btn');
await page.fill('#input', 'text');
await expect(page.locator('#result')).toBeVisible();
```

### 8.2 waitForSelector

```javascript
// Wait for element to appear
await page.waitForSelector('#result');
await page.waitForSelector('.modal', { state: 'visible' });
await page.waitForSelector('#spinner', { state: 'hidden' });
await page.waitForSelector('#btn', { state: 'attached' });
await page.waitForSelector('#btn', { state: 'detached' });
```

### 8.3 waitForURL

```javascript
await page.waitForURL('**/dashboard');
await page.waitForURL(/login/, { timeout: 5000 });
```

### 8.4 waitForLoadState

```javascript
await page.waitForLoadState();                   // default: 'load'
await page.waitForLoadState('domcontentloaded');
await page.waitForLoadState('networkidle');      // No network calls for 500ms
```

### 8.5 waitForResponse / waitForRequest

```javascript
// Wait for specific API response
const response = await page.waitForResponse('**/api/users');
const data = await response.json();

// Wait while performing action
const [response] = await Promise.all([
  page.waitForResponse('**/api/login'),
  page.click('#submitBtn')
]);
console.log(response.status());
```

### 8.6 waitForEvent

```javascript
// Wait for a dialog
const dialog = await page.waitForEvent('dialog');
await dialog.accept();

// Wait for new page/tab
const [popup] = await Promise.all([
  page.waitForEvent('popup'),
  page.click('#openPopup')
]);
```

### 8.7 waitForFunction

```javascript
// Wait for custom JS condition
await page.waitForFunction(() => document.title === 'Loaded');
await page.waitForFunction(selector => {
  const el = document.querySelector(selector);
  return el && el.textContent.includes('Success');
}, '#status');
```

### 8.8 Explicit Timeout (Use Sparingly!)

```javascript
// Only as a last resort
await page.waitForTimeout(2000); // Wait 2 seconds — AVOID this!
```

---

## 9. Page Object Model (POM)

POM separates test logic from page interaction logic, improving maintainability.

### 9.1 Creating a Page Object

```javascript
// pages/LoginPage.js
class LoginPage {
  constructor(page) {
    this.page = page;
    // Define locators
    this.usernameInput = page.getByLabel('Username');
    this.passwordInput = page.getByLabel('Password');
    this.loginButton   = page.getByRole('button', { name: 'Login' });
    this.errorMessage  = page.getByTestId('error-msg');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };
```

### 9.2 Using the Page Object in Tests

```javascript
// tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login', () => {
  test('valid login redirects to dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin', 'password123');
    await expect(page).toHaveURL(/dashboard/);
  });

  test('invalid login shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong', 'wrong');
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid credentials');
  });
});
```

### 9.3 Dashboard Page Example

```javascript
// pages/DashboardPage.js
class DashboardPage {
  constructor(page) {
    this.page = page;
    this.welcomeMessage = page.getByTestId('welcome-msg');
    this.logoutButton   = page.getByRole('button', { name: 'Logout' });
    this.navLinks       = page.getByRole('navigation').getByRole('link');
  }

  async logout() {
    await this.logoutButton.click();
  }

  async getWelcomeMessage() {
    return await this.welcomeMessage.textContent();
  }

  async getNavLinkCount() {
    return await this.navLinks.count();
  }
}

module.exports = { DashboardPage };
```

---

## 10. Fixtures

Fixtures provide reusable setup/teardown logic across tests.

### 10.1 Built-in Fixtures

```javascript
test('example', async ({
  page,         // A fresh page
  context,      // A browser context
  browser,      // The browser instance
  request,      // API request context
  baseURL,      // From config
}) => {
  await page.goto(baseURL + '/login');
});
```

### 10.2 Custom Fixtures

```javascript
// fixtures/baseFixtures.js
const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { DashboardPage } = require('../pages/DashboardPage');

const test = base.extend({

  // Page Object fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Authenticated page fixture
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('admin', 'password123');
    await page.waitForURL(/dashboard/);
    await use(page);
    // Teardown (after test)
    await page.close();
  },

});

module.exports = { test, expect };
```

### 10.3 Using Custom Fixtures in Tests

```javascript
// tests/dashboard.spec.js
const { test, expect } = require('../fixtures/baseFixtures');

test('dashboard loads with fixtures', async ({ authenticatedPage }) => {
  await expect(authenticatedPage).toHaveURL(/dashboard/);
});

test('login page fixture', async ({ loginPage }) => {
  await loginPage.goto();
  await expect(loginPage.loginButton).toBeVisible();
});
```

---

## 11. API Testing

Playwright can test REST APIs directly without a browser.

### 11.1 Basic API Request

```javascript
const { test, expect } = require('@playwright/test');

test('GET users API', async ({ request }) => {
  const response = await request.get('https://reqres.in/api/users');

  expect(response.status()).toBe(200);
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body.data).toHaveLength(6);
});
```

### 11.2 POST Request

```javascript
test('POST create user', async ({ request }) => {
  const response = await request.post('https://reqres.in/api/users', {
    data: {
      name: 'John Doe',
      job: 'Developer'
    }
  });

  expect(response.status()).toBe(201);
  const body = await response.json();
  expect(body.name).toBe('John Doe');
  expect(body.id).toBeTruthy();
});
```

### 11.3 PUT / PATCH / DELETE

```javascript
test('PUT update user', async ({ request }) => {
  const response = await request.put('https://reqres.in/api/users/2', {
    data: { name: 'Jane Doe', job: 'Manager' }
  });
  expect(response.status()).toBe(200);
});

test('PATCH partial update', async ({ request }) => {
  const response = await request.patch('https://reqres.in/api/users/2', {
    data: { job: 'Senior Manager' }
  });
  expect(response.status()).toBe(200);
});

test('DELETE user', async ({ request }) => {
  const response = await request.delete('https://reqres.in/api/users/2');
  expect(response.status()).toBe(204);
});
```

### 11.4 With Headers & Auth

```javascript
test('authenticated API call', async ({ request }) => {
  const response = await request.get('https://api.example.com/protected', {
    headers: {
      'Authorization': 'Bearer my-token',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  expect(response.status()).toBe(200);
});
```

### 11.5 Creating a Reusable API Context

```javascript
// In playwright.config.js
module.exports = {
  use: {
    baseURL: 'https://api.example.com',
    extraHTTPHeaders: {
      'Authorization': `Bearer ${process.env.API_TOKEN}`,
      'Accept': 'application/json',
    }
  }
};

// In test
test('get profile', async ({ request }) => {
  const res = await request.get('/api/profile'); // baseURL is prepended
  expect(res.ok()).toBeTruthy();
});
```

---

## 12. Handling Frames & iFrames

### 12.1 Accessing an iFrame

```javascript
// By URL
const frame = page.frame({ url: /embed.example.com/ });

// By name attribute
const frame = page.frame({ name: 'my-iframe' });

// By locator
const frame = page.frameLocator('#iframeId');
const frame = page.frameLocator('[title="Widget"]');
```

### 12.2 Interacting Inside a Frame

```javascript
// Using frameLocator (recommended)
const frame = page.frameLocator('#my-iframe');
await frame.getByRole('button', { name: 'Submit' }).click();
await frame.getByLabel('Email').fill('test@test.com');
await expect(frame.getByText('Success')).toBeVisible();

// Using frame() method
const frame = page.frame({ name: 'my-frame' });
await frame.fill('#input', 'Hello');
await frame.click('#btn');
```

### 12.3 Nested iFrames

```javascript
const outerFrame = page.frameLocator('#outer');
const innerFrame = outerFrame.frameLocator('#inner');
await innerFrame.getByRole('button', { name: 'Click Me' }).click();
```

---

## 13. File Upload & Download

### 13.1 File Upload

```javascript
// Single file upload
await page.setInputFiles('#fileInput', 'path/to/file.pdf');

// Multiple files
await page.setInputFiles('#fileInput', [
  'path/to/file1.pdf',
  'path/to/file2.jpg'
]);

// Using locator
await page.locator('input[type="file"]').setInputFiles('upload.txt');

// Clear file input
await page.setInputFiles('#fileInput', []);
```

### 13.2 File Download

```javascript
test('download file', async ({ page }) => {
  // Wait for download event
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#downloadBtn')
  ]);

  // Get download info
  console.log(download.suggestedFilename());
  console.log(await download.path()); // temp path

  // Save to a specific location
  await download.saveAs('/path/to/save/file.pdf');

  // Get as buffer
  const stream = await download.createReadStream();
});
```

---

## 14. Screenshots & Videos

### 14.1 Screenshots

```javascript
// Full page screenshot
await page.screenshot({ path: 'screenshot.png' });
await page.screenshot({ path: 'fullpage.png', fullPage: true });

// Element screenshot
await page.locator('#header').screenshot({ path: 'header.png' });

// Screenshot as buffer
const buffer = await page.screenshot();

// With specific clip area
await page.screenshot({
  path: 'clipped.png',
  clip: { x: 0, y: 0, width: 800, height: 400 }
});
```

### 14.2 Automatic Screenshots on Failure (in config)

```javascript
// playwright.config.js
use: {
  screenshot: 'only-on-failure', // 'off' | 'on' | 'only-on-failure'
}
```

### 14.3 Videos

```javascript
// playwright.config.js
use: {
  video: 'retain-on-failure', // 'off' | 'on' | 'retain-on-failure' | 'on-first-retry'
}

// Access video path after test
test.afterEach(async ({ page }, testInfo) => {
  const video = page.video();
  if (video) {
    const path = await video.path();
    console.log('Video saved to:', path);
  }
});
```

### 14.4 Trace Viewer

Traces record full test execution including screenshots, network calls, console logs.

```javascript
// playwright.config.js
use: {
  trace: 'retain-on-failure', // 'off' | 'on' | 'retain-on-failure' | 'on-first-retry'
}

// Run trace manually
const context = await browser.newContext();
await context.tracing.start({ screenshots: true, snapshots: true });

await page.goto('https://example.com');
await page.click('#btn');

await context.tracing.stop({ path: 'trace.zip' });
```

```bash
# View trace in browser
npx playwright show-trace trace.zip
```

---

## 15. Network Interception & Mocking

### 15.1 Route (Intercept & Modify Requests)

```javascript
// Block all image requests
await page.route('**/*.{png,jpg,jpeg,gif}', route => route.abort());

// Mock an API response
await page.route('**/api/users', async route => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ id: 1, name: 'Mock User' }])
  });
});

// Modify request headers
await page.route('**/api/**', async route => {
  const headers = {
    ...route.request().headers(),
    'Authorization': 'Bearer test-token'
  };
  await route.continue({ headers });
});

// Pass through (do nothing)
await page.route('**/api/**', route => route.continue());
```

### 15.2 Intercept Response

```javascript
await page.route('**/api/products', async route => {
  const response = await route.fetch();    // Fetch original response
  const json = await response.json();
  json.push({ id: 999, name: 'Extra Product' }); // Modify
  await route.fulfill({ response, json });
});
```

### 15.3 Remove Route

```javascript
await page.unroute('**/api/users');   // Remove specific route
await page.unrouteAll();              // Remove all routes
```

### 15.4 Listen to Network Events

```javascript
// Log all requests
page.on('request', request => {
  console.log('Request:', request.method(), request.url());
});

// Log all responses
page.on('response', response => {
  console.log('Response:', response.status(), response.url());
});
```

---

## 16. Authentication & Storage State

### 16.1 Login Once, Reuse Session

This avoids logging in before every test — a massive time saver!

```javascript
// global-setup.js — runs once before all tests
const { chromium } = require('@playwright/test');

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://example.com/login');
  await page.fill('#username', 'admin');
  await page.fill('#password', 'password123');
  await page.click('#loginBtn');
  await page.waitForURL(/dashboard/);

  // Save cookies and localStorage to file
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

module.exports = globalSetup;
```

```javascript
// playwright.config.js
module.exports = {
  globalSetup: require.resolve('./global-setup'),
  use: {
    storageState: 'storageState.json', // Inject saved session into every test
  }
};
```

### 16.2 Per-Role Storage State

```javascript
// playwright.config.js
projects: [
  {
    name: 'admin tests',
    use: { storageState: 'admin-state.json' }
  },
  {
    name: 'user tests',
    use: { storageState: 'user-state.json' }
  }
]
```

### 16.3 HTTP Basic Authentication

```javascript
const context = await browser.newContext({
  httpCredentials: {
    username: 'admin',
    password: 'secret'
  }
});
```

---

## 17. Parallel Execution

### 17.1 Enable Parallelism

By default, Playwright runs test **files** in parallel (different workers), but tests **within a file** run sequentially.

```javascript
// playwright.config.js
module.exports = {
  workers: 4,          // Number of parallel workers
  fullyParallel: true, // Also parallelize within a file
};
```

### 17.2 Disable Parallelism for a File

```javascript
// At the top of a test file
test.describe.configure({ mode: 'serial' }); // Run serially
```

### 17.3 Test Annotations

```javascript
// Skip a test
test.skip('skipped test', async ({ page }) => {});

// Skip conditionally
test.skip(({ browserName }) => browserName === 'firefox', 'Not supported on Firefox');

// Mark as expected failure
test.fail('known bug test', async ({ page }) => {});

// Only run this test (use for debugging — remove before committing!)
test.only('only this test', async ({ page }) => {});

// Mark slow tests (triple timeout)
test.slow('heavy test', async ({ page }) => {});
```

### 17.4 Test Retry

```javascript
// playwright.config.js
module.exports = {
  retries: 2, // Retry failed tests up to 2 times
};

// Retry only in CI
retries: process.env.CI ? 2 : 0,
```

---

## 18. Configuration (playwright.config.js)

```javascript
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // Test directory
  testDir: './tests',

  // Test file match pattern
  testMatch: '**/*.spec.js',

  // Global timeout per test
  timeout: 30000,

  // Assertion timeout
  expect: {
    timeout: 5000,
  },

  // Fail fast — stop after N failures
  maxFailures: 5,

  // Retries
  retries: process.env.CI ? 2 : 0,

  // Parallel workers
  workers: process.env.CI ? 2 : undefined,

  // Run all tests in parallel
  fullyParallel: true,

  // Reporter
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Global setup/teardown
  globalSetup: './global-setup.js',
  globalTeardown: './global-teardown.js',

  // Shared settings for all tests
  use: {
    baseURL: 'https://example.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
    ignoreHTTPSErrors: true,
    locale: 'en-US',
    timezoneId: 'America/New_York',
    colorScheme: 'dark', // 'light' | 'dark' | 'no-preference'
  },

  // Projects (run tests on multiple browsers/configs)
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },

    // Mobile emulation
    { name: 'Mobile Chrome', use: { ...devices['Pixel 5'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  ],
});
```

---

## 19. Reporters

### Built-in Reporters

| Reporter | Description |
|---|---|
| `list` | Prints tests as they run |
| `dot` | Dots for each test |
| `line` | Condensed output |
| `html` | Full HTML report with traces |
| `json` | JSON output file |
| `junit` | JUnit XML (for CI/CD) |
| `github` | GitHub annotations |

```javascript
// playwright.config.js
reporter: [
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ['json', { outputFile: 'results.json' }],
  ['junit', { outputFile: 'junit-results.xml' }],
  ['list'],
]
```

```bash
# Open the HTML report
npx playwright show-report
```

---

## 20. CI/CD Integration

### GitHub Actions Example

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload HTML Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

### Environment Variables

```javascript
// playwright.config.js
use: {
  baseURL: process.env.BASE_URL || 'https://staging.example.com',
}

// .env file (use dotenv)
BASE_URL=https://production.example.com
API_TOKEN=my-secret-token
```

```bash
# Run with environment variables
BASE_URL=https://staging.example.com npx playwright test
```

---

## 21. Best Practices

### ✅ DO

- **Use role-based locators** (`getByRole`, `getByLabel`) — they're more resilient
- **Use `data-testid`** for elements that don't have good semantic roles
- **Use Page Object Model** to keep test logic clean and reusable
- **Use fixtures** to share setup/teardown across tests
- **Use `storageState`** to avoid redundant logins
- **Name tests clearly** — the test name should explain what it verifies
- **Use `test.describe`** to group related tests
- **Check assertions on outcomes**, not implementation details
- **Keep tests independent** — each test should be able to run alone
- **Use environment variables** for credentials and URLs

### ❌ AVOID

- **Avoid `page.waitForTimeout()`** — use auto-waiting or `waitForSelector` instead
- **Avoid CSS selectors based on styling** (`button.btn-blue`) — they break when styles change
- **Avoid `test.only()`** in committed code — it skips all other tests
- **Avoid hard-coded credentials** — use environment variables
- **Avoid `force: true`** on clicks unless absolutely necessary
- **Avoid chaining too many locators** without readability

### Common Patterns

```javascript
// ✅ Good: meaningful locators
page.getByRole('button', { name: 'Submit Order' })

// ❌ Bad: brittle CSS selector
page.locator('.btn.btn-primary.submit-btn')

// ✅ Good: wait for condition
await expect(page.getByText('Order Placed')).toBeVisible();

// ❌ Bad: arbitrary sleep
await page.waitForTimeout(3000);
```

---

## 22. Cheat Sheet

### CLI Commands

```bash
npx playwright test                          # Run all tests
npx playwright test --headed                 # Headed mode
npx playwright test --debug                  # Debug mode (step-through)
npx playwright test --ui                     # UI mode
npx playwright test login.spec.js            # Specific file
npx playwright test -g "login"               # Filter by test name
npx playwright test --project=chromium       # Specific browser
npx playwright test --workers=4              # Parallel workers
npx playwright test --retries=2              # Set retries
npx playwright test --reporter=html          # HTML report
npx playwright show-report                   # Open HTML report
npx playwright codegen https://example.com   # Code generator
npx playwright show-trace trace.zip          # View trace
```

### Quick Reference

```javascript
// Navigate
await page.goto(url);
await page.goBack();
await page.reload();

// Find elements
page.getByRole('button', { name: 'X' })
page.getByLabel('Email')
page.getByPlaceholder('Search...')
page.getByText('Welcome')
page.getByTestId('submit-btn')
page.locator('#id .class')

// Actions
await locator.click();
await locator.fill('text');
await locator.type('text');
await locator.press('Enter');
await locator.hover();
await locator.check();
await locator.selectOption('value');

// Assertions
await expect(page).toHaveURL(/path/);
await expect(page).toHaveTitle('My App');
await expect(locator).toBeVisible();
await expect(locator).toBeEnabled();
await expect(locator).toHaveText('Hello');
await expect(locator).toHaveValue('input');
await expect(locator).toHaveCount(5);

// Wait
await page.waitForURL('**/dashboard');
await page.waitForSelector('#element');
await page.waitForLoadState('networkidle');
await page.waitForResponse('**/api/data');
```

---

*Happy Testing with Playwright! 🎭*
