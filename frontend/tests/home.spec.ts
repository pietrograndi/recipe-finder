import { test, expect } from '@playwright/test';

test('to have a Autocomplete visible', async ({ page }) => {
  await page.goto('/');
  const combobox = page.getByRole('combobox');
  await expect(combobox).toBeVisible();
});

test('should display card when searching "spag"', async ({ page }) => {
  await page.goto('/');
  const searchInput = page.getByRole('textbox', { id: 'search-input' });
  
  await searchInput.fill('spag');
  
  const section = page.getByText(/ingredients/);
  await expect(section).toBeVisible();
  
  const option = page.getByRole('option').first();
  await expect(option).toBeVisible();

  let status = page.getByText(/to find recipes/)
  await expect(status).toBeVisible();

  await option.click();
  status = page.getByText(/to find recipes/)
  await expect(status).not.toBeVisible();
  
  const cardVisible = page.getByText(/cacio/)
  await expect(cardVisible).toBeVisible();
  
  await cardVisible.click();
  
  await expect(page).toHaveURL(/\/recipes\/.+/);
});
