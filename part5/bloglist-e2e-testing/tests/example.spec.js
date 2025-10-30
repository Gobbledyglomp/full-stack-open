const { test, expect, beforeEach, describe } = require('@playwright/test')
const helper = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await helper.setupDatabase(request)
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Log in to application' }))
      .toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Username' }))
      .toBeVisible()
    await expect(page.getByRole('textbox', { name: 'Password' }))
      .toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' }))
      .toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await helper.login(page, 'root', 'root')
      await expect(page.getByText('Superuser logged in.'))
        .toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await helper.login(page, 'root', 'wrongPassword')

      await expect(page.locator('.notification'))
        .toBeVisible()
      await expect(page.locator('.notification'))
        .toContainText('invalid username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await helper.login(page, 'root', 'root')
    })

    test('a new blog can be created', async ({ page }) => {
      await helper.createBlog(page, {
        title: 'Test blog',
        author: 'Playwright',
        url: 'https://example.com/'
      })

      await expect(page.locator('.bloglist')
        .getByText('Test blog by Playwright'))
        .toBeVisible()
    })

    describe('and there is a blog', () => {
      beforeEach(async ({ page }) => {
        await helper.createBlog(page, {
          title: 'Test blog',
          author: 'Playwright',
          url: 'https://example.com/'
        })
      })

      test('the blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'View' })
          .click()
        await page.getByRole('button', { name: '❤️' })
          .click()

        await expect(page.getByText('Likes: 1'))
          .toBeVisible()
      })

      test('the blog can be deleted by owner user', async ({ page }) => {
        await page.getByRole('button', { name: 'View' })
          .click()

        page.on('dialog', dialog => dialog.accept());
        await page.getByRole('button', { name: 'Delete' })
          .click()

        await expect(page.locator('.bloglist')
          .getByText('Test blog by Playwright'))
          .not.toBeVisible()
      })

      test('the blog cannot be deleted by other user', async ({ page }) => {        
        await page.getByRole('button', { name: 'Logout' })
          .click()

        await helper.login(page, 'example', 'example')
        await page.getByRole('button', { name: 'View' })
          .click()

        await expect(page.getByRole('button', { name: 'Delete' }))
          .not.toBeVisible()
      })
    })
  })
})