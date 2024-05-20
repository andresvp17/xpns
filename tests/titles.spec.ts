// @ts-check

import { test, expect } from '@playwright/test'

test('check home title', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await expect(page).toHaveTitle('XPNS | Home')
})

test('check dashboard title', async ({ page }) => {
  await page.goto('http://localhost:3000/expenses')

  await expect(page).toHaveTitle('XPNS | Dashboard')
})

test('check login title', async ({ page }) => {
  await page.goto('http://localhost:3000/login')

  await expect(page).toHaveTitle('XPNS | Login')
})

test('check sign upy title', async ({ page }) => {
  await page.goto('http://localhost:3000/signUp')

  await expect(page).toHaveTitle('XPNS | Sign Up')
})
