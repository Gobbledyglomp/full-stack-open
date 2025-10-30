const setupDatabase = async request => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
        data: {
           username: 'root',
           name: 'Superuser',
           password: 'root',
        }
    })
    await request.post('/api/users', {
        data: {
           username: 'example',
           name: 'Example User',
           password: 'example',
        }
    })
}

const login = async (page, username, password)  => {
    await page
        .getByRole('textbox', { name: 'Username' })
        .fill(username)
    await page
        .getByRole('textbox', { name: 'Password' })
        .fill(password)
    await page
        .getByRole('button', { name: 'Login' })
        .click()
}

const createBlog = async (page, { title, author, url }) => {
    await page
        .getByRole('button', { name: 'Create New Blog' })
        .click()
    
    await page
        .getByRole('textbox', { name: 'Title:' })
        .fill(title)
    await page
        .getByRole('textbox', { name: 'Author:' })
        .fill(author)
    await page
        .getByRole('textbox', { name: 'URL:' })
        .fill(url)

    await page
        .getByRole('button', { name: 'Create' })
        .click()
    await page
        .getByText(`${title} by ${author}`)
        .waitFor()
}

export {
    setupDatabase,
    login,
    createBlog,
}