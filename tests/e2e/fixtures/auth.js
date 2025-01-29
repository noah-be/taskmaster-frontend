import { test as base, expect } from '@playwright/test';

export const test = base.extend({
  authPage: [
    async ({ browser }, use) => {
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto('http://localhost:3000');
      await page.fill('#login-username', 'testuser');
      await page.fill('#login-password', '^n#T%x$n^43&q7d3N6U7');
      await page.click('button:has-text("Log in")');
      await page.waitForURL('**/tasks', { waitUntil: 'load' });

      expect(page.url()).toBe('http://localhost:3000/tasks');
      await use(page);

      await context.close();
    },
    { scope: 'worker' }
  ],

  registeredUser: [
    async ({ browser }, use) => {
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto('http://localhost:3000');
      await page.click('button:has-text("Create new account")');

      const username = `testuser${Date.now()}`;
      await page.fill('#register-username', username);
      await page.fill('#register-password', 'Password123#!');
      await page.click('button:has-text("Sign up")');
      await page.waitForURL('**/tasks', { waitUntil: 'load' });

      await use({ page, username });

      await context.close();
    },
    { scope: 'worker' }
  ]
});

export { expect };
