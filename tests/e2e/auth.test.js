import { test, expect } from './fixtures/auth';

test.describe.serial('User Authentication', () => {
  test('Register new user', async ({ registeredUser }) => {
    await expect(registeredUser.page.url()).toBe('http://localhost:3000/tasks');
  });

  test('Login with registered user', async ({ authPage }) => {
    expect(authPage.url()).toBe('http://localhost:3000/tasks');
  });
});

// TODO: Delete test user after tests
