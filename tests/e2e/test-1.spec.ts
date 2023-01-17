import { test } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Cadastre-se aqui' }).click();
  await page.getByRole('link', { name: 'Entre aqui' }).click();
  await page.getByRole('heading', { name: 'Acessar' }).click();
});
