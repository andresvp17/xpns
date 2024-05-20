import { test, expect } from '@playwright/test'
import mockAPI from '@/lib/mockAPI.json'

const BASE_URL = 'http://localhost:3000'

test.describe('mock calls', () => {
    test("mock api data visible", async ({ page }) => {
        await page.route('http://localhost:3000/api/expenses', async (route) => {
            await route.fulfill({ json: mockAPI })
        })

        await page.goto(`${BASE_URL}/login`)

        const inputText = page.locator("#email")
        const passowrdInput = page.locator("#password")
        const submitButton = page.locator("#submit-button")

        await inputText.fill("savage@gmail.com")
        await passowrdInput.fill('Favor1729%')

        await submitButton.click()

        await expect(page.getByText('bank expense')).toBeVisible()
        await expect(page.getByText('Monthly salary')).toBeVisible()
        await expect(page.getByText('cost for international payment')).toBeVisible()
    })
})