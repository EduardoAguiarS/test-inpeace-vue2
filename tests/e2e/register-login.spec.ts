import { test } from '@playwright/test';

test('Register and Login', async ({ page }) => {
  // Go to the page
  await page.goto('localhost:8080');

  // Access the register page
  await page.locator('[data-test="register"]').click();

  // Fill the form
  await page.locator('[data-test="rName"]').fill('José Eduardo Aguiar Silva');
  await page.locator('[data-test="rEmail"]').fill('edu.pessoal@outlook.com');
  await page.locator('[data-test="rState"]').selectOption('SP');
  await page.locator('[data-test="rMale"]').click();
  await page.locator('[data-test="rPassword"]').fill('123456');
  await page.locator('[data-test="rConfirm"]').fill('123456');

  // Submit the form
  await page.locator('[data-test="rSubmit"]').click();

  // Get local storage
  const localStorage = await page
    .evaluate(() => JSON.parse(localStorage.getItem('users')));

  // Get the last user
  const user = localStorage[localStorage.length - 1];

  // Login
  await page.locator('[data-test="email"]').click();
  await page.locator('[data-test="email"]').fill(user.email);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(user.password);
  await page.locator('[data-test="submit"]').click();

  // Logout
  await page.locator('[data-test="logout"]').click();
});
