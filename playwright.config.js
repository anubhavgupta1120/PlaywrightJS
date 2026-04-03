// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 40 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
  ],
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    //trace: 'on'/'off',
    trace: 'retain-on-failure',
  },

});
module.exports = config;