import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'

test.describe('input fields', () => {
  test('text input', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`)
    const inputText = page.locator('#email')

    await inputText.fill('savage@gmail.com')
    await expect(inputText).toHaveValue('savage@gmail.com')
  })

  test('text password', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`)
    const passowrdInput = page.locator('#password')

    await passowrdInput.fill('Favor1729%')
    await expect(passowrdInput).toHaveValue('Favor1729%')
  })
})

test('submit credentials', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`)

  const inputText = page.locator('#email')
  const passowrdInput = page.locator('#password')
  const submitButton = page.locator('#submit-button')

  await inputText.fill('savage@gmail.com')
  await passowrdInput.fill('Favor1729%')

  await submitButton.click()

  await expect(page).toHaveURL(`${BASE_URL}/expenses`)
})
