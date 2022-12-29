import { expect, test } from '@playwright/test'

test('test example', async ({ page }) => {
	// Go to https://forito.vercel.app/posts
	await page.goto('https://forito.vercel.app/posts')

	// Go to https://forito.vercel.app/
	await page.goto('https://forito.vercel.app/')

	// Click text=Forito ✨
	await page.locator('text=Forito ✨').click()
	await expect(page).toHaveURL('https://forito.vercel.app/posts')

	// Click text=Forito ✨Login >> button >> nth=2
	await page.locator('text=Forito ✨Login >> button').nth(2).click()

	// Click text=Login
	await page.locator('text=Login').click()
	await expect(page).toHaveURL('https://forito.vercel.app/auth')

	// Click [placeholder="Email"]
	await page.locator('[placeholder="Email"]').click()

	// Fill [placeholder="Email"]
	await page.locator('[placeholder="Email"]').fill('tester@gmail.com')

	// Press Tab
	await page.locator('[placeholder="Email"]').press('Tab')

	// Fill [placeholder="Password"]
	await page.locator('[placeholder="Password"]').fill('tester1')

	// Press Enter
	await page.locator('[placeholder="Password"]').press('Enter')

	// Go to https://forito.vercel.app/
	await page.goto('https://forito.vercel.app/')

	// Go to https://forito.vercel.app/posts
	await page.goto('https://forito.vercel.app/posts')

	// Go to https://forito.vercel.app/
	await page.goto('https://forito.vercel.app/')

	// Go to https://forito.vercel.app/posts
	await page.goto('https://forito.vercel.app/posts')

	// Click a:has-text("About")
	await page.locator('a:has-text("About")').click()
	await expect(page).toHaveURL('https://forito.vercel.app/about')

	// Click text=Top Posts
	await page.locator('text=Top Posts').click()
	await expect(page).toHaveURL('https://forito.vercel.app/posts/top')

	// Click text=Forito ✨
	await page.locator('text=Forito ✨').click()
	await expect(page).toHaveURL('https://forito.vercel.app/posts')
})
