import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test('should successfully log in and navigate to tasks page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('#login-username', 'testuser');
    await page.fill('#login-password', '^n#T%x$n^43&q7d3N6U7');
    await page.click('button:has-text("Log in")');
    await page.waitForURL('**/tasks', { waitUntil: 'load' });
    expect(page.url()).toBe('http://localhost:3000/tasks');
    const tasksHeader = page.locator('h2:has-text("To-Do List")');
    await expect(tasksHeader).toBeVisible();
  });
});

test.describe('Registration', () => {
  test('should register a new user successfully', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.click('button:has-text("Create new account")');
    const registerBoxVisible = await page.isVisible('v-dialog');
    const username = `testuser${new Date().toISOString()}`;
    await page.fill('#register-username', username);
    await page.fill('#register-password', 'Password123#!');
    await page.click('button:has-text("Sign up")');
    await page.waitForURL('**/tasks', { waitUntil: 'load' });
    expect(page.url()).toBe('http://localhost:3000/tasks');
  });
});
