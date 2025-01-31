import { test, expect } from './fixtures/auth';

test.describe('Tasks CRUD', () => {
  test('Read the 5 default tasks', async ({ registeredUser }) => {
    const { page } = registeredUser;

    await page.goto('http://localhost:3000/tasks');
    const taskItems = page.locator('.v-data-table tbody tr');

    await expect(taskItems).toHaveCount(5);
  });

  test('Add a new task and verify it appears in the list', async ({ registeredUser }) => {
    const { page } = registeredUser;

    await page.goto('http://localhost:3000/tasks');
    await page.fill('#new-task-title', 'New Task');
    await page.click('button:has-text("Save")');

    await expect(page.locator('.v-data-table')).toContainText('New Task');
  });
});
