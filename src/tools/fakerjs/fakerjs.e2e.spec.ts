import { test, expect } from '@playwright/test';

test.describe('Tool - Fakerjs', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/fakerjs');
  });

  test('Has correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Fakerjs - IT Tools');
  });

  test('', async ({ page }) => {

  });
});