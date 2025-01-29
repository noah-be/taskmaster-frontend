import { test, expect } from './fixtures/auth';

test.describe('Tasks CRUD', () => {
  test('Read the 5 default tasks', async ({ registeredUser }) => {
    const { page } = registeredUser;

    await page.goto('http://localhost:3000/tasks');
    const taskItems = page.locator('[data-test="task-item"]');

    await expect(taskItems).toHaveCount(5);
  });
});
