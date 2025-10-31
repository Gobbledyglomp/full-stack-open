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

    describe('and there is a blog', () => {
      beforeEach(async ({ page, request }) => {
        const token = await helper.getToken(request, {
            username: 'root',
            password: 'root'
        })

        await helper.postBlog(request, {
          title: 'Test blog 1',
          author: 'Playwright',
          url: 'https://example.com/1',
          likes: 12
        }, token)
        await helper.postBlog(request, {
          title: 'Test blog 2',
          author: 'Playwright',
          url: 'https://example.com/2',
          likes: 506
        }, token)
        await helper.postBlog(request, {
          title: 'Test blog 3',
          author: 'Playwright',
          url: 'https://example.com/3',
          likes: 32
        }, token)
        await helper.postBlog(request, {
          title: 'Test blog 4',
          author: 'Playwright',
          url: 'https://example.com/4',
          likes: 178
        }, token)

        await page.reload()
      })

      test('the blogs are sorted by likes', async ({ page }) => {
        await expect(page.getByText('Likes: ').nth(0))
          .toContainText('506')
        await expect(page.getByText('Likes: ').nth(1))
          .toContainText('178')
        await expect(page.getByText('Likes: ').nth(2))
          .toContainText('32')
        await expect(page.getByText('Likes: ').nth(3))
          .toContainText('12')
      })
    })
  })
})