import { test, expect } from './fixtures/auth';

test.describe.serial('User Authentication', () => {
  test('Register a new user', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('button:has-text("Create new account")');

    const username = `testuser${Date.now()}`;
    await page.fill('#register-username', username);
    await page.fill('#register-password', 'Password123#!');
    await page.click('button:has-text("Sign up")');
    await page.waitForURL('**/tasks', { waitUntil: 'load' });

    expect(page.url()).toBe('http://localhost:3000/tasks');
  });

  test('Login with registered user', async ({ authPage }) => {
    expect(authPage.url()).toBe('http://localhost:3000/tasks');
  });
});

// TODO: Delete test user after tests
