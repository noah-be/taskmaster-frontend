import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  authPage: async ({ page }, use) => {
    await page.goto('http://localhost:3000');
    await page.fill('#login-username', 'testuser');
    await page.fill('#login-password', '^n#T%x$n^43&q7d3N6U7');
    await page.click('button:has-text("Log in")');
    await page.waitForURL('**/tasks', { waitUntil: 'load' });

    expect(page.url()).toBe('http://localhost:3000/tasks');
    await use(page);
  }
});

export { expect };
