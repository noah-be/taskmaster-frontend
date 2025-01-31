import { test, expect } from './fixtures/auth';

test.describe.serial('Tasks CRUD', () => {
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

  test('Edit a task and verify the changes are saved', async ({ registeredUser }) => {
    const { page } = registeredUser;

    await page.goto('http://localhost:3000/tasks');
    await page.click('.v-data-table tbody tr:first-child');
    await page.waitForSelector('text="Edit Task"');
    await page.fill('#task-title', 'Updated Task Title');
    await page.fill('#task-description', 'Updated Description');
    await page.click('text="Save Changes"');
    await expect(page.locator('.v-data-table')).toContainText('Updated Task Title');
    await expect(page.locator('.v-data-table')).toContainText('Updated Description');
  });

  test('should delete a task and verify it is removed from the list', async ({ registeredUser }) => {
    const { page } = registeredUser;

    await page.goto('http://localhost:3000/tasks');
    await page.click('.v-data-table tbody tr:first-child');
    await page.waitForSelector('text="Edit Task"');
    await page.click('text="Delete"');
    await expect(page.locator('.v-data-table')).not.toHaveText('Create Your First Task');
  });
});
