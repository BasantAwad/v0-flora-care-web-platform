import { test, expect } from '@playwright/test'

test('homepage shows welcome text', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Welcome to FloraCare')).toBeVisible()
})
