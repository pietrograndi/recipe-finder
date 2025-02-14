import { test, expect } from '@playwright/test';

test('to have a Autocomplete visible', async ({ page }) => {
  await page.goto('/');
  const combobox = page.getByRole('combobox');
  await expect(combobox).toBeVisible();
});

