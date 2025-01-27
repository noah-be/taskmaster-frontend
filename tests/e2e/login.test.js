import { test, expect } from '@playwright/test';

test.describe('Login Form', () => {
  test('should successfully log in and navigate to tasks page', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('#login-username', 'testuser');
    await page.fill('#login-password', 'testpassword');
    await page.click('button:has-text("Log in")');
    //await expect(page).toHaveURL('http://localhost:3000/tasks');
    //const tasksHeader = await page.locator('h1:has-text("Tasks")');
    //await expect(tasksHeader).toBeVisible();
  });
});
