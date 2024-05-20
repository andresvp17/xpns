import { test, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:3000'

test.describe("expenses interaction", () => {
    test('show create expenses modal', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`)

    const inputText = page.locator("#email")
    const passowrdInput = page.locator("#password")
    const submitButton = page.locator("#submit-button")

    await inputText.fill("savage@gmail.com")
    await passowrdInput.fill('Favor1729%')

    await submitButton.click()

    const createExpensesButton = page.locator("#create-expense")

    await createExpensesButton.click()

    const spentName = page.locator("#spent-name")
    const spentQuantity = page.locator("#spent")

    await spentName.fill("random expense")
    await spentQuantity.fill("50")

    await expect(spentName).toHaveValue("random expense")
    await expect(spentQuantity).toHaveValue("50")
    })
})

